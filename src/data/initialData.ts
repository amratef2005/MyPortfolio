import { ProfileInfo, Project, Certificate, SkillCategory, Experience } from '../types';

export const initialProfile: ProfileInfo = {
  name: "Amr Atef Imam Mahmoud",
  nameAr: "عمرو عاطف إمام محمود",
  shortName: "Amr Atef",
  shortNameAr: "عمرو عاطف",
  brandName: "Amr Atef",
  brandNameAr: "عمرو عاطف",
  title: ".NET Backend Developer",
  titleAr: "مطور نظم خلفية .NET",
  bio: "Computer Science student and .NET Backend Developer with hands-on experience designing and developing scalable backend systems using C# and ASP.NET Core. Experienced in building RESTful APIs, implementing Clean Architecture and CQRS patterns, designing relational databases, and developing secure authentication and authorization mechanisms.\n\nPractical experience in multi-tenant SaaS applications, JWT authentication, OAuth 2.0, refresh token rotation, real-time communication using SignalR, and background processing. Collaborates with cross-functional teams, owning backend development and API integration with mobile and frontend applications. Interested in software architecture, backend security, database optimization, and maintainable software systems.",
  bioAr: "طالب علوم حاسب ومطور نظم خلفية .NET بخبرة عملية في تصميم وتطوير أنظمة خلفية قابلة للتوسع باستخدام C# و ASP.NET Core. خبرة في بناء واجهات RESTful APIs، وتطبيق معمارية Clean Architecture ونمط CQRS، وتصميم قواعد البيانات العلائقية، وتطوير آليات مصادقة وتفويض آمنة.\n\nخبرة تطبيقية في منصات SaaS السحابية متعددة المستأجرين، ومصادقة JWT، وOAuth 2.0، وتدوير Refresh Tokens، والاتصال اللحظي عبر SignalR، ومعالجة المهام الخلفية. أعمل بتعاون وثيق مع فرق العمل المتكاملة لقيادة التطوير الخلفي وربط الخدمات مع تطبيقات الموبايل والواجهات الأمامية. شغوف بهندسة البرمجيات، أمان النظم الخلفية، تحسين قواعد البيانات، وبناء أنظمة برمجية عالية الاستقرار.",
  email: "amratefkandel@gmail.com",
  phone: "@amratefkandel",
  location: "Ismailia, Egypt",
  locationAr: "الإسماعيلية، مصر",
  github: "https://github.com/amratef2005",
  linkedin: "https://linkedin.com/in/amr-atef-kandel",
  whatsapp: "https://wa.me/amratefkandel",
  resumeUrl: "/Amr_Kandel_Resume_ATS.pdf",
  topAvatarUrl: "/my.jpg",
  heroAvatarUrl: "/drama_hero.png",
  aboutAvatarUrl: "/about_avatar.png",
  autoExtractColors: false,
  yearsOfExperience: 1,
  completedProjects: 10,
  adminUsername: "amratefkandel",
  adminPassword: "KandelAmr###14",
  adminPin: "1414",

  // Custom Editable Headings & Names Across Sections
  heroGreeting: "Hello, I am",
  heroGreetingAr: "مرحباً، أنا",
  aboutSubtitle: "Backend Architecture & Engineering",
  aboutSubtitleAr: "هندسة ومعمارية النظم الخلفية",
  aboutHeading: "Building Resilient, Scalable & High-Throughput Systems",
  aboutHeadingAr: "بناء أنظمة خلفية فائقة الأداء وقابلة للتوسع بأعلى معايير الأمان",
  experienceHeading: "Production Backend Experience",
  experienceHeadingAr: "الخبرات العملية في تطوير النظم الخلفية",
  projectsHeading: "Key Technical Architecture Projects",
  projectsHeadingAr: "المشاريع التقنية والمعمارية البرمجية",
  certificatesHeading: "Credentials & Accreditations",
  certificatesHeadingAr: "الشهادات والاعتمادات",
  skillsHeading: "Backend Technical Competencies",
  skillsHeadingAr: "القدرات والمهارات التقنية في النظم الخلفية",
  contactHeading: "Have Any Project? Let's Chat",
  contactHeadingAr: "لديك مشروع أو استشارة هندسية؟ دعنا نتحدث",

  // 1. Work Availability & Presence Status
  availabilityStatus: "available",
  availabilityNoteAr: "متاح للمشاريع والفرص الهندسية",
  availabilityNoteEn: "Available for Backend Roles & Contracts",
  showAvailabilityBadge: true,

  // 2. WhatsApp Live Response Status
  whatsappStatus: "online",
  whatsappNoteAr: "متاح الآن للرد السريع عبر @amratefkandel",
  whatsappNoteEn: "Online • Fast Reply (@amratefkandel)",
  showWhatsAppStatus: true,

  // Education & Languages
  university: "Suez Canal University – Faculty of Science",
  universityAr: "جامعة قناة السويس – كلية العلوم",
  degree: "Bachelor of Science (B.Sc.) in Mathematics – Computer Science Program | Fourth Year Student (In Progress)",
  degreeAr: "بكالوريوس العلوم في الرياضيات وعلوم الحاسب | طالب بالفرقة الرابعة (قيد الدراسة)",
  languages: "Arabic: Native | English: Intermediate",
  languagesAr: "العربية: لغة أم | الإنجليزية: مستوى متوسط",

  // Teamwork & Collaboration
  teamwork: [
    "Worked in development teams of Backend, Mobile, and Frontend developers.",
    "Took responsibility for backend architecture, API development, and database integration.",
    "Collaborated with Mobile and Frontend developers to integrate backend services.",
    "Participated in technical discussions and implementation decisions."
  ],
  teamworkAr: [
    "العمل ضمن فرق تطوير برمجية متكاملة تضم مطوري Backend و Mobile و Frontend.",
    "تولي مسؤولية معمارية النظام الخلفي، وتطوير الـ APIs، وتكامل قواعد البيانات.",
    "التعاون المستمر مع مطوري الموبايل والفرونت إند لربط وتكامل الخدمات الخلفية بسلاسة.",
    "المشاركة الفعالة في النقاشات التقنية واتخاذ القرارات الهندسية ومعايير التطوير."
  ]
};

export const initialExperiences: Experience[] = [
  {
    id: "mot7km-saas",
    role: "Backend Developer",
    roleAr: "مطور نظم خلفية",
    company: "Multi-Tenant SaaS ERP & Digital Menu Platform",
    companyAr: "منصة إدارة المطاعم والمنيو السحابي متعددة المستأجرين (SaaS)",
    period: "May 2026 – Present",
    periodAr: "مايو 2026 – حتى الآن",
    location: "Remote • Egypt",
    locationAr: "عن بُعد • مصر",
    type: "Production SaaS • High Concurrency",
    typeAr: "نظام SaaS إنتاجي حي",
    badge: "Multi-Tenant SaaS • Backend Developer",
    badgeAr: "نظام SaaS متعدد المستأجرين • مطور نظم خلفية",
    summary: "Developed the backend of a multi-tenant SaaS platform for restaurants, cafés, and businesses to manage their digital presence and operations.",
    summaryAr: "تطوير النظام الخلفي لمنصة SaaS تجارية متعددة المستأجرين تمكّن المطاعم، الكافيهات، والأنشطة التجارية من إدارة حضورهم الرقمي وعملياتهم التشغيلية بكفاءة عالية.",
    architecture: [
      "Clean Architecture",
      "Modular Monolith",
      "Multi-Tenancy & Tenant Isolation",
      "Refresh Token Rotation (SHA-256)",
      "Background Batch Processing",
      "SignalR WebSockets"
    ],
    architectureAr: [
      "معمارية نظيفة (Clean Architecture)",
      "نواة موديولار موحدة (Modular Monolith)",
      "تعدد المستأجرين وعزل البيانات (Multi-Tenancy)",
      "تدوير التوكنات وتشفير SHA-256",
      "معالجة الدفعات في الخلفية",
      "اتصال لحظي SignalR"
    ],
    technologies: [
      "C#",
      ".NET 10",
      "ASP.NET Core",
      "PostgreSQL",
      "Entity Framework Core",
      "Supabase",
      "SignalR",
      "GitHub Actions",
      "IIS"
    ],
    metrics: [
      { label: "Architecture", labelAr: "المعمارية الأساسية", value: "Modular Monolith", valueAr: "نواة موديولار" },
      { label: "Security & Tokens", labelAr: "الأمان والجلسات", value: "SHA-256 Rotation", valueAr: "تدوير التوكنات بـ SHA-256" },
      { label: "Multi-Tenancy", labelAr: "عزل المستأجرين", value: "Tenant Isolation", valueAr: "عزل آمن للبيانات" },
      { label: "Real-time & Batch", labelAr: "الاتصال اللحظي والدفعات", value: "SignalR + Batch Queue", valueAr: "SignalR + معالجة دفعات" }
    ],
    responsibilities: [
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
    responsibilitiesAr: [
      "تصميم وتطبيق معمارية Clean Architecture بنمط Modular Monolith لضمان قابلية التوسع والصيانة.",
      "تطوير واجهات برمجة تطبيقات RESTful APIs لملفات الأنشطة التجارية، الفروع، قوائم الطعام، التصنيفات، المنتجات، وحملات العروض الترويجية.",
      "تطبيق نظام تعدد المستأجرين (Multi-Tenancy) وعزل البيانات لضمان فصل آمن ومحكم لبيانات كل نشاط تجاري ومنع ثغرات IDOR.",
      "تطوير آليات مصادقة هجينة تدعم JWT، و OAuth، والتحقق عبر رقم الهاتف (Phone OTP).",
      "تطبيق إدارة جلسات آمنة باستخدام تدوير الـ Refresh Tokens، وانتهاء الصلاحية الانزلاقي (Sliding Expiration)، وكشف إعادة الاستخدام.",
      "استخدام خوارزمية SHA-256 لتشفير وحفظ الـ Refresh Tokens في قاعدة البيانات بأعلى معايير الأمان.",
      "تطوير واجهات لوحة التحكم الإدارية (Dashboard APIs) لتقديم تحليلات الأعمال وإحصائيات الأداء التفصيلية.",
      "دمج مكتبة SignalR لتحديثات لوحة التحكم والإشعارات في الوقت الفعلي (Real-time Updates).",
      "تنفيذ معالجة دفعات خلفية (Background Batch Processing) لتتبع مشاهدات المنتجات وتحسين استهلاك موارد قاعدة البيانات.",
      "إعداد وتكوين تدفقات النشر المؤتمت (CI/CD) باستخدام GitHub Actions والاستضافة عبر خوادم IIS."
    ],
    githubUrl: "https://github.com/amratef2005",
    liveUrl: "https://mot7km.store"
  }
];

export const initialProjects: Project[] = [
  {
    id: "academic-management-system",
    title: "Academic Management System",
    titleAr: "نظام الإدارة الأكاديمية",
    tagline: "Academic Management System with Clean Architecture, CQRS & Automated Testing",
    taglineAr: "نظام إدارة أكاديمية متكامل بمعمارية Clean Architecture ونمط CQRS واختبارات مؤتمتة",
    description: "Developed the backend of an academic management system to organize educational operations through a scalable and maintainable architecture. Applied Clean Architecture to separate Domain, Application, Infrastructure, and Presentation layers, implemented CQRS to organize application commands and queries, developed authentication and session management, course management, structured error handling, supported separate portals for different user roles, and achieved 49 passing automated tests with a 100% pass rate.",
    descriptionAr: "تطوير النظام الخلفي لنظام إدارة أكاديمية لتنظيم العمليات التعليمية عبر معمارية قابلة للتوسع والصيانة. تطبيق معمارية Clean Architecture للفصل بين طبقات Domain و Application و Infrastructure و Presentation، وتطبيق نمط CQRS، وبناء وظائف المصادقة وإدارة المقررات، مع تحقيق 49 اختباراً مؤتمتاً ناجحاً بنسبة 100%.",
    category: ".NET & Backend",
    featured: true,
    badge: "CQRS + Clean Architecture • 49 Tests 100%",
    badgeAr: "معمارية نظيفة ونمط CQRS • 49 اختباراً ناجحاً 100%",
    architecture: ["Clean Architecture", "CQRS Pattern", "Domain Separation", "Structured Error Handling", "Automated Testing Suite"],
    architectureAr: ["معمارية نظيفة (Clean Architecture)", "نمط CQRS", "فصل الطبقات والمجال (Domain Separation)", "معالجة منظمة للأخطاء", "حزمة اختبارات مؤتمتة"],
    technologies: ["C#", ".NET 10", "ASP.NET Core", "PostgreSQL", "Entity Framework Core", "Clean Architecture", "CQRS", "xUnit"],
    metrics: [
      { label: "Automated Tests", labelAr: "الاختبارات المؤتمتة", value: "49 Passing (100%)", valueAr: "49 اختباراً ناجحاً (100%)" },
      { label: "Architecture", labelAr: "النمط المعماري", value: "Clean Architecture", valueAr: "معمارية نظيفة" },
      { label: "Pattern", labelAr: "تنظيم الأوامر والاستعلامات", value: "CQRS Pattern", valueAr: "نمط CQRS" },
      { label: "Portals", labelAr: "بوابات الأدوار", value: "Multi-Role Portals", valueAr: "بوابات منفصلة للأدوار" }
    ],
    features: [
      "Applied Clean Architecture to separate Domain, Application, Infrastructure, and Presentation layers.",
      "Implemented CQRS to organize application commands and queries.",
      "Developed authentication and session management functionality.",
      "Implemented course management features and structured error-handling mechanisms.",
      "Supported separate application portals for different user roles.",
      "Contributed to automated testing and application reliability, achieving 49 passing automated tests with a 100% pass rate."
    ],
    featuresAr: [
      "تطبيق معمارية Clean Architecture لفصل طبقات Domain و Application و Infrastructure و Presentation بشكل محكم.",
      "تطبيق نمط CQRS لتنظيم ومعالجة أوامر واستعلامات التطبيق بمرونة وكفاءة.",
      "تطوير وظائف المصادقة وإدارة الجلسات للمستخدمين باحترافية.",
      "بناء ميزات إدارة المقررات الدراسية وآليات معالجة وتتبع الأخطاء المنظمة.",
      "دعم بوابات منفصلة ومخصصة لمختلف أدوار المستخدمين بصلاحيات محددة.",
      "المساهمة في الاختبارات المؤتمتة وموثوقية التطبيق، وتحقيق 49 اختباراً مؤتمتاً ناجحاً بنسبة اجتياز 100%."
    ],
    githubUrl: "https://github.com/amratef2005",
    liveUrl: "https://studysync.runasp.net"
  }
];

export const initialCertificates: Certificate[] = [
  {
    id: "iti-database-fundamentals",
    title: "Database Fundamentals",
    titleAr: "أساسيات قواعد البيانات (Database Fundamentals)",
    issuer: "ITI Platform (Information Technology Institute)",
    issuerAr: "منصة معهد تكنولوجيا المعلومات (ITI)",
    date: "03/11/25",
    fileUrl: "/iti.pdf",
    badge: "2h 47m • Code: nyse31Kf2H",
    badgeAr: "ساعتان و47 دقيقة • كود: nyse31Kf2H",
    description: "Certificate of Completion — ITI Platform certifies that Amr Atef has successfully completed Database Fundamentals. Course time: 2 Hour, 47 Minutes • Completion date: 03/11/25 • Verification code: nyse31Kf2H.",
    descriptionAr: "شهادة إتمام معتمدة من منصة معهد تكنولوجيا المعلومات (ITI) في دورة Database Fundamentals — مدة الدورة: ساعتان و47 دقيقة • تاريخ الإتمام: 03/11/25 • رمز التحقق: nyse31Kf2H."
  },
  {
    id: "udemy-csharp-intermediate",
    title: "C# Mastering Course For Intermediates",
    titleAr: "إتقان لغة C# للمستوى المتوسط",
    issuer: "Udemy • Instructors: Kioomars Jonood, Samaneh Mazidi Sharaf Abadi",
    issuerAr: "Udemy • المدربون: Kioomars Jonood, Samaneh Mazidi Sharaf Abadi",
    date: "Jan. 27, 2026",
    fileUrl: "/cshar.pdf",
    badge: "Udemy • 9 total hours",
    badgeAr: "Udemy • 9 ساعات تدريبية",
    description: "Certificate of Completion from Udemy for C# Mastering Course For Intermediates (Length: 9 total hours), instructed by Kioomars Jonood and Samaneh Mazidi Sharaf Abadi on Jan. 27, 2026.",
    descriptionAr: "شهادة إتمام من منصة Udemy لدورة C# Mastering Course For Intermediates (المدة: 9 ساعات) بإشراف المدربين Kioomars Jonood و Samaneh Mazidi Sharaf Abadi بتاريخ Jan. 27, 2026."
  }
];

export const initialSkillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    nameAr: "لغات البرمجة",
    icon: "Code",
    skills: [
      { name: "C#", level: 95, tag: "Primary Language", tagAr: "لغة التطوير الأساسية" },
      { name: "SQL", level: 92, tag: "Relational Queries", tagAr: "استعلامات علائقية" }
    ]
  },
  {
    name: "Backend Development",
    nameAr: "تطوير النظم الخلفية",
    icon: "Server",
    skills: [
      { name: ".NET 10", level: 95, tag: "Core Framework", tagAr: "أحدث إصدار إطار العمل" },
      { name: "ASP.NET Core Web API", level: 95, tag: "RESTful Services", tagAr: "واجهات برمجية REST" },
      { name: "RESTful API Development", level: 94, tag: "API Design", tagAr: "تصميم واجهات برمجية" },
      { name: "Entity Framework Core", level: 92, tag: "ORM & Optimization", tagAr: "إدارة البيانات و ORM" },
      { name: "Dependency Injection", level: 92, tag: "IoC & Inversion", tagAr: "حقن التبعيات" },
      { name: "Middleware", level: 90, tag: "Request Pipeline", tagAr: "معالجة الطلبات" },
      { name: "Background Services", level: 88, tag: "Async Workers", tagAr: "خدمات المعالجة الخلفية" }
    ]
  },
  {
    name: "Architecture & Design",
    nameAr: "المعمارية وتصميم الأنظمة",
    icon: "Cpu",
    skills: [
      { name: "Clean Architecture", level: 95, tag: "Domain Separation", tagAr: "معمارية نظيفة وفصل الطبقات" },
      { name: "Modular Monolith", level: 90, tag: "Modular Design", tagAr: "نواة موديولار موحدة" },
      { name: "CQRS", level: 92, tag: "Commands & Queries", tagAr: "فصل الأوامر والاستعلامات" },
      { name: "DTOs", level: 94, tag: "Data Transfer", tagAr: "كائنات نقل البيانات" },
      { name: "Manual Mapping", level: 92, tag: "High Performance", tagAr: "تحويل يدوي عالي الأداء" },
      { name: "Separation of Concerns", level: 95, tag: "Best Practices", tagAr: "فصل المسؤوليات والاهتمامات" }
    ]
  },
  {
    name: "Databases & ORM",
    nameAr: "قواعد البيانات وإدارة الـ ORM",
    icon: "Database",
    skills: [
      { name: "Microsoft SQL Server", level: 90, tag: "Enterprise DB", tagAr: "قواعد بيانات مؤسسية" },
      { name: "PostgreSQL", level: 92, tag: "Relational DB", tagAr: "قواعد بيانات علائقية" },
      { name: "Supabase", level: 90, tag: "Cloud DB", tagAr: "قواعد بيانات سحابية" },
      { name: "Entity Framework Core", level: 92, tag: "ORM", tagAr: "محرك ORM" },
      { name: "Database Migrations", level: 90, tag: "Schema Migration", tagAr: "ترقية وهجرة المخططات" },
      { name: "Relational Database Design", level: 92, tag: "Normalization", tagAr: "تصميم المخططات العلائقية" }
    ]
  },
  {
    name: "Authentication & Security",
    nameAr: "المصادقة وأمن الأنظمة",
    icon: "Shield",
    skills: [
      { name: "JWT Authentication", level: 94, tag: "Token Security", tagAr: "توكنات المصادقة" },
      { name: "OAuth 2.0", level: 90, tag: "Delegated Auth", tagAr: "المصادقة المفوضة" },
      { name: "Phone OTP Authentication", level: 92, tag: "Two-Factor Auth", tagAr: "تحقق رمز الهاتف" },
      { name: "Refresh Token Rotation", level: 94, tag: "Session Security", tagAr: "تدوير التوكنات الآمن" },
      { name: "SHA-256 Hashing", level: 92, tag: "Cryptography", tagAr: "تشفير التجزئة" },
      { name: "Multi-Tenant Authorization", level: 92, tag: "Tenant Isolation", tagAr: "عزل صلاحيات المستأجرين" },
      { name: "Ownership Authorization", level: 90, tag: "Access Control", tagAr: "التحكم في ملكية الموارد" },
      { name: "IDOR Prevention", level: 94, tag: "Security Hardening", tagAr: "حماية ضد ثغرات IDOR" }
    ]
  },
  {
    name: "Real-Time & Performance",
    nameAr: "الاتصال اللحظي وتحسين الأداء",
    icon: "Zap",
    skills: [
      { name: "SignalR", level: 90, tag: "WebSockets", tagAr: "اتصال لحظي وتحديثات فورية" },
      { name: "Background Processing", level: 90, tag: "Async Tasks", tagAr: "معالجة المهام الخلفية" },
      { name: "Batch Processing", level: 88, tag: "Batch Optimization", tagAr: "معالجة الدفعات المجمعة" },
      { name: "Asynchronous Programming", level: 95, tag: "High Concurrency", tagAr: "برمجة غير متزامنة فائقة السرعة" }
    ]
  },
  {
    name: "Validation & Documentation",
    nameAr: "التحقق والتوثيق البرمجي",
    icon: "FileCheck",
    skills: [
      { name: "FluentValidation", level: 94, tag: "Clean Validation", tagAr: "تحقق برمجي متقن" },
      { name: "Swagger / OpenAPI", level: 92, tag: "Interactive Docs", tagAr: "توثيق تفاعلي للـ APIs" },
      { name: "Postman", level: 92, tag: "API Testing", tagAr: "اختبار وتوثيق الواجهات" }
    ]
  },
  {
    name: "DevOps & Tools",
    nameAr: "أدوات التطوير والأتمتة",
    icon: "Cloud",
    skills: [
      { name: "Git", level: 92, tag: "Version Control", tagAr: "إدارة الإصدارات" },
      { name: "GitHub", level: 92, tag: "Collaboration", tagAr: "التعاون البرمجي" },
      { name: "GitHub Actions", level: 90, tag: "CI/CD Automation", tagAr: "أتمتة خطوط البناء والنشر" },
      { name: "CI/CD", level: 88, tag: "Continuous Delivery", tagAr: "التسليم والنشر المستمر" },
      { name: "IIS Deployment", level: 86, tag: "Windows Server Hosting", tagAr: "نشر وإدارة خوادم IIS" }
    ]
  }
];
