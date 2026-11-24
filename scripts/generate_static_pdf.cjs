const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
});

const pageWidth = 210;
const pageHeight = 297;
const marginX = 16;
const contentWidth = pageWidth - marginX * 2;
let currentY = 16;
const primaryRGB = [255, 87, 34];

const drawSectionHeader = (title) => {
  if (currentY + 12 > pageHeight - 16) {
    doc.addPage();
    currentY = 16;
  }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text(title.toUpperCase(), marginX, currentY);
  currentY += 1.8;

  doc.setDrawColor(210, 215, 222);
  doc.setLineWidth(0.35);
  doc.line(marginX, currentY, marginX + contentWidth, currentY);
  currentY += 3.8;
};

// Header
doc.setFont('helvetica', 'bold');
doc.setFontSize(18);
doc.setTextColor(15, 23, 42);
doc.text('AMR ATEF IMAM MAHMOUD', pageWidth / 2, currentY, { align: 'center' });
currentY += 5.5;

doc.setFont('helvetica', 'bold');
doc.setFontSize(10.5);
doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
doc.text('.NET BACKEND DEVELOPER', pageWidth / 2, currentY, { align: 'center' });
currentY += 4.5;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(71, 85, 105);
doc.text('C# | ASP.NET Core | SQL Server | PostgreSQL', pageWidth / 2, currentY, { align: 'center' });
currentY += 4.2;

doc.setFontSize(8);
const contactLine = 'Ismailia, Egypt  |  amratefkandel@gmail.com  |  WhatsApp: @amratefkandel  |  github.com/amratef2005';
doc.text(contactLine, pageWidth / 2, currentY, { align: 'center' });
currentY += 6;

// Professional Summary
drawSectionHeader('Professional Summary');
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(51, 65, 85);
const summaryText =
  'Computer Science student and .NET Backend Developer with hands-on experience designing and developing scalable backend systems using C# and ASP.NET Core. Experienced in building RESTful APIs, implementing Clean Architecture and CQRS patterns, designing relational databases, and developing secure authentication and authorization mechanisms.\n\nPractical experience in multi-tenant SaaS applications, JWT authentication, OAuth 2.0, refresh token rotation, real-time communication using SignalR, and background processing. Collaborates with cross-functional teams, owning backend development and API integration with mobile and frontend applications. Interested in software architecture, backend security, database optimization, and maintainable software systems.';
const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
doc.text(splitSummary, marginX, currentY);
currentY += splitSummary.length * 3.8 + 3.5;

// Technical Skills
drawSectionHeader('Technical Skills');
const skills = [
  { cat: 'Programming Languages', items: 'C#, SQL' },
  { cat: 'Backend Development', items: '.NET 10, ASP.NET Core Web API, RESTful API Development, Entity Framework Core, Dependency Injection, Middleware, Background Services' },
  { cat: 'Architecture & Design', items: 'Clean Architecture, Modular Monolith, CQRS, DTOs, Manual Mapping, Separation of Concerns' },
  { cat: 'Databases & ORM', items: 'Microsoft SQL Server, PostgreSQL, Supabase, Entity Framework Core, Database Migrations, Relational Database Design' },
  { cat: 'Authentication & Security', items: 'JWT Authentication, OAuth 2.0, Phone OTP Authentication, Refresh Token Rotation, SHA-256 Hashing, Multi-Tenant Authorization, Ownership Authorization, IDOR Prevention' },
  { cat: 'Real-Time & Performance', items: 'SignalR, Background Processing, Batch Processing, Asynchronous Programming' },
  { cat: 'Validation & Documentation', items: 'FluentValidation, Swagger / OpenAPI, Postman' },
  { cat: 'DevOps & Tools', items: 'Git, GitHub, GitHub Actions, CI/CD, IIS Deployment' }
];

skills.forEach(s => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  const prefix = `•  ${s.cat}: `;
  doc.text(prefix, marginX, currentY);
  const prefixWidth = doc.getTextWidth(prefix);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  const valLines = doc.splitTextToSize(s.items, contentWidth - prefixWidth);
  doc.text(valLines[0], marginX + prefixWidth, currentY);
  if (valLines.length > 1) {
    for (let j = 1; j < valLines.length; j++) {
      currentY += 3.6;
      doc.text(valLines[j], marginX + 4, currentY);
    }
  }
  currentY += 4.2;
});
currentY += 2;

// Experience
drawSectionHeader('Experience');
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(15, 23, 42);
doc.text('Multi-Tenant SaaS ERP & Digital Menu Platform', marginX, currentY);
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 85, 105);
doc.text('Backend Developer', marginX + contentWidth, currentY, { align: 'right' });
currentY += 4;

doc.setFont('helvetica', 'italic');
doc.setFontSize(8);
doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
doc.text('Technologies: C#, .NET 10, ASP.NET Core, PostgreSQL, Entity Framework Core, Supabase, SignalR, GitHub Actions', marginX, currentY);
currentY += 4;

const expBullets = [
  'Designed and implemented Clean Architecture with a Modular Monolith approach.',
  'Developed RESTful APIs for business profiles, branches, menus, categories, products, and promotional campaigns.',
  'Implemented multi-tenancy and tenant isolation to ensure secure separation of business data.',
  'Developed authentication mechanisms supporting JWT, OAuth, and phone OTP.',
  'Implemented secure session management using refresh token rotation, sliding expiration, and token reuse detection.',
  'Applied SHA-256 hashing for refresh token storage.',
  'Developed administrative dashboard APIs with business analytics and performance insights.',
  'Integrated SignalR for real-time dashboard updates.',
  'Implemented background batch processing for product view tracking to optimize database operations.',
  'Configured automated deployment workflows using GitHub Actions and IIS.'
];

expBullets.forEach(b => {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const bLines = doc.splitTextToSize(`•  ${b}`, contentWidth - 4);
  doc.text(bLines, marginX + 2, currentY);
  currentY += bLines.length * 3.8 + 0.8;
});
currentY += 2;

// Academic Management System Project
drawSectionHeader('Project Experience');
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(15, 23, 42);
doc.text('Academic Management System', marginX, currentY);
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 85, 105);
doc.text('Backend Developer', marginX + contentWidth, currentY, { align: 'right' });
currentY += 4;

doc.setFont('helvetica', 'italic');
doc.setFontSize(8);
doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
doc.text('Technologies: C#, .NET 10, ASP.NET Core, PostgreSQL, Entity Framework Core, Clean Architecture, CQRS', marginX, currentY);
currentY += 4;

const projBullets = [
  'Applied Clean Architecture to separate Domain, Application, Infrastructure, and Presentation layers.',
  'Implemented CQRS to organize application commands and queries.',
  'Developed authentication and session management functionality.',
  'Implemented course management features and structured error-handling mechanisms.',
  'Supported separate application portals for different user roles.',
  'Contributed to automated testing and application reliability, achieving 49 passing automated tests with a 100% pass rate.'
];

projBullets.forEach(b => {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const bLines = doc.splitTextToSize(`•  ${b}`, contentWidth - 4);
  doc.text(bLines, marginX + 2, currentY);
  currentY += bLines.length * 3.8 + 0.8;
});
currentY += 2;

// Education & Languages
drawSectionHeader('Education');
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(15, 23, 42);
doc.text('Suez Canal University - Faculty of Science', marginX, currentY);
currentY += 4;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(71, 85, 105);
doc.text('Bachelor of Science (B.Sc.) in Mathematics - Computer Science Program | Fourth Year (In Progress)', marginX, currentY);
currentY += 6;

drawSectionHeader('Languages');
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(51, 65, 85);
doc.text('Arabic: Native  |  English: Intermediate', marginX, currentY);

const totalPages = doc.getNumberOfPages();
for (let i = 1; i <= totalPages; i++) {
  doc.setPage(i);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    `Amr Atef Imam Mahmoud - ATS Standard Resume  •  Page ${i} of ${totalPages}`,
    pageWidth / 2,
    pageHeight - 8,
    { align: 'center' }
  );
}

const outBuffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(path.join(__dirname, '../public/Amr_Kandel_Resume_ATS.pdf'), outBuffer);
console.log('Saved public/Amr_Kandel_Resume_ATS.pdf successfully. Size:', outBuffer.length);
