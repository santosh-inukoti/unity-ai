# Security Guidelines

## Environment Variables

**NEVER commit `.env` files to the repository.**

### Required Environment Variables

#### Backend (`backend/.env`)
- `JWT_SECRET`: Strong random string for JWT token signing
- `SESSION_SECRET`: Strong random string for session management
- `SSO_CERT`: Your SSO certificate (obtain from IT/Security team)

#### Frontend (`frontend/.env`)
- `REACT_APP_API_URL`: Backend API URL

### Setup Instructions

1. Copy `.env.example` to `.env` in both backend and frontend directories
2. Replace placeholder values with actual secrets
3. **Never share these values in Slack, email, or commit them to git**

## Production Deployment

- Use environment-specific secrets (different for dev/staging/prod)
- Rotate JWT secrets regularly
- Use HTTPS only in production
- Enable CORS only for trusted domains

## Reporting Security Issues

Contact the security team at security@enverus.com
