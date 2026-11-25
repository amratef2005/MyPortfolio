import { jsPDF } from 'jspdf';
import { ProfileInfo, Experience, Project, Certificate, SkillCategory } from '../types';
import { CVOptions, AccentColor } from '../components/cv/CVDocument';

interface GenerateAtsPdfParams {
  profile: ProfileInfo;
  experiences?: Experience[];
  projects?: Project[];
  certificates?: Certificate[];
  skills?: SkillCategory[];
  options: CVOptions;
}

// Map accent colors to RGB hex strings
const accentColorMap: Record<AccentColor, { r: number; g: number; b: number; hex: string }> = {
  monochrome: { r: 15, g: 23, b: 42, hex: '#0f172a' },
  slate: { r: 15, g: 23, b: 42, hex: '#0f172a' },
  charcoal: { r: 51, g: 65, b: 85, hex: '#334155' },
  burntOrange: { r: 255, g: 87, b: 34, hex: '#FF5722' },
  navy: { r: 30, g: 58, b: 138, hex: '#1e3a8a' },
  cyan: { r: 2, g: 132, b: 199, hex: '#0284c7' },
  cobalt: { r: 29, g: 78, b: 216, hex: '#1d4ed8' },
  indigo: { r: 67, g: 56, b: 202, hex: '#4338ca' },
  teal: { r: 15, g: 118, b: 110, hex: '#0f766e' },
  emerald: { r: 4, g: 120, b: 87, hex: '#047857' },
  rose: { r: 190, g: 18, b: 60, hex: '#be123c' },
  ruby: { r: 153, g: 27, b: 27, hex: '#991b1b' },
  amber: { r: 180, g: 83, b: 9, hex: '#b45309' },
  violet: { r: 109, g: 40, b: 217, hex: '#6d28d9' },
};

export const generateAtsPdfDocument = ({
  profile,
  experiences = [],
  projects = [],
  certificates = [],
  skills = [],
  options,
}: GenerateAtsPdfParams): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 16;
  const contentWidth = pageWidth - marginX * 2;
  const maxY = pageHeight - 16;

  let currentY = 16;

  const theme = accentColorMap[options.accentColor] || accentColorMap.monochrome;

  // Helper: Check space and add page if needed
  const ensureSpace = (neededHeight: number) => {
    if (currentY + neededHeight > maxY) {
      doc.addPage();
      currentY = 16;
    }
  };

  // Helper: Draw Section Header (ATS standard single line with subtle bottom border)
  const drawSectionHeader = (title: string) => {
    ensureSpace(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(theme.r, theme.g, theme.b);
    doc.text(title.toUpperCase(), marginX, currentY);
    currentY += 1.8;

    // Divider line
    doc.setDrawColor(210, 215, 222);
    doc.setLineWidth(0.35);
    doc.line(marginX, currentY, marginX + contentWidth, currentY);
    currentY += 3.8;
  };

  // ==================== 1. ATS CONTACT HEADER ====================
  // Candidate Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  const candidateName = (profile.name || 'Amr Atef Imam Mahmoud').toUpperCase();
  doc.text(candidateName, pageWidth / 2, currentY, { align: 'center' });
  currentY += 5.5;

  // Role Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(theme.r, theme.g, theme.b);
  const roleTitle = (options.roleTitle || profile.title || '.NET Backend Developer').toUpperCase();
  doc.text(roleTitle, pageWidth / 2, currentY, { align: 'center' });
  currentY += 4.5;

  // Core Tech Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('C# | ASP.NET Core | SQL Server | PostgreSQL', pageWidth / 2, currentY, { align: 'center' });
  currentY += 4;

  // ATS Contact Information Line
  const contactParts: string[] = [];
  if (profile.location) contactParts.push(profile.location);
  if (profile.email) contactParts.push(profile.email);
  contactParts.push('WhatsApp: @amratefkandel');
  if (profile.linkedin) contactParts.push(profile.linkedin.replace(/^https?:\/\/(www\.)?/, ''));
  if (profile.github) contactParts.push(profile.github.replace(/^https?:\/\/(www\.)?/, ''));

  const contactLine = contactParts.join('  •  ');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(contactLine, pageWidth / 2, currentY, { align: 'center' });
  currentY += 3.5;

  // Header bottom border
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.6);
  doc.line(marginX, currentY, marginX + contentWidth, currentY);
  currentY += 5.5;

  // ==================== 2. PROFESSIONAL SUMMARY ====================
  drawSectionHeader('Professional Summary');
  const summaryText = profile.bio ||
    'Computer Science student and .NET Backend Developer with hands-on experience designing and developing scalable backend systems using C# and ASP.NET Core. Experienced in building RESTful APIs, implementing Clean Architecture and CQRS patterns, designing relational databases, and developing secure authentication and authorization mechanisms. Practical experience in multi-tenant SaaS applications, JWT authentication, OAuth 2.0, refresh token rotation, real-time communication using SignalR, and background processing. Interested in software architecture, backend security, database optimization, and high-performance software systems.';

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
  ensureSpace(summaryLines.length * 3.8);
  doc.text(summaryLines, marginX, currentY);
  currentY += summaryLines.length * 3.8 + 4;

  // ==================== 3. TECHNICAL SKILLS ====================
  drawSectionHeader('Technical Skills');
  const defaultSkillsList = [
    { name: 'Programming Languages', list: 'C#, SQL' },
    { name: 'Backend Frameworks', list: '.NET 10, ASP.NET Core Web API, Entity Framework Core, RESTful APIs, Background Services' },
    { name: 'Architecture & Design', list: 'Clean Architecture, CQRS Pattern, Modular Monolith, DTOs & Mapping, Separation of Concerns' },
    { name: 'Databases & ORM', list: 'PostgreSQL, Microsoft SQL Server, Supabase, EF Core Migrations, Relational Schema Design' },
    { name: 'Security & Auth', list: 'JWT Authentication, OAuth 2.0, Phone OTP, Refresh Token Rotation, SHA-256 Hashing, IDOR Prevention' },
    { name: 'Real-Time & Performance', list: 'SignalR (WebSockets), Asynchronous Programming, Background Batch Processing' },
    { name: 'Validation & Tooling', list: 'FluentValidation, Swagger / OpenAPI, Postman, Git, GitHub Actions (CI/CD), IIS' },
  ];

  const skillEntries = skills && skills.length > 0
    ? skills.map(c => ({ name: c.name, list: c.skills.map(s => s.name).join(', ') }))
    : defaultSkillsList;

  skillEntries.forEach(cat => {
    ensureSpace(4.5);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    const prefix = `• ${cat.name}: `;
    doc.text(prefix, marginX, currentY);

    const prefixWidth = doc.getTextWidth(prefix);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const listLines = doc.splitTextToSize(cat.list, contentWidth - prefixWidth);
    
    // First line next to prefix
    if (listLines.length > 0) {
      doc.text(listLines[0], marginX + prefixWidth, currentY);
    }
    // Subsequent lines indented
    if (listLines.length > 1) {
      for (let i = 1; i < listLines.length; i++) {
        currentY += 3.6;
        doc.text(listLines[i], marginX + prefixWidth, currentY);
      }
    }
    currentY += 3.8;
  });
  currentY += 2;

  // ==================== 4. PROFESSIONAL WORK EXPERIENCE ====================
  if (experiences && experiences.length > 0) {
    drawSectionHeader('Professional Work Experience');

    experiences.forEach((exp) => {
      ensureSpace(14);
      // Row 1: Company + Role | Dates + Location
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(exp.company, marginX, currentY);

      const companyWidth = doc.getTextWidth(exp.company);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(' | ', marginX + companyWidth, currentY);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(theme.r, theme.g, theme.b);
      doc.text(exp.role, marginX + companyWidth + 4, currentY);

      // Right-aligned dates and location
      const dateText = `${exp.period}${exp.location ? ` | ${exp.location}` : ''}`;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text(dateText, marginX + contentWidth, currentY, { align: 'right' });
      currentY += 4;

      // Technologies line
      if (exp.technologies && exp.technologies.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(15, 23, 42);
        doc.text('Technologies: ', marginX, currentY);
        const techPrefixW = doc.getTextWidth('Technologies: ');

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(71, 85, 105);
        const techStr = exp.technologies.join(', ');
        const techLines = doc.splitTextToSize(techStr, contentWidth - techPrefixW);
        doc.text(techLines[0], marginX + techPrefixW, currentY);
        if (techLines.length > 1) {
          for (let i = 1; i < techLines.length; i++) {
            currentY += 3.4;
            doc.text(techLines[i], marginX + techPrefixW, currentY);
          }
        }
        currentY += 3.8;
      }

      // Summary
      if (exp.summary) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(51, 65, 85);
        const sumLines = doc.splitTextToSize(exp.summary, contentWidth);
        doc.text(sumLines, marginX, currentY);
        currentY += sumLines.length * 3.4 + 1;
      }

      // Responsibilities Bullets
      if (exp.responsibilities && exp.responsibilities.length > 0) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.2);
        doc.setTextColor(30, 41, 59);

        exp.responsibilities.forEach(bullet => {
          const bulletLines = doc.splitTextToSize(bullet, contentWidth - 4);
          ensureSpace(bulletLines.length * 3.5 + 1);
          doc.text('•', marginX, currentY);
          doc.text(bulletLines, marginX + 3.5, currentY);
          currentY += bulletLines.length * 3.5 + 0.8;
        });
      }
      currentY += 2.5;
    });
  }

  // ==================== 5. KEY TECHNICAL PROJECTS ====================
  const selectedProjects = projects.filter(
    p => options.includedProjects.length === 0 || options.includedProjects.includes(p.id)
  );

  if (selectedProjects.length > 0) {
    drawSectionHeader('Key Technical Projects');

    selectedProjects.forEach(proj => {
      ensureSpace(14);
      // Project Title & Category
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(proj.title, marginX, currentY);

      const titleWidth = doc.getTextWidth(proj.title);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(' | ', marginX + titleWidth, currentY);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(theme.r, theme.g, theme.b);
      doc.text(proj.category || 'Backend Architecture', marginX + titleWidth + 4, currentY);

      // Badge on right
      if (proj.badge) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.8);
        doc.setTextColor(71, 85, 105);
        doc.text(proj.badge, marginX + contentWidth, currentY, { align: 'right' });
      }
      currentY += 4;

      // Technologies
      if (proj.technologies && proj.technologies.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(15, 23, 42);
        doc.text('Technologies: ', marginX, currentY);
        const projTechW = doc.getTextWidth('Technologies: ');

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(71, 85, 105);
        const pTechStr = proj.technologies.join(', ');
        const pTechLines = doc.splitTextToSize(pTechStr, contentWidth - projTechW);
        doc.text(pTechLines[0], marginX + projTechW, currentY);
        if (pTechLines.length > 1) {
          for (let i = 1; i < pTechLines.length; i++) {
            currentY += 3.4;
            doc.text(pTechLines[i], marginX + projTechW, currentY);
          }
        }
        currentY += 3.8;
      }

      // Features Bullets
      if (proj.features && proj.features.length > 0) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.2);
        doc.setTextColor(30, 41, 59);

        proj.features.forEach(feat => {
          const featLines = doc.splitTextToSize(feat, contentWidth - 4);
          ensureSpace(featLines.length * 3.5 + 1);
          doc.text('•', marginX, currentY);
          doc.text(featLines, marginX + 3.5, currentY);
          currentY += featLines.length * 3.5 + 0.8;
        });
      }
      currentY += 2.5;
    });
  }

  // ==================== TEAMWORK & COLLABORATION ====================
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
  teamworkBullets.forEach(bullet => {
    const bLines = doc.splitTextToSize(bullet, contentWidth - 4);
    ensureSpace(bLines.length * 3.5 + 1);
    doc.text('•', marginX, currentY);
    doc.text(bLines, marginX + 3.5, currentY);
    currentY += bLines.length * 3.5 + 0.8;
  });
  currentY += 2.5;

  // ==================== 6. CERTIFICATIONS & ACCREDITATIONS ====================
  if (certificates && certificates.length > 0) {
    drawSectionHeader('Certifications & Accreditations');

    certificates.forEach(cert => {
      ensureSpace(8);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      const certTitle = `• ${cert.title}`;
      doc.text(certTitle, marginX, currentY);

      if (cert.date) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text(cert.date, marginX + contentWidth, currentY, { align: 'right' });
      }

      if (cert.issuer) {
        const titleW = doc.getTextWidth(certTitle);
        const dateReserve = cert.date ? doc.getTextWidth(cert.date) + 6 : 0;
        const availableW = contentWidth - titleW - dateReserve;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        const issuerTxt = ` – ${cert.issuer}`;
        if (doc.getTextWidth(issuerTxt) <= availableW) {
          doc.text(issuerTxt, marginX + titleW, currentY);
        } else {
          currentY += 3.6;
          const wrappedIssuer = doc.splitTextToSize(cert.issuer, contentWidth - 4);
          doc.text(wrappedIssuer, marginX + 3.5, currentY);
          currentY += (wrappedIssuer.length - 1) * 3.4;
        }
      }
      currentY += 4.2;
    });
    currentY += 2;
  }

  // ==================== 7. EDUCATION ====================
  drawSectionHeader('Education');
  ensureSpace(8);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  const uniName = (profile as any).university || 'Suez Canal University – Faculty of Science';
  doc.text(uniName, marginX, currentY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(theme.r, theme.g, theme.b);
  doc.text('In Progress (Expected 2026)', marginX + contentWidth, currentY, { align: 'right' });
  currentY += 3.8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(71, 85, 105);
  const degreeText = (profile as any).degree || 'Bachelor of Science (B.Sc.) in Mathematics – Computer Science Program | Fourth Year Student';
  doc.text(degreeText, marginX, currentY);
  currentY += 5;

  // ==================== 8. LANGUAGES ====================
  drawSectionHeader('Languages');
  ensureSpace(5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(30, 41, 59);
  const langText = (profile as any).languages || 'Arabic: Native  •  English: Intermediate (Technical Proficiency)';
  doc.text(langText, marginX, currentY);
  currentY += 6;

  // ==================== Page Numbering Footer ====================
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Amr Atef – ATS Standard Resume  •  Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  return doc;
};

/**
 * Downloads the ATS-Compliant PDF directly to the user's device
 */
export const downloadAtsPdf = (params: GenerateAtsPdfParams, filename = 'Amr_Kandel_Resume_ATS.pdf') => {
  const doc = generateAtsPdfDocument(params);
  doc.save(filename);
};
