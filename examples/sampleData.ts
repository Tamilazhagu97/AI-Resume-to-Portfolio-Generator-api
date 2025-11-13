import { ResumeData } from '../src/types';

const exampleResume: ResumeData = {
    "fullName": "John David Smith",
    "subtitle": "Software Engineer",
    "email": "john.smith@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "San Francisco, CA",
    "summary": "Full-stack developer with 5+ years of experience building scalable web applications using React and Node.js. Proven track record of delivering high-performance systems that improve user engagement by up to 40%. Skilled in cloud infrastructure, database optimization, and leading cross-functional teams. Passionate about clean code architecture and mentoring junior developers.",
    "experience": [
        {
            "company": "TechCorp Inc.",
            "position": "Senior Software Engineer",
            "duration": "Jan 2022 - Present",
            "description": "Lead full-stack development of customer-facing web applications serving 100K+ daily active users.",
            "highlights": [
                "Architected microservices migration reducing API response time by 65%",
                "Implemented automated testing pipeline reducing production bugs by 80%",
                "Mentored team of 4 junior engineers, 3 promoted within 18 months",
                "Optimized database queries improving dashboard load time from 8s to 1.2s"
            ]
        }
    ],
    "education": [
        {
            "institution": "University of California, Berkeley",
            "degree": "Bachelor of Science",
            "field": "Computer Science",
            "year": "2018",
            "gpa": "3.8/4.0"
        }
    ],
    "skills": [
        {
            "category": "Frontend",
            "items": ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "Jest"]
        },
        {
            "category": "Backend",
            "items": ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs"]
        }
    ],
    "projects": [
        {
            "title": "AI Portfolio Generator",
            "description": "Full-stack SaaS application that converts resumes into beautiful interactive portfolios using AI. Built with React, Node.js, and Claude API.",
            "technologies": ["React", "Node.js", "Claude API", "PostgreSQL", "Stripe"],
            "link": "https://github.com/user/portfolio-generator"
        }
    ],
    "certifications": [
        "AWS Certified Solutions Architect - Professional (2023)",
        "Kubernetes Application Developer (CKAD) (2022)"
    ],
    "social": [
        {
            "platform": "github",
            "url": "https://github.com/johnsmith"
        },
        {
            "platform": "linkedin",
            "url": "https://linkedin.com/in/johnsmith"
        }
    ]
};

export default exampleResume;