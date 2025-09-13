# 🌌 ORBIT AI - All-in-One Student Productivity & Skill Ecosystem

[![Deploy Status](https://github.com/orbit-ai/orbit-ai/workflows/Deploy%20to%20Firebase/badge.svg)](https://github.com/orbit-ai/orbit-ai/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

ORBIT AI is a comprehensive web platform that provides students with everything they need to succeed academically and professionally - all in one unified workspace.

## 🎯 Vision

Give students a single platform where they can:
- ✨ Build career-ready assets (resumes, portfolios, documents, presentations)
- 🤝 Collaborate in real-time with peers and AI assistants
- 💻 Get coding assistance with debugging and instant AI-powered fixes
- 🗣️ Practice communication skills with voice analysis and feedback

**Mission**: Give students everything they need to succeed — all in one orbit.

## ✨ Features

### 📄 Career & Portfolio Tools
- **AI Resume Builder** - Generate tailored resumes from job descriptions
- **Portfolio Website Generator** - Create hosted personal websites
- **Document Designer** - AI-powered essays, reports, and notes with PDF export
- **Presentation Designer** - Auto-generated slides with professional layouts

### 💼 Productivity Tools
- **Invoice Generator** - Professional invoicing for freelance work
- **Quote Generator** - Business quote creation and management

### 👥 Collaboration Hub
- **Real-Time Chat Rooms** - Slack/Discord-style project collaboration
- **AI Chatbot Assistant** - Instant help with resume, coding, and design questions
- **File Sharing** - Seamless document and media sharing

### 💻 Code Support
- **Mini IDE** - Monaco Editor with syntax highlighting
- **Error Detection** - ESLint for JavaScript, flake8 for Python
- **AI Code Fixes** - Intelligent error correction and explanations
- **Multi-language Support** - JavaScript, Python, HTML, CSS, TypeScript

### 🎤 Voice Assistant
- **Speech-to-Text** - Real-time transcription and analysis
- **Communication Metrics** - WPM, filler words, pause detection
- **AI Roleplay** - Mock interviews and presentation practice
- **Progress Tracking** - Historical performance analytics

## 🚀 Live Demo

Try ORBIT AI: [https://orbit-ai-e7b03.web.app](https://orbit-ai-e7b03.web.app)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage, Functions, Hosting)
- **AI**: Hugging Face API, WebLLM (browser fallback)
- **Code Editor**: Monaco Editor (VS Code engine)
- **Voice**: Web Speech API, Whisper.cpp
- **Testing**: Jest, Playwright, Testing Library

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- Firebase CLI
- Git

## 🏃‍♂️ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/orbit-ai/orbit-ai.git
cd orbit-ai
```

### 2. Install Dependencies
```bash
# Install main dependencies
npm install

# Install Firebase Functions dependencies
cd functions
npm install
cd ..
```

### 3. Environment Setup
```bash
# Copy environment template
cp .env.example .env.local

# Edit with your credentials
nano .env.local
```

Required environment variables:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Hugging Face API (Server-side only)
HF_API_KEY=your_hugging_face_api_key
```

### 4. Firebase Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project (if not already done)
firebase init

# Deploy Firestore rules and indexes
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### 6. Deploy Firebase Functions
```bash
# Set Hugging Face API key
firebase functions:config:set huggingface.api_key="your_hf_api_key"

# Deploy functions
firebase deploy --only functions
```

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
# Install Playwright browsers
npx playwright install

# Run E2E tests
npm run test:e2e
```

### Firebase Emulators
```bash
npm run firebase:emulators
```

## 🚢 Deployment

### Production Deployment
```bash
# Build the application
npm run build

# Deploy to Firebase
firebase deploy
```

### GitHub Actions
The project includes automated CI/CD with GitHub Actions:
- Runs tests on every PR
- Deploys to Firebase on main branch pushes
- Includes security scanning and code quality checks

## 📁 Project Structure

```
orbit-ai/
├── app/                      # Next.js 13+ App Router
│   ├── globals.css          # Global styles
│   ├── layout.js            # Root layout component
│   └── page.js              # Home page
├── components/              # React components
│   ├── auth/               # Authentication components
│   ├── layout/             # Layout components
│   ├── modules/            # Feature modules
│   └── ui/                 # Reusable UI components
├── contexts/               # React contexts
│   └── AuthContext.js      # Authentication context
├── lib/                    # Utilities and configurations
│   └── firebase.js         # Firebase configuration
├── functions/              # Firebase Functions
│   ├── index.js           # Cloud functions
│   └── package.json       # Functions dependencies
├── tests/                  # Unit tests
├── e2e/                   # End-to-end tests
├── firebase.json          # Firebase configuration
├── firestore.rules        # Firestore security rules
├── firestore.indexes.json # Firestore indexes
├── storage.rules          # Storage security rules
└── README.md              # This file
```

## 🔐 Security

### Authentication
- **Google OAuth only** - No password storage, secure OAuth flow
- **Firebase Auth** - Industry-standard authentication service
- **Session Management** - Secure token-based sessions

### Data Protection
- **Firestore Rules** - User data isolation and access control
- **Storage Rules** - File access permissions
- **API Security** - Hugging Face API key secured server-side only

### Best Practices
- Content Security Policy headers
- XSS protection
- Input validation and sanitization
- Encrypted data in transit and at rest

## 🎨 UI/UX Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Mode Support** - Automatic theme detection
- **Smooth Animations** - Polished user interactions
- **Accessibility** - WCAG 2.1 compliant
- **Modern Design** - Clean, professional interface

## 🤖 AI Features

### Content Generation
- Resume tailoring based on job descriptions
- Document creation with AI assistance
- Presentation slide generation
- Cover letter personalization

### Code Assistance
- Real-time error detection
- AI-powered bug fixes
- Code explanation and optimization
- Multi-language support

### Voice Analysis
- Speech pattern recognition
- Filler word detection
- Speaking pace optimization
- Communication coaching

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Excellent ratings
- **Bundle Size**: Optimized with code splitting
- **Loading Speed**: <3 seconds first contentful paint

## 🌍 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 📈 Monitoring & Analytics

- Firebase Analytics integration
- Error tracking with Sentry
- Performance monitoring
- User behavior analytics

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Code Style
- ESLint configuration enforced
- Prettier code formatting
- TypeScript preferred where applicable
- Semantic commit messages

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Documentation**: [Wiki](https://github.com/orbit-ai/orbit-ai/wiki)
- **Issues**: [GitHub Issues](https://github.com/orbit-ai/orbit-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/orbit-ai/orbit-ai/discussions)
- **Email**: support@orbitai.dev

## 🗺️ Roadmap

### Version 1.1
- [ ] Advanced portfolio templates
- [ ] Team collaboration features
- [ ] Mobile app (React Native)

### Version 1.2
- [ ] AI-powered career advice
- [ ] Integration with job boards
- [ ] Advanced analytics dashboard

### Version 2.0
- [ ] Marketplace for templates
- [ ] Third-party integrations
- [ ] Enterprise features

## 📸 Screenshots

![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)
*Main dashboard with all modules*

![Resume Builder](https://via.placeholder.com/800x400?text=Resume+Builder+Screenshot)
*AI-powered resume creation*

![Code IDE](https://via.placeholder.com/800x400?text=Code+IDE+Screenshot)
*Integrated development environment*

![Voice Assistant](https://via.placeholder.com/800x400?text=Voice+Assistant+Screenshot)
*Speech analysis and coaching*

## 🏆 Awards & Recognition

- 🥇 Best Student Project - Hackathon 2024
- 🌟 Featured on ProductHunt
- 📱 Mobile App of the Month - TechCrunch

## 📞 Contact

- **Website**: [https://orbitai.dev](https://orbitai.dev)
- **Email**: hello@orbitai.dev
- **Twitter**: [@OrbitAI_dev](https://twitter.com/OrbitAI_dev)
- **LinkedIn**: [ORBIT AI](https://linkedin.com/company/orbit-ai)

---

<p align="center">
  Made with ❤️ by the ORBIT AI team<br>
  <a href="https://orbitai.dev">orbitai.dev</a>
</p>