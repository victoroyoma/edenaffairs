import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Profile from '../models/Profile.js';

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const sampleProfiles = [
  {
    user: null, // Will be set after user creation
    displayName: 'Sophia',
    age: 24,
    location: { city: 'Lagos', state: 'Lagos', country: 'Nigeria' },
    height: '5\'6"',
    bodyType: 'Slim',
    ethnicity: 'African',
    bio: 'Elegant and sophisticated companion available for upscale social events and private meetings. I pride myself on being well-educated, articulate, and charming. Perfect for business dinners, social gatherings, or intimate conversations.',
    specialties: ['Dinner Dates', 'Social Events', 'Travel Companion'],
    languages: ['English', 'French'],
    contact: {
      phone: '+234-801-234-5678',
      whatsapp: '+234-801-234-5678',
      email: 'sophia@example.com'
    },
    pricing: {
      hourly: 50000,
      overnight: 200000,
      weekly: 1000000,
      currency: 'NGN'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
        isPrimary: true
      }
    ],
    isVerified: true,
    verificationStatus: 'approved',
    membershipTier: 'gold',
    isVip: true
  },
  {
    user: null,
    displayName: 'Isabella',
    age: 26,
    location: { city: 'Abuja', state: 'FCT', country: 'Nigeria' },
    height: '5\'4"',
    bodyType: 'Curvy',
    ethnicity: 'African',
    bio: 'Warm and engaging personality with a passion for meaningful connections. I enjoy cultural activities, fine dining, and stimulating conversations. Available for companionship that goes beyond the ordinary.',
    specialties: ['Cultural Events', 'Weekend Getaways', 'Intimate Dinners'],
    languages: ['English', 'Hausa'],
    contact: {
      phone: '+234-802-345-6789',
      telegram: '@isabella_ng',
      email: 'isabella@example.com'
    },
    pricing: {
      hourly: 40000,
      overnight: 150000,
      weekly: 800000,
      currency: 'NGN'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        isPrimary: true
      }
    ],
    isVerified: true,
    verificationStatus: 'approved',
    membershipTier: 'silver'
  },
  {
    user: null,
    displayName: 'Victoria',
    age: 28,
    location: { city: 'Port Harcourt', state: 'Rivers', country: 'Nigeria' },
    height: '5\'7"',
    bodyType: 'Athletic',
    ethnicity: 'African',
    bio: 'Professional and discreet companion with years of experience in providing exceptional service. I understand the importance of confidentiality and always maintain the highest standards of professionalism.',
    specialties: ['Business Meetings', 'Executive Companion', 'Private Sessions'],
    languages: ['English'],
    contact: {
      phone: '+234-803-456-7890',
      whatsapp: '+234-803-456-7890'
    },
    pricing: {
      hourly: 60000,
      overnight: 250000,
      weekly: 1200000,
      currency: 'NGN'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        isPrimary: true
      }
    ],
    isVerified: true,
    verificationStatus: 'approved',
    membershipTier: 'diamond',
    isVip: true
  },
  {
    user: null,
    displayName: 'Grace',
    age: 23,
    location: { city: 'Kano', state: 'Kano', country: 'Nigeria' },
    height: '5\'5"',
    bodyType: 'Average',
    ethnicity: 'African',
    bio: 'Young and vibrant companion with a zest for life. I love exploring new places, trying different cuisines, and engaging in fun activities. Perfect for those looking for a fresh and energetic experience.',
    specialties: ['Adventure Dates', 'City Tours', 'Casual Meetings'],
    languages: ['English', 'Hausa'],
    contact: {
      phone: '+234-804-567-8901',
      email: 'grace@example.com'
    },
    pricing: {
      hourly: 30000,
      overnight: 120000,
      weekly: 600000,
      currency: 'NGN'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        isPrimary: true
      }
    ],
    isVerified: true,
    verificationStatus: 'approved'
  },
  {
    user: null,
    displayName: 'Amara',
    age: 25,
    location: { city: 'Ibadan', state: 'Oyo', country: 'Nigeria' },
    height: '5\'3"',
    bodyType: 'Plus Size',
    ethnicity: 'African',
    bio: 'Confident and beautiful companion who believes that true beauty comes from within. I offer genuine connections and memorable experiences for those who appreciate authenticity and warmth.',
    specialties: ['Emotional Support', 'Long Conversations', 'Comfort Companion'],
    languages: ['English', 'Yoruba'],
    contact: {
      phone: '+234-805-678-9012',
      whatsapp: '+234-805-678-9012',
      telegram: '@amara_ib'
    },
    pricing: {
      hourly: 35000,
      overnight: 140000,
      weekly: 700000,
      currency: 'NGN'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400',
        isPrimary: true
      }
    ],
    isVerified: true,
    verificationStatus: 'approved',
    membershipTier: 'silver'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await Profile.deleteMany({});
    await User.deleteMany({});

    // Create admin user
    console.log('Creating admin user...');
    const adminUser = await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@edenaffair.ng',
      password: process.env.ADMIN_PASSWORD || 'AdminSecure123!',
      role: 'admin',
      isVerified: true,
      isActive: true
    });
    console.log('Admin user created:', adminUser.email);

    // Create sample client users
    console.log('Creating sample client users...');
    const client1 = await User.create({
      name: 'John Client',
      email: 'john@example.com',
      password: 'password123',
      role: 'client',
      isVerified: true,
      isActive: true
    });

    const client2 = await User.create({
      name: 'David User',
      email: 'david@example.com',
      password: 'password123',
      role: 'client',
      isVerified: true,
      isActive: true
    });

    console.log('Client users created');

    // Create escort users and profiles
    console.log('Creating escort users and profiles...');
    for (const [index, profileData] of sampleProfiles.entries()) {
      // Create user
      const user = await User.create({
        name: profileData.displayName,
        email: `${profileData.displayName.toLowerCase()}@example.com`,
        password: 'password123',
        role: 'escort',
        isVerified: true,
        isActive: true
      });

      // Create profile
      profileData.user = user._id;
      const profile = await Profile.create(profileData);
      
      console.log(`Created escort user and profile: ${profileData.displayName}`);
    }

    // Create some pending profiles for admin testing
    console.log('Creating pending profiles...');
    const pendingUser = await User.create({
      name: 'Pending User',
      email: 'pending@example.com',
      password: 'password123',
      role: 'escort',
      isVerified: false,
      isActive: true
    });

    await Profile.create({
      user: pendingUser._id,
      displayName: 'Pending Profile',
      age: 22,
      location: { city: 'Benin City', state: 'Edo', country: 'Nigeria' },
      bio: 'This is a pending profile waiting for admin approval.',
      contact: {
        phone: '+234-806-789-0123',
        email: 'pending@example.com'
      },
      pricing: {
        hourly: 25000,
        overnight: 100000,
        currency: 'NGN'
      },
      images: [
        {
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          isPrimary: true
        }
      ],
      verificationStatus: 'pending'
    });

    console.log('Database seeded successfully!');
    console.log('\nLogin Credentials:');
    console.log('Admin:', adminUser.email, '/', process.env.ADMIN_PASSWORD || 'AdminSecure123!');
    console.log('Client:', 'john@example.com / password123');
    console.log('Escort:', 'sophia@example.com / password123');
    
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
