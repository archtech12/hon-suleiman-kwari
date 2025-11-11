# Ghali Dashboard - Political Campaign Website

## Project Overview

A comprehensive political campaign website for Hon. Ghali Panda with a modern admin dashboard for content management. The platform includes both public-facing pages and a secure admin interface for managing all website content.

## Technology Stack

- **Frontend**: Next.js 16.0.0 with React and TypeScript
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Key Features

### Public Website Features

1. **Responsive Design**: Mobile-first approach ensuring optimal experience on all devices
2. **Dynamic Content**: All content sections are managed through the admin dashboard
3. **Constituency Information**: Detailed information about the constituency and initiatives
4. **News & Updates**: Latest news and announcements from the representative
5. **Project Showcase**: Portfolio of completed and ongoing projects
6. **Legislative Work**: Information about legislative activities and achievements
7. **Media Gallery**: Photo and video gallery of events and activities
8. **Contact System**: Multiple ways for constituents to get in touch

### Admin Dashboard Features

1. **Secure Authentication**: JWT token-based login system with role-based access
2. **User Management**: Create, edit, and delete admin users with different roles
3. **Content Management**: 
   - About section editing
   - Project management with priority levels
   - News article creation and publishing
   - Constituency information updates
   - Legislative work tracking
   - Media gallery management
   - Contact information management
4. **Password Security**: Change password functionality with validation
5. **Rich Text Editing**: Advanced content editing capabilities
6. **Image Upload**: Media management system for uploading images

### Public Support System

1. **Mobile-Friendly Support Form**: Easy-to-use form for constituents to submit requests
2. **Categorization**: Different subject categories for better organization
3. **Contact Information**: Multiple fields for comprehensive communication

## Project Structure

```
.
├── app/                     # Next.js frontend pages
│   ├── (personal)/         # Public-facing pages
│   │   ├── about/          # About page
│   │   ├── constituency/   # Constituency information
│   │   ├── contact/        # Contact page
│   │   ├── legislative/    # Legislative work
│   │   ├── news/           # News section
│   │   ├── projects/       # Projects showcase
│   │   ├── support/        # Public support form
│   │   └── ...             # Other public pages
│   ├── admin/              # Admin dashboard
│   │   ├── about/          # About content management
│   │   ├── constituency/   # Constituency content management
│   │   ├── contact/        # Contact content management
│   │   ├── legislative/    # Legislative content management
│   │   ├── login/          # Admin login page
│   │   ├── media/          # Media gallery management
│   │   ├── news/           # News management
│   │   ├── projects/       # Projects management
│   │   ├── users/          # User management
│   │   ├── change-password/ # Password change functionality
│   │   └── ...             # Other admin sections
│   └── ...                 # Layout and global components
├── server/                 # Backend server
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Authentication middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── ...                 # Server configuration
└── components/             # Reusable React components
```

## Database Schema

### User Model
- Email (unique, required)
- Password (hashed, required)
- Name (required)
- Role (admin/editor, default: admin)
- Timestamps

### Project Model
- Title (required)
- Description (required)
- Category (enum: Education, Infrastructure, etc.)
- Image URL
- Status (enum: Planned, Ongoing, Completed, Cancelled)
- Year
- Priority (number, 0-10)
- Timestamps

### News Model
- Title (required)
- Excerpt (required, max 200 chars)
- Content (required)
- Image URL
- Category (enum: Announcement, Event, etc.)
- Author (required)
- Published (boolean, default: false)
- Timestamps

### Constituency Model
- Name (required)
- Representative (required)
- Party (required)
- Election Year (required)
- Communities (array of strings)
- Population (required)
- Initiatives (array of objects with title, description, icon)
- Vision Content (required)
- Timestamps

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user (admin only)
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/change-password` - Change password

### User Management
- `GET /api/auth/users` - Get all users (admin only)
- `GET /api/auth/users/:id` - Get user by ID (admin only)
- `PUT /api/auth/users/:id` - Update user (admin only)
- `DELETE /api/auth/users/:id` - Delete user (admin only)

### Content Management
- Projects, News, Constituency, Legislative, Media, Contact endpoints follow RESTful patterns for CRUD operations

## Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Password Hashing**: bcrypt encryption for all passwords
3. **Role-Based Access**: Different permission levels for admin and editor roles
4. **Input Validation**: Server-side validation for all data
5. **Protected Routes**: Middleware to prevent unauthorized access

## Deployment

The application is designed for deployment on Vercel with MongoDB Atlas for database hosting. Environment variables are used for configuration:

- `MONGODB_URI`: Database connection string
- `JWT_SECRET`: Secret key for JWT token generation
- [PORT](file://c:\Users\lenovo\Abdulkadir%20Rahis\server\server.js#L70-L70): Server port (default: 5000)

## Development Setup

1. Install dependencies: `npm install`
2. Set up environment variables in `.env` file
3. Start development servers:
   - Frontend: `npm run dev`
   - Backend: `node server/server.js`
4. Access the application at `http://localhost:3000`

## Future Enhancements

1. **Analytics Dashboard**: Track website usage and engagement
2. **Newsletter System**: Email newsletter subscription and management
3. **Event Calendar**: Interactive calendar for upcoming events
4. **Live Streaming**: Integration for live event streaming
5. **Petition System**: Online petition creation and signing
6. **Multi-language Support**: Localization for diverse constituencies