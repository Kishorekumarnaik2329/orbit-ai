# Create test files and documentation
final_files = {
    # Test files
    "tests/auth.test.js": """import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginPage from '@/components/auth/LoginPage'
import { AuthProvider } from '@/contexts/AuthContext'

// Mock Firebase
jest.mock('@/lib/firebase', () => ({
  auth: {},
  googleProvider: {},
  signInWithPopup: jest.fn(),
}))

const MockAuthProvider = ({ children, mockUser = null }) => (
  <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn(), loading: false }}>
    {children}
  </AuthProvider>
)

describe('Authentication', () => {
  test('renders login page when user not authenticated', () => {
    render(
      <MockAuthProvider>
        <LoginPage />
      </MockAuthProvider>
    )
    
    expect(screen.getByText('ORBIT AI')).toBeInTheDocument()
    expect(screen.getByText('Continue with Google')).toBeInTheDocument()
  })

  test('shows loading state during sign in', async () => {
    render(
      <MockAuthProvider>
        <LoginPage />
      </MockAuthProvider>
    )
    
    const signInButton = screen.getByText('Continue with Google')
    fireEvent.click(signInButton)
    
    await waitFor(() => {
      expect(screen.getByText('Signing in...')).toBeInTheDocument()
    })
  })
})""",

    "tests/dashboard.test.js": """import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Dashboard from '@/components/Dashboard'
import { AuthProvider } from '@/contexts/AuthContext'

const MockAuthProvider = ({ children, mockUser = { displayName: 'Test User' } }) => (
  <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn(), loading: false }}>
    {children}
  </AuthProvider>
)

describe('Dashboard', () => {
  test('renders dashboard with all modules', () => {
    render(
      <MockAuthProvider>
        <Dashboard />
      </MockAuthProvider>
    )
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Resume Builder')).toBeInTheDocument()
    expect(screen.getByText('Code IDE')).toBeInTheDocument()
    expect(screen.getByText('Voice Assistant')).toBeInTheDocument()
  })
})""",

    "playwright.config.js": """import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});""",

    "e2e/orbit-flow.spec.js": """import { test, expect } from '@playwright/test';

test.describe('ORBIT AI E2E Flow', () => {
  test('complete user journey', async ({ page }) => {
    // Navigate to app
    await page.goto('/');
    
    // Should show login page
    await expect(page.getByText('ORBIT AI')).toBeVisible();
    await expect(page.getByText('Continue with Google')).toBeVisible();
    
    // Mock login (in real test, would use test auth)
    await page.evaluate(() => {
      localStorage.setItem('orbitai_user', JSON.stringify({
        uid: 'test-user',
        displayName: 'Test User',
        email: 'test@example.com',
        photoURL: ''
      }));
    });
    
    // Reload to trigger auth state
    await page.reload();
    
    // Should now show dashboard
    await expect(page.getByText('Welcome back')).toBeVisible();
    await expect(page.getByText('Resume Builder')).toBeVisible();
    
    // Test navigation to Resume Builder
    await page.getByText('Resume Builder').first().click();
    await expect(page.getByText('Create professional resumes')).toBeVisible();
    
    // Test navigation to Code IDE
    await page.getByText('Code IDE').first().click();
    await expect(page.getByText('Write code with AI-powered debugging')).toBeVisible();
    
    // Test Voice Assistant
    await page.getByText('Voice Practice').first().click();
    await expect(page.getByText('Practice speaking and get AI-powered feedback')).toBeVisible();
  });
});""",

    # GitHub Actions
    ".github/workflows/deploy.yml": """name: Deploy to Firebase

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run E2E tests
      run: |
        npm run build
        npx playwright install
        npm run test:e2e

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build project
      run: npm run build
      env:
        NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ${{ secrets.FIREBASE_STORAGE_BUCKET }}
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}
        NEXT_PUBLIC_FIREBASE_APP_ID: ${{ secrets.FIREBASE_APP_ID }}
    
    - name: Deploy to Firebase
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: ${{ secrets.GITHUB_TOKEN }}
        firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
        projectId: orbit-ai-e7b03
        channelId: live""",

    # Jest configuration
    "jest.config.js": """const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/contexts/(.*)$': '<rootDir>/contexts/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)""",

    "jest.setup.js": """import '@testing-library/jest-dom'

// Mock Firebase
jest.mock('./lib/firebase', () => ({
  auth: {},
  db: {},
  storage: {},
  functions: {},
  googleProvider: {},
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}))

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))""",

    # Additional documentation files
    "functions/README.md": """# ORBIT AI Firebase Functions

This directory contains Firebase Functions for ORBIT AI's server-side operations.

## Functions

### AI Generation Functions
- `generateResume` - Generates resume content using Hugging Face API
- `generateDocument` - Creates documents with AI assistance
- `generatePresentation` - Generates presentation slides
- `fixCode` - Provides AI-powered code fixes
- `chatWithAI` - AI chatbot responses
- `analyzeVoice` - Voice analysis and feedback

## Setup

1. Install dependencies:
   ```bash
   cd functions
   npm install
   ```

2. Set environment variables:
   ```bash
   firebase functions:config:set huggingface.api_key="your-hf-api-key"
   ```

3. Deploy functions:
   ```bash
   firebase deploy --only functions
   ```

## Environment Variables

- `HF_API_KEY` - Hugging Face API key for AI processing

## Rate Limiting

Functions implement basic rate limiting and request queuing to handle Hugging Face API limits.

## Error Handling

All functions include comprehensive error handling with fallback responses when AI services are unavailable.
""",

    "SECURITY.md": """# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please send an email to security@orbitai.dev. 

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will respond within 48 hours and provide regular updates on our progress.

## Security Measures

### Authentication
- Google OAuth only (no password storage)
- Firebase Authentication handles all auth flows
- Secure session management

### Data Protection
- User data isolated by Firebase security rules
- No sensitive data stored client-side
- Encrypted in transit and at rest

### API Security  
- Hugging Face API key stored server-side only
- Rate limiting implemented
- Input validation on all endpoints

### Client Security
- Content Security Policy headers
- XSS protection
- Secure cookie settings
""",

    "CONTRIBUTING.md": """# Contributing to ORBIT AI

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
""",
}

# Create directories and files
import os

# Create additional directories
additional_dirs = ['tests', 'e2e', '.github/workflows', 'docs']
for directory in additional_dirs:
    os.makedirs(directory, exist_ok=True)

# Write final files
for filepath, content in final_files.items():
    with open(filepath, 'w') as f:
        f.write(content)

print("✅ Created test files, workflows, and documentation")