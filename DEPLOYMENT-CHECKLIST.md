# Quick Deployment Checklist

## ✅ Pre-Deployment (Completed)

- [x] Removed duplicate `.jsx` and `.tsx` files
- [x] Converted all admin pages from `.jsx` to `.tsx`
- [x] Updated API endpoints to use `NEXT_PUBLIC_API_URL` environment variable
- [x] Fixed Next.js config for turbopack warnings
- [x] Updated `vercel.json` for proper deployment
- [x] Created `.env.example` file
- [x] Build tested successfully (no errors)
- [x] Fixed TypeScript errors in all pages
- [x] Added proper type definitions

## 📋 Deployment Steps

### 1. MongoDB Atlas Setup

- [ ] Create MongoDB Atlas account
- [ ] Create new cluster (M0 free tier)
- [ ] Create database user with credentials
- [ ] Configure network access (allow 0.0.0.0/0 for Vercel)
- [ ] Get connection string
- [ ] Run seed scripts to populate database:
  ```bash
  cd server
  node seed-projects.js
  node seed-about.js
  node seed-legislative.js
  node seed-constituency.js
  node create-admin.js
  ```

### 2. Push to GitHub

- [ ] Initialize git repository (if not done)
- [ ] Commit all changes
- [ ] Create GitHub repository
- [ ] Push code to GitHub

### 3. Deploy to Vercel

- [ ] Sign up/login to Vercel
- [ ] Create new project from GitHub
- [ ] Configure build settings:
  - Framework: Next.js
  - Build Command: `npm run build`
  - Output Directory: `.next`
- [ ] Add environment variables:
  - `MONGODB_URI`: Your MongoDB Atlas connection string
  - `JWT_SECRET`: A secure random string (32+ characters)
  - `NEXT_PUBLIC_API_URL`: Your backend API URL
- [ ] Click Deploy

### 4. Backend Deployment

- [ ] Choose deployment strategy:
  - **Option A:** Deploy Express backend separately on Vercel
  - **Option B:** Convert to Next.js API routes
- [ ] Update CORS settings in backend
- [ ] Test API endpoints

### 5. Post-Deployment Verification

- [ ] Frontend loads correctly
- [ ] Admin login works
- [ ] Can create/edit news articles
- [ ] Can manage projects
- [ ] Media uploads work
- [ ] All pages render properly
- [ ] Mobile responsiveness works
- [ ] SSL certificate active

### 6. Security & Maintenance

- [ ] Change admin password after first login
- [ ] Set up monitoring in Vercel dashboard
- [ ] Configure custom domain (optional)
- [ ] Set up database backups
- [ ] Review security headers

## 🔧 Environment Variables Needed

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ghali-dashboard?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
```

## 🚀 Quick Deploy Commands

```bash
# Build locally to test
npm run build

# Deploy to Vercel (if using CLI)
npx vercel --prod

# Or push to GitHub and let Vercel auto-deploy
git add .
git commit -m "Ready for deployment"
git push origin main
```

## 📝 Important Notes

1. **Backend Consideration:** The Express.js backend in `/server` directory needs separate deployment
2. **MongoDB Atlas:** Free tier has limitations (512MB storage)
3. **Environment Variables:** Must be set in Vercel dashboard
4. **First Deployment:** May take 5-10 minutes
5. **Subsequent Deployments:** Automatic on git push (if GitHub integration enabled)

## 🆘 Common Issues

### Build Fails

- Check Vercel build logs
- Verify all dependencies in package.json
- Ensure Node.js version compatibility

### API Not Connecting

- Verify NEXT_PUBLIC_API_URL is set correctly
- Check CORS configuration on backend
- Ensure backend is deployed and running

### Database Connection Errors

- Verify MongoDB Atlas connection string
- Check network access settings (0.0.0.0/0)
- Ensure database user credentials are correct

## 📚 Resources

- [Vercel Deployment Guide](VERCEL-DEPLOYMENT-GUIDE.md) - Detailed instructions
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

---

**Ready to Deploy!** 🎉

Follow the checklist above and refer to `VERCEL-DEPLOYMENT-GUIDE.md` for detailed instructions.
