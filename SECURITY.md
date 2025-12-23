# Security Guidelines

## Environment Variables

**NEVER commit `.env` files to the repository.**

### Required Environment Variables

#### Backend (`backend/.env`)
```env
PORT=3001
NODE_ENV=development
JWT_SECRET=<strong-random-string>
SESSION_SECRET=<strong-random-string>
FRONTEND_URL=http://localhost:3000

# Production SSO (when ready)
SSO_ENTRY_POINT=https://sso.enverus.com/auth
SSO_ISSUER=unity-ai
SSO_CALLBACK_URL=https://unity-ai.enverus.com/auth/callback
SSO_CERT=<certificate-from-it>
```

#### Frontend (`frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:3001
```

### Generating Secure Secrets

For production, generate strong secrets:

```bash
# JWT Secret (256-bit)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Session Secret (256-bit)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Authentication

### Current Implementation (Mock SSO)

- Accepts any `@enverus.com` email
- Team assignment from backend database
- Admin role for elevated permissions
- JWT tokens with 24-hour expiration

**⚠️ This is for development only. Do not use in production.**

### Production Requirements

1. **Replace Mock SSO**
   - Integrate with real Enverus SSO provider
   - Use SAML 2.0 or OAuth2
   - Obtain SSO certificate from IT team
   - Update `backend/src/routes/auth.js`

2. **Team Assignment**
   - Teams should come from SSO response or company directory
   - Store team mappings in secure database
   - Validate team membership on each request

3. **Admin Permissions**
   - Define admin users in secure database
   - Implement role-based access control (RBAC)
   - Audit admin actions

## API Security

### Current Protections

- JWT token verification on protected routes
- Team-based authorization for agent access
- CORS configured for localhost

### Production Enhancements Needed

```javascript
// Add to backend/src/index.js

// 1. Helmet for security headers
const helmet = require('helmet');
app.use(helmet());

// 2. Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// 3. Input validation
const { body, validationResult } = require('express-validator');

// 4. SQL injection prevention
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());

// 5. XSS protection
const xss = require('xss-clean');
app.use(xss());
```

## Data Protection

### Sensitive Data

Never commit:
- `.env` files
- JWT secrets
- Session secrets
- API keys
- Database credentials
- SSO certificates
- User passwords

### User Data

- Passwords should never be stored (SSO handles authentication)
- User sessions expire after 24 hours
- JWT tokens stored in localStorage (consider httpOnly cookies for production)

## HTTPS/TLS

### Development
- HTTP is acceptable for localhost

### Production Requirements
- HTTPS must be enabled for all traffic
- Obtain SSL/TLS certificates
- Configure secure cookie flags
- Enable HSTS headers
- Redirect all HTTP to HTTPS

## CORS Configuration

### Development
```javascript
cors({
  origin: 'http://localhost:3000',
  credentials: true
})
```

### Production
```javascript
cors({
  origin: 'https://unity-ai.enverus.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})
```

## Admin Access

### Current Admins
- santosh.inukoti@enverus.com

### Admin Capabilities
- View agents from all teams
- Switch between teams in Settings
- Access to all features

### Adding Admins

Update `backend/src/routes/auth.js`:
```javascript
const mockUsers = {
  'admin@enverus.com': {
    team: 'Executive',
    isAdmin: true,
    name: 'Admin User'
  }
};
```

For production, store admin list in secure database.

## Audit Logging

### Recommended Logging

Log the following events:
- Login attempts (success/failure)
- Team changes
- Admin actions
- Agent access
- API errors
- Security violations

### Implementation

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Log authentication events
logger.info('User login', { email, team, timestamp: new Date() });
```

## Vulnerability Management

### Regular Updates
- Keep dependencies up to date
- Run `npm audit` regularly
- Update Node.js to latest LTS version

### Security Scanning
```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Check for outdated packages
npm outdated
```

## Incident Response

### If Security Issue Discovered

1. **Immediately notify:**
   - security@enverus.com
   - IT Security Team
   - Project maintainers

2. **Do not:**
   - Share details publicly
   - Commit fixes without review
   - Ignore or downplay the issue

3. **Document:**
   - What was discovered
   - Potential impact
   - Steps taken to remediate

## Production Security Checklist

Before deploying to production:

- [ ] Replace mock SSO with real Enverus SSO
- [ ] Generate strong production secrets
- [ ] Enable HTTPS only
- [ ] Configure production CORS
- [ ] Add rate limiting
- [ ] Implement request validation
- [ ] Add security headers (helmet.js)
- [ ] Enable audit logging
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure session management
- [ ] Add IP whitelisting (if applicable)
- [ ] Set up DDoS protection
- [ ] Configure backup and recovery
- [ ] Conduct security penetration testing
- [ ] Train users on security best practices

## Contact

**Security Issues:** security@enverus.com  
**Technical Support:** IT Support Team  
**Project Maintainer:** Santosh Inukoti (santosh.inukoti@enverus.com)

---

**Last Updated:** January 2025  
**Version:** 1.0.0
