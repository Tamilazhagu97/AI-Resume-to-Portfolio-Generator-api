import * as fs from 'fs';
import * as path from 'path';
// import pdfParse from 'pdf-parse';

export class ResumeExtractor {
    static async extractText(filePath: string): Promise<string> {
        const ext = path.extname(filePath).toLowerCase();

        if (ext === '.pdf') {
            return this.extractPdfText(filePath);
        } else if (ext === '.docx') {
            return this.extractDocxText(filePath);
        } else if (ext === '.txt') {
            return this.extractTxtText(filePath);
        } else if (ext === '.doc') {
            return this.extractDocText(filePath);
        } else {
            throw new Error(`Unsupported file format: ${ext}`);
        }
    }

    private static async extractPdfText(filePath: string): Promise<string> {
        try {
            const fileBuffer = fs.readFileSync(filePath);
            const pdfParse = (await import('pdf-parse')).default;
            const data = await pdfParse(fileBuffer);
            return data.text || 'No text extracted';
        } catch (error) {
            throw new Error(`Failed to extract PDF: ${error}`);
        }
    }

    private static async extractDocxText(filePath: string): Promise<string> {
        try {
            const fileBuffer = fs.readFileSync(filePath);
            return await this.parseDocxBuffer(fileBuffer);
        } catch (error) {
            throw new Error(`Failed to extract DOCX: ${error}`);
        }
    }

    private static async parseDocxBuffer(buffer: Buffer): Promise<string> {
        try {
            const AdmZip = require('adm-zip');
            const zip = new AdmZip(buffer);
            const xmlEntry = zip.getEntry('word/document.xml');

            if (xmlEntry) {
                const xmlContent = zip.readAsText(xmlEntry);
                const textMatches = xmlContent.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
                return textMatches
                    .map((match: string) => match.replace(/<[^>]*>/g, ''))
                    .join(' ');
            }
            return '';
        } catch {
            return buffer.toString('utf-8');
        }
    }

    private static async extractDocText(filePath: string): Promise<string> {
        try {
            const fileBuffer = fs.readFileSync(filePath);
            return fileBuffer.toString('utf-8', 0, Math.min(fileBuffer.length, 100000));
        } catch (error) {
            throw new Error(`Failed to extract DOC: ${error}`);
        }
    }

    private static extractTxtText(filePath: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}