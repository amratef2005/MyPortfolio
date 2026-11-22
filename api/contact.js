import { getPool } from './_db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const pool = getPool();
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const id = 'msg_' + Date.now();
    await pool.query(
      'INSERT INTO public.portfolio_messages (id, name, email, subject, message) VALUES ($1, $2, $3, $4, $5)',
      [id, data.name, data.email, data.subject || '', data.message]
    );
    return res.status(200).json({ success: true, id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
