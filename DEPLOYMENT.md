# Production Deployment Guide

## 1. Pre-Deployment Checklist

### Security Verification
- [ ] Enverus SSO fully integrated (no mock auth)
- [ ] JWT secrets generated (64+ random bytes)
- [ ] Session secrets rotated
- [ ] HTTPS enforced (redirect HTTP)
- [ ] Rate limiting enabled (20 req/min)
- [ ] CORS restricted to production domain
- [ ] Security headers configured
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak sensitive info

### Infrastructure Ready
- [ ] SSL/TLS certificates obtained
- [ ] Reverse proxy configured (Nginx/Apache)
- [ ] Load balancer setup (if needed)
- [ ] CDN configured for static assets
- [ ] DNS records ready
- [ ] Database backups configured
- [ ] Error tracking service setup
- [ ] Log aggregation configured

### Testing Complete
- [ ] All features tested in staging
- [ ] Load testing: 100+ concurrent users
- [ ] Security penetration testing
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Rollback procedure tested

## 2. Environment Configuration

### Generate Secrets
```bash
node -e "console.log('JWT_SECRET:', require('crypto').randomBytes(64).toString('hex'))"
node -e "console.log('SESSION_SECRET:', require('crypto').randomBytes(64).toString('hex'))"
```

### Backend `.env.production`
```env
PORT=3001
NODE_ENV=production
LOG_LEVEL=info

JWT_SECRET=<GENERATE_ABOVE>
SESSION_SECRET=<GENERATE_ABOVE>

FRONTEND_URL=https://unity-ai.enverus.com
API_URL=https://api.unity-ai.enverus.com

SSO_ENTRY_POINT=https://sso.enverus.com/auth
SSO_ISSUER=unity-ai
SSO_CALLBACK_URL=https://api.unity-ai.enverus.com/auth/callback
SSO_CERT=<FROM_ENVERUS>

ERROR_TRACKING_DSN=<SENTRY_DSN>
```

### Frontend `.env.production`
```env
REACT_APP_API_URL=https://api.unity-ai.enverus.com
REACT_APP_ENVIRONMENT=production
```

## 3. Deployment Steps

### Build & Prepare
```bash
cd frontend && npm run build
cd ../backend && npm prune --production
```

### Deploy Backend
```bash
cd /var/www/unity-ai
git fetch origin main && git reset --hard origin/main
cd backend && npm install --production
pm2 start src/index.js --name="unity-ai-api" --instances max
pm2 save && pm2 startup
```

### Deploy Frontend
```bash
# Option A: Static server
cp -r frontend/build/* /var/www/html/

# Option B: CDN
aws s3 sync frontend/build s3://unity-ai-prod/
aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"
```

### Verify
```bash
curl https://api.unity-ai.enverus.com/health
pm2 logs unity-ai-api
```

## 4. Post-Deployment Monitoring

### First 24 Hours
- [ ] Monitor error logs continuously
- [ ] API response times < 200ms
- [ ] SSO authentication working
- [ ] Database backups running

### First Week
- [ ] Daily error log review
- [ ] Performance analysis
- [ ] User feedback collection
- [ ] Database health checks

## 5. Rollback Procedure

### If Critical Issues Found
```bash
git revert <latest-commit>
cd backend && npm install
pm2 restart unity-ai-api
```

**Or revert to previous version**:
```bash
git checkout v1.0.0-previous
git checkout v1.0.0-hotfix
pm2 restart unity-ai-api
```

**Investigation**:
1. Review error logs: `pm2 logs unity-ai-api`
2. Check database status
3. Identify root cause

### Version Management
```bash
git tag -a v1.0.0-prod -m "Production release"
git push origin v1.0.0-prod
```

## 6. Performance Targets

- Frontend bundle: < 500KB gzip
- API response time: < 200ms (p95)
- Database queries: < 100ms (p95)
- Error rate: < 0.1%
- Uptime: 99.9%

## 7. Regular Maintenance

### Daily
- Monitor error logs
- Check uptime
- Review performance metrics

### Weekly
- Update dependencies
- Review security logs
- Test backups

### Monthly
- Penetration testing
- Dependency upgrades
- Database optimization

### Quarterly
- Security audit
- Capacity planning
- Disaster recovery drill

---

**See PRODUCTION-SETUP.md for detailed infrastructure configuration**
