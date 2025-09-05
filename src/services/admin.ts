import { apiClient, ApiResponse, User, Profile } from './api';

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

// Admin Service
export class AdminService {
  // Get dashboard statistics
  static async getStats(): Promise<ApiResponse<AdminStats>> {
    try {
      return await apiClient.get<AdminStats>('/admin/stats');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch admin stats');
    }
  }

  // User Management
  static async getUsers(filters: UserFilters = {}): Promise<ApiResponse<UsersResponse>> {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });

      const queryString = params.toString();
      const endpoint = queryString ? `/admin/users?${queryString}` : '/admin/users';
      
      return await apiClient.get<UsersResponse>(endpoint);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch users');
    }
  }

  static async updateUserStatus(userId: string, data: UpdateUserStatusRequest): Promise<ApiResponse<{ user: User }>> {
    try {
      return await apiClient.put<{ user: User }>(`/admin/users/${userId}/status`, data);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update user status');
    }
  }

  static async deleteUser(userId: string): Promise<ApiResponse<any>> {
    try {
      return await apiClient.delete(`/admin/users/${userId}`);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to delete user');
    }
  }

  // Profile Management
  static async getProfiles(filters: ProfileFilters = {}): Promise<ApiResponse<ProfilesResponse>> {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });

      const queryString = params.toString();
      const endpoint = queryString ? `/admin/profiles?${queryString}` : '/admin/profiles';
      
      return await apiClient.get<ProfilesResponse>(endpoint);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch profiles');
    }
  }

  static async updateProfileVerification(
    profileId: string, 
    data: UpdateProfileVerificationRequest
  ): Promise<ApiResponse<{ profile: Profile }>> {
    try {
      return await apiClient.put<{ profile: Profile }>(`/admin/profiles/${profileId}/verification`, data);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update profile verification');
    }
  }

  static async updateProfileMembership(
    profileId: string, 
    data: UpdateProfileMembershipRequest
  ): Promise<ApiResponse<{ profile: Profile }>> {
    try {
      return await apiClient.put<{ profile: Profile }>(`/admin/profiles/${profileId}/membership`, data);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update profile membership');
    }
  }

  // Pending verifications
  static async getPendingVerifications(): Promise<ApiResponse<{ pendingProfiles: Profile[]; count: number }>> {
    try {
      return await apiClient.get<{ pendingProfiles: Profile[]; count: number }>('/admin/pending-verifications');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch pending verifications');
    }
  }

  // Bulk actions
  static async bulkApproveProfiles(profileIds: string[]): Promise<ApiResponse<any>> {
    try {
      const promises = profileIds.map(id => 
        this.updateProfileVerification(id, { verificationStatus: 'approved' })
      );
      
      await Promise.all(promises);
      
      return {
        success: true,
        message: `${profileIds.length} profiles approved successfully`
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Bulk approval failed');
    }
  }

  static async bulkRejectProfiles(profileIds: string[], reason: string): Promise<ApiResponse<any>> {
    try {
      const promises = profileIds.map(id => 
        this.updateProfileVerification(id, { 
          verificationStatus: 'rejected',
          rejectionReason: reason 
        })
      );
      
      await Promise.all(promises);
      
      return {
        success: true,
        message: `${profileIds.length} profiles rejected successfully`
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Bulk rejection failed');
    }
  }

  static async bulkUpdateMembership(
    profileIds: string[], 
    membershipData: UpdateProfileMembershipRequest
  ): Promise<ApiResponse<any>> {
    try {
      const promises = profileIds.map(id => 
        this.updateProfileMembership(id, membershipData)
      );
      
      await Promise.all(promises);
      
      return {
        success: true,
        message: `${profileIds.length} profiles updated successfully`
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Bulk membership update failed');
    }
  }
}

// Export as default
export default AdminService;
