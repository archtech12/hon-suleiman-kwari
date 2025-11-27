# Vercel Deployment Guide for Hon. Ghali Panda Website

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- GitHub account (optional but recommended)
- MongoDB Atlas database connection string
- JWT secret key for authentication

## Step 1: Prepare Your Code

All necessary changes have been made:

- ✅ Removed duplicate `.jsx` files (converted to `.tsx`)
- ✅ Updated all API endpoints to use environment variables
- ✅ Fixed Next.js configuration for turbopack
- ✅ Updated vercel.json for proper deployment
- ✅ Build tested successfully

## Step 2: Push to GitHub (Recommended Method)

1. Initialize git if not already done:

   ```bash
   git init
   git add .
   git commit -m "Prepare for Vercel deployment"
   ```

2. Create a new repository on GitHub

3. Push your code:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

## Step 3: Deploy to Vercel

### Option A: Deploy via GitHub (Recommended)

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** .next
   - **Install Command:** `npm install`

5. Add Environment Variables:
   Click on "Environment Variables" and add:

   ```
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<your-jwt-secret-key>
   NEXT_PUBLIC_API_URL=<your-api-url>
   ```

   **Important Notes:**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string for JWT token generation
   - `NEXT_PUBLIC_API_URL`: The URL where your backend API will be hosted
     - For a full-stack deployment on Vercel, this can be the same as your Vercel domain
     - Example: `https://your-project.vercel.app`

6. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:

   ```bash
   vercel login
   ```

3. Deploy:

   ```bash
   vercel --prod
   ```

4. Follow the prompts and set environment variables when asked

## Step 4: Configure Backend (Server)

### Important: Backend Deployment

The current setup has a separate `server` directory with Express.js backend. You have two options:

### Option 1: Deploy Backend Separately (Recommended)

1. Create a separate Vercel project for the backend:
   - Create a new GitHub repository for the `server` directory
   - Deploy it as a separate Vercel project
   - Use that URL as your `NEXT_PUBLIC_API_URL`

2. Update the backend `server.js` to include CORS:
   ```javascript
   app.use(
     cors({
       origin: ['https://your-frontend-domain.vercel.app'],
       credentials: true,
     }),
   )
   ```

### Option 2: Convert to Next.js API Routes

Convert Express routes to Next.js API routes in `/app/api`:

- This requires refactoring backend code
- More complex but creates a unified deployment

## Step 5: Set Up MongoDB Atlas

1. **Create a MongoDB Atlas account** at https://www.mongodb.com/cloud/atlas

2. **Create a new cluster:**
   - Choose the free M0 tier
   - Select your preferred region

3. **Create a database user:**
   - Go to "Database Access"
   - Add a new database user with read/write permissions
   - Save the username and password

4. **Configure Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For Vercel, select "Allow access from anywhere" (0.0.0.0/0)

5. **Get connection string:**
   - Go to "Clusters" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `myFirstDatabase` with `ghali-dashboard`

6. **Seed initial data:**
   - Run the seed scripts in the `server` directory:
     ```bash
     cd server
     node seed-projects.js
     node seed-about.js
     node seed-legislative.js
     node seed-constituency.js
     node create-admin.js
     ```

## Step 6: Verify Deployment

1. Check the deployment URL provided by Vercel
2. Test the following:
   - ✅ Frontend pages load correctly
   - ✅ Admin login works (use credentials from create-admin.js)
   - ✅ API endpoints respond correctly
   - ✅ Database connections work

## Step 7: Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions from Vercel
5. Wait for DNS propagation (can take up to 48 hours)

## Environment Variables Reference

Create a `.env.local` file for local development with these variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ghali-dashboard?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this

# API URL (for production, use your deployed backend URL)
NEXT_PUBLIC_API_URL=https://your-api-domain.vercel.app
```

## Troubleshooting

### Build Failures

- Check the build logs in Vercel dashboard
- Ensure all dependencies are listed in `package.json`
- Verify Node.js version compatibility

### API Connection Issues

- Verify `NEXT_PUBLIC_API_URL` is correctly set
- Check CORS configuration on backend
- Ensure MongoDB Atlas allows connections from Vercel IPs

### Database Connection Errors

- Verify MongoDB Atlas network access settings
- Check connection string format
- Ensure database user has proper permissions

## Post-Deployment Checklist

- [ ] Frontend loads successfully
- [ ] Admin login works
- [ ] News articles can be created/edited
- [ ] Projects can be managed
- [ ] Media uploads work
- [ ] All pages render correctly
- [ ] Mobile responsiveness verified
- [ ] SSL certificate is active
- [ ] Custom domain configured (if applicable)

## Maintenance

### Updating Content

- Use the admin panel at `/admin/login`
- Default credentials are set in `server/create-admin.js`
- Change admin password after first login

### Redeploying

- Push changes to GitHub (if using GitHub integration)
- Vercel will automatically rebuild and deploy
- Or use `vercel --prod` for CLI deployment

### Monitoring

- Check Vercel dashboard for:
  - Deployment status
  - Error logs
  - Performance analytics
  - Usage statistics

## Security Recommendations

1. **Change default admin password** immediately after first deployment
2. **Use strong JWT_SECRET** (minimum 32 characters, random)
3. **Enable MongoDB Atlas audit logs**
4. **Set up Vercel's security headers**
5. **Regular backup** of MongoDB database
6. **Monitor** Vercel logs for suspicious activity

## Support

For issues or questions:

- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com

## Additional Notes

- The server directory uses Express.js which may need separate deployment
- Consider using Vercel Serverless Functions for API routes
- Monitor MongoDB Atlas usage to stay within free tier limits
- Set up alerts in MongoDB Atlas for database issues

---

**Deployment prepared by:** AI Assistant  
**Date:** November 27, 2025  
**Status:** Ready for deployment
