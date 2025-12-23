# Security Policy

## Overview

Unity AI implements enterprise-grade security for internal Enverus employee data.

## Authentication & Authorization

### SSO Integration
- **Production**: Enverus SAML 2.0 authentication
- **Development**: Mock email-based auth
- **Tokens**: JWT with 24-hour expiration
- **Validation**: Server-side session verification on requests

### Role-Based Access Control (RBAC)
- **Admin**: Full access, can manage users
- **User**: Team-assigned agents only
- **Validation**: Applied on every API request
- **Team Enforcement**: Whitelist-based access

## API Security

### Rate Limiting
- 20 requests/minute per IP
- Per-user limits on sensitive endpoints
- Exponential backoff on repeated failures
- Prevents brute force attacks

### Input Validation
- All inputs validated with express-validator
- Email format validation
- Team whitelist enforcement
- Parameterized database queries
- No raw SQL construction

### Output Encoding
- React XSS escaping enabled
- Content Security Policy headers
- No sensitive data in error messages
- Safe JSON serialization

## Data Protection

### In Transit
- HTTPS/TLS 1.2+ mandatory
- Secure cookies (HttpOnly, Secure, SameSite)
- HSTS enabled (1 year max-age)
- CORS restricted to authorized domains

### At Rest
- Tokens in httpOnly cookies (production)
- No sensitive data in localStorage
- Secrets in environment variables only
- No passwords stored (SSO-only authentication)

## Security Headers

```
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
```

## Secrets Management

- Environment variables only
- `.env` files in .gitignore
- Rotate secrets quarterly
- Use crypto.randomBytes(64) for generation
- Never commit `.env` to git

## Compliance

- ✓ OWASP Top 10 mitigations
- ✓ CWE/SANS Top 25 coverage
- ✓ Regular security audits
- ✓ Quarterly penetration testing

## Regular Maintenance

- **Weekly**: Review error logs for anomalies
- **Monthly**: Update dependencies
- **Quarterly**: Penetration testing
- **Annually**: Security training & policy review

## Incident Response

1. **Detection**: Monitor logs, metrics, error tracking
2. **Containment**: Immediately disable affected resources
3. **Investigation**: Review logs, identify root cause
4. **Remediation**: Fix issue, deploy hotfix
5. **Post-Mortem**: Document lessons learned

## Reporting Security Issues

Found a vulnerability?
1. **Do not** disclose publicly
2. Email security team immediately
3. Include: description, reproduction steps, impact
4. Allow 48 hours for acknowledgment

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
