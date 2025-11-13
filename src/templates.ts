export interface ResumeData {
  fullName: string;                    // required
  subtitle?: string;
  headline?: string;
  pronouns?: string;
  profileImageUrl?: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  timezone?: string;
  summary?: string;
  objective?: string;
  experience: Experience[];            // allow empty array
  education: Education[];
  skills: Skill[];
  skillRatings?: Record<string, number>;
  languages?: { name: string; level: string }[];
  projects: Project[];
  certifications: string[];
  social: SocialLink[];
  availability?: string;
  portfolioLinks?: { title: string; url: string }[];
  themePreferences?: { prefersDark?: boolean; accentColor?: string };
  meta?: { generatedAt?: string };
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  location?: string;
  description?: string;
  highlights?: string[];
  companyUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  year: string;
  gpa?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
  description?: string;
  technologies: string[];
  link?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

/**
 * Helper function to generate social links HTML
 */
function generateSocialLinks(social: any[]): string {
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
function generateSocialLinksforDefault(social: any[]): string {
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
export function defaultTheme(data: ResumeData): string {
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
        ${generateSocialLinksforDefault(data.social)}
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
        ${exp.highlights && exp.highlights.length > 0 ? `
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
/**
 * Swiss Minimal theme with layered cards and subtle z-axis shadows.
 */
export function swissMinimal(data: ResumeData): string {
  const theme = data.themePreferences?.prefersDark ? 'dark' : 'light';
  const accentColor = data.themePreferences?.accentColor || '#000';
  const generatedAt = data.meta?.generatedAt || new Date().toISOString();

  return `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.fullName} - Portfolio</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --accent: ${accentColor};
      --bg: ${theme === 'dark' ? '#fff' : '#000'};
      --text: ${theme === 'dark' ? '#000' : '#fff'};
      --surface: ${theme === 'dark' ? '#f5f5f5' : '#1a1a1a'};
      --shadow-light: 0 2px 10px rgba(0,0,0,0.05);
      --shadow-medium: 0 8px 25px rgba(0,0,0,0.1);
      --shadow-heavy: 0 20px 40px rgba(0,0,0,0.15);
      --shadow-glow: 0 0 30px rgba(0,0,0,0.1);
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      perspective: 1200px;
      overflow-x: hidden;
      position: relative;
    }

    /* 3D Background Layers */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background:
        radial-gradient(circle at 20% 30%, rgba(0,0,0,0.02) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(0,0,0,0.02) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(0,0,0,0.01) 0%, transparent 50%);
      transform: translateZ(-200px) scale(1.2);
      z-index: -2;
    }

    body::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, transparent 30%, rgba(0,0,0,0.01) 50%, transparent 70%);
      transform: translateZ(-100px) rotate(45deg);
      animation: floatBackground 20s ease-in-out infinite;
      z-index: -1;
    }

    @keyframes floatBackground {
      0%, 100% { transform: translateZ(-100px) rotate(45deg) scale(1); }
      50% { transform: translateZ(-100px) rotate(45deg) scale(1.05); }
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 2rem;
      transform-style: preserve-3d;
    }

    .header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      margin-bottom: 6rem;
      margin-top: 8rem;
      transform-style: preserve-3d;
      position: relative;
      align-items: start;
    }

    .header::before {
      content: '';
      position: absolute;
      top: -30px;
      left: -30px;
      right: -30px;
      bottom: -30px;
      background: linear-gradient(135deg, rgba(0,0,0,0.03), rgba(0,0,0,0.01));
      transform: translateZ(-15px) rotateX(3deg) rotateY(-1deg);
      border-radius: 25px;
      z-index: -1;
      animation: headerGlow 8s ease-in-out infinite;
    }

    @keyframes headerGlow {
      0%, 100% { opacity: 0.3; transform: translateZ(-15px) rotateX(3deg) rotateY(-1deg); }
      50% { opacity: 0.6; transform: translateZ(-10px) rotateX(2deg) rotateY(1deg); }
    }

    .hero-content {
      transform-style: preserve-3d;
    }

    h1 {
      font-size: clamp(2.5rem, 6vw, 5rem);
      font-weight: 700;
      line-height: 0.9;
      letter-spacing: -0.03em;
      transform: translateZ(50px) rotateX(-3deg);
      text-shadow: 0 6px 12px rgba(0,0,0,0.15);
      transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      margin-bottom: 1rem;
      animation: titleFloat 6s ease-in-out infinite;
    }

    @keyframes titleFloat {
      0%, 100% { transform: translateZ(50px) rotateX(-3deg) translateY(0px); }
      50% { transform: translateZ(60px) rotateX(-1deg) translateY(-5px); }
    }

    h1:hover {
      transform: translateZ(80px) rotateX(0deg) rotateY(3deg) scale(1.05);
      animation-play-state: paused;
    }

    .subtitle {
      font-size: 1.3rem;
      opacity: 0.8;
      transform: translateZ(25px) rotateX(1deg);
      transition: transform 0.4s ease;
    }

    .subtitle:hover {
      transform: translateZ(35px) rotateX(-1deg) translateX(5px);
    }

    .contact {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transform: translateZ(30px) rotateY(2deg);
      transform-style: preserve-3d;
      background: rgba(255,255,255,0.05);
      padding: 2rem;
      border-radius: 15px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      animation: contactSlide 4s ease-out;
      min-height: 250px;
      justify-content: flex-start;
      align-self: flex-start;
      margin-top: 2rem;
    }

    @keyframes contactSlide {
      0% { transform: translateZ(30px) rotateY(2deg) translateX(50px); opacity: 0; }
      100% { transform: translateZ(30px) rotateY(2deg) translateX(0px); opacity: 1; }
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      transform: translateZ(10px);
      transition: all 0.3s ease;
      padding: 0.5rem;
      border-radius: 8px;
    }

    .contact-item:hover {
      transform: translateZ(20px) translateX(10px) scale(1.02);
      background: rgba(255,255,255,0.1);
    }

    .contact-icon {
      width: 16px;
      height: 16px;
      opacity: 0.7;
      transform: translateZ(5px);
    }

    .contact a {
      color: var(--text);
      text-decoration: none;
      transition: all 0.3s ease;
      transform: translateZ(5px);
      font-weight: 500;
    }

    .contact a:hover {
      color: var(--accent);
      transform: translateZ(15px) translateX(3px);
    }

    .contact span {
      color: var(--text);
      opacity: 0.9;
      transform: translateZ(5px);
    }

    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .social-links a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: rgba(255,255,255,0.1);
      border-radius: 8px;
      transition: all 0.3s ease;
      transform: translateZ(5px);
      border: 1px solid rgba(255,255,255,0.2);
    }

    .social-links a:hover {
      transform: translateZ(15px) scale(1.1);
      background: rgba(255,255,255,0.2);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    .social-links svg {
      width: 16px;
      height: 16px;
      fill: var(--text);
      opacity: 0.8;
      transition: all 0.3s ease;
    }

    .social-links a:hover svg {
      opacity: 1;
      fill: var(--accent);
    }

    section {
      margin-bottom: 4rem;
      transform-style: preserve-3d;
      position: relative;
    }

    section::before {
      content: '';
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      background: linear-gradient(135deg, rgba(0,0,0,0.01), rgba(0,0,0,0.02));
      transform: translateZ(-5px);
      border-radius: 15px;
      z-index: -1;
    }

    h2 {
      font-size: 1.2rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      margin-bottom: 2rem;
      font-weight: 600;
      transform: translateZ(15px);
      position: relative;
    }

    h2::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 30px;
      height: 2px;
      background: var(--accent);
      transform: translateZ(5px);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .card {
      background: var(--surface);
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: var(--shadow-light);
      transform: translateZ(0px);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      transform-style: preserve-3d;
      border-radius: 12px;
      position: relative;
      overflow: hidden;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
      transform: translateZ(-1px);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .card:hover {
      transform: translateZ(25px) rotateX(5deg) rotateY(-2deg) scale(1.02);
      box-shadow: var(--shadow-heavy), var(--shadow-glow);
    }

    .card:hover::before {
      opacity: 1;
    }

    .card:nth-child(even):hover {
      transform: translateZ(25px) rotateX(-3deg) rotateY(2deg) scale(1.02);
    }

    .card:nth-child(3n):hover {
      transform: translateZ(30px) rotateX(2deg) rotateY(3deg) skewX(-1deg) scale(1.03);
    }

    .card:nth-child(4n):hover {
      transform: translateZ(20px) rotateX(-4deg) rotateY(-3deg) skewY(1deg) scale(1.01);
    }

    .card:nth-child(5n):hover {
      transform: translateZ(35px) rotateX(6deg) rotateY(1deg) scale(1.04);
      box-shadow: var(--shadow-heavy), 0 0 40px rgba(0,0,0,0.2);
    }

    .grid {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 2rem;
      position: relative;
    }

    .label {
      font-weight: 600;
      transform: translateZ(10px);
      color: var(--accent);
    }

    .avatar {
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, var(--accent), var(--accent));
      color: var(--bg);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: bold;
      margin: 0 auto 1rem;
      transform: translateZ(30px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      transition: transform 0.4s ease;
    }

    .avatar:hover {
      transform: translateZ(50px) rotateY(180deg) scale(1.1);
    }

    @keyframes avatarPulse {
      0%, 100% { box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
      50% { box-shadow: 0 10px 30px rgba(0,0,0,0.2), 0 0 40px rgba(0,0,0,0.1); }
    }

    nav {
      position: fixed;
      top: 4rem;
      left: 2rem;
      right: 2rem;
      z-index: 100;
      transform: translateZ(50px);
      background: var(--surface);
      padding: 1rem 2rem;
      border-radius: 12px;
      box-shadow: var(--shadow-medium);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    nav .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    nav a {
      color: var(--text);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      transform: translateZ(5px);
      padding: 0.5rem 1rem;
      border-radius: 6px;
      position: relative;
    }

    nav a:hover {
      transform: translateZ(15px) translateY(-3px);
      background: rgba(0,0,0,0.05);
      color: var(--accent);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    nav a.active {
      background: rgba(0,0,0,0.1);
      color: var(--accent);
      transform: translateZ(10px);
    }

    nav a.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px;
      background: var(--accent);
      border-radius: 1px;
    }

    .theme-toggle {
      background: var(--surface);
      border: 1px solid var(--text);
      padding: 0.5rem;
      cursor: pointer;
      margin-top: 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      transform: translateZ(5px);
    }

    .theme-toggle:hover {
      transform: translateZ(15px) scale(1.05);
      box-shadow: var(--shadow-medium);
    }

    /* Floating 3D Elements & Particles */
    .floating-shapes {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    }

    .shape {
      position: absolute;
      animation: floatShape 15s ease-in-out infinite;
    }

    .shape:nth-child(1) {
      width: 200px;
      height: 200px;
      top: 10%;
      left: 10%;
      background: linear-gradient(135deg, rgba(0,0,0,0.03), rgba(0,0,0,0.01));
      border-radius: 50%;
      transform: translateZ(-50px);
      animation-delay: 0s;
    }

    .shape:nth-child(2) {
      width: 150px;
      height: 150px;
      top: 60%;
      right: 15%;
      background: linear-gradient(45deg, rgba(0,0,0,0.02), transparent);
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      transform: translateZ(-75px);
      animation-delay: 5s;
    }

    .shape:nth-child(3) {
      width: 100px;
      height: 100px;
      bottom: 20%;
      left: 20%;
      background: linear-gradient(135deg, rgba(0,0,0,0.025), rgba(0,0,0,0.005));
      border-radius: 20px;
      transform: translateZ(-25px) rotate(45deg);
      animation-delay: 10s;
    }

    .shape:nth-child(4) {
      width: 120px;
      height: 120px;
      top: 30%;
      right: 30%;
      background: radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%);
      border-radius: 50% 20% 50% 20%;
      transform: translateZ(-40px);
      animation: floatShape2 18s ease-in-out infinite;
      animation-delay: 3s;
    }

    .shape:nth-child(5) {
      width: 80px;
      height: 80px;
      bottom: 40%;
      right: 10%;
      background: linear-gradient(45deg, rgba(0,0,0,0.015), rgba(0,0,0,0.03));
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
      transform: translateZ(-60px);
      animation: floatShape3 12s ease-in-out infinite;
      animation-delay: 7s;
    }

    /* 3D Particles */
    .particles {
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
      background: var(--accent);
      border-radius: 50%;
      animation: particleFloat 8s ease-in-out infinite;
      opacity: 0.1;
    }

    .particle:nth-child(1) {
      width: 6px;
      height: 6px;
      top: 15%;
      left: 20%;
      animation-delay: 0s;
      transform: translateZ(-30px);
    }

    .particle:nth-child(2) {
      width: 4px;
      height: 4px;
      top: 25%;
      right: 25%;
      animation-delay: 2s;
      transform: translateZ(-20px);
    }

    .particle:nth-child(3) {
      width: 8px;
      height: 8px;
      bottom: 30%;
      left: 15%;
      animation-delay: 4s;
      transform: translateZ(-40px);
    }

    .particle:nth-child(4) {
      width: 5px;
      height: 5px;
      top: 40%;
      right: 10%;
      animation-delay: 6s;
      transform: translateZ(-25px);
    }

    .particle:nth-child(5) {
      width: 7px;
      height: 7px;
      bottom: 15%;
      right: 20%;
      animation-delay: 1s;
      transform: translateZ(-35px);
    }

    .particle:nth-child(6) {
      width: 3px;
      height: 3px;
      top: 60%;
      left: 30%;
      animation-delay: 3s;
      transform: translateZ(-15px);
    }

    @keyframes particleFloat {
      0%, 100% {
        transform: translateZ(-30px) translateY(0px) rotate(0deg) scale(1);
        opacity: 0.1;
      }
      50% {
        transform: translateZ(-30px) translateY(-20px) rotate(180deg) scale(1.2);
        opacity: 0.3;
      }
    }

    @keyframes floatShape {
      0%, 100% {
        transform: translateZ(-50px) translateY(0px) rotate(0deg) scale(1);
        opacity: 0.3;
      }
      50% {
        transform: translateZ(-50px) translateY(-30px) rotate(180deg) scale(1.1);
        opacity: 0.6;
      }
    }

    @keyframes floatShape2 {
      0%, 100% {
        transform: translateZ(-40px) translateY(0px) rotate(0deg) scale(1);
        opacity: 0.2;
      }
      33% {
        transform: translateZ(-40px) translateY(-20px) rotate(120deg) scale(0.9);
        opacity: 0.4;
      }
      66% {
        transform: translateZ(-40px) translateY(10px) rotate(240deg) scale(1.2);
        opacity: 0.3;
      }
    }

    @keyframes floatShape3 {
      0%, 100% {
        transform: translateZ(-60px) translateY(0px) rotate(0deg);
        opacity: 0.25;
      }
      50% {
        transform: translateZ(-60px) translateY(-25px) rotate(180deg);
        opacity: 0.5;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
        transform: none !important;
        animation: none !important;
      }
    }

    @media print {
      nav, .floating-shapes { display: none; }
      .card { break-inside: avoid; }
      body { perspective: none; }
    }
  </style>
</head>
<body>
  <div class="floating-shapes">
    <div class="shape"></div>
    <div class="shape"></div>
    <div class="shape"></div>
    <div class="shape"></div>
    <div class="shape"></div>
  </div>

  <div class="particles">
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
  </div>

  <nav>
    <div class="nav-links">
      ${data.summary ? '<a href="#about">About</a>' : ''}
      ${data.experience.length > 0 ? '<a href="#experience">Experience</a>' : ''}
      ${data.education.length > 0 ? '<a href="#education">Education</a>' : ''}
      ${data.skills.length > 0 ? '<a href="#skills">Skills</a>' : ''}
      ${data.projects.length > 0 ? '<a href="#projects">Projects</a>' : ''}
    </div>
    <button class="theme-toggle" aria-label="Toggle theme">Theme</button>
  </nav>

  <div class="container">
    <header class="header" id="hero">
      <div class="hero-content">
        ${data.profileImageUrl ? `<img src="${data.profileImageUrl}" alt="${data.fullName}" style="width: 120px; height: 120px; border-radius: 50%; margin-bottom: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.2); animation: avatarPulse 4s ease-in-out infinite;">` : `<div class="avatar">${data.fullName.split(' ').map(n => n[0]).join('')}</div>`}
        <h1>${data.fullName}</h1>
        ${data.subtitle ? `<p class="subtitle">${data.subtitle}</p>` : ''}
      </div>
      <div class="contact">
        ${data.email ? `<div class="contact-item"><svg class="contact-icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg><a href="mailto:${data.email}">${data.email}</a></div>` : ''}
        ${data.phone ? `<div class="contact-item"><svg class="contact-icon" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg><a href="tel:${data.phone}">${data.phone}</a></div>` : ''}
        ${data.location ? `<div class="contact-item"><svg class="contact-icon" viewBox="0 0 24 24"><path d="M12 2C8.13 8.88 7 11.54 7 16c0 3.31 2.69 6 6 6s6-2.69 6-6c0-4.46-1.13-7.12-5-10zM12 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg><span>${data.location}</span></div>` : ''}
        ${data.website ? `<div class="contact-item"><svg class="contact-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg><a href="${data.website}" target="_blank">${data.website}</a></div>` : ''}
        ${generateSocialLinks(data.social)}
      </div>
    </header>

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
      <div class="card">
        <div class="grid">
          <div class="label">${exp.duration}</div>
          <div>
            <strong style="font-size: 1.2rem;">${exp.position}</strong><br>
            <em>${exp.company}</em><br>
            ${exp.description ? `<p style="margin-top: 0.5rem;">${exp.description}</p>` : ''}
            ${exp.highlights ? `<ul style="margin-top: 1rem;">${exp.highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
          </div>
        </div>
      </div>
      `).join('')}
    </section>
    ` : ''}

    ${data.education.length > 0 ? `
    <section id="education">
      <h2>Education</h2>
      ${data.education.map(edu => `
      <div class="card">
        <div class="grid">
          <div class="label">${edu.year}</div>
          <div>
            <strong>${edu.degree} in ${edu.field}</strong><br>
            ${edu.institution}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
          </div>
        </div>
      </div>
      `).join('')}
    </section>
    ` : ''}

    ${data.skills.length > 0 ? `
    <section id="skills">
      <h2>Skills</h2>
      ${data.skills.map(skill => `
      <div class="card">
        <h3 style="margin-bottom: 1rem; font-size: 1.1rem;">${skill.category}</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${skill.items.map((item, index) => `<span style="padding: 0.25rem 0.75rem; border: 1px solid var(--text); font-size: 0.9rem; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform: translateZ(5px); display: inline-block;" onmouseover="this.style.transform='translateZ(20px) rotateX(${(index % 2 === 0 ? 5 : -5)}deg) rotateY(${(index % 3 === 0 ? 3 : -3)}deg) scale(1.08)'" onmouseout="this.style.transform='translateZ(5px)'">${item}</span>`).join('')}
        </div>
      </div>
      `).join('')}
    </section>
    ` : ''}

    ${data.projects.length > 0 ? `
    <section id="projects">
      <h2>Projects</h2>
      ${data.projects.map(proj => `
      <div class="card">
        <h3 style="margin-bottom: 0.5rem;">${proj.title}</h3>
        ${proj.description ? `<p style="margin-bottom: 1rem;">${proj.description}</p>` : ''}
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
          ${proj.technologies.map(tech => `<span style="padding: 0.25rem 0.5rem; background: var(--surface); border: 1px solid var(--text); font-size: 0.8rem;">${tech}</span>`).join('')}
        </div>
        ${proj.link ? `<a href="${proj.link}" style="color: var(--accent);">View Project</a>` : ''}
      </div>
      `).join('')}
    </section>
    ` : ''}

    ${data.certifications.length > 0 ? `
    <section id="certifications">
      <h2>Certifications</h2>
      <div class="card">
        <ul>${data.certifications.map(cert => `<li>${cert}</li>`).join('')}</ul>
      </div>
    </section>
    ` : ''}

    <footer style="margin-top: 4rem; padding: 2rem 0; border-top: 1px solid var(--text); text-align: center; opacity: 0.7;">
      <p>Generated at ${generatedAt}</p>
    </footer>
  </div>

  <script>
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
  
    function applyTheme(theme) {
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || '${theme}';
    applyTheme(savedTheme);
  
    // Smooth scroll for navigation
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  </script>
</body>
</html>`;
}

/**
 * Brutalist Neo-Brutalism theme with blocky layered panels and strong perspective rotate/translate.
 */
export function brutalistNeoBrutalism(data: ResumeData): string {
  const theme = data.themePreferences?.prefersDark ? 'dark' : 'light';
  const accentColor = data.themePreferences?.accentColor || '#ff0000';
  const generatedAt = data.meta?.generatedAt || new Date().toISOString();

  return `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.fullName} - Portfolio</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --accent: ${accentColor};
      --bg: ${theme === 'dark' ? '#000' : '#fff'};
      --text: ${theme === 'dark' ? '#fff' : '#000'};
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Courier New', monospace;
      background: var(--bg);
      color: var(--text);
      padding: 2rem;
      perspective: 1000px;
    }
    .block {
      background: var(--accent);
      border: 8px solid var(--text);
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 12px 12px 0 var(--text);
      transform: rotate(-2deg);
      transition: transform 0.3s ease;
    }
    .block:nth-child(even) { transform: rotate(2deg); background: var(--text); color: var(--accent); }
    .block:hover { transform: rotate(0deg) translateX(10px); }
    h1 {
      font-size: clamp(3rem, 6vw, 5rem);
      text-transform: uppercase;
      border: 6px solid var(--text);
      padding: 1rem;
      background: var(--accent);
      color: var(--text);
      text-shadow: 4px 4px 0 var(--text);
      margin-bottom: 2rem;
      transform: rotate(-1deg);
    }
    h2 {
      background: var(--text);
      color: var(--accent);
      padding: 0.5rem 1rem;
      border: 4px solid var(--accent);
      display: inline-block;
      margin-bottom: 1rem;
      font-size: 1.5rem;
      text-transform: uppercase;
      transform: rotate(1deg);
    }
    .skill-tag {
      display: inline-block;
      background: var(--text);
      color: var(--accent);
      border: 3px solid var(--accent);
      padding: 0.5rem 1rem;
      margin: 0.25rem;
      font-weight: bold;
      transform: rotate(-1deg);
    }
    .skill-tag:nth-child(even) { transform: rotate(1deg); }
    nav { position: fixed; top: 2rem; right: 2rem; z-index: 100; }
    nav a { display: block; margin-bottom: 0.5rem; color: var(--text); text-decoration: none; font-weight: bold; border: 2px solid var(--text); padding: 0.5rem; transform: rotate(-1deg); }
    .theme-toggle { background: var(--accent); border: 4px solid var(--text); padding: 0.5rem; cursor: pointer; margin-top: 1rem; color: var(--text); font-weight: bold; }
    @media (prefers-reduced-motion: reduce) { * { transition: none; transform: none !important; } }
    @media print { nav { display: none; } .block { break-inside: avoid; } }
  </style>
</head>
<body>
  <nav>
    ${data.summary ? '<a href="#about">ABOUT</a>' : ''}
    ${data.experience.length > 0 ? '<a href="#experience">WORK</a>' : ''}
    ${data.skills.length > 0 ? '<a href="#skills">SKILLS</a>' : ''}
    <button class="theme-toggle" aria-label="Toggle theme">THEME</button>
  </nav>

  <h1>${data.fullName}</h1>

  ${(data.email || data.phone || data.location || data.website || data.social.length > 0) ? `
  <div class="block">
    <h2>CONTACT</h2>
    ${data.email ? `<div style="margin-bottom: 0.5rem;"><strong>EMAIL:</strong> <a href="mailto:${data.email}" style="color: var(--text);">${data.email}</a></div>` : ''}
    ${data.phone ? `<div style="margin-bottom: 0.5rem;"><strong>PHONE:</strong> <a href="tel:${data.phone}" style="color: var(--text);">${data.phone}</a></div>` : ''}
    ${data.location ? `<div style="margin-bottom: 0.5rem;"><strong>LOCATION:</strong> ${data.location}</div>` : ''}
    ${data.website ? `<div style="margin-bottom: 0.5rem;"><strong>WEBSITE:</strong> <a href="${data.website}" target="_blank" style="color: var(--text);">${data.website}</a></div>` : ''}
    ${data.social.length > 0 ? `
    <div style="margin-top: 1rem;">
      <strong>SOCIAL:</strong><br>
      ${data.social.map(s => `<a href="${s.url}" target="_blank" style="color: var(--text); margin-right: 1rem;">${s.platform.toUpperCase()}</a>`).join('')}
    </div>
    ` : ''}
  </div>
  ` : ''}

  ${data.summary ? `
  <div class="block" id="about">
    <h2>ABOUT</h2>
    <p>${data.summary}</p>
  </div>
  ` : ''}

  ${data.experience.length > 0 ? `
  <div class="block" id="experience">
    <h2>WORK</h2>
    ${data.experience.map(exp => `
    <div style="margin-bottom: 1.5rem;">
      <strong style="font-size: 1.2rem;">${exp.position}</strong><br>
      ${exp.company} | ${exp.duration}
      ${exp.description ? `<p style="margin-top: 0.5rem;">${exp.description}</p>` : ''}
    </div>
    `).join('')}
  </div>
  ` : ''}

  ${data.education.length > 0 ? `
  <div class="block">
    <h2>EDUCATION</h2>
    ${data.education.map(edu => `
    <div style="margin-bottom: 1.5rem;">
      <strong style="font-size: 1.2rem;">${edu.degree} in ${edu.field}</strong><br>
      ${edu.institution} | ${edu.year}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
    </div>
    `).join('')}
  </div>
  ` : ''}

  ${data.skills.length > 0 ? `
  <div class="block" id="skills">
    <h2>SKILLS</h2>
    ${data.skills.map(s => s.items.map(item => `<span class="skill-tag">${item}</span>`).join('')).join('')}
  </div>
  ` : ''}

  ${data.projects.length > 0 ? `
  <div class="block">
    <h2>PROJECTS</h2>
    ${data.projects.map(proj => `
    <div style="margin-bottom: 1.5rem;">
      <strong style="font-size: 1.2rem;">${proj.title}</strong><br>
      ${proj.description ? `<p style="margin-top: 0.5rem;">${proj.description}</p>` : ''}
      ${proj.technologies.length > 0 ? `<p style="margin-top: 0.5rem;">Tech: ${proj.technologies.join(', ')}</p>` : ''}
      ${proj.link ? `<a href="${proj.link}" style="color: var(--accent);">View Project</a>` : ''}
    </div>
    `).join('')}
  </div>
  ` : ''}

  ${data.certifications.length > 0 ? `
  <div class="block">
    <h2>CERTIFICATIONS</h2>
    <ul>${data.certifications.map(cert => `<li>${cert}</li>`).join('')}</ul>
  </div>
  ` : ''}

  <footer style="margin-top: 4rem; padding: 2rem; border-top: 8px solid var(--text); text-align: center;">
    <p>Generated at ${generatedAt}</p>
  </footer>

  <script>
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    function applyTheme(theme) {
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

      // Update CSS variables dynamically
      const root = document.documentElement;
      if (theme === 'dark') {
        root.style.setProperty('--bg', '#fff');
        root.style.setProperty('--text', '#000');
        root.style.setProperty('--surface', '#f5f5f5');
      } else {
        root.style.setProperty('--bg', '#000');
        root.style.setProperty('--text', '#fff');
        root.style.setProperty('--surface', '#1a1a1a');
      }
    }

    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || '${theme}';
    applyTheme(savedTheme);
  </script>
</body>
</html>`;
}

/**
 * Terminal Hacker theme with pseudo-3D CRT glow and layered console panels with parallax.
 */
export function terminalHacker(data: ResumeData): string {
  const theme = data.themePreferences?.prefersDark ? 'dark' : 'light';
  const accentColor = data.themePreferences?.accentColor || '#00ff00';
  const generatedAt = data.meta?.generatedAt || new Date().toISOString();

  return `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.fullName} - Terminal</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --accent: ${accentColor};
      --bg: #0a0a0a;
      --text: #00ff00;
      --surface: #000;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Courier New', monospace;
      background: var(--bg);
      color: var(--text);
      padding: 2rem;
      overflow-x: hidden;
    }
    .crt {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(transparent 50%, rgba(0, 255, 0, 0.03) 50%);
      background-size: 100% 4px;
      pointer-events: none;
      z-index: -1;
      animation: scan 0.1s linear infinite;
    }
    @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
    .terminal {
      background: var(--surface);
      border: 2px solid var(--text);
      border-radius: 8px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.1);
      transform: translateZ(0);
      transition: transform 0.3s ease;
    }
    .terminal:hover { transform: translateZ(20px); }
    .prompt { color: var(--accent); }
    .prompt::before { content: "$ "; }
    h1 { color: var(--accent); margin-bottom: 1rem; text-shadow: 0 0 10px var(--accent); }
    .section { margin: 2rem 0; }
    .line { margin: 0.5rem 0; }
    .comment { color: #666; }
    a { color: var(--accent); text-decoration: underline; }
    .blink {
      animation: blink 1s infinite;
      display: inline-block;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    nav { position: fixed; top: 2rem; right: 2rem; z-index: 100; }
    nav a { display: block; margin-bottom: 0.5rem; color: var(--text); text-decoration: none; font-weight: 500; }
    .theme-toggle { background: var(--surface); border: 1px solid var(--text); padding: 0.5rem; cursor: pointer; margin-top: 1rem; }
    @media (prefers-reduced-motion: reduce) { .crt { display: none; } * { animation: none; } }
    @media print { .crt, nav { display: none; } .terminal { break-inside: avoid; } }
  </style>
</head>
<body>
  <div class="crt"></div>
  <nav>
    ${data.summary ? '<a href="#about">about</a>' : ''}
    ${data.experience.length > 0 ? '<a href="#experience">experience</a>' : ''}
    ${data.skills.length > 0 ? '<a href="#skills">skills</a>' : ''}
    <button class="theme-toggle" aria-label="Toggle theme">theme</button>
  </nav>

  <div class="terminal">
    <div class="prompt">cat portfolio.txt</div>
    <h1>${data.fullName}</h1>
    <div class="comment"># ${data.subtitle || 'Developer Portfolio'}</div>

    ${(data.email || data.phone || data.location || data.website || data.social.length > 0) ? `
    <div class="section">
      <div class="prompt">cat contact.txt</div>
      ${data.email ? `<div class="line">Email: <a href="mailto:${data.email}" style="color: var(--accent);">${data.email}</a></div>` : ''}
      ${data.phone ? `<div class="line">Phone: <a href="tel:${data.phone}" style="color: var(--accent);">${data.phone}</a></div>` : ''}
      ${data.location ? `<div class="line">Location: ${data.location}</div>` : ''}
      ${data.website ? `<div class="line">Website: <a href="${data.website}" target="_blank" style="color: var(--accent);">${data.website}</a></div>` : ''}
      ${data.social.length > 0 ? `
      <div class="line">Social:</div>
      ${data.social.map(s => `<div class="line">  └── <a href="${s.url}" target="_blank" style="color: var(--accent);">${s.platform}</a></div>`).join('')}
      ` : ''}
    </div>
    ` : ''}

    ${data.summary ? `
    <div class="section" id="about">
      <div class="prompt">cat about.txt</div>
      <div class="line">${data.summary}</div>
    </div>
    ` : ''}

    ${data.experience.length > 0 ? `
    <div class="section" id="experience">
      <div class="prompt">ls experience/</div>
      ${data.experience.map(exp => `
      <div class="line">├── ${exp.position} @ ${exp.company}</div>
      <div class="line">│   ├── Duration: ${exp.duration}</div>
      ${exp.description ? `<div class="line">│   ├── ${exp.description}</div>` : ''}
      ${exp.highlights && exp.highlights.length > 0 ? `
      <div class="line">│   └── Highlights:</div>
      ${exp.highlights.map(h => `<div class="line">│       • ${h}</div>`).join('')}
      ` : '<div class="line">│   └── No highlights</div>'}
      `).join('')}
    </div>
    ` : ''}

    ${data.education.length > 0 ? `
    <div class="section">
      <div class="prompt">ls education/</div>
      ${data.education.map(edu => `
      <div class="line">├── ${edu.degree} in ${edu.field}</div>
      <div class="line">│   ├── Institution: ${edu.institution}</div>
      <div class="line">│   └── Year: ${edu.year}${edu.gpa ? ` (GPA: ${edu.gpa})` : ''}</div>
      `).join('')}
    </div>
    ` : ''}

    ${data.skills.length > 0 ? `
    <div class="section" id="skills">
      <div class="prompt">cat skills.json</div>
      <div class="line">{</div>
      ${data.skills.map((s, i) => `
      <div class="line">  "${s.category}": [${s.items.map(item => '"' + item + '"').join(', ')}]${i < data.skills.length - 1 ? ',' : ''}</div>
      `).join('')}
      <div class="line">}</div>
    </div>
    ` : ''}

    ${data.projects.length > 0 ? `
    <div class="section">
      <div class="prompt">ls projects/</div>
      ${data.projects.map(proj => `
      <div class="line">├── ${proj.title}</div>
      <div class="line">│   ├── ${proj.description || 'No description'}</div>
      <div class="line">│   └── Tech: ${proj.technologies.join(', ')}</div>
      ${proj.link ? `<div class="line">│   └── Link: <a href="${proj.link}" target="_blank" style="color: var(--accent);">${proj.link}</a></div>` : ''}
      `).join('')}
    </div>
    ` : ''}

    ${data.certifications.length > 0 ? `
    <div class="section">
      <div class="prompt">cat certifications.txt</div>
      ${data.certifications.map(cert => `<div class="line">• ${cert}</div>`).join('')}
    </div>
    ` : ''}

    <div class="line"><span class="blink">█</span></div>
  </div>

  <footer style="margin-top: 4rem; padding: 2rem; text-align: center; opacity: 0.7;">
    <p>Generated at ${generatedAt}</p>
  </footer>

  <script>
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    function applyTheme(theme) {
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

      // Update CSS variables dynamically
      const root = document.documentElement;
      if (theme === 'dark') {
        root.style.setProperty('--bg', '#0a0a0a');
        root.style.setProperty('--text', '#00ff00');
        root.style.setProperty('--surface', '#000');
        root.style.setProperty('--accent', '#00ff00');
      } else {
        root.style.setProperty('--bg', '#f0f0f0');
        root.style.setProperty('--text', '#006600');
        root.style.setProperty('--surface', '#fff');
        root.style.setProperty('--accent', '#006600');
      }
    }

    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || '${theme}';
    applyTheme(savedTheme);

    // Add floating 3D elements
    const floatingShapes = document.createElement('div');
    floatingShapes.className = 'floating-shapes';
    floatingShapes.innerHTML = \`
      <div class="shape" style="width: 100px; height: 100px; top: 20%; left: 10%; background: radial-gradient(circle, rgba(0, 255, 0, 0.1) 0%, transparent 70%); border-radius: 50%;"></div>
      <div class="shape" style="width: 80px; height: 80px; top: 60%; right: 15%; background: linear-gradient(45deg, rgba(0, 255, 0, 0.05), transparent); clip-path: polygon(50% 0%, 0% 100%, 100% 100%);"></div>
      <div class="shape" style="width: 120px; height: 120px; bottom: 30%; left: 20%; background: radial-gradient(circle, rgba(0, 255, 0, 0.08) 0%, transparent 60%); border-radius: 20px;"></div>
    \`;
    document.body.insertBefore(floatingShapes, document.body.firstChild);

    // Add particles
    const particles = document.createElement('div');
    particles.className = 'particles';
    particles.innerHTML = \`
      <div class="particle" style="width: 4px; height: 4px; top: 15%; left: 25%;"></div>
      <div class="particle" style="width: 6px; height: 6px; top: 35%; right: 20%;"></div>
      <div class="particle" style="width: 3px; height: 3px; bottom: 25%; left: 30%;"></div>
      <div class="particle" style="width: 5px; height: 5px; top: 50%; right: 10%;"></div>
      <div class="particle" style="width: 4px; height: 4px; bottom: 40%; right: 25%;"></div>
      <div class="particle" style="width: 2px; height: 2px; top: 70%; left: 15%;"></div>
    \`;
    document.body.insertBefore(particles, document.body.firstChild);

    // 3D Mouse Parallax Effect
    let mouseX = 0.5, mouseY = 0.5;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;

      // Parallax background layers
      const layers = document.querySelectorAll('.floating-shapes .shape');
      layers.forEach((layer, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        const zDepth = 50 + index * 25;
        layer.style.transform = 'translateZ(-' + zDepth + 'px) translate(' + x + 'px, ' + y + 'px)';
      });

      // Particle parallax
      const particleElements = document.querySelectorAll('.particle');
      particleElements.forEach((particle, index) => {
        const speed = (index + 1) * 0.3;
        const x = (mouseX - 0.5) * speed * 15;
        const y = (mouseY - 0.5) * speed * 15;
        const zDepth = 20 + index * 5;
        particle.style.transform = 'translateZ(-' + zDepth + 'px) translate(' + x + 'px, ' + y + 'px)';
      });
    });

    // Add scroll-based 3D effects
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -0.5;

      const shapes = document.querySelectorAll('.floating-shapes .shape');
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        const yOffset = rate * speed;
        const baseTransform = 'translateZ(-' + (50 + index * 25) + 'px)';
        const mouseOffsetX = (mouseX - 0.5) * (index + 1) * 0.5 * 20;
        const mouseOffsetY = (mouseY - 0.5) * (index + 1) * 0.5 * 20;
        shape.style.transform = baseTransform + ' translate(' + mouseOffsetX + 'px, ' + (mouseOffsetY + yOffset) + 'px)';
      });
    });

    // Add click ripple effects
    document.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.style.cssText = \`
        position: fixed;
        left: \${e.clientX}px;
        top: \${e.clientY}px;
        width: 0px;
        height: 0px;
        border-radius: 50%;
        background: rgba(0, 255, 0, 0.2);
        transform: translate(-50%, -50%);
        transition: all 0.6s ease-out;
        z-index: 9999;
        pointer-events: none;
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
      \`;

      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.opacity = '0';
      }, 10);

      setTimeout(() => {
        document.body.removeChild(ripple);
      }, 600);
    });

    // Add matrix rain effect
    const canvas = document.createElement('canvas');
    canvas.style.cssText = \`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -2;
      opacity: 0.1;
    \`;
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff00';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(draw, 35);
  </script>
</body>
</html>`;
}


/**
 * Bento Grid theme with floating grid tiles and subtle tilt on hover.
 */
export function bentoGrid(data: ResumeData): string {
  const theme = data.themePreferences?.prefersDark ? 'dark' : 'light';
  const accentColor = data.themePreferences?.accentColor || '#6366f1';
  const generatedAt = data.meta?.generatedAt || new Date().toISOString();

  return `<!DOCTYPE html>
<html lang="en" data-theme="${theme}" data-accent="${accentColor === '#06b6d4' ? 'blue' : accentColor === '#8b5cf6' ? 'purple' : accentColor === '#10b981' ? 'green' : accentColor === '#ef4444' ? 'red' : 'blue'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.fullName} - Portfolio</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --accent: ${accentColor};
      --bg: ${theme === 'dark' ? '#f0f0f0' : '#1a1a1a'};
      --text: ${theme === 'dark' ? '#1a1a1a' : '#f0f0f0'};
      --surface: ${theme === 'dark' ? '#fff' : '#000'};
      --water-blue: #4facfe;
      --water-purple: #00f2fe;
      --water-pink: #43e97b;
      --water-green: #38f9d7;
      --water-orange: #fa709a;
      --water-red: #fee140;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      padding: 2rem;
      overflow-x: hidden;
      position: relative;
      perspective: 1200px;
    }

    /* Water Drop 3D Background */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background:
        radial-gradient(circle at 20% 30%, rgba(79, 172, 254, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(0, 242, 254, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(67, 233, 123, 0.06) 0%, transparent 50%);
      transform: translateZ(-200px) scale(1.2);
      z-index: -2;
      animation: waterFlow 20s ease-in-out infinite;
    }

    body::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, transparent 30%, rgba(79, 172, 254, 0.05) 50%, transparent 70%);
      transform: translateZ(-150px) rotate(45deg);
      animation: waterRipple 25s linear infinite;
      z-index: -1;
    }

    @keyframes waterFlow {
      0%, 100% { transform: translateZ(-200px) scale(1.2) rotate(0deg); }
      50% { transform: translateZ(-180px) scale(1.3) rotate(2deg); }
    }

    @keyframes waterRipple {
      0%, 100% { transform: translateZ(-150px) rotate(45deg) scale(1); }
      50% { transform: translateZ(-130px) rotate(47deg) scale(1.1); }
    }

    /* Floating Water Drops */
    .water-drops {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    }

    .drop {
      position: absolute;
      border-radius: 50%;
      animation: dropFloat 15s ease-in-out infinite;
      opacity: 0.1;
    }

    .drop:nth-child(1) {
      width: 200px;
      height: 200px;
      top: 10%;
      left: 10%;
      background: radial-gradient(circle, var(--water-blue), transparent);
      animation-delay: 0s;
      transform: translateZ(-100px);
    }

    .drop:nth-child(2) {
      width: 150px;
      height: 150px;
      top: 60%;
      right: 15%;
      background: radial-gradient(circle, var(--water-purple), transparent);
      animation-delay: 5s;
      transform: translateZ(-80px);
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }

    .drop:nth-child(3) {
      width: 120px;
      height: 120px;
      bottom: 20%;
      left: 20%;
      background: radial-gradient(circle, var(--water-pink), transparent);
      animation-delay: 10s;
      transform: translateZ(-60px) rotate(45deg);
    }

    .drop:nth-child(4) {
      width: 180px;
      height: 180px;
      top: 30%;
      right: 25%;
      background: radial-gradient(circle, var(--water-green), transparent);
      animation-delay: 7s;
      transform: translateZ(-90px);
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    }

    .drop:nth-child(5) {
      width: 100px;
      height: 100px;
      bottom: 40%;
      right: 10%;
      background: radial-gradient(circle, var(--water-orange), transparent);
      animation-delay: 12s;
      transform: translateZ(-70px);
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    }

    @keyframes dropFloat {
      0%, 100% {
        transform: translateZ(-80px) translateY(0px) rotate(0deg) scale(1);
        opacity: 0.1;
      }
      50% {
        transform: translateZ(-60px) translateY(-30px) rotate(180deg) scale(1.2);
        opacity: 0.2;
      }
    }

    /* Horizontal Top Navigation */
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding: 1rem 2rem;
      z-index: 1000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
      transform: translateZ(50px);
    }

    nav .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    nav a {
      color: var(--text);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      transform: translateZ(5px);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      position: relative;
    }

    nav a:hover {
      transform: translateZ(15px) translateY(-2px);
      background: rgba(0, 0, 0, 0.05);
      color: var(--accent);
    }

    nav a.active {
      background: var(--accent);
      color: white;
      transform: translateZ(10px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .theme-toggle {
      background: var(--accent);
      color: white;
      border: 2px solid var(--accent);
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.3s ease;
      transform: translateZ(5px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .theme-toggle:hover {
      transform: translateZ(15px) scale(1.05);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .social-links a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      transition: all 0.3s ease;
      transform: translateZ(5px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      text-decoration: none;
    }

    .social-links a:hover {
      transform: translateZ(15px) scale(1.1);
      background: rgba(255, 255, 255, 0.2);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .social-links svg {
      width: 16px;
      height: 16px;
      fill: #fff;
      opacity: 0.8;
      transition: all 0.3s ease;
    }

    .social-links a:hover svg {
      opacity: 1;
      fill: var(--accent);
    }

    /* Main Content */
    main {
      padding-top: 6rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem 0;
    }

    .card {
      background: var(--surface);
      border-radius: 24px;
      padding: 2.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      transform-style: preserve-3d;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
      transform: translateZ(-1px);
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: 24px;
    }

    .card:hover {
      transform: translateY(-15px) rotateX(8deg) rotateY(-3deg) scale(1.02);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25), 0 0 30px rgba(99, 102, 241, 0.1);
    }

    .card:hover::before {
      opacity: 1;
    }

    .card.large { grid-column: span 2; }

    .card.featured {
      background: linear-gradient(135deg, var(--water-blue) 0%, var(--water-purple) 50%, var(--water-pink) 100%);
      color: #fff;
      grid-column: span 2;
      grid-row: span 2;
      box-shadow: 0 15px 35px rgba(79, 172, 254, 0.3);
    }

    .card.contact {
      background: linear-gradient(135deg, var(--water-green) 0%, var(--water-blue) 100%);
      color: #fff;
    }

    .card.experience {
      background: linear-gradient(135deg, var(--water-purple) 0%, var(--water-pink) 100%);
      color: #fff;
    }

    .card.education {
      background: linear-gradient(135deg, var(--water-orange) 0%, var(--water-red) 100%);
      color: #fff;
    }

    .card.skills {
      background: linear-gradient(135deg, var(--water-pink) 0%, var(--water-green) 100%);
      color: #fff;
      grid-column: span 2;
    }

    .card.certifications {
      background: linear-gradient(135deg, var(--water-red) 0%, var(--water-orange) 100%);
      color: #fff;
    }

    h1 {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 700;
      margin-bottom: 0.5rem;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      opacity: 0.9;
      font-weight: 600;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .subtitle {
      font-size: 1.1rem;
      opacity: 0.8;
      margin-bottom: 1.5rem;
    }

    .contact-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      backdrop-filter: blur(5px);
      transform: translateZ(5px);
      transition: all 0.3s ease;
    }

    .contact-item:hover {
      transform: translateZ(15px) translateX(5px);
      background: rgba(255, 255, 255, 0.2);
    }

    .contact-icon {
      width: 18px;
      height: 18px;
      opacity: 0.8;
    }

    .company {
      font-weight: 600;
      margin-bottom: 0.5rem;
      opacity: 0.9;
    }

    .duration {
      font-size: 0.9rem;
      opacity: 0.7;
      margin-bottom: 1rem;
    }

    .description {
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .highlights {
      list-style: none;
      padding: 0;
    }

    .highlights li {
      margin-bottom: 0.5rem;
      padding-left: 1rem;
      position: relative;
      opacity: 0.9;
    }

    .highlights li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
    }

    .tag {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
      margin: 0.25rem;
      font-weight: 500;
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
      transform: translateZ(3px);
    }

    .tag:hover {
      transform: translateZ(10px) scale(1.05);
      background: rgba(255, 255, 255, 0.3);
    }

    .cert-list {
      list-style: none;
      padding: 0;
    }

    .cert-list li {
      margin-bottom: 0.75rem;
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      backdrop-filter: blur(5px);
      transform: translateZ(3px);
      transition: all 0.3s ease;
    }

    .cert-list li:hover {
      transform: translateZ(10px) translateX(5px);
      background: rgba(255, 255, 255, 0.2);
    }

    footer {
      margin-top: 4rem;
      padding: 2rem;
      text-align: center;
      opacity: 0.7;
      transform: translateZ(10px);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      nav .nav-links {
        flex-wrap: wrap;
        gap: 1rem;
      }

      .grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .card.large {
        grid-column: span 1;
      }

      .card.featured {
        grid-column: span 1;
        grid-row: span 1;
      }

      .contact-info {
        grid-template-columns: 1fr;
      }

      h1 {
        font-size: clamp(2rem, 6vw, 3rem);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none !important;
        transition: none !important;
        transform: none !important;
      }
    }

    @media print {
      nav, .water-drops { display: none; }
      .card { break-inside: avoid; box-shadow: none; transform: none; }
      body { background: white; color: black; }
    }
  </style>
</head>
<body>
  <div class="water-drops">
    <div class="drop"></div>
    <div class="drop"></div>
    <div class="drop"></div>
    <div class="drop"></div>
    <div class="drop"></div>
  </div>

  <nav>
    <div class="nav-links">
      <a href="#hero">Home</a>
      ${data.summary ? '<a href="#about">About</a>' : ''}
      ${data.experience.length > 0 ? '<a href="#experience">Experience</a>' : ''}
      ${data.education.length > 0 ? '<a href="#education">Education</a>' : ''}
      ${data.skills.length > 0 ? '<a href="#skills">Skills</a>' : ''}
      ${data.certifications.length > 0 ? '<a href="#certifications">Certifications</a>' : ''}
    </div>
    <button class="theme-toggle" aria-label="Toggle theme">Theme</button>
  </nav>

  <main>
    <div class="grid">
      <!-- Hero Card -->
      <div class="card featured" id="hero">
        <h1>${data.fullName}</h1>
        <h2>${data.subtitle || 'Backend Developer'}</h2>
        <div class="contact-info">
          ${data.email ? `
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span>${data.email}</span>
          </div>
          ` : ''}

          ${data.phone ? `
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <span>${data.phone}</span>
          </div>
          ` : ''}

          ${data.location ? `
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 8.88 7 11.54 7 16c0 3.31 2.69 6 6 6s6-2.69 6-6c0-4.46-1.13-7.12-5-10zM12 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
            </svg>
            <span>${data.location}</span>
          </div>
          ` : ''}
        </div>
        ${generateSocialLinks(data.social)}
      </div>

      <!-- About Card -->
      ${data.summary ? `
      <div class="card" id="about">
        <h3>About Me</h3>
        <p class="description">${data.summary}</p>
      </div>
      ` : ''}

      <!-- Experience Cards -->
      ${data.experience.length > 0 ? data.experience.map((exp, index) => `
      <div class="card experience" id="experience">
        <h3>${exp.position}</h3>
        <div class="company">${exp.company}</div>
        <div class="duration">${exp.duration}</div>
        <p class="description">${exp.description}</p>
        ${exp.highlights && exp.highlights.length > 0 ? `
        <ul class="highlights">
          ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
        ` : ''}
      </div>
      `).join('') : ''}

      <!-- Education Card -->
      ${data.education.length > 0 ? `
      <div class="card education" id="education">
        <h3>Education</h3>
        ${data.education.map(edu => `
        <div style="margin-bottom: 1.5rem;">
          <div class="company">${edu.degree} in ${edu.field}</div>
          <div class="duration">${edu.institution} • ${edu.year}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
        </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- Skills Card -->
      ${data.skills.length > 0 ? `
      <div class="card skills large" id="skills">
        <h3>Technical Skills</h3>
        ${data.skills.map(skill => `
        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 1rem; font-size: 1.1rem; opacity: 0.9;">${skill.category}</h4>
          <div>
            ${skill.items.map(item => `<span class="tag">${item}</span>`).join('')}
          </div>
        </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- Certifications Card -->
      ${data.certifications.length > 0 ? `
      <div class="card certifications" id="certifications">
        <h3>Certifications</h3>
        <ul class="cert-list">
          ${data.certifications.map(cert => `<li>${cert}</li>`).join('')}
        </ul>
      </div>
      ` : ''}
    </div>
  </main>

  <footer>
    <p>Generated at ${generatedAt}</p>
  </footer>

  <script>
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    function applyTheme(theme) {
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

      // Update CSS variables dynamically
      const root = document.documentElement;
      if (theme === 'dark') {
        root.style.setProperty('--bg', '#1a1a1a');
        root.style.setProperty('--text', '#f0f0f0');
        root.style.setProperty('--surface', '#000');
      } else {
        root.style.setProperty('--bg', '#f0f0f0');
        root.style.setProperty('--text', '#1a1a1a');
        root.style.setProperty('--surface', '#fff');
      }
    }

    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || '${theme}';
    applyTheme(savedTheme);

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
      const sections = document.querySelectorAll('.card');
      let current = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
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

    // Add water drop ripple effects on click
    document.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.style.cssText = \`
        position: fixed;
        left: \${e.clientX}px;
        top: \${e.clientY}px;
        width: 0px;
        height: 0px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(79, 172, 254, 0.3), transparent);
        transform: translate(-50%, -50%);
        transition: all 0.8s ease-out;
        z-index: 9999;
        pointer-events: none;
        box-shadow: 0 0 30px rgba(79, 172, 254, 0.5);
      \`;

      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.style.width = '150px';
        ripple.style.height = '150px';
        ripple.style.opacity = '0';
      }, 10);

      setTimeout(() => {
        document.body.removeChild(ripple);
      }, 800);
    });
  </script>
</body>
</html>`;
}

/**
 * Magazine Layout theme with overlapping panels with folded-corner shadows and depth stacking.
 */
export function magazineLayout(data: ResumeData): string {
  const theme = data.themePreferences?.prefersDark ? 'dark' : 'light';
  const accentColor = data.themePreferences?.accentColor || '#e11d48';
  const generatedAt = data.meta?.generatedAt || new Date().toISOString();

  return `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.fullName} - Portfolio</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --accent: ${accentColor};
      --bg: ${theme === 'dark' ? '#1a1a1a' : '#f8fafc'};
      --text: ${theme === 'dark' ? '#f1f5f9' : '#0f172a'};
      --surface: ${theme === 'dark' ? '#2a2a2a' : '#ffffff'};
      --shadow-light: 0 4px 12px rgba(0,0,0,0.1);
      --shadow-medium: 0 8px 25px rgba(0,0,0,0.15);
      --shadow-heavy: 0 20px 40px rgba(0,0,0,0.2);
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      overflow-x: hidden;
      position: relative;
    }

    .magazine {
      max-width: 1000px;
      margin: 0 auto;
      padding: 4rem 2rem;
      position: relative;
    }

    /* 3D Magazine Layout */
    .spread {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      margin-bottom: 4rem;
      position: relative;
      transform-style: preserve-3d;
    }

    .page {
      background: var(--surface);
      padding: 3rem;
      box-shadow: var(--shadow-heavy);
      position: relative;
      transform-style: preserve-3d;
      border-radius: 8px;
      overflow: hidden;
    }

    .page::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 30px 30px 0;
      border-color: transparent var(--accent) transparent transparent;
      transform: translateZ(10px);
    }

    .page.left {
      transform: rotateY(-2deg) translateZ(20px);
      z-index: 2;
    }

    .page.right {
      transform: rotateY(2deg) translateZ(10px);
      z-index: 1;
    }

    .page:hover {
      transform: translateZ(50px) scale(1.02);
      transition: transform 0.4s ease;
    }

    .page.left:hover {
      transform: rotateY(-1deg) translateZ(70px) scale(1.02);
    }

    .page.right:hover {
      transform: rotateY(1deg) translateZ(60px) scale(1.02);
    }

    /* Folded corner effect */
    .folded-corner {
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 50px 50px 0;
      border-color: transparent var(--accent) transparent transparent;
      opacity: 0.8;
      transform: translateZ(5px);
    }

    .folded-corner::after {
      content: '';
      position: absolute;
      top: 8px;
      right: 8px;
      width: 20px;
      height: 20px;
      background: var(--surface);
      transform: rotate(45deg);
      box-shadow: inset -2px -2px 4px rgba(0,0,0,0.1);
    }

    /* Hero spread */
    .hero-spread {
      grid-template-columns: 1fr;
      margin-bottom: 6rem;
    }

    .hero-page {
      background: linear-gradient(135deg, var(--accent), var(--accent));
      color: white;
      padding: 4rem 3rem;
      text-align: center;
      transform: rotateX(2deg) translateZ(30px);
      box-shadow: 0 30px 60px rgba(0,0,0,0.3);
    }

    .hero-page:hover {
      transform: rotateX(0deg) translateZ(80px) scale(1.05);
    }

    h1 {
      font-size: clamp(3rem, 8vw, 6rem);
      font-weight: 800;
      margin-bottom: 1rem;
      text-shadow: 0 4px 8px rgba(0,0,0,0.3);
      transform: translateZ(20px);
    }

    .subtitle {
      font-size: 1.5rem;
      opacity: 0.9;
      transform: translateZ(15px);
    }

    /* Content spreads */
    .content-spread {
      margin-bottom: 3rem;
    }

    .content-spread .page {
      padding: 2.5rem;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: var(--accent);
      border-bottom: 3px solid var(--accent);
      padding-bottom: 0.5rem;
      transform: translateZ(10px);
    }

    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 2rem;
    }

    .contact-item {
      background: rgba(0,0,0,0.05);
      padding: 1rem;
      border-radius: 8px;
      transform: translateZ(5px);
      transition: transform 0.3s ease;
    }

    .contact-item:hover {
      transform: translateZ(15px) translateY(-5px);
    }

    .experience-item, .education-item, .project-item {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: rgba(0,0,0,0.03);
      border-radius: 8px;
      transform: translateZ(5px);
      transition: transform 0.3s ease;
    }

    .experience-item:hover, .education-item:hover, .project-item:hover {
      transform: translateZ(20px) rotateX(5deg);
    }

    .company {
      font-weight: 600;
      color: var(--accent);
      margin-bottom: 0.5rem;
    }

    .duration {
      font-size: 0.9rem;
      opacity: 0.7;
      margin-bottom: 1rem;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }

    .skill-category {
      background: rgba(0,0,0,0.05);
      padding: 1.5rem;
      border-radius: 8px;
      transform: translateZ(5px);
      transition: transform 0.3s ease;
    }

    .skill-category:hover {
      transform: translateZ(20px) rotateY(5deg);
    }

    .skill-tag {
      display: inline-block;
      background: var(--accent);
      color: white;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
      margin: 0.25rem;
      transform: translateZ(3px);
      transition: transform 0.3s ease;
    }

    .skill-tag:hover {
      transform: translateZ(10px) scale(1.1);
    }

    /* Navigation */
    nav {
      position: fixed;
      top: 2rem;
      right: 2rem;
      z-index: 100;
      background: var(--surface);
      padding: 1rem 2rem;
      border-radius: 12px;
      box-shadow: var(--shadow-medium);
      transform: translateZ(40px) rotateY(5deg);
      border: 2px solid var(--accent);
    }

    nav a {
      display: block;
      color: var(--text);
      text-decoration: none;
      font-weight: 500;
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      border-radius: 6px;
      transition: all 0.3s ease;
      transform: translateZ(5px);
    }

    nav a:hover {
      background: var(--accent);
      color: white;
      transform: translateZ(15px) translateX(-5px);
    }

    nav a.active {
      background: var(--accent);
      color: white;
    }

    .theme-toggle {
      background: var(--accent);
      color: white;
      border: 2px solid var(--accent);
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-radius: 8px;
      font-weight: 500;
      margin-top: 1rem;
      transform: translateZ(5px);
      transition: all 0.3s ease;
    }

    .theme-toggle:hover {
      transform: translateZ(15px) scale(1.05);
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }

    footer {
      margin-top: 4rem;
      padding: 2rem;
      text-align: center;
      opacity: 0.7;
      transform: translateZ(10px);
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
        transform: none !important;
        animation: none !important;
      }
    }

    @media print {
      nav { display: none; }
      .page { break-inside: avoid; box-shadow: none; transform: none; }
      body { background: white; color: black; }
    }

    @media (max-width: 768px) {
      .spread {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .page.left, .page.right {
        transform: none;
      }

      .hero-spread {
        margin-bottom: 3rem;
      }

      .magazine {
        padding: 2rem 1rem;
      }
    }
  </style>
</head>
<body>
  <div class="floating-particles">
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
  </div>

  <nav>
    ${data.summary ? '<a href="#about">About</a>' : ''}
    ${data.experience.length > 0 ? '<a href="#experience">Experience</a>' : ''}
    ${data.education.length > 0 ? '<a href="#education">Education</a>' : ''}
    ${data.skills.length > 0 ? '<a href="#skills">Skills</a>' : ''}
    ${data.projects.length > 0 ? '<a href="#projects">Projects</a>' : ''}
    <button class="theme-toggle" aria-label="Toggle theme">Theme</button>
  </nav>

  <div class="magazine">
    <!-- Hero Spread -->
    <div class="spread hero-spread">
      <div class="page hero-page" id="hero">
        <div class="folded-corner"></div>
        <h1>${data.fullName}</h1>
        ${data.subtitle ? `<p class="subtitle">${data.subtitle}</p>` : ''}
      </div>
    </div>

    <!-- Contact Spread -->
    ${(data.email || data.phone || data.location || data.website || data.social.length > 0) ? `
    <div class="spread">
      <div class="page left">
        <div class="folded-corner"></div>
        <h2>Contact</h2>
        <div class="contact-grid">
          ${data.email ? `<div class="contact-item"><strong>Email:</strong><br><a href="mailto:${data.email}" style="color: var(--accent);">${data.email}</a></div>` : ''}
          ${data.phone ? `<div class="contact-item"><strong>Phone:</strong><br><a href="tel:${data.phone}" style="color: var(--accent);">${data.phone}</a></div>` : ''}
          ${data.location ? `<div class="contact-item"><strong>Location:</strong><br>${data.location}</div>` : ''}
          ${data.website ? `<div class="contact-item"><strong>Website:</strong><br><a href="${data.website}" target="_blank" style="color: var(--accent);">${data.website}</a></div>` : ''}
        </div>
        ${generateSocialLinks(data.social)}
      </div>
      <div class="page right">
        <div class="folded-corner"></div>
        <h2>About</h2>
        ${data.summary ? `<p>${data.summary}</p>` : '<p>No summary provided.</p>'}
      </div>
    </div>
    ` : ''}

    <!-- Experience Spread -->
    ${data.experience.length > 0 ? `
    <div class="spread content-spread" id="experience">
      <div class="page left">
        <div class="folded-corner"></div>
        <h2>Experience</h2>
        ${data.experience.slice(0, Math.ceil(data.experience.length / 2)).map(exp => `
        <div class="experience-item">
          <div class="company">${exp.position}</div>
          <div class="duration">${exp.company} | ${exp.duration}</div>
          <p>${exp.description}</p>
          ${exp.highlights && exp.highlights.length > 0 ? `<ul style="margin-top: 1rem;">${exp.highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
        </div>
        `).join('')}
      </div>
      <div class="page right">
        <div class="folded-corner"></div>
        <h2>Continued</h2>
        ${data.experience.slice(Math.ceil(data.experience.length / 2)).map(exp => `
        <div class="experience-item">
          <div class="company">${exp.position}</div>
          <div class="duration">${exp.company} | ${exp.duration}</div>
          <p>${exp.description}</p>
          ${exp.highlights && exp.highlights.length > 0 ? `<ul style="margin-top: 1rem;">${exp.highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
        </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <!-- Education & Skills Spread -->
    ${(data.education.length > 0 || data.skills.length > 0) ? `
    <div class="spread content-spread">
      ${data.education.length > 0 ? `
      <div class="page left" id="education">
        <div class="folded-corner"></div>
        <h2>Education</h2>
        ${data.education.map(edu => `
        <div class="education-item">
          <div class="company">${edu.degree} in ${edu.field}</div>
          <div class="duration">${edu.institution} | ${edu.year}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
        </div>
        `).join('')}
      </div>
      ` : ''}
      ${data.skills.length > 0 ? `
      <div class="page right" id="skills">
        <div class="folded-corner"></div>
        <h2>Skills</h2>
        <div class="skills-grid">
          ${data.skills.map(skill => `
          <div class="skill-category">
            <h3 style="margin-bottom: 1rem; font-size: 1.1rem;">${skill.category}</h3>
            ${skill.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
          </div>
          `).join('')}
        </div>
      </div>
      ` : ''}
    </div>
    ` : ''}

    <!-- Projects Spread -->
    ${data.projects.length > 0 ? `
    <div class="spread content-spread" id="projects">
      <div class="page left">
        <div class="folded-corner"></div>
        <h2>Projects</h2>
        ${data.projects.slice(0, Math.ceil(data.projects.length / 2)).map(proj => `
        <div class="project-item">
          <div class="company">${proj.title}</div>
          <p style="margin: 0.5rem 0;">${proj.description || ''}</p>
          <p style="font-size: 0.9rem; opacity: 0.8;">Tech: ${proj.technologies.join(', ')}</p>
          ${proj.link ? `<a href="${proj.link}" style="color: var(--accent); font-weight: bold;">View Project →</a>` : ''}
        </div>
        `).join('')}
      </div>
      <div class="page right">
        <div class="folded-corner"></div>
        <h2>More Projects</h2>
        ${data.projects.slice(Math.ceil(data.projects.length / 2)).map(proj => `
        <div class="project-item">
          <div class="company">${proj.title}</div>
          <p style="margin: 0.5rem 0;">${proj.description || ''}</p>
          <p style="font-size: 0.9rem; opacity: 0.8;">Tech: ${proj.technologies.join(', ')}</p>
          ${proj.link ? `<a href="${proj.link}" style="color: var(--accent); font-weight: bold;">View Project →</a>` : ''}
        </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <!-- Certifications -->
    ${data.certifications.length > 0 ? `
    <div class="spread content-spread">
      <div class="page left">
        <div class="folded-corner"></div>
        <h2>Certifications</h2>
        <ul style="padding-left: 1rem;">
          ${data.certifications.map(cert => `<li style="margin-bottom: 0.5rem;">${cert}</li>`).join('')}
        </ul>
      </div>
      <div class="page right">
        <div class="folded-corner"></div>
        <h2>Achievements</h2>
        <p style="text-align: center; opacity: 0.8; font-style: italic;">Professional certifications and achievements that demonstrate commitment to continuous learning and expertise in the field.</p>
      </div>
    </div>
    ` : ''}
  </div>

  <footer>
    <p>Generated at ${generatedAt}</p>
  </footer>

  <script>
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    function applyTheme(theme) {
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }

    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || '${theme}';
    applyTheme(savedTheme);

    // Smooth scroll for navigation
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  </script>
</body>
</html>`;
}

/**
 * Glassmorphism theme with stacked frosted-glass panes at differing z-depth.
 */
// export function glassmorphism(data: ResumeData): string {
//   const theme = data.themePreferences?.prefersDark ? 'dark' : 'light';
//   const accentColor = data.themePreferences?.accentColor || '#06b6d4';
//   const generatedAt = data.meta?.generatedAt || new Date().toISOString();

//   return `<!DOCTYPE html>
// <html lang="en" data-theme="${theme}">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>${data.fullName}</title>
//   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
//   <style>
//     :root {
//       --accent: ${accentColor};
//       --bg: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f7b731);
//       --text: #fff;
//       --glass-bg: rgba(255, 255, 255, 0.15);
//       --glass-border: rgba(255, 255, 255, 0.2);
//       --glass-shadow: rgba(0, 0, 0, 0.1);
//       --nav-bg: rgba(255, 255, 255, 0.2);
//       --nav-border: rgba(255, 255, 255, 0.3);
//     }

//     [data-theme="dark"] {
//       --bg: linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e, #0f0f23);
//       --text: #f1f5f9;
//       --glass-bg: rgba(30, 41, 59, 0.8);
//       --glass-border: rgba(148, 163, 184, 0.3);
//       --glass-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
//       --nav-bg: rgba(15, 23, 42, 0.9);
//       --nav-border: rgba(148, 163, 184, 0.4);
//       --accent-text: #60a5fa;
//     }

//     [data-theme="light"] {
//       --bg: linear-gradient(135deg, #fefefe, #f8fafc, #f1f5f9, #e2e8f0);
//       --text: #0f172a;
//       --glass-bg: rgba(255, 255, 255, 0.98);
//       --glass-border: rgba(148, 163, 184, 0.3);
//       --glass-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
//       --nav-bg: rgba(255, 255, 255, 0.98);
//       --nav-border: rgba(148, 163, 184, 0.2);
//       --accent-text: #2563eb;
//     }

//     /* Additional color schemes based on accent */
//     [data-theme="dark"][data-accent="blue"] {
//       --accent: #3b82f6;
//       --accent-text: #60a5fa;
//     }

//     [data-theme="dark"][data-accent="purple"] {
//       --accent: #8b5cf6;
//       --accent-text: #a78bfa;
//     }

//     [data-theme="dark"][data-accent="green"] {
//       --accent: #10b981;
//       --accent-text: #34d399;
//     }

//     [data-theme="dark"][data-accent="red"] {
//       --accent: #ef4444;
//       --accent-text: #f87171;
//     }

//     [data-theme="light"][data-accent="blue"] {
//       --accent: #2563eb;
//       --accent-text: #3b82f6;
//     }

//     [data-theme="light"][data-accent="purple"] {
//       --accent: #7c3aed;
//       --accent-text: #8b5cf6;
//     }

//     [data-theme="light"][data-accent="green"] {
//       --accent: #059669;
//       --accent-text: #10b981;
//     }

//     [data-theme="light"][data-accent="red"] {
//       --accent: #dc2626;
//       --accent-text: #ef4444;
//     }

//     * { margin: 0; padding: 0; box-sizing: border-box; }
//     body {
//       font-family: 'Segoe UI', Tahoma, sans-serif;
//       background: var(--bg);
//       background-size: 400% 400%;
//       animation: gradient 15s ease infinite;
//       min-height: 100vh;
//       padding: 2rem;
//       color: var(--text);
//       overflow-x: hidden;
//       position: relative;
//       perspective: 1200px;
//     }
//     @keyframes gradient {
//       0% { background-position: 0% 50%; }
//       50% { background-position: 100% 50%; }
//       100% { background-position: 0% 50%; }
//     }

//     /* Animated 3D Background Elements */
//     body::before {
//       content: '';
//       position: fixed;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       background:
//         radial-gradient(circle at 20% 30%, rgba(79, 172, 254, 0.1) 0%, transparent 50%),
//         radial-gradient(circle at 80% 70%, rgba(0, 242, 254, 0.08) 0%, transparent 50%),
//         radial-gradient(circle at 40% 80%, rgba(67, 233, 123, 0.06) 0%, transparent 50%);
//       transform: translateZ(-200px) scale(1.2);
//       z-index: -2;
//       animation: backgroundFloat 20s ease-in-out infinite;
//     }

//     body::after {
//       content: '';
//       position: fixed;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       background: linear-gradient(45deg, transparent 30%, rgba(79, 172, 254, 0.05) 50%, transparent 70%);
//       transform: translateZ(-150px) rotate(45deg);
//       animation: backgroundRipple 25s linear infinite;
//       z-index: -1;
//     }

//     @keyframes backgroundFloat {
//       0%, 100% { transform: translateZ(-200px) scale(1.2) rotate(0deg); }
//       50% { transform: translateZ(-180px) scale(1.3) rotate(2deg); }
//     }

//     @keyframes backgroundRipple {
//       0%, 100% { transform: translateZ(-150px) rotate(45deg) scale(1); }
//       50% { transform: translateZ(-130px) rotate(47deg) scale(1.1); }
//     }

//     /* Floating 3D Particles */
//     .floating-particles {
//       position: fixed;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       pointer-events: none;
//       z-index: -1;
//     }

//     .particle {
//       position: absolute;
//       background: var(--accent);
//       border-radius: 50%;
//       animation: particleFloat 8s ease-in-out infinite;
//       opacity: 0.1;
//     }

//     .particle:nth-child(1) {
//       width: 6px; height: 6px; top: 15%; left: 20%;
//       animation-delay: 0s; transform: translateZ(-30px);
//     }

//     .particle:nth-child(2) {
//       width: 4px; height: 4px; top: 25%; right: 25%;
//       animation-delay: 2s; transform: translateZ(-20px);
//     }

//     .particle:nth-child(3) {
//       width: 8px; height: 8px; bottom: 30%; left: 15%;
//       animation-delay: 4s; transform: translateZ(-40px);
//     }

//     .particle:nth-child(4) {
//       width: 5px; height: 5px; top: 40%; right: 10%;
//       animation-delay: 6s; transform: translateZ(-25px);
//     }

//     .particle:nth-child(5) {
//       width: 7px; height: 7px; bottom: 15%; right: 20%;
//       animation-delay: 1s; transform: translateZ(-35px);
//     }

//     .particle:nth-child(6) {
//       width: 3px; height: 3px; top: 60%; left: 30%;
//       animation-delay: 3s; transform: translateZ(-15px);
//     }

//     .particle:nth-child(7) {
//       width: 9px; height: 9px; top: 70%; right: 30%;
//       animation-delay: 5s; transform: translateZ(-45px);
//     }

//     .particle:nth-child(8) {
//       width: 4px; height: 4px; bottom: 40%; left: 40%;
//       animation-delay: 7s; transform: translateZ(-20px);
//     }

//     @keyframes particleFloat {
//       0%, 100% {
//         transform: translateZ(-30px) translateY(0px) rotate(0deg) scale(1);
//         opacity: 0.1;
//       }
//       50% {
//         transform: translateZ(-30px) translateY(-20px) rotate(180deg) scale(1.2);
//         opacity: 0.3;
//       }
//     }
//     .container {
//       max-width: 1200px;
//       margin: 0 auto;
//     }
//     .glass {
//       background: var(--glass-bg);
//       backdrop-filter: blur(10px);
//       border-radius: 20px;
//       border: 1px solid var(--glass-border);
//       padding: 2rem;
//       margin-bottom: 2rem;
//       box-shadow: 0 8px 32px var(--glass-shadow);
//       transform: translateZ(0) rotateX(0deg) rotateY(0deg);
//       transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//       transform-style: preserve-3d;
//       position: relative;
//       overflow: hidden;
//     }

//     .glass::before {
//       content: '';
//       position: absolute;
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
//       transform: translateZ(-1px);
//       opacity: 0;
//       transition: opacity 0.3s ease;
//       border-radius: 20px;
//     }

//     .glass:nth-child(odd) {
//       transform: translateZ(10px) rotateX(1deg);
//       animation: glassFloat 6s ease-in-out infinite;
//     }

//     .glass:nth-child(even) {
//       transform: translateZ(20px) rotateX(-1deg);
//       animation: glassFloat 8s ease-in-out infinite reverse;
//     }

//     .glass:hover {
//       transform: translateZ(50px) rotateX(5deg) rotateY(5deg) scale(1.02);
//       box-shadow: 0 25px 50px var(--glass-shadow), 0 0 30px rgba(79, 172, 254, 0.2);
//     }

//     .glass:hover::before {
//       opacity: 1;
//     }

//     @keyframes glassFloat {
//       0%, 100% {
//         transform: translateZ(10px) rotateX(1deg) translateY(0px);
//       }
//       50% {
//         transform: translateZ(15px) rotateX(2deg) translateY(-5px);
//       }
//     }
//     h1 {
//       font-size: clamp(3rem, 8vw, 6rem);
//       font-weight: 800;
//       color: var(--text);
//       text-shadow: 0 4px 8px rgba(0,0,0,0.3);
//       margin-bottom: 1.5rem;
//       line-height: 1.1;
//       letter-spacing: -0.02em;
//       word-wrap: break-word;
//       hyphens: auto;
//       text-align: center;
//       background: linear-gradient(135deg, var(--accent), var(--accent-text, var(--accent)));
//       -webkit-background-clip: text;
//       -webkit-text-fill-color: transparent;
//       background-clip: text;
//       transform: translateZ(30px) rotateX(-2deg);
//       animation: titleGlow 4s ease-in-out infinite alternate;
//       transition: transform 0.5s ease;
//     }

//     h1:hover {
//       transform: translateZ(50px) rotateX(0deg) rotateY(5deg) scale(1.05);
//       animation-play-state: paused;
//     }

//     @keyframes titleGlow {
//       0%, 100% {
//         text-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 20px var(--accent);
//         transform: translateZ(30px) rotateX(-2deg) translateY(0px);
//       }
//       50% {
//         text-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 30px var(--accent), 0 0 40px var(--accent);
//         transform: translateZ(35px) rotateX(-1deg) translateY(-3px);
//       }
//     }
//     h2 {
//       color: var(--text);
//       margin-bottom: 1rem;
//     }
//     .content { color: var(--text); line-height: 1.6; }
//     .skill-pill {
//       display: inline-block;
//       background: var(--glass-bg);
//       backdrop-filter: blur(5px);
//       padding: 0.5rem 1rem;
//       border-radius: 25px;
//       margin: 0.5rem;
//       color: var(--text);
//       border: 1px solid var(--glass-border);
//     }
//     nav {
//       position: fixed;
//       top: 2rem;
//       left: 50%;
//       transform: translateX(-50%);
//       z-index: 100;
//       background: var(--nav-bg);
//       backdrop-filter: blur(10px);
//       padding: 1rem 2rem;
//       border-radius: 25px;
//       border: 1px solid var(--nav-border);
//       display: flex;
//       align-items: center;
//       gap: 2rem;
//       box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//     }
//     nav a {
//       color: var(--text);
//       text-decoration: none;
//       font-weight: 500;
//       transition: all 0.3s ease;
//       padding: 0.5rem 1rem;
//       border-radius: 8px;
//       position: relative;
//     }
//     nav a:hover {
//       background: rgba(255, 255, 255, 0.1);
//       transform: translateY(-2px);
//     }
//     nav a.active {
//       background: var(--accent);
//       color: white;
//       box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
//     }
//     .theme-toggle {
//       background: var(--nav-bg);
//       backdrop-filter: blur(10px);
//       border: 1px solid var(--nav-border);
//       padding: 0.75rem;
//       cursor: pointer;
//       color: var(--text);
//       border-radius: 50%;
//       font-size: 1.2rem;
//       width: 50px;
//       height: 50px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       transition: all 0.3s ease;
//       box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
//     }
//     .theme-toggle:hover {
//       transform: scale(1.1);
//       box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
//     }
//     @media (prefers-reduced-motion: reduce) { body { animation: none; } .glass { transition: none; transform: none !important; } }
//     @media print { nav { display: none; } .glass { break-inside: avoid; background: #fff; color: #000; } }
//   </style>
// </head>
// <body>
//   <div class="floating-particles">
//     <div class="particle"></div>
//     <div class="particle"></div>
//     <div class="particle"></div>
//     <div class="particle"></div>
//     <div class="particle"></div>
//     <div class="particle"></div>
//     <div class="particle"></div>
//     <div class="particle"></div>
//   </div>

//   <nav>
//     ${data.summary ? '<a href="#about">About</a>' : ''}
//     ${data.experience.length > 0 ? '<a href="#experience">Experience</a>' : ''}
//     ${data.education.length > 0 ? '<a href="#education">Education</a>' : ''}
//     ${data.skills.length > 0 ? '<a href="#skills">Skills</a>' : ''}
//     ${data.projects.length > 0 ? '<a href="#projects">Projects</a>' : ''}
//     ${data.certifications.length > 0 ? '<a href="#certifications">Certifications</a>' : ''}
//   </nav>

//   <button class="theme-toggle" aria-label="Toggle theme" style="position: fixed; top: 2rem; right: 2rem; z-index: 101;">🌙</button>

//   <div class="container">
//   <div class="glass" id="hero">
//     <div style="text-align: center; padding: 2rem 0;">
//       <h1 style="margin: 0 auto; max-width: 100%;">${data.fullName}</h1>
//       ${data.subtitle ? `<p class="content" style="font-size: 1.3rem; margin-top: 1rem; opacity: 0.9;">${data.subtitle}</p>` : ''}
//     </div>

//     <!-- Contact Information -->
//     ${(data.email || data.phone || data.location || data.website || data.social.length > 0) ? `
//     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.2);">
//       ${data.email ? `
//       <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: rgba(255, 255, 255, 0.1); border-radius: 12px; backdrop-filter: blur(5px); transform: translateZ(5px); transition: transform 0.3s ease;">
//         <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px; opacity: 0.8;">
//           <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
//         </svg>
//         <div>
//           <div style="font-size: 0.9rem; opacity: 0.7; margin-bottom: 0.25rem;">Email</div>
//           <a href="mailto:${data.email}" style="color: var(--accent); text-decoration: none; font-weight: 500;">${data.email}</a>
//         </div>
//       </div>
//       ` : ''}

//       ${data.phone ? `
//       <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: rgba(255, 255, 255, 0.1); border-radius: 12px; backdrop-filter: blur(5px); transform: translateZ(5px); transition: transform 0.3s ease;">
//         <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px; opacity: 0.8;">
//           <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
//         </svg>
//         <div>
//           <div style="font-size: 0.9rem; opacity: 0.7; margin-bottom: 0.25rem;">Phone</div>
//           <a href="tel:${data.phone}" style="color: var(--accent); text-decoration: none; font-weight: 500;">${data.phone}</a>
//         </div>
//       </div>
//       ` : ''}

//       ${data.location ? `
//       <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: rgba(255, 255, 255, 0.1); border-radius: 12px; backdrop-filter: blur(5px); transform: translateZ(5px); transition: transform 0.3s ease;">
//         <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px; opacity: 0.8;">
//           <path d="M12 2C8.13 8.88 7 11.54 7 16c0 3.31 2.69 6 6 6s6-2.69 6-6c0-4.46-1.13-7.12-5-10zM12 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
//         </svg>
//         <div>
//           <div style="font-size: 0.9rem; opacity: 0.7; margin-bottom: 0.25rem;">Location</div>
//           <span style="color: var(--text); font-weight: 500;">${data.location}</span>
//         </div>
//       </div>
//       ` : ''}

//       ${data.website ? `
//       <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: rgba(255, 255, 255, 0.1); border-radius: 12px; backdrop-filter: blur(5px); transform: translateZ(5px); transition: transform 0.3s ease;">
//         <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px; opacity: 0.8;">
//           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
//         </svg>
//         <div>
//           <div style="font-size: 0.9rem; opacity: 0.7; margin-bottom: 0.25rem;">Website</div>
//           <a href="${data.website}" target="_blank" style="color: var(--accent); text-decoration: none; font-weight: 500;">${data.website}</a>
//         </div>
//       </div>
//       ` : ''}
//     </div>

//     ${generateSocialLinks(data.social)}
//     ` : ''}
//   </div>

//   ${data.summary ? `
//   <div class="glass" id="about">
//     <h2>About</h2>
//     <p class="content">${data.summary}</p>
//   </div>
//   ` : ''}

//   ${data.experience.length > 0 ? data.experience.map(exp => `
//   <div class="glass" id="experience">
//     <h2>${exp.position}</h2>
//     <p class="content">${exp.company} | ${exp.duration}</p>
//     <p class="content" style="margin-top: 1rem;">${exp.description}</p>
//   </div>
//   `).join('') : ''}

//   ${data.education.length > 0 ? data.education.map(edu => `
//   <div class="glass" id="education">
//     <h2>${edu.degree} in ${edu.field}</h2>
//     <p class="content">${edu.institution} | ${edu.year}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
//   </div>
//   `).join('') : ''}

//   ${data.skills.length > 0 ? `
//   <div class="glass" id="skills">
//     <h2>Skills</h2>
//     ${data.skills.map(s => s.items.map(item => `<span class="skill-pill">${item}</span>`).join('')).join('')}
//   </div>
//   ` : ''}

//   ${data.projects.length > 0 ? data.projects.map(proj => `
//   <div class="glass" id="projects">
//     <h2>${proj.title}</h2>
//     <p class="content">${proj.description || ''}</p>
//     ${proj.technologies.length > 0 ? `<p class="content" style="margin-top: 1rem;">Technologies: ${proj.technologies.join(', ')}</p>` : ''}
//     ${proj.link ? `<a href="${proj.link}" style="color: var(--accent); margin-top: 1rem; display: block;">View Project</a>` : ''}
//   </div>
//   `).join('') : ''}

//   ${data.certifications.length > 0 ? `
//   <div class="glass" id="certifications">
//     <h2>Certifications</h2>
//     <ul class="content">${data.certifications.map(cert => `<li>${cert}</li>`).join('')}</ul>
//   </div>
//   ` : ''}
//   </div>

// <footer style="margin-top: 4rem; padding: 2rem; text-align: center; opacity: 0.7;">
//   <p>Generated at ${generatedAt}</p>
// </footer>

// <script>
//   // Theme toggle functionality
//   const themeToggle = document.querySelector('.theme-toggle');
//   const html = document.documentElement;

//   function applyTheme(theme) {
//     html.setAttribute('data-theme', theme);
//     localStorage.setItem('theme', theme);
//     // Update theme toggle icon
//     themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
//   }

//   themeToggle.addEventListener('click', () => {
//     const current = html.getAttribute('data-theme');
//     const newTheme = current === 'dark' ? 'light' : 'dark';
//     applyTheme(newTheme);
//   });

//   // Initialize theme
//   const savedTheme = localStorage.getItem('theme') || '${theme}';
//   applyTheme(savedTheme);

//   // Smooth scroll and active link highlighting
//   document.querySelectorAll('nav a').forEach(link => {
//     link.addEventListener('click', function(e) {
//       e.preventDefault();
//       const targetId = this.getAttribute('href').substring(1);
//       const target = document.getElementById(targetId);
//       if (target) {
//         target.scrollIntoView({ behavior: 'smooth' });
//         setTimeout(updateActiveLink, 100);
//       }
//     });
//   });

//   function updateActiveLink() {
//     const sections = document.querySelectorAll('.glass');
//     let current = '';

//     sections.forEach(section => {
//       const sectionTop = section.offsetTop;
//       const sectionHeight = section.clientHeight;
//       if (scrollY >= sectionTop - 200) {
//         current = section.getAttribute('id');
//       }
//     });

//     document.querySelectorAll('nav a').forEach(link => {
//       link.classList.remove('active');
//       if (link.getAttribute('href') === '#' + current) {
//         link.classList.add('active');
//       }
//     });
//   }

//   window.addEventListener('scroll', updateActiveLink);

//   // Mouse parallax effects for 3D elements
//   let mouseX = 0.5, mouseY = 0.5;

//   document.addEventListener('mousemove', (e) => {
//     mouseX = e.clientX / window.innerWidth;
//     mouseY = e.clientY / window.innerHeight;

//     // Parallax particles
//     const particles = document.querySelectorAll('.particle');
//     particles.forEach((particle, index) => {
//       const speed = (index + 1) * 0.5;
//       const x = (mouseX - 0.5) * speed * 30;
//       const y = (mouseY - 0.5) * speed * 30;
//       const zDepth = 20 + index * 10;
//       particle.style.transform = 'translateZ(-' + zDepth + 'px) translate(' + x + 'px, ' + y + 'px)';
//     });
//   });

//   // Scroll-based 3D effects
//   window.addEventListener('scroll', () => {
//     const scrolled = window.scrollY;
//     const rate = scrolled * -0.5;

//     // Glass elements scroll effect
//     const glassElements = document.querySelectorAll('.glass');
//     glassElements.forEach((glass, index) => {
//       const speed = (index + 1) * 0.1;
//       const yOffset = rate * speed;
//       const baseTransform = glass.style.transform || '';
//       glass.style.transform = baseTransform.replace(/translateY\([^)]*\)/, '') + ' translateY(' + yOffset + 'px)';
//     });
//   });

//   // Add click ripple effects
//   document.addEventListener('click', (e) => {
//     const ripple = document.createElement('div');
//     ripple.style.cssText = 'position: fixed; left: ' + e.clientX + 'px; top: ' + e.clientY + 'px; width: 0px; height: 0px; border-radius: 50%; background: radial-gradient(circle, rgba(79, 172, 254, 0.3), transparent); transform: translate(-50%, -50%); transition: all 0.8s ease-out; z-index: 9999; pointer-events: none; box-shadow: 0 0 30px rgba(79, 172, 254, 0.5);';

//     document.body.appendChild(ripple);

//     setTimeout(() => {
//       ripple.style.width = '150px';
//       ripple.style.height = '150px';
//       ripple.style.opacity = '0';
//     }, 10);

//     setTimeout(() => {
//       document.body.removeChild(ripple);
//     }, 800);
//   });
// </script>
// </body>
// </html>`;
// }
export function glassmorphism(data: ResumeData): string {
  const theme = data.themePreferences?.prefersDark ? 'dark' : 'light';
  const accentColor = data.themePreferences?.accentColor || '#06b6d4';
  const generatedAt = data.meta?.generatedAt || new Date().toISOString();

  // Helper function to generate social links
  const generateSocialLinks = (social: any[]) => {
    if (!social || social.length === 0) return '';

    const socialIcons: { [key: string]: string } = {
      linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`,
      github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>`,
      twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>`,
      website: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2 0-.68.06-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.923 7.923 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8.008 8.008 0 0 1 5.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.65 15.65 0 0 0-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z"/></svg>`
    };

    return `
    <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.2);">
      ${social.map(s => `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" 
           style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(5px); border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.2); color: var(--text); text-decoration: none; transition: all 0.3s ease; transform: translateZ(10px);"
           onmouseover="this.style.transform='translateZ(20px) scale(1.1)'; this.style.background='var(--accent)'; this.style.borderColor='var(--accent)';"
           onmouseout="this.style.transform='translateZ(10px) scale(1)'; this.style.background='rgba(255, 255, 255, 0.1)'; this.style.borderColor='rgba(255, 255, 255, 0.2)';">
          <div style="width: 20px; height: 20px;">
            ${socialIcons[s.platform.toLowerCase()] || socialIcons.website}
          </div>
        </a>
      `).join('')}
    </div>
    `;
  };

  return `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.fullName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --accent: ${accentColor};
      --bg: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f7b731);
      --text: #fff;
      --glass-bg: rgba(255, 255, 255, 0.15);
      --glass-border: rgba(255, 255, 255, 0.2);
      --glass-shadow: rgba(0, 0, 0, 0.1);
      --nav-bg: rgba(255, 255, 255, 0.2);
      --nav-border: rgba(255, 255, 255, 0.3);
    }

    [data-theme="dark"] {
      --bg: linear-gradient(135deg, #000000, #1a1a1a, #2d2d2d, #000000);
      --text: #ffffff;
      --glass-bg: rgba(20, 20, 20, 0.9);
      --glass-border: rgba(100, 100, 100, 0.5);
      --glass-shadow: 0 25px 50px rgba(0, 0, 0, 0.8);
      --nav-bg: rgba(10, 10, 10, 0.95);
      --nav-border: rgba(100, 100, 100, 0.6);
      --accent-text: #60a5fa;
    }

    [data-theme="light"] {
      --bg: linear-gradient(135deg, #fefefe, #f8fafc, #f1f5f9, #e2e8f0);
      --text: #0f172a;
      --glass-bg: rgba(255, 255, 255, 0.98);
      --glass-border: rgba(148, 163, 184, 0.3);
      --glass-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
      --nav-bg: rgba(255, 255, 255, 0.98);
      --nav-border: rgba(148, 163, 184, 0.2);
      --accent-text: #2563eb;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', 'Segoe UI', Tahoma, sans-serif;
      background: var(--bg);
      background-size: 400% 400%;
      animation: gradient 15s ease infinite;
      min-height: 100vh;
      padding: 2rem;
      color: var(--text);
      overflow-x: hidden;
      position: relative;
      perspective: 1200px;
    }
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* Animated 3D Background Elements */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background:
        radial-gradient(circle at 20% 30%, rgba(79, 172, 254, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(0, 242, 254, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(67, 233, 123, 0.06) 0%, transparent 50%);
      transform: translateZ(-200px) scale(1.2);
      z-index: -2;
      animation: backgroundFloat 20s ease-in-out infinite;
    }

    @keyframes backgroundFloat {
      0%, 100% { transform: translateZ(-200px) scale(1.2) rotate(0deg); }
      50% { transform: translateZ(-180px) scale(1.3) rotate(2deg); }
    }

    /* Floating 3D Particles */
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
      background: var(--accent);
      border-radius: 50%;
      animation: particleFloat 8s ease-in-out infinite;
      opacity: 0.1;
    }

    .particle:nth-child(1) { width: 6px; height: 6px; top: 15%; left: 20%; animation-delay: 0s; }
    .particle:nth-child(2) { width: 4px; height: 4px; top: 25%; right: 25%; animation-delay: 2s; }
    .particle:nth-child(3) { width: 8px; height: 8px; bottom: 30%; left: 15%; animation-delay: 4s; }
    .particle:nth-child(4) { width: 5px; height: 5px; top: 40%; right: 10%; animation-delay: 6s; }
    .particle:nth-child(5) { width: 7px; height: 7px; bottom: 15%; right: 20%; animation-delay: 1s; }

    @keyframes particleFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
      50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding-top: 5rem;
    }

    .glass {
      background: var(--glass-bg);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      border: 1px solid var(--glass-border);
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 8px 32px var(--glass-shadow);
      transition: all 0.4s ease;
    }

    .glass:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px var(--glass-shadow);
    }

    h1 {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 800;
      color: var(--text);
      text-shadow: 0 4px 8px rgba(0,0,0,0.3);
      margin-bottom: 1rem;
      line-height: 1.1;
      letter-spacing: -0.02em;
      text-align: center;
      background: linear-gradient(135deg, var(--accent), var(--accent-text, var(--accent)));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    h2 {
      color: var(--text);
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .content { 
      color: var(--text); 
      line-height: 1.6; 
    }

    .skill-pill {
      display: inline-block;
      background: var(--glass-bg);
      backdrop-filter: blur(5px);
      padding: 0.5rem 1rem;
      border-radius: 25px;
      margin: 0.5rem;
      color: var(--text);
      border: 1px solid var(--glass-border);
      transition: all 0.3s ease;
    }

    .skill-pill:hover {
      background: var(--accent);
      color: white;
      transform: translateY(-2px);
    }

    nav {
      position: fixed;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
      background: var(--nav-bg);
      backdrop-filter: blur(10px);
      padding: 1rem 2rem;
      border-radius: 25px;
      border: 1px solid var(--nav-border);
      display: flex;
      align-items: center;
      gap: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    nav a {
      color: var(--text);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      padding: 0.5rem 1rem;
      border-radius: 8px;
    }

    nav a:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }

    nav a.active {
      background: var(--accent);
      color: white;
    }

    .theme-toggle {
      position: fixed;
      top: 2rem;
      right: 2rem;
      z-index: 101;
      background: var(--nav-bg);
      backdrop-filter: blur(10px);
      border: 1px solid var(--nav-border);
      padding: 0.75rem;
      cursor: pointer;
      color: var(--text);
      border-radius: 50%;
      font-size: 1.2rem;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .theme-toggle:hover {
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      nav {
        flex-wrap: wrap;
        gap: 0.5rem;
        padding: 1rem;
      }
      
      .container {
        padding-top: 8rem;
      }
    }

    @media (prefers-reduced-motion: reduce) { 
      * { animation: none !important; transition: none !important; } 
    }
  </style>
</head>
<body>
  <div class="floating-particles">
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
  </div>

  <nav>
    ${data.summary ? '<a href="#about">About</a>' : ''}
    ${data.experience.length > 0 ? '<a href="#experience">Experience</a>' : ''}
    ${data.education.length > 0 ? '<a href="#education">Education</a>' : ''}
    ${data.skills.length > 0 ? '<a href="#skills">Skills</a>' : ''}
    ${data.projects.length > 0 ? '<a href="#projects">Projects</a>' : ''}
    ${data.certifications.length > 0 ? '<a href="#certifications">Certifications</a>' : ''}
  </nav>

  <button class="theme-toggle" aria-label="Toggle theme">🌙</button>

  <div class="container">
    <div class="glass" id="hero">
      <div style="text-align: center; padding: 2rem 0;">
        <h1>${data.fullName}</h1>
        ${data.subtitle ? `<p class="content" style="font-size: 1.3rem; margin-top: 1rem; opacity: 0.9;">${data.subtitle}</p>` : ''}
      </div>

      ${(data.email || data.phone || data.location) ? `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--glass-border);">
        ${data.email ? `
        <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: rgba(255, 255, 255, 0.1); border-radius: 12px; backdrop-filter: blur(5px);">
          <svg viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px; opacity: 0.8; flex-shrink: 0;">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          <div style="min-width: 0;">
            <div style="font-size: 0.85rem; opacity: 0.7; margin-bottom: 0.25rem;">Email</div>
            <a href="mailto:${data.email}" style="color: var(--accent); text-decoration: none; font-weight: 500; word-break: break-all;">${data.email}</a>
          </div>
        </div>
        ` : ''}

        ${data.phone ? `
        <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: rgba(255, 255, 255, 0.1); border-radius: 12px; backdrop-filter: blur(5px);">
          <svg viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px; opacity: 0.8; flex-shrink: 0;">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          <div style="min-width: 0;">
            <div style="font-size: 0.85rem; opacity: 0.7; margin-bottom: 0.25rem;">Phone</div>
            <a href="tel:${data.phone}" style="color: var(--accent); text-decoration: none; font-weight: 500;">${data.phone}</a>
          </div>
        </div>
        ` : ''}

        ${data.location ? `
        <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: rgba(255, 255, 255, 0.1); border-radius: 12px; backdrop-filter: blur(5px);">
          <svg viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px; opacity: 0.8; flex-shrink: 0;">
            <path d="M12 2C8.13 8.88 7 11.54 7 16c0 3.31 2.69 6 6 6s6-2.69 6-6c0-4.46-1.13-7.12-5-10zM12 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
          </svg>
          <div style="min-width: 0;">
            <div style="font-size: 0.85rem; opacity: 0.7; margin-bottom: 0.25rem;">Location</div>
            <span style="color: var(--text); font-weight: 500;">${data.location}</span>
          </div>
        </div>
        ` : ''}
      </div>
      ` : ''}

      ${generateSocialLinks(data.social)}
    </div>

    ${data.summary ? `
    <div class="glass" id="about">
      <h2>About</h2>
      <p class="content">${data.summary}</p>
    </div>
    ` : ''}

    ${data.experience.length > 0 ? `
    <div id="experience">
      <h2 style="text-align: center; font-size: 2rem; margin-bottom: 2rem;">Experience</h2>
      ${data.experience.map(exp => `
      <div class="glass">
        <h2>${exp.position}</h2>
        <p class="content" style="color: var(--accent); font-weight: 600;">${exp.company}</p>
        <p class="content" style="opacity: 0.8; margin-bottom: 1rem;">${exp.duration}</p>
        <p class="content" style="margin-bottom: 1rem;">${exp.description}</p>
        ${exp.highlights && exp.highlights.length > 0 ? `
        <ul style="padding-left: 1.5rem; margin-top: 1rem;">
          ${exp.highlights.map(h => `<li class="content" style="margin-bottom: 0.5rem;">${h}</li>`).join('')}
        </ul>
        ` : ''}
      </div>
      `).join('')}
    </div>
    ` : ''}

    ${data.education.length > 0 ? `
    <div id="education">
      <h2 style="text-align: center; font-size: 2rem; margin-bottom: 2rem;">Education</h2>
      ${data.education.map(edu => `
      <div class="glass">
        <h2>${edu.degree} in ${edu.field}</h2>
        <p class="content" style="color: var(--accent); font-weight: 600;">${edu.institution}</p>
        <p class="content" style="opacity: 0.8;">${edu.year}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
      </div>
      `).join('')}
    </div>
    ` : ''}

    ${data.skills.length > 0 ? `
    <div class="glass" id="skills">
      <h2 style="font-size: 2rem; text-align: center; margin-bottom: 2rem;">Skills</h2>
      ${data.skills.map(skillCat => `
        <div style="margin-bottom: 2rem;">
          <h3 style="margin-bottom: 1rem; color: var(--accent);">${skillCat.category}</h3>
          <div>
            ${skillCat.items.map(item => `<span class="skill-pill">${item}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${data.projects.length > 0 ? `
    <div id="projects">
      <h2 style="text-align: center; font-size: 2rem; margin-bottom: 2rem;">Projects</h2>
      ${data.projects.map(proj => `
      <div class="glass">
        <h2>${proj.title}</h2>
        <p class="content" style="margin-bottom: 1rem;">${proj.description || ''}</p>
        ${proj.technologies.length > 0 ? `
        <div style="margin-top: 1rem;">
          ${proj.technologies.map(tech => `<span class="skill-pill">${tech}</span>`).join('')}
        </div>
        ` : ''}
        ${proj.link ? `<a href="${proj.link}" target="_blank" style="color: var(--accent); margin-top: 1rem; display: inline-block; text-decoration: none; font-weight: 500;">View Project →</a>` : ''}
      </div>
      `).join('')}
    </div>
    ` : ''}

    ${data.certifications.length > 0 ? `
    <div class="glass" id="certifications">
      <h2 style="font-size: 2rem; text-align: center; margin-bottom: 2rem;">Certifications</h2>
      <ul style="padding-left: 1.5rem;">
        ${data.certifications.map(cert => `<li class="content" style="margin-bottom: 1rem;">${cert}</li>`).join('')}
      </ul>
    </div>
    ` : ''}
  </div>

  <footer style="margin-top: 4rem; padding: 2rem; text-align: center; opacity: 0.7;">
    <p>Generated at ${new Date(generatedAt).toLocaleDateString()}</p>
  </footer>

  <script>
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    function applyTheme(theme) {
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || '${theme}';
    applyTheme(savedTheme);

    // Smooth scroll and active link highlighting
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(updateActiveLink, 100);
        }
      });
    });

    function updateActiveLink() {
      const sections = document.querySelectorAll('[id]');
      let current = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
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
    updateActiveLink();
  </script>
</body>
</html>`;
}
/**
* Newspaper Victorian theme with embossed paper layers with drop-shadows and tiny perspective skew.
*/
export function newspaperVictorian(data: ResumeData): string {
  const theme = data.themePreferences?.prefersDark ? 'dark' : 'light';
  const accentColor = data.themePreferences?.accentColor || '#8b4513';
  const generatedAt = data.meta?.generatedAt || new Date().toISOString();

  return `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The ${data.fullName} Times</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --accent: ${accentColor};
    --bg: #f5f5dc;
    --text: #2c1810;
    --paper: #fff;
  }
  [data-theme="dark"] {
    --bg: #2c1810;
    --text: #f5f5dc;
    --paper: #3d2518;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Times New Roman', serif;
    background: var(--bg);
    color: var(--text);
    padding: 2rem;
    background-image: radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.1) 0%, transparent 50%);
  }
  .paper {
    max-width: 900px;
    margin: 0 auto;
    background: var(--paper);
    padding: 3rem;
    box-shadow: 0 0 30px rgba(0,0,0,0.3), 0 10px 30px rgba(139, 69, 19, 0.2);
    border: 2px solid var(--accent);
    position: relative;
    transform: rotate(-0.5deg);
    transform-style: preserve-3d;
  }
  .paper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(139, 69, 19, 0.05) 50%, transparent 70%);
    pointer-events: none;
    z-index: 1;
  }
  .masthead {
    text-align: center;
    border-top: 4px double var(--accent);
    border-bottom: 4px double var(--accent);
    padding: 1.5rem 0;
    margin-bottom: 2rem;
    position: relative;
    z-index: 2;
    transform: translateZ(5px);
  }
  .masthead h1 {
    font-size: 3.5rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    font-style: italic;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    color: var(--accent);
  }
  .date {
    font-size: 0.9rem;
    margin-top: 0.5rem;
    font-style: italic;
    opacity: 0.8;
  }
  .columns {
    column-count: 2;
    column-gap: 2rem;
    column-rule: 1px solid var(--accent);
    position: relative;
    z-index: 2;
  }
  .article {
    break-inside: avoid;
    margin-bottom: 2rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(139, 69, 19, 0.2);
    transform: rotate(0.2deg);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }
  .article:hover { transform: rotate(0deg) translateZ(10px); }
  .headline {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    border-bottom: 2px solid var(--accent);
    padding-bottom: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .byline {
    font-size: 0.85rem;
    font-style: italic;
    margin-bottom: 1rem;
    color: var(--accent);
    opacity: 0.8;
  }
  .tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    position: relative;
    z-index: 2;
    transform: translateZ(10px);
  }
  .tab {
    background: var(--paper);
    border: 1px solid var(--accent);
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    cursor: pointer;
    transform: perspective(200px) rotateX(10deg);
    transition: transform 0.3s ease;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  .tab:hover { transform: perspective(200px) rotateX(0deg) translateY(-5px); }
  .tab.active { background: var(--accent); color: var(--paper); }
  .theme-toggle { position: fixed; top: 2rem; right: 2rem; z-index: 100; background: var(--accent); color: var(--paper); border: 1px solid var(--accent); padding: 0.5rem; cursor: pointer; font-weight: bold; transform: perspective(200px) rotateX(10deg); transition: transform 0.3s ease; }
  .theme-toggle:hover { transform: perspective(200px) rotateX(0deg) translateY(-5px); }
  @media (prefers-reduced-motion: reduce) { * { transition: none; transform: none !important; } }
  @media print { .theme-toggle, .tabs { display: none; } .article { break-inside: avoid; } }
</style>
</head>
<body>
<button class="theme-toggle" aria-label="Toggle theme">Theme</button>

<div class="paper">
  <div class="masthead">
    <h1>THE ${data.fullName.toUpperCase()} TIMES</h1>
    <div class="date">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
  </div>

  <div class="tabs">
    <div class="tab active" onclick="showSection('all')">All</div>
    ${data.summary ? '<div class="tab" onclick="showSection(\'summary\')">About</div>' : ''}
    ${data.experience.length > 0 ? '<div class="tab" onclick="showSection(\'experience\')">Experience</div>' : ''}
    ${data.education.length > 0 ? '<div class="tab" onclick="showSection(\'education\')">Education</div>' : ''}
    ${data.skills.length > 0 ? '<div class="tab" onclick="showSection(\'skills\')">Skills</div>' : ''}
    ${data.projects.length > 0 ? '<div class="tab" onclick="showSection(\'projects\')">Projects</div>' : ''}
    ${data.certifications.length > 0 ? '<div class="tab" onclick="showSection(\'certifications\')">Certifications</div>' : ''}
  </div>

  <div class="columns">
    ${(data.email || data.phone || data.location || data.website || data.social.length > 0) ? `
    <div class="article contact">
      <div class="headline">Contact Information</div>
      <div class="byline">By ${data.fullName}</div>
      ${data.email ? `<p>Email: <a href="mailto:${data.email}" style="color: var(--accent);">${data.email}</a></p>` : ''}
      ${data.phone ? `<p>Phone: <a href="tel:${data.phone}" style="color: var(--accent);">${data.phone}</a></p>` : ''}
      ${data.location ? `<p>Location: ${data.location}</p>` : ''}
      ${data.website ? `<p>Website: <a href="${data.website}" target="_blank" style="color: var(--accent);">${data.website}</a></p>` : ''}
      ${data.social.length > 0 ? `<p>Social: ${data.social.map(s => `<a href="${s.url}" target="_blank" style="color: var(--accent);">${s.platform}</a>`).join(', ')}</p>` : ''}
    </div>
    ` : ''}

    ${data.summary ? `
    <div class="article summary">
      <div class="headline">About ${data.fullName}</div>
      <div class="byline">By ${data.fullName}</div>
      <p>${data.summary}</p>
    </div>
    ` : ''}

    ${data.experience.length > 0 ? data.experience.map(exp => `
    <div class="article experience" id="experience">
      <div class="headline">${exp.position}</div>
      <div class="byline">By ${data.fullName} | ${exp.duration}</div>
      <p>${exp.company} - ${exp.description}</p>
    </div>
    `).join('') : ''}

    ${data.education.length > 0 ? data.education.map(edu => `
    <div class="article education">
      <div class="headline">${edu.degree} in ${edu.field}</div>
      <div class="byline">By ${data.fullName} | ${edu.year}</div>
      <p>${edu.institution}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
    </div>
    `).join('') : ''}

    ${data.skills.length > 0 ? `
    <div class="article skills" id="skills">
      <div class="headline">Skills & Expertise</div>
      <div class="byline">By ${data.fullName}</div>
      <p>${data.skills.map(s => `${s.category}: ${s.items.join(', ')}`).join('. ')}</p>
    </div>
    ` : ''}

    ${data.projects.length > 0 ? data.projects.map(proj => `
    <div class="article projects">
      <div class="headline">${proj.title}</div>
      <div class="byline">By ${data.fullName} | ${proj.technologies.join(', ')}</div>
      <p>${proj.description || 'Project description not available.'} ${proj.link ? `<a href="${proj.link}">View Project</a>` : ''}</p>
    </div>
    `).join('') : ''}

    ${data.certifications.length > 0 ? `
    <div class="article certifications">
      <div class="headline">Certifications</div>
      <div class="byline">By ${data.fullName}</div>
      <ul>${data.certifications.map(cert => `<li>${cert}</li>`).join('')}</ul>
    </div>
    ` : ''}
  </div>
</div>

<footer style="margin-top: 4rem; padding: 2rem; text-align: center; opacity: 0.7;">
  <p>Generated at ${generatedAt}</p>
</footer>

<script>
  function showSection(section) {
    const articles = document.querySelectorAll('.article');
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    if (section === 'all') {
      articles.forEach(article => article.style.display = 'block');
    } else {
      articles.forEach(article => {
        if (article.classList.contains(section)) {
          article.style.display = 'block';
        } else {
          article.style.display = 'none';
        }
      });
    }
  }

  document.querySelector('.theme-toggle').addEventListener('click', () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', html.getAttribute('data-theme'));
  });
  const saved = localStorage.getItem('theme') || '${theme}';
  document.documentElement.setAttribute('data-theme', saved);
</script>
</body>
</html>`;
}

/**
* Neon Cyberpunk theme with deep neon outlines, glowing 3D borders and layered background depth.
*/
export function neonCyberpunk(data: ResumeData): string {
  const theme = data.themePreferences?.prefersDark ? 'dark' : 'light';
  const accentColor = data.themePreferences?.accentColor || '#ff00de';
  const generatedAt = data.meta?.generatedAt || new Date().toISOString();

  return `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.fullName}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --accent: ${accentColor};
    --bg: #f0f0f0;
    --text: #000;
    --neon-pink: #ff69b4;
    --neon-blue: #00bfff;
    --neon-green: #32cd32;
  }
  [data-theme="dark"] {
    --bg: #0a0a0a;
    --text: #fff;
    --neon-pink: #ff00de;
    --neon-blue: #00ffff;
    --neon-green: #39ff14;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Arial', sans-serif;
    background: var(--bg);
    color: var(--text);
    padding: 2rem;
    overflow-x: hidden;
    position: relative;
    perspective: 1200px;
    transform-style: preserve-3d;
  }
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent 40%, rgba(255, 0, 222, 0.05) 50%, transparent 60%),
                linear-gradient(-45deg, transparent 40%, rgba(0, 255, 255, 0.05) 50%, transparent 60%);
    z-index: -1;
  }
  .neon {
    text-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent), 0 0 30px var(--accent);
  }
  h1 {
    font-size: clamp(2rem, 6vw, 5rem);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 2rem;
    animation: flicker 3s infinite alternate;
    background: linear-gradient(45deg, var(--neon-pink), var(--neon-blue), var(--neon-green));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  @keyframes flicker {
    0%, 18%, 22%, 25%, 53%, 57%, 100% {
      text-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent), 0 0 30px var(--accent), 0 0 40px var(--accent);
    }
    20%, 24%, 55% {
      text-shadow: none;
    }
  }
  .section {
    border: 2px solid var(--neon-blue);
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1);
    background: rgba(0, 255, 255, 0.05);
    transform: translateZ(0);
    transition: transform 0.3s ease;
    position: relative;
  }
  .section::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, var(--neon-pink), var(--neon-blue), var(--neon-green));
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .section:hover {
    transform: translateZ(20px);
    box-shadow: 0 0 40px rgba(0, 255, 255, 0.5), inset 0 0 40px rgba(0, 255, 255, 0.2);
  }
  .section:hover::before { opacity: 0.3; }
  h2 {
    color: var(--neon-blue);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px var(--neon-blue);
  }
  .grid-lines {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(rgba(255, 0, 222, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
    z-index: -2;
    animation: gridMove 20s linear infinite;
  }
  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
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
    background: var(--accent);
    border-radius: 50%;
    animation: particleFloat 8s ease-in-out infinite;
    opacity: 0.1;
  }
  .particle:nth-child(1) { width: 6px; height: 6px; top: 15%; left: 20%; animation-delay: 0s; transform: translateZ(-30px); }
  .particle:nth-child(2) { width: 4px; height: 4px; top: 25%; right: 25%; animation-delay: 2s; transform: translateZ(-20px); }
  .particle:nth-child(3) { width: 8px; height: 8px; bottom: 30%; left: 15%; animation-delay: 4s; transform: translateZ(-40px); }
  .particle:nth-child(4) { width: 5px; height: 5px; top: 40%; right: 10%; animation-delay: 6s; transform: translateZ(-25px); }
  .particle:nth-child(5) { width: 7px; height: 7px; bottom: 15%; right: 20%; animation-delay: 1s; transform: translateZ(-35px); }
  @keyframes particleFloat {
    0%, 100% { transform: translateZ(-30px) translateY(0px) rotate(0deg) scale(1); opacity: 0.1; }
    50% { transform: translateZ(-30px) translateY(-20px) rotate(180deg) scale(1.2); opacity: 0.3; }
  }
  .theme-toggle { position: fixed; top: 2rem; right: 2rem; z-index: 100; background: var(--neon-pink); border: 2px solid var(--neon-pink); padding: 0.5rem; cursor: pointer; color: var(--bg); font-weight: bold; box-shadow: 0 0 10px var(--neon-pink); transform: perspective(200px) rotateX(10deg); transition: transform 0.3s ease; }
  .theme-toggle:hover { transform: perspective(200px) rotateX(0deg) translateY(-5px); }
  @media (prefers-reduced-motion: reduce) { .grid-lines, h1 { animation: none; } .section { transition: none; transform: none !important; } }
  @media print { .grid-lines, .theme-toggle { display: none; } .section { break-inside: avoid; } }
</style>
</head>
<body>
<div class="grid-lines"></div>
<div class="floating-particles">
  <div class="particle"></div>
  <div class="particle"></div>
  <div class="particle"></div>
  <div class="particle"></div>
  <div class="particle"></div>
</div>
<button class="theme-toggle" aria-label="Toggle theme">// THEME</button>

<h1 class="neon">${data.fullName}</h1>

${data.summary ? `
<div class="section">
  <h2>// ABOUT</h2>
  <p style="color: var(--neon-blue); text-shadow: 0 0 10px var(--neon-blue);">${data.summary}</p>
</div>
` : ''}

${data.experience.length > 0 ? `
<div class="section" id="experience">
  <h2>// EXPERIENCE</h2>
  ${data.experience.map(exp => `
  <div style="margin-bottom: 1.5rem;">
    <div style="color: var(--neon-pink); font-weight: bold; font-size: 1.2rem; text-shadow: 0 0 10px var(--neon-pink);">${exp.position}</div>
    <div style="color: var(--neon-blue); text-shadow: 0 0 10px var(--neon-blue);">${exp.company} | ${exp.duration}</div>
    <p style="margin-top: 0.5rem;">${exp.description}</p>
  </div>
  `).join('')}
</div>
` : ''}

${data.education.length > 0 ? `
<div class="section">
  <h2>// EDUCATION</h2>
  ${data.education.map(edu => `
  <div style="margin-bottom: 1.5rem;">
    <div style="color: var(--neon-green); font-weight: bold; font-size: 1.1rem; text-shadow: 0 0 10px var(--neon-green);">${edu.degree} in ${edu.field}</div>
    <div style="color: var(--neon-blue); text-shadow: 0 0 10px var(--neon-blue);">${edu.institution} | ${edu.year}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
  </div>
  `).join('')}
</div>
` : ''}

${data.skills.length > 0 ? `
<div class="section" id="skills">
  <h2>// SKILLS</h2>
  <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
    ${data.skills.map(s => s.items.map(item => `<span style="background: var(--neon-green); color: var(--bg); padding: 0.5rem 1rem; border-radius: 5px; box-shadow: 0 0 10px var(--neon-green);">${item}</span>`).join('')).join('')}
  </div>
</div>
` : ''}

${data.projects.length > 0 ? `
<div class="section">
  <h2>// PROJECTS</h2>
  ${data.projects.map(proj => `
  <div style="margin-bottom: 1.5rem;">
    <div style="color: var(--neon-pink); font-weight: bold; font-size: 1.1rem; text-shadow: 0 0 10px var(--neon-pink);">${proj.title}</div>
    <p style="margin-top: 0.5rem;">${proj.description || ''}</p>
    <div style="color: var(--neon-blue); text-shadow: 0 0 10px var(--neon-blue); margin-top: 0.5rem;">Tech: ${proj.technologies.join(', ')}</div>
    ${proj.link ? `<a href="${proj.link}" style="color: var(--neon-green); text-shadow: 0 0 10px var(--neon-green); margin-top: 0.5rem; display: block;">View Project</a>` : ''}
  </div>
  `).join('')}
</div>
` : ''}

${data.certifications.length > 0 ? `
<div class="section">
  <h2>// CERTIFICATIONS</h2>
  <ul style="color: var(--neon-blue); text-shadow: 0 0 10px var(--neon-blue);">${data.certifications.map(cert => `<li>${cert}</li>`).join('')}</ul>
</div>
` : ''}

<footer style="margin-top: 4rem; padding: 2rem; text-align: center; opacity: 0.7;">
  <p>Generated at ${generatedAt}</p>
</footer>

<script>
  document.querySelector('.theme-toggle').addEventListener('click', () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', html.getAttribute('data-theme'));
  });
  const saved = localStorage.getItem('theme') || '${theme}';
  document.documentElement.setAttribute('data-theme', saved);
</script>
</body>
</html>`;
}

/**
* Polaroid Scrapbook theme with rotated polaroids with drop shadows piled on top of each other.
*/
export function polaroidScrapbook(data: ResumeData): string {
  const theme = data.themePreferences?.prefersDark ? 'dark' : 'light';
  const accentColor = data.themePreferences?.accentColor || '#8b4513';
  const generatedAt = data.meta?.generatedAt || new Date().toISOString();

  return `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.fullName}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --accent: ${accentColor};
    --bg: #fef5e7;
    --text: #2c1810;
  }
  [data-theme="dark"] {
    --bg: #2c1810;
    --text: #fef5e7;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Comic Sans MS', cursive;
    background: var(--bg);
    padding: 2rem;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text fill="rgba(139,69,19,0.1)" font-size="20" y="50%">📸</text></svg>');
  }
  .board {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    position: relative;
  }
  .polaroid {
    background: #fff;
    padding: 1rem 1rem 3rem 1rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.1);
    transform: rotate(var(--rotate, 0deg)) translateZ(var(--z, 0px));
    transition: transform 0.3s ease;
    border: 1px solid #ddd;
    position: relative;
    z-index: var(--z-index, 1);
  }
  .polaroid:hover { transform: rotate(0deg) translateZ(20px) scale(1.05); z-index: 10; }
  .polaroid:nth-child(odd) { --rotate: -3deg; --z: 5px; --z-index: 2; }
  .polaroid:nth-child(even) { --rotate: 3deg; --z: 10px; --z-index: 3; }
  .polaroid:nth-child(3n) { --rotate: -5deg; --z: 15px; --z-index: 4; }
  .photo {
    background: linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #f7b731);
    min-height: 200px;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    border: 1px solid #ddd;
    padding: 1rem;
    box-sizing: border-box;
  }
  .caption {
    font-size: 1.2rem;
    text-align: center;
    color: var(--text);
    font-family: 'Comic Sans MS', cursive;
  }
  nav { position: fixed; top: 2rem; left: 2rem; z-index: 100; background: #fff; padding: 1rem; box-shadow: 0 0 20px rgba(0,0,0,0.2); border-radius: 10px; }
  nav a { display: block; margin-bottom: 0.5rem; color: var(--text); text-decoration: none; font-weight: 500; }
  .theme-toggle { background: var(--accent); color: #fff; border: 1px solid var(--accent); padding: 0.5rem; cursor: pointer; margin-top: 1rem; border-radius: 5px; }
  @media (prefers-reduced-motion: reduce) { .polaroid { transition: none; transform: none !important; } }
  @media print { nav { display: none; } .polaroid { break-inside: avoid; } }
</style>
</head>
<body>
<nav>
  ${data.experience.length > 0 ? '<a href="#experience">Experience</a>' : ''}
  ${data.skills.length > 0 ? '<a href="#skills">Skills</a>' : ''}
  <button class="theme-toggle" aria-label="Toggle theme">Theme</button>
</nav>

<div class="board">
  <div class="polaroid" style="--rotate: -5deg; --z: 20px; --z-index: 5; grid-column: span 2;">
    <div class="photo" style="height: 250px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <h1 style="font-size: 2.5rem; margin: 0;">${data.fullName}</h1>
      ${data.subtitle ? `<p style="font-size: 1.2rem; margin: 0.5rem 0 0 0;">${data.subtitle}</p>` : ''}
    </div>
    <div class="caption">Portfolio</div>
  </div>

  ${(data.email || data.phone || data.location || data.website || data.social.length > 0) ? `
  <div class="polaroid">
    <div class="photo" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1rem; font-size: 0.9rem;">
      ${data.email ? `<div>Email: <a href="mailto:${data.email}" style="color: var(--accent);">${data.email}</a></div>` : ''}
      ${data.phone ? `<div>Phone: <a href="tel:${data.phone}" style="color: var(--accent);">${data.phone}</a></div>` : ''}
      ${data.location ? `<div>Location: ${data.location}</div>` : ''}
      ${data.website ? `<div>Website: <a href="${data.website}" target="_blank" style="color: var(--accent);">${data.website}</a></div>` : ''}
      ${data.social.length > 0 ? `<div style="margin-top: 0.5rem;">Social: ${data.social.map(s => `<a href="${s.url}" target="_blank" style="color: var(--accent); margin-right: 0.5rem;">${s.platform}</a>`).join('')}</div>` : ''}
    </div>
    <div class="caption">Contact Info</div>
  </div>
  ` : ''}

  ${data.summary ? `
  <div class="polaroid">
    <div class="photo" style="display: flex; align-items: center; justify-content: center; padding: 1rem;">
      <div style="font-size: 0.8rem; text-align: center; line-height: 1.4;">${data.summary}</div>
    </div>
    <div class="caption">About Me</div>
  </div>
  ` : ''}

  ${data.experience.length > 0 ? data.experience.map((exp, i) => `
  <div class="polaroid" id="experience">
    <div class="photo" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1rem;">
      <div style="font-size: 1.1rem; font-weight: bold; margin-bottom: 0.5rem;">${exp.position}</div>
      <div style="font-size: 0.9rem;">${exp.company}</div>
      <div style="font-size: 0.8rem; margin-top: 0.5rem;">${exp.duration}</div>
      ${exp.description ? `<div style="font-size: 0.7rem; margin-top: 0.5rem; text-align: center;">${exp.description}</div>` : ''}
      ${exp.highlights && exp.highlights.length > 0 ? `<ul style="font-size: 0.7rem; margin-top: 0.5rem; padding-left: 1rem; text-align: left;">${exp.highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
    </div>
    <div class="caption">Experience</div>
  </div>
  `).join('') : ''}

  ${data.education.length > 0 ? data.education.map(edu => `
  <div class="polaroid">
    <div class="photo" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1rem;">
      <div style="font-size: 1.1rem; font-weight: bold; margin-bottom: 0.5rem;">${edu.degree} in ${edu.field}</div>
      <div style="font-size: 0.9rem;">${edu.institution}</div>
      <div style="font-size: 0.8rem; margin-top: 0.5rem;">${edu.year}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
    </div>
    <div class="caption">Education</div>
  </div>
  `).join('') : ''}

  ${data.skills.length > 0 ? `
  <div class="polaroid" id="skills" style="grid-column: span 2;">
    <div class="photo" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1rem;">
      ${data.skills.map(s => `
        <div style="margin-bottom: 1rem; width: 100%;">
          <div style="font-size: 1rem; font-weight: bold; margin-bottom: 0.5rem; text-align: center;">${s.category}</div>
          <div style="display: flex; flex-wrap: wrap; justify-content: center;">
            ${s.items.map(item => `<span style="background: rgba(255,255,255,0.8); color: var(--text); padding: 0.25rem 0.5rem; margin: 0.25rem; border-radius: 10px; font-size: 0.8rem;">${item}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
    <div class="caption">Skills & Expertise</div>
  </div>
  ` : ''}

  ${data.projects.length > 0 ? data.projects.map(proj => `
  <div class="polaroid">
    <div class="photo" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1rem;">
      <div style="font-size: 1rem; font-weight: bold; margin-bottom: 0.5rem;">${proj.title}</div>
      ${proj.description ? `<div style="font-size: 0.8rem; text-align: center; margin-bottom: 0.5rem;">${proj.description}</div>` : ''}
      <div style="font-size: 0.7rem;">Tech: ${proj.technologies.join(', ')}</div>
      ${proj.link ? `<div style="margin-top: 0.5rem;"><a href="${proj.link}" target="_blank" style="color: var(--accent); font-size: 0.8rem;">View Project</a></div>` : ''}
    </div>
    <div class="caption">Project</div>
  </div>
  `).join('') : ''}

  ${data.certifications.length > 0 ? `
  <div class="polaroid">
    <div class="photo" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1rem;">
      <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">🏆</div>
      <div style="font-size: 0.8rem; text-align: center;">
        ${data.certifications.map(cert => `<div>${cert}</div>`).join('')}
      </div>
    </div>
    <div class="caption">Certifications</div>
  </div>
  ` : ''}
</div>

<footer style="margin-top: 4rem; padding: 2rem; text-align: center; opacity: 0.7;">
  <p>Generated at ${generatedAt}</p>
</footer>

<script>
  document.querySelector('.theme-toggle').addEventListener('click', () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', html.getAttribute('data-theme'));
  });
  const saved = localStorage.getItem('theme') || '${theme}';
  document.documentElement.setAttribute('data-theme', saved);
</script>
</body>
</html>`;
}

/**
* Futuristic 3D theme with parallax layers plus transform-perspective on hero and cards.
*/
export function futuristic3D(data: ResumeData): string {
  const theme = data.themePreferences?.prefersDark ? 'dark' : 'light';
  const accentColor = data.themePreferences?.accentColor || '#00ffff';
  const generatedAt = data.meta?.generatedAt || new Date().toISOString();

  return `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.fullName}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --accent: ${accentColor};
    --bg: linear-gradient(135deg, #fefefe 0%, #f8fafc 50%, #f1f5f9 100%);
    --text: #000;
    --surface: rgba(0, 0, 0, 0.1);
  }
  [data-theme="dark"] {
    --bg: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
    --text: #fff;
    --surface: rgba(255, 255, 255, 0.1);
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    perspective: 1000px;
    transform-style: preserve-3d;
  }
  .parallax-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  }
  .layer-1 { background: radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%); transform: translateZ(-100px); }
  .layer-2 { background: radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%); transform: translateZ(-200px); }
  .layer-3 { background: radial-gradient(circle at 40% 80%, rgba(255, 255, 0, 0.1) 0%, transparent 50%); transform: translateZ(-300px); }
  .container {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
    transform-style: preserve-3d;
  }
  .hero {
    text-align: center;
    margin-bottom: 4rem;
    transform: perspective(1000px) rotateX(10deg) translateZ(50px);
    transition: transform 0.5s ease;
  }
  .hero:hover { transform: perspective(1000px) rotateX(0deg) translateZ(100px); }
  h1 {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    text-shadow: 0 0 30px rgba(102, 126, 234, 0.5);
  }
  .card {
    background: var(--surface);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    padding: 2.5rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    transform: translateZ(0);
    transition: transform 0.3s ease;
    transform-style: preserve-3d;
  }
  .card:hover {
    transform: translateZ(30px) rotateY(5deg);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .floating-elements {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  }
  .float {
    position: absolute;
    background: var(--accent);
    border-radius: 50%;
    opacity: 0.1;
    animation: float 6s ease-in-out infinite;
  }
  .float:nth-child(1) { width: 80px; height: 80px; top: 10%; left: 10%; animation-delay: 0s; }
  .float:nth-child(2) { width: 60px; height: 60px; top: 20%; right: 15%; animation-delay: 2s; }
  .float:nth-child(3) { width: 100px; height: 100px; bottom: 20%; left: 20%; animation-delay: 4s; }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  .theme-toggle { position: fixed; top: 2rem; right: 2rem; z-index: 100; background: var(--accent); border: 1px solid var(--accent); padding: 0.5rem; cursor: pointer; border-radius: 10px; color: #000; font-weight: bold; transform: perspective(200px) rotateX(10deg); transition: transform 0.3s ease; }
  .theme-toggle:hover { transform: perspective(200px) rotateX(0deg) translateY(-5px); }
  @media (prefers-reduced-motion: reduce) { .float, .hero, .card { animation: none; transition: none; transform: none !important; } }
  @media print { .parallax-layer, .floating-elements, .theme-toggle { display: none; } .card { break-inside: avoid; background: #fff; color: #000; } }
</style>
</head>
<body>
<div class="parallax-layer layer-1"></div>
<div class="parallax-layer layer-2"></div>
<div class="parallax-layer layer-3"></div>
<div class="floating-elements">
  <div class="float"></div>
  <div class="float"></div>
  <div class="float"></div>
</div>

<button class="theme-toggle" aria-label="Toggle theme">Theme</button>

<div class="container">
  <div class="hero" id="hero">
    <h1>${data.fullName}</h1>
    <p style="font-size: 1.5rem; opacity: 0.9;">${data.subtitle || ''}</p>
  </div>

  ${data.summary ? `
  <div class="card" id="about">
    <h2>About</h2>
    <p>${data.summary}</p>
  </div>
  ` : ''}

  ${data.experience.length > 0 ? `
  <div class="card" id="experience">
    <h2>Experience</h2>
    ${data.experience.map(exp => `
    <div style="margin-bottom: 2rem;">
      <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${exp.position}</h3>
      <p style="opacity: 0.8; margin-bottom: 0.5rem;">${exp.company} | ${exp.duration}</p>
      <p style="opacity: 0.9;">${exp.description}</p>
    </div>
    `).join('')}
  </div>
  ` : ''}

  ${data.education.length > 0 ? `
  <div class="card">
    <h2>Education</h2>
    ${data.education.map(edu => `
    <div style="margin-bottom: 2rem;">
      <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${edu.degree} in ${edu.field}</h3>
      <p style="opacity: 0.8; margin-bottom: 0.5rem;">${edu.institution} | ${edu.year}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
    </div>
    `).join('')}
  </div>
  ` : ''}

  ${data.skills.length > 0 ? `
  <div class="card" id="skills">
    <h2>Skills</h2>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      ${data.skills.map(s => s.items.map(item => `
        <span style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 0.5rem 1rem; border-radius: 20px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">${item}</span>
      `).join('')).join('')}
    </div>
  </div>
  ` : ''}

  ${data.projects.length > 0 ? `
  <div class="card">
    <h2>Projects</h2>
    ${data.projects.map(proj => `
    <div style="margin-bottom: 2rem;">
      <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${proj.title}</h3>
      <p style="opacity: 0.8; margin-bottom: 0.5rem;">${proj.description || ''}</p>
      <p style="opacity: 0.9; margin-bottom: 1rem;">Technologies: ${proj.technologies.join(', ')}</p>
      ${proj.link ? `<a href="${proj.link}" style="color: var(--accent); font-weight: bold;">View Project →</a>` : ''}
    </div>
    `).join('')}
  </div>
  ` : ''}

  ${data.certifications.length > 0 ? `
  <div class="card">
    <h2>Certifications</h2>
    <ul style="opacity: 0.9;">${data.certifications.map(cert => `<li style="margin-bottom: 0.5rem;">${cert}</li>`).join('')}</ul>
  </div>
  ` : ''}
</div>

<footer style="margin-top: 4rem; padding: 2rem; text-align: center; opacity: 0.7;">
  <p>Generated at ${generatedAt}</p>
</footer>

<script>
  document.querySelector('.theme-toggle').addEventListener('click', () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', html.getAttribute('data-theme'));
  });
  const saved = localStorage.getItem('theme') || '${theme}';
  document.documentElement.setAttribute('data-theme', saved);
</script>
</body>
</html>`;
}
