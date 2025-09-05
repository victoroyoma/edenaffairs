// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// API Client class
class ApiClient {
  private baseURL: string;
  private token: string | null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('edenaffair_token');
  }

  // Set authentication token
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('edenaffair_token', token);
  }

  // Remove authentication token
  removeToken() {
    this.token = null;
    localStorage.removeItem('edenaffair_token');
  }

  // Get authentication headers
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // File upload method
  async uploadFile<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    total: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// User Types
export interface User {
  id: string;
  name: string;
  username: string;
  role: 'escort' | 'client' | 'admin';
  isVerified: boolean;
  createdAt: string;
  lastLogin?: string;
}

// Profile Types
export interface Profile {
  id: string;
  user: User | string;
  displayName: string;
  age: number;
  location: {
    city: string;
    state: string;
    country: string;
  };
  height?: string;
  bodyType?: string;
  ethnicity?: string;
  bio: string;
  specialties: string[];
  languages: string[];
  images: ProfileImage[];
  contact?: {
    phone?: string;
    whatsapp?: string;
    telegram?: string;
    email?: string;
  };
  pricing: {
    hourly?: number;
    overnight?: number;
    weekly?: number;
    currency: string;
  };
  isActive: boolean;
  isVerified: boolean;
  isVip: boolean;
  membershipTier: '' | 'silver' | 'gold' | 'diamond';
  views: number;
  likes: number;
  contactUnlocks: number;
  verificationStatus: 'pending' | 'approved' | 'rejected' | 'suspended';
  rejectionReason?: string;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileImage {
  _id?: string;
  url: string;
  publicId?: string;
  isPrimary: boolean;
  uploadedAt: string;
}

// Create API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export API base URL for direct usage
export { API_BASE_URL };
