# Quick Start Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Deploy Server to Render (Do this first)

1. **Go to [Render Dashboard](https://dashboard.render.com)**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure:**
   - Name: `movie-ticket-server`
   - Environment: `Node`
   - Root Directory: `project/server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Add Environment Variables:**
   - `MONGO_URL` - Your MongoDB connection string
   - `JWT_SECRET` - Random secret string (use a password generator)
   - `NODE_ENV` - `production`
   - `CLIENT_URL` - Will set after Netlify deployment (use placeholder for now)
   - `STRIPE_SECRET_KEY` - Your Stripe secret key
   - `SMTP_USER` - Your email
   - `SMTP_PASS` - Your email app password
   - `SMTP_FROM` - Your email
6. **Copy your Render URL** (e.g., `https://movie-ticket-server.onrender.com`)

### 2. Deploy Client to Netlify

1. **Go to [Netlify Dashboard](https://app.netlify.com)**
2. **Click "Add new site" → "Import an existing project"**
3. **Connect your GitHub repository**
4. **Configure:**
   - Base directory: `project/client`
   - Build command: `npm run build`
   - Publish directory: `project/client/dist`
5. **Add Environment Variable:**
   - `VITE_API_BASE_URL` - Your Render server URL (from step 1)
6. **Copy your Netlify URL** (e.g., `https://your-app.netlify.app`)

### 3. Update Server CORS

1. **Go back to Render Dashboard**
2. **Update the `CLIENT_URL` environment variable** with your Netlify URL
3. **Redeploy the server** (or it will auto-redeploy)

## ✅ That's it! Your app should be live!

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

