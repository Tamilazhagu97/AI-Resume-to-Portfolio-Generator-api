import { Router } from 'express';
import multer from 'multer';
import { UploadController } from '../controllers/uploadController';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads', { recursive: true });
        }
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760') },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword',
            'text/plain',
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF, DOCX, DOC, and TXT allowed.'));
        }
    },
});

import * as fs from 'fs';

// POST /api/upload - Generate portfolio from resume
router.post('/upload', upload.single('resume'), UploadController.generatePortfolio);

// ✅ GET /api/preview/:fileName - Preview portfolio in browser
router.get('/preview/:fileName', UploadController.previewPortfolio);

// GET /api/download/:fileName - Download generated portfolio
router.get('/download/:fileName', UploadController.downloadPortfolio);

// GET /api/health - Health check
router.get('/health', UploadController.getHealth);

router.post('/check', UploadController.templateCheck)
export default router;