import { apiClient, ApiResponse, Profile } from './api';

// Profile request types
export interface CreateProfileRequest {
  displayName: string;
  age: number;
  location: {
    city: string;
    state: string;
    country?: string;
  };
  height?: string;
  bodyType?: string;
  ethnicity?: string;
  bio: string;
  specialties?: string[];
  languages?: string[];
  contact?: {
    phone?: string;
    whatsapp?: string;
    telegram?: string;
    email?: string;
  };
  pricing?: {
    hourly?: number;
    overnight?: number;
    weekly?: number;
    currency?: string;
  };
}

export interface UpdateProfileRequest extends Partial<CreateProfileRequest> {}

export interface ProfileFilters {
  page?: number;
  limit?: number;
  city?: string;
  state?: string;
  minAge?: number;
  maxAge?: number;
  membershipTier?: string;
  isVip?: boolean;
  sort?: 'newest' | 'popular' | 'alphabetical' | 'age_asc' | 'age_desc';
}

export interface ProfilesResponse {
  profiles: Profile[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProfiles: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Profile Service
export class ProfileService {
  // Get all profiles (public)
  static async getProfiles(filters: ProfileFilters = {}): Promise<ApiResponse<ProfilesResponse>> {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });

      const queryString = params.toString();
      const endpoint = queryString ? `/profiles?${queryString}` : '/profiles';
      
      return await apiClient.get<ProfilesResponse>(endpoint);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch profiles');
    }
  }

  // Get single profile by ID
  static async getProfile(id: string): Promise<ApiResponse<{ profile: Profile }>> {
    try {
      return await apiClient.get<{ profile: Profile }>(`/profiles/${id}`);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch profile');
    }
  }

  // Get my profile (for authenticated escorts)
  static async getMyProfile(): Promise<ApiResponse<{ profile: Profile }>> {
    try {
      return await apiClient.get<{ profile: Profile }>('/profiles/me/profile');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch your profile');
    }
  }

  // Create profile (escort only)
  static async createProfile(data: CreateProfileRequest): Promise<ApiResponse<{ profile: Profile }>> {
    try {
      return await apiClient.post<{ profile: Profile }>('/profiles', data);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to create profile');
    }
  }

  // Update profile
  static async updateProfile(id: string, data: UpdateProfileRequest): Promise<ApiResponse<{ profile: Profile }>> {
    try {
      return await apiClient.put<{ profile: Profile }>(`/profiles/${id}`, data);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update profile');
    }
  }

  // Delete profile
  static async deleteProfile(id: string): Promise<ApiResponse<any>> {
    try {
      return await apiClient.delete(`/profiles/${id}`);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to delete profile');
    }
  }

  // Get profile contact information (paid access)
  static async getProfileContact(id: string): Promise<ApiResponse<{ contact: any; displayName: string }>> {
    try {
      return await apiClient.get<{ contact: any; displayName: string }>(`/profiles/${id}/contact`);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to get contact information');
    }
  }

  // Upload profile images
  static async uploadImages(files: FileList): Promise<ApiResponse<{ uploadedImages: any[]; totalImages: number }>> {
    try {
      const formData = new FormData();
      
      // Add all files to FormData
      Array.from(files).forEach((file) => {
        formData.append('images', file);
      });

      return await apiClient.uploadFile<{ uploadedImages: any[]; totalImages: number }>('/upload/profile-images', formData);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to upload images');
    }
  }

  // Delete profile image
  static async deleteImage(imageId: string): Promise<ApiResponse<{ remainingImages: number }>> {
    try {
      return await apiClient.delete<{ remainingImages: number }>(`/upload/profile-images/${imageId}`);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to delete image');
    }
  }

  // Set primary image
  static async setPrimaryImage(imageId: string): Promise<ApiResponse<{ primaryImage: any }>> {
    try {
      return await apiClient.put<{ primaryImage: any }>(`/upload/profile-images/${imageId}/primary`);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to set primary image');
    }
  }
}

// Export as default
export default ProfileService;
