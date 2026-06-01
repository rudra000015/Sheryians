# Deployment Guide - Render

## Steps to Deploy on Render

### 1. Push Code to GitHub
```bash
cd Sheryians
git add -A
git commit -m "Ready for Render deployment"
git push
```

### 2. Create Render Account
- Go to https://render.com
- Sign up with GitHub
- Authorize access to your repositories

### 3. Create New Web Service
- Click "New +" → "Web Service"
- Select your `Sheryians` repository
- Click "Connect"

### 4. Configure Service
- **Name**: sheryians (or your preferred name)
- **Environment**: Node
- **Build Command**: `cd Backend && npm install`
- **Start Command**: `cd Backend && npm start`
- **Plan**: Free (or paid)

### 5. Set Environment Variables
Click "Environment" and add:
```
MONGO_URI=your_mongodb_connection_string
NODE_ENV=production
```

### 6. Deploy
- Click "Create Web Service"
- Wait for deployment to complete
- Your app will be live at: `https://sheryians-xxxx.onrender.com`

## Notes
- Frontend files are already in `Backend/public/` (pre-compiled)
- MongoDB must be accessible from Render
- First deployment takes 2-3 minutes

## Troubleshooting
If you see 404 errors:
1. Check "Logs" in Render dashboard
2. Verify `MONGO_URI` is correct
3. Ensure frontend build succeeded
