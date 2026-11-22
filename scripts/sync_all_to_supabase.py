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
        years_of_experience INT DEFAULT 2,
        completed_projects INT DEFAULT 10,
        admin_username VARCHAR(100) DEFAULT 'admin',
        admin_password VARCHAR(100) DEFAULT 'admin123',
        admin_pin VARCHAR(20) DEFAULT '1234',
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    """)

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
        "name": "Amr Atef Imam Mahmoud",
        "name_ar": "عمرو عاطف إمام محمود",
        "short_name": "Amr Atef",
        "short_name_ar": "عمرو عاطف",
        "title": ".NET Backend Developer",
        "title_ar": "مطور نظم خلفية .NET",
        "bio": "Computer Science student and .NET Backend Developer with hands-on experience designing and developing scalable backend systems using C# and ASP.NET Core. Experienced in building RESTful APIs, implementing Clean Architecture and CQRS patterns, designing relational databases, and developing secure authentication and authorization mechanisms. Practical experience in multi-tenant SaaS applications, JWT authentication, OAuth 2.0, refresh token rotation, real-time communication using SignalR, and background processing. Collaborates with cross-functional teams, owning backend development and API integration with mobile and frontend applications. Interested in software architecture, backend security, database optimization, and maintainable software systems.",
        "bio_ar": "طالب علوم حاسب ومطور نظم خلفية .NET بخبرة عملية في تصميم وتطوير أنظمة خلفية قابلة للتوسع باستخدام C# و ASP.NET Core. خبير في بناء واجهات برمجة التطبيقات RESTful APIs، وتطبيق معمارية Clean Architecture ونمط CQRS، وتصميم قواعد البيانات العلائقية، وتطوير آليات مصادقة وتفويض قوية وآمنة. أمتلك خبرة عملية في تطبيقات SaaS متعددة المستأجرين (Multi-Tenant)، ومصادقة JWT و OAuth 2.0، وتدوير الـ Refresh Tokens، والاتصال اللحظي عبر SignalR، والمعالجة في الخلفية. أتعاون بفاعلية مع الفرق البرمجية المختلفة كمسؤول عن تطوير النظم الخلفية وتكامل الـ APIs مع تطبيقات الموبايل والفرونت إند. مهتم بهندسة البرمجيات، وأمان الأنظمة الخلفية، وتحسين أداء قواعد البيانات، وبناء نظم برمجية مستدامة.",
        "email": "amratefkandel@gmail.com",
        "phone": "@amratefkandel",
        "location": "Ismailia, Egypt",
        "location_ar": "الإسماعيلية، مصر",
        "github": "https://github.com/amratef2005",
        "linkedin": "https://linkedin.com/in/amr-atef-kandel",
        "whatsapp": "https://wa.me/?text=Hello%20Amr%20Atef",
        "resume_url": "/Amr_Atef_Resume.pdf",
        "top_avatar_url": "/my.jpg",
        "years_of_experience": 2,
        "completed_projects": 10,
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
            "title": "Multi-Tenant SaaS ERP & Digital Menu Platform",
            "title_ar": "منصة مُتحكِّم (MOT7KM) لإدارة المطاعم والمنيو السحابي",
            "tagline": "High-Throughput Multi-Tenant SaaS ERP & Digital QR Menu Backend",
            "tagline_ar": "نظام ERP سحابي متعدد المستأجرين (Multi-Tenant) ومنيو رقمي فائق السرعة",
            "description": "Developed the backend of a multi-tenant SaaS platform for restaurants, cafés, and businesses to manage their digital presence and operations. Designed with Clean Architecture and a Modular Monolith approach, developing RESTful APIs, multi-tenant isolation, JWT/OAuth/OTP authentication, sliding session management with refresh token rotation and SHA-256 hashing, dashboard APIs, SignalR real-time updates, and background batch processing.",
            "description_ar": "تطوير النظام الخلفي لمنصة SaaS متعددة المستأجرين لإدارة المطاعم والكافيهات وتنظيم حضورهم وعملياتهم الرقمية. تم بناؤه بمعمارية Clean Architecture ونمط Modular Monolith، مع عزل بيانات المستأجرين، ومصادقة هجينة (JWT, OAuth, OTP)، وتدوير الجلسات الانزلاقية بتشفير SHA-256، وتحديثات لحظية عبر SignalR، ومعالجة دفعات خلفية فائقة السرعة.",
            "category": "Cloud & SaaS",
            "featured": True,
            "badge": "Multi-Tenant SaaS • Backend Developer",
            "architecture": ["Clean Architecture", "Modular Monolith", "Multi-Tenancy & Tenant Isolation", "Refresh Token Rotation (SHA-256)", "Background Batch Processing"],
            "technologies": ["C#", ".NET 10", "ASP.NET Core", "PostgreSQL", "Entity Framework Core", "Supabase", "SignalR", "GitHub Actions", "IIS"],
            "metrics": [
                {"label": "Architecture", "value": "Modular Monolith"},
                {"label": "Security & Tokens", "value": "SHA-256 Rotation"},
                {"label": "Multi-Tenancy", "value": "Tenant Isolation"},
                {"label": "Real-time & Batch", "value": "SignalR + Batch Queue"}
            ],
            "features": [
                "Designed and implemented Clean Architecture with a Modular Monolith approach.",
                "Developed RESTful APIs for business profiles, branches, menus, categories, products, and promotional campaigns.",
                "Implemented multi-tenancy and tenant isolation to ensure secure separation of business data.",
                "Developed authentication mechanisms supporting JWT, OAuth, and phone OTP.",
                "Implemented secure session management using refresh token rotation, sliding expiration, and token reuse detection.",
                "Applied SHA-256 hashing for refresh token storage.",
                "Developed administrative dashboard APIs with business analytics and performance insights.",
                "Integrated SignalR for real-time dashboard updates.",
                "Implemented background batch processing for product view tracking to optimize database operations.",
                "Configured automated deployment workflows using GitHub Actions and IIS."
            ],
            "github_url": "https://github.com/amratef2005",
            "live_url": "https://mot7km.com",
            "display_order": 1
        },
        {
            "id": "studysync-lms",
            "title": "Academic Management System",
            "title_ar": "نظام الإدارة الأكاديمية (StudySync)",
            "tagline": "Academic Management System with Clean Architecture, CQRS & Automated Testing",
            "tagline_ar": "نظام إدارة أكاديمية متكامل بمعمارية Clean Architecture ونمط CQRS واختبارات مؤتمتة",
            "description": "Developed the backend of an academic management system to organize educational operations through a scalable and maintainable architecture. Applied Clean Architecture to separate Domain, Application, Infrastructure, and Presentation layers, implemented CQRS to organize application commands and queries, developed authentication and session management, course management, structured error handling, supported separate portals for different user roles, and achieved 49 passing automated tests with a 100% pass rate.",
            "description_ar": "تطوير النظام الخلفي لنظام إدارة أكاديمية لتنظيم العمليات التعليمية عبر معمارية قابلة للتوسع والصيانة. تطبيق معمارية Clean Architecture للفصل بين طبقات Domain و Application و Infrastructure و Presentation، وتطبيق نمط CQRS، وبناء وظائف المصادقة وإدارة المقررات، مع تحقيق 49 اختباراً مؤتمتاً ناجحاً بنسبة 100%.",
            "category": ".NET & Backend",
            "featured": True,
            "badge": "CQRS + Clean Architecture • 49 Tests 100%",
            "architecture": ["Clean Architecture", "CQRS Pattern", "Domain Separation", "Structured Error Handling", "Automated Testing Suite"],
            "technologies": ["C#", ".NET 10", "ASP.NET Core", "PostgreSQL", "Entity Framework Core", "Clean Architecture", "CQRS", "xUnit"],
            "metrics": [
                {"label": "Automated Tests", "value": "49 Passing (100%)"},
                {"label": "Architecture", "value": "Clean Architecture"},
                {"label": "Pattern", "value": "CQRS Pattern"},
                {"label": "Portals", "value": "Multi-Role Portals"}
            ],
            "features": [
                "Applied Clean Architecture to separate Domain, Application, Infrastructure, and Presentation layers.",
                "Implemented CQRS to organize application commands and queries.",
                "Developed authentication and session management functionality.",
                "Implemented course management features and structured error-handling mechanisms.",
                "Supported separate application portals for different user roles.",
                "Contributed to automated testing and application reliability, achieving 49 passing automated tests with a 100% pass rate."
            ],
            "github_url": "https://github.com/amratef2005",
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
            "badge": "Professional Training",
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
            "id": "backend-development",
            "name": "Backend Development & Languages",
            "name_ar": "تطوير النظم الخلفية ولغات البرمجة",
            "icon": "Server",
            "skills": [
                {"name": "C#", "level": 95, "tag": "Primary Language", "tagAr": "لغة التطوير الأساسية"},
                {"name": "SQL", "level": 92, "tag": "Relational Queries", "tagAr": "استعلامات علائقية"},
                {"name": ".NET 10 / ASP.NET Core Web API", "level": 95, "tag": "RESTful APIs", "tagAr": "واجهات برمجية REST"},
                {"name": "Entity Framework Core", "level": 92, "tag": "ORM & Optimization", "tagAr": "إدارة البيانات و ORM"},
                {"name": "Dependency Injection & Middleware", "level": 90, "tag": "Core Architecture", "tagAr": "حقن التبعيات والبرمجيات الوسيطة"},
                {"name": "Background Services", "level": 88, "tag": "Async Workers", "tagAr": "خدمات المعالجة الخلفية"}
            ],
            "display_order": 1
        },
        {
            "id": "architecture-design",
            "name": "Architecture & System Design",
            "name_ar": "المعمارية وتصميم الأنظمة",
            "icon": "Cpu",
            "skills": [
                {"name": "Clean Architecture", "level": 95, "tag": "Domain Separation", "tagAr": "معمارية نظيفة وفصل الطبقات"},
                {"name": "Modular Monolith", "level": 90, "tag": "Modular Design", "tagAr": "نواة موديولار موحدة"},
                {"name": "CQRS Pattern", "level": 92, "tag": "Commands & Queries", "tagAr": "فصل الأوامر والاستعلامات"},
                {"name": "DTOs & Manual Mapping", "level": 94, "tag": "Data Transformation", "tagAr": "تحويل ونقل البيانات"},
                {"name": "Separation of Concerns", "level": 95, "tag": "Best Practices", "tagAr": "فصل المسؤوليات والاهتمامات"}
            ],
            "display_order": 2
        },
        {
            "id": "databases-realtime",
            "name": "Databases, ORM & Real-Time",
            "name_ar": "قواعد البيانات والاتصال اللحظي",
            "icon": "Database",
            "skills": [
                {"name": "Microsoft SQL Server", "level": 90, "tag": "Enterprise DB", "tagAr": "قواعد بيانات مؤسسية"},
                {"name": "PostgreSQL & Supabase", "level": 92, "tag": "Relational Cloud DB", "tagAr": "قواعد بيانات سحابية"},
                {"name": "Database Migrations & Relational Design", "level": 90, "tag": "Schema Design", "tagAr": "تصميم المخططات وترقية البيانات"},
                {"name": "SignalR (Real-Time Communication)", "level": 88, "tag": "WebSockets", "tagAr": "اتصال لحظي وتحديثات فورية"},
                {"name": "Background & Batch Processing", "level": 88, "tag": "Performance Tuning", "tagAr": "معالجة دفعات في الخلفية"},
                {"name": "Asynchronous Programming", "level": 94, "tag": "High Concurrency", "tagAr": "برمجة غير متزامنة عالية الأداء"}
            ],
            "display_order": 3
        },
        {
            "id": "security-devops",
            "name": "Security, Validation & DevOps",
            "name_ar": "الأمان، التحقق وأدوات النشر",
            "icon": "Cloud",
            "skills": [
                {"name": "JWT & OAuth 2.0 Authentication", "level": 94, "tag": "Auth Standards", "tagAr": "معايير المصادقة الحديثة"},
                {"name": "Phone OTP & Refresh Token Rotation", "level": 92, "tag": "Session Security", "tagAr": "تدوير التوكنات وأمان الجلسات"},
                {"name": "SHA-256 Hashing & IDOR Prevention", "level": 92, "tag": "Data Protection", "tagAr": "تشفير وحماية ضد ثغرات IDOR"},
                {"name": "Multi-Tenant & Ownership Authorization", "level": 90, "tag": "Tenant Isolation", "tagAr": "عزل المستأجرين والصلاحيات"},
                {"name": "FluentValidation & Swagger / OpenAPI", "level": 92, "tag": "Docs & Validation", "tagAr": "توثيق الـ API والتحقق"},
                {"name": "Git, GitHub & GitHub Actions (CI/CD)", "level": 88, "tag": "Automation", "tagAr": "أتمتة خطوط النشر CI/CD"},
                {"name": "IIS Deployment", "level": 86, "tag": "Hosting & Servers", "tagAr": "نشر وإدارة خوادم IIS"}
            ],
            "display_order": 4
        }
    ]

    # Delete previous skill categories to ensure clean 4 categories
    cur.execute("DELETE FROM public.portfolio_skills;")

    for s in skills:
        cur.execute("""
        INSERT INTO public.portfolio_skills (
            id, name, name_ar, icon, skills, display_order, updated_at
        ) VALUES (
            %s, %s, %s, %s, %s, %s, NOW()
        );
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
