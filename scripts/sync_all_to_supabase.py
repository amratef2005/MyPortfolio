import psycopg2
import json

def get_connection():
    return psycopg2.connect(
        host="aws-0-eu-west-2.pooler.supabase.com",
        port=6543,
        user="postgres.jwdbxlvalwaoxmnpqwza",
        password="AmrAtefportfolio",
        dbname="postgres",
        sslmode="require"
    )

def sync_database():
    conn = get_connection()
    cur = conn.cursor()

    print("--- 1. Creating / Updating Tables in Supabase ---")
    
    # 1. Profile table
    cur.execute("""
    CREATE TABLE IF NOT EXISTS public.portfolio_profile (
        id VARCHAR(50) PRIMARY KEY DEFAULT 'main_profile',
        name VARCHAR(150) NOT NULL,
        name_ar VARCHAR(150) NOT NULL,
        short_name VARCHAR(100),
        short_name_ar VARCHAR(100),
        title VARCHAR(150) NOT NULL,
        title_ar VARCHAR(150) NOT NULL,
        bio TEXT NOT NULL,
        bio_ar TEXT NOT NULL,
        email VARCHAR(150) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        location VARCHAR(100) NOT NULL,
        location_ar VARCHAR(100) NOT NULL,
        github VARCHAR(255),
        linkedin VARCHAR(500),
        whatsapp VARCHAR(255),
        resume_url VARCHAR(255),
        top_avatar_url VARCHAR(255),
        years_of_experience INT DEFAULT 3,
        completed_projects INT DEFAULT 12,
        admin_username VARCHAR(100) DEFAULT 'admin',
        admin_password VARCHAR(100) DEFAULT 'admin123',
        admin_pin VARCHAR(20) DEFAULT '1234',
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    """)

    # Add columns if they didn't exist in older table
    columns_to_add = [
        ("short_name", "VARCHAR(100)"),
        ("short_name_ar", "VARCHAR(100)"),
        ("top_avatar_url", "VARCHAR(255)"),
        ("years_of_experience", "INT DEFAULT 3"),
        ("completed_projects", "INT DEFAULT 12"),
        ("admin_username", "VARCHAR(100) DEFAULT 'admin'"),
        ("admin_password", "VARCHAR(100) DEFAULT 'admin123'")
    ]
    for col_name, col_type in columns_to_add:
        try:
            cur.execute(f"ALTER TABLE public.portfolio_profile ADD COLUMN IF NOT EXISTS {col_name} {col_type};")
        except Exception as e:
            print(f"Notice on profile {col_name}:", e)

    # Add columns if they didn't exist in older projects table
    for col_name, col_type in [("display_order", "INT DEFAULT 1"), ("image", "VARCHAR(255)")]:
        try:
            cur.execute(f"ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS {col_name} {col_type};")
        except Exception as e:
            print(f"Notice on projects {col_name}:", e)

    # 2. Projects table
    cur.execute("""
    CREATE TABLE IF NOT EXISTS public.portfolio_projects (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        title_ar VARCHAR(150) NOT NULL,
        tagline VARCHAR(255) NOT NULL,
        tagline_ar VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        description_ar TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        featured BOOLEAN DEFAULT TRUE,
        badge VARCHAR(100) NOT NULL,
        architecture JSONB NOT NULL,
        technologies JSONB NOT NULL,
        metrics JSONB NOT NULL,
        features JSONB NOT NULL,
        github_url VARCHAR(255),
        live_url VARCHAR(255),
        image VARCHAR(255),
        display_order INT DEFAULT 1,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    """)

    # 3. Certificates table
    cur.execute("""
    CREATE TABLE IF NOT EXISTS public.portfolio_certificates (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        title_ar VARCHAR(200) NOT NULL,
        issuer VARCHAR(200) NOT NULL,
        issuer_ar VARCHAR(200) NOT NULL,
        date VARCHAR(50) NOT NULL,
        file_url VARCHAR(255) NOT NULL,
        preview_image VARCHAR(255),
        badge VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        description_ar TEXT NOT NULL,
        display_order INT DEFAULT 1,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    """)

    # 4. Skills table
    cur.execute("""
    CREATE TABLE IF NOT EXISTS public.portfolio_skills (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        name_ar VARCHAR(150) NOT NULL,
        icon VARCHAR(50) NOT NULL,
        skills JSONB NOT NULL,
        display_order INT DEFAULT 1,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    """)

    # 5. Messages table
    cur.execute("""
    CREATE TABLE IF NOT EXISTS public.portfolio_messages (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        subject VARCHAR(200),
        message TEXT NOT NULL,
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    """)

    print("--- 2. Populating Profile Data ---")
    profile = {
        "id": "main_profile",
        "name": "Amr Atef Imam Kandel",
        "name_ar": "عمرو عاطف إمام قنديل",
        "short_name": "Amr Atef",
        "short_name_ar": "عمرو عاطف",
        "title": "Senior .NET & Backend Architect",
        "title_ar": "مهندس نظم خلفية ومعماري .NET 10",
        "bio": "Senior Backend Engineer and Systems Architect specialized in high-performance enterprise systems, Clean Architecture, and Domain-Driven Design (DDD). Extensive experience in .NET 10, CQRS, Multi-Tenancy, PostgreSQL, and distributed caching.",
        "bio_ar": "مهندس برمجيات متقدم متخصص في بناء وتصميم الأنظمة الخلفية عالية الأداء والمعمارية النظيفة (Clean Architecture & DDD). خبرة عميقة في .NET 10، أنماط CQRS، تعدد المستأجرين (Multi-Tenancy)، وقواعد بيانات PostgreSQL، والكاش الموزع.",
        "email": "amratefkandel@gmail.com",
        "phone": "amratefkandel",
        "location": "Ismailia, Egypt",
        "location_ar": "الإسماعيلية، مصر",
        "github": "https://github.com/amratef",
        "linkedin": "https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BTY4k9EFtT8yGn8QZz2QzAQ%3D%3D",
        "whatsapp": "https://wa.me/?text=Hello%20Amr%20Atef",
        "resume_url": "/Amr_Atef_Resume.pdf",
        "top_avatar_url": "/my.jpg",
        "years_of_experience": 3,
        "completed_projects": 12,
        "admin_username": "admin",
        "admin_password": "admin123",
        "admin_pin": "1234"
    }

    cur.execute("""
    INSERT INTO public.portfolio_profile (
        id, name, name_ar, short_name, short_name_ar, title, title_ar, bio, bio_ar,
        email, phone, location, location_ar, github, linkedin, whatsapp,
        resume_url, top_avatar_url, years_of_experience, completed_projects,
        admin_username, admin_password, admin_pin, updated_at
    ) VALUES (
        %(id)s, %(name)s, %(name_ar)s, %(short_name)s, %(short_name_ar)s, %(title)s, %(title_ar)s, %(bio)s, %(bio_ar)s,
        %(email)s, %(phone)s, %(location)s, %(location_ar)s, %(github)s, %(linkedin)s, %(whatsapp)s,
        %(resume_url)s, %(top_avatar_url)s, %(years_of_experience)s, %(completed_projects)s,
        %(admin_username)s, %(admin_password)s, %(admin_pin)s, NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        name_ar = EXCLUDED.name_ar,
        short_name = EXCLUDED.short_name,
        short_name_ar = EXCLUDED.short_name_ar,
        title = EXCLUDED.title,
        title_ar = EXCLUDED.title_ar,
        bio = EXCLUDED.bio,
        bio_ar = EXCLUDED.bio_ar,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        location = EXCLUDED.location,
        location_ar = EXCLUDED.location_ar,
        github = EXCLUDED.github,
        linkedin = EXCLUDED.linkedin,
        whatsapp = EXCLUDED.whatsapp,
        resume_url = EXCLUDED.resume_url,
        top_avatar_url = EXCLUDED.top_avatar_url,
        years_of_experience = EXCLUDED.years_of_experience,
        completed_projects = EXCLUDED.completed_projects,
        admin_username = EXCLUDED.admin_username,
        admin_password = EXCLUDED.admin_password,
        admin_pin = EXCLUDED.admin_pin,
        updated_at = NOW();
    """, profile)

    print("--- 3. Populating Projects Data ---")
    projects = [
        {
            "id": "mot7km-saas",
            "title": "MOT7KM SaaS",
            "title_ar": "منصة مُتحكِّم (MOT7KM) لإدارة المطاعم والمنيو السحابي",
            "tagline": "High-Throughput Multi-Tenant SaaS ERP & Digital QR Menu Backend",
            "tagline_ar": "نظام ERP سحابي متعدد المستأجرين (Multi-Tenant) ومنيو رقمي فائق السرعة",
            "description": "Enterprise SaaS backend engineered with .NET 10, Clean Architecture, and PostgreSQL via Supabase. Features hybrid OAuth/SMS authentication, sliding session token rotation with reuse detection, and an asynchronous batch-processing queue handling thousands of concurrent QR scans under 20ms.",
            "description_ar": "نظام SaaS متكامل لإدارة المطاعم والأنشطة التجارية مبني بـ .NET 10 ومعمارية Clean Architecture مع Supabase PostgreSQL. يحتوي على مصادقة هجينة ونظام جلسات انزلاقية مع كشف تكرار التوكنات، وطابور معالجة دفعات غير متزامن للتعامل مع آلاف زيارات الـ QR بسرعة استجابة أقل من 20 ملي ثانية.",
            "category": "Cloud & SaaS",
            "featured": True,
            "badge": "Enterprise SaaS • Latency < 20ms",
            "architecture": ["Clean Architecture", "Modular Monolith", "Multi-Tenancy (IMustHaveTenant)", "Sliding Session Rotation", "Batch Queue Worker"],
            "technologies": [".NET 10", "C# 13/14", "EF Core", "PostgreSQL", "Supabase", "SignalR", "FluentValidation", "Docker", "MonsterASP CI/CD"],
            "metrics": [
                {"label": "Menu Response Latency", "value": "< 20ms"},
                {"label": "Security Model", "value": "Sliding Token Rotation"},
                {"label": "Code Reliability", "value": "0 Errors / 0 Warnings"},
                {"label": "Real-time Hub", "value": "SignalR Active Hub"}
            ],
            "features": [
                "Architected high-throughput multi-tenant SaaS backend using .NET 10, Clean Architecture, and PostgreSQL via Supabase.",
                "Implemented hybrid authentication (OAuth Google/Facebook + Phone OTP) with 15-minute Access Tokens and 30-day sliding expiration Refresh Tokens.",
                "Engineered cryptographic SHA-256 token rotation with family reuse breach detection and automatic multi-tenant data isolation (IMustHaveTenant & IDOR prevention).",
                "Designed asynchronous in-memory batch processing queue (IProductViewQueue) processing thousands of concurrent QR menu views under 20ms without database throttling.",
                "Built comprehensive admin dashboard overview service (600+ LOC) with real-time active kitchen order counts, branch telemetry, and AI-driven promotions engine.",
                "Established automated CI/CD pipeline via GitHub Actions targeting MonsterASP with zero-downtime file deployment via app_offline.htm."
            ],
            "github_url": "https://github.com/amratef",
            "live_url": "https://mot7km.com",
            "display_order": 1
        },
        {
            "id": "studysync-lms",
            "title": "StudySync Platform",
            "title_ar": "منصة StudySync الأكاديمية الذكية",
            "tagline": "Academic Management & Automated Attendance Platform with Clean Architecture & CQRS",
            "tagline_ar": "نظام الإدارة الأكاديمية والحضور الذكي بمعمارية نظيفة ونمط CQRS",
            "description": "Modern academic management system designed with .NET 10, Clean Architecture, MediatR (CQRS), and PostgreSQL. Fully backed by 49 automated tests passing with 100% success rate, featuring smart QR code attendance and role-separated portals for doctors and students.",
            "description_ar": "منصة أكاديمية حديثة للجامعات والمعاهد مبنية بـ .NET 10 ونمط CQRS عبر مكتبة MediatR وقاعدة بيانات PostgreSQL. مدعومة بـ 49 اختباراً مؤتمتاً بنسبة نجاح 100%، وتوفر نظام تسجيل أكاديمي وحضور ذكي عبر الـ QR Code وبوابات منفصلة للأساتذة والطلاب.",
            "category": ".NET & Backend",
            "featured": True,
            "badge": "CQRS + MediatR • 49 Tests Passing 100%",
            "architecture": ["Clean Architecture", "CQRS (MediatR)", "Domain-Driven Design (DDD)", "Specification Pattern", "Result Pattern"],
            "technologies": [".NET 10", "MediatR", "EF Core", "PostgreSQL", "xUnit & FluentAssertions", "JWT Bearer", "Swagger OpenAPI", "RunASP CI/CD"],
            "metrics": [
                {"label": "Test Suite Pass Rate", "value": "100% (49 Tests)"},
                {"label": "Architectural Pattern", "value": "CQRS + MediatR"},
                {"label": "Database Engine", "value": "PostgreSQL"},
                {"label": "CI/CD Deployment", "value": "RunASP Automated"}
            ],
            "features": [
                "Decoupled read and write operations strictly using CQRS pattern with MediatR pipeline behaviors for validation and performance tracking.",
                "Achieved 100% test pass rate across 49 comprehensive automated unit and integration tests covering domain entities and command handlers.",
                "Designed automated dynamic QR-code lecture attendance engine with time-decay cryptographic validation preventing attendance spoofing.",
                "Built comprehensive academic course offering and student enrollment engine with automated cumulative GPA computation.",
                "Implemented enterprise RFC 7807 ProblemDetails centralized exception handling with FluentValidation pipeline integration."
            ],
            "github_url": "https://github.com/amratef",
            "live_url": "https://studysync.runasp.net",
            "display_order": 2
        }
    ]

    for p in projects:
        cur.execute("""
        INSERT INTO public.portfolio_projects (
            id, title, title_ar, tagline, tagline_ar, description, description_ar,
            category, featured, badge, architecture, technologies, metrics, features,
            github_url, live_url, display_order, updated_at
        ) VALUES (
            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW()
        )
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
            display_order = EXCLUDED.display_order,
            updated_at = NOW();
        """, (
            p["id"], p["title"], p["title_ar"], p["tagline"], p["tagline_ar"],
            p["description"], p["description_ar"], p["category"], p["featured"],
            p["badge"], json.dumps(p["architecture"]), json.dumps(p["technologies"]),
            json.dumps(p["metrics"]), json.dumps(p["features"]),
            p["github_url"], p["live_url"], p["display_order"]
        ))

    print("--- 4. Populating Certificates Data ---")
    certificates = [
        {
            "id": "iti-diploma",
            "title": "Information Technology Institute (ITI)",
            "title_ar": "دبلومة معهد تكنولوجيا المعلومات (ITI) - وزارة الاتصالات",
            "issuer": "Ministry of Communications and Information Technology (MCIT)",
            "issuer_ar": "معهد تكنولوجيا المعلومات (ITI)",
            "date": "2024",
            "file_url": "/iti.pdf",
            "preview_image": "/certificate.png",
            "badge": "Professional Diploma",
            "description": "Intensive professional training program covering modern software engineering, advanced C#, ASP.NET Core, database administration, software architecture, and agile enterprise development.",
            "description_ar": "تدريب مكثف على هندسة البرمجيات الاحترافية، تقنيات C# المتقدمة، معمارية الأنظمة، وتطوير الأنظمة المؤسسية وفق أحدث معايير السوق العالمية.",
            "display_order": 1
        },
        {
            "id": "csharp-certification",
            "title": "Advanced C# & .NET Engineering Certificate",
            "title_ar": "شهادة هندسة وتطوير C# و .NET المتقدمة",
            "issuer": "Accredited Technical Institute",
            "issuer_ar": "جهة تقنية معتمدة",
            "date": "2024",
            "file_url": "/cshar.pdf",
            "preview_image": "/certificate.png",
            "badge": "Official Certification",
            "description": "Specialized validation in advanced C# language features, asynchronous programming, LINQ, memory management, and EF Core performance optimization.",
            "description_ar": "شهادة تخصصية في إتقان لغة C# الحديثة، البرمجة غير المتزامنة (Async/Await)، إدارة الذاكرة، والتحسين الفائق لاستعلامات EF Core.",
            "display_order": 2
        }
    ]

    for c in certificates:
        cur.execute("""
        INSERT INTO public.portfolio_certificates (
            id, title, title_ar, issuer, issuer_ar, date, file_url,
            preview_image, badge, description, description_ar, display_order, updated_at
        ) VALUES (
            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            title_ar = EXCLUDED.title_ar,
            issuer = EXCLUDED.issuer,
            issuer_ar = EXCLUDED.issuer_ar,
            date = EXCLUDED.date,
            file_url = EXCLUDED.file_url,
            preview_image = EXCLUDED.preview_image,
            badge = EXCLUDED.badge,
            description = EXCLUDED.description,
            description_ar = EXCLUDED.description_ar,
            display_order = EXCLUDED.display_order,
            updated_at = NOW();
        """, (
            c["id"], c["title"], c["title_ar"], c["issuer"], c["issuer_ar"],
            c["date"], c["file_url"], c["preview_image"], c["badge"],
            c["description"], c["description_ar"], c["display_order"]
        ))

    print("--- 5. Populating Skills Data ---")
    skills = [
        {
            "id": "backend-dotnet",
            "name": "Core Backend & .NET",
            "name_ar": "الأنظمة الخلفية وبيئة .NET",
            "icon": "Server",
            "skills": [
                {"name": ".NET 10 / .NET 8", "level": 95, "tag": "Primary Stack"},
                {"name": "C# (Advanced)", "level": 95, "tag": "Core Language"},
                {"name": "ASP.NET Core Web API", "level": 95, "tag": "REST & RPC"},
                {"name": "Entity Framework Core", "level": 90, "tag": "ORM & Optimization"},
                {"name": "MediatR & CQRS", "level": 92, "tag": "Architectural Pattern"},
                {"name": "SignalR (Real-time)", "level": 88, "tag": "WebSockets"}
            ],
            "display_order": 1
        },
        {
            "id": "architecture-design",
            "name": "Architecture & Best Practices",
            "name_ar": "المعمارية وأفضل الممارسات",
            "icon": "Cpu",
            "skills": [
                {"name": "Clean Architecture", "level": 95, "tag": "Design Strategy"},
                {"name": "Domain-Driven Design (DDD)", "level": 88, "tag": "Domain Logic"},
                {"name": "Multi-Tenancy Architecture", "level": 90, "tag": "SaaS Isolation"},
                {"name": "Unit & Integration Testing (xUnit)", "level": 92, "tag": "TDD / E2E"},
                {"name": "Design Patterns (GoF)", "level": 90, "tag": "Patterns"}
            ],
            "display_order": 2
        },
        {
            "id": "databases-caching",
            "name": "Databases & Caching",
            "name_ar": "قواعد البيانات وإدارة الذاكرة",
            "icon": "Database",
            "skills": [
                {"name": "PostgreSQL & Supabase", "level": 90, "tag": "Relational DB"},
                {"name": "SQL Server (T-SQL)", "level": 88, "tag": "Enterprise DB"},
                {"name": "Redis Distributed Caching", "level": 85, "tag": "In-Memory Cache"},
                {"name": "Database Indexing & Query Tuning", "level": 86, "tag": "High Performance"}
            ],
            "display_order": 3
        },
        {
            "id": "devops-cloud",
            "name": "DevOps & Cloud Deployment",
            "name_ar": "الحوسبة السحابية والنشر المؤتمت",
            "icon": "Cloud",
            "skills": [
                {"name": "GitHub Actions (CI/CD)", "level": 88, "tag": "Automated Pipelines"},
                {"name": "Docker & Containerization", "level": 82, "tag": "Containers"},
                {"name": "MonsterASP & RunASP Hosting", "level": 90, "tag": "IIS / Cloud"},
                {"name": "Git & Version Control", "level": 92, "tag": "Workflow"}
            ],
            "display_order": 4
        }
    ]

    for s in skills:
        cur.execute("""
        INSERT INTO public.portfolio_skills (
            id, name, name_ar, icon, skills, display_order, updated_at
        ) VALUES (
            %s, %s, %s, %s, %s, %s, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            name_ar = EXCLUDED.name_ar,
            icon = EXCLUDED.icon,
            skills = EXCLUDED.skills,
            display_order = EXCLUDED.display_order,
            updated_at = NOW();
        """, (
            s["id"], s["name"], s["name_ar"], s["icon"],
            json.dumps(s["skills"]), s["display_order"]
        ))

    conn.commit()

    print("\n--- Verification Summary of Supabase Public Tables ---")
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;")
    tables = [r[0] for r in cur.fetchall()]
    for t in tables:
        cur.execute(f"SELECT count(*) FROM public.{t};")
        count = cur.fetchone()[0]
        print(f"Table '{t}': {count} rows")

    cur.close()
    conn.close()
    print("\nAll Portfolio Data has been successfully synced to Supabase!")

if __name__ == '__main__':
    sync_database()
