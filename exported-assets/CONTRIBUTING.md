# Contributing to ORBIT AI

We welcome contributions to ORBIT AI! Here's how you can help:

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/orbit-ai.git
   cd orbit-ai
   ```

3. Install dependencies:
   ```bash
   npm install
   cd functions && npm install && cd ..
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Fill in your Firebase and Hugging Face credentials
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
orbit-ai/
├── app/                 # Next.js 13+ app directory
├── components/          # React components
├── contexts/           # React contexts
├── lib/               # Utilities and configurations  
├── functions/         # Firebase Functions
├── tests/            # Unit tests
├── e2e/             # End-to-end tests
└── docs/            # Documentation
```

## Code Style

- Use TypeScript where possible
- Follow ESLint configuration
- Write tests for new features
- Use semantic commit messages

## Submitting Changes

1. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. Make your changes
3. Add tests if needed
4. Run tests:
   ```bash
   npm test
   npm run test:e2e
   ```

5. Commit your changes:
   ```bash
   git commit -m "feat: add amazing feature"
   ```

6. Push and create a pull request

## Code of Conduct

Please be respectful and inclusive in all interactions.
