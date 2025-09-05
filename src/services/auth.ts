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

// Demo mode flag
const DEMO_MODE = true;

// Demo users data
const DEMO_USERS = [
  {
    id: 'admin-1',
    name: 'Administrator',
    username: 'admin',
    role: 'admin' as const,
    isVerified: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    password: 'demo'
  },
  {
    id: 'escort-1',
    name: 'Sophia Lagos',
    username: 'sophia_lagos',
    role: 'escort' as const,
    isVerified: true,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastLogin: new Date().toISOString(),
    password: 'demo'
  },
  {
    id: 'client-1',
    name: 'John Client',
    username: 'john_client',
    role: 'client' as const,
    isVerified: true,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    lastLogin: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    password: 'demo'
  }
];

// Demo Authentication Class
class DemoAuth {
  private static generateToken(user: any): string {
    return `demo_token_${user.id}_${Date.now()}`;
  }

  static async simulateLogin(username: string, password: string): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find user in demo data
    const user = DEMO_USERS.find(u => u.username === username && u.password === password);
    
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const token = this.generateToken(user);
    
    // Store token in localStorage
    localStorage.setItem('edenaffair_token', token);
    localStorage.setItem('edenaffair_user', JSON.stringify({
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    }));

    return {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      },
      profile: null,
      token
    };
  }

  static async simulateRegister(data: RegisterRequest): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if username already exists
    const existingUser = DEMO_USERS.find(u => u.username === data.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Create new user
    const newUser = {
      id: `demo-${Date.now()}`,
      name: data.name,
      username: data.username,
      role: data.role,
      isVerified: false,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      password: data.password
    };

    // Add to demo users (in real app, this would be saved to database)
    DEMO_USERS.push(newUser);

    const token = this.generateToken(newUser);
    
    // Store token in localStorage
    localStorage.setItem('edenaffair_token', token);
    localStorage.setItem('edenaffair_user', JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      role: newUser.role,
      isVerified: newUser.isVerified,
      createdAt: newUser.createdAt,
      lastLogin: newUser.lastLogin
    }));

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        role: newUser.role,
        isVerified: newUser.isVerified,
        createdAt: newUser.createdAt,
        lastLogin: newUser.lastLogin
      },
      profile: null,
      token
    };
  }

  static getCurrentUser(): User | null {
    const userJson = localStorage.getItem('edenaffair_user');
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch {
        return null;
      }
    }
    return null;
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem('edenaffair_token');
  }

  static logout(): void {
    localStorage.removeItem('edenaffair_token');
    localStorage.removeItem('edenaffair_user');
  }
}

// Authentication Service
export class AuthService {
  // Register new user
  static async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    if (DEMO_MODE) {
      try {
        const authResponse = await DemoAuth.simulateRegister(data);
        return {
          success: true,
          data: authResponse,
          message: 'Registration successful'
        };
      } catch (error) {
        return {
          success: false,
          errors: [error instanceof Error ? error.message : 'Registration failed']
        };
      }
    }

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
    if (DEMO_MODE) {
      try {
        const authResponse = await DemoAuth.simulateLogin(data.username, data.password);
        return {
          success: true,
          data: authResponse,
          message: 'Login successful'
        };
      } catch (error) {
        return {
          success: false,
          errors: [error instanceof Error ? error.message : 'Login failed']
        };
      }
    }

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
    if (DEMO_MODE) {
      DemoAuth.logout();
      return;
    }

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
    if (DEMO_MODE) {
      const user = DemoAuth.getCurrentUser();
      if (user) {
        return {
          success: true,
          data: { user },
          message: 'User retrieved successfully'
        };
      } else {
        return {
          success: false,
          errors: ['No authenticated user found']
        };
      }
    }

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
    if (DEMO_MODE) {
      return DemoAuth.isAuthenticated();
    }
    return !!localStorage.getItem('edenaffair_token');
  }

  // Get stored token
  static getToken(): string | null {
    return localStorage.getItem('edenaffair_token');
  }

  // Verify token validity
  static async verifyToken(): Promise<boolean> {
    if (DEMO_MODE) {
      return DemoAuth.isAuthenticated();
    }

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
