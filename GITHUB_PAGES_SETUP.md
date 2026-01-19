# GitHub Pages Setup Instructions

## Issue: "There isn't a GitHub Pages site here"

This means GitHub Pages isn't configured to use the `gh-pages` branch.

## Fix Steps:

### 1. Go to Repository Settings
Visit: https://github.com/petermarkdavid/theolivegreen/settings/pages

### 2. Configure Source
Under "Source":
- **Branch:** Select `gh-pages`
- **Folder:** Select `/ (root)`
- Click **Save**

### 3. Wait for Deployment
- GitHub will show "Your site is live at..." message
- It may take 1-2 minutes to become available
- The site will be at: `https://petermarkdavid.github.io/theolivegreen/`

### 4. Custom Domain (if configured)
If you've set up the custom domain:
- Under "Custom domain", enter: `www.olivegreenmartinborough.com`
- Check "Enforce HTTPS" (after DNS is verified)

## Verify Deployment

After configuring:
1. Wait 1-2 minutes
2. Visit: https://petermarkdavid.github.io/theolivegreen/
3. You should see your site (not the 404 error)

## Troubleshooting

**Still seeing 404?**
- Wait 5-10 minutes for GitHub to process
- Clear browser cache
- Check that `gh-pages` branch exists (it does - we verified)
- Make sure you selected `/ (root)` folder, not `/docs`

**Custom domain not working?**
- DNS must be configured first (see CUSTOM_DOMAIN_SETUP.md)
- Wait for DNS verification (can take 24-48 hours)
- GitHub will automatically provision SSL certificate

## Current Status

✅ `gh-pages` branch exists and is up to date
✅ CNAME file is deployed
✅ Build is successful
❌ GitHub Pages source not configured (needs manual setup)
