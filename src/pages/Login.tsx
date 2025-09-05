import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsLoading(true);
    try {
      await login(formData.username, formData.password);
      
      // Check user role for redirect (this will be available in context after login)
      // Note: We'll need to access the user from context after login completes
      navigate('/');
    } catch (error: any) {
      setErrors({
        general: error.message || 'Login failed. Please check your credentials.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h1 className="text-2xl font-bold mb-6 text-center text-white">
              Sign In
            </h1>
            {errors.general && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                <p className="text-rose-400 text-sm">{errors.general}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <FormInput 
                label="Username" 
                id="username" 
                name="username" 
                type="text" 
                placeholder="Enter your username" 
                value={formData.username} 
                onChange={handleChange} 
                error={errors.username} 
              />
              <div className="mb-6 relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={formData.password} onChange={handleChange} className={`w-full bg-slate-800 border ${errors.password ? 'border-rose-500' : 'border-slate-700'} rounded-md px-3 py-2 text-gray-200 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-400`} />
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-rose-500">
                    {errors.password}
                  </p>}
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-amber-500 focus:ring-amber-400 border-slate-600 rounded bg-slate-700" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-amber-400 hover:text-amber-300">
                  Forgot password?
                </a>
              </div>
              <Button type="submit" fullWidth size="lg" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            <p className="mt-6 text-center text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-amber-400 hover:text-amber-300">
                Create Account
              </Link>
            </p>
          </div>
          
          {/* Demo Credentials */}
          <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-lg font-semibold mb-4 text-white text-center">
              🎯 Demo Login Credentials
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-amber-400 font-medium mb-2 flex items-center">
                  👑 Administrator
                </h3>
                <div className="text-sm text-gray-300 space-y-1">
                  <p><span className="text-gray-400">Username:</span> <code className="bg-slate-600 px-2 py-1 rounded">admin</code></p>
                  <p><span className="text-gray-400">Password:</span> <code className="bg-slate-600 px-2 py-1 rounded">demo</code></p>
                  <p className="text-xs text-gray-500 mt-2">Access admin dashboard, user management, and platform analytics</p>
                </div>
              </div>
              
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-pink-400 font-medium mb-2 flex items-center">
                  💃 Escort (Sophia Lagos)
                </h3>
                <div className="text-sm text-gray-300 space-y-1">
                  <p><span className="text-gray-400">Username:</span> <code className="bg-slate-600 px-2 py-1 rounded">sophia_lagos</code></p>
                  <p><span className="text-gray-400">Password:</span> <code className="bg-slate-600 px-2 py-1 rounded">demo</code></p>
                  <p className="text-xs text-gray-500 mt-2">Access escort dashboard, profile management, and earnings</p>
                </div>
              </div>
              
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-blue-400 font-medium mb-2 flex items-center">
                  👤 Client (John)
                </h3>
                <div className="text-sm text-gray-300 space-y-1">
                  <p><span className="text-gray-400">Username:</span> <code className="bg-slate-600 px-2 py-1 rounded">john_client</code></p>
                  <p><span className="text-gray-400">Password:</span> <code className="bg-slate-600 px-2 py-1 rounded">demo</code></p>
                  <p className="text-xs text-gray-500 mt-2">Browse profiles, access premium features, and view bookings</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-amber-300 text-xs text-center mb-3">
                💡 <strong>Demo Mode:</strong> All data is simulated. No backend required for testing dashboards.
              </p>
              
              {/* Quick Login Buttons */}
              <div className="flex gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ username: 'admin', password: 'demo' });
                  }}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-xs rounded transition-colors"
                >
                  Fill Admin
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ username: 'sophia_lagos', password: 'demo' });
                  }}
                  className="px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white text-xs rounded transition-colors"
                >
                  Fill Escort
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ username: 'john_client', password: 'demo' });
                  }}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                >
                  Fill Client
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}