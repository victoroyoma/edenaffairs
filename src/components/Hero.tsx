import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Search, MapPin, Users, Sparkles } from 'lucide-react';

export function Hero() {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-hero min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900/90 via-dark-800/80 to-dark-900/90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536520002442-39764a41e987?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3')] bg-cover bg-center opacity-15" />
        
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl animate-pulse-soft delay-700" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-luxury-rose/10 rounded-full blur-3xl animate-pulse-soft delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white leading-tight">
              <span className="block">Where Luxury</span>
              <span className="text-gradient">Connections</span>
              <span className="block">Begin</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="text-primary-400 animate-pulse-soft" size={24} />
              <span className="text-primary-300 font-medium">Premium Companion Service</span>
              <Sparkles className="text-primary-400 animate-pulse-soft" size={24} />
            </div>
          </div>

          {/* Subtitle */}
          <div className="mb-12 animate-slide-up">
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
              Eden Affairs is your exclusive gateway to sophisticated connections. 
              Experience elegance, discretion, and meaningful encounters.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Join our curated community of distinguished individuals seeking 
              exceptional companionship for every occasion.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
            <Button 
              variant="luxury" 
              size="xl" 
              icon={<Users size={20} />}
              onClick={() => navigate('/browse')}
            >
              Browse Escorts
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              onClick={() => navigate('/register')}
            >
              Join as an Escort
            </Button>
          </div>

          {/* Enhanced Search Section */}
          <div className="max-w-4xl mx-auto animate-slide-up">
            <div className="glass-dark p-6 md:p-8 rounded-2xl border border-dark-600/50 shadow-luxury">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center justify-center gap-2">
                <Search className="text-primary-400" size={20} />
                Find Your Perfect Match
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Category
                  </label>
                  <select 
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="input-luxury"
                  >
                    <option value="">All Categories</option>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="couples">Couples</option>
                  </select>
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <select 
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="input-luxury pl-10"
                    >
                      <option value="">Any Location</option>
                      <option value="lagos">Lagos</option>
                      <option value="abuja">Abuja</option>
                      <option value="port-harcourt">Port Harcourt</option>
                      <option value="kano">Kano</option>
                      <option value="ibadan">Ibadan</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 md:opacity-0">
                    Search
                  </label>
                  <Button variant="primary" fullWidth size="lg" icon={<Search size={18} />}>
                    Search Profiles
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-dark-600/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-400">500+</div>
                  <div className="text-sm text-gray-400">Verified Profiles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-400">15+</div>
                  <div className="text-sm text-gray-400">Cities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-400">24/7</div>
                  <div className="text-sm text-gray-400">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-400">100%</div>
                  <div className="text-sm text-gray-400">Discrete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-400 rounded-full opacity-75">
          <div className="w-1 h-3 bg-primary-400 rounded-full mx-auto mt-2 animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
}