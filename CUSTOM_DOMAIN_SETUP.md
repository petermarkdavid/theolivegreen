# Custom Domain Setup Guide

## Domain: www.olivegreenmartinborough.com

### Step 1: DNS Configuration

You need to configure DNS records with your domain registrar. Add the following records:

#### Option A: CNAME Record (Recommended)
```
Type: CNAME
Name: www
Value: petermarkdavid.github.io
TTL: 3600 (or default)
```

#### Option B: A Records (For root domain)
If you also want `theolivegreenmartinborough.com` (without www), add these A records:
```
Type: A
Name: @ (or root)
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

### Step 2: Verify DNS Propagation

After adding DNS records, wait 24-48 hours for DNS to propagate. Check with:
```bash
dig www.theolivegreenmartinborough.com
# or
nslookup www.theolivegreenmartinborough.com
```

You should see the records pointing to GitHub Pages.

### Step 3: GitHub Pages Settings

1. Go to your repository: https://github.com/petermarkdavid/theolivegreen
2. Settings → Pages
3. Under "Custom domain", enter: `www.olivegreenmartinborough.com`
4. Check "Enforce HTTPS" (will be available after DNS is verified)

### Step 4: Deploy

The CNAME file has been created. Deploy with:
```bash
npm run deploy
```

### Step 5: Wait for DNS Verification

GitHub will automatically verify your DNS configuration. This can take:
- A few minutes to several hours
- Up to 24 hours for full propagation

### Troubleshooting

**DNS check unsuccessful:**
- Verify DNS records are correct
- Wait for DNS propagation (can take up to 48 hours)
- Ensure CNAME record points to `petermarkdavid.github.io` (not `petermarkdavid.github.io/theolivegreen`)
- Check that your domain registrar allows CNAME records

**Site not loading:**
- Clear browser cache
- Try accessing via `http://` first (HTTPS may take longer)
- Verify the CNAME file is in the `dist` folder after build

**HTTPS not working:**
- Wait for DNS verification to complete
- GitHub will automatically provision SSL certificate
- Can take up to 24 hours after DNS is verified

### Current Configuration

- **CNAME file:** `public/CNAME` → `www.olivegreenmartinborough.com`
- **Base path:** `/` (for custom domain)
- **Repository:** petermarkdavid/theolivegreen

### Notes

- The CNAME file is automatically copied to `dist/` during build
- Base path is automatically set to `/` when CNAME exists
- For local development, base path remains `/`
- After DNS is verified, GitHub will show "DNS check successful"
- Your site will be available at: `https://www.olivegreenmartinborough.com`