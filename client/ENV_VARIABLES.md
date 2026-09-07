# Client Environment Variables

Create a `.env` or `.env.production` file in the `project/client` directory with the following variable:

```env
# API Base URL
# For production, set this to your Render server URL
# Example: https://movie-ticket-server.onrender.com
VITE_API_BASE_URL=http://localhost:8001
```

## For Netlify Deployment

Set this environment variable in your Netlify dashboard:
- `VITE_API_BASE_URL`: Your Render server URL (e.g., `https://movie-ticket-server.onrender.com`)

**Note**: Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

