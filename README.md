# 🌟 EdenAffair - Premium Escort Platform

A modern, secure, and feature-rich web platform for premium escort services in Nigeria. Built with React/TypeScript frontend and Node.js/Express backend with comprehensive admin controls and user management.

## 🚀 Key Features

### 👤 User Management
- **Multi-Role System**: Escorts, Clients, and Administrators
- **Username-Based Authentication**: Secure login without email requirements
- **Age Verification**: Strict 19+ age requirement enforcement
- **Profile Verification**: Admin-controlled approval workflow
- **Online Status Tracking**: Real-time availability indicators

### 💎 Membership Tiers
- **Silver (Free)**: Basic profile listing with standard visibility
- **Gold (₦5,000/month)**: Premium placement and advanced features
- **Diamond (₦10,000/month)**: Top-tier placement with VIP benefits
- **VIP Profiles**: Premium contact access with additional security

### 🔧 Advanced Features
- **Real-Time Online Status**: Track user availability (Online/Away/Offline)
- **Smart Pricing System**: Tier-based pricing validation and ranges
- **Media Management**: Photo and video upload with admin moderation
- **Contact Protection**: Paid access to contact information
- **Admin Dashboard**: Comprehensive platform management tools
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### 🛡️ Security & Privacy
- **Privacy-First**: No email collection for escort profiles
- **Secure Authentication**: JWT-based with role-based access control
- **Content Moderation**: Admin approval for all profiles and media
- **Rate Limiting**: API protection against abuse
- **Input Validation**: Comprehensive form and data validation

## 🏗️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for modern styling
- **React Router** for navigation
- **Lucide React** for icons
- **Context API** for state management

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing
- **Express Validator** for input validation

### Development Tools
- **ESLint** for code quality
- **TypeScript** for type safety
- **Nodemon** for hot reloading
- **CORS** for cross-origin requests

## 🚦 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd edenaffair
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Setup backend:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update .env with your configuration
   ```

4. **Start MongoDB** (if using local instance)

5. **Seed the database:**
   ```bash
   cd backend
   npm run seed
   ```

6. **Start development servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   npm run dev
   ```

7. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Default Login Credentials
- **Admin**: `admin` / `AdminSecure123!`
- **Escort**: `sophia_lagos` / `password123`
- **Client**: `john_client` / `password123`

## 📊 Project Structure

```
edenaffair/
├── src/                     # Frontend source code
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx       # Standardized button component
│   │   ├── StatusIndicator.tsx  # Online status display
│   │   ├── ProfileCard.tsx  # Profile display cards
│   │   └── ...
│   ├── pages/              # Main application pages
│   │   ├── Browse.tsx      # Profile browsing with filters
│   │   ├── ProfileCreation.tsx  # Enhanced profile creation
│   │   ├── AdminDashboard.tsx   # Admin control panel
│   │   └── ...
│   ├── services/           # API and utility services
│   │   ├── api.ts          # HTTP client configuration
│   │   ├── auth.ts         # Authentication service
│   │   ├── onlineStatus.ts # Real-time status tracking
│   │   └── ...
│   ├── contexts/           # React context providers
│   └── ...
├── backend/                # Backend API
│   ├── models/             # Database models
│   ├── routes/             # API endpoints
│   ├── middleware/         # Express middleware
│   ├── scripts/            # Database seeding
│   └── uploads/            # File storage
├── public/                 # Static assets
└── ...
```

## 🎯 Key Components

### ProfileCreation Enhanced
- **Online Status Selection**: Set default availability status
- **Availability Schedule**: Detailed time availability
- **Preferred Contact Method**: Primary communication preference
- **Dynamic Pricing Validation**: Tier-based price enforcement
- **Visual Status Indicators**: Color-coded status display

### Online Status Service
- **Real-Time Tracking**: Live status updates across the platform
- **Activity Monitoring**: Automatic away/offline detection
- **Status Analytics**: Platform-wide activity insights
- **Batch Operations**: Admin bulk status management

### Admin Dashboard
- **User Management**: Complete user lifecycle control
- **Profile Moderation**: Approval/rejection workflow
- **Membership Management**: Tier assignments and billing
- **Platform Analytics**: Usage statistics and insights

## 🔐 User Roles & Permissions

### 👑 Administrator
- Manage all users and profiles
- Approve/reject profile submissions
- Update membership tiers and billing
- Access platform analytics
- Moderate content and handle disputes

### 💃 Escort
- Create and manage profile
- Set online status and availability
- Upload photos and videos (admin-approved)
- Update pricing within tier limits
- View profile statistics

### 👤 Client
- Browse verified escort profiles
- Filter by location, age, services
- View online status indicators
- Purchase contact information access
- Rate and review services

## 💰 Pricing Structure

### Membership Tiers
| Tier | Monthly | 6 Months | Yearly | Features |
|------|---------|----------|--------|----------|
| **Silver** | Free | Free | Free | Basic listing, ₦10-30k pricing |
| **Gold** | ₦5,000 | ₦30,000 | ₦100,000 | Premium placement, ₦30-50k pricing |
| **Diamond** | ₦10,000 | ₦60,000 | ₦120,000 | Top placement, ₦100k+ pricing |

### Service Pricing Guidelines
- **Silver**: Short time ₦10-30k, Day break ₦20-50k
- **Gold**: Short time ₦30-50k, Day break ₦100-200k  
- **Diamond**: Short time ₦100k+, Day break ₦200k+

## 🌟 Recent Enhancements

### v2.0 Updates
- ✅ **Username-based authentication** (removed email dependency)
- ✅ **Enhanced online status system** with real-time tracking
- ✅ **Improved profile creation** with availability scheduling
- ✅ **Bug fixes across all components** (Browse, ProfileGrid, EscortDashboard, etc.)
- ✅ **Standardized Button component usage** throughout the platform
- ✅ **Age requirement updated** to 19+ minimum
- ✅ **Comprehensive TypeScript error resolution**

### Technical Improvements
- 🔧 **Interface standardization** across all components
- 🔧 **Proper prop usage patterns** for consistent UI
- 🔧 **Enhanced error handling** and validation
- 🔧 **Performance optimizations** and code cleanup
- 🔧 **Improved responsive design** for all screen sizes

## 🔧 Development

### Available Scripts

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

#### Backend
```bash
npm run dev          # Start with nodemon
npm start           # Production start
npm run seed        # Seed database with sample data
```

### Environment Variables

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=EdenAffair
```

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/edenaffair
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables

### Backend (Railway/Heroku)
1. Set up MongoDB Atlas
2. Configure environment variables
3. Deploy from repository
4. Run seed script in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain component consistency
- Add proper error handling
- Update documentation

## 📱 Mobile Responsiveness

The platform is fully responsive with:
- Mobile-first design approach
- Touch-friendly interface elements
- Optimized image loading
- Responsive navigation
- Mobile-optimized forms

## 🔒 Security Considerations

- All user inputs are validated and sanitized
- Passwords are hashed with bcryptjs
- JWT tokens with secure expiration
- File upload restrictions and validation
- CORS properly configured
- Rate limiting on all endpoints

## 📞 Support

For technical support or questions:
- Check the documentation
- Review the codebase comments
- Test with provided sample data
- Follow the development workflow

## 📄 License

This project is proprietary software. All rights reserved.

---

**EdenAffair** - Professional, Secure, Premium. 🌟
