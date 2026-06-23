# Moodify Deployment

## Backend on Render

Create a new Render Web Service from this GitHub repo.

- Root directory: `Backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `NODE_ENV=production`
  - `CLIENT_URL=https://your-vercel-app.vercel.app`
  - `MONGO_URI`
  - `JWT_SECRET`
  - `REDIS_HOST`
  - `REDIS_PORT`
  - `REDIS_PASSWORD`
  - `IMAGEKIT_PUBLIC_KEY`
  - `IMAGEKIT_PRIVATE_KEY`
  - `IMAGEKIT_URL_ENDPOINT`

The API health check is available at `/`.

## Frontend on Vercel

Create a new Vercel project from the same GitHub repo.

- Root directory: `Frontend`
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables:
  - `VITE_API_BASE_URL=https://your-render-service.onrender.com`

After Vercel gives you the frontend URL, set that same URL as `CLIENT_URL` in Render so cookies and CORS work in production.
