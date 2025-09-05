import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Crown } from 'lucide-react';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const navigate = useNavigate();
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Close dropdown menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <header className="bg-slate-900/90 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Crown className="text-amber-400 group-hover:text-amber-300 transition-colors" size={28} />
            <div className="text-2xl font-bold">
              <span className="text-amber-400">Eden</span>
              <span className="text-white">Affairs</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link
                to="/browse"
                className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
              >
                Browse Escorts
              </Link>
              <Link
                to="/events"
                className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
              >
                Events
              </Link>
              <Link
                to="/reviews"
                className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
              >
                Reviews
              </Link>
              <Link
                to="/testimonials"
                className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
              >
                Testimonials
              </Link>
              <Link
                to="/blacklisted"
                className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
              >
                Blacklisted
              </Link>
              
              {/* More Menu */}
              <div className="relative" ref={moreMenuRef}>
                <button 
                  onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors focus:outline-none"
                >
                  <span>More</span>
                  <ChevronDown size={16} className={`transition-transform ${moreMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {moreMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-slate-800 rounded-xl shadow-lg border border-slate-700 py-2">
                    <Link
                      to="/advertise"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                      onClick={() => setMoreMenuOpen(false)}
                    >
                      Advertise
                    </Link>
                    <Link
                      to="/faq"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                      onClick={() => setMoreMenuOpen(false)}
                    >
                      FAQ
                    </Link>
                    <Link
                      to="/tour"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                      onClick={() => setMoreMenuOpen(false)}
                    >
                      How It Works
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  {isAdmin ? (
                    <Link to="/admin">
                      <Button variant="primary" size="sm">
                        Admin Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/profile-creation">
                      <Button variant="primary" size="sm">
                        Create Profile
                      </Button>
                    </Link>
                  )}
                  
                  <Button variant="secondary" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <Button variant="secondary" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" size="sm">
                      Join Now
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-amber-400 transition-colors rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-slate-800 rounded-xl p-4">
            <nav className="space-y-2">
              <Link
                to="/"
                className="block text-gray-300 hover:text-amber-400 py-2 px-3 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse
              </Link>
              <Link
                to="/events"
                className="block text-gray-300 hover:text-amber-400 py-2 px-3 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                to="/reviews"
                className="block text-gray-300 hover:text-amber-400 py-2 px-3 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                to="/testimonials"
                className="block text-gray-300 hover:text-amber-400 py-2 px-3 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                to="/blacklisted"
                className="block text-gray-300 hover:text-amber-400 py-2 px-3 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blacklisted
              </Link>
              <Link
                to="/advertise"
                className="block text-gray-300 hover:text-amber-400 py-2 px-3 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Advertise
              </Link>
              <Link
                to="/faq"
                className="block text-gray-300 hover:text-amber-400 py-2 px-3 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/tour"
                className="block text-gray-300 hover:text-amber-400 py-2 px-3 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
            </nav>

            <div className="border-t border-slate-700 pt-4 mt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  {isAdmin ? (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="primary" fullWidth size="sm">
                        Admin Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/profile-creation" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="primary" fullWidth size="sm">
                        Create Profile
                      </Button>
                    </Link>
                  )}
                  <Button variant="secondary" fullWidth size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="secondary" fullWidth size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" fullWidth size="sm">
                      Join Now
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
