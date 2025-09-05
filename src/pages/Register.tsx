import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Phone, MapPin, Calendar, Shield } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

interface FormData {
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
  age: string;
  location: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
  verifyAge: boolean;
}

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
    age: '',
    location: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    verifyAge: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
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
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 19) {
      newErrors.age = 'You must be at least 19 years old';
    } else if (parseInt(formData.age) > 80) {
      newErrors.age = 'Please enter a valid age';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.verifyAge) {
      newErrors.verifyAge = 'You must verify you are 19 or older and legally able to provide escort services';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Escort Terms of Service';
    }

    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsLoading(true);
    try {
      // All registrations are for escorts since clients don't register
      await register(formData.username, formData.username, formData.password, 'escort');
      
      // Always redirect to profile creation for escorts
      navigate('/create-profile');
    } catch (error: any) {
      setErrors({
        general: error.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Join as an Escort
              </h1>
              <p className="text-gray-400">
                Create your professional escort profile on EdenAffair
              </p>
            </div>

            {errors.general && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                <p className="text-rose-400 text-sm">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full bg-slate-800/90 backdrop-blur-sm border ${
                      errors.username ? 'border-rose-500' : 'border-slate-700'
                    } rounded-lg pl-10 pr-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all`}
                  />
                </div>
                {errors.username && (
                  <p className="mt-2 text-sm text-rose-400">{errors.username}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-slate-800/90 backdrop-blur-sm border ${
                      errors.phone ? 'border-rose-500' : 'border-slate-700'
                    } rounded-lg pl-10 pr-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-2 text-sm text-rose-400">{errors.phone}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-200 mb-2">
                    Age
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="19"
                      max="80"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleChange}
                      className={`w-full bg-slate-800/90 backdrop-blur-sm border ${
                        errors.age ? 'border-rose-500' : 'border-slate-700'
                      } rounded-lg pl-10 pr-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all`}
                    />
                  </div>
                  {errors.age && (
                    <p className="mt-2 text-sm text-rose-400">{errors.age}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-200 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full bg-slate-800/90 backdrop-blur-sm border ${
                        errors.location ? 'border-rose-500' : 'border-slate-700'
                      } rounded-lg pl-10 pr-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all`}
                    />
                  </div>
                  {errors.location && (
                    <p className="mt-2 text-sm text-rose-400">{errors.location}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full bg-slate-800/90 backdrop-blur-sm border ${
                      errors.password ? 'border-rose-500' : 'border-slate-700'
                    } rounded-lg px-4 py-3 text-gray-200 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-rose-400">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full bg-slate-800/90 backdrop-blur-sm border ${
                      errors.confirmPassword ? 'border-rose-500' : 'border-slate-700'
                    } rounded-lg px-4 py-3 text-gray-200 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-rose-400">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Verification and Agreement Section */}
              <div className="space-y-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-amber-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-200">Professional Verification & Agreement</span>
                </div>
                
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="verifyAge"
                      checked={formData.verifyAge}
                      onChange={handleChange}
                      className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-700 text-amber-400 focus:ring-amber-400 focus:ring-offset-slate-800"
                    />
                    <span className="text-sm text-gray-300">
                      I verify that I am 19 years of age or older and legally able to provide escort services
                    </span>
                  </label>
                  {errors.verifyAge && (
                    <p className="ml-7 text-sm text-rose-400">{errors.verifyAge}</p>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-700 text-amber-400 focus:ring-amber-400 focus:ring-offset-slate-800"
                    />
                    <span className="text-sm text-gray-300">
                      I agree to the{' '}
                      <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors">
                        Escort Terms of Service
                      </a>{' '}
                      and understand the platform requirements for professional escort services
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="ml-7 text-sm text-rose-400">{errors.agreeToTerms}</p>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onChange={handleChange}
                      className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-700 text-amber-400 focus:ring-amber-400 focus:ring-offset-slate-800"
                    />
                    <span className="text-sm text-gray-300">
                      I agree to the{' '}
                      <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors">
                        Privacy Policy
                      </a>{' '}
                      and consent to profile visibility on the platform
                    </span>
                  </label>
                  {errors.agreeToPrivacy && (
                    <p className="ml-7 text-sm text-rose-400">{errors.agreeToPrivacy}</p>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                fullWidth 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Profile...' : 'Create Escort Profile'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700/50">
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
