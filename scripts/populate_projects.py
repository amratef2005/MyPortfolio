import psycopg2
import json

conn = psycopg2.connect(
    host="aws-0-eu-west-2.pooler.supabase.com",
    port=6543,
    user="postgres.jwdbxlvalwaoxmnpqwza",
    password="AmrAtefportfolio",
    dbname="postgres",
    sslmode="require"
)
cur = conn.cursor()

projects = [
    {
        "id": "mot7km-saas",
        "title": "MOT7KM SaaS",
        "title_ar": "منصة مُتحكِّم (MOT7KM)",
        "tagline": "High-Throughput Multi-Tenant SaaS ERP & Digital QR Menu Backend",
        "tagline_ar": "نظام ERP سحابي متعدد المستأجرين (Multi-Tenant) ومنيو رقمي فائق السرعة",
        "description": "Enterprise SaaS backend engineered with .NET 10, Clean Architecture, and PostgreSQL via Supabase. Features hybrid OAuth/SMS authentication, sliding session token rotation with reuse detection, and an asynchronous batch-processing queue handling thousands of concurrent QR scans under 20ms.",
        "description_ar": "نظام SaaS متكامل لإدارة المطاعم والأنشطة التجارية مبني بـ .NET 10 ومعمارية Clean Architecture مع Supabase PostgreSQL.",
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
        "live_url": "https://mot7km.com"
    },
    {
        "id": "studysync-lms",
        "title": "StudySync Platform",
        "title_ar": "منصة StudySync الأكاديمية",
        "tagline": "Academic Management & Automated Attendance Platform with Clean Architecture & CQRS",
        "tagline_ar": "نظام الإدارة الأكاديمية والحضور الذكي بمعمارية نظيفة ونمط CQRS",
        "description": "Modern academic management system designed with .NET 10, Clean Architecture, MediatR (CQRS), and PostgreSQL. Fully backed by 49 automated tests passing with 100% success rate, featuring smart QR code attendance and role-separated portals for doctors and students.",
        "description_ar": "منصة أكاديمية حديثة للجامعات والمعاهد مبنية بـ .NET 10 ونمط CQRS عبر مكتبة MediatR وقاعدة بيانات PostgreSQL.",
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
        "live_url": "https://studysync.runasp.net"
    }
]

for p in projects:
    cur.execute("""
    INSERT INTO public.portfolio_projects (
        id, title, title_ar, tagline, tagline_ar, description, description_ar,
        category, featured, badge, architecture, technologies, metrics, features,
        github_url, live_url
    ) VALUES (
        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
    )
    ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        title_ar = EXCLUDED.title_ar,
        tagline = EXCLUDED.tagline,
        tagline_ar = EXCLUDED.tagline_ar,
        description = EXCLUDED.description,
        description_ar = EXCLUDED.description_ar,
        badge = EXCLUDED.badge,
        architecture = EXCLUDED.architecture,
        technologies = EXCLUDED.technologies,
        metrics = EXCLUDED.metrics,
        features = EXCLUDED.features,
        updated_at = NOW();
    """, (
        p["id"], p["title"], p["title_ar"], p["tagline"], p["tagline_ar"],
        p["description"], p["description_ar"], p["category"], p["featured"],
        p["badge"], json.dumps(p["architecture"]), json.dumps(p["technologies"]),
        json.dumps(p["metrics"]), json.dumps(p["features"]),
        p["github_url"], p["live_url"]
    ))

conn.commit()
print("Projects inserted / updated into Supabase successfully!")
cur.close()
conn.close()
