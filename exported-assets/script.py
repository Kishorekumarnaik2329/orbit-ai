import os
import json
from datetime import datetime

# Create the complete project structure
project_structure = {
    "package.json": {
        "name": "orbit-ai",
        "version": "1.0.0",
        "description": "All-in-One Student Productivity & Skill Ecosystem",
        "main": "index.js",
        "scripts": {
            "dev": "next dev",
            "build": "next build",
            "start": "next start",
            "lint": "next lint",
            "test": "jest",
            "test:e2e": "playwright test",
            "firebase:emulators": "firebase emulators:start",
            "deploy": "firebase deploy"
        },
        "dependencies": {
            "next": "^14.0.0",
            "react": "^18.0.0",
            "react-dom": "^18.0.0",
            "firebase": "^10.0.0",
            "firestore": "^1.1.6",
            "firebase-admin": "^11.0.0",
            "@monaco-editor/react": "^4.6.0",
            "jspdf": "^2.5.1",
            "html2canvas": "^1.4.1",
            "pptxgenjs": "^3.12.0",
            "eslint": "^8.0.0",
            "tailwindcss": "^3.3.0",
            "@tailwindcss/forms": "^0.5.6",
            "@headlessui/react": "^1.7.17",
            "@heroicons/react": "^2.0.18",
            "clsx": "^2.0.0",
            "lucide-react": "^0.263.1"
        },
        "devDependencies": {
            "@types/node": "^20.0.0",
            "@types/react": "^18.0.0",
            "@types/react-dom": "^18.0.0",
            "typescript": "^5.0.0",
            "eslint-config-next": "^14.0.0",
            "jest": "^29.0.0",
            "@testing-library/react": "^13.4.0",
            "@testing-library/jest-dom": "^6.1.0",
            "playwright": "^1.39.0",
            "@playwright/test": "^1.39.0",
            "autoprefixer": "^10.4.16",
            "postcss": "^8.4.31"
        },
        "engines": {
            "node": ">=18.0.0"
        }
    },
    
    "firebase.json": {
        "functions": {
            "source": "functions",
            "runtime": "nodejs18"
        },
        "firestore": {
            "rules": "firestore.rules",
            "indexes": "firestore.indexes.json"
        },
        "storage": {
            "rules": "storage.rules"
        },
        "hosting": {
            "public": "out",
            "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
            "rewrites": [
                {
                    "source": "**",
                    "destination": "/index.html"
                }
            ]
        },
        "emulators": {
            "functions": {
                "port": 5001
            },
            "firestore": {
                "port": 8080
            },
            "hosting": {
                "port": 5000
            },
            "storage": {
                "port": 9199
            }
        }
    },
    
    "next.config.js": """/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    HF_API_KEY: process.env.HF_API_KEY,
  }
}

module.exports = nextConfig""",

    "tailwind.config.js": """/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f8fafc',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}""",

    ".env.example": """# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBVipti42UJ66SMiK5gESpLx3ExFQzzab8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=orbit-ai-e7b03.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=orbit-ai-e7b03
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=orbit-ai-e7b03.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=721877008669
NEXT_PUBLIC_FIREBASE_APP_ID=1:721877008669:web:8c7244e814de656dcc61f4

# Hugging Face API Key (Server-side only)
HF_API_KEY=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

# Optional: Analytics
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-5TP9ESX5EF""",

    "firestore.rules": """rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Resumes - user specific
    match /resumes/{resumeId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Documents - user specific
    match /documents/{documentId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Presentations - user specific
    match /presentations/{presentationId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Invoices - user specific
    match /invoices/{invoiceId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Chat rooms - members can read/write
    match /chatRooms/{roomId} {
      allow read, write: if request.auth != null && request.auth.uid in resource.data.members;
      allow create: if request.auth != null;
      
      match /messages/{messageId} {
        allow read, write: if request.auth != null && request.auth.uid in get(/databases/$(database)/documents/chatRooms/$(roomId)).data.members;
        allow create: if request.auth != null;
      }
    }
    
    // Voice sessions - user specific
    match /voiceSessions/{sessionId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}""",

    "storage.rules": """rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Users can only access files in their own folder
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public portfolio files (read-only for others)
    match /portfolios/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}""",

    "firestore.indexes.json": {
        "indexes": [
            {
                "collectionGroup": "messages",
                "queryScope": "COLLECTION",
                "fields": [
                    {"fieldPath": "roomId", "order": "ASCENDING"},
                    {"fieldPath": "timestamp", "order": "DESCENDING"}
                ]
            },
            {
                "collectionGroup": "voiceSessions",
                "queryScope": "COLLECTION", 
                "fields": [
                    {"fieldPath": "userId", "order": "ASCENDING"},
                    {"fieldPath": "createdAt", "order": "DESCENDING"}
                ]
            }
        ],
        "fieldOverrides": []
    }
}

# Write main configuration files
for filename, content in project_structure.items():
    if isinstance(content, dict):
        with open(filename, 'w') as f:
            json.dump(content, f, indent=2)
    else:
        with open(filename, 'w') as f:
            f.write(content)

print("✅ Created main configuration files")