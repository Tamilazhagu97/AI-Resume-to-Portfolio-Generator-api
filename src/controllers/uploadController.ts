import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { ResumeExtractor } from '../services/resumeExtractor';
import { LLMService } from '../services/llmService';
import { PortfolioGenerator } from '../services/portfolioGenerator';
import { PortfolioResponse } from '../types';

export class UploadController {
    static async generatePortfolio(req: Request, res: Response): Promise<void> {
        try {
            if (!req.file) {
                res.status(400).json({
                    success: false,
                    message: 'No file uploaded',
                } as PortfolioResponse);
                return;
            }

            const filePath = req.file.path;
            const fileName = `${Date.now()}.html`;

            try {
                // Step 1: Extract text from resume
                console.log('📄 Extracting text from resume...');
                const resumeText = await ResumeExtractor.extractText(filePath);

                if (!resumeText || resumeText.trim().length === 0) {
                    throw new Error('Failed to extract text from resume');
                }

                console.log(`✓ Extracted ${resumeText.length} characters`);
                // Step 2: Parse resume with LLM
                console.log('🤖 Parsing resume with AI...');
                const resumeData = await LLMService.parseResumeToJSON(resumeText);

                console.log(`✓ Parsed resume data for ${resumeData.fullName}`);

                // Step 3: Generate portfolio HTML
                console.log('🎨 Generating portfolio HTML...');
                const portfolioHtml = PortfolioGenerator.generate(resumeData);

                // Step 4: Save HTML file
                const outputPath = path.join('uploads', fileName);
                fs.writeFileSync(outputPath, portfolioHtml);

                console.log(`✓ Portfolio saved to ${fileName}`);

                res.status(200).json({
                    success: true,
                    message: 'Portfolio generated successfully',
                    html: portfolioHtml,
                    fileName: fileName,
                    resumeData: resumeData,
                } as PortfolioResponse);

            } finally {
                // Clean up uploaded resume
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

        } catch (error) {
            console.error('❌ Error:', error);

            // Clean up file if exists
            if (req.file?.path && fs.existsSync(req.file.path)) {
                try {
                    fs.unlinkSync(req.file.path);
                } catch (e) {
                    console.error('Failed to clean up file:', e);
                }
            }

            res.status(500).json({
                success: false,
                message: 'Failed to generate portfolio',
                error: error instanceof Error ? error.message : 'Unknown error',
            } as PortfolioResponse);
        }
    }

    static async downloadPortfolio(req: Request, res: Response): Promise<void> {
        try {
            const { fileName } = req.params;

            if (!fileName) {
                res.status(400).json({
                    success: false,
                    message: 'File name required',
                });
                return;
            }

            const filePath = path.join('uploads', fileName);

            if (!fs.existsSync(filePath)) {
                res.status(404).json({
                    success: false,
                    message: 'File not found',
                });
                return;
            }

            res.download(filePath, 'portfolio.html', (err) => {
                if (err) {
                    console.error('Download error:', err);
                }
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Download failed',
            });
        }
    }

    static getHealth(req: Request, res: Response): void {
        res.status(200).json({
            success: true,
            message: 'Server is running',
            timestamp: new Date().toISOString(),
        });
    }
}