#!/bin/bash
# Build frontend and copy to backend public folder
echo "Building frontend..."
cd Frontend
npm install
npm run build
cd ../Backend

# Copy frontend dist to public
echo "Copying frontend files to public..."
cp -r ../Frontend/dist/* public/

# Start backend
echo "Starting backend server..."
npm start
