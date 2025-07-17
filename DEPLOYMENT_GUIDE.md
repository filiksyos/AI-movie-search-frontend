# Deployment Guide: Frontend to Vercel + Backend to Render

## Overview
This guide will help you deploy your AI Movie Search application with:
- **Frontend**: Deployed to Vercel (React/Vite app)
- **Backend**: Deployed to Render (FastAPI Python app)

## Backend Deployment (Render)

### 1. Prepare Backend for Deployment

1. **Create a `render.yaml` file** in your backend root:
```yaml
services:
  - type: web
    name: ai-movie-search-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
```

2. **Update your backend `.env` file** (or set environment variables in Render):
```env
# API Configuration
OPENROUTER_API_KEY=your_openrouter_api_key
TMDB_API_KEY=your_tmdb_api_key

# Server Configuration
PORT=10000  # Render uses port 10000 by default

# CORS Configuration - UPDATE THIS with your Vercel domain
ALLOWED_ORIGINS=https://your-app-name.vercel.app,http://localhost:5173
```

### 2. Deploy to Render

1. **Connect your GitHub repository** to Render
2. **Create a new Web Service**
3. **Set these configurations**:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables**: Add all variables from your `.env` file

4. **Your backend will be available at**: `https://your-backend-name.onrender.com`

## Frontend Deployment (Vercel)

### 1. Update Frontend Configuration

**Your frontend is already configured!** The changes made include:
- ✅ Environment-aware API URL configuration
- ✅ Development proxy for local development
- ✅ Production API URL handling

### 2. Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
```bash
pnpm install -g vercel
```

2. **Deploy from your frontend directory**:
```bash
cd "AI movie search frontend"
vercel --prod
```

3. **Set Environment Variables in Vercel**:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-name.onrender.com`

### 3. Alternative: Deploy via Vercel Dashboard

1. **Connect your GitHub repository** to Vercel
2. **Set build settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `AI movie search frontend`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`

3. **Add Environment Variable**:
   - `VITE_API_URL` = `https://your-backend-name.onrender.com`

## Update CORS After Deployment

After your frontend is deployed to Vercel:

1. **Get your Vercel domain** (e.g., `https://your-app.vercel.app`)

2. **Update the CORS settings** in your Render backend:
   - Go to Render dashboard → Your service → Environment
   - Update `ALLOWED_ORIGINS` to include your Vercel domain:
   ```
   ALLOWED_ORIGINS=https://your-app.vercel.app,http://localhost:5173
   ```

## Testing the Connection

1. **Backend Health Check**: Visit `https://your-backend-name.onrender.com` 
2. **Frontend**: Visit `https://your-app.vercel.app`
3. **API Connection**: Try searching for movies in your frontend

## Environment Summary

### Development
- Frontend: `http://localhost:5173` (with Vite proxy)
- Backend: `http://localhost:3000`
- API calls: `/api/search` → proxied to backend

### Production
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`
- API calls: `https://your-backend.onrender.com/search`

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your Vercel domain is in `ALLOWED_ORIGINS`
2. **API Not Found**: Verify `VITE_API_URL` environment variable
3. **Backend Not Starting**: Check Render logs for Python/dependency issues

### Debug Commands

```bash
# Test backend locally
cd "AI movie search backend"
uvicorn app.main:app --reload

# Test frontend locally
cd "AI movie search frontend"
pnpm dev

# Build frontend locally
pnpm build
pnpm preview
```

## Cost Considerations

- **Vercel**: Free tier for hobby projects
- **Render**: Free tier with 750 hours/month (sleeps after 15 min inactivity)

The connection will work perfectly - your Vercel frontend will make direct HTTPS requests to your Render backend! 🚀 