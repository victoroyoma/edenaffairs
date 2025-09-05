import { apiClient, ApiResponse, User, Profile } from './api';

// Auth request/response types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  username: string;
  password: string;
  role: 'escort' | 'client';
}

export interface AuthResponse {
  user: User;
  profile?: Profile | null;
  token: string;
}

// Authentication Service
export class AuthService {
  // Register new user
  static async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      
      if (response.success && response.data?.token) {
        apiClient.setToken(response.data.token);
      }
      
      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Registration failed');
    }
  }

  // Login user
  static async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', data);
      
      if (response.success && response.data?.token) {
        apiClient.setToken(response.data.token);
      }
      
      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  }

  // Logout user
  static async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      apiClient.removeToken();
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<ApiResponse<{ user: User; profile?: Profile }>> {
    try {
      return await apiClient.get<{ user: User; profile?: Profile }>('/auth/me');
    } catch (error) {
      // If token is invalid, remove it
      if (error instanceof Error && error.message.includes('401')) {
        apiClient.removeToken();
      }
      throw error;
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('edenaffair_token');
  }

  // Get stored token
  static getToken(): string | null {
    return localStorage.getItem('edenaffair_token');
  }

  // Verify token validity
  static async verifyToken(): Promise<boolean> {
    try {
      const response = await this.getCurrentUser();
      return response.success;
    } catch (error) {
      return false;
    }
  }
}

// Export as default
export default AuthService;
