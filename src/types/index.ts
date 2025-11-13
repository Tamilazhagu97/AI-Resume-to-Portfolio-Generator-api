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
    description: string;
    highlights: string[];
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
    description: string;
    technologies: string[];
    link?: string;
}

export interface SocialLink {
    platform: string;
    url: string;
}

export interface HuggingFaceResponse {
    generated_text?: string;
}

export interface PortfolioResponse {
    success: boolean;
    message: string;
    html?: string;
    fileName?: string;
    resumeData?: ResumeData;
    error?: string;
}