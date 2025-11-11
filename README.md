# Ghali Political Campaign Website

A modern political campaign website built with Next.js, React, and Tailwind CSS.

## Features

- Responsive design for all devices
- Admin dashboard for content management
- News and project management
- Constituency information
- Legislative information
- Contact forms
- Media gallery
- Application system with support functionality

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ghali-political-campaign-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Update the values with your Sanity project credentials
   - For the backend, update `.env` with your MongoDB connection string

4. Run the development server:
   ```bash
   npm run dev
   ```

### Development

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)
- Admin Dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

Default Admin Credentials:
- Email: admin@ghalipanda.gov.ng
- Password: Admin123!

## Deployment

### Using MongoDB Atlas

1. Create a MongoDB Atlas account and cluster
2. Update the `MONGODB_URI` in your `.env` file
3. Run the migration script:
   ```bash
   npm run migrate-atlas
   ```

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Set the following environment variables in Vercel:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your JWT secret key
4. Deploy!

### Manual Deployment

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Project Structure

```
├── app/                 # Next.js app router pages
│   ├── (personal)/      # Public pages
│   └── admin/           # Admin dashboard
├── components/          # Reusable React components
├── server/              # Backend API (Express.js)
│   ├── controllers/     # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   └── middleware/      # Authentication middleware
├── styles/              # Global CSS styles
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test-atlas` - Test MongoDB Atlas connection
- `npm run migrate-atlas` - Migrate data to MongoDB Atlas
- `npm run deploy` - Deploy to Vercel

## Environment Variables

### Frontend (.env.local)
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset name
- `SANITY_API_READ_TOKEN` - Sanity read token
- `SANITY_API_WRITE_TOKEN` - Sanity write token (optional)

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token generation
- `PORT` - Server port (default: 5000)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on the GitHub repository.