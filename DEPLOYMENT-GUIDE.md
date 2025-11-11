# Deployment Guide for Ghali Dashboard

## Setting up MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new cluster (M0 free tier is sufficient for development)

2. **Configure Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a user with:
     - Username: `ghali_dashboard_user`
     - Password: [generate a strong password]
     - Permissions: "Read and write to any database"

3. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development: Add your current IP address
   - For production: Use "Allow access from anywhere" (0.0.0.0/0) - but be cautious with security

4. **Get Connection String**
   - Go to "Clusters" in the left sidebar
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your database user credentials
   - Replace `myFirstDatabase` with `ghali-dashboard`

5. **Update Environment Variables**
   - Update your `.env` file with the Atlas connection string:
     ```
     MONGODB_URI=mongodb+srv://ghali_dashboard_user:your_password@your_cluster_url.mongodb.net/ghali-dashboard?retryWrites=true&w=majority
     ```

## Preparing for Deployment

1. **Test Atlas Connection**
   - Update your `.env` file with the Atlas connection string
   - Run the test script: `node server/test-atlas.js`
   - Ensure you see "Successfully connected to MongoDB Atlas"

2. **Seed Data to Atlas**
   - Make sure your local data is migrated to Atlas
   - Run seed scripts to populate initial data:
     ```
     cd server
     node seed-news.js
     node seed-projects.js
     ```

## Deploying to Vercel

1. **Prepare Your Code**
   - Ensure all environment variables are properly configured
   - Remove any local database dependencies
   - Commit all changes to Git

2. **Deploy via Vercel CLI**
   ```bash
   # Install Vercel CLI if not already installed
   npm install -g vercel
   
   # Deploy to Vercel
   vercel --prod
   ```

3. **Deploy via GitHub (Recommended)**
   - Push your code to a GitHub repository
   - Go to [https://vercel.com](https://vercel.com) and sign up/log in
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard:
     - `MONGODB_URI` - Your Atlas connection string
     - `JWT_SECRET` - Your JWT secret key
   - Deploy!

## Environment Variables Required for Production

1. **MONGODB_URI**: MongoDB Atlas connection string
2. **JWT_SECRET**: Secret key for JWT token generation
3. **PORT**: Server port (default 5000)

## Post-Deployment Steps

1. **Verify Deployment**
   - Check that the frontend loads correctly
   - Test admin login functionality
   - Verify API endpoints are working
   - Check that database connections are successful

2. **Configure Custom Domain (Optional)**
   - In Vercel dashboard, go to your project settings
   - Add a custom domain
   - Follow Vercel's DNS configuration instructions

3. **Monitor and Maintain**
   - Set up logging and monitoring
   - Regularly backup your MongoDB Atlas database
   - Monitor usage and performance

## Troubleshooting

1. **Connection Issues**
   - Verify Atlas connection string is correct
   - Check network access rules in Atlas
   - Ensure database user credentials are correct

2. **Environment Variables**
   - Make sure all required environment variables are set in Vercel
   - Check that there are no extra spaces or characters in the values

3. **Build Errors**
   - Check Vercel build logs for specific error messages
   - Ensure all dependencies are properly listed in package.json