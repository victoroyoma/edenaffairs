import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Basic Information
  displayName: {
    type: String,
    required: [true, 'Display name is required'],
    trim: true,
    maxLength: [30, 'Display name cannot exceed 30 characters']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [19, 'Must be at least 19 years old'],
    max: [65, 'Age cannot exceed 65']
  },
  location: {
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    country: {
      type: String,
      default: 'Nigeria'
    }
  },
  
  // Physical Details
  height: {
    type: String,
    trim: true
  },
  bodyType: {
    type: String,
    enum: ['Slim', 'Athletic', 'Average', 'Curvy', 'Plus Size', ''],
    default: ''
  },
  ethnicity: {
    type: String,
    enum: ['African', 'Mixed', 'Other', ''],
    default: ''
  },
  
  // Profile Content
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    maxLength: [500, 'Bio cannot exceed 500 characters']
  },
  specialties: [{
    type: String,
    trim: true
  }],
  languages: [{
    type: String,
    default: ['English']
  }],
  
  // Images
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: String, // For Cloudinary
    isPrimary: {
      type: Boolean,
      default: false
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Contact Information
  contact: {
    phone: {
      type: String,
      trim: true,
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    },
    whatsapp: {
      type: String,
      trim: true
    },
    telegram: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    }
  },
  
  // Pricing
  pricing: {
    hourly: {
      type: Number,
      min: [0, 'Price cannot be negative']
    },
    overnight: {
      type: Number,
      min: [0, 'Price cannot be negative']
    },
    weekly: {
      type: Number,
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      default: 'NGN'
    }
  },
  
  // Status and Verification
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isVip: {
    type: Boolean,
    default: false
  },
  membershipTier: {
    type: String,
    enum: ['', 'silver', 'gold', 'diamond'],
    default: ''
  },
  
  // Statistics
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  contactUnlocks: {
    type: Number,
    default: 0
  },
  
  // Admin Fields
  adminNotes: {
    type: String,
    maxLength: [1000, 'Admin notes cannot exceed 1000 characters']
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending'
  },
  rejectionReason: {
    type: String,
    maxLength: [500, 'Rejection reason cannot exceed 500 characters']
  },
  
  // Timestamps
  lastActive: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for primary image
profileSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary || this.images[0] || null;
});

// Virtual for full location
profileSchema.virtual('fullLocation').get(function() {
  return `${this.location.city}, ${this.location.state}`;
});

// Virtual for age verification
profileSchema.virtual('isAdult').get(function() {
  return this.age >= 19;
});

// Pre-save middleware
profileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  this.lastActive = Date.now();
  next();
});

// Ensure only one primary image
profileSchema.pre('save', function(next) {
  if (this.images && this.images.length > 0) {
    let primaryCount = 0;
    this.images.forEach(img => {
      if (img.isPrimary) primaryCount++;
    });
    
    if (primaryCount === 0) {
      this.images[0].isPrimary = true;
    } else if (primaryCount > 1) {
      // Reset all to false and set first as primary
      this.images.forEach((img, index) => {
        img.isPrimary = index === 0;
      });
    }
  }
  next();
});

// Indexes for better performance
profileSchema.index({ user: 1 });
profileSchema.index({ isActive: 1, isVerified: 1 });
profileSchema.index({ 'location.city': 1, 'location.state': 1 });
profileSchema.index({ age: 1 });
profileSchema.index({ membershipTier: 1 });
profileSchema.index({ verificationStatus: 1 });
profileSchema.index({ createdAt: -1 });
profileSchema.index({ views: -1 });
profileSchema.index({ likes: -1 });

export default mongoose.model('Profile', profileSchema);
