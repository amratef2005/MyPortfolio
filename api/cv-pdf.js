// Serverless API endpoint: generates and serves ATS-Compliant CV as downloadable PDF
import { jsPDF } from 'jspdf';

export default async function handler(req, res) {
  try {
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

    // Classic ATS Monochrome Black (#0f172a)
    const primaryRGB = [15, 23, 42];

    // Helper: Draw Section Header
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
    currentY += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text('Ismailia, Egypt  •  amratefkandel@gmail.com  •  WhatsApp: @amratefkandel  •  linkedin.com/in/amr-atef-kandel  •  github.com/amratef2005', pageWidth / 2, currentY, { align: 'center' });
    currentY += 3.5;

    doc.setDrawColor(15, 23, 42);
    doc.setLineWidth(0.6);
    doc.line(marginX, currentY, marginX + contentWidth, currentY);
    currentY += 5.5;

    // Professional Summary
    drawSectionHeader('Professional Summary');
    const summary = 'Computer Science student and .NET Backend Developer with hands-on experience designing and developing scalable backend systems using C# and ASP.NET Core. Experienced in building RESTful APIs, implementing Clean Architecture and CQRS patterns, designing relational databases, and developing secure authentication and authorization mechanisms. Practical experience in multi-tenant SaaS applications, JWT authentication, OAuth 2.0, refresh token rotation, real-time communication using SignalR, and background processing. Collaborates with cross-functional teams, owning backend development and API integration with mobile and frontend applications. Interested in software architecture, backend security, database optimization, and maintainable software systems.';
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    const sumLines = doc.splitTextToSize(summary, contentWidth);
    doc.text(sumLines, marginX, currentY);
    currentY += sumLines.length * 3.8 + 4;

    // Technical Skills
    drawSectionHeader('Technical Skills');
    const skills = [
      ['Programming Languages', 'C#, SQL'],
      ['Backend Development', '.NET 10, ASP.NET Core Web API, RESTful API Development, Entity Framework Core, Dependency Injection, Middleware, Background Services'],
      ['Architecture & Design', 'Clean Architecture, Modular Monolith, CQRS, DTOs, Manual Mapping, Separation of Concerns'],
      ['Databases & ORM', 'Microsoft SQL Server, PostgreSQL, Supabase, Entity Framework Core, Database Migrations, Relational Database Design'],
      ['Authentication & Security', 'JWT Authentication, OAuth 2.0, Phone OTP Authentication, Refresh Token Rotation, SHA-256 Hashing, Multi-Tenant Authorization, Ownership Authorization, IDOR Prevention'],
      ['Real-Time & Performance', 'SignalR, Background Processing, Batch Processing, Asynchronous Programming'],
      ['Validation & Documentation', 'FluentValidation, Swagger / OpenAPI, Postman'],
      ['DevOps & Tools', 'Git, GitHub, GitHub Actions, CI/CD, IIS Deployment']
    ];

    skills.forEach(([cat, list]) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      const prefix = `• ${cat}: `;
      doc.text(prefix, marginX, currentY);
      const prefixW = doc.getTextWidth(prefix);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const lines = doc.splitTextToSize(list, contentWidth - prefixW);
      doc.text(lines[0], marginX + prefixW, currentY);
      if (lines.length > 1) {
        for (let i = 1; i < lines.length; i++) {
          currentY += 3.5;
          doc.text(lines[i], marginX + prefixW, currentY);
        }
      }
      currentY += 3.8;
    });
    currentY += 2;

    // Project Experience (Multi-Tenant SaaS ERP)
    drawSectionHeader('Project Experience');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('Multi-Tenant SaaS ERP & Digital Menu Platform', marginX, currentY);
    const mTitleW = doc.getTextWidth('Multi-Tenant SaaS ERP & Digital Menu Platform');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.text(' | Backend Developer', marginX + mTitleW, currentY);
    currentY += 4;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text('Technologies: ', marginX, currentY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text('C#, .NET 10, ASP.NET Core, PostgreSQL, Entity Framework Core, Supabase, SignalR, GitHub Actions', marginX + doc.getTextWidth('Technologies: '), currentY);
    currentY += 3.8;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text('Developed the backend of a multi-tenant SaaS platform for restaurants, cafés, and businesses to manage their digital presence and operations.', marginX, currentY);
    currentY += 4;

    const saasBullets = [
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

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(30, 41, 59);
    saasBullets.forEach(b => {
      const bLines = doc.splitTextToSize(b, contentWidth - 4);
      doc.text('•', marginX, currentY);
      doc.text(bLines, marginX + 3.5, currentY);
      currentY += bLines.length * 3.5 + 0.8;
    });
    currentY += 3;

    // Academic Management System
    if (currentY + 30 > pageHeight - 16) {
      doc.addPage();
      currentY = 16;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('Academic Management System', marginX, currentY);
    const aTitleW = doc.getTextWidth('Academic Management System');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.text(' | Backend Developer', marginX + aTitleW, currentY);
    currentY += 4;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text('Technologies: ', marginX, currentY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text('C#, .NET 10, ASP.NET Core, PostgreSQL, Entity Framework Core, Clean Architecture, CQRS', marginX + doc.getTextWidth('Technologies: '), currentY);
    currentY += 3.8;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text('Developed the backend of an academic management system to organize educational operations through a scalable and maintainable architecture.', marginX, currentY);
    currentY += 4;

    const academicBullets = [
      'Applied Clean Architecture to separate Domain, Application, Infrastructure, and Presentation layers.',
      'Implemented CQRS to organize application commands and queries.',
      'Developed authentication and session management functionality.',
      'Implemented course management features and structured error-handling mechanisms.',
      'Supported separate application portals for different user roles.',
      'Contributed to automated testing and application reliability, achieving 49 passing automated tests with a 100% pass rate.'
    ];

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(30, 41, 59);
    academicBullets.forEach(b => {
      const bLines = doc.splitTextToSize(b, contentWidth - 4);
      doc.text('•', marginX, currentY);
      doc.text(bLines, marginX + 3.5, currentY);
      currentY += bLines.length * 3.5 + 0.8;
    });
    currentY += 3;

    // Teamwork & Collaboration
    drawSectionHeader('Teamwork & Collaboration');
    const teamworkBullets = [
      'Worked in development teams of Backend, Mobile, and Frontend developers.',
      'Took responsibility for backend architecture, API development, and database integration.',
      'Collaborated with Mobile and Frontend developers to integrate backend services.',
      'Participated in technical discussions and implementation decisions.'
    ];
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(30, 41, 59);
    teamworkBullets.forEach(b => {
      doc.text('•', marginX, currentY);
      doc.text(b, marginX + 3.5, currentY);
      currentY += 3.8;
    });
    currentY += 2;

    // Education
    drawSectionHeader('Education');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text('Suez Canal University – Faculty of Science', marginX, currentY);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.text('In Progress', marginX + contentWidth, currentY, { align: 'right' });
    currentY += 3.8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(71, 85, 105);
    doc.text('Bachelor of Science (B.Sc.) in Mathematics – Computer Science Program | Fourth Year Student (In Progress)', marginX, currentY);
    currentY += 5;

    // Languages
    drawSectionHeader('Languages');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(30, 41, 59);
    doc.text('Arabic: Native  |  English: Intermediate', marginX, currentY);

    // Page numbers
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text(`Amr Atef Imam Mahmoud – ATS Resume  •  Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 8, { align: 'center' });
    }

    // Output PDF Buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Amr_Kandel_Resume_ATS.pdf"');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
}
