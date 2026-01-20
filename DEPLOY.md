# GitHub Pages Deployment Guide

## Prerequisites
- GitHub account
- GitHub repository created (see steps below)

## Setup Steps

### 1. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `theolivegreen` (or your preferred name)
3. Make it **Public** (required for free GitHub Pages)
4. **Don't** initialize with README, .gitignore, or license
5. Click "Create repository"

### 2. Update Base Path (if needed)
If your repository name is different from `theolivegreen`, update `vite.config.js`:
```js
base: process.env.NODE_ENV === 'production' ? '/YOUR-REPO-NAME/' : '/',
```

### 3. Connect Local Repository to GitHub
```bash
git remote add origin https://github.com/YOUR-USERNAME/theolivegreen.git
git branch -M main
git push -u origin main
```

### 4. Deploy to GitHub Pages
```bash
npm run deploy
```

This will:
- Build your site
- Deploy to the `gh-pages` branch
- Make your site available at: `https://YOUR-USERNAME.github.io/theolivegreen/`

### 5. Enable GitHub Pages (if needed)
1. Go to your repository on GitHub
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `gh-pages` → `/ (root)`
5. Save

## Updating the Site
After making changes:
```bash
git add .
git commit -m "Your commit message"
git push
npm run deploy
```

## Custom Domain (Optional)
If you have a custom domain, add a `CNAME` file in the `public` folder with your domain name.
