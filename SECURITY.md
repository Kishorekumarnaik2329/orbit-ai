# Security Policy

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
