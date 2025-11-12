export interface ResumeData {
    fullName: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    projects: Project[];
    certifications: string[];
    social: SocialLink[];
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