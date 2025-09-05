# EdenAffair Backend API

A professional Node.js/Express.js backend API for the EdenAffair escort platform with MongoDB integration.

## 🚀 Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Profile Management**: Complete CRUD operations for escort profiles
- **Image Upload**: File upload system for profile images
- **Admin Dashboard**: Comprehensive admin controls for user and profile management
- **Security**: Helmet, rate limiting, CORS, and input validation
- **Database**: MongoDB with Mongoose ODM
- **Verification System**: Admin approval workflow for profiles

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   ```bash
   cp .env.example .env
   ```
   Then update the `.env` file with your configuration.

4. **Start MongoDB** (if using local instance)

5. **Seed the database:**
   ```bash
   npm run seed
   ```

6. **Start the server:**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 🔧 Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/edenaffair
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@edenaffair.ng
ADMIN_PASSWORD=AdminSecure123!
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Profiles
- `GET /api/profiles` - Get all approved profiles (public)
- `GET /api/profiles/:id` - Get single profile (public)
- `POST /api/profiles` - Create profile (escort only)
- `PUT /api/profiles/:id` - Update profile (owner/admin)
- `DELETE /api/profiles/:id` - Delete profile (owner/admin)
- `GET /api/profiles/me/profile` - Get my profile (escort)
- `GET /api/profiles/:id/contact` - Get contact info (paid access)

### File Upload
- `POST /api/upload/profile-images` - Upload profile images
- `DELETE /api/upload/profile-images/:imageId` - Delete image
- `PUT /api/upload/profile-images/:imageId/primary` - Set primary image

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/profiles` - Get all profiles
- `PUT /api/admin/users/:id/status` - Update user status
- `PUT /api/admin/profiles/:id/verification` - Update verification status
- `PUT /api/admin/profiles/:id/membership` - Update membership
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/pending-verifications` - Get pending verifications

## 🏗️ Project Structure

```
backend/
├── models/           # Database models
│   ├── User.js      # User model
│   └── Profile.js   # Profile model
├── routes/          # API routes
│   ├── auth.js      # Authentication routes
│   ├── profiles.js  # Profile routes
│   ├── admin.js     # Admin routes
│   └── upload.js    # File upload routes
├── middleware/      # Express middleware
│   ├── auth.js      # Authentication middleware
│   ├── errorHandler.js
│   └── notFound.js
├── scripts/         # Utility scripts
│   └── seed.js      # Database seeding
├── uploads/         # Uploaded files
└── server.js        # Main server file
```

## 🔐 User Roles

### Escort
- Create and manage profile
- Upload images
- Update contact information
- View their statistics

### Client
- Browse profiles
- Purchase contact access
- Rate and review escorts

### Admin
- Manage all users and profiles
- Approve/reject profiles
- Update membership tiers
- View analytics and reports
- Moderate content

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['escort', 'client', 'admin'],
  isActive: Boolean,
  isVerified: Boolean,
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Profile Model
```javascript
{
  user: ObjectId (ref: User),
  displayName: String,
  age: Number (19-65),
  location: {
    city: String,
    state: String,
    country: String
  },
  height: String,
  bodyType: ['Slim', 'Athletic', 'Average', 'Curvy', 'Plus Size'],
  ethnicity: ['African', 'Mixed', 'Other'],
  bio: String,
  specialties: [String],
  languages: [String],
  images: [{
    url: String,
    publicId: String,
    isPrimary: Boolean,
    uploadedAt: Date
  }],
  contact: {
    phone: String,
    whatsapp: String,
    telegram: String,
    email: String
  },
  pricing: {
    hourly: Number,
    overnight: Number,
    weekly: Number,
    currency: String
  },
  isActive: Boolean,
  isVerified: Boolean,
  isVip: Boolean,
  membershipTier: ['', 'silver', 'gold', 'diamond'],
  views: Number,
  likes: Number,
  contactUnlocks: Number,
  adminNotes: String,
  verificationStatus: ['pending', 'approved', 'rejected', 'suspended'],
  rejectionReason: String,
  lastActive: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs with salt rounds
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Express-validator for request validation
- **CORS**: Configured for frontend domain
- **Helmet**: Security headers
- **File Upload Security**: File type and size validation

## 📈 Sample Data

The seed script creates:
- 1 Admin user
- 2 Client users  
- 5 Escort users with complete profiles
- 1 Pending profile for admin testing

**Default Login Credentials:**
- Admin: `admin@edenaffair.ng` / `AdminSecure123!`
- Client: `john@example.com` / `password123`
- Escort: `sophia@example.com` / `password123`

## 🚦 Getting Started

1. **Install dependencies and setup environment**
2. **Run the seed script to populate sample data**
3. **Start the development server**
4. **Test API endpoints using the provided credentials**
5. **Check the health endpoint**: `GET /api/health`

## 📞 API Testing

You can test the API using tools like:
- Postman
- Insomnia
- Thunder Client (VS Code extension)
- curl

Example login request:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "sophia@example.com", "password": "password123"}'
```

## 🔄 Development Workflow

1. Make changes to code
2. Server auto-restarts (nodemon)
3. Test endpoints
4. Check logs for errors
5. Commit changes

## 📝 Notes

- Profile images are stored locally in `/uploads` directory
- For production, consider using cloud storage (Cloudinary/AWS S3)
- Email functionality requires SMTP configuration
- Payment integration ready for Paystack
- All API responses follow consistent JSON format

## 🤝 Contributing

1. Follow existing code structure
2. Add proper validation and error handling
3. Update documentation for new endpoints
4. Test thoroughly before submitting
