import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import pg from 'pg';
import { resolve } from 'path';

const { Pool } = pg;

const pool = new Pool({
  host: 'aws-0-eu-west-2.pooler.supabase.com',
  port: 6543,
  user: 'postgres.jwdbxlvalwaoxmnpqwza',
  password: 'AmrAtefportfolio',
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
});

function supabaseBackendPlugin(): Plugin {
  return {
    name: 'supabase-backend-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Helper to parse JSON body
        const readBody = (): Promise<any> => {
          return new Promise((resolveBody, rejectBody) => {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                resolveBody(body ? JSON.parse(body) : {});
              } catch (e) {
                rejectBody(e);
              }
            });
            req.on('error', rejectBody);
          });
        };

        const jsonResponse = (statusCode: number, data: any) => {
          res.statusCode = statusCode;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };

        const url = req.url?.split('?')[0];

        // 1. GET /api/portfolio - Fetch all data from Supabase
        if (url === '/api/portfolio' && req.method === 'GET') {
          try {
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
              shortName: pRow.short_name || pRow.name,
              shortNameAr: pRow.short_name_ar || pRow.name_ar,
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
              yearsOfExperience: pRow.years_of_experience || 3,
              completedProjects: pRow.completed_projects || 12,
              adminUsername: pRow.admin_username || 'admin',
              adminPassword: pRow.admin_password || 'admin123',
              adminPin: pRow.admin_pin || '1234'
            } : null;

            const projects = projectsRes.rows.map(r => ({
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

            return jsonResponse(200, {
              profile,
              projects,
              certificates,
              skills,
              messages
            });
          } catch (err: any) {
            console.error('Supabase fetch error:', err);
            return jsonResponse(500, { error: err.message });
          }
        }

        // 2. POST /api/profile - Update Profile in Supabase
        if (url === '/api/profile' && req.method === 'POST') {
          try {
            const data = await readBody();
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
                updated_at = NOW()
              WHERE id = 'main_profile'
            `, [
              data.name, data.nameAr, data.shortName, data.shortNameAr,
              data.title, data.titleAr, data.bio, data.bioAr,
              data.email, data.phone, data.location, data.locationAr,
              data.github, data.linkedin, data.whatsapp,
              data.resumeUrl, data.topAvatarUrl, data.yearsOfExperience,
              data.completedProjects, data.adminUsername, data.adminPassword,
              data.adminPin
            ]);
            return jsonResponse(200, { success: true });
          } catch (err: any) {
            console.error('Supabase update profile error:', err);
            return jsonResponse(500, { error: err.message });
          }
        }

        // 3. POST /api/contact - Submit contact message directly to Supabase
        if (url === '/api/contact' && req.method === 'POST') {
          try {
            const data = await readBody();
            const id = 'msg_' + Date.now();
            await pool.query(
              'INSERT INTO public.portfolio_messages (id, name, email, subject, message) VALUES ($1, $2, $3, $4, $5)',
              [id, data.name, data.email, data.subject || '', data.message]
            );
            return jsonResponse(200, { success: true, id });
          } catch (err: any) {
            console.error('Supabase write message error:', err);
            return jsonResponse(500, { error: err.message });
          }
        }

        // 4. GET /api/messages - Fetch messages from Supabase
        if (url === '/api/messages' && req.method === 'GET') {
          try {
            const result = await pool.query('SELECT * FROM public.portfolio_messages ORDER BY created_at DESC');
            return jsonResponse(200, result.rows);
          } catch (err: any) {
            return jsonResponse(500, { error: err.message });
          }
        }

        // 5. POST /api/projects - Add or update a project
        if (url === '/api/projects' && req.method === 'POST') {
          try {
            const p = await readBody();
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
            return jsonResponse(200, { success: true });
          } catch (err: any) {
            return jsonResponse(500, { error: err.message });
          }
        }

        // 6. DELETE /api/projects/:id
        if (url?.startsWith('/api/projects/') && req.method === 'DELETE') {
          try {
            const id = url.replace('/api/projects/', '');
            await pool.query('DELETE FROM public.portfolio_projects WHERE id = $1', [id]);
            return jsonResponse(200, { success: true });
          } catch (err: any) {
            return jsonResponse(500, { error: err.message });
          }
        }

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), supabaseBackendPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html')
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
});
