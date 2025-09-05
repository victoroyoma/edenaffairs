import { ApiResponse, User, Profile } from './api';

// Admin dashboard stats
export interface AdminStats {
  overview: {
    totalUsers: number;
    totalEscorts: number;
    totalClients: number;
    totalProfiles: number;
    verifiedProfiles: number;
    pendingProfiles: number;
    vipProfiles: number;
  };
  activity: {
    newUsersThisMonth: number;
    newProfilesThisMonth: number;
  };
  popularProfiles: Profile[];
}

// Demo mock data
const DEMO_ADMIN_STATS: AdminStats = {
  overview: {
    totalUsers: 1247,
    totalEscorts: 389,
    totalClients: 845,
    totalProfiles: 389,
    verifiedProfiles: 342,
    pendingProfiles: 23,
    vipProfiles: 127
  },
  activity: {
    newUsersThisMonth: 87,
    newProfilesThisMonth: 34
  },
  popularProfiles: []
};

const DEMO_USERS: User[] = [
  {
    id: 'admin-1',
    name: 'Administrator',
    username: 'admin',
    role: 'admin',
    isVerified: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  {
    id: 'escort-1',
    name: 'Sophia Lagos',
    username: 'sophia_lagos',
    role: 'escort',
    isVerified: true,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastLogin: new Date().toISOString()
  },
  {
    id: 'escort-2',
    name: 'Amara Abuja',
    username: 'amara_abuja',
    role: 'escort',
    isVerified: true,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'client-1',
    name: 'John Client',
    username: 'john_client',
    role: 'client',
    isVerified: true,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    lastLogin: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: 'client-2',
    name: 'Michael Premium',
    username: 'michael_premium',
    role: 'client',
    isVerified: true,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'escort-3',
    name: 'Grace Port Harcourt',
    username: 'grace_ph',
    role: 'escort',
    isVerified: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastLogin: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  }
];

const DEMO_PROFILES: Profile[] = [
  {
    id: 'profile-1',
    user: 'escort-1',
    displayName: 'Sophia Lagos',
    age: 25,
    location: { city: 'Lagos', state: 'Lagos', country: 'Nigeria' },
    height: '5\'7"',
    bodyType: 'Curvy',
    ethnicity: 'African',
    bio: 'Professional and discreet companion offering premium services in Lagos.',
    specialties: ['Dinner dates', 'Travel companion', 'Social events'],
    languages: ['English', 'Yoruba'],
    images: [],
    contact: {
      telegram: '@sophia_lagos',
      whatsapp: '+234-801-234-5678',
      phone: '+234-801-234-5678',
      email: 'sophia@example.com'
    },
    pricing: { hourly: 50000, overnight: 150000, currency: 'NGN' },
    isActive: true,
    isVerified: true,
    isVip: true,
    membershipTier: 'gold',
    views: 234,
    likes: 89,
    contactUnlocks: 45,
    verificationStatus: 'approved',
    lastActive: new Date().toISOString(),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'profile-2',
    user: 'escort-2',
    displayName: 'Amara Abuja',
    age: 28,
    location: { city: 'Abuja', state: 'FCT', country: 'Nigeria' },
    height: '5\'5"',
    bodyType: 'Slim',
    ethnicity: 'African',
    bio: 'Elegant companion based in Abuja, perfect for business events and dinners.',
    specialties: ['Business events', 'Fine dining', 'Cultural tours'],
    languages: ['English', 'Hausa'],
    images: [],
    contact: {
      telegram: '@amara_abuja',
      whatsapp: '+234-802-345-6789',
      phone: '+234-802-345-6789'
    },
    pricing: { hourly: 75000, overnight: 200000, currency: 'NGN' },
    isActive: true,
    isVerified: true,
    isVip: true,
    membershipTier: 'diamond',
    views: 567,
    likes: 134,
    contactUnlocks: 89,
    verificationStatus: 'approved',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'profile-3',
    user: 'escort-3',
    displayName: 'Grace Port Harcourt',
    age: 23,
    location: { city: 'Port Harcourt', state: 'Rivers', country: 'Nigeria' },
    height: '5\'6"',
    bodyType: 'Athletic',
    ethnicity: 'African',
    bio: 'Young and vibrant companion new to the platform.',
    specialties: ['Casual dates', 'Adventure'],
    languages: ['English'],
    images: [],
    contact: {
      whatsapp: '+234-803-456-7890'
    },
    pricing: { hourly: 25000, overnight: 80000, currency: 'NGN' },
    isActive: false,
    isVerified: false,
    isVip: false,
    membershipTier: 'silver',
    views: 12,
    likes: 3,
    contactUnlocks: 0,
    verificationStatus: 'pending',
    lastActive: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// User management types
export interface UserFilters {
  page?: number;
  limit?: number;
  role?: string;
  isActive?: boolean;
  isVerified?: boolean;
}

export interface UsersResponse {
  users: User[];
  pagination: {
    currentPage: number;
    totalPages: number;
    total: number;
  };
}

// Profile management types
export interface ProfileFilters {
  page?: number;
  limit?: number;
  verificationStatus?: string;
  isActive?: boolean;
  isVip?: boolean;
  membershipTier?: string;
}

export interface ProfilesResponse {
  profiles: Profile[];
  pagination: {
    currentPage: number;
    totalPages: number;
    total: number;
  };
}

// Update requests
export interface UpdateUserStatusRequest {
  isActive: boolean;
  isVerified: boolean;
}

export interface UpdateProfileVerificationRequest {
  verificationStatus: 'pending' | 'approved' | 'rejected' | 'suspended';
  rejectionReason?: string;
  adminNotes?: string;
}

export interface UpdateProfileMembershipRequest {
  membershipTier: '' | 'silver' | 'gold' | 'diamond';
  isVip: boolean;
}

// Demo Admin Service
export class DemoAdminService {
  // Get dashboard statistics
  static async getStats(): Promise<ApiResponse<AdminStats>> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const statsWithProfiles = {
      ...DEMO_ADMIN_STATS,
      popularProfiles: DEMO_PROFILES.slice(0, 3)
    };
    
    return {
      success: true,
      data: statsWithProfiles,
      message: 'Admin stats retrieved successfully'
    };
  }

  // User Management
  static async getUsers(filters: UserFilters = {}): Promise<ApiResponse<UsersResponse>> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let filteredUsers = DEMO_USERS;
    if (filters.role) {
      filteredUsers = DEMO_USERS.filter(user => user.role === filters.role);
    }
    
    return {
      success: true,
      data: {
        users: filteredUsers,
        pagination: {
          currentPage: filters.page || 1,
          totalPages: 1,
          total: filteredUsers.length
        }
      },
      message: 'Users retrieved successfully'
    };
  }

  static async updateUserStatus(userId: string, data: UpdateUserStatusRequest): Promise<ApiResponse<{ user: User }>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = DEMO_USERS.find(u => u.id === userId);
    if (user) {
      // Update user status with the provided data
      Object.assign(user, {
        isVerified: data.isVerified,
        // In a real implementation, isActive would be part of the User interface
      });
      
      return {
        success: true,
        data: { user },
        message: `User status updated successfully - Active: ${data.isActive}, Verified: ${data.isVerified}`
      };
    }
    
    return {
      success: false,
      message: 'User not found'
    };
  }

  static async deleteUser(userId: string): Promise<ApiResponse<any>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userIndex = DEMO_USERS.findIndex(u => u.id === userId);
    if (userIndex > -1) {
      DEMO_USERS.splice(userIndex, 1);
      
      return {
        success: true,
        data: { message: 'User deleted successfully' },
        message: 'User deleted successfully'
      };
    }
    
    return {
      success: false,
      errors: ['User not found']
    };
  }

  // Profile Management
  static async getProfiles(filters: ProfileFilters = {}): Promise<ApiResponse<ProfilesResponse>> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let filteredProfiles = DEMO_PROFILES;
    if (filters.verificationStatus) {
      if (filters.verificationStatus === 'verified') {
        filteredProfiles = DEMO_PROFILES.filter(profile => profile.isVerified);
      } else if (filters.verificationStatus === 'pending') {
        filteredProfiles = DEMO_PROFILES.filter(profile => !profile.isVerified);
      }
    }
    if (filters.isVip !== undefined) {
      filteredProfiles = filteredProfiles.filter(profile => profile.isVip === filters.isVip);
    }
    
    return {
      success: true,
      data: {
        profiles: filteredProfiles,
        pagination: {
          currentPage: filters.page || 1,
          totalPages: 1,
          total: filteredProfiles.length
        }
      },
      message: 'Profiles retrieved successfully'
    };
  }

  static async updateProfileVerification(
    profileId: string, 
    data: UpdateProfileVerificationRequest
  ): Promise<ApiResponse<{ profile: Profile }>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const profile = DEMO_PROFILES.find(p => p.id === profileId);
    if (profile) {
      profile.verificationStatus = data.verificationStatus;
      if (data.verificationStatus === 'approved') {
        profile.isVerified = true;
      } else if (data.verificationStatus === 'rejected') {
        profile.isVerified = false;
      }
      
      return {
        success: true,
        data: { profile },
        message: `Profile ${data.verificationStatus} successfully`
      };
    }
    
    return {
      success: false,
      errors: ['Profile not found']
    };
  }

  static async updateProfileMembership(
    profileId: string, 
    data: UpdateProfileMembershipRequest
  ): Promise<ApiResponse<{ profile: Profile }>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const profile = DEMO_PROFILES.find(p => p.id === profileId);
    if (profile) {
      profile.membershipTier = data.membershipTier;
      profile.isVip = data.isVip;
      
      return {
        success: true,
        data: { profile },
        message: 'Profile membership updated successfully'
      };
    }
    
    return {
      success: false,
      errors: ['Profile not found']
    };
  }

  // Pending verifications
  static async getPendingVerifications(): Promise<ApiResponse<{ pendingProfiles: Profile[]; count: number }>> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const pendingProfiles = DEMO_PROFILES.filter(profile => !profile.isVerified);
    
    return {
      success: true,
      data: { 
        pendingProfiles,
        count: pendingProfiles.length
      },
      message: 'Pending verifications retrieved successfully'
    };
  }

  // Bulk actions
  static async bulkApproveProfiles(profileIds: string[]): Promise<ApiResponse<any>> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    profileIds.forEach(id => {
      const profile = DEMO_PROFILES.find(p => p.id === id);
      if (profile) {
        profile.verificationStatus = 'approved';
        profile.isVerified = true;
      }
    });
    
    return {
      success: true,
      data: { message: `${profileIds.length} profiles approved successfully` },
      message: `${profileIds.length} profiles approved successfully`
    };
  }

  static async bulkRejectProfiles(profileIds: string[], reason: string): Promise<ApiResponse<any>> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    profileIds.forEach(id => {
      const profile = DEMO_PROFILES.find(p => p.id === id);
      if (profile) {
        profile.verificationStatus = 'rejected';
        profile.isVerified = false;
        // In a real implementation, we would store the rejection reason
        console.log(`Profile ${id} rejected for reason: ${reason}`);
      }
    });
    
    return {
      success: true,
      message: `${profileIds.length} profiles rejected successfully for reason: ${reason}`
    };
  }

  static async bulkUpdateMembership(
    profileIds: string[], 
    membershipData: UpdateProfileMembershipRequest
  ): Promise<ApiResponse<any>> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    profileIds.forEach(id => {
      const profile = DEMO_PROFILES.find(p => p.id === id);
      if (profile) {
        profile.membershipTier = membershipData.membershipTier;
        profile.isVip = membershipData.isVip;
      }
    });
    
    return {
      success: true,
      data: { message: `${profileIds.length} profiles updated successfully` },
      message: `${profileIds.length} profiles updated successfully`
    };
  }
}

// Export demo service as default
export default DemoAdminService;
