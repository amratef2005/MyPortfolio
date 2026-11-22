import { getPool } from './_db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const pool = getPool();

  if (req.method === 'POST') {
    try {
      const p = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      await pool.query(`
        INSERT INTO public.portfolio_projects (
          id, title, title_ar, tagline, tagline_ar, description, description_ar,
          category, featured, badge, architecture, technologies, metrics, features,
          github_url, live_url, image, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW())
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          title_ar = EXCLUDED.title_ar,
          tagline = EXCLUDED.tagline,
          tagline_ar = EXCLUDED.tagline_ar,
          description = EXCLUDED.description,
          description_ar = EXCLUDED.description_ar,
          category = EXCLUDED.category,
          featured = EXCLUDED.featured,
          badge = EXCLUDED.badge,
          architecture = EXCLUDED.architecture,
          technologies = EXCLUDED.technologies,
          metrics = EXCLUDED.metrics,
          features = EXCLUDED.features,
          github_url = EXCLUDED.github_url,
          live_url = EXCLUDED.live_url,
          image = EXCLUDED.image,
          updated_at = NOW()
      `, [
        p.id, p.title, p.titleAr, p.tagline, p.taglineAr,
        p.description, p.descriptionAr, p.category, p.featured,
        p.badge, JSON.stringify(p.architecture || []), JSON.stringify(p.technologies || []),
        JSON.stringify(p.metrics || []), JSON.stringify(p.features || []),
        p.githubUrl, p.liveUrl, p.image
      ]);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Projects save error:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const id = req.query.id || (req.url && req.url.split('/').pop());
      if (!id) return res.status(400).json({ error: 'Missing id' });
      await pool.query('DELETE FROM public.portfolio_projects WHERE id = $1', [id]);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
