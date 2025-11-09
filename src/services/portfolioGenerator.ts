import { ResumeData } from '../types';

export class PortfolioGenerator {
  static generate(data: ResumeData): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.fullName} - Portfolio</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
      background: white;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 60px 40px;
      text-align: center;
    }

    header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
    }

    header .subtitle {
      font-size: 1.1em;
      opacity: 0.9;
    }

    .contact-info {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
      flex-wrap: wrap;
      font-size: 0.95em;
    }

    .contact-info a {
      color: white;
      text-decoration: none;
      transition: opacity 0.3s;
    }

    .contact-info a:hover {
      opacity: 0.7;
    }

    .social-links {
      margin-top: 15px;
      display: flex;
      justify-content: center;
      gap: 15px;
    }

    .social-links a {
      display: inline-block;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      text-align: center;
      line-height: 40px;
      transition: background 0.3s;
      text-decoration: none;
      font-size: 1.2em;
    }

    .social-links a:hover {
      background: rgba(255, 255, 255, 0.4);
    }

    main {
      padding: 40px;
    }

    section {
      margin-bottom: 40px;
    }

    section h2 {
      font-size: 1.8em;
      color: #667eea;
      border-bottom: 3px solid #667eea;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }

    .summary {
      background: #f8f9fa;
      padding: 20px;
      border-left: 4px solid #667eea;
      border-radius: 4px;
      line-height: 1.8;
    }

    .experience-item,
    .education-item,
    .project-item {
      margin-bottom: 25px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }

    .experience-item:last-child,
    .education-item:last-child,
    .project-item:last-child {
      border-bottom: none;
    }

    .job-title {
      font-size: 1.2em;
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }

    .company-info {
      color: #667eea;
      font-weight: 500;
      margin-bottom: 10px;
    }

    .duration {
      color: #777;
      font-size: 0.95em;
      margin-bottom: 10px;
    }

    .description {
      color: #555;
      margin-bottom: 10px;
    }

    .highlights {
      list-style: none;
      padding-left: 20px;
    }

    .highlights li {
      color: #666;
      margin-bottom: 8px;
      position: relative;
      padding-left: 15px;
    }

    .highlights li:before {
      content: "▸";
      position: absolute;
      left: 0;
      color: #667eea;
      font-weight: bold;
    }

    .degree {
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }

    .institution {
      color: #667eea;
      font-weight: 500;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .skill-category {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }

    .skill-category h3 {
      color: #667eea;
      margin-bottom: 12px;
      font-size: 1.1em;
    }

    .skill-items {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .skill-tag {
      background: #667eea;
      color: white;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.9em;
    }

    .project-item h3 {
      color: #333;
      margin-bottom: 8px;
      font-size: 1.1em;
    }

    .technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }

    .tech-badge {
      background: #e9ecef;
      color: #667eea;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 0.85em;
    }

    .project-link {
      color: #667eea;
      text-decoration: none;
      margin-top: 10px;
      display: inline-block;
    }

    .project-link:hover {
      text-decoration: underline;
    }

    footer {
      background: #f8f9fa;
      text-align: center;
      padding: 20px;
      color: #777;
      border-top: 1px solid #eee;
    }

    @media (max-width: 768px) {
      header {
        padding: 40px 20px;
      }

      header h1 {
        font-size: 1.8em;
      }

      main {
        padding: 20px;
      }

      .contact-info {
        flex-direction: column;
        gap: 10px;
      }

      .skills-grid {
        grid-template-columns: 1fr;
      }
    }

    @media print {
      body {
        background: white;
      }
      .container {
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${data.fullName}</h1>
      <p class="subtitle">Full Stack Developer</p>
      <div class="contact-info">
        ${data.email ? `<a href="mailto:${data.email}">📧 ${data.email}</a>` : ''}
        ${data.phone ? `<a href="tel:${data.phone}">📱 ${data.phone}</a>` : ''}
        ${data.location ? `<span>📍 ${data.location}</span>` : ''}
      </div>
      ${this.generateSocialLinks(data.social)}
    </header>

    <main>
      ${data.summary
        ? `
      <section>
        <h2>About</h2>
        <div class="summary">${data.summary}</div>
      </section>
      `
        : ''
      }

      ${data.experience.length > 0
        ? `
      <section>
        <h2>Experience</h2>
        ${data.experience
          .map(
            (exp) => `
          <div class="experience-item">
            <div class="job-title">${exp.position ? exp.position : ''}</div>
            <div class="company-info">${exp.company ? exp.company : ''}</div>
            <div class="duration">${exp.duration ? exp.duration : ''}</div>
            <div class="description">${exp.description ? exp.description : ''}</div>
            ${exp.highlights.length > 0
                ? `
              <ul class="highlights">
                ${exp.highlights.map((h) => `<li>${h}</li>`).join('')}
              </ul>
            `
                : ''
              }
          </div>
        `
          )
          .join('')}
      </section>
      `
        : ''
      }

      ${data.education.length > 0
        ? `
      <section>
        <h2>Education</h2>
        ${data.education
          .map(
            (edu) => `
          <div class="education-item">
            <div class="degree">${edu.degree} in ${edu.field}</div>
            <div class="institution">${edu.institution}</div>
            <div class="duration">${edu.year}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
          </div>
        `
          )
          .join('')}
      </section>
      `
        : ''
      }

      ${data.skills.length > 0
        ? `
      <section>
        <h2>Skills</h2>
        <div class="skills-grid">
          ${data.skills
          .map(
            (skill) => `
            <div class="skill-category">
              <h3>${skill.category}</h3>
              <div class="skill-items">
                ${skill.items.map((item) => `<span class="skill-tag">${item}</span>`).join('')}
              </div>
            </div>
          `
          )
          .join('')}
        </div>
      </section>
      `
        : ''
      }

      ${data.projects.length > 0
        ? `
      <section>
        <h2>Projects</h2>
        ${data.projects
          .map(
            (proj) => `
          <div class="project-item">
            <h3>${proj.title}</h3>
            <p>${proj.description}</p>
            ${proj.technologies.length > 0
                ? `
              <div class="technologies">
                ${proj.technologies.map((tech) => `<span class="tech-badge">${tech}</span>`).join('')}
              </div>
            `
                : ''
              }
            ${proj.link ? `<a href="${proj.link}" class="project-link" target="_blank">View Project →</a>` : ''}
          </div>
        `
          )
          .join('')}
      </section>
      `
        : ''
      }

      ${data.certifications.length > 0
        ? `
      <section>
        <h2>Certifications</h2>
        <ul class="highlights">
          ${data.certifications.map((cert) => `<li>${cert}</li>`).join('')}
        </ul>
      </section>
      `
        : ''
      }
    </main>

    <footer>
      <p>Generated with AI Portfolio Generator • ${new Date().getFullYear()}</p>
    </footer>
  </div>
</body>
</html>`;
  }

  private static generateSocialLinks(social: any[]): string {
    if (!social || social.length === 0) return '';

    const icons: { [key: string]: string } = {
      github: '🐙',
      linkedin: '💼',
      twitter: '𝕏',
      portfolio: '🌐',
      website: '🌐',
    };

    return `
      <div class="social-links">
        ${social
        .map(
          (s) => `
          <a href="${s.url}" target="_blank" title="${s.platform}" rel="noopener noreferrer">
            ${icons[s.platform.toLowerCase()] || '🔗'}
          </a>
        `
        )
        .join('')}
      </div>
    `;
  }
}

