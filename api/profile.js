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

    // Ensure availability/whatsapp/avatar columns exist and are typed TEXT
    await pool.query(`
      ALTER TABLE public.portfolio_profile
      ALTER COLUMN top_avatar_url TYPE TEXT;
      ALTER TABLE public.portfolio_profile
      ADD COLUMN IF NOT EXISTS availability_status VARCHAR(50) DEFAULT 'available',
      ADD COLUMN IF NOT EXISTS availability_note_ar VARCHAR(255),
      ADD COLUMN IF NOT EXISTS availability_note_en VARCHAR(255),
      ADD COLUMN IF NOT EXISTS show_availability_badge BOOLEAN DEFAULT TRUE,
      ADD COLUMN IF NOT EXISTS whatsapp_status VARCHAR(50) DEFAULT 'online',
      ADD COLUMN IF NOT EXISTS whatsapp_note_ar VARCHAR(255),
      ADD COLUMN IF NOT EXISTS whatsapp_note_en VARCHAR(255),
      ADD COLUMN IF NOT EXISTS show_whatsapp_status BOOLEAN DEFAULT TRUE,
      ADD COLUMN IF NOT EXISTS hero_avatar_url TEXT DEFAULT '/drama_hero.png',
      ADD COLUMN IF NOT EXISTS auto_extract_colors BOOLEAN DEFAULT TRUE,
      ADD COLUMN IF NOT EXISTS extracted_colors JSONB;
    `).catch(() => {});

    await pool.query(`
      UPDATE public.portfolio_profile SET
        name = COALESCE($1, name),
        name_ar = COALESCE($2, name_ar),
        short_name = COALESCE($3, short_name),
        short_name_ar = COALESCE($4, short_name_ar),
        title = COALESCE($5, title),
        title_ar = COALESCE($6, title_ar),
        bio = COALESCE($7, bio),
        bio_ar = COALESCE($8, bio_ar),
        email = COALESCE($9, email),
        phone = COALESCE($10, phone),
        location = COALESCE($11, location),
        location_ar = COALESCE($12, location_ar),
        github = COALESCE($13, github),
        linkedin = COALESCE($14, linkedin),
        whatsapp = COALESCE($15, whatsapp),
        resume_url = COALESCE($16, resume_url),
        top_avatar_url = COALESCE($17, top_avatar_url),
        years_of_experience = COALESCE($18, years_of_experience),
        completed_projects = COALESCE($19, completed_projects),
        admin_username = COALESCE($20, admin_username),
        admin_password = COALESCE($21, admin_password),
        admin_pin = COALESCE($22, admin_pin),
        availability_status = COALESCE($23, availability_status),
        availability_note_ar = COALESCE($24, availability_note_ar),
        availability_note_en = COALESCE($25, availability_note_en),
        show_availability_badge = COALESCE($26, show_availability_badge),
        whatsapp_status = COALESCE($27, whatsapp_status),
        whatsapp_note_ar = COALESCE($28, whatsapp_note_ar),
        whatsapp_note_en = COALESCE($29, whatsapp_note_en),
        show_whatsapp_status = COALESCE($30, show_whatsapp_status),
        hero_avatar_url = COALESCE($31, hero_avatar_url),
        auto_extract_colors = COALESCE($32, auto_extract_colors),
        extracted_colors = COALESCE($33, extracted_colors),
        updated_at = NOW()
      WHERE id = 'main_profile'
    `, [
      data.name, data.nameAr, data.shortName, data.shortNameAr,
      data.title, data.titleAr, data.bio, data.bioAr,
      data.email, data.phone, data.location, data.locationAr,
      data.github, data.linkedin, data.whatsapp,
      data.resumeUrl, data.topAvatarUrl, data.yearsOfExperience,
      data.completedProjects, data.adminUsername, data.adminPassword,
      data.adminPin,
      data.availabilityStatus, data.availabilityNoteAr, data.availabilityNoteEn,
      data.showAvailabilityBadge,
      data.whatsappStatus, data.whatsappNoteAr, data.whatsappNoteEn,
      data.showWhatsAppStatus,
      data.heroAvatarUrl,
      data.autoExtractColors,
      data.extractedColors ? JSON.stringify(data.extractedColors) : null
    ]);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Supabase update profile error:', err);
    return res.status(500).json({ error: err.message });
  }
}
