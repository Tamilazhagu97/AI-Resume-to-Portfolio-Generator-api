// src/services/llmService.ts

import axios from 'axios';
import { ResumeData } from '../types';

export class LLMService {
  // ✅ NEW Hugging Face Serverless Inference API (WORKING)
  private static readonly HF_API_URL = 'https://api-inference.huggingface.co/models/gpt2';

  // ✅ Alternative: Use local regex parser (no API needed)
  private static readonly USE_LOCAL_PARSER = false;

  private static getApiKey(): string {
    const key = process.env.HUGGINGFACE_API_KEY;
    if (!key) {
      throw new Error(
        'HUGGINGFACE_API_KEY not set! Add to .env: HUGGINGFACE_API_KEY=hf_YOUR_TOKEN'
      );
    }
    return key;
  }

  static async parseResumeToJSON(resumeText: string): Promise<ResumeData> {
    try {
      // ✅ Use local regex parser - no API calls needed!
      if (this.USE_LOCAL_PARSER) {
        console.log('🔍 Parsing resume with local regex parser...');
        return this.parseResumeWithRegex(resumeText);
      }

      // Fallback to API if needed
      const apiKey = this.getApiKey();
      console.log('✅ API Key loaded successfully');

      const prompt = this.buildParsingPrompt(resumeText);

      console.log('🔄 Calling Hugging Face API...');
      console.log('📍 Endpoint:', this.HF_API_URL);

      const response = await axios.post(
        this.HF_API_URL,
        {
          inputs: prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 60000,
        }
      );

      console.log('✅ API Response received');

      const generatedText = response.data[0]?.generated_text || '';
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        console.warn('⚠️ No JSON found, using regex parser');
        return this.parseResumeWithRegex(resumeText);
      }

      try {
        const parsedData = JSON.parse(jsonMatch[0]);
        console.log('✅ JSON parsed successfully');
        return this.validateAndNormalizeData(parsedData);
      } catch (parseError) {
        console.warn('⚠️ Failed to parse JSON, using regex parser');
        return this.parseResumeWithRegex(resumeText);
      }
    } catch (error: any) {
      console.warn('⚠️ API Error, falling back to regex parser');
      return this.parseResumeWithRegex(resumeText);
    }
  }

  private static buildParsingPrompt(resumeText: string): string {
    const truncatedText = resumeText.substring(0, 2000);
    return `Parse this resume into JSON:\n${truncatedText}`;
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

    // ✅ Extract Full Name (first non-empty line or look for pattern)
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
      const expBlocks = expText.split(/\n(?=[A-Z][a-z]+.*?–|[A-Z][a-z]+.*?-)/);

      expBlocks.forEach(block => {
        const lines = block.split('\n').map(l => l.trim());
        if (lines.length > 0) {
          const titleMatch = lines[0].match(/^([^–-]+)(?:\s+–\s+|[–-]\s+)(.*)$/);
          const durationMatch = lines[0].match(
            /([A-Za-z]+\s+\d{4}|[A-Za-z]+\s+\d{4})[–-]\s*([A-Za-z]+\s+\d{4}|present|current|now|today)/i
          );

          if (titleMatch || durationMatch) {
            data.experience.push({
              company: lines[0].split('–')[1]?.trim() || 'Company',
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
        const yearMatch = line.match(/(\d{4})\s*[–-]\s*(\d{4}|present|current|now)/);

        if (degreeMatch) {
          data.education.push({
            institution: line.split('–')[0]?.split('-')[0]?.trim() || 'Institution',
            degree: degreeMatch[1],
            field: line.match(/(?:in|of)\s+([^–\n-]+)/i)?.[1]?.trim() || 'Field',
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

      // Group skills by category
      const categories: { [key: string]: string[] } = {};

      skillLines.forEach(line => {
        const cleaned = line.replace(/^[-•]\s*/, '').trim();
        if (cleaned.length > 0 && cleaned.length < 100) {
          // Try to categorize
          if (
            /language|programming|framework/i.test(cleaned) ||
            /javascript|typescript|python|java|node|react/i.test(cleaned)
          ) {
            if (!categories['Languages & Frameworks']) {
              categories['Languages & Frameworks'] = [];
            }
            categories['Languages & Frameworks'].push(cleaned);
          } else if (
            /database|sql|mongo|postgres/i.test(cleaned)
          ) {
            if (!categories['Databases']) {
              categories['Databases'] = [];
            }
            categories['Databases'].push(cleaned);
          } else if (
            /tool|git|docker|aws|cloud/i.test(cleaned)
          ) {
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