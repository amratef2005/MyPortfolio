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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-session-id');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const pool = getPool();

  try {
    // GET: Fetch active devices and sessions
    if (req.method === 'GET') {
      const currentSessionId = req.headers['x-session-id'] || req.query.sessionId;

      const result = await pool.query(`
        SELECT id, device_info, ip_address, created_at, last_active 
        FROM public.portfolio_admin_sessions 
        WHERE is_active = TRUE 
        ORDER BY created_at ASC;
      `);

      const activeRows = result.rows || [];
      const count = activeRows.length;

      const sessions = activeRows.map((row, index) => ({
        id: row.id,
        deviceInfo: row.device_info,
        ipAddress: row.ip_address || 'Protected',
        createdAt: row.created_at,
        lastActive: row.last_active,
        isCurrent: Boolean(currentSessionId && row.id === currentSessionId),
        isOldest: index === 0 && count > 0
      }));

      const isCurrentActive = currentSessionId 
        ? activeRows.some(r => r.id === currentSessionId)
        : true;

      return res.status(200).json({
        count,
        activeSessionsCount: count,
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
          `SELECT id FROM public.portfolio_admin_sessions WHERE id = $1 AND is_active = TRUE;`,
          [sid]
        );
        const valid = check.rows.length > 0;
        if (valid) {
          // update last active
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
        INSERT INTO public.portfolio_admin_sessions (id, device_info, ip_address, created_at, last_active, is_active)
        VALUES ($1, $2, $3, NOW(), NOW(), TRUE)
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

    // DELETE: Terminate oldest device session or specific session
    if (req.method === 'DELETE') {
      const action = req.query.action || 'oldest';
      const specificId = req.query.sessionId;

      if (action === 'oldest' && !specificId) {
        // Find oldest active session
        const findOldest = await pool.query(`
          SELECT id, device_info, created_at 
          FROM public.portfolio_admin_sessions 
          WHERE is_active = TRUE 
          ORDER BY created_at ASC 
          LIMIT 1;
        `);

        if (findOldest.rows.length === 0) {
          return res.status(200).json({
            success: false,
            message: 'لا توجد جلسات نشطة حالياً'
          });
        }

        const oldest = findOldest.rows[0];

        await pool.query(`
          UPDATE public.portfolio_admin_sessions 
          SET is_active = FALSE 
          WHERE id = $1;
        `, [oldest.id]);

        return res.status(200).json({
          success: true,
          message: 'تم إنهاء جلسة أقدم جهاز بنجاح',
          terminatedSession: {
            id: oldest.id,
            deviceInfo: oldest.device_info,
            createdAt: oldest.created_at
          }
        });
      }

      // Terminate specific session by ID
      const targetId = specificId || req.query.id;
      if (targetId) {
        await pool.query(`
          UPDATE public.portfolio_admin_sessions 
          SET is_active = FALSE 
          WHERE id = $1;
        `, [targetId]);
        return res.status(200).json({ success: true, message: 'تم إنهاء الجلسة بنجاح' });
      }

      return res.status(400).json({ error: 'Missing action or sessionId' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Admin sessions error:', err);
    return res.status(500).json({ error: err.message });
  }
}
