import express from 'express';
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require admin role
router.use(protect);
router.use(authorize('admin'));

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin only)
router.get('/stats', async (req, res) => {
  try {
    // Get various statistics
    const totalUsers = await User.countDocuments();
    const totalEscorts = await User.countDocuments({ role: 'escort' });
    const totalClients = await User.countDocuments({ role: 'client' });
    const totalProfiles = await Profile.countDocuments();
    const verifiedProfiles = await Profile.countDocuments({ isVerified: true });
    const pendingProfiles = await Profile.countDocuments({ verificationStatus: 'pending' });
    const vipProfiles = await Profile.countDocuments({ isVip: true });
    
    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    
    const newProfilesThisMonth = await Profile.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Most popular profiles
    const popularProfiles = await Profile.find({
      isActive: true,
      verificationStatus: 'approved'
    })
    .sort({ views: -1 })
    .limit(5)
    .select('displayName views likes contactUnlocks')
    .populate('user', 'name email');

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalEscorts,
          totalClients,
          totalProfiles,
          verifiedProfiles,
          pendingProfiles,
          vipProfiles
        },
        activity: {
          newUsersThisMonth,
          newProfilesThisMonth
        },
        popularProfiles
      }
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching admin stats'
    });
  }
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (req.query.role) {
      filter.role = req.query.role;
    }
    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === 'true';
    }
    if (req.query.isVerified !== undefined) {
      filter.isVerified = req.query.isVerified === 'true';
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Admin get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users'
    });
  }
});

// @desc    Get all profiles for admin
// @route   GET /api/admin/profiles
// @access  Private (Admin only)
router.get('/profiles', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (req.query.verificationStatus) {
      filter.verificationStatus = req.query.verificationStatus;
    }
    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === 'true';
    }
    if (req.query.isVip !== undefined) {
      filter.isVip = req.query.isVip === 'true';
    }
    if (req.query.membershipTier) {
      filter.membershipTier = req.query.membershipTier;
    }

    const profiles = await Profile.find(filter)
      .populate('user', 'name email isVerified createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Profile.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        profiles,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Admin get profiles error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profiles'
    });
  }
});

// @desc    Update user status
// @route   PUT /api/admin/users/:id/status
// @access  Private (Admin only)
router.put('/users/:id/status', async (req, res) => {
  try {
    const { isActive, isVerified } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive, isVerified },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User status updated successfully',
      data: { user }
    });
  } catch (error) {
    console.error('Admin update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating user status'
    });
  }
});

// @desc    Update profile verification status
// @route   PUT /api/admin/profiles/:id/verification
// @access  Private (Admin only)
router.put('/profiles/:id/verification', async (req, res) => {
  try {
    const { verificationStatus, rejectionReason, adminNotes } = req.body;
    
    const updateData = {
      verificationStatus,
      adminNotes
    };

    if (verificationStatus === 'approved') {
      updateData.isVerified = true;
      updateData.rejectionReason = undefined;
    } else if (verificationStatus === 'rejected') {
      updateData.isVerified = false;
      updateData.rejectionReason = rejectionReason;
    }

    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile verification status updated successfully',
      data: { profile }
    });
  } catch (error) {
    console.error('Admin update profile verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile verification'
    });
  }
});

// @desc    Update profile membership
// @route   PUT /api/admin/profiles/:id/membership
// @access  Private (Admin only)
router.put('/profiles/:id/membership', async (req, res) => {
  try {
    const { membershipTier, isVip } = req.body;
    
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { membershipTier, isVip },
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile membership updated successfully',
      data: { profile }
    });
  } catch (error) {
    console.error('Admin update profile membership error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile membership'
    });
  }
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Don't allow deleting other admins
    if (user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete admin users'
      });
    }

    // Delete user's profile if exists
    await Profile.findOneAndDelete({ user: req.params.id });
    
    // Delete user
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User and associated profile deleted successfully'
    });
  } catch (error) {
    console.error('Admin delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting user'
    });
  }
});

// @desc    Get pending verifications
// @route   GET /api/admin/pending-verifications
// @access  Private (Admin only)
router.get('/pending-verifications', async (req, res) => {
  try {
    const pendingProfiles = await Profile.find({
      verificationStatus: 'pending'
    })
    .populate('user', 'name email createdAt')
    .sort({ createdAt: 1 }); // Oldest first

    res.status(200).json({
      success: true,
      data: {
        pendingProfiles,
        count: pendingProfiles.length
      }
    });
  } catch (error) {
    console.error('Admin pending verifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching pending verifications'
    });
  }
});

export default router;
