
import axios from 'axios';
import { ResumeData } from '../types';

export class LLMService {
    // ✅ Using Google Generative AI (Gemini)
    private static readonly GOOGLE_API_BASE = 'https://generativelanguage.googleapis.com/v1/models';

    // Try these models in order
    private static readonly VALID_MODELS = [
        // 'gemini-1.5-flash',
        'gemini-2.0-flash',
        'gemini-pro',
        'gemini-1.5-pro',
    ];

    // ✅ Toggle between AI API and local parser
    private static readonly USE_LOCAL_PARSER = false; // ← SET TO FALSE FOR AI

    private static getApiKey(): string {
        const key = process.env.HUGGINGFACE_API_KEY; // Reusing this env var
        if (!key) {
            throw new Error(
                'GOOGLE_API_KEY not set! Add to .env: HUGGINGFACE_API_KEY=your_google_api_key'
            );
        }
        return key;
    }

    static async parseResumeToJSON(resumeText: string): Promise<ResumeData> {
        try {
            // ✅ Use AI-based parser when enabled
            if (!this.USE_LOCAL_PARSER) {
                console.log('🤖 Using Google Gemini AI for parsing...');
                return await this.parseWithGoogleAPI(resumeText);
            }

            // Fallback to local regex parser
            console.log('🔍 Using local regex parser...');
            return this.parseResumeWithRegex(resumeText);
        } catch (error: any) {
            console.warn('⚠️ Parsing error, falling back to regex parser');
            console.error('Error details:', error.message);
            return this.parseResumeWithRegex(resumeText);
        }
    }

    static createResumeParserPrompt = (resumeText: string): string => {
        return `You are an expert resume parser and data extraction specialist. Your task is to analyze the provided resume and extract all relevant information into a perfectly structured JSON format.

CRITICAL REQUIREMENTS:
1. Return ONLY valid, minified JSON - no markdown, no code blocks, no explanations, no extra text
2. Parse data accurately and completely
3. Omit keys entirely if no data exists (never use null or empty values)
4. All array fields must exist even if empty: experience[], education[], skills[], projects[], certifications[], social[]
5. Normalize and standardize all extracted data

DATA EXTRACTION GUIDELINES:

PERSONAL INFORMATION:
- fullName: Extract complete name as written (proper capitalization)
- email: Valid email format only
- phone: Clean format (remove special chars, standardize to: +1 (123) 456-7890 or +1-123-456-7890)
- location: City, State/Country format
- summary: Write a compelling 4-5 sentence professional summary synthesizing:
  * Core expertise and years of experience
  * Key achievements and impact
  * Technical or domain strengths
  * Career progression and specializations
  * Unique value proposition

EXPERIENCE SECTION:
- company: Official company name
- position: Job title (normalize: "Software Engineer" not "Soft Eng")
- duration: Format as "Mon Year - Mon Year" (e.g., "Jan 2020 - Dec 2022") or "Present" if current
- description: 1-2 sentence overview of role responsibilities
- highlights: Array of 3-5 quantifiable achievements using action verbs:
  * Include metrics: "Improved X by Y%", "Reduced Z from A to B"
  * Focus on impact: business value, efficiency, scale
  * Format: "Verb + Action + Result (metric if available)"

EDUCATION SECTION:
- institution: University/School name
- degree: Full degree type (Bachelor of Science, Master of Arts, etc.)
- field: Major/Specialization field
- year: Graduation year (format: "2020" or "May 2020")
- gpa: GPA if mentioned (format: "3.8/4.0")

SKILLS SECTION:
- Organize into logical categories (Programming Languages, Frontend, Backend, DevOps, Tools, etc.)
- For each category:
  * category: Meaningful grouping name
  * items: Array of 5-10 specific skills (sorted by proficiency if identifiable)
  * Format: "Skill Name" not "Skills: X, Y, Z"

PROJECTS SECTION:
- title: Project name
- description: 3-5 sentence description of project purpose and scope
- technologies: Array of 3-8 core technologies used (sorted by importance)
- link: URL if provided (GitHub, demo, portfolio link)
- Include personal, academic, or professional projects with notable impact

CERTIFICATIONS SECTION:
- Format: "Certification Name - Issuer (Year)" or "Certification Name (Year)"
- Include only recognized, credible certifications
- Array of strings, sorted by recency or relevance

SOCIAL SECTION:
- Extract social/professional profiles: GitHub, LinkedIn, Twitter, Portfolio, Personal Website
- platform: Standardized name (lowercase)
- url: Complete valid URL (with https://)
- Only include if URL is provided

DATA QUALITY STANDARDS:
✓ Remove duplicates across sections
✓ Standardize date formats consistently
✓ Normalize company names and titles
✓ Fix common typos in technical terms
✓ Sort experiences by date (most recent first)
✓ Sort education by date (most recent first)
✓ Sort certifications by date (most recent first)
✓ Capitalize properly: job titles, company names, technologies
✓ Use professional language throughout
✓ Include only verified/mentioned information

EXAMPLE OUTPUT STRUCTURE:
{
  "fullName": "John David Smith",
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
}

RESUME TO PARSE:
${resumeText}

Extract and return ONLY the JSON object, no additional text.`;
    };

    // ✅ NEW: Google Gemini API Parser (FREE) - Tries multiple models
    private static async parseWithGoogleAPI(resumeText: string): Promise<ResumeData> {
        try {
            // const truncatedText = resumeText.substring(0, 8000);

            const truncatedText = resumeText.substring(0, 8000);
            const prompt = this.createResumeParserPrompt(truncatedText);

            const apiKey = this.getApiKey();

            // Try each model until one works
            for (let i = 0; i < this.VALID_MODELS.length; i++) {
                const model = this.VALID_MODELS[i];
                console.log(`🔄 Attempt ${i + 1}/${this.VALID_MODELS.length}: ${model}`);

                const url = `${this.GOOGLE_API_BASE}/${model}:generateContent?key=${apiKey}`;

                try {
                    const response = await axios.post(
                        url,
                        {
                            contents: [
                                {
                                    parts: [
                                        {
                                            text: prompt,
                                        },
                                    ],
                                },
                            ],
                            generationConfig: {
                                temperature: 0.3,
                                maxOutputTokens: 2000,
                            },
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            timeout: 60000,
                        }
                    );

                    console.log('✅ API Response received');

                    // Extract text from Google's response format
                    const generatedText =
                        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

                    if (!generatedText) {
                        console.warn('⚠️ Empty response, trying next model...');
                        continue;
                    }

                    console.log('📝 Generated text length:', generatedText.length);

                    // Find JSON in response
                    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);

                    if (!jsonMatch) {
                        console.warn('⚠️ No JSON found, trying next model...');
                        continue;
                    }

                    try {
                        const parsedData = JSON.parse(jsonMatch[0]);
                        // console.log('✅ JSON parsed successfully', parsedData);
                        return this.validateAndNormalizeData(parsedData);
                    } catch (parseError) {
                        console.warn('⚠️ Failed to parse JSON, trying next model...');
                        continue;
                    }
                } catch (error: any) {
                    if (i === this.VALID_MODELS.length - 1) {
                        // Last attempt
                        throw error;
                    }
                    // Try next model
                    console.warn(`⚠️ Model ${model} failed (${error.response?.status}), trying next...`);
                    continue;
                }
            }

            throw new Error('All models failed');
        } catch (error: any) {
            console.error('❌ Google Gemini API Error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data?.error?.message,
            });

            if (error.response?.status === 400) {
                console.error('❌ Invalid API key or request');
            } else if (error.response?.status === 429) {
                console.error('⚠️ Rate limited. Free tier has limits.');
            }

            throw error;
        }
    }

    private static parseResumeWithRegex(resumeText: string): ResumeData {
        console.log('🔄 Extracting data using regex...');

        const data: ResumeData = {
            fullName: 'Your Name',
            email: '',
            phone: '',
            location: '',
            summary: '',
            experience: [],
            education: [],
            skills: [],
            projects: [],
            certifications: [],
            social: [],
        };

        const lines = resumeText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        // ✅ Extract Full Name
        if (lines.length > 0) {
            const firstLine = lines[0];
            if (!firstLine.includes('@') && !firstLine.includes('http')) {
                data.fullName = firstLine;
            } else if (lines.length > 1) {
                data.fullName = lines[1];
            }
        }

        // ✅ Extract Email
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const emailMatches = resumeText.match(emailRegex);
        if (emailMatches && emailMatches.length > 0) {
            data.email = emailMatches[0];
        }

        // ✅ Extract Phone
        const phoneRegex = /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
        const phoneMatches = resumeText.match(phoneRegex);
        if (phoneMatches && phoneMatches.length > 0) {
            data.phone = phoneMatches[0];
        }

        // ✅ Extract Summary
        const summaryMatch = resumeText.match(
            /(?:professional\s+summary|summary|objective|profile)[:\s]+(.*?)(?=\n[A-Z]|\n\n)/is
        );
        if (summaryMatch) {
            data.summary = summaryMatch[1]
                .trim()
                .split('\n')[0]
                .substring(0, 200);
        }

        // ✅ Extract Location
        const locationMatch = resumeText.match(
            /(?:location|city|based|located)[:\s]+(.*?)(?:\n|,|$)/i
        );
        if (locationMatch) {
            data.location = locationMatch[1].trim().substring(0, 50);
        }

        // ✅ Extract Experience
        const experienceSection = resumeText.match(
            /(?:work\s+experience|experience|employment)[:\s]+([\s\S]*?)(?=\n(?:education|skills|projects|certifications|$))/i
        );

        if (experienceSection) {
            const expText = experienceSection[1];
            const expBlocks = expText.split(/\n(?=[A-Z][a-z]+.*?-|[A-Z][a-z]+.*?-)/);

            expBlocks.forEach(block => {
                const lines = block.split('\n').map(l => l.trim());
                if (lines.length > 0) {
                    const titleMatch = lines[0].match(/^([^-]+)(?:\s+-\s+|[-]\s+)(.*)$/);
                    const durationMatch = lines[0].match(
                        /([A-Za-z]+\s+\d{4}|[A-Za-z]+\s+\d{4})[-]\s*([A-Za-z]+\s+\d{4}|present|current|now|today)/i
                    );

                    if (titleMatch || durationMatch) {
                        data.experience.push({
                            company: lines[0].split('-')[1]?.trim() || 'Company',
                            position: titleMatch ? titleMatch[1].trim() : lines[0],
                            duration: durationMatch ? durationMatch[0] : '',
                            description: lines.slice(1).join(' ').substring(0, 200),
                            highlights: lines
                                .slice(1)
                                .filter(l => l.startsWith('-') || l.startsWith('•'))
                                .map(l => l.replace(/^[-•]\s*/, ''))
                                .slice(0, 5),
                        });
                    }
                }
            });
        }

        // ✅ Extract Education
        const educationSection = resumeText.match(
            /(?:education|academic)[:\s]+([\s\S]*?)(?=\n(?:skills|experience|projects|certifications|$))/i
        );

        if (educationSection) {
            const eduText = educationSection[1];
            const eduLines = eduText.split('\n').filter(l => l.trim());

            eduLines.forEach(line => {
                const degreeMatch = line.match(
                    /(B\.?[SA]\.?|M\.?[SA]\.?|Ph\.?D\.?|Bachelor|Master|Diploma)[^\n]*/i
                );
                const yearMatch = line.match(/(\d{4})\s*[-]\s*(\d{4}|present|current|now)/);

                if (degreeMatch) {
                    data.education.push({
                        institution: line.split('-')[0]?.split('-')[0]?.trim() || 'Institution',
                        degree: degreeMatch[1],
                        field: line.match(/(?:in|of)\s+([^-\n]+)/i)?.[1]?.trim() || 'Field',
                        year: yearMatch ? yearMatch[0] : '',
                        gpa: undefined,
                    });
                }
            });
        }

        // ✅ Extract Skills
        const skillsSection = resumeText.match(
            /(?:skills|technical\s+skills|competencies|abilities)[:\s]+([\s\S]*?)(?=\n(?:experience|education|projects|certifications|$))/i
        );

        if (skillsSection) {
            const skillsText = skillsSection[1];
            const skillLines = skillsText.split(/\n|[,;]/);

            const categories: { [key: string]: string[] } = {};

            skillLines.forEach(line => {
                const cleaned = line.replace(/^[-•]\s*/, '').trim();
                if (cleaned.length > 0 && cleaned.length < 100) {
                    if (
                        /language|programming|framework/i.test(cleaned) ||
                        /javascript|typescript|python|java|node|react/i.test(cleaned)
                    ) {
                        if (!categories['Languages & Frameworks']) {
                            categories['Languages & Frameworks'] = [];
                        }
                        categories['Languages & Frameworks'].push(cleaned);
                    } else if (/database|sql|mongo|postgres/i.test(cleaned)) {
                        if (!categories['Databases']) {
                            categories['Databases'] = [];
                        }
                        categories['Databases'].push(cleaned);
                    } else if (/tool|git|docker|aws|cloud/i.test(cleaned)) {
                        if (!categories['Tools & Cloud']) {
                            categories['Tools & Cloud'] = [];
                        }
                        categories['Tools & Cloud'].push(cleaned);
                    } else {
                        if (!categories['Other Skills']) {
                            categories['Other Skills'] = [];
                        }
                        categories['Other Skills'].push(cleaned);
                    }
                }
            });

            Object.entries(categories).forEach(([category, items]) => {
                if (items.length > 0) {
                    data.skills.push({
                        category,
                        items: items.slice(0, 10),
                    });
                }
            });
        }

        // ✅ Extract Projects
        const projectsSection = resumeText.match(
            /(?:projects?|key\s+projects)[:\s]+([\s\S]*?)(?=\n(?:skills|experience|education|certifications|$))/i
        );

        if (projectsSection) {
            const projectText = projectsSection[1];
            const projectLines = projectText.split(/\n(?=[A-Z])/);

            projectLines.slice(0, 3).forEach(project => {
                const lines = project.split('\n').map(l => l.trim());
                if (lines.length > 0) {
                    const techMatch = lines.join(' ').match(/tech[:\s]+([^-•\n]+)/i);
                    data.projects.push({
                        title: lines[0],
                        description: lines.slice(1).join(' ').substring(0, 150),
                        technologies: techMatch
                            ? techMatch[1].split(/[,;]/).map(t => t.trim())
                            : [],
                        link: undefined,
                    });
                }
            });
        }

        // ✅ Extract Certifications
        const certMatch = resumeText.match(
            /(?:certifications?|credentials)[:\s]+([\s\S]*?)(?=\n$|$)/i
        );
        if (certMatch) {
            data.certifications = certMatch[1]
                .split(/\n|[,;]/)
                .map(c => c.replace(/^[-•]\s*/, '').trim())
                .filter(c => c.length > 0 && c.length < 100)
                .slice(0, 5);
        }

        // ✅ Extract Social Links
        const linkedinMatch = resumeText.match(
            /linkedin\.com\/in\/([a-zA-Z0-9-]+)/i
        );
        if (linkedinMatch) {
            data.social.push({
                platform: 'linkedin',
                url: `https://linkedin.com/in/${linkedinMatch[1]}`,
            });
        }

        const githubMatch = resumeText.match(/github\.com\/([a-zA-Z0-9-]+)/i);
        if (githubMatch) {
            data.social.push({
                platform: 'github',
                url: `https://github.com/${githubMatch[1]}`,
            });
        }

        console.log('✅ Extracted data for:', data.fullName);
        return this.validateAndNormalizeData(data);
    }

    private static validateAndNormalizeData(data: any): ResumeData {
        return {
            fullName: data.fullName || 'Your Name',
            email: data.email || 'email@example.com',
            phone: data.phone || '',
            location: data.location || '',
            summary: data.summary || '',
            experience: Array.isArray(data.experience) ? data.experience : [],
            education: Array.isArray(data.education) ? data.education : [],
            skills: Array.isArray(data.skills) ? data.skills : [],
            projects: Array.isArray(data.projects) ? data.projects : [],
            certifications: Array.isArray(data.certifications) ? data.certifications : [],
            social: Array.isArray(data.social) ? data.social : [],
        };
    }

    private static getDefaultResumeData(): ResumeData {
        return {
            fullName: 'Your Name',
            email: 'email@example.com',
            phone: '',
            location: '',
            summary: 'Professional with strong background in technology and innovation.',
            experience: [],
            education: [],
            skills: [],
            projects: [],
            certifications: [],
            social: [],
        };
    }
}