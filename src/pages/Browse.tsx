import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Button } from '../components/Button';
import { ProfileCard } from '../components/ProfileCard';
import { ProfileDetailsModal } from '../components/ProfileDetailsModal';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { onlineStatusService } from '../services/onlineStatus';

interface Escort {
  id: number;
  name: string;
  age: number;
  location: string;
  image: string;
  bio: string;
  interests: string;
  about: string;
  isVerified: boolean;
  isNew: boolean;
  isVip: boolean;
  price: number;
  rating: number;
  reviewCount: number;
  membershipTier?: 'silver' | 'gold' | 'diamond' | '';
  subscriptionTier?: 'basic' | 'premium' | 'platinum';
  lastActive: string;
  services: string[];
  availability: string;
}

export default function Browse() {
  const navigate = useNavigate();
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [filteredEscorts, setFilteredEscorts] = useState<Escort[]>([]);
  const [selectedEscort, setSelectedEscort] = useState<Escort | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    ageRange: '',
    verified: false,
    vip: false,
    priceRange: '',
    availability: ''
  });
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockEscorts: Escort[] = [
      {
        id: 1,
        name: 'Sophia Elite',
        age: 25,
        location: 'Victoria Island, Lagos',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400',
        bio: 'Premium subscriber - Elegant and sophisticated companion for discerning gentlemen...',
        interests: 'Fine dining, art galleries, luxury travel, wine tasting',
        about: 'Premium subscriber - Elegant and sophisticated companion for discerning gentlemen. I enjoy intellectual conversations and creating memorable experiences.',
        isVerified: true,
        isNew: false,
        isVip: true,
        price: 50000,
        rating: 4.9,
        reviewCount: 89,
        membershipTier: 'diamond',
        subscriptionTier: 'premium',
        lastActive: '2 hours ago',
        services: ['Dinner Companion', 'Social Events', 'Travel Companion'],
        availability: 'Available Now'
      },
      {
        id: 2,
        name: 'Isabella Grace',
        age: 23,
        location: 'Ikoyi, Lagos',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        bio: 'Platinum subscriber - Young and vibrant companion with a passion for adventure...',
        interests: 'Adventure sports, dancing, beach activities, shopping',
        about: 'Platinum subscriber - Young and vibrant companion with a passion for adventure. I love exploring new places and creating exciting memories.',
        isVerified: true,
        isNew: true,
        isVip: true,
        price: 35000,
        rating: 4.7,
        reviewCount: 45,
        membershipTier: 'gold',
        subscriptionTier: 'platinum',
        lastActive: '1 hour ago',
        services: ['Dinner Dates', 'City Tours', 'Shopping Companion'],
        availability: 'Available Today'
      },
      {
        id: 3,
        name: 'Victoria Royal',
        age: 28,
        location: 'Lekki, Lagos',
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
        bio: 'Platinum subscriber - Mature and experienced companion for exclusive engagements...',
        interests: 'Business networking, high-end events, cultural experiences, luxury lifestyle',
        about: 'Platinum subscriber - Mature and experienced companion for exclusive engagements. I specialize in corporate events and sophisticated social gatherings.',
        isVerified: true,
        isNew: false,
        isVip: true,
        price: 75000,
        rating: 5.0,
        reviewCount: 156,
        membershipTier: 'diamond',
        subscriptionTier: 'platinum',
        lastActive: '30 minutes ago',
        services: ['Executive Events', 'Travel Companion', 'Business Functions'],
        availability: 'By Appointment'
      },
      {
        id: 4,
        name: 'Amara Sunshine',
        age: 24,
        location: 'Abuja',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        bio: 'Bubbly and energetic companion who loves to have fun...',
        interests: 'Parties, music festivals, outdoor activities, social events',
        about: 'Bubbly and energetic companion who loves to have fun. I bring positive energy to every encounter and love meeting new people.',
        isVerified: true,
        isNew: true,
        isVip: false,
        price: 25000,
        rating: 4.6,
        reviewCount: 32,
        membershipTier: 'silver',
        lastActive: '3 hours ago',
        services: ['Party Companion', 'Social Events', 'Weekend Activities'],
        availability: 'Weekends Only'
      }
    ];
    setEscorts(mockEscorts);
    setFilteredEscorts(mockEscorts);
  }, []);

  const applyFilters = () => {
    let filtered = escorts.filter(escort => {
      const matchesSearch = escort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           escort.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = !filters.location || escort.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesVerified = !filters.verified || escort.isVerified;
      const matchesVip = !filters.vip || escort.isVip;
      
      // Add age range filtering
      const matchesAgeRange = !filters.ageRange || (() => {
        const age = escort.age;
        switch (filters.ageRange) {
          case '19-24':
            return age >= 19 && age <= 24;
          case '25-30':
            return age >= 25 && age <= 30;
          case '31-35':
            return age >= 31 && age <= 35;
          case '36+':
            return age >= 36;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesLocation && matchesVerified && matchesVip && matchesAgeRange;
    });

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    setFilteredEscorts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters, sortBy, escorts]);

  const handleFilterChange = (key: string, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
            Browse Premium Escorts
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with verified, professional companions. Pay only to access contact information - no registration required.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              icon={<Filter size={16} />}
            >
              Filters
            </Button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="border-t border-slate-600 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter city..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Age Range</label>
                <select
                  value={filters.ageRange}
                  onChange={(e) => handleFilterChange('ageRange', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="">Any Age</option>
                  <option value="19-24">19-24</option>
                  <option value="25-30">25-30</option>
                  <option value="31-35">31-35</option>
                  <option value="36+">36+</option>
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) => handleFilterChange('verified', e.target.checked)}
                    className="mr-2 rounded border-slate-600 bg-slate-700 text-amber-400 focus:ring-amber-400"
                  />
                  <span className="text-sm text-gray-200">Verified Only</span>
                </label>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.vip}
                    onChange={(e) => handleFilterChange('vip', e.target.checked)}
                    className="mr-2 rounded border-slate-600 bg-slate-700 text-amber-400 focus:ring-amber-400"
                  />
                  <span className="text-sm text-gray-200">VIP Only</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            {filteredEscorts.length} Escorts Available
            <span className="text-sm text-green-400 ml-2">
              ({onlineStatusService.getOnlineCount()} Online)
            </span>
          </h2>
          <div className="text-sm text-gray-400">
            Showing {filteredEscorts.length} of {escorts.length} results
          </div>
        </div>

        {/* Escort Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEscorts.map((escort) => (
            <ProfileCard
              key={escort.id}
              profile={escort}
              onProfileClick={() => setSelectedEscort(escort)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredEscorts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No escorts found</h3>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setFilters({
                  location: '',
                  ageRange: '',
                  verified: false,
                  vip: false,
                  priceRange: '',
                  availability: ''
                });
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Call to Action for Escorts */}
        <div className="mt-16 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Are you an escort?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join EdenAffair and connect with discerning clients. Create your professional profile and start earning today.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            className="btn-luxury"
            onClick={() => navigate('/register')}
          >
            Join as an Escort
          </Button>
        </div>
      </div>

      {/* Profile Details Modal */}
      {selectedEscort && (
        <ProfileDetailsModal
          isOpen={!!selectedEscort}
          onClose={() => setSelectedEscort(null)}
          profile={{
            id: selectedEscort.id,
            name: selectedEscort.name,
            age: selectedEscort.age,
            location: selectedEscort.location,
            image: selectedEscort.image,
            about: selectedEscort.bio,
            isVerified: selectedEscort.isVerified,
            isFeatured: selectedEscort.isVip || false,
            submittedAt: new Date().toISOString(),
            membershipTier: selectedEscort.membershipTier,
            price: selectedEscort.price,
            isVip: selectedEscort.isVip,
            availability: selectedEscort.availability
          }}
        />
      )}

      <Footer />
    </div>
  );
}
