import fs from 'fs';
import path from 'path';
import { getPool } from './_db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const pool = getPool();
    const result = await pool.query(`
      SELECT top_avatar_url, hero_avatar_url 
      FROM public.portfolio_profile 
      LIMIT 1;
    `);

    if (result.rows.length > 0) {
      const { top_avatar_url, hero_avatar_url } = result.rows[0];
      const avatarData = top_avatar_url || hero_avatar_url;

      if (avatarData && avatarData.startsWith('data:image/')) {
        const matches = avatarData.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const mimeType = matches[1];
          const base64Data = matches[2];
          const imageBuffer = Buffer.from(base64Data, 'base64');

          res.setHeader('Content-Type', mimeType);
          res.setHeader('Content-Length', imageBuffer.length);
          res.setHeader('Cache-Control', 'public, max-age=120, s-maxage=120, stale-while-revalidate=300');
          return res.status(200).send(imageBuffer);
        }
      }
    }

    // Fallback: serve public/my.jpg
    const fallbackPath = path.join(process.cwd(), 'public', 'my.jpg');
    if (fs.existsSync(fallbackPath)) {
      const fallbackBuffer = fs.readFileSync(fallbackPath);
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Content-Length', fallbackBuffer.length);
      res.setHeader('Cache-Control', 'public, max-age=120, s-maxage=120, stale-while-revalidate=300');
      return res.status(200).send(fallbackBuffer);
    }

    return res.status(404).send('Image not found');
  } catch (err) {
    console.error('OG Image generation error:', err);
    try {
      const fallbackPath = path.join(process.cwd(), 'public', 'my.jpg');
      if (fs.existsSync(fallbackPath)) {
        const fallbackBuffer = fs.readFileSync(fallbackPath);
        res.setHeader('Content-Type', 'image/jpeg');
        return res.status(200).send(fallbackBuffer);
      }
    } catch {
      // ignore
    }
    return res.status(500).send('Internal Server Error');
  }
}
