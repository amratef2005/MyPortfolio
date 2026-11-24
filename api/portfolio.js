import { getPool } from './_db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const pool = getPool();
    const [profileRes, projectsRes, certsRes, skillsRes, msgsRes] = await Promise.all([
      pool.query('SELECT * FROM public.portfolio_profile WHERE id = $1', ['main_profile']),
      pool.query('SELECT * FROM public.portfolio_projects ORDER BY display_order ASC, updated_at DESC'),
      pool.query('SELECT * FROM public.portfolio_certificates ORDER BY display_order ASC, updated_at DESC'),
      pool.query('SELECT * FROM public.portfolio_skills ORDER BY display_order ASC, updated_at DESC'),
      pool.query('SELECT * FROM public.portfolio_messages ORDER BY created_at DESC')
    ]);

    const pRow = profileRes.rows[0];
    const profile = pRow ? {
      name: pRow.name,
      nameAr: pRow.name_ar,
      shortName: pRow.short_name || pRow.name || 'Amr Atef',
      shortNameAr: pRow.short_name_ar || pRow.name_ar || 'عمرو عاطف',
      brandName: pRow.short_name || 'Amr Atef',
      brandNameAr: pRow.short_name_ar || 'عمرو عاطف',
      title: pRow.title,
      titleAr: pRow.title_ar,
      bio: pRow.bio,
      bioAr: pRow.bio_ar,
      email: pRow.email,
      phone: pRow.phone,
      location: pRow.location,
      locationAr: pRow.location_ar,
      github: pRow.github,
      linkedin: pRow.linkedin,
      whatsapp: pRow.whatsapp,
      resumeUrl: pRow.resume_url,
      topAvatarUrl: pRow.top_avatar_url || '/my.jpg',
      yearsOfExperience: pRow.years_of_experience || 2,
      completedProjects: pRow.completed_projects || 10,
      adminUsername: pRow.admin_username || 'amratefkandel',
      adminPassword: pRow.admin_password || 'KandelAmr###14',
      adminPin: pRow.admin_pin || '1414',
      availabilityStatus: pRow.availability_status || 'available',
      availabilityNoteAr: pRow.availability_note_ar,
      availabilityNoteEn: pRow.availability_note_en,
      showAvailabilityBadge: pRow.show_availability_badge !== false,
      whatsappStatus: pRow.whatsapp_status || 'online',
      whatsappNoteAr: pRow.whatsapp_note_ar,
      whatsappNoteEn: pRow.whatsapp_note_en,
      showWhatsAppStatus: pRow.show_whatsapp_status !== false,
      heroAvatarUrl: pRow.hero_avatar_url || '/drama_hero.png',
      autoExtractColors: pRow.auto_extract_colors !== false,
      extractedColors: pRow.extracted_colors || null
    } : null;

    const projects = projectsRes.rows
      .filter(r => r.id !== 'mot7km-saas')
      .map(r => ({
      id: r.id,
      title: r.title,
      titleAr: r.title_ar,
      tagline: r.tagline,
      taglineAr: r.tagline_ar,
      description: r.description,
      descriptionAr: r.description_ar,
      category: r.category,
      featured: r.featured,
      badge: r.badge,
      architecture: typeof r.architecture === 'string' ? JSON.parse(r.architecture) : r.architecture,
      technologies: typeof r.technologies === 'string' ? JSON.parse(r.technologies) : r.technologies,
      metrics: typeof r.metrics === 'string' ? JSON.parse(r.metrics) : r.metrics,
      features: typeof r.features === 'string' ? JSON.parse(r.features) : r.features,
      githubUrl: r.github_url,
      liveUrl: r.live_url,
      image: r.image
    }));

    const certificates = certsRes.rows.map(r => ({
      id: r.id,
      title: r.title,
      titleAr: r.title_ar,
      issuer: r.issuer,
      issuerAr: r.issuer_ar,
      date: r.date,
      fileUrl: r.file_url,
      previewImage: r.preview_image,
      badge: r.badge,
      description: r.description,
      descriptionAr: r.description_ar
    }));

    const skills = skillsRes.rows.map(r => ({
      name: r.name,
      nameAr: r.name_ar,
      icon: r.icon,
      skills: typeof r.skills === 'string' ? JSON.parse(r.skills) : r.skills
    }));

    const messages = msgsRes.rows.map(r => ({
      id: r.id,
      name: r.name,
      email: r.email,
      subject: r.subject,
      message: r.message,
      createdAt: r.created_at,
      read: r.read
    }));

    return res.status(200).json({
      profile,
      projects,
      certificates,
      skills,
      messages
    });
  } catch (err) {
    console.error('Supabase fetch error:', err);
    return res.status(500).json({ error: err.message });
  }
}
