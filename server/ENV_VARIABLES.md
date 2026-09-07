# Server Environment Variables

Create a `.env` file in the `project/server` directory with the following variables:

```env
# Database
MONGO_URL=mongodb://localhost:27017/movie-ticket-app

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Environment
NODE_ENV=production

# Client URL (for CORS and payment redirects)
CLIENT_URL=https://your-app-name.netlify.app

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Email Service (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
```

## For Render Deployment

Set these environment variables in your Render dashboard:
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

**Note**: Render automatically provides the `PORT` environment variable.

