import { useState } from 'react';
import { ProfileCard } from './ProfileCard';
import { ProfilePreviewModal } from './ProfilePreviewModal';
import { Filter, ChevronDown, Loader2 } from 'lucide-react';

interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  image: string;
  bio: string;
  interests: string;
  about: string;
  price: number;
  isVip: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  subscriptionTier: 'basic' | 'premium' | 'platinum';
  phone: string;
  telegram?: string;
  whatsapp?: string;
  submittedAt: string;
  membershipTier: 'silver' | 'gold' | 'diamond';
}

export function ProfileGrid() {
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Sample profile data with subscription tiers and featured status
  const profiles: Profile[] = [{
    id: 1,
    name: 'Sophia',
    age: 24,
    location: 'Lagos',
    image: '/api/placeholder/300/400',
    bio: 'Elegant and sophisticated companion for discerning gentlemen...',
    interests: 'Art, Music, Travel',
    about: 'Elegant and sophisticated companion for discerning gentlemen. I enjoy intellectual conversations and creating memorable experiences.',
    price: 15000,
    isVip: true,
    isVerified: true,
    isFeatured: true,
    subscriptionTier: 'platinum',
    phone: '+234-XXX-XXX-XXXX',
    telegram: '@sophia_lagos',
    whatsapp: '+234-XXX-XXX-XXXX',
    submittedAt: '2024-01-15',
    membershipTier: 'diamond'
  }, {
    id: 2,
    name: 'Elena Rose',
    age: 23,
    location: 'Victoria Island, Lagos',
    image: 'https://images.unsplash.com/photo-1494790108755-2616c9eb3cb9?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3',
    bio: 'Premium subscriber - Charming and intelligent companion for sophisticated gentlemen.',
    interests: 'Fashion, Travel, Fine Dining',
    about: 'Premium subscriber - Charming and intelligent companion for sophisticated gentlemen. I specialize in luxury experiences and cultural events.',
    isVerified: true,
    isFeatured: true,
    isVip: true,
    price: 65000,
    subscriptionTier: 'premium',
    phone: '+234-XXX-XXX-XXXX',
    telegram: '@elena_vi',
    whatsapp: '+234 813 456 7890',
    submittedAt: '2024-01-20',
    membershipTier: 'gold'
  }, {
    id: 3,
    name: 'Isabella Grace',
    age: 26,
    location: 'Lekki, Lagos',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3',
    bio: 'Premium member - Elegant and sophisticated, perfect for high-end events and cultural experiences.',
    interests: 'Art, Culture, Wine',
    about: 'Premium member - Elegant and sophisticated, perfect for high-end events and cultural experiences. I enjoy art galleries and fine dining.',
    isVerified: true,
    isFeatured: true,
    isVip: true,
    price: 75000,
    subscriptionTier: 'premium',
    phone: '+234-XXX-XXX-XXXX',
    telegram: '@bella_lekki',
    whatsapp: '+234 814 567 8901',
    submittedAt: '2024-01-18',
    membershipTier: 'gold'
  }, {
    id: 4,
    name: 'Amara Luxury',
    age: 30,
    location: 'Abuja',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3',
    bio: 'Platinum subscriber - Charismatic and attentive companion for special occasions and business events.',
    interests: 'Business, Sports, Music',
    about: 'Platinum subscriber - Charismatic and attentive companion for special occasions and business events. Perfect for corporate functions and networking.',
    isVerified: true,
    isFeatured: true,
    isVip: true,
    price: 90000,
    subscriptionTier: 'platinum',
    phone: '+234 815 678 9012',
    whatsapp: '+234 815 678 9012',
    submittedAt: '2024-01-10',
    membershipTier: 'diamond'
  }];

  // Filter to show only featured escorts with higher subscriptions
  const featuredProfiles = profiles.filter(profile => 
    profile.isFeatured && 
    (profile.subscriptionTier === 'premium' || profile.subscriptionTier === 'platinum')
  );

  const handleLoadMore = async () => {
    setLoadingMore(true);
    // Simulate loading more profiles
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoadingMore(false);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setIsLoading(true);
    // Simulate sorting
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleProfileClick = (profile: Profile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
    setSelectedProfile(null);
  };

  return (
    <section className="py-16 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Featured Profiles
            </h2>
            <p className="text-gray-300">
              Discover our most exclusive connections
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
                showFilters 
                  ? 'bg-amber-500 text-black' 
                  : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
              }`}
            >
              <Filter size={16} />
              Filters
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <select 
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-slate-700 text-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="verified">Verified Only</option>
              <option value="vip">VIP Only</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-slate-700 rounded-lg p-6 mb-8 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <select className="w-full bg-slate-600 text-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                  <option value="">All Locations</option>
                  <option value="lagos">Lagos</option>
                  <option value="abuja">Abuja</option>
                  <option value="port-harcourt">Port Harcourt</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Age Range
                </label>
                <select className="w-full bg-slate-600 text-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                  <option value="">Any Age</option>
                  <option value="19-25">19-25</option>
                  <option value="26-30">26-30</option>
                  <option value="31-35">31-35</option>
                  <option value="36+">36+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Membership
                </label>
                <select className="w-full bg-slate-600 text-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                  <option value="">All Tiers</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                  <option value="diamond">Diamond</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium py-2 px-4 rounded-md transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 size={32} className="text-amber-400 animate-spin" />
          </div>
        ) : (
          <>
            {/* Featured Escorts Header */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                <span className="text-gradient">Featured Premium Escorts</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Discover our premium and platinum subscribers - verified professionals offering exclusive companionship services.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProfiles.map(profile => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile}
                  onProfileClick={() => handleProfileClick(profile)}
                />
              ))}
            </div>
            
            {featuredProfiles.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <h3 className="text-xl font-semibold mb-2">No featured escorts available</h3>
                  <p>Check back soon for premium escort profiles.</p>
                </div>
              </div>
            )}
            
            <div className="mt-12 text-center">
              <button 
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 border border-slate-700 bg-transparent hover:bg-slate-700 text-gray-300 h-10 px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  'View All Escorts'
                )}
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Profile Preview Modal */}
      <ProfilePreviewModal
        isOpen={showProfileModal}
        onClose={handleCloseModal}
        profile={selectedProfile}
      />
    </section>
  );
}