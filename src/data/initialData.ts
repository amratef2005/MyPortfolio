import { ProfileInfo, Project, Certificate, SkillCategory } from '../types';

export const initialProfile: ProfileInfo = {
  name: "Amr Atef Imam Kandel",
  nameAr: "عمرو عاطف إمام قنديل",
  shortName: "Amr Atef",
  shortNameAr: "عمرو عاطف",
  title: "Senior .NET & Backend Architect",
  titleAr: "مهندس نظم خلفية ومعماري .NET 10",
  bio: "Senior Backend Engineer and Systems Architect specialized in high-performance enterprise systems, Clean Architecture, and Domain-Driven Design (DDD). Extensive experience in .NET 10, CQRS, Multi-Tenancy, PostgreSQL, and distributed caching.",
  bioAr: "مهندس برمجيات متقدم متخصص في بناء وتصميم الأنظمة الخلفية عالية الأداء والمعمارية النظيفة (Clean Architecture & DDD). خبرة عميقة في .NET 10، أنماط CQRS، تعدد المستأجرين (Multi-Tenancy)، وقواعد بيانات PostgreSQL، والكاش الموزع.",
  email: "amratefkandel@gmail.com",
  phone: "amratefkandel",
  location: "Ismailia, Egypt",
  locationAr: "الإسماعيلية، مصر",
  github: "https://github.com/amratef",
  linkedin: "https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BTY4k9EFtT8yGn8QZz2QzAQ%3D%3D",
  whatsapp: "https://wa.me/?text=Hello%20Amr%20Atef",
  isWhatsAppAvailable: true,
  whatsappStatus: "available",
  whatsappCustomNoteAr: "متاح الآن للرد الفوري",
  whatsappCustomNoteEn: "Available for immediate reply",
  showFloatingWhatsApp: true,
  resumeUrl: "/Amr_Atef_Resume.pdf",
  topAvatarUrl: "/my.jpg",
  yearsOfExperience: 3,
  completedProjects: 12,
  adminUsername: "admin",
  adminPassword: "admin123",
  adminPin: "1234",
};

export const initialProjects: Project[] = [
  {
    id: "mot7km-saas",
    title: "MOT7KM SaaS",
    titleAr: "منصة مُتحكِّم (MOT7KM) لإدارة المطاعم والمنيو السحابي",
    tagline: "High-Throughput Multi-Tenant SaaS ERP & Digital QR Menu Backend",
    taglineAr: "نظام ERP سحابي متعدد المستأجرين (Multi-Tenant) ومنيو رقمي فائق السرعة",
    description: "Enterprise SaaS backend engineered with .NET 10, Clean Architecture, and PostgreSQL via Supabase. Features hybrid OAuth/SMS authentication, sliding session token rotation with reuse detection, and an asynchronous batch-processing queue handling thousands of concurrent QR scans under 20ms.",
    descriptionAr: "نظام SaaS متكامل لإدارة المطاعم والأنشطة التجارية مبني بـ .NET 10 ومعمارية Clean Architecture مع Supabase PostgreSQL. يحتوي على مصادقة هجينة ونظام جلسات انزلاقية مع كشف تكرار التوكنات، وطابور معالجة دفعات غير متزامن للتعامل مع آلاف زيارات الـ QR بسرعة استجابة أقل من 20 ملي ثانية.",
    category: "Cloud & SaaS",
    featured: true,
    badge: "Enterprise SaaS • Latency < 20ms",
    badgeAr: "نظام سحابي مؤسسي (SaaS) • زمن استجابة < 20ms",
    architecture: ["Clean Architecture", "Modular Monolith", "Multi-Tenancy (IMustHaveTenant)", "Sliding Session Rotation", "Batch Queue Worker"],
    architectureAr: ["معمارية نظيفة (Clean Architecture)", "نواة موديولار موحدة (Modular Monolith)", "تعدد المستأجرين (Multi-Tenancy)", "تدوير الجلسات الانزلاقية (Sliding Tokens)", "طابور معالجة الدفعات (Batch Queue)"],
    technologies: [".NET 10", "C# 13/14", "EF Core", "PostgreSQL", "Supabase", "SignalR", "FluentValidation", "Docker", "MonsterASP CI/CD"],
    metrics: [
      { label: "Menu Response Latency", labelAr: "زمن استجابة المنيو", value: "< 20ms", valueAr: "< 20 ملي ثانية" },
      { label: "Security Model", labelAr: "نموذج الأمان", value: "Sliding Token Rotation", valueAr: "جلسات انزلاقية مشفرة" },
      { label: "Code Reliability", labelAr: "استقرار الكود البرمجي", value: "0 Errors / 0 Warnings", valueAr: "0 أخطاء / 0 تحذيرات" },
      { label: "Real-time Hub", labelAr: "قناة الاتصال اللحظي", value: "SignalR Active Hub", valueAr: "اتصال SignalR حي ومباشر" }
    ],
    features: [
      "Architected high-throughput multi-tenant SaaS backend using .NET 10, Clean Architecture, and PostgreSQL via Supabase.",
      "Implemented hybrid authentication (OAuth Google/Facebook + Phone OTP) with 15-minute Access Tokens and 30-day sliding expiration Refresh Tokens.",
      "Engineered cryptographic SHA-256 token rotation with family reuse breach detection and automatic multi-tenant data isolation (IMustHaveTenant & IDOR prevention).",
      "Designed asynchronous in-memory batch processing queue (IProductViewQueue) processing thousands of concurrent QR menu views under 20ms without database throttling.",
      "Built comprehensive admin dashboard overview service (600+ LOC) with real-time active kitchen order counts, branch telemetry, and AI-driven promotions engine.",
      "Established automated CI/CD pipeline via GitHub Actions targeting MonsterASP with zero-downtime file deployment via app_offline.htm."
    ],
    featuresAr: [
      "بناء وتصميم نواة SaaS سحابية متعددة المستأجرين فائقة السرعة باستخدام .NET 10 ومعمارية Clean Architecture مع Supabase PostgreSQL، محققاً زمن استجابة يقل عن 20 ملي ثانية.",
      "تطبيق نظام مصادقة هجين (Google/Facebook OAuth + OTP الرسائل النصية) مع توكنات وصول لمدة 15 دقيقة وتوكنات تحديث انزلاقية لمدة 30 يوماً.",
      "هندسة تدوير التوكنات بتشفير SHA-256 مع كشف خرق وإعادة استخدام التوكن وعزل بيانات المشتركين تلقائياً (IMustHaveTenant ومنع هجمات IDOR).",
      "تصميم طابور معالجة دفعات غير متزامن في الذاكرة (IProductViewQueue) لمعالجة آلاف زيارات المنيو اللحظية دون إجهاد قاعدة البيانات.",
      "تطوير لوحة تحكم إدارية متكاملة (أكثر من 600 سطر برمجي) مع إحصائيات حية لطلبات المطبخ عبر SignalR ومحرك عروض تسويقية ذكي.",
      "إنشاء خط أنابيب نشر مؤتمت (CI/CD) عبر GitHub Actions مستهدفاً MonsterASP مع نشر بدون توقف الخدمة (Zero-Downtime) عبر ملفات app_offline.htm."
    ],
    githubUrl: "https://github.com/amratef",
    liveUrl: "https://mot7km.com"
  },
  {
    id: "studysync-lms",
    title: "StudySync Platform",
    titleAr: "منصة StudySync الأكاديمية الذكية",
    tagline: "Academic Management & Automated Attendance Platform with Clean Architecture & CQRS",
    taglineAr: "نظام الإدارة الأكاديمية والحضور الذكي بمعمارية نظيفة ونمط CQRS",
    description: "Modern academic management system designed with .NET 10, Clean Architecture, MediatR (CQRS), and PostgreSQL. Fully backed by 49 automated tests passing with 100% success rate, featuring smart QR code attendance and role-separated portals for doctors and students.",
    descriptionAr: "منصة أكاديمية حديثة للجامعات والمعاهد مبنية بـ .NET 10 ونمط CQRS عبر مكتبة MediatR وقاعدة بيانات PostgreSQL. مدعومة بـ 49 اختباراً مؤتمتاً بنسبة نجاح 100%، وتوفر نظام تسجيل أكاديمي وحضور ذكي عبر الـ QR Code وبوابات منفصلة للأساتذة والطلاب.",
    category: ".NET & Backend",
    featured: true,
    badge: "CQRS + MediatR • 49 Tests Passing 100%",
    badgeAr: "نمط CQRS مع MediatR • 49 اختباراً ناجحاً 100%",
    architecture: ["Clean Architecture", "CQRS (MediatR)", "Domain-Driven Design (DDD)", "Specification Pattern", "Result Pattern"],
    architectureAr: ["معمارية نظيفة (Clean Architecture)", "نمط CQRS عبر MediatR", "التصميم الموجه بالنطاق (DDD)", "نمط التخصيص (Specification Pattern)", "نمط النتيجة الآمن (Result Pattern)"],
    technologies: [".NET 10", "MediatR", "EF Core", "PostgreSQL", "xUnit & FluentAssertions", "JWT Bearer", "Swagger OpenAPI", "RunASP CI/CD"],
    metrics: [
      { label: "Test Suite Pass Rate", labelAr: "نسبة اجتياز الاختبارات", value: "100% (49 Tests)", valueAr: "100% (49 اختباراً)" },
      { label: "Architectural Pattern", labelAr: "النمط المعماري الأساسي", value: "CQRS + MediatR", valueAr: "نمط CQRS عبر MediatR" },
      { label: "Database Engine", labelAr: "محرك قواعد البيانات", value: "PostgreSQL", valueAr: "قواعد بيانات PostgreSQL" },
      { label: "CI/CD Deployment", labelAr: "النشر السحابي المؤتمت", value: "RunASP Automated", valueAr: "نشر آلي على RunASP" }
    ],
    features: [
      "Decoupled read and write operations strictly using CQRS pattern with MediatR pipeline behaviors for validation and performance tracking.",
      "Achieved 100% test pass rate across 49 comprehensive automated unit and integration tests covering domain entities and command handlers.",
      "Designed automated dynamic QR-code lecture attendance engine with time-decay cryptographic validation preventing attendance spoofing.",
      "Built comprehensive academic course offering and student enrollment engine with automated cumulative GPA computation.",
      "Implemented enterprise RFC 7807 ProblemDetails centralized exception handling with FluentValidation pipeline integration."
    ],
    featuresAr: [
      "فصل صارم بين عمليات القراءة والكتابة باستخدام نمط CQRS ومكتبة MediatR مع خطوط وسيطة (Pipeline Behaviors) للتحقق ومراقبة الأداء.",
      "تحقيق نسبة نجاح 100% عبر 49 اختباراً مؤتمتاً شاملاً (Unit & Integration Tests) تغطي كيانات النطاق ومعالجات الأوامر بدقة.",
      "تصميم محرك ذكي للحضور بالمحاضرات عبر QR Code ديناميكي مع تحقق تشفيري متغير زمنياً لمنع التحايل على تسجيل الحضور.",
      "بناء نظام متكامل لتسجيل المقررات والتحاق الطلاب مع احتساب تلقائي للمعدل التراكمي (GPA) والتحقق التلقائي من المتطلبات السابقة.",
      "تطبيق معالجة استثناءات مركزية مؤسسية متوافقة مع معيار RFC 7807 ProblemDetails ومدمجة مع مكتبة التحقق FluentValidation."
    ],
    githubUrl: "https://github.com/amratef",
    liveUrl: "https://studysync.runasp.net"
  }
];

export const initialCertificates: Certificate[] = [
  {
    id: "iti-diploma",
    title: "Information Technology Institute (ITI)",
    titleAr: "دبلومة معهد تكنولوجيا المعلومات (ITI) - وزارة الاتصالات",
    issuer: "Ministry of Communications and Information Technology (MCIT)",
    issuerAr: "معهد تكنولوجيا المعلومات (ITI)",
    date: "2024",
    fileUrl: "/iti.pdf",
    previewImage: "/certificate.png",
    badge: "Professional Diploma",
    badgeAr: "دبلومة مهنية معتمدة",
    description: "Intensive professional training program covering modern software engineering, advanced C#, ASP.NET Core, database administration, software architecture, and agile enterprise development.",
    descriptionAr: "تدريب مكثف على هندسة البرمجيات الاحترافية، تقنيات C# المتقدمة، معمارية الأنظمة، وتطوير الأنظمة المؤسسية وفق أحدث معايير السوق العالمية."
  },
  {
    id: "csharp-certification",
    title: "Advanced C# & .NET Engineering Certificate",
    titleAr: "شهادة هندسة وتطوير C# و .NET المتقدمة",
    issuer: "Accredited Technical Institute",
    issuerAr: "جهة تقنية معتمدة",
    date: "2024",
    fileUrl: "/cshar.pdf",
    previewImage: "/certificate.png",
    badge: "Official Certification",
    badgeAr: "شهادة هندسية معتمدة",
    description: "Specialized validation in advanced C# language features, asynchronous programming, LINQ, memory management, and EF Core performance optimization.",
    descriptionAr: "شهادة تخصصية في إتقان لغة C# الحديثة، البرمجة غير المتزامنة (Async/Await)، إدارة الذاكرة، والتحسين الفائق لاستعلامات EF Core."
  }
];

export const initialSkillCategories: SkillCategory[] = [
  {
    name: "Core Backend & .NET",
    nameAr: "الأنظمة الخلفية وبيئة .NET",
    icon: "Server",
    skills: [
      { name: ".NET 10 / .NET 8", level: 95, tag: "Primary Stack", tagAr: "التقنية الأساسية" },
      { name: "C# (Advanced)", level: 95, tag: "Core Language", tagAr: "لغة التطوير الأساسية" },
      { name: "ASP.NET Core Web API", level: 95, tag: "REST & RPC", tagAr: "خدمات REST والاتصال" },
      { name: "Entity Framework Core", level: 90, tag: "ORM & Optimization", tagAr: "إدارة وتحسين البيانات" },
      { name: "MediatR & CQRS", level: 92, tag: "Architectural Pattern", tagAr: "نمط معماري معتمد" },
      { name: "SignalR (Real-time)", level: 88, tag: "WebSockets", tagAr: "اتصال فوري WebSockets" }
    ]
  },
  {
    name: "Architecture & Best Practices",
    nameAr: "المعمارية وأفضل الممارسات",
    icon: "Cpu",
    skills: [
      { name: "Clean Architecture", level: 95, tag: "Design Strategy", tagAr: "استراتيجية معمارية" },
      { name: "Domain-Driven Design (DDD)", level: 88, tag: "Domain Logic", tagAr: "منطق النطاق الموجه" },
      { name: "Multi-Tenancy Architecture", level: 90, tag: "SaaS Isolation", tagAr: "عزل المستأجرين السحابي" },
      { name: "Unit & Integration Testing (xUnit)", level: 92, tag: "TDD / E2E", tagAr: "اختبارات مؤتمتة شاملة" },
      { name: "Design Patterns (GoF)", level: 90, tag: "Patterns", tagAr: "أنماط التصميم (GoF)" }
    ]
  },
  {
    name: "Databases & Caching",
    nameAr: "قواعد البيانات وإدارة الذاكرة",
    icon: "Database",
    skills: [
      { name: "PostgreSQL & Supabase", level: 90, tag: "Relational DB", tagAr: "قواعد بيانات علائقية" },
      { name: "SQL Server (T-SQL)", level: 88, tag: "Enterprise DB", tagAr: "قواعد بيانات مؤسسية" },
      { name: "Redis Distributed Caching", level: 85, tag: "In-Memory Cache", tagAr: "كاش سريع في الذاكرة" },
      { name: "Database Indexing & Query Tuning", level: 86, tag: "High Performance", tagAr: "تحسين الأداء والفهرسة" }
    ]
  },
  {
    name: "DevOps & Cloud Deployment",
    nameAr: "الحوسبة السحابية والنشر المؤتمت",
    icon: "Cloud",
    skills: [
      { name: "GitHub Actions (CI/CD)", level: 88, tag: "Automated Pipelines", tagAr: "خطوط أنابيب النشر المؤتمت" },
      { name: "Docker & Containerization", level: 82, tag: "Containers", tagAr: "حاويات برمجية معزولة" },
      { name: "MonsterASP & RunASP Hosting", level: 90, tag: "IIS / Cloud", tagAr: "استضافة سحابية وخوادم" },
      { name: "Git & Version Control", level: 92, tag: "Workflow", tagAr: "إدارة ومزامنة الإصدارات" }
    ]
  }
];
