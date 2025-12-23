# Production Setup Checklist

## Required Before Deployment

### 1. Environment Variables

#### Backend Production .env
```bash
PORT=3001
NODE_ENV=production

# JWT Secret - MUST BE STRONG & UNIQUE
JWT_SECRET=<GENERATE_STRONG_256_BIT_KEY>

# Enverus SSO Configuration
SSO_ENTRY_POINT=https://sso.enverus.com/auth
SSO_ISSUER=unity-ai-production
SSO_CALLBACK_URL=https://unity-ai.enverus.com/auth/callback
SSO_CERT=<REAL_SSO_CERTIFICATE>

# Frontend URL
FRONTEND_URL=https://unity-ai.enverus.com

# Session Secret
SESSION_SECRET=<GENERATE_STRONG_256_BIT_KEY>
```

#### Frontend Production .env
```bash
REACT_APP_API_URL=https://api.unity-ai.enverus.com
```

### 2. Generate Secure Secrets

Run these commands to generate production secrets:

```bash
# JWT Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Session Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Database Setup (if needed in future)

- Set up production database
- Configure connection strings
- Set up backups
- Configure monitoring

### 4. SSL/TLS Certificates

- Obtain SSL certificates for HTTPS
- Configure Nginx/Apache reverse proxy
- Enable HTTPS redirect
- Set up certificate auto-renewal

### 5. Logging & Monitoring

Install production logging:

```bash
cd backend
npm install winston morgan
```

### 6. Error Handling

- Set up error tracking (Sentry, LogRocket, etc.)
- Configure email alerts for critical errors
- Set up uptime monitoring

### 7. Performance Optimization

- Enable gzip compression
- Set up CDN for static assets
- Configure caching headers
- Minify and bundle frontend assets

### 8. Security Checklist

- [ ] Replace mock SSO with real Enverus SSO
- [ ] Generate strong JWT secrets
- [ ] Enable HTTPS only
- [ ] Set secure cookie flags
- [ ] Configure CORS for production domain only
- [ ] Enable rate limiting
- [ ] Add security headers (helmet.js)
- [ ] Set up CSP (Content Security Policy)
- [ ] Enable SQL injection protection
- [ ] Enable XSS protection
- [ ] Configure proper session management
- [ ] Set up regular security audits

### 9. Testing Before Launch

- [ ] Load testing
- [ ] Security penetration testing
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] SSO integration testing with real Enverus accounts
- [ ] User acceptance testing (UAT)

### 10. Deployment

- [ ] Set up CI/CD pipeline
- [ ] Configure staging environment
- [ ] Set up database migrations
- [ ] Configure backup strategy
- [ ] Set up rollback procedure
- [ ] Document deployment process
