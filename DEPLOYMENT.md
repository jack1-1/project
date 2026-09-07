# Deployment Guide
This guide will help you deploy the Movie Ticket App to Netlify (client) and Render (server).

## Prerequisites

- GitHub account
- Netlify account
- Render account
- MongoDB Atlas account (or your MongoDB instance)
- Stripe account (for payments)
- Email service credentials (Gmail or other SMTP)

## Server Deployment (Render)

### Step 1: Prepare Your Server

1. Make sure all environment variables are set in your Render dashboard
2. The server will automatically use the `PORT` environment variable provided by Render

### Step 2: Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `movie-ticket-server` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `project/server`

### Step 3: Set Environment Variables in Render

Go to your service settings and add these environment variables:

- `MONGO_URL`: Your MongoDB connection string
- `JWT_SECRET`: A strong random string for JWT token signing
- `NODE_ENV`: `production`
- `CLIENT_URL`: Your Netlify app URL (e.g., `https://your-app.netlify.app`)
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `SMTP_HOST`: `smtp.gmail.com` (or your SMTP host)
- `SMTP_PORT`: `587`
- `SMTP_USER`: Your email address
- `SMTP_PASS`: Your email app password
- `SMTP_FROM`: Your email address

**Note**: Render will automatically provide the `PORT` environment variable.

### Step 4: Get Your Server URL

After deployment, Render will provide a URL like: `https://movie-ticket-server.onrender.com`

## Client Deployment (Netlify)

### Step 1: Prepare Your Client

1. Create a `.env.production` file in the `project/client` directory with:
   ```
   VITE_API_BASE_URL=https://your-render-server-url.onrender.com
   ```
   Replace `your-render-server-url.onrender.com` with your actual Render server URL.

### Step 2: Deploy to Netlify

#### Option A: Deploy via Netlify Dashboard

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure the build settings:
   - **Base directory**: `project/client`
   - **Build command**: `npm run build`
   - **Publish directory**: `project/client/dist`

#### Option B: Deploy via Netlify CLI

```bash
cd project/client
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Step 3: Set Environment Variables in Netlify

1. Go to your site settings in Netlify
2. Navigate to "Environment variables"
3. Add:
   - `VITE_API_BASE_URL`: Your Render server URL (e.g., `https://movie-ticket-server.onrender.com`)

### Step 4: Update Server CORS

After getting your Netlify URL, update the `CLIENT_URL` environment variable in Render to match your Netlify site URL.

## Post-Deployment Checklist

- [ ] Server is running on Render
- [ ] Client is deployed on Netlify
- [ ] All environment variables are set correctly
- [ ] CORS is configured with the correct client URL
- [ ] Database connection is working
- [ ] API calls from client to server are working
- [ ] Payment integration is tested
- [ ] Email service is configured and working

## Troubleshooting

### CORS Errors
- Make sure `CLIENT_URL` in Render matches your Netlify URL exactly (including `https://`)
- Check that credentials are enabled in CORS configuration

### API Connection Issues
- Verify `VITE_API_BASE_URL` in Netlify matches your Render server URL
- Check browser console for any CORS or network errors
- Ensure the server is running and accessible

### Database Connection Issues
- Verify `MONGO_URL` is correct in Render
- Check MongoDB Atlas IP whitelist (should allow all IPs `0.0.0.0/0` for Render)
- Ensure MongoDB credentials are correct

### Build Failures
- Check build logs in Netlify/Render
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

## Notes

- Render free tier may spin down after inactivity. First request after spin-down may be slow.
- Netlify provides automatic HTTPS
- Make sure to use production API keys for Stripe
- Keep your `.env` files secure and never commit them to Git

