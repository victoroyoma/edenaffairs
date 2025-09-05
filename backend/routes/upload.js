import express from 'express';
import path from 'path';
import { protect } from '../middleware/auth.js';
import Profile from '../models/Profile.js';

const router = express.Router();

// @desc    Upload profile images
// @route   POST /api/upload/profile-images
// @access  Private
router.post('/profile-images', protect, async (req, res) => {
  try {
    if (!req.files || !req.files.images) {
      return res.status(400).json({
        success: false,
        message: 'No images uploaded'
      });
    }

    // Get user's profile
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
    const uploadedImages = [];

    // Validate and process each image
    for (const image of images) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(image.mimetype)) {
        return res.status(400).json({
          success: false,
          message: `Invalid file type: ${image.mimetype}. Only JPEG, PNG, and WebP are allowed.`
        });
      }

      // Validate file size (max 5MB per image)
      if (image.size > 5 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: 'Image size too large. Maximum 5MB per image.'
        });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      const extension = path.extname(image.name);
      const filename = `profile_${req.user.id}_${timestamp}_${random}${extension}`;
      
      // Create upload path
      const uploadPath = path.join(process.cwd(), 'uploads', 'profiles', filename);

      try {
        // Move file to uploads directory
        await image.mv(uploadPath);

        // Add to uploaded images array
        uploadedImages.push({
          url: `/uploads/profiles/${filename}`,
          filename: filename,
          originalName: image.name,
          size: image.size,
          mimetype: image.mimetype,
          isPrimary: profile.images.length === 0 && uploadedImages.length === 0 // First image is primary
        });
      } catch (uploadError) {
        console.error('File upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Error uploading file'
        });
      }
    }

    // Update profile with new images
    profile.images.push(...uploadedImages);
    await profile.save();

    res.status(200).json({
      success: true,
      message: `${uploadedImages.length} image(s) uploaded successfully`,
      data: {
        uploadedImages,
        totalImages: profile.images.length
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during upload'
    });
  }
});

// @desc    Delete profile image
// @route   DELETE /api/upload/profile-images/:imageId
// @access  Private
router.delete('/profile-images/:imageId', protect, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const imageIndex = profile.images.findIndex(
      img => img._id.toString() === req.params.imageId
    );

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    const image = profile.images[imageIndex];

    // Remove image from filesystem
    try {
      const fs = await import('fs').then(module => module.promises);
      const imagePath = path.join(process.cwd(), 'uploads', 'profiles', path.basename(image.url));
      await fs.unlink(imagePath);
    } catch (fileError) {
      console.warn('Could not delete file:', fileError.message);
    }

    // Remove image from profile
    profile.images.splice(imageIndex, 1);

    // If this was the primary image and there are other images, make the first one primary
    if (image.isPrimary && profile.images.length > 0) {
      profile.images[0].isPrimary = true;
    }

    await profile.save();

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
      data: {
        remainingImages: profile.images.length
      }
    });

  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting image'
    });
  }
});

// @desc    Set primary image
// @route   PUT /api/upload/profile-images/:imageId/primary
// @access  Private
router.put('/profile-images/:imageId/primary', protect, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const imageIndex = profile.images.findIndex(
      img => img._id.toString() === req.params.imageId
    );

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Reset all images to not primary
    profile.images.forEach(img => {
      img.isPrimary = false;
    });

    // Set the selected image as primary
    profile.images[imageIndex].isPrimary = true;

    await profile.save();

    res.status(200).json({
      success: true,
      message: 'Primary image updated successfully',
      data: {
        primaryImage: profile.images[imageIndex]
      }
    });

  } catch (error) {
    console.error('Set primary image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while setting primary image'
    });
  }
});

export default router;
