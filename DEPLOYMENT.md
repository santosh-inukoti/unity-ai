# Deployment Checklist

## Pre-Deployment

### Security
- [ ] Mock SSO replaced with real authentication
- [ ] Production secrets generated and secured
- [ ] HTTPS enabled and tested
- [ ] CORS restricted to production domains
- [ ] API rate limiting configured
- [ ] Input validation added
- [ ] SQL injection prevention enabled
- [ ] XSS protection enabled

### Environment Setup
- [ ] Production `.env` files created (NOT in git)
- [ ] Database configured (if needed)
- [ ] SSL certificates obtained
- [ ] DNS configured
- [ ] CDN configured (optional)

### Testing
- [ ] All features tested in staging
- [ ] Load testing completed
- [ ] Security scan performed
- [ ] User acceptance testing done
- [ ] Rollback procedure tested

## Deployment Steps

1. Build frontend for production
2. Run database migrations (if any)
3. Deploy backend to production server
4. Deploy frontend to web server/CDN
5. Update DNS records
6. Test production environment
7. Monitor for errors

## Post-Deployment

- [ ] Monitor error logs
- [ ] Verify SSO working
- [ ] Test with real users
- [ ] Document any issues
- [ ] Set up uptime monitoring

## Rollback Plan

If critical issues occur:
1. Revert to previous version
2. Check error logs
3. Fix issues in staging
4. Re-deploy when fixed
