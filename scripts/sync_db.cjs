const { Pool } = require('pg');

const pool = new Pool({
  host: 'aws-0-eu-west-2.pooler.supabase.com',
  port: 6543,
  user: 'postgres.jwdbxlvalwaoxmnpqwza',
  password: 'AmrAtefportfolio',
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    console.log('Connecting to Supabase PostgreSQL...');
    
    // 1. Inspect table columns
    const cols = await pool.query(
      "SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' ORDER BY table_name, ordinal_position"
    );
    
    const tableCols = {};
    for (const row of cols.rows) {
      if (!tableCols[row.table_name]) tableCols[row.table_name] = [];
      tableCols[row.table_name].push(row.column_name);
    }
    console.log('Tables and columns:', Object.keys(tableCols));

    // 2. Update portfolio_profile
    console.log('Updating portfolio_profile...');
    const updateProfileQuery = `
      UPDATE public.portfolio_profile
      SET 
        name = $1,
        name_ar = $2,
        short_name = $3,
        short_name_ar = $4,
        title = $5,
        title_ar = $6,
        bio = $7,
        bio_ar = $8,
        email = $9,
        phone = $10,
        location = $11,
        location_ar = $12,
        github = $13,
        linkedin = $14,
        whatsapp = $15,
        resume_url = $16,
        years_of_experience = $17,
        completed_projects = $18
      WHERE id = 'main_profile'
    `;
    const profileParams = [
      'Amr Atef Imam Mahmoud',
      'عمرو عاطف إمام محمود',
      'Amr Atef',
      'عمرو عاطف',
      '.NET Backend Developer',
      'مطور نظم خلفية .NET',
      'Computer Science student and .NET Backend Developer with hands-on experience designing and developing scalable backend systems using C# and ASP.NET Core. Experienced in building RESTful APIs, implementing Clean Architecture and CQRS patterns, designing relational databases, and developing secure authentication and authorization mechanisms.\n\nPractical experience in multi-tenant SaaS applications, JWT authentication, OAuth 2.0, refresh token rotation, real-time communication using SignalR, and background processing. Collaborates with cross-functional teams, owning backend development and API integration with mobile and frontend applications. Interested in software architecture, backend security, database optimization, and maintainable software systems.',
      'طالب علوم حاسب ومطور نظم خلفية .NET بخبرة عملية في تصميم وتطوير أنظمة خلفية قابلة للتوسع باستخدام C# و ASP.NET Core. خبرة في بناء واجهات RESTful APIs، وتطبيق معمارية Clean Architecture ونمط CQRS، وتصميم قواعد البيانات العلائقية، وتطوير آليات مصادقة وتفويض آمنة.\n\nخبرة تطبيقية في منصات SaaS السحابية متعددة المستأجرين، ومصادقة JWT، وOAuth 2.0، وتدوير Refresh Tokens، والاتصال اللحظي عبر SignalR، ومعالجة المهام الخلفية. أعمل بتعاون وثيق مع فرق العمل المتكاملة لقيادة التطوير الخلفي وربط الخدمات مع تطبيقات الموبايل والواجهات الأمامية. شغوف بهندسة البرمجيات، أمان النظم الخلفية، تحسين قواعد البيانات، وبناء أنظمة برمجية عالية الاستقرار.',
      'amratefkandel@gmail.com',
      '@amratefkandel',
      'Ismailia, Egypt',
      'الإسماعيلية، مصر',
      'https://github.com/amratef2005',
      'https://linkedin.com/in/amr-atef-kandel',
      'https://wa.me/amratefkandel',
      '/Amr_Kandel_Resume_ATS.pdf',
      2,
      10
    ];
    await pool.query(updateProfileQuery, profileParams);
    console.log('portfolio_profile updated successfully.');

    // 3. Update portfolio_projects
    console.log('Cleaning and updating portfolio_projects...');
    // Delete any projects other than studysync-lms (remove mot7km-saas from projects)
    await pool.query("DELETE FROM public.portfolio_projects WHERE id != 'studysync-lms'");
    
    // Update studysync-lms
    const updateProjectQuery = `
      UPDATE public.portfolio_projects
      SET
        title = $1,
        title_ar = $2,
        tagline = $3,
        tagline_ar = $4,
        description = $5,
        description_ar = $6,
        category = $7,
        featured = true,
        badge = $8,
        architecture = $9,
        technologies = $10,
        metrics = $11,
        features = $12,
        github_url = $13,
        live_url = $14
      WHERE id = 'studysync-lms'
    `;
    const projectParams = [
      'Academic Management System',
      'نظام الإدارة الأكاديمية والتعليمية',
      'Clean Architecture, CQRS & Automated Testing',
      'معمارية نظيفة ونمط CQRS واختبارات مؤتمتة',
      'Developed the backend of an academic management system to organize educational operations through a scalable and maintainable architecture. Applied Clean Architecture to separate Domain, Application, Infrastructure, and Presentation layers. Implemented CQRS to organize application commands and queries. Developed authentication and session management functionality. Implemented course management features and structured error-handling mechanisms. Supported separate application portals for different user roles. Contributed to automated testing and application reliability, achieving 49 passing automated tests with a 100% pass rate.',
      'تطوير النظام الخلفي لمنظومة إدارة أكاديمية متكاملة لتنظيم العمليات التعليمية عبر معمارية برمجية قابلة للتوسع والصيانة. تطبيق مبادئ Clean Architecture لفصل طبقات Domain و Application و Infrastructure و Presentation. تطبيق نمط CQRS لتنظيم الأوامر والاستعلامات وفصلها بدقة. تطوير منظومة المصادقة وإدارة الجلسات للمستخدمين. بناء وظائف إدارة المقررات والمساقات الدراسية وتطبيق آليات معالجة أخطاء هيكلية موحدة. دعم بوابات منفصلة لمختلف أدوار المستخدمين والصلاحيات. المساهمة في الاختبارات المؤتمتة وضمان موثوقية النظام، محققاً 49 اختباراً مؤتمتاً ناجحاً بنسبة اجتياز 100%.',
      '.NET & Backend',
      'Clean Architecture • 49 Tests (100%)',
      JSON.stringify(['Domain Layer', 'Application Layer (CQRS)', 'Infrastructure Layer', 'Presentation Layer (API)']),
      JSON.stringify(['C#', '.NET 10', 'ASP.NET Core', 'PostgreSQL', 'Entity Framework Core', 'Clean Architecture', 'CQRS']),
      JSON.stringify([
        { label: 'Automated Tests', value: '49 Passed', icon: 'CheckCircle2' },
        { label: 'Pass Rate', value: '100%', icon: 'ShieldCheck' },
        { label: 'Architecture', value: 'Clean & CQRS', icon: 'Layers' },
        { label: 'Database', value: 'PostgreSQL & EF', icon: 'Database' }
      ]),
      JSON.stringify([
        'Separation of Domain, Application, Infrastructure & Presentation layers',
        'CQRS pattern for segregating commands and queries',
        'Authentication and session management functionality',
        'Course management features with structured error handling',
        'Separate application portals for different user roles',
        '49 automated tests achieving 100% pass rate'
      ]),
      'https://github.com/amratef2005',
      ''
    ];
    await pool.query(updateProjectQuery, projectParams);
    console.log('portfolio_projects updated successfully.');

    // 4. Clear portfolio_certificates to match CV
    console.log('Emptying portfolio_certificates...');
    await pool.query("DELETE FROM public.portfolio_certificates");
    console.log('portfolio_certificates cleared.');

    // 5. Update portfolio_skills with the 8 categories from CV
    console.log('Updating portfolio_skills...');
    await pool.query("DELETE FROM public.portfolio_skills");
    
    const skillCategories = [
      {
        id: 'prog-languages',
        name: 'Programming Languages',
        name_ar: 'لغات البرمجة',
        icon: 'Code2',
        display_order: 1,
        skills: JSON.stringify(['C#', 'SQL'])
      },
      {
        id: 'backend-dev',
        name: 'Backend Development',
        name_ar: 'تطوير النظم الخلفية',
        icon: 'Server',
        display_order: 2,
        skills: JSON.stringify(['.NET 10', 'ASP.NET Core Web API', 'RESTful API Development', 'Entity Framework Core', 'Dependency Injection', 'Middleware', 'Background Services'])
      },
      {
        id: 'arch-design',
        name: 'Architecture & Design',
        name_ar: 'المعمارية وتصميم الأنظمة',
        icon: 'Layers',
        display_order: 3,
        skills: JSON.stringify(['Clean Architecture', 'Modular Monolith', 'CQRS', 'DTOs', 'Manual Mapping', 'Separation of Concerns'])
      },
      {
        id: 'db-orm',
        name: 'Databases & ORM',
        name_ar: 'قواعد البيانات و ORM',
        icon: 'Database',
        display_order: 4,
        skills: JSON.stringify(['Microsoft SQL Server', 'PostgreSQL', 'Supabase', 'Entity Framework Core', 'Database Migrations', 'Relational Database Design'])
      },
      {
        id: 'auth-security',
        name: 'Authentication & Security',
        name_ar: 'المصادقة وأمان النظم',
        icon: 'ShieldCheck',
        display_order: 5,
        skills: JSON.stringify(['JWT Authentication', 'OAuth 2.0', 'Phone OTP Authentication', 'Refresh Token Rotation', 'SHA-256 Hashing', 'Multi-Tenant Authorization', 'Ownership Authorization', 'IDOR Prevention'])
      },
      {
        id: 'realtime-perf',
        name: 'Real-Time & Performance',
        name_ar: 'الأنظمة اللحظية والأداء',
        icon: 'Zap',
        display_order: 6,
        skills: JSON.stringify(['SignalR', 'Background Processing', 'Batch Processing', 'Asynchronous Programming'])
      },
      {
        id: 'val-doc',
        name: 'Validation & Documentation',
        name_ar: 'التحقق والتوثيق البرمجي',
        icon: 'FileCheck',
        display_order: 7,
        skills: JSON.stringify(['FluentValidation', 'Swagger / OpenAPI', 'Postman'])
      },
      {
        id: 'devops-tools',
        name: 'DevOps & Tools',
        name_ar: 'أدوات التطوير و DevOps',
        icon: 'GitBranch',
        display_order: 8,
        skills: JSON.stringify(['Git', 'GitHub', 'GitHub Actions', 'CI/CD', 'IIS Deployment'])
      }
    ];

    for (const cat of skillCategories) {
      await pool.query(
        `INSERT INTO public.portfolio_skills (id, name, name_ar, icon, display_order, skills, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
        [cat.id, cat.name, cat.name_ar, cat.icon, cat.display_order, cat.skills]
      );
    }
    console.log('portfolio_skills populated with 8 CV categories.');

    console.log('--- ALL SUPABASE TABLES SUCCESSFULLY SYNCHRONIZED ---');
    await pool.end();
  } catch (err) {
    console.error('Migration failed:', err);
    await pool.end();
    process.exit(1);
  }
}

run();
