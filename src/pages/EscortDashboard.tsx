import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { EscortAnalytics } from '../components/EscortAnalytics';
import { SubscriptionPlans } from '../components/SubscriptionPlans';
import { Button } from '../components/Button';
import { StatusIndicator } from '../components/StatusIndicator';
import { onlineStatusService } from '../services/onlineStatus';
import { 
  BarChart3, 
  CreditCard, 
  Settings, 
  User, 
  Camera, 
  MessageSquare, 
  DollarSign,
  Star,
  Eye,
  Phone,
  Calendar,
  Shield,
  Edit,
  Bell
} from 'lucide-react';

interface EscortProfile {
  id: string;
  name: string;
  subscriptionTier: 'basic' | 'premium' | 'platinum';
  isVerified: boolean;
  profileViews: number;
  contactPurchases: number;
  earnings: number;
  rating: number;
  photos: string[];
  bio: string;
  joinedDate: string;
}

export function EscortDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'subscription' | 'profile'>('overview');
  const [profile] = useState<EscortProfile>({
    id: 'escort_001',
    name: 'Sophia Anderson',
    subscriptionTier: 'premium',
    isVerified: true,
    profileViews: 2847,
    contactPurchases: 127,
    earnings: 254000,
    rating: 4.8,
    photos: ['/api/placeholder/150/200', '/api/placeholder/150/200', '/api/placeholder/150/200'],
    bio: 'Professional and discreet companion offering premium services...',
    joinedDate: '2023-08-15'
  });

  const [userStatus, setUserStatus] = useState<'online' | 'away' | 'offline'>('offline');
  const [notifications] = useState(3);

  useEffect(() => {
    // Set initial online status
    onlineStatusService.updateUserStatus(profile.id, 'online');
    setUserStatus('online');

    // Listen for status changes
    const unsubscribe = onlineStatusService.subscribeToStatusUpdates(profile.id, (status) => {
      setUserStatus(status.status);
    });

    return unsubscribe;
  }, [profile.id]);

  const handleStatusChange = (newStatus: 'online' | 'away' | 'offline') => {
    onlineStatusService.updateUserStatus(profile.id, newStatus);
  };

  const handleUpgrade = (tierId: string) => {
    console.log('Upgrading to:', tierId);
    // Implementation would handle subscription upgrade
  };

  const getSubscriptionBadge = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'premium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const tabItems = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <Eye size={18} /> },
    { id: 'subscription', label: 'Subscription', icon: <CreditCard size={18} /> },
    { id: 'profile', label: 'Profile', icon: <User size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={profile.photos[0]} 
                  alt={profile.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate-700"
                />
                <div className="absolute -bottom-1 -right-1">
                  <StatusIndicator 
                    userId={profile.id} 
                    size="sm"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
                  {profile.isVerified && (
                    <Shield className="text-green-400" size={20} />
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSubscriptionBadge(profile.subscriptionTier)}`}>
                    {profile.subscriptionTier.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1">
                    <Star className="text-amber-400" size={14} />
                    {profile.rating} rating
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">
                    Joined {new Date(profile.joinedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Status Controls */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Status:</span>
                <select 
                  value={userStatus}
                  onChange={(e) => handleStatusChange(e.target.value as any)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 text-sm"
                >
                  <option value="online">Online</option>
                  <option value="away">Away</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Bell size={16} />
                  {notifications > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                      {notifications}
                    </span>
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  <Settings size={16} />
                  <span className="ml-1">Settings</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Eye className="text-blue-400" size={20} />
              </div>
              <span className="text-green-400 text-sm font-medium">+23%</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{profile.profileViews.toLocaleString()}</h3>
              <p className="text-gray-400 text-sm">Profile Views</p>
              <p className="text-gray-500 text-xs">This month</p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Phone className="text-green-400" size={20} />
              </div>
              <span className="text-green-400 text-sm font-medium">+18%</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{profile.contactPurchases}</h3>
              <p className="text-gray-400 text-sm">Contact Purchases</p>
              <p className="text-gray-500 text-xs">Total</p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <DollarSign className="text-amber-400" size={20} />
              </div>
              <span className="text-green-400 text-sm font-medium">+15%</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">₦{profile.earnings.toLocaleString()}</h3>
              <p className="text-gray-400 text-sm">Total Earnings</p>
              <p className="text-gray-500 text-xs">All time</p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Star className="text-purple-400" size={20} />
              </div>
              <span className="text-green-400 text-sm font-medium">Excellent</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{profile.rating}</h3>
              <p className="text-gray-400 text-sm">Average Rating</p>
              <p className="text-gray-500 text-xs">From 89 reviews</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-slate-700">
            <nav className="flex space-x-8">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Recent Activity */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-lg">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <Phone className="text-green-400" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">New contact purchase</p>
                      <p className="text-gray-400 text-xs">Client viewed your profile and purchased contact details</p>
                    </div>
                    <span className="text-gray-400 text-xs">2 hours ago</span>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-lg">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Eye className="text-blue-400" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Profile view spike</p>
                      <p className="text-gray-400 text-xs">Your profile received 23 new views today</p>
                    </div>
                    <span className="text-gray-400 text-xs">5 hours ago</span>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-lg">
                    <div className="p-2 rounded-lg bg-amber-500/20">
                      <Star className="text-amber-400" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">New 5-star review</p>
                      <p className="text-gray-400 text-xs">A client left you a positive review</p>
                    </div>
                    <span className="text-gray-400 text-xs">1 day ago</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="flex items-center gap-2 justify-center">
                    <Edit size={16} />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 justify-center">
                    <Camera size={16} />
                    Upload Photos
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 justify-center">
                    <Calendar size={16} />
                    Update Availability
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 justify-center">
                    <MessageSquare size={16} />
                    View Messages
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <EscortAnalytics escortId={profile.id} />
          )}

          {activeTab === 'subscription' && (
            <SubscriptionPlans 
              currentTier={profile.subscriptionTier} 
              onUpgrade={handleUpgrade}
            />
          )}

          {activeTab === 'profile' && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Profile Management</h3>
              <p className="text-gray-400">Profile editing interface would be implemented here...</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
