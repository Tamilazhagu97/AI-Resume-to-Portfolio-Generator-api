import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { ResumeExtractor } from '../services/resumeExtractor';
import { LLMService } from '../services/llmService';
import { PortfolioGenerator } from '../services/portfolioGenerator';
import { PortfolioResponse } from '../types';
import { bentoGrid, brutalistNeoBrutalism, defaultTheme, futuristic3D, glassmorphism, neonCyberpunk, newspaperVictorian, polaroidScrapbook, swissMinimal, terminalHacker } from '../templates';

export class UploadController {
    private static usedTemplates: Map<string, Set<number>> = new Map();

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
                // const portfolioHtml = PortfolioGenerator.generate(resumeData);
                const userIP = (req.ip || req.socket?.remoteAddress || 'unknown') as string;
                let used = UploadController.usedTemplates.get(userIP);
                if (!used) {
                    used = new Set<number>();
                    UploadController.usedTemplates.set(userIP, used);
                }
                const templates = [defaultTheme, bentoGrid, brutalistNeoBrutalism, futuristic3D, glassmorphism, neonCyberpunk, newspaperVictorian, polaroidScrapbook, swissMinimal, terminalHacker];
                const availableIndices = templates.map((_, i) => i).filter(i => !used.has(i));
                let randomTemplate: number;
                if (availableIndices.length > 0) {
                    randomTemplate = availableIndices[Math.floor(Math.random() * availableIndices.length)];
                } else {
                    // All templates used, reset and pick random
                    used.clear();
                    randomTemplate = Math.floor(Math.random() * templates.length);
                }
                used.add(randomTemplate);
                const portfolioHtml = PortfolioGenerator.generate(resumeData, randomTemplate);
                // Step 4: Save HTML file
                const fileName = `${resumeData.fullName}_${Date.now()}.html`;
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

    // ✅ NEW: Preview portfolio in browser
    static async previewPortfolio(req: Request, res: Response): Promise<void> {
        try {
            const { fileName } = req.params;

            if (!fileName) {
                res.status(400).json({
                    success: false,
                    message: 'File name required',
                });
                return;
            }

            // Validate fileName to prevent directory traversal
            if (fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid file name',
                });
                return;
            }

            const filePath = path.join('uploads', fileName);

            if (!fs.existsSync(filePath)) {
                res.status(404).json({
                    success: false,
                    message: 'Portfolio not found',
                });
                return;
            }

            // Read HTML file
            const htmlContent = fs.readFileSync(filePath, 'utf-8');

            // Set headers for browser display
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.setHeader('Content-Disposition', 'inline'); // Display in browser, not download
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

            // Send HTML content
            res.send(htmlContent);

            console.log(`✓ Portfolio previewed: ${fileName}`);
        } catch (error) {
            console.error('Preview error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to preview portfolio',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }

    // ✅ Download portfolio as file
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

            // Validate fileName to prevent directory traversal
            if (fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid file name',
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
                } else {
                    console.log(`✓ Portfolio downloaded: ${fileName}`);
                }
            });
        } catch (error) {
            console.error('Download error:', error);
            res.status(500).json({
                success: false,
                message: 'Download failed',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }

    // ✅ Health check
    static getHealth(req: Request, res: Response): void {
        res.status(200).json({
            success: true,
            message: 'Server is running',
            timestamp: new Date().toISOString(),
        });
    }

    static templateCheck(req: Request, res: Response): void {
        const resumeData = req.body;
        const portfolioHtml = PortfolioGenerator.checkGenerate(resumeData);
        // Step 4: Save HTML file
        const fileName = `${resumeData.fullName}_${Date.now()}.html`;
        const outputPath = path.join('uploads', fileName);
        fs.writeFileSync(outputPath, portfolioHtml);

        console.log(`✓ Portfolio saved to ${fileName}`);
        res.send(portfolioHtml);
    }
}