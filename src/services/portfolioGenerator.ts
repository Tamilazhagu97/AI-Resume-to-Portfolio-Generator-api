import { ResumeData } from '../types';

export class PortfolioGenerator {
  static generate(data: ResumeData): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.fullName} - Portfolio</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-primary: #6366f1;
      --color-secondary: #8b5cf6;
      --color-accent: #06b6d4;
      --color-bg: #0f0f23;
      --color-surface: rgba(255, 255, 255, 0.05);
      --color-text: #ffffff;
      --color-text-secondary: rgba(255, 255, 255, 0.7);
      --color-border: rgba(255, 255, 255, 0.1);
      --blur: 20px;
      --shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      --shadow-glow: 0 0 20px rgba(99, 102, 241, 0.3);
    }

    [data-theme="light"] {
      --color-primary: #4f46e5;
      --color-secondary: #7c3aed;
      --color-accent: #0891b2;
      --color-bg: #f8fafc;
      --color-surface: rgba(255, 255, 255, 0.8);
      --color-text: #1e293b;
      --color-text-secondary: #64748b;
      --color-border: rgba(0, 0, 0, 0.1);
      --blur: 15px;
      --shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      --shadow-glow: 0 0 15px rgba(79, 70, 229, 0.2);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', sans-serif;
      line-height: 1.6;
      color: var(--color-text);
      background: var(--color-bg);
      background-image:
        radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }

    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, transparent 30%, rgba(99, 102, 241, 0.05) 50%, transparent 70%);
      animation: gradientShift 8s ease-in-out infinite;
      pointer-events: none;
      z-index: -1;
    }

    @keyframes gradientShift {
      0%, 100% { transform: translateX(-100px) translateY(-100px); }
      50% { transform: translateX(100px) translateY(100px); }
    }

    .floating-particles {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    }

    .particle {
      position: absolute;
      background: var(--color-primary);
      border-radius: 50%;
      opacity: 0.1;
      animation: float 6s ease-in-out infinite;
    }

    .particle:nth-child(1) { width: 4px; height: 4px; top: 10%; left: 10%; animation-delay: 0s; }
    .particle:nth-child(2) { width: 6px; height: 6px; top: 20%; left: 80%; animation-delay: 1s; }
    .particle:nth-child(3) { width: 3px; height: 3px; top: 60%; left: 20%; animation-delay: 2s; }
    .particle:nth-child(4) { width: 5px; height: 5px; top: 80%; left: 70%; animation-delay: 3s; }
    .particle:nth-child(5) { width: 4px; height: 4px; top: 40%; left: 50%; animation-delay: 4s; }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }

    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: var(--color-surface);
      backdrop-filter: blur(var(--blur));
      -webkit-backdrop-filter: blur(var(--blur));
      border-bottom: 1px solid var(--color-border);
      z-index: 1000;
      padding: 1rem 2rem;
      box-shadow: var(--shadow);
    }

    nav .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    nav ul {
      list-style: none;
      display: flex;
      gap: 2rem;
    }

    nav a {
      color: var(--color-text);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      position: relative;
      padding: 0.5rem 1rem;
      border-radius: 8px;
    }

    nav a:hover {
      color: var(--color-primary);
      background: rgba(99, 102, 241, 0.1);
      transform: translateY(-2px);
    }

    nav a.active {
      color: var(--color-primary);
      background: rgba(99, 102, 241, 0.1);
    }

    nav a.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px;
      background: var(--color-primary);
      border-radius: 1px;
    }

    .theme-toggle {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(var(--blur));
    }

    .theme-toggle:hover {
      transform: scale(1.1);
      box-shadow: var(--shadow-glow);
    }

    .theme-toggle svg {
      width: 20px;
      height: 20px;
      fill: var(--color-text);
      transition: all 0.3s ease;
    }

    main {
      padding-top: 80px;
    }

    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
      border-radius: 50%;
      animation: pulse 4s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
      50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
    }

    .hero-content {
      text-align: center;
      z-index: 10;
      max-width: 800px;
      padding: 2rem;
    }

    .hero h1 {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 700;
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary), var(--color-accent));
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradientText 3s ease-in-out infinite;
      margin-bottom: 1rem;
      line-height: 1.2;
      word-wrap: break-word;
      hyphens: auto;
    }

    @keyframes gradientText {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .hero .subtitle {
      font-size: clamp(1rem, 2vw, 1.5rem);
      color: var(--color-text-secondary);
      margin-bottom: 2rem;
      overflow: hidden;
      white-space: nowrap;
      animation: typing 3s steps(30, end);
    }

    @keyframes typing {
      from { width: 0; }
      to { width: 100%; }
    }

    @keyframes blink-caret {
      from, to { border-color: transparent; }
      50% { border-color: var(--color-primary); }
    }

    .hero .contact-info {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin: 2rem 0;
      flex-wrap: wrap;
    }

    .hero .contact-info a,
    .hero .contact-info span {
      color: var(--color-text-secondary);
      text-decoration: none;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .hero .contact-info svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }

    .hero .contact-info a:hover {
      color: var(--color-primary);
      transform: translateY(-2px);
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 2rem;
    }

    .social-links a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      background: var(--color-surface);
      backdrop-filter: blur(var(--blur));
      border: 1px solid var(--color-border);
      border-radius: 50%;
      transition: all 0.3s ease;
      text-decoration: none;
      box-shadow: var(--shadow);
    }

    .social-links a:hover {
      transform: translateY(-5px) scale(1.1);
      box-shadow: var(--shadow-glow);
      border-color: var(--color-primary);
    }

    .social-links svg {
      width: 24px;
      height: 24px;
      fill: var(--color-text);
      transition: fill 0.3s ease;
    }

    .social-links a:hover svg {
      fill: var(--color-primary);
    }

    section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 5rem 2rem;
      scroll-margin-top: 100px;
      opacity: 0;
      transform: translateY(50px);
      transition: all 0.8s ease;
    }

    section.visible {
      opacity: 1;
      transform: translateY(0);
    }

    section h2 {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(1.8rem, 3vw, 2.5rem);
      font-weight: 600;
      color: var(--color-text);
      text-align: center;
      margin-bottom: 3rem;
      position: relative;
    }

    section h2::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
      border-radius: 2px;
    }

    .card {
      background: var(--color-surface);
      backdrop-filter: blur(var(--blur));
      border: 1px solid var(--color-border);
      border-radius: 16px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: var(--shadow);
      transition: all 0.3s ease;
      transform-style: preserve-3d;
      perspective: 1000px;
    }

    .card:hover {
      transform: translateY(-10px);
      box-shadow: var(--shadow-glow);
    }

    .card.tilt {
      transition: transform 0.1s ease;
    }

    .job-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: 0.5rem;
    }

    .company-info {
      color: var(--color-primary);
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .duration {
      color: var(--color-text-secondary);
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .description {
      color: var(--color-text-secondary);
      margin-bottom: 1rem;
      line-height: 1.7;
    }

    .highlights {
      list-style: none;
      padding-left: 0;
    }

    .highlights li {
      color: var(--color-text-secondary);
      margin-bottom: 0.5rem;
      padding-left: 1.5rem;
      position: relative;
    }

    .highlights li::before {
      content: '▸';
      position: absolute;
      left: 0;
      color: var(--color-primary);
      font-weight: bold;
    }

    .degree {
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: 0.5rem;
    }

    .institution {
      color: var(--color-primary);
      font-weight: 500;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .skill-category h3 {
      color: var(--color-text);
      margin-bottom: 1.5rem;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .skill-items {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .skill-tag {
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.3s ease;
      cursor: pointer;
      transform: translateZ(0);
    }

    .skill-tag:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: var(--shadow-glow);
    }

    .project-item h3 {
      color: var(--color-text);
      margin-bottom: 1rem;
      font-size: 1.3rem;
      font-weight: 600;
    }

    .project-item p {
      color: var(--color-text-secondary);
      margin-bottom: 1.5rem;
      line-height: 1.7;
    }

    .technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .tech-badge {
      background: var(--color-surface);
      color: var(--color-text);
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      border: 1px solid var(--color-border);
    }

    .project-link {
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .project-link:hover {
      transform: translateX(5px);
    }

    .scroll-to-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 50px;
      height: 50px;
      background: var(--color-surface);
      backdrop-filter: blur(var(--blur));
      border: 1px solid var(--color-border);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(100px);
      z-index: 1000;
      box-shadow: var(--shadow);
    }

    .scroll-to-top.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .scroll-to-top:hover {
      transform: scale(1.1);
      box-shadow: var(--shadow-glow);
    }

    .scroll-to-top svg {
      width: 24px;
      height: 24px;
      fill: var(--color-text);
    }

    footer {
      background: var(--color-surface);
      backdrop-filter: blur(var(--blur));
      text-align: center;
      padding: 2rem;
      color: var(--color-text-secondary);
      border-top: 1px solid var(--color-border);
    }

    @media (max-width: 768px) {
      nav .nav-container {
        flex-direction: column;
        gap: 1rem;
      }

      nav ul {
        gap: 1rem;
      }

      .hero {
        min-height: auto;
        padding: 5rem 0;
      }

      .hero .contact-info {
        flex-direction: column;
        gap: 1rem;
      }

      .social-links {
        gap: 0.75rem;
      }

      .social-links a {
        width: 45px;
        height: 45px;
      }

      .social-links svg {
        width: 20px;
        height: 20px;
      }

      section {
        padding: 3rem 1rem;
      }

      .card {
        padding: 1.5rem;
      }

      .skills-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>
</head>
<body data-theme="dark">
  <div class="floating-particles">
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
  </div>

  <nav>
    <div class="nav-container">
      <ul>
        ${data.summary ? '<li><a href="#about">About</a></li>' : ''}
        ${data.experience.length > 0 ? '<li><a href="#experience">Experience</a></li>' : ''}
        ${data.education.length > 0 ? '<li><a href="#education">Education</a></li>' : ''}
        ${data.skills.length > 0 ? '<li><a href="#skills">Skills</a></li>' : ''}
        ${data.projects.length > 0 ? '<li><a href="#projects">Projects</a></li>' : ''}
        ${data.certifications.length > 0 ? '<li><a href="#certifications">Certifications</a></li>' : ''}
      </ul>
      <button class="theme-toggle" aria-label="Toggle theme">
        <svg viewBox="0 0 24 24">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 01-.75-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 101.06-1.061l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 01-.75-1.5H5.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
        </svg>
      </button>
    </div>
  </nav>

  <main>
    <section class="hero" id="hero">
      <div class="hero-content">
        <h1>${data.fullName}</h1>
        <p class="subtitle">${data.subtitle ? data.subtitle : ''}</p>
        <div class="contact-info">
          ${data.email ? `<a href="mailto:${data.email}"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg> ${data.email}</a>` : ''}
          ${data.phone ? `<a href="tel:${data.phone}"><svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg> ${data.phone}</a>` : ''}
          ${data.location ? `<span><svg viewBox="0 0 24 24"><path d="M12 2C8.13 8.88 7 11.54 7 16c0 3.31 2.69 6 6 6s6-2.69 6-6c0-4.46-1.13-7.12-5-10zM12 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg> ${data.location}</span>` : ''}
        </div>
        ${this.generateSocialLinks(data.social)}
      </div>
    </section>

    ${data.summary ? `
    <section id="about">
      <h2>About</h2>
      <div class="card">
        <p>${data.summary}</p>
      </div>
    </section>
    ` : ''}

    ${data.experience.length > 0 ? `
    <section id="experience">
      <h2>Experience</h2>
      ${data.experience.map(exp => `
      <div class="card tilt">
        <div class="job-title">${exp.position}</div>
        <div class="company-info">${exp.company}</div>
        <div class="duration">${exp.duration}</div>
        <div class="description">${exp.description}</div>
        ${exp.highlights.length > 0 ? `
        <ul class="highlights">
          ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
        ` : ''}
      </div>
      `).join('')}
    </section>
    ` : ''}

    ${data.education.length > 0 ? `
    <section id="education">
      <h2>Education</h2>
      ${data.education.map(edu => `
      <div class="card tilt">
        <div class="degree">${edu.degree} in ${edu.field}</div>
        <div class="institution">${edu.institution}</div>
        <div class="duration">${edu.year}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
      </div>
      `).join('')}
    </section>
    ` : ''}

    ${data.skills.length > 0 ? `
    <section id="skills">
      <h2>Skills</h2>
      <div class="skills-grid">
        ${data.skills.map(skill => `
        <div class="card tilt">
          <h3>${skill.category}</h3>
          <div class="skill-items">
            ${skill.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
          </div>
        </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    ${data.projects.length > 0 ? `
    <section id="projects">
      <h2>Projects</h2>
      ${data.projects.map(proj => `
      <div class="card tilt">
        <h3>${proj.title}</h3>
        <p>${proj.description}</p>
        ${proj.technologies.length > 0 ? `
        <div class="technologies">
          ${proj.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
        ` : ''}
        ${proj.link ? `<a href="${proj.link}" class="project-link" target="_blank">View Project <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></a>` : ''}
      </div>
      `).join('')}
    </section>
    ` : ''}

    ${data.certifications.length > 0 ? `
    <section id="certifications">
      <h2>Certifications</h2>
      <div class="card">
        <ul class="highlights">
          ${data.certifications.map(cert => `<li>${cert}</li>`).join('')}
        </ul>
      </div>
    </section>
    ` : ''}
  </main>

  <button class="scroll-to-top" aria-label="Scroll to top">
    <svg viewBox="0 0 24 24">
      <path d="M7 14l5-5 5 5z"/>
    </svg>
  </button>

  <footer>
    <p>Generated with AI Portfolio Generator • ${new Date().getFullYear()}</p>
  </footer>

  <script>
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    function setTheme(theme) {
      body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      themeToggle.innerHTML = theme === 'dark'
        ? '<svg viewBox="0 0 24 24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 01-.75-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 101.06-1.061l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 01-.75-1.5H5.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/></svg>'
        : '<svg viewBox="0 0 24 24"><path d="M9.528 1.718a.75.75 0 00-.972.434L8.158 4.08a.75.75 0 01-1.375-.375L7.556.777a.75.75 0 00-.972-.434L4.863 1.718a.75.75 0 01-.75-1.299L4.863.22a.75.75 0 00-.75 1.299l-1.721.718a.75.75 0 00-.434.972l.781 2.25a.75.75 0 011.375.375l-.781-2.25a.75.75 0 00-.434-.972zM15.75 8a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.094 10.5a.75.75 0 00-.972.434L2.41 12.78a.75.75 0 01-1.299-.75l.718-1.721a.75.75 0 00-.434-.972l-2.25-.781a.75.75 0 01-.375-1.375l2.25.781a.75.75 0 00.972-.434l.781-2.25a.75.75 0 01.75 1.299l-.781 2.25a.75.75 0 00.434.972zM19.906 10.5a.75.75 0 00-.972.434l-.781 2.25a.75.75 0 01-1.299-.75l.718-1.721a.75.75 0 00-.434-.972l-2.25-.781a.75.75 0 01-.375-1.375l2.25.781a.75.75 0 00.972-.434l.781-2.25a.75.75 0 01.75 1.299l-.781 2.25a.75.75 0 00.434.972z"/></svg>';
    }

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });

    // Smooth scroll and active link highlighting
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          setTimeout(updateActiveLink, 100);
        }
      });
    });

    function updateActiveLink() {
      const sections = document.querySelectorAll('section');
      let current = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });

      document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', updateActiveLink);

    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    // 3D Tilt effect
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      });
    });

    // Scroll to top
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Typing animation for subtitle (optional enhancement)
    const subtitle = document.querySelector('.hero .subtitle');
    if (subtitle) {
      const text = subtitle.textContent;
      subtitle.textContent = '';
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          subtitle.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      setTimeout(typeWriter, 1000);
    }
  </script>
</body>
</html>`;
  }

  private static generateSocialLinks(social: any[]): string {
    if (!social || social.length === 0) return '';

    const icons: { [key: string]: string } = {
      github: '<svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
      linkedin: '<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
      twitter: '<svg viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
      portfolio: '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
      website: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
    };

    return `
      <div class="social-links">
        ${social
        .map(
          (s) => `
          <a href="${s.url}" target="_blank" title="${s.platform}" rel="noopener noreferrer">
            ${icons[s.platform.toLowerCase()] || '<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>'}
          </a>
        `
        )
        .join('')}
      </div>
    `;
  }
}