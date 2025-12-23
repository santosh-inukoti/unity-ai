# Production Setup Guide

## 1. Secrets & Environment

### Generate Secrets
```bash
node -e "console.log('JWT_SECRET:', require('crypto').randomBytes(64).toString('hex'))"
node -e "console.log('SESSION_SECRET:', require('crypto').randomBytes(64).toString('hex'))"
```

### Backend Configuration (`backend/.env.production`)
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

### Frontend Configuration (`frontend/.env.production`)
```env
REACT_APP_API_URL=https://api.unity-ai.enverus.com
REACT_APP_ENVIRONMENT=production
```

## 2. SSL/TLS (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx

sudo certbot certonly --nginx \
  -d unity-ai.enverus.com \
  -d api.unity-ai.enverus.com
```

## 3. Process Manager (PM2)

```bash
npm install -g pm2
cd backend
pm2 start src/index.js --name "unity-ai-api" --instances max
pm2 save && pm2 startup
```

## 4. Web Server (Nginx)

See DEPLOYMENT.md for complete Nginx configuration

## 5. Database (Future)

```bash
# PostgreSQL
CREATE DATABASE unity_ai_prod;
CREATE USER unity_ai WITH PASSWORD '<PASSWORD>';
GRANT ALL PRIVILEGES ON DATABASE unity_ai_prod TO unity_ai;
```

## 6. Monitoring & Backups

### Error Tracking
```bash
npm install @sentry/node
```

### Daily Backups
```bash
0 2 * * * pg_dump -U unity_ai unity_ai_prod | gzip > /backups/unity_ai_$(date +\%Y\%m\%d).sql.gz
```

## 7. Performance Targets

- Frontend bundle: < 500KB gzip
- API response: < 200ms (p95)
- Database queries: < 100ms (p95)
- Uptime: 99.9%

---

**See DEPLOYMENT.md for deployment steps**
