# 🚀 AI Resume to Portfolio Generator

Transform your resume into a stunning, professional portfolio website with AI-powered parsing and generation.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-yellow)](https://expressjs.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-orange)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-red)](LICENSE)

## ✨ Features

- 📄 **Multi-Format Support** - Upload PDF, DOCX, DOC, or TXT resumes
- 🤖 **AI-Powered Parsing** - Google Gemini AI extracts and structures resume data
- 🎨 **Beautiful Design** - Modern, responsive portfolio with gradient backgrounds
- 📱 **Mobile Optimized** - Perfect viewing on all devices
- ⚡ **Fast & Reliable** - 4-model fallback system ensures success
- 💰 **100% Free** - Uses Google's free tier API
- 🔄 **Smart Fallback** - Switches to regex parser if API fails
- 📥 **Easy Download** - Save portfolio as standalone HTML

## 🎯 What It Does

1. **Upload Resume** - Drag & drop or click to upload
2. **AI Parsing** - Google Gemini extracts structured data
3. **Portfolio Generation** - Creates beautiful HTML portfolio
4. **Download** - Get standalone HTML file or preview online

### Extracted Data
- ✅ Full name, email, phone, location
- ✅ Professional summary
- ✅ Work experience with highlights
- ✅ Education details
- ✅ Skills (categorized by type)
- ✅ Key projects with technologies
- ✅ Certifications
- ✅ Social media links (LinkedIn, GitHub)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Google API Key (free from https://ai.google.dev/)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/resume-portfolio-generator.git
cd resume-portfolio-generator

# Install dependencies
npm install

# Create .env file
cat > .env << 'EOF'
PORT=3300
HUGGINGFACE_API_KEY=AIzaSyD_YOUR_GOOGLE_API_KEY
NODE_ENV=development
MAX_FILE_SIZE=10485760
EOF

# Start development server
npm run dev
```

Visit: **http://localhost:3300**

## 📋 Setup Guide

### Step 1: Get Google API Key

1. Visit https://ai.google.dev/
2. Click "Get API Key"
3. Select "Create API Key in new project"
4. Copy the generated API key

### Step 2: Configure Environment

Create `.env` file in project root:

```properties
PORT=3300
HUGGINGFACE_API_KEY=AIzaSyD_YOUR_API_KEY_HERE
NODE_ENV=development
MAX_FILE_SIZE=10485760
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Run Server

```bash
npm run dev
```

Open your browser and visit: `http://localhost:3300`

## 📁 Project Structure

```
resume-portfolio-generator/
├── src/
│   ├── services/
│   │   ├── resumeExtractor.ts      # PDF/DOCX/TXT extraction
│   │   ├── llmService.ts           # Google Gemini AI integration
│   │   └── portfolioGenerator.ts   # HTML generation
│   ├── controllers/
│   │   └── uploadController.ts     # Request handlers
│   ├── routes/
│   │   └── upload.ts               # API endpoints
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   └── server.ts                   # Express app
├── uploads/                        # Generated portfolios
├── .env                           # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🔌 API Endpoints

### Upload & Generate Portfolio
```
POST /api/upload
Content-Type: multipart/form-data

Form Data:
- resume: (file) - PDF, DOCX, DOC, or TXT

Response:
{
  "success": true,
  "message": "Portfolio generated successfully",
  "html": "<html>...</html>",
  "fileName": "1762663396621.html",
  "resumeData": { ... }
}
```

### Download Portfolio
```
GET /api/download/:fileName

Example:
GET /api/download/1762663396621.html
```

### Health Check
```
GET /api/health

Response:
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-10T12:00:00.000Z"
}
```

## 📊 How It Works

```
User Upload
    ↓
Resume Extraction (PDF/DOCX/TXT → Text)
    ↓
Google Gemini AI Parsing (Text → JSON)
    ↓
Portfolio HTML Generation
    ↓
Download or Preview
```

## 🤖 AI Integration

### Supported Models (Auto-Fallback)

1. **Google Gemini 1.5 Flash** - Fastest
2. **Google Gemini 2.0 Flash** - Latest
3. **Google Gemini Pro** - Stable
4. **Google Gemini 1.5 Pro** - Most Powerful
5. **Regex Parser** - Local fallback (no API)

The system automatically tries each model until one succeeds!

## 🎨 Portfolio Features

### Design
- ✨ Modern gradient background
- 📱 Fully responsive layout
- ⚡ Smooth animations
- 🎯 Professional typography
- 💼 Clean section organization

### Sections
- Header with name and contact info
- Professional summary
- Work experience with highlights
- Education details
- Categorized skills
- Key projects
- Certifications
- Social media links

### Customization

Edit colors in `src/services/portfolioGenerator.ts`:

```typescript
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// Change these hex colors to customize
```

## 🧪 Testing

### Test with Sample Resume

```bash
# Start server
npm run dev

# Open browser
open http://localhost:3300

# Upload a PDF/DOCX resume
# Click "Generate Portfolio"
# View or download the generated portfolio
```

### API Testing with cURL

```bash
# Upload resume
curl -X POST http://localhost:3300/api/upload \
  -F "resume=@resume.pdf"

# Download portfolio
curl http://localhost:3300/api/download/1762663396621.html > portfolio.html

# Health check
curl http://localhost:3300/api/health
```

### JavaScript Example

```javascript
const formData = new FormData();
formData.append('resume', fileInput.files[0]);

fetch('http://localhost:3300/api/upload', {
  method: 'POST',
  body: formData
})
  .then(res => res.json())
  .then(data => {
    console.log('Portfolio generated!');
    console.log('Download link:', data.fileName);
  })
  .catch(err => console.error('Error:', err));
```

### Python Example

```python
import requests

def generate_portfolio(resume_path):
    with open(resume_path, 'rb') as f:
        files = {'resume': f}
        response = requests.post(
            'http://localhost:3300/api/upload',
            files=files
        )
    return response.json()

result = generate_portfolio('resume.pdf')
print(result)
```

## ⚙️ Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3300 | Server port |
| `HUGGINGFACE_API_KEY` | - | Google API Key (required) |
| `NODE_ENV` | development | Environment mode |
| `MAX_FILE_SIZE` | 10485760 | Max upload size (10MB) |

### Advanced Configuration

#### Use Local Parser Only (No API)

Edit `src/services/llmService.ts`:

```typescript
private static readonly USE_LOCAL_PARSER = true;
```

#### Change Default Port

Edit `.env`:

```properties
PORT=8080
```

#### Increase Upload Size

Edit `.env`:

```properties
MAX_FILE_SIZE=52428800  # 50MB
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **404 API Error** | Verify Google API key in `.env` |
| **Port already in use** | Change `PORT` in `.env` |
| **File upload fails** | Ensure file is PDF/DOCX/DOC/TXT |
| **Empty portfolio data** | Try different resume format |
| **Module not found** | Run `npm install` |
| **TypeScript errors** | Run `npm run build` to check |
| **HUGGINGFACE_API_KEY not set** | Check `.env` file in project root |
| **"n" character issue in resume** | This is normal - system strips formatting characters |

## 📝 Script Commands

```bash
# Development with hot-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run production build
npm start

# Run tests (if added)
npm test
```

## 📦 Dependencies

### Core
- **express** - Web framework
- **typescript** - Type safety
- **axios** - HTTP client
- **multer** - File uploads
- **cors** - Cross-origin requests

### File Processing
- **pdf-parse** - PDF extraction
- **adm-zip** - DOCX handling
- **dotenv** - Environment variables

### Development
- **ts-node** - TypeScript execution
- **nodemon** - Auto-reload
- **@types/** - Type definitions

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Google Generative AI for Gemini API
- Express.js community
- TypeScript team
- All contributors

## 📞 Support

For issues and questions:

1. Check [Troubleshooting](#-troubleshooting) section
2. Review [GitHub Issues](https://github.com/yourusername/resume-portfolio-generator/issues)
3. Create new issue with details

## 🔒 Security

- Environment variables stored in `.env` (not committed)
- File uploads validated by type and size
- No sensitive data stored
- CORS enabled for frontend integration
- API key not exposed in frontend

## 💡 Tips

1. **Best Results** - Use well-formatted resumes
2. **API Limits** - Google free tier: 15 requests/minute
3. **Fallback** - System automatically uses regex if API fails
4. **Customization** - Edit HTML in `portfolioGenerator.ts`
5. **Multiple Uploads** - Each generates unique file
6. **Clean Files** - Check `uploads/` folder periodically

## 📚 How to Use

### For First-Time Users

1. Ensure Node.js is installed: `node --version`
2. Follow the Quick Start section above
3. Open http://localhost:3300 in browser
4. Upload your resume (PDF works best)
5. Click "Generate Portfolio"
6. Download or preview your portfolio

### For Developers

1. Explore `src/` directory structure
2. Modify styles in `portfolioGenerator.ts`
3. Add new sections or fields as needed
4. Test with `npm run dev`
5. Build with `npm run build`

## 🌟 File Size Limits

- Default: 10MB
- Change in `.env`: `MAX_FILE_SIZE=52428800` (50MB)

## 🎓 Key Technologies

- **TypeScript** - Type-safe code
- **Express.js** - Backend framework
- **Google Gemini AI** - Resume parsing
- **Responsive CSS** - Beautiful UI
- **Multer** - File upload handling
- **Axios** - HTTP requests

## 🚀 What's Next?

After generating your portfolio:

1. **Download** - Save as HTML file
2. **Share** - Send link to friends/recruiters
3. **Customize** - Edit HTML colors and sections
4. **Host** - Upload to web hosting service
5. **Update** - Generate new version anytime

## 📖 Documentation

Each TypeScript file includes detailed comments:
- `resumeExtractor.ts` - File parsing logic
- `llmService.ts` - AI integration
- `portfolioGenerator.ts` - HTML generation
- `uploadController.ts` - Request handling

## ⚡ Performance Tips

1. Use smaller resume files (<5MB)
2. Close other applications to free memory
3. Restart server if issues persist
4. Clear browser cache if styles don't update
5. Use Chrome/Firefox for best compatibility

---

## Made with ❤️ by Tamilazhagu

**Version:** 1.0.0  
**Last Updated:** 2024  
**Status:** ✅ Production Ready

---

## Quick Links

- 📖 [Full Documentation](./docs/)
- 🐛 [Report Bug](https://github.com/yourusername/resume-portfolio-generator/issues)
- 💬 [Discussions](https://github.com/yourusername/resume-portfolio-generator/discussions)
- 🌐 [Google Gemini API](https://ai.google.dev/)

Enjoy creating beautiful portfolios! 🚀✨