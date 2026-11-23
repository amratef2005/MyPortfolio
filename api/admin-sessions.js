import { getPool } from './_db.js';

function parseUserAgent(ua = '') {
  let os = 'Unknown OS';
  if (/windows/i.test(ua)) os = 'Windows PC';
  else if (/macintosh|mac os x/i.test(ua)) os = 'Mac';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS Device';
  else if (/android/i.test(ua)) os = 'Android Phone';
  else if (/linux/i.test(ua)) os = 'Linux';

  let browser = 'Browser';
  if (/chrome|crios/i.test(ua) && !/edge|edg|opr/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/edg/i.test(ua)) browser = 'Edge';
  else if (/opr|opera/i.test(ua)) browser = 'Opera';

  return `${browser} on ${os}`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-session-id');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const pool = getPool();

  try {
    // GET: Fetch active devices and sessions with hierarchy info
    if (req.method === 'GET') {
      const currentSessionId = req.headers['x-session-id'] || req.query.sessionId;

      const result = await pool.query(`
        SELECT id, device_info, ip_address, created_at, last_active, is_master 
        FROM public.portfolio_admin_sessions 
        WHERE is_active = TRUE 
        ORDER BY created_at ASC;
      `);

      const activeRows = result.rows || [];
      const count = activeRows.length;
      const primaryMasterId = activeRows.length > 0 ? activeRows[0].id : null;

      // Caller is Master if they are the oldest active session OR have is_master = true
      const callerRow = activeRows.find(r => r.id === currentSessionId);
      const isCallerMaster = Boolean(callerRow && (callerRow.id === primaryMasterId || callerRow.is_master));

      const sessions = activeRows.map((row, index) => {
        const isPrimaryMaster = index === 0;
        const isMaster = isPrimaryMaster || Boolean(row.is_master);
        const isCurrent = Boolean(currentSessionId && row.id === currentSessionId);

        return {
          id: row.id,
          deviceInfo: row.device_info,
          ipAddress: row.ip_address || 'Protected',
          createdAt: row.created_at,
          lastActive: row.last_active,
          isCurrent,
          isPrimaryMaster,
          isMaster,
          // Caller can terminate if caller is master, target is not primary master, and target is not caller itself
          canBeTerminated: isCallerMaster && !isPrimaryMaster && !isCurrent,
          // Caller can promote/demote if caller is master and target is not primary master
          canBePromoted: isCallerMaster && !isPrimaryMaster
        };
      });

      const isCurrentActive = currentSessionId 
        ? activeRows.some(r => r.id === currentSessionId)
        : true;

      return res.status(200).json({
        count,
        activeSessionsCount: count,
        isCallerMaster,
        primaryMasterId,
        sessions,
        isCurrentActive,
        isCurrentSessionActive: isCurrentActive
      });
    }

    // POST: Register or verify session
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const action = body.action || req.query.action || 'register';

      if (action === 'verify') {
        const sid = body.sessionId || req.headers['x-session-id'];
        if (!sid) return res.status(400).json({ valid: false });

        const check = await pool.query(
          `SELECT id, is_master FROM public.portfolio_admin_sessions WHERE id = $1 AND is_active = TRUE;`,
          [sid]
        );
        const valid = check.rows.length > 0;
        if (valid) {
          pool.query(`UPDATE public.portfolio_admin_sessions SET last_active = NOW() WHERE id = $1;`, [sid]).catch(() => {});
        }
        return res.status(200).json({ valid });
      }

      // Default: Register new session on login
      const sessionId = body.sessionId || `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const userAgent = req.headers['user-agent'] || '';
      const rawIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
      const clientIp = typeof rawIp === 'string' ? rawIp.split(',')[0].trim() : 'Protected';
      const deviceInfo = body.deviceInfo || parseUserAgent(userAgent);

      await pool.query(`
        INSERT INTO public.portfolio_admin_sessions (id, device_info, ip_address, created_at, last_active, is_active, is_master)
        VALUES ($1, $2, $3, NOW(), NOW(), TRUE, FALSE)
        ON CONFLICT (id) DO UPDATE SET 
          last_active = NOW(),
          is_active = TRUE;
      `, [sessionId, deviceInfo, clientIp]);

      return res.status(200).json({
        success: true,
        sessionId,
        deviceInfo
      });
    }

    // PATCH: Promote or demote another device to Master (Equal Privileges)
    if (req.method === 'PATCH') {
      const callerSessionId = req.headers['x-session-id'] || req.query.callerSessionId;
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { targetSessionId, isMaster } = body;

      if (!targetSessionId) {
        return res.status(400).json({ error: 'targetSessionId is required' });
      }

      // Check caller permissions
      const activeRes = await pool.query(`
        SELECT id, is_master FROM public.portfolio_admin_sessions 
        WHERE is_active = TRUE 
        ORDER BY created_at ASC;
      `);
      const activeList = activeRes.rows || [];
      const primaryId = activeList[0]?.id;
      const callerRow = activeList.find(r => r.id === callerSessionId);
      const isCallerMaster = Boolean(callerRow && (callerRow.id === primaryId || callerRow.is_master));

      if (!isCallerMaster) {
        return res.status(403).json({
          success: false,
          message: 'غير مصرح: تعيين الصلاحيات محصور في أقدم جهاز (الجهاز الرئيسي الأول) أو الأجهزة المفوضة.'
        });
      }

      if (targetSessionId === primaryId) {
        return res.status(400).json({
          success: false,
          message: 'لا يمكن تعديل صلاحيات الجهاز الرئيسي الأول.'
        });
      }

      await pool.query(`
        UPDATE public.portfolio_admin_sessions 
        SET is_master = $1 
        WHERE id = $2;
      `, [Boolean(isMaster), targetSessionId]);

      return res.status(200).json({
        success: true,
        message: isMaster
          ? 'تمت ترقية الجهاز ومساواته في الصلاحيات بنجاح 👑'
          : 'تم إلغاء ترقية الجهاز بنجاح',
        targetSessionId,
        isMaster: Boolean(isMaster)
      });
    }

    // DELETE: Terminate sessions (Oldest / Master can kick newer or specific devices)
    if (req.method === 'DELETE') {
      const callerSessionId = req.headers['x-session-id'] || req.query.callerSessionId;
      const action = req.query.action || 'newest';
      const specificId = req.query.sessionId || req.query.id;

      // Fetch active sessions
      const activeRes = await pool.query(`
        SELECT id, device_info, created_at, is_master 
        FROM public.portfolio_admin_sessions 
        WHERE is_active = TRUE 
        ORDER BY created_at ASC;
      `);
      const activeList = activeRes.rows || [];
      if (activeList.length === 0) {
        return res.status(200).json({ success: false, message: 'لا توجد جلسات نشطة حالياً' });
      }

      const primaryId = activeList[0]?.id;
      const callerRow = activeList.find(r => r.id === callerSessionId);
      const isCallerMaster = Boolean(callerRow && (callerRow.id === primaryId || callerRow.is_master));

      // Self-logout is always permitted
      if (specificId && specificId === callerSessionId) {
        await pool.query(`UPDATE public.portfolio_admin_sessions SET is_active = FALSE WHERE id = $1;`, [specificId]);
        return res.status(200).json({ success: true, message: 'تم تسجيل الخروج من هذا الجهاز بنجاح' });
      }

      // Any other termination requires Caller to be Master
      if (!isCallerMaster) {
        return res.status(403).json({
          success: false,
          message: 'غير مصرح: طرد الأجهزة محصور في أقدم جهاز (الجهاز الرئيسي الأول) أو الأجهزة المفوضة.'
        });
      }

      // Case 1: Kick newest device (action=newest)
      if (action === 'newest' && !specificId) {
        const newest = activeList[activeList.length - 1];

        if (newest.id === primaryId) {
          return res.status(400).json({
            success: false,
            message: 'لا يمكن طرد الجهاز الرئيسي لأنه الجهاز الوحيد النشط حالياً.'
          });
        }

        await pool.query(`UPDATE public.portfolio_admin_sessions SET is_active = FALSE WHERE id = $1;`, [newest.id]);

        return res.status(200).json({
          success: true,
          message: `تم طرد أحدث جهاز مسجل بنجاح (${newest.device_info})`,
          terminatedSession: {
            id: newest.id,
            deviceInfo: newest.device_info,
            createdAt: newest.created_at
          }
        });
      }

      // Case 2: Kick a specific device (sessionId)
      if (specificId) {
        if (specificId === primaryId && specificId !== callerSessionId) {
          return res.status(403).json({
            success: false,
            message: 'لا يمكن طرد الجهاز الرئيسي الأول (أقدم جهاز).'
          });
        }

        const target = activeList.find(r => r.id === specificId);
        await pool.query(`UPDATE public.portfolio_admin_sessions SET is_active = FALSE WHERE id = $1;`, [specificId]);

        return res.status(200).json({
          success: true,
          message: `تم طرد الجهاز بنجاح (${target?.device_info || specificId.slice(-6)})`,
          terminatedId: specificId
        });
      }

      return res.status(400).json({ error: 'Missing action or sessionId' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Admin sessions error:', err);
    return res.status(500).json({ error: err.message });
  }
}
