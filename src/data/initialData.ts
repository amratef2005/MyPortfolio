import { ProfileInfo, Project, Certificate, SkillCategory } from '../types';

export const initialProfile: ProfileInfo = {
  name: "Amr Atef Imam Mahmoud",
  nameAr: "عمرو عاطف إمام محمود",
  shortName: "Amr Atef",
  shortNameAr: "عمرو عاطف",
  title: ".NET Backend Developer",
  titleAr: "مطور نظم خلفية .NET",
  bio: "Computer Science student and .NET Backend Developer with hands-on experience designing and developing scalable backend systems using C# and ASP.NET Core. Experienced in building RESTful APIs, implementing Clean Architecture and CQRS patterns, designing relational databases, and developing secure authentication and authorization mechanisms. Practical experience in multi-tenant SaaS applications, JWT authentication, OAuth 2.0, refresh token rotation, real-time communication using SignalR, and background processing. Collaborates with cross-functional teams, owning backend development and API integration with mobile and frontend applications. Interested in software architecture, backend security, database optimization, and maintainable software systems.",
  bioAr: "طالب علوم حاسب ومطور نظم خلفية .NET بخبرة عملية في تصميم وتطوير أنظمة خلفية قابلة للتوسع باستخدام C# و ASP.NET Core. خبير في بناء واجهات برمجة التطبيقات RESTful APIs، وتطبيق معمارية Clean Architecture ونمط CQRS، وتصميم قواعد البيانات العلائقية، وتطوير آليات مصادقة وتفويض قوية وآمنة. أمتلك خبرة عملية في تطبيقات SaaS متعددة المستأجرين (Multi-Tenant)، ومصادقة JWT و OAuth 2.0، وتدوير الـ Refresh Tokens، والاتصال اللحظي عبر SignalR، والمعالجة في الخلفية. أتعاون بفاعلية مع الفرق البرمجية المختلفة كمسؤول عن تطوير النظم الخلفية وتكامل الـ APIs مع تطبيقات الموبايل والفرونت إند. مهتم بهندسة البرمجيات، وأمان الأنظمة الخلفية، وتحسين أداء قواعد البيانات، وبناء نظم برمجية مستدامة.",
  email: "amratefkandel@gmail.com",
  phone: "@amratefkandel",
  location: "Ismailia, Egypt",
  locationAr: "الإسماعيلية، مصر",
  github: "https://github.com/amratef2005",
  linkedin: "https://linkedin.com/in/amr-atef-kandel",
  whatsapp: "https://wa.me/?text=Hello%20Amr%20Atef",
  resumeUrl: "/Amr_Atef_Resume.pdf",
  topAvatarUrl: "/my.jpg",
  yearsOfExperience: 2,
  completedProjects: 10,
  adminUsername: "admin",
  adminPassword: "admin123",
  adminPin: "1234",

  // 1. Work Availability & Presence Status
  availabilityStatus: "available",
  availabilityNoteAr: "جاهز للفرص الهندسية والمشاريع المبتكرة",
  availabilityNoteEn: "Available for High-Impact Backend Roles",
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
  degreeAr: "بكالوريوس العلوم في الرياضيات وعلوم الحاسب | طالب بالفرقة الرابعة",
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

export const initialProjects: Project[] = [
  {
    id: "mot7km-saas",
    title: "Multi-Tenant SaaS ERP & Digital Menu Platform",
    titleAr: "منصة مُتحكِّم (MOT7KM) لإدارة المطاعم والمنيو السحابي",
    tagline: "High-Throughput Multi-Tenant SaaS ERP & Digital QR Menu Backend",
    taglineAr: "نظام ERP سحابي متعدد المستأجرين (Multi-Tenant) ومنيو رقمي فائق السرعة",
    description: "Developed the backend of a multi-tenant SaaS platform for restaurants, cafés, and businesses to manage their digital presence and operations. Designed with Clean Architecture and a Modular Monolith approach, developing RESTful APIs, multi-tenant isolation, JWT/OAuth/OTP authentication, sliding session management with refresh token rotation and SHA-256 hashing, dashboard APIs, SignalR real-time updates, and background batch processing.",
    descriptionAr: "تطوير النظام الخلفي لمنصة SaaS متعددة المستأجرين لإدارة المطاعم والكافيهات وتنظيم حضورهم وعملياتهم الرقمية. تم بناؤه بمعمارية Clean Architecture ونمط Modular Monolith، مع عزل بيانات المستأجرين، ومصادقة هجينة (JWT, OAuth, OTP)، وتدوير الجلسات الانزلاقية بتشفير SHA-256، وتحديثات لحظية عبر SignalR، ومعالجة دفعات خلفية فائقة السرعة.",
    category: "Cloud & SaaS",
    featured: true,
    badge: "Multi-Tenant SaaS • Backend Developer",
    badgeAr: "نظام SaaS متعدد المستأجرين • مطور نظم خلفية",
    architecture: ["Clean Architecture", "Modular Monolith", "Multi-Tenancy & Tenant Isolation", "Refresh Token Rotation (SHA-256)", "Background Batch Processing"],
    architectureAr: ["معمارية نظيفة (Clean Architecture)", "نواة موديولار موحدة (Modular Monolith)", "تعدد المستأجرين وعزل البيانات (Multi-Tenancy)", "تدوير التوكنات وتشفير SHA-256", "معالجة الدفعات في الخلفية"],
    technologies: ["C#", ".NET 10", "ASP.NET Core", "PostgreSQL", "Entity Framework Core", "Supabase", "SignalR", "GitHub Actions", "IIS"],
    metrics: [
      { label: "Architecture", labelAr: "المعمارية الأساسية", value: "Modular Monolith", valueAr: "نواة موديولار" },
      { label: "Security & Tokens", labelAr: "الأمان والجلسات", value: "SHA-256 Rotation", valueAr: "تدوير التوكنات بـ SHA-256" },
      { label: "Multi-Tenancy", labelAr: "عزل المستأجرين", value: "Tenant Isolation", valueAr: "عزل آمن للبيانات" },
      { label: "Real-time & Batch", labelAr: "الاتصال اللحظي والدفعات", value: "SignalR + Batch Queue", valueAr: "SignalR + معالجة دفعات" }
    ],
    features: [
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
    featuresAr: [
      "تصميم وتطبيق معمارية Clean Architecture بنمط Modular Monolith لضمان قابلية التوسع وسهولة الصيانة.",
      "تطوير واجهات برمجة تطبيقات RESTful APIs لملفات الأنشطة التجارية، الفروع، قوائم الطعام، التصنيفات، المنتجات، وحملات العروض الترويجية.",
      "تطبيق نظام تعدد المستأجرين (Multi-Tenancy) وعزل البيانات لضمان فصل آمن ومحكم لبيانات كل نشاط تجاري.",
      "تطوير آليات مصادقة متعددة تدعم JWT، و OAuth، والتحقق عبر رقم الهاتف (Phone OTP).",
      "تطبيق إدارة جلسات آمنة باستخدام تدوير الـ Refresh Tokens، وانتهاء الصلاحية الانزلاقي (Sliding Expiration)، وكشف إعادة الاستخدام.",
      "استخدام خوارزمية SHA-256 لتشفير وحفظ الـ Refresh Tokens في قاعدة البيانات.",
      "تطوير واجهات لوحة التحكم الإدارية (Dashboard APIs) لتقديم تحليلات الأعمال وإحصائيات الأداء التفصيلية.",
      "دمج مكتبة SignalR لتحديثات لوحة التحكم والإشعارات في الوقت الفعلي (Real-time Updates).",
      "تنفيذ معالجة دفعات خلفية (Background Batch Processing) لتتبع مشاهدات المنتجات وتحسين استهلاك موارد قاعدة البيانات.",
      "إعداد وتكوين تدفقات النشر المؤتمت (CI/CD) باستخدام GitHub Actions والاستضافة عبر خوادم IIS."
    ],
    githubUrl: "https://github.com/amratef2005",
    liveUrl: "https://mot7km.com"
  },
  {
    id: "studysync-lms",
    title: "Academic Management System",
    titleAr: "نظام الإدارة الأكاديمية (StudySync)",
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
    id: "iti-diploma",
    title: "Information Technology Institute (ITI)",
    titleAr: "دبلومة معهد تكنولوجيا المعلومات (ITI) - وزارة الاتصالات",
    issuer: "Ministry of Communications and Information Technology (MCIT)",
    issuerAr: "معهد تكنولوجيا المعلومات (ITI)",
    date: "2024",
    fileUrl: "/iti.pdf",
    previewImage: "/certificate.png",
    badge: "Professional Training",
    badgeAr: "تدريب مهني معتمد",
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
    name: "Backend Development & Languages",
    nameAr: "تطوير النظم الخلفية ولغات البرمجة",
    icon: "Server",
    skills: [
      { name: "C#", level: 95, tag: "Primary Language", tagAr: "لغة التطوير الأساسية" },
      { name: "SQL", level: 92, tag: "Relational Queries", tagAr: "استعلامات علائقية" },
      { name: ".NET 10 / ASP.NET Core Web API", level: 95, tag: "RESTful APIs", tagAr: "واجهات برمجية REST" },
      { name: "Entity Framework Core", level: 92, tag: "ORM & Optimization", tagAr: "إدارة البيانات و ORM" },
      { name: "Dependency Injection & Middleware", level: 90, tag: "Core Architecture", tagAr: "حقن التبعيات والبرمجيات الوسيطة" },
      { name: "Background Services", level: 88, tag: "Async Workers", tagAr: "خدمات المعالجة الخلفية" }
    ]
  },
  {
    name: "Architecture & System Design",
    nameAr: "المعمارية وتصميم الأنظمة",
    icon: "Cpu",
    skills: [
      { name: "Clean Architecture", level: 95, tag: "Domain Separation", tagAr: "معمارية نظيفة وفصل الطبقات" },
      { name: "Modular Monolith", level: 90, tag: "Modular Design", tagAr: "نواة موديولار موحدة" },
      { name: "CQRS Pattern", level: 92, tag: "Commands & Queries", tagAr: "فصل الأوامر والاستعلامات" },
      { name: "DTOs & Manual Mapping", level: 94, tag: "Data Transformation", tagAr: "تحويل ونقل البيانات" },
      { name: "Separation of Concerns", level: 95, tag: "Best Practices", tagAr: "فصل المسؤوليات والاهتمامات" }
    ]
  },
  {
    name: "Databases, ORM & Real-Time",
    nameAr: "قواعد البيانات والاتصال اللحظي",
    icon: "Database",
    skills: [
      { name: "Microsoft SQL Server", level: 90, tag: "Enterprise DB", tagAr: "قواعد بيانات مؤسسية" },
      { name: "PostgreSQL & Supabase", level: 92, tag: "Relational Cloud DB", tagAr: "قواعد بيانات سحابية" },
      { name: "Database Migrations & Relational Design", level: 90, tag: "Schema Design", tagAr: "تصميم المخططات وترقية البيانات" },
      { name: "SignalR (Real-Time Communication)", level: 88, tag: "WebSockets", tagAr: "اتصال لحظي وتحديثات فورية" },
      { name: "Background & Batch Processing", level: 88, tag: "Performance Tuning", tagAr: "معالجة دفعات في الخلفية" },
      { name: "Asynchronous Programming", level: 94, tag: "High Concurrency", tagAr: "برمجة غير متزامنة عالية الأداء" }
    ]
  },
  {
    name: "Security, Validation & DevOps",
    nameAr: "الأمان، التحقق وأدوات النشر",
    icon: "Cloud",
    skills: [
      { name: "JWT & OAuth 2.0 Authentication", level: 94, tag: "Auth Standards", tagAr: "معايير المصادقة الحديثة" },
      { name: "Phone OTP & Refresh Token Rotation", level: 92, tag: "Session Security", tagAr: "تدوير التوكنات وأمان الجلسات" },
      { name: "SHA-256 Hashing & IDOR Prevention", level: 92, tag: "Data Protection", tagAr: "تشفير وحماية ضد ثغرات IDOR" },
      { name: "Multi-Tenant & Ownership Authorization", level: 90, tag: "Tenant Isolation", tagAr: "عزل المستأجرين والصلاحيات" },
      { name: "FluentValidation & Swagger / OpenAPI", level: 92, tag: "Docs & Validation", tagAr: "توثيق الـ API والتحقق" },
      { name: "Git, GitHub & GitHub Actions (CI/CD)", level: 88, tag: "Automation", tagAr: "أتمتة خطوط النشر CI/CD" },
      { name: "IIS Deployment", level: 86, tag: "Hosting & Servers", tagAr: "نشر وإدارة خوادم IIS" }
    ]
  }
];
