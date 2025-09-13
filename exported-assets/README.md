# ORBIT AI Firebase Functions

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
