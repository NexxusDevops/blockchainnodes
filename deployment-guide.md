# Deployment Guide for BlockchainNodes.io

## Problem with Current Vercel Deployment

Your site isn't displaying because Vercel is trying to serve the raw server code instead of the built application. Here's how to fix it:

## Option 1: Frontend-Only Deployment (Recommended)

### Step 1: Deploy Frontend to Vercel
1. In your GitHub repository, go to the Vercel dashboard
2. Redeploy with these settings:
   - **Build Command**: `vite build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

### Step 2: Deploy Backend Separately
Deploy your backend to one of these services:
- **Railway** (recommended for Node.js)
- **Render**
- **Heroku**
- **DigitalOcean App Platform**

### Step 3: Update Frontend API Calls
Add this environment variable in Vercel:
- `VITE_API_URL=https://your-backend-url.com/api`

## Option 2: Full-Stack Vercel Deployment

If you want to keep everything on Vercel, use this configuration:

### vercel.json
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "functions": {
    "api/[...all].js": {
      "src": "dist/index.js"
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/[...all].js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/public/$1"
    }
  ]
}
```

## Option 3: Static Site with Mock Data

For demonstration purposes, deploy just the frontend with mock data:

1. Update `vercel.json`:
```json
{
  "version": 2,
  "buildCommand": "vite build",
  "outputDirectory": "dist/public"
}
```

2. The frontend will use mock data automatically when the backend isn't available.

## Recommended Solution

**Use Option 1** - it's the most reliable:
1. Deploy frontend to Vercel
2. Deploy backend to Railway (free tier available)
3. Connect them with environment variables

This gives you the best performance and reliability.