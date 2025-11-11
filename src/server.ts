// src/server.ts

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import uploadRoutes from './routes/upload';

// ✅ LOAD .env FIRST - BEFORE ANYTHING ELSE
const envPath = path.resolve(process.cwd(), '.env');
// console.log('\n📁 Looking for .env file at:', envPath);

if (fs.existsSync(envPath)) {
  // console.log('✅ .env file found - loading...');
  dotenv.config({ path: envPath, override: true });
} else {
  console.warn('⚠️ .env file NOT found at:', envPath);
  console.warn('📝 Please create .env file with:');
  console.warn('   GEMINI_API_KEY=hf_YOUR_TOKEN');
  console.warn('   PORT=3000');
}

// Debug: Show loaded environment variables
// console.log('\n🔑 Environment Variables Loaded:');
// console.log('   PORT:', process.env.PORT || '3100');
// console.log('   NODE_ENV:', process.env.NODE_ENV || 'development');
// console.log('   GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ SET' : '❌ NOT SET');
// console.log('   MAX_FILE_SIZE:', process.env.MAX_FILE_SIZE || '10485760');
// console.log('');

const app: Express = express();
const PORT = process.env.PORT || 3100;

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads', { recursive: true });
  console.log('📂 Created uploads directory');
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Static files
app.use(express.static('public'));

// Routes
app.use('/api', uploadRoutes);

// Home route with HTML form
app.get('/', (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume to Portfolio AI Generator</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .container {
          background: white;
          border-radius: 10px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 40px;
          max-width: 500px;
          width: 100%;
        }

        h1 {
          color: #667eea;
          margin-bottom: 10px;
          text-align: center;
          font-size: 2em;
        }

        .subtitle {
          text-align: center;
          color: #777;
          margin-bottom: 30px;
          font-size: 1.1em;
        }

        .upload-zone {
          border: 3px dashed #667eea;
          border-radius: 8px;
          padding: 40px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }

        .upload-zone:hover {
          background: #f8f9fa;
          border-color: #764ba2;
        }

        .upload-zone.active {
          background: #f0f4ff;
          border-color: #764ba2;
          transform: scale(1.02);
        }

        .upload-zone p:first-child {
          font-size: 3em;
          margin-bottom: 15px;
        }

        .upload-zone p {
          color: #333;
          margin-bottom: 5px;
        }

        #fileInput {
          display: none;
        }

        .file-info {
          font-size: 0.9em;
          color: #666;
          margin-top: 10px;
        }

        .file-name {
          color: #667eea;
          font-weight: bold;
          margin-top: 15px;
          font-size: 0.95em;
        }

        button {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1em;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        button:active:not(:disabled) {
          transform: translateY(0);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading {
          display: none;
          text-align: center;
          margin: 20px 0;
          padding: 20px;
          background: #f0f4ff;
          border-radius: 8px;
        }

        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .status-text {
          color: #667eea;
          font-weight: bold;
          margin-top: 15px;
        }

        .result {
          display: none;
          margin-top: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .result.success {
          border-left: 4px solid #4caf50;
          background: #f1f8f4;
        }

        .result.error {
          border-left: 4px solid #f44336;
          background: #fef5f5;
        }

        .result h3 {
          margin-bottom: 10px;
        }

        .success h3 {
          color: #4caf50;
        }

        .error h3 {
          color: #f44336;
        }

        .result p {
          color: #555;
          line-height: 1.6;
        }

        .btn-group {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .btn-group button {
          flex: 1;
          margin: 0;
          padding: 10px;
          font-size: 0.9em;
        }

        .info-box {
          background: #e3f2fd;
          border-left: 4px solid #667eea;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 20px;
          font-size: 0.9em;
          color: #333;
        }

        .info-box strong {
          color: #667eea;
        }

        @media (max-width: 600px) {
          .container {
            padding: 25px;
          }

          h1 {
            font-size: 1.5em;
          }

          .upload-zone {
            padding: 30px 15px;
          }

          .upload-zone p:first-child {
            font-size: 2em;
          }

          button {
            padding: 10px;
            font-size: 0.95em;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 AI Portfolio Generator</h1>
        <p class="subtitle">Transform Your Resume Into a Stunning Portfolio</p>

        <div class="info-box">
          <strong>ℹ️ How it works:</strong> Upload your resume (PDF, DOCX, DOC, or TXT) and our AI will automatically create a beautiful, professional portfolio website.
        </div>

        <div class="upload-zone" id="uploadZone">
          <p>📄</p>
          <p><strong>Click to upload or drag & drop</strong></p>
          <p class="file-info">PDF, DOCX, DOC or TXT (Max 10MB)</p>
          <input type="file" id="fileInput" accept=".pdf,.docx,.doc,.txt" />
        </div>

        <div class="file-name" id="fileName"></div>

        <button id="uploadBtn" disabled>✨ Generate Portfolio</button>

        <div class="loading" id="loading">
          <div class="spinner"></div>
          <p class="status-text" id="statusText">Processing your resume...</p>
        </div>

        <div class="result" id="result"></div>
      </div>

      <script>
        const uploadZone = document.getElementById('uploadZone');
        const fileInput = document.getElementById('fileInput');
        const uploadBtn = document.getElementById('uploadBtn');
        const loading = document.getElementById('loading');
        const statusText = document.getElementById('statusText');
        const result = document.getElementById('result');
        const fileNameDiv = document.getElementById('fileName');

        let selectedFile = null;

        // Click to upload
        uploadZone.addEventListener('click', () => fileInput.click());

        // File selection
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files?.[0];
          if (file) {
            selectedFile = file;
            fileNameDiv.textContent = '✓ Selected: ' + file.name;
            uploadBtn.disabled = false;
            uploadZone.classList.add('active');
          }
        });

        // Drag & drop
        uploadZone.addEventListener('dragover', (e) => {
          e.preventDefault();
          e.stopPropagation();
          uploadZone.classList.add('active');
        });

        uploadZone.addEventListener('dragleave', () => {
          uploadZone.classList.remove('active');
        });

        uploadZone.addEventListener('drop', (e) => {
          e.preventDefault();
          e.stopPropagation();
          uploadZone.classList.remove('active');

          const file = e.dataTransfer.files?.[0];
          if (file) {
            fileInput.files = e.dataTransfer.files;
            selectedFile = file;
            fileNameDiv.textContent = '✓ Selected: ' + file.name;
            uploadBtn.disabled = false;
          }
        });

        // Upload handler
        uploadBtn.addEventListener('click', async () => {
          if (!selectedFile) return;

          loading.style.display = 'block';
          result.style.display = 'none';
          uploadBtn.disabled = true;

          try {
            const formData = new FormData();
            formData.append('resume', selectedFile);

            statusText.textContent = '📄 Extracting resume text...';
            const response = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
            });

            const data = await response.json();
            loading.style.display = 'none';

            if (data.success) {
              result.className = 'result success';
              result.innerHTML = \`
                <h3>✅ Portfolio Generated Successfully!</h3>
                <p>Your portfolio for <strong>\${data.resumeData?.fullName || 'Your Name'}</strong> has been created.</p>
                <p style="margin-top: 10px; font-size: 0.9em; color: #777;">
                  The portfolio is fully responsive and includes all your professional information, experience, education, skills, and projects.
                </p>
                <div class="btn-group">
                  <button onclick="previewPortfolio()">👁️ Preview</button>
                  <button onclick="downloadPortfolio('\${data.fileName}')">⬇️ Download</button>
                </div>
              \`;
              window.portfolioData = data;
            } else {
              result.className = 'result error';
              result.innerHTML = \`
                <h3>❌ Error</h3>
                <p>\${data.error || data.message || 'An unexpected error occurred'}</p>
                <p style="margin-top: 10px; font-size: 0.9em;">Please try again or use a different resume file.</p>
              \`;
            }
            result.style.display = 'block';
          } catch (error) {
            loading.style.display = 'none';
            result.className = 'result error';
            result.innerHTML = \`
              <h3>❌ Connection Error</h3>
              <p>Failed to connect to the server. Please check your internet connection and try again.</p>
            \`;
            result.style.display = 'block';
          } finally {
            uploadBtn.disabled = false;
          }
        });

        window.previewPortfolio = function () {
          if (window.portfolioData?.html) {
            const blob = new Blob([window.portfolioData.html], {
              type: 'text/html',
            });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
          }
        };

        window.downloadPortfolio = function (fileName) {
          window.location.href = \`/api/download/\${fileName}\`;
        };
      </script>
    </body>
    </html>
  `);
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`
I Portfolio Generator Server                                       
   Server running on: http://localhost:${PORT}                                                         
   API Endpoints:                           
   POST   /api/upload      - Generate       
   GET    /api/download    - Download       
   GET    /api/health      - Health check                                           
   Environment:                             
   NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default app;