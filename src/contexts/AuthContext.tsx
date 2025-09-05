import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, Profile } from '../services/api';
import { AuthService } from '../services/auth';

// Auth State
interface AuthState {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Auth Actions
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; profile?: Profile | null; token: string } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: Profile }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: AuthState = {
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        profile: action.payload.profile || null,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        profile: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        profile: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: action.payload,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// Auth Context
interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  register: (name: string, username: string, password: string, role: 'escort' | 'client') => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Profile) => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;
  getDefaultRoute: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check if user is authenticated
  const checkAuth = async () => {
    if (!AuthService.isAuthenticated()) {
      dispatch({ type: 'AUTH_LOGOUT' });
      return;
    }

    try {
      dispatch({ type: 'AUTH_START' });
      const response = await AuthService.getCurrentUser();
      
      if (response.success && response.data) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: response.data.user,
            profile: response.data.profile,
            token: AuthService.getToken() || '',
          },
        });
      } else {
        throw new Error('Failed to get user data');
      }
    } catch (error) {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: error instanceof Error ? error.message : 'Authentication failed',
      });
      AuthService.logout();
    }
  };

  // Login function
  const login = async (username: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const response = await AuthService.login({ username, password });
      
      if (response.success && response.data) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: response.data.user,
            profile: response.data.profile,
            token: response.data.token,
          },
        });
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: error instanceof Error ? error.message : 'Login failed',
      });
      throw error;
    }
  };

  // Register function
  const register = async (name: string, username: string, password: string, role: 'escort' | 'client') => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const response = await AuthService.register({ name, username, password, role });
      
      if (response.success && response.data) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: response.data.user,
            profile: response.data.profile,
            token: response.data.token,
          },
        });
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: error instanceof Error ? error.message : 'Registration failed',
      });
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  // Update profile function
  const updateProfile = (profile: Profile) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profile });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Get default route based on user role
  const getDefaultRoute = (): string => {
    if (!state.user) return '/';
    
    switch (state.user.role) {
      case 'admin':
        return '/admin';
      case 'escort':
        return '/dashboard';
      case 'client':
        return '/browse';
      default:
        return '/';
    }
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    clearError,
    checkAuth,
    getDefaultRoute,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use Auth Context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
