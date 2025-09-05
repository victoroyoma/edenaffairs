import express from 'express';
import { body, validationResult } from 'express-validator';
import Profile from '../models/Profile.js';
import User from '../models/User.js';
import { protect, authorize, checkOwnership } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const validateProfile = [
  body('displayName')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Display name must be between 2 and 30 characters'),
  body('age')
    .isInt({ min: 18, max: 65 })
    .withMessage('Age must be between 19 and 65'),
  body('location.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('location.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('bio')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Bio must be between 10 and 500 characters'),
];

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// @desc    Get all profiles (public)
// @route   GET /api/profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {
      isActive: true,
      verificationStatus: 'approved'
    };

    // Add filters based on query parameters
    if (req.query.city) {
      filter['location.city'] = new RegExp(req.query.city, 'i');
    }
    if (req.query.state) {
      filter['location.state'] = new RegExp(req.query.state, 'i');
    }
    if (req.query.minAge) {
      filter.age = { ...filter.age, $gte: parseInt(req.query.minAge) };
    }
    if (req.query.maxAge) {
      filter.age = { ...filter.age, $lte: parseInt(req.query.maxAge) };
    }
    if (req.query.membershipTier) {
      filter.membershipTier = req.query.membershipTier;
    }
    if (req.query.isVip === 'true') {
      filter.isVip = true;
    }

    // Sort options
    let sort = { createdAt: -1 }; // Default: newest first
    if (req.query.sort === 'popular') {
      sort = { views: -1, likes: -1 };
    } else if (req.query.sort === 'alphabetical') {
      sort = { displayName: 1 };
    } else if (req.query.sort === 'age_asc') {
      sort = { age: 1 };
    } else if (req.query.sort === 'age_desc') {
      sort = { age: -1 };
    }

    const profiles = await Profile.find(filter)
      .populate('user', 'name email isVerified')
      .select('-contact -adminNotes') // Exclude sensitive info from public view
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Profile.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: {
        profiles,
        pagination: {
          currentPage: page,
          totalPages,
          totalProfiles: total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get profiles error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profiles'
    });
  }
});

// @desc    Get single profile by ID
// @route   GET /api/profiles/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)
      .populate('user', 'name email isVerified createdAt');

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    if (!profile.isActive || profile.verificationStatus !== 'approved') {
      return res.status(403).json({
        success: false,
        message: 'Profile not available'
      });
    }

    // Increment view count
    profile.views += 1;
    await profile.save();

    // Remove sensitive information for public view
    const publicProfile = { ...profile.toObject() };
    delete publicProfile.contact;
    delete publicProfile.adminNotes;

    res.status(200).json({
      success: true,
      data: { profile: publicProfile }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @desc    Create profile
// @route   POST /api/profiles
// @access  Private (Escort only)
router.post('/', protect, authorize('escort'), validateProfile, handleValidationErrors, async (req, res) => {
  try {
    // Check if profile already exists
    const existingProfile = await Profile.findOne({ user: req.user.id });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: 'Profile already exists for this user'
      });
    }

    // Create profile
    const profileData = {
      ...req.body,
      user: req.user.id
    };

    const profile = await Profile.create(profileData);
    await profile.populate('user', 'name email isVerified');

    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: { profile }
    });
  } catch (error) {
    console.error('Create profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating profile'
    });
  }
});

// @desc    Update profile
// @route   PUT /api/profiles/:id
// @access  Private (Owner or Admin)
router.put('/:id', protect, validateProfile, handleValidationErrors, async (req, res) => {
  try {
    let profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    // Check ownership or admin role
    if (req.user.role !== 'admin' && profile.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    // Update profile
    profile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('user', 'name email isVerified');

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { profile }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
});

// @desc    Delete profile
// @route   DELETE /api/profiles/:id
// @access  Private (Owner or Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    // Check ownership or admin role
    if (req.user.role !== 'admin' && profile.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this profile'
      });
    }

    await Profile.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Profile deleted successfully'
    });
  } catch (error) {
    console.error('Delete profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting profile'
    });
  }
});

// @desc    Get my profile
// @route   GET /api/profiles/me/profile
// @access  Private (Escort only)
router.get('/me/profile', protect, authorize('escort'), async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate('user', 'name email isVerified createdAt');

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { profile }
    });
  } catch (error) {
    console.error('Get my profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @desc    Get profile contact information
// @route   GET /api/profiles/:id/contact
// @access  Private (Paid access)
router.get('/:id/contact', protect, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    // In a real app, you'd check if the user has paid for access
    // For now, we'll just return the contact info
    profile.contactUnlocks += 1;
    await profile.save();

    res.status(200).json({
      success: true,
      data: {
        contact: profile.contact,
        displayName: profile.displayName
      }
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contact information'
    });
  }
});

export default router;
