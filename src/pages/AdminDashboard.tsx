import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AdminProfileCard } from '../components/AdminProfileCard';
import { ProfileDetailsModal } from '../components/ProfileDetailsModal';
import { MembershipEditModal } from '../components/MembershipEditModal';
import { PaymentRequestModal } from '../components/PaymentRequestModal';
import { VerificationRequestModal, VerificationRequestData } from '../components/VerificationRequestModal';
import { AdminNotificationCenter } from '../components/AdminNotificationCenter';
import { AdminProfileFilters } from '../components/AdminProfileFilters';
import { AdminBulkActions } from '../components/AdminBulkActions';
import { Button } from '../components/Button';
import { Search, RefreshCw, Users, DollarSign, Activity, Bell, Settings, ChevronUp, ChevronDown, BarChart2, Calendar, User, Clock, AlertTriangle, Star, MessageSquare, Image, Plus, Edit, Trash2, Shield, CheckCircle, XCircle, Flag, Calendar as CalendarIcon, MapPin, Eye, X } from 'lucide-react';

// Local types for stricter state inference and better DX
type MembershipTier = '' | 'silver' | 'gold' | 'diamond';

interface AdminProfile {
  id: number;
  name: string;
  age: number;
  location: string;
  image: string;
  about: string;
  isVerified: boolean;
  isFeatured: boolean;
  submittedAt: string;
  membershipTier?: MembershipTier;
  price?: number;
  isVip?: boolean;
  interests?: string;
  fantasies?: string;
  availability?: string;
  preferences?: string;
  email?: string;
  phone?: string;
  telegram?: string;
  whatsapp?: string;
  otherContact?: string;
  photos: string[];
  verificationStatus?: 'pending' | 'verified' | 'rejected';
  verificationMethod?: string;
  verificationNotes?: string;
}

type NotificationType = 'payment' | 'profile' | 'system' | 'warning';

interface AdminNotification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const makeNotification = (type: NotificationType, title: string, message: string): AdminNotification => ({
  id: Date.now(),
  type,
  title,
  message,
  time: 'Just now',
  read: false
});
export function AdminDashboard() {
  // Sample profile data for admin review
  const [profiles, setProfiles] = useState<AdminProfile[]>([{
    id: 1,
    name: 'Sophia',
    age: 28,
    location: 'Lagos',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3',
    about: 'Sophisticated and charming companion for upscale events. I enjoy fine dining, art exhibitions, and stimulating conversation.',
    isVerified: false,
    isFeatured: false,
    submittedAt: '2023-05-15',
    membershipTier: 'diamond',
    isVip: true,
    price: 65000,
    interests: 'Fine dining, Art, Fashion, Travel',
    fantasies: 'Luxury weekend getaways, exclusive events, and meaningful connections.',
    availability: 'Evenings and weekends',
    preferences: 'Sophisticated gentlemen aged 30-55',
    email: 'sophia@example.com',
    phone: '+234 812 345 6789',
    telegram: '@sophia_lagos',
    whatsapp: '+234 812 345 6789',
    otherContact: 'Instagram: @sophia_luxury',
    verificationStatus: 'pending',
    verificationMethod: 'Phone Call',
    verificationNotes: 'Pending verification call scheduled for next week',
    photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2459&auto=format&fit=crop&ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3']
  }, {
    id: 2,
    name: 'Alexander',
    age: 32,
    location: 'Abuja',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3',
    about: 'Cultured gentleman available for private dinner dates. Well-traveled with interests in fine wine, classical music, and intellectual discussions.',
    isVerified: true,
    isFeatured: true,
    submittedAt: '2023-05-10',
    membershipTier: 'gold',
    price: 45000,
    interests: 'Wine tasting, Classical music, Literature',
    fantasies: 'Intellectual conversations over candlelit dinners.',
    availability: 'Flexible schedule',
    preferences: 'Sophisticated women who appreciate the finer things',
    email: 'alexander@example.com',
    phone: '+234 813 456 7890',
    telegram: '@alex_abuja',
    whatsapp: '+234 813 456 7890',
    verificationStatus: 'verified',
    verificationMethod: 'Video Call',
    verificationNotes: 'Successfully verified through video call on 2023-05-12',
    photos: ['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3']
  }, {
    id: 3,
    name: 'Isabella',
    age: 26,
    location: 'Port Harcourt',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3',
    about: 'Elegant and sophisticated, perfect for high-end events. I have a background in fashion and enjoy cultural experiences.',
    isVerified: false,
    isFeatured: false,
    submittedAt: '2023-05-18',
    membershipTier: 'silver',
    price: 30000,
    interests: 'Fashion, Dancing, Photography',
    fantasies: 'Being the perfect companion at exclusive galas and events.',
    availability: 'Weekends only',
    preferences: 'Mature gentlemen with refined taste',
    email: 'isabella@example.com',
    photos: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3']
  }, {
    id: 4,
    name: 'James',
    age: 30,
    location: 'Lagos',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3',
    about: 'Charismatic and attentive companion for special occasions. I can hold engaging conversations on various topics and make any event memorable.',
    isVerified: true,
    isFeatured: false,
    submittedAt: '2023-05-05',
    isVip: true,
    price: 75000,
    interests: 'Sports, Politics, Business',
    fantasies: 'Being the perfect gentleman escort for high-profile events.',
    availability: 'Evenings and weekends',
    preferences: 'Sophisticated women aged 25-45',
    phone: '+234 815 678 9012',
    photos: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2648&auto=format&fit=crop&ixlib=rb-4.0.3']
  }]);
  // Sample transaction data
  const [transactions] = useState([{
    id: 1,
    userId: 101,
    profileId: 2,
    amount: 2000,
    date: '2023-05-20',
    status: 'completed'
  }, {
    id: 2,
    userId: 102,
    profileId: 4,
    amount: 2000,
    date: '2023-05-19',
    status: 'completed'
  }, {
    id: 3,
    userId: 103,
    profileId: 2,
    amount: 2000,
    date: '2023-05-18',
    status: 'completed'
  }, {
    id: 4,
    userId: 104,
    profileId: 1,
    amount: 2000,
    date: '2023-05-17',
    status: 'failed'
  }, {
    id: 5,
    userId: 105,
    profileId: 3,
    amount: 2000,
    date: '2023-05-16',
    status: 'completed'
  }]);
  // Sample user data
  const [users, setUsers] = useState([{
    id: 101,
    username: 'john_doe',
    joinDate: '2023-05-01',
    status: 'active',
    email: 'john@example.com',
    lastActive: '2023-05-20',
    isBlacklisted: false,
    blacklistReason: '',
    blacklistEvidence: ''
  }, {
    id: 102,
    username: 'jane_smith',
    joinDate: '2023-05-02',
    status: 'active',
    email: 'jane@example.com',
    lastActive: '2023-05-19',
    isBlacklisted: false,
    blacklistReason: '',
    blacklistEvidence: ''
  }, {
    id: 103,
    username: 'michael_brown',
    joinDate: '2023-05-05',
    status: 'inactive',
    email: 'michael@example.com',
    lastActive: '2023-05-10',
    isBlacklisted: false,
    blacklistReason: '',
    blacklistEvidence: ''
  }, {
    id: 104,
    username: 'sarah_jones',
    joinDate: '2023-05-10',
    status: 'active',
    email: 'sarah@example.com',
    lastActive: '2023-05-18',
    isBlacklisted: false,
    blacklistReason: '',
    blacklistEvidence: ''
  }, {
    id: 105,
    username: 'robert_wilson',
    joinDate: '2023-05-12',
    status: 'active',
    email: 'robert@example.com',
    lastActive: '2023-05-20',
    isBlacklisted: false,
    blacklistReason: '',
    blacklistEvidence: ''
  }]);
  // Sample reviews data
  const [reviews, setReviews] = useState([{
    id: 1,
    reviewerName: 'David',
    reviewerId: 101,
    profileName: 'Sophia',
    profileId: 1,
    rating: 5,
    date: '2023-10-15',
    content: 'Absolutely amazing experience. Sophia was punctual, looked exactly like her photos, and was a delightful companion for the evening event. Very professional and charming.',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3',
    helpfulVotes: 24,
    unhelpfulVotes: 1,
    status: 'approved'
  }, {
    id: 2,
    reviewerName: 'Michelle',
    reviewerId: 102,
    profileName: 'Alexander',
    profileId: 2,
    rating: 4,
    date: '2023-09-22',
    content: 'Alexander was a great companion for my corporate dinner. Well-dressed, articulate, and made a good impression on my colleagues. The only small issue was he arrived a bit late, but he did call to inform me.',
    profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3',
    helpfulVotes: 18,
    unhelpfulVotes: 2,
    status: 'pending'
  }, {
    id: 3,
    reviewerName: 'Robert',
    reviewerId: 103,
    profileName: 'Isabella',
    profileId: 3,
    rating: 2,
    date: '2023-10-05',
    content: 'Disappointing experience. Isabella was on her phone most of the time during our dinner date and seemed disinterested in conversation. Not worth the price paid for the evening.',
    profileImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3',
    helpfulVotes: 31,
    unhelpfulVotes: 5,
    status: 'pending'
  }, {
    id: 4,
    reviewerName: 'Sarah',
    reviewerId: 104,
    profileName: 'James',
    profileId: 4,
    rating: 5,
    date: '2023-11-10',
    content: "James was the perfect gentleman escort for my friend's wedding. He was attentive, charming, and a great dancer! Everyone was asking about him. Definitely recommend for any social event.",
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3',
    helpfulVotes: 42,
    unhelpfulVotes: 0,
    status: 'pending'
  }]);
  // Sample events data
  const [events, setEvents] = useState([{
    id: 1,
    title: 'Exclusive Yacht Party',
    date: '2023-12-30',
    time: '8:00 PM - 2:00 AM',
    location: 'Lagos Harbor Marina',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: "Join us for an unforgettable night on the water with Lagos' most sophisticated singles. Enjoy premium drinks, gourmet food, and dancing under the stars on a luxury yacht.",
    attendees: 48,
    capacity: 60,
    price: '₦25,000',
    vipPrice: '₦50,000',
    categories: ['Nightlife', 'Luxury'],
    isPast: false,
    status: 'published'
  }, {
    id: 2,
    title: 'Cocktails & Connections',
    date: '2023-12-15',
    time: '7:00 PM - 11:00 PM',
    location: 'Sky Lounge, Victoria Island',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: "An elegant evening of cocktails and conversation at Lagos' premier rooftop lounge. Meet interesting singles in a relaxed, upscale environment with breathtaking city views.",
    attendees: 35,
    capacity: 40,
    price: '₦15,000',
    vipPrice: '₦30,000',
    categories: ['Social', 'Drinks'],
    isPast: false,
    status: 'draft'
  }, {
    id: 3,
    title: 'Beach Bonfire Soirée',
    date: '2024-01-20',
    time: '6:00 PM - 12:00 AM',
    location: 'Elegushi Private Beach',
    image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: 'Experience a magical evening on the beach with bonfire, BBQ, live music, and great company. A perfect setting to make meaningful connections under the stars.',
    attendees: 20,
    capacity: 50,
    price: '₦20,000',
    vipPrice: '₦40,000',
    categories: ['Outdoor', 'Social'],
    isPast: false,
    status: 'published'
  }]);
  // Sample advertisements data
  const [advertisements, setAdvertisements] = useState([{
    id: 1,
    title: 'Luxury Hotel Weekend Package',
    company: 'Bluewater Resort',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: 'Special weekend getaway package for couples. Includes luxury accommodation, spa treatment, and fine dining experience.',
    startDate: '2023-11-01',
    endDate: '2023-12-31',
    placement: 'homepage',
    status: 'active',
    clicks: 245,
    impressions: 3200
  }, {
    id: 2,
    title: 'Premium Transportation Services',
    company: 'Elite Cars',
    image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d109?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: 'Luxury car rental for special occasions. Make a statement with our premium fleet of vehicles.',
    startDate: '2023-10-15',
    endDate: '2024-01-15',
    placement: 'profiles',
    status: 'active',
    clicks: 187,
    impressions: 2700
  }, {
    id: 3,
    title: 'Crystal Nightclub VIP Experience',
    company: 'Crystal Nightclub',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: 'Exclusive VIP tables and bottle service. Skip the line and enjoy premium service all night.',
    startDate: '2023-11-15',
    endDate: '2023-12-15',
    placement: 'events',
    status: 'draft',
    clicks: 0,
    impressions: 0
  }]);
  // Sample notifications
  const [notifications, setNotifications] = useState<AdminNotification[]>([{
    id: 1,
    type: 'profile',
    title: 'New Profile Submission',
    message: 'Olivia has submitted a new profile for verification',
    time: '5 minutes ago',
    read: false
  }, {
    id: 2,
    type: 'payment',
    title: 'Payment Received',
    message: 'James has paid ₦2,000 for contact access',
    time: '1 hour ago',
    read: false
  }, {
    id: 3,
    type: 'system',
    title: 'System Update',
    message: 'The platform has been updated to version 2.1.0',
    time: '3 hours ago',
    read: true
  }, {
    id: 4,
    type: 'warning',
    title: 'Failed Payment',
    message: 'Payment from user #104 has failed',
    time: '1 day ago',
    read: true
  }, {
    id: 5,
    type: 'profile',
    title: 'Profile Reported',
    message: 'A profile has been reported for inappropriate content',
    time: '2 days ago',
    read: true
  }]);
  // State for dashboard UI
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'verified', 'featured'
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('profiles'); // 'profiles', 'transactions', 'users', 'settings'
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    stats: true,
    profiles: true,
    transactions: true,
    users: true,
    reviews: true,
    events: true,
    advertisements: true,
    blacklist: true
  });
  // Selected profiles for bulk actions
  const [selectedProfiles, setSelectedProfiles] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  // New state for modals
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [showMembershipEdit, setShowMembershipEdit] = useState(false);
  const [showPaymentRequest, setShowPaymentRequest] = useState(false);
  const [showVerificationRequest, setShowVerificationRequest] = useState(false);
  // removed unused bulk payment modal state to reduce noise
  // State for reviews, events, ads management
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [showReviewDetails, setShowReviewDetails] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('pending'); // 'all', 'pending', 'approved', 'rejected'
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventFilter, setEventFilter] = useState('all'); // 'all', 'published', 'draft', 'past'
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [showAdForm, setShowAdForm] = useState(false);
  const [adFilter, setAdFilter] = useState('all'); // 'all', 'active', 'draft', 'ended'
  // State for blacklisting
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showBlacklistForm, setShowBlacklistForm] = useState(false);
  const [blacklistReason, setBlacklistReason] = useState('');
  const [blacklistEvidence, setBlacklistEvidence] = useState('');
  const [userFilter, setUserFilter] = useState('active'); // 'all', 'active', 'inactive', 'blacklisted'
  // Notification handlers
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({
      ...n,
      read: true
    })));
  };
  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? {
      ...n,
      read: true
    } : n));
  };
  const handleClearAllNotifications = () => {
    setNotifications([]);
  };
  // Handle bulk selection
  const toggleProfileSelection = (id: number) => {
    if (selectedProfiles.includes(id)) {
      setSelectedProfiles(selectedProfiles.filter(profileId => profileId !== id));
    } else {
      setSelectedProfiles([...selectedProfiles, id]);
    }
  };
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedProfiles([]);
    } else {
      setSelectedProfiles(filteredProfiles.map(p => p.id));
    }
    setSelectAll(!selectAll);
  };
  // Bulk action handlers
  const handleVerifyAll = () => {
    setProfiles(profiles.map(profile => selectedProfiles.includes(profile.id) ? {
      ...profile,
      isVerified: true
    } : profile));
    setSelectedProfiles([]);
    setSelectAll(false);
    // Add notification
  const newNotification = makeNotification('system', 'Bulk Verification', `${selectedProfiles.length} profiles have been verified`);
  setNotifications([newNotification, ...notifications]);
  };
  const handleFeatureAll = () => {
    setProfiles(profiles.map(profile => selectedProfiles.includes(profile.id) ? {
      ...profile,
      isFeatured: true
    } : profile));
    setSelectedProfiles([]);
    setSelectAll(false);
    // Add notification
  const newNotification = makeNotification('system', 'Bulk Featured', `${selectedProfiles.length} profiles have been featured`);
  setNotifications([newNotification, ...notifications]);
  };
  const handleUnfeatureAll = () => {
    setProfiles(profiles.map(profile => selectedProfiles.includes(profile.id) ? {
      ...profile,
      isFeatured: false
    } : profile));
    setSelectedProfiles([]);
    setSelectAll(false);
  };
  const handleDeleteAll = () => {
    setProfiles(profiles.filter(profile => !selectedProfiles.includes(profile.id)));
    setSelectedProfiles([]);
    setSelectAll(false);
    // Add notification
  const newNotification = makeNotification('warning', 'Bulk Deletion', `${selectedProfiles.length} profiles have been deleted`);
  setNotifications([newNotification, ...notifications]);
  };
  const handleSetMembership = (tier: MembershipTier) => {
    setProfiles(profiles.map(profile => selectedProfiles.includes(profile.id) ? {
      ...profile,
      membershipTier: tier
    } : profile));
    setSelectedProfiles([]);
    setSelectAll(false);
    // Add notification
  const newNotification = makeNotification('system', 'Membership Updated', `${selectedProfiles.length} profiles set to ${tier || 'no'} membership`);
  setNotifications([newNotification, ...notifications]);
  };
  const handleBulkRequestPayment = () => {
    // Logic for bulk payment request would go here
    console.log('Requesting payment for profiles:', selectedProfiles);
    // Add notification
  const newNotification = makeNotification('payment', 'Bulk Payment Request', `Payment requests sent to ${selectedProfiles.length} profiles`);
  setNotifications([newNotification, ...notifications]);
    setSelectedProfiles([]);
    setSelectAll(false);
  };
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  const handleVerify = (id: number) => {
    setProfiles(profiles.map(profile => profile.id === id ? {
      ...profile,
      isVerified: true
    } : profile));
    // Add notification
    const profileName = profiles.find(p => p.id === id)?.name;
  const newNotification = makeNotification('system', 'Profile Verified', `${profileName}'s profile has been verified`);
  setNotifications([newNotification, ...notifications]);
  };
  const handleReject = (id: number) => {
    const profileName = profiles.find(p => p.id === id)?.name;
    setProfiles(profiles.filter(profile => profile.id !== id));
    // Add notification
  const newNotification = makeNotification('warning', 'Profile Rejected', `${profileName}'s profile has been rejected`);
  setNotifications([newNotification, ...notifications]);
  };
  const handleToggleFeatured = (id: number) => {
    setProfiles(profiles.map(profile => profile.id === id ? {
      ...profile,
      isFeatured: !profile.isFeatured
    } : profile));
    // Add notification if featuring (not for unfeaturing)
    const profile = profiles.find(p => p.id === id);
    if (profile && !profile.isFeatured) {
  const newNotification = makeNotification('system', 'Profile Featured', `${profile.name}'s profile has been featured`);
  setNotifications([newNotification, ...notifications]);
    }
  };
  const handleViewDetails = (id: number) => {
    const profile = profiles.find(p => p.id === id);
    if (profile) {
      setSelectedProfile(profile);
      setShowProfileDetails(true);
    }
  };
  const handleEditMembership = (id: number) => {
    const profile = profiles.find(p => p.id === id);
    if (profile) {
      setSelectedProfile(profile);
      setShowMembershipEdit(true);
    }
  };
  const handleRequestPayment = (id: number) => {
    const profile = profiles.find(p => p.id === id);
    if (profile) {
      setSelectedProfile(profile);
      setShowPaymentRequest(true);
    }
  };

  const handleRequestVerification = (id: number) => {
    const profile = profiles.find(p => p.id === id);
    if (profile) {
      setSelectedProfile(profile);
      setShowVerificationRequest(true);
    }
  };

  const handleSubmitVerificationRequest = (data: VerificationRequestData) => {
    // Update profile with verification request data
    setProfiles(profiles.map(profile => 
      profile.id === data.profileId 
        ? {
            ...profile,
            verificationStatus: 'pending' as const,
            verificationMethod: data.method,
            verificationNotes: data.notes
          }
        : profile
    ));

    // Add notification
    const profile = profiles.find(p => p.id === data.profileId);
    const newNotification = makeNotification(
      'system', 
      'Verification Requested', 
      `Verification request sent to ${profile?.name} via ${data.method.replace('_', ' ')}`
    );
    setNotifications([newNotification, ...notifications]);

    // Close modal
    setShowVerificationRequest(false);
    setSelectedProfile(null);
  };
  const handleSaveMembership = (id: number, data: { membershipTier: string; isVip: boolean; shortTimePrice?: number; dayBreakPrice?: number; subscriptionDuration?: string; subscriptionEndDate?: string }) => {
    setProfiles(profiles.map(profile => profile.id === id ? {
      ...profile,
      membershipTier: (data.membershipTier as MembershipTier),
      isVip: data.isVip
    } : profile));
    const profileName = profiles.find(p => p.id === id)?.name;
    alert(`Membership updated for ${profileName}`);
    // Add notification
  const newNotification = makeNotification('system', 'Membership Updated', `${profileName}'s membership updated to ${data.membershipTier || 'none'}${data.isVip ? ' (VIP)' : ''}`);
  setNotifications([newNotification, ...notifications]);
  };
  const handleSendPaymentRequest = (id: number, data: any) => {
    // In a real app, this would send the payment request to the user
    console.log('Payment request sent:', {
      profileId: id,
      ...data
    });
    const profileName = profiles.find(p => p.id === id)?.name;
    alert(`Payment request of ₦${data.amount} sent to ${profileName}`);
    // Add notification
  const newNotification = makeNotification('payment', 'Payment Requested', `₦${data.amount} payment requested from ${profileName}`);
  setNotifications([newNotification, ...notifications]);
  };
  // Advanced filtering
  const [advancedFilters, setAdvancedFilters] = useState({
    status: 'all',
    membershipTier: 'all',
    isVip: 'all',
    gender: 'all',
    priceRange: {
      min: '',
      max: ''
    },
    location: '',
    sortBy: 'newest'
  });
  const handleApplyFilters = (filters: any) => {
    setAdvancedFilters(filters);
    // Reset selection when filters change
    setSelectedProfiles([]);
    setSelectAll(false);
  };
  const handleResetFilters = () => {
    setAdvancedFilters({
      status: 'all',
      membershipTier: 'all',
      isVip: 'all',
      gender: 'all',
      priceRange: {
        min: '',
        max: ''
      },
      location: '',
      sortBy: 'newest'
    });
    setSearchTerm('');
    setFilter('all');
    // Reset selection when filters change
    setSelectedProfiles([]);
    setSelectAll(false);
  };
  // Review management handlers
  const handleApproveReview = (id: number) => {
    setReviews(reviews.map(review => review.id === id ? {
      ...review,
      status: 'approved'
    } : review));
    // Add notification
  const reviewData = reviews.find(r => r.id === id);
  const newNotification = makeNotification('system', 'Review Approved', `Review for ${reviewData?.profileName} has been approved`);
  setNotifications([newNotification, ...notifications]);
  };
  const handleRejectReview = (id: number) => {
    setReviews(reviews.map(review => review.id === id ? {
      ...review,
      status: 'rejected'
    } : review));
    // Add notification
  const reviewData = reviews.find(r => r.id === id);
  const newNotification = makeNotification('warning', 'Review Rejected', `Review for ${reviewData?.profileName} has been rejected`);
  setNotifications([newNotification, ...notifications]);
  };
  const handleViewReview = (id: number) => {
    const review = reviews.find(r => r.id === id);
    if (review) {
      setSelectedReview(review);
      setShowReviewDetails(true);
    }
  };
  // Event management handlers
  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setShowEventForm(true);
  };
  const handleEditEvent = (id: number) => {
    const event = events.find(e => e.id === id);
    if (event) {
      setSelectedEvent(event);
      setShowEventForm(true);
    }
  };
  const handleSaveEvent = (eventData: any) => {
    if (selectedEvent) {
      // Update existing event
      setEvents(events.map(event => event.id === selectedEvent.id ? {
        ...event,
        ...eventData
      } : event));
      // Add notification
  const newNotification = makeNotification('system', 'Event Updated', `"${eventData.title}" has been updated`);
  setNotifications([newNotification, ...notifications]);
    } else {
      // Create new event
      const newEvent = {
        id: Date.now(),
        ...eventData,
        attendees: 0,
        isPast: false
      };
      setEvents([...events, newEvent]);
      // Add notification
  const newNotification = makeNotification('system', 'Event Created', `"${eventData.title}" has been created`);
  setNotifications([newNotification, ...notifications]);
    }
    setShowEventForm(false);
  };
  const handlePublishEvent = (id: number) => {
    setEvents(events.map(event => event.id === id ? {
      ...event,
      status: 'published'
    } : event));
    // Add notification
  const eventData = events.find(e => e.id === id);
  const newNotification = makeNotification('system', 'Event Published', `"${eventData?.title}" is now live`);
  setNotifications([newNotification, ...notifications]);
  };
  const handleDeleteEvent = (id: number) => {
    // Get event data before deletion for notification
    const eventData = events.find(e => e.id === id);
    // Delete event
    setEvents(events.filter(event => event.id !== id));
    // Add notification
  const newNotification = makeNotification('warning', 'Event Deleted', `"${eventData?.title}" has been deleted`);
  setNotifications([newNotification, ...notifications]);
  };
  // Advertisement management handlers
  const handleCreateAd = () => {
    setSelectedAd(null);
    setShowAdForm(true);
  };
  const handleEditAd = (id: number) => {
    const ad = advertisements.find(a => a.id === id);
    if (ad) {
      setSelectedAd(ad);
      setShowAdForm(true);
    }
  };
  const handleSaveAd = (adData: any) => {
    if (selectedAd) {
      // Update existing ad
      setAdvertisements(advertisements.map(ad => ad.id === selectedAd.id ? {
        ...ad,
        ...adData
      } : ad));
      // Add notification
  const newNotification = makeNotification('system', 'Advertisement Updated', `"${adData.title}" has been updated`);
  setNotifications([newNotification, ...notifications]);
    } else {
      // Create new ad
      const newAd = {
        id: Date.now(),
        ...adData,
        clicks: 0,
        impressions: 0
      };
      setAdvertisements([...advertisements, newAd]);
      // Add notification
  const newNotification = makeNotification('system', 'Advertisement Created', `"${adData.title}" has been created`);
  setNotifications([newNotification, ...notifications]);
    }
    setShowAdForm(false);
  };
  const handlePublishAd = (id: number) => {
    setAdvertisements(advertisements.map(ad => ad.id === id ? {
      ...ad,
      status: 'active'
    } : ad));
    // Add notification
  const adData = advertisements.find(a => a.id === id);
  const newNotification = makeNotification('system', 'Advertisement Published', `"${adData?.title}" is now live`);
  setNotifications([newNotification, ...notifications]);
  };
  const handleDeleteAd = (id: number) => {
    // Get ad data before deletion for notification
    const adData = advertisements.find(a => a.id === id);
    // Delete ad
    setAdvertisements(advertisements.filter(ad => ad.id !== id));
    // Add notification
  const newNotification = makeNotification('warning', 'Advertisement Deleted', `"${adData?.title}" has been deleted`);
  setNotifications([newNotification, ...notifications]);
  };
  // Blacklist management handlers
  const handleOpenBlacklistForm = (id: number) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setSelectedUser(user);
      setBlacklistReason(user.blacklistReason || '');
      setBlacklistEvidence(user.blacklistEvidence || '');
      setShowBlacklistForm(true);
    }
  };
  const handleBlacklistUser = () => {
    if (!selectedUser) return;
    setUsers(users.map(user => user.id === selectedUser.id ? {
      ...user,
      isBlacklisted: true,
      status: 'inactive',
      blacklistReason,
      blacklistEvidence
    } : user));
    // Add notification
  const newNotification = makeNotification('warning', 'User Blacklisted', `${selectedUser.username} has been added to blacklist`);
  setNotifications([newNotification, ...notifications]);
    setShowBlacklistForm(false);
    setBlacklistReason('');
    setBlacklistEvidence('');
  };
  const handleRemoveFromBlacklist = (id: number) => {
    setUsers(users.map(user => user.id === id ? {
      ...user,
      isBlacklisted: false,
      status: 'active',
      blacklistReason: '',
      blacklistEvidence: ''
    } : user));
    // Add notification
  const userData = users.find(u => u.id === id);
  const newNotification = makeNotification('system', 'User Removed from Blacklist', `${userData?.username} has been removed from blacklist`);
  setNotifications([newNotification, ...notifications]);
  };
  // Filtered data for display
  const filteredProfiles = profiles.filter(profile => {
    // Apply search filter
    if (searchTerm && !profile.name.toLowerCase().includes(searchTerm.toLowerCase()) && !profile.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    // Apply basic status filter
    if (filter === 'pending' && profile.isVerified) return false;
    if (filter === 'verified' && !profile.isVerified) return false;
    if (filter === 'featured' && !profile.isFeatured) return false;
    // Apply advanced filters
    if (advancedFilters.status !== 'all') {
      if (advancedFilters.status === 'pending' && profile.isVerified) return false;
      if (advancedFilters.status === 'verified' && !profile.isVerified) return false;
      if (advancedFilters.status === 'featured' && !profile.isFeatured) return false;
    }
    if (advancedFilters.membershipTier !== 'all') {
      if (advancedFilters.membershipTier === 'none' && profile.membershipTier) return false;
      if (advancedFilters.membershipTier !== 'none' && profile.membershipTier !== advancedFilters.membershipTier) return false;
    }
    if (advancedFilters.isVip !== 'all') {
      if (advancedFilters.isVip === 'vip' && !profile.isVip) return false;
      if (advancedFilters.isVip === 'non-vip' && profile.isVip) return false;
    }
    // Price range filter
    if (advancedFilters.priceRange.min && (!profile.price || profile.price < Number(advancedFilters.priceRange.min))) {
      return false;
    }
    if (advancedFilters.priceRange.max && profile.price && profile.price > Number(advancedFilters.priceRange.max)) {
      return false;
    }
    // Location filter
    if (advancedFilters.location && !profile.location.toLowerCase().includes(advancedFilters.location.toLowerCase())) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    // Apply sorting
    switch (advancedFilters.sortBy) {
      case 'newest':
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      case 'oldest':
        return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
  // Filter reviews based on status
  const filteredReviews = reviews.filter(review => {
    if (reviewFilter === 'all') return true;
    return review.status === reviewFilter;
  });
  // Filter events based on status
  const filteredEvents = events.filter(event => {
    if (eventFilter === 'all') return true;
    if (eventFilter === 'past') return event.isPast;
    return event.status === eventFilter;
  });
  // Filter advertisements based on status
  const filteredAds = advertisements.filter(ad => {
    if (adFilter === 'all') return true;
    return ad.status === adFilter;
  });
  // Filter users based on status
  const filteredUsers = users.filter(user => {
    if (userFilter === 'all') return true;
    if (userFilter === 'blacklisted') return user.isBlacklisted;
    return user.status === userFilter;
  });
  // Calculate dashboard statistics
  const stats = {
    totalProfiles: profiles.length,
    verifiedProfiles: profiles.filter(p => p.isVerified).length,
    pendingProfiles: profiles.filter(p => !p.isVerified).length,
    totalRevenue: transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0),
    successfulTransactions: transactions.filter(t => t.status === 'completed').length,
    activeUsers: users.filter(u => u.status === 'active').length,
    pendingReviews: reviews.filter(r => r.status === 'pending').length,
    publishedEvents: events.filter(e => e.status === 'published').length,
    activeAds: advertisements.filter(a => a.status === 'active').length,
    blacklistedUsers: users.filter(u => u.isBlacklisted).length
  };
  // Calculate daily revenue for chart
  const [dailyRevenue, setDailyRevenue] = useState<{
    date: string;
    amount: number;
  }[]>([]);
  useEffect(() => {
    // In a real app, this would come from an API
    // For demo, we'll generate some random data
    const last7Days = Array.from({
      length: 7
    }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();
    const revenueData = last7Days.map(date => ({
      date,
      amount: Math.floor(Math.random() * 10000) + 2000
    }));
    setDailyRevenue(revenueData);
  }, []);
  // Simple chart rendering
  const maxRevenue = Math.max(...dailyRevenue.map(d => d.amount));
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => <Star key={i} size={16} className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-500'} />);
  };
  return (
    <>
      <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
        <Header />
        <main id="main-content" className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Enhanced Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                {refreshing && (
                  <RefreshCw size={20} className="text-amber-400 animate-spin" />
                )}
              </div>
              <p className="text-gray-400">
                Manage profiles, transactions, and site content
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>Last updated: {new Date().toLocaleString()}</span>
                <span>•</span>
                <span>{stats.totalProfiles} Total Profiles</span>
                <span>•</span>
                <span>{stats.activeUsers} Active Users</span>
              </div>
            </div>
            
            {/* Action Bar */}
            <div className="flex items-center gap-3 flex-wrap">
              <AdminNotificationCenter 
                notifications={notifications} 
                onMarkAllAsRead={handleMarkAllAsRead} 
                onMarkAsRead={handleMarkAsRead} 
                onClearAll={handleClearAllNotifications} 
              />
              
              <Button 
                variant="secondary" 
                size="sm"
                onClick={async () => {
                  setRefreshing(true);
                  // Simulate refresh delay
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  setRefreshing(false);
                  const refreshNotification = makeNotification('system', 'Data Refreshed', 'All data has been successfully refreshed');
                  setNotifications([refreshNotification, ...notifications]);
                }}
                disabled={refreshing}
              >
                <RefreshCw size={16} className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              
              <Button variant="primary" size="sm">
                <Settings size={16} className="mr-2" />
                Settings
              </Button>
            </div>
          </div>
          {/* Enhanced Admin Navigation */}
          <div className="bg-slate-800 rounded-lg mb-8 overflow-hidden shadow-lg border border-slate-700">
            <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600" role="tablist" aria-label="Admin sections">
              <button 
                role="tab" 
                aria-selected={activeTab === 'profiles'} 
                onClick={() => {
                  setActiveTab('profiles');
                  setLoading(true);
                  setTimeout(() => setLoading(false), 300);
                }}
                className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap transition-all duration-200 ${
                  activeTab === 'profiles' 
                    ? 'text-amber-400 bg-slate-700 border-b-2 border-amber-400' 
                    : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Users size={16} className="mr-2" /> 
                Profiles
                {stats.pendingProfiles > 0 && (
                  <span className="ml-2 bg-amber-500 text-slate-900 rounded-full px-2 py-0.5 text-xs font-medium">
                    {stats.pendingProfiles}
                  </span>
                )}
              </button>
              
              <button 
                role="tab" 
                aria-selected={activeTab === 'reviews'} 
                onClick={() => {
                  setActiveTab('reviews');
                  setLoading(true);
                  setTimeout(() => setLoading(false), 300);
                }}
                className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap transition-all duration-200 ${
                  activeTab === 'reviews' 
                    ? 'text-amber-400 bg-slate-700 border-b-2 border-amber-400' 
                    : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <MessageSquare size={16} className="mr-2" /> 
                Reviews
                {stats.pendingReviews > 0 && (
                  <span className="ml-2 bg-rose-500 text-white rounded-full px-2 py-0.5 text-xs font-medium animate-pulse">
                    {stats.pendingReviews}
                  </span>
                )}
              </button>
              
              <button 
                role="tab" 
                aria-selected={activeTab === 'events'} 
                onClick={() => {
                  setActiveTab('events');
                  setLoading(true);
                  setTimeout(() => setLoading(false), 300);
                }}
                className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap transition-all duration-200 ${
                  activeTab === 'events' 
                    ? 'text-amber-400 bg-slate-700 border-b-2 border-amber-400' 
                    : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Calendar size={16} className="mr-2" /> 
                Events
                {events.filter(e => e.status === 'draft').length > 0 && (
                  <span className="ml-2 bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs font-medium">
                    {events.filter(e => e.status === 'draft').length}
                  </span>
                )}
              </button>
              
              <button 
                role="tab" 
                aria-selected={activeTab === 'advertisements'} 
                onClick={() => {
                  setActiveTab('advertisements');
                  setLoading(true);
                  setTimeout(() => setLoading(false), 300);
                }}
                className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap transition-all duration-200 ${
                  activeTab === 'advertisements' 
                    ? 'text-amber-400 bg-slate-700 border-b-2 border-amber-400' 
                    : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Image size={16} className="mr-2" /> 
                Ads
              </button>
              
              <button 
                role="tab" 
                aria-selected={activeTab === 'users'} 
                onClick={() => {
                  setActiveTab('users');
                  setLoading(true);
                  setTimeout(() => setLoading(false), 300);
                }}
                className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap transition-all duration-200 ${
                  activeTab === 'users' 
                    ? 'text-amber-400 bg-slate-700 border-b-2 border-amber-400' 
                    : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <User size={16} className="mr-2" /> 
                Users
              </button>
              
              <button 
                role="tab" 
                aria-selected={activeTab === 'blacklist'} 
                onClick={() => {
                  setActiveTab('blacklist');
                  setLoading(true);
                  setTimeout(() => setLoading(false), 300);
                }}
                className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap transition-all duration-200 ${
                  activeTab === 'blacklist' 
                    ? 'text-amber-400 bg-slate-700 border-b-2 border-amber-400' 
                    : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Shield size={16} className="mr-2" /> 
                Blacklist
                {stats.blacklistedUsers > 0 && (
                  <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-medium">
                    {stats.blacklistedUsers}
                  </span>
                )}
              </button>
              
              <button 
                role="tab" 
                aria-selected={activeTab === 'transactions'} 
                onClick={() => {
                  setActiveTab('transactions');
                  setLoading(true);
                  setTimeout(() => setLoading(false), 300);
                }}
                className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap transition-all duration-200 ${
                  activeTab === 'transactions' 
                    ? 'text-amber-400 bg-slate-700 border-b-2 border-amber-400' 
                    : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <DollarSign size={16} className="mr-2" /> 
                Transactions
              </button>
              
              <button 
                role="tab" 
                aria-selected={activeTab === 'analytics'} 
                onClick={() => {
                  setActiveTab('analytics');
                  setLoading(true);
                  setTimeout(() => setLoading(false), 300);
                }}
                className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap transition-all duration-200 ${
                  activeTab === 'analytics' 
                    ? 'text-amber-400 bg-slate-700 border-b-2 border-amber-400' 
                    : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <BarChart2 size={16} className="mr-2" /> 
                Analytics
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <BarChart2 size={20} className="mr-2 text-amber-400" />
                Dashboard Overview
              </h2>
              <button onClick={() => toggleSection('stats')} className="text-gray-400 hover:text-white">
                {expandedSections.stats ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            {expandedSections.stats && <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 text-sm">Total Profiles</p>
                        <h3 className="text-2xl font-bold text-white mt-1">
                          {stats.totalProfiles}
                        </h3>
                      </div>
                      <div className="bg-blue-500/20 p-2 rounded-md">
                        <Users size={20} className="text-blue-400" />
                      </div>
                    </div>
                    <div className="flex justify-between mt-4 text-xs">
                      <span className="text-green-400">
                        {stats.verifiedProfiles} verified
                      </span>
                      <span className="text-amber-400">
                        {stats.pendingProfiles} pending
                      </span>
                    </div>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 text-sm">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-white mt-1">
                          ₦{stats.totalRevenue.toLocaleString()}
                        </h3>
                      </div>
                      <div className="bg-green-500/20 p-2 rounded-md">
                        <DollarSign size={20} className="text-green-400" />
                      </div>
                    </div>
                    <div className="flex justify-between mt-4 text-xs">
                      <span className="text-green-400">
                        {stats.successfulTransactions} transactions
                      </span>
                      <span className="text-gray-400">This month</span>
                    </div>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 text-sm">Active Content</p>
                        <h3 className="text-2xl font-bold text-white mt-1">
                          {stats.publishedEvents + stats.activeAds}
                        </h3>
                      </div>
                      <div className="bg-amber-500/20 p-2 rounded-md">
                        <Calendar size={20} className="text-amber-400" />
                      </div>
                    </div>
                    <div className="flex justify-between mt-4 text-xs">
                      <span className="text-amber-400">
                        {stats.publishedEvents} events
                      </span>
                      <span className="text-purple-400">
                        {stats.activeAds} ads
                      </span>
                    </div>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 text-sm">User Management</p>
                        <h3 className="text-2xl font-bold text-white mt-1">
                          {stats.activeUsers}
                        </h3>
                      </div>
                      <div className="bg-purple-500/20 p-2 rounded-md">
                        <User size={20} className="text-purple-400" />
                      </div>
                    </div>
                    <div className="flex justify-between mt-4 text-xs">
                      <span className="text-purple-400">
                        {users.length} total users
                      </span>
                      <span className="text-rose-400">
                        {stats.blacklistedUsers} blacklisted
                      </span>
                    </div>
                  </div>
                </div>
                {/* Revenue Chart */}
                <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                  <h3 className="text-sm font-medium text-gray-300 mb-4">
                    Revenue (Last 7 Days)
                  </h3>
                  <div className="h-40 flex items-end justify-between">
                    {dailyRevenue.map((day, index) => <div key={index} className="flex flex-col items-center">
                        <div className="w-8 bg-amber-500/80 hover:bg-amber-400 transition rounded-t" style={{
                    height: `${day.amount / maxRevenue * 100}px`
                  }}></div>
                        <p className="text-xs text-gray-400 mt-1">
                          {day.date.split('-')[2]}
                        </p>
                      </div>)}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>
                      ₦
                      {Math.min(...dailyRevenue.map(d => d.amount)).toLocaleString()}
                    </span>
                    <span>
                      ₦
                      {Math.max(...dailyRevenue.map(d => d.amount)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </>}
          </div>
          {/* Profile Management */}
          {activeTab === 'profiles' && (
            <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Users size={20} className="mr-2 text-amber-400" />
                  Profile Management
                  <span className="ml-2 bg-amber-500 text-slate-900 rounded-full px-2 py-1 text-xs font-medium">
                    {stats.totalProfiles}
                  </span>
                </h2>
                <div className="flex items-center gap-2">
                  {loading && (
                    <RefreshCw size={16} className="text-amber-400 animate-spin" />
                  )}
                  <button 
                    onClick={() => toggleSection('profiles')} 
                    className="text-gray-400 hover:text-white transition-colors p-1 rounded"
                  >
                    {expandedSections.profiles ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>
              
              {expandedSections.profiles && (
                <>
                  <AdminProfileFilters 
                    onApplyFilters={handleApplyFilters} 
                    onResetFilters={handleResetFilters} 
                  />
                  
                  <AdminBulkActions 
                    selectedCount={selectedProfiles.length} 
                    onVerifyAll={handleVerifyAll} 
                    onFeatureAll={handleFeatureAll} 
                    onUnfeatureAll={handleUnfeatureAll} 
                    onDeleteAll={handleDeleteAll} 
                    onSetMembership={handleSetMembership} 
                    onRequestPayment={handleBulkRequestPayment} 
                  />
                  
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Search profiles by name, location, or email..." 
                          value={searchTerm} 
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-slate-700 border border-slate-600 rounded-md pl-10 pr-3 py-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all" 
                        />
                        <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <label className="text-sm text-gray-400 font-medium">Status:</label>
                      <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded-md px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                      >
                        <option value="all">All Profiles</option>
                        <option value="pending">Pending Verification</option>
                        <option value="verified">Verified</option>
                        <option value="featured">Featured</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-400 flex items-center">
                      <input type="checkbox" id="select-all" checked={selectAll} onChange={toggleSelectAll} className="w-4 h-4 text-amber-500 border-slate-600 rounded focus:ring-amber-400 mr-2" />
                      <label htmlFor="select-all">
                        {filteredProfiles.length} profile(s) found
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {filteredProfiles.length > 0 ? filteredProfiles.map(profile => <div key={profile.id} className="flex items-start">
                          <input type="checkbox" checked={selectedProfiles.includes(profile.id)} onChange={() => toggleProfileSelection(profile.id)} className="mt-4 mr-3 w-5 h-5 text-amber-500 border-slate-600 rounded focus:ring-amber-400" />
                          <div className="flex-1">
                            <AdminProfileCard 
                              profile={profile} 
                              onVerify={handleVerify} 
                              onReject={handleReject} 
                              onToggleFeatured={handleToggleFeatured} 
                              onViewDetails={handleViewDetails} 
                              onEditMembership={handleEditMembership} 
                              onRequestPayment={handleRequestPayment}
                              onRequestVerification={handleRequestVerification}
                            />
                          </div>
                        </div>) : <div className="text-center py-8 text-gray-400">
                        No profiles match your current filters
                      </div>}
                  </div>
                  </>
                )}
              </div>
            )}
          {/* Review Management */}
          {activeTab === 'reviews' && (
            <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <MessageSquare size={20} className="mr-2 text-amber-400" />
                  Review Management
                  <span className="ml-2 bg-rose-500 text-white rounded-full px-2 py-1 text-xs font-medium">
                    {stats.pendingReviews}
                  </span>
                </h2>
                <div className="flex items-center gap-2">
                  {loading && (
                    <RefreshCw size={16} className="text-amber-400 animate-spin" />
                  )}
                  <button 
                    onClick={() => toggleSection('reviews')} 
                    className="text-gray-400 hover:text-white transition-colors p-1 rounded"
                  >
                    {expandedSections.reviews ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>
              
              {expandedSections.reviews && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <label className="text-sm text-gray-400 font-medium">Filter:</label>
                      <select 
                        value={reviewFilter} 
                        onChange={(e) => setReviewFilter(e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        <option value="all">All Reviews</option>
                        <option value="pending">Pending Approval</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    <div className="text-sm text-gray-400 bg-slate-700/50 px-3 py-2 rounded-md">
                      {filteredReviews.length} reviews found
                    </div>
                  </div>

                  {/* Review List */}
                  {loading ? (
                    <div className="flex justify-center items-center py-12">
                      <RefreshCw size={32} className="text-amber-400 animate-spin" />
                      <span className="ml-3 text-gray-400">Loading reviews...</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredReviews.length > 0 ? (
                        filteredReviews.map(review => (
                          <div key={review.id} className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <img
                                    src={review.profileImage}
                                    alt={review.profileName}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                  <div>
                                    <h4 className="font-medium text-white">{review.profileName}</h4>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                      <span>By {review.reviewerName}</span>
                                      <span>•</span>
                                      <span>{new Date(review.date).toLocaleDateString()}</span>
                                      <span>•</span>
                                      <div className="flex items-center">
                                        {'★'.repeat(review.rating)}
                                        {'☆'.repeat(5 - review.rating)}
                                        <span className="ml-1">({review.rating}/5)</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-gray-300 mb-3 line-clamp-2">{review.content}</p>
                                <div className="flex items-center gap-4 text-sm">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    review.status === 'approved' 
                                      ? 'bg-green-500/20 text-green-400' 
                                      : review.status === 'rejected'
                                      ? 'bg-red-500/20 text-red-400'
                                      : 'bg-yellow-500/20 text-yellow-400'
                                  }`}>
                                    {review.status === 'approved' ? 'Approved' : 
                                     review.status === 'rejected' ? 'Rejected' : 'Pending'}
                                  </span>
                                  <span className="text-gray-500">
                                    {review.helpfulVotes} helpful • {review.unhelpfulVotes} unhelpful
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 ml-4">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewReview(review.id)}
                                >
                                  <Eye size={14} className="mr-1" />
                                  View
                                </Button>
                                {review.status === 'pending' && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="success"
                                      onClick={() => handleApproveReview(review.id)}
                                    >
                                      <CheckCircle size={14} className="mr-1" />
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="danger"
                                      onClick={() => handleRejectReview(review.id)}
                                    >
                                      <XCircle size={14} className="mr-1" />
                                      Reject
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <MessageSquare size={48} className="mx-auto text-gray-600 mb-4" />
                          <h3 className="text-lg font-medium text-gray-400 mb-2">No reviews found</h3>
                          <p className="text-gray-500">
                            {reviewFilter !== 'all' 
                              ? `No ${reviewFilter} reviews at this time` 
                              : 'No reviews have been submitted yet'
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          {/* Event Management */}
          {activeTab === 'events' && <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Calendar size={20} className="mr-2 text-amber-400" />
                  Event Management
                </h2>
                <button onClick={() => toggleSection('events')} className="text-gray-400 hover:text-white">
                  {expandedSections.events ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              {expandedSections.events && <>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-gray-400">Status:</label>
                      <select value={eventFilter} onChange={e => setEventFilter(e.target.value)} className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400">
                        <option value="all">All Events</option>
                        <option value="published">Published</option>
                        <option value="draft">Drafts</option>
                        <option value="past">Past Events</option>
                      </select>
                    </div>
                    <Button variant="primary" onClick={handleCreateEvent}>
                      <Plus size={16} className="mr-2" />
                      Create New Event
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredEvents.length > 0 ? filteredEvents.map(event => <div key={event.id} className={`bg-slate-700 rounded-lg overflow-hidden border ${event.status === 'published' ? 'border-green-500/40' : 'border-slate-600'}`}>
                          <div className="relative h-40">
                            <img src={event.image} alt={event.title} className={`w-full h-full object-cover ${event.isPast ? 'filter grayscale' : ''}`} />
                            <div className="absolute top-2 right-2 flex gap-1">
                              {event.categories.map((category, idx) => <span key={idx} className="bg-slate-800/80 text-white text-xs px-2 py-0.5 rounded-full">
                                  {category}
                                </span>)}
                            </div>
                            {event.isPast && <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="bg-slate-800/80 text-white px-3 py-1 rounded-md font-medium">
                                  Past Event
                                </span>
                              </div>}
                            {event.status === 'draft' && <div className="absolute bottom-2 left-2">
                                <span className="bg-amber-500/80 text-white px-3 py-1 rounded-md text-xs font-medium">
                                  Draft
                                </span>
                              </div>}
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-white text-lg mb-2">
                              {event.title}
                            </h3>
                            <div className="space-y-1 mb-3">
                              <div className="flex items-center text-sm text-gray-300">
                                <CalendarIcon size={14} className="mr-2 text-gray-400" />
                                {event.date}
                              </div>
                              <div className="flex items-center text-sm text-gray-300">
                                <Clock size={14} className="mr-2 text-gray-400" />
                                {event.time}
                              </div>
                              <div className="flex items-center text-sm text-gray-300">
                                <MapPin size={14} className="mr-2 text-gray-400" />
                                {event.location}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mb-3">
                              <div className="text-sm text-gray-400">
                                <Users size={14} className="inline mr-1" />
                                {event.attendees}/{event.capacity}
                              </div>
                              <div className="font-medium text-amber-400">
                                {event.price}
                              </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Button variant="outline" size="sm" onClick={() => handleEditEvent(event.id)}>
                                <Edit size={14} className="mr-1" />
                                Edit
                              </Button>
                              {event.status === 'draft' && !event.isPast && <Button variant="secondary" size="sm" onClick={() => handlePublishEvent(event.id)}>
                                  <Eye size={14} className="mr-1" />
                                  Publish
                                </Button>}
                              <Button variant="danger" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                                <Trash2 size={14} className="mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>) : <div className="col-span-3 text-center py-8 text-gray-400">
                        No events match your current filters
                      </div>}
                  </div>
                </>}
            </div>}
          {/* Advertisement Management */}
          {activeTab === 'advertisements' && <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Image size={20} className="mr-2 text-amber-400" />
                  Advertisement Management
                </h2>
                <button onClick={() => toggleSection('advertisements')} className="text-gray-400 hover:text-white">
                  {expandedSections.advertisements ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              {expandedSections.advertisements && <>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-gray-400">Status:</label>
                      <select value={adFilter} onChange={e => setAdFilter(e.target.value)} className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400">
                        <option value="all">All Advertisements</option>
                        <option value="active">Active</option>
                        <option value="draft">Drafts</option>
                        <option value="ended">Ended</option>
                      </select>
                    </div>
                    <Button variant="primary" onClick={handleCreateAd}>
                      <Plus size={16} className="mr-2" />
                      Create New Advertisement
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {filteredAds.length > 0 ? filteredAds.map(ad => <div key={ad.id} className={`bg-slate-700 rounded-lg overflow-hidden border ${ad.status === 'active' ? 'border-green-500/40' : 'border-slate-600'}`}>
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-48 h-40">
                              <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-white text-lg">
                                    {ad.title}
                                  </h3>
                                  <p className="text-gray-400 text-sm">
                                    {ad.company}
                                  </p>
                                </div>
                                <span className={`px-3 py-1 text-xs rounded-full ${ad.status === 'active' ? 'bg-green-500/20 text-green-400' : ad.status === 'draft' ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                  {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                                </span>
                              </div>
                              <p className="text-gray-300 mt-2 mb-3">
                                {ad.description}
                              </p>
                              <div className="grid grid-cols-2 gap-2 mb-3">
                                <div className="text-sm text-gray-400">
                                  <span className="font-medium text-gray-300">
                                    Placement:
                                  </span>{' '}
                                  {ad.placement}
                                </div>
                                <div className="text-sm text-gray-400">
                                  <span className="font-medium text-gray-300">
                                    Duration:
                                  </span>{' '}
                                  {ad.startDate} - {ad.endDate}
                                </div>
                                <div className="text-sm text-gray-400">
                                  <span className="font-medium text-gray-300">
                                    Clicks:
                                  </span>{' '}
                                  {ad.clicks.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-400">
                                  <span className="font-medium text-gray-300">
                                    Impressions:
                                  </span>{' '}
                                  {ad.impressions.toLocaleString()}
                                </div>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button variant="outline" size="sm" onClick={() => handleEditAd(ad.id)}>
                                  <Edit size={14} className="mr-1" />
                                  Edit
                                </Button>
                                {ad.status === 'draft' && <Button variant="secondary" size="sm" onClick={() => handlePublishAd(ad.id)}>
                                    <Eye size={14} className="mr-1" />
                                    Publish
                                  </Button>}
                                <Button variant="danger" size="sm" onClick={() => handleDeleteAd(ad.id)}>
                                  <Trash2 size={14} className="mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>) : <div className="text-center py-8 text-gray-400">
                        No advertisements match your current filters
                      </div>}
                  </div>
                </>}
            </div>}
          {/* User Management */}
          {activeTab === 'users' && <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <User size={20} className="mr-2 text-amber-400" />
                  User Management
                </h2>
                <button onClick={() => toggleSection('users')} className="text-gray-400 hover:text-white">
                  {expandedSections.users ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              {expandedSections.users && <>
                  <div className="flex items-center gap-3 mb-6">
                    <label className="text-sm text-gray-400">Status:</label>
                    <select value={userFilter} onChange={e => setUserFilter(e.target.value)} className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400">
                      <option value="all">All Users</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="blacklisted">Blacklisted</option>
                    </select>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-400 border-b border-slate-700">
                          <th className="pb-3 font-medium">User ID</th>
                          <th className="pb-3 font-medium">Username</th>
                          <th className="pb-3 font-medium">Email</th>
                          <th className="pb-3 font-medium">Join Date</th>
                          <th className="pb-3 font-medium">Last Active</th>
                          <th className="pb-3 font-medium">Status</th>
                          <th className="pb-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700">
                        {filteredUsers.map(user => <tr key={user.id} className="text-gray-300">
                            <td className="py-3">#{user.id}</td>
                            <td className="py-3">{user.username}</td>
                            <td className="py-3">{user.email}</td>
                            <td className="py-3">{user.joinDate}</td>
                            <td className="py-3">{user.lastActive}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${user.isBlacklisted ? 'bg-rose-500/20 text-rose-400' : user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                {user.isBlacklisted ? 'Blacklisted' : user.status}
                              </span>
                            </td>
                            <td className="py-3 flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye size={14} className="mr-1" />
                                View
                              </Button>
                              {!user.isBlacklisted ? <Button variant="danger" size="sm" onClick={() => handleOpenBlacklistForm(user.id)}>
                                  <Flag size={14} className="mr-1" />
                                  Blacklist
                                </Button> : <Button variant="secondary" size="sm" onClick={() => handleRemoveFromBlacklist(user.id)}>
                                  <Shield size={14} className="mr-1" />
                                  Remove from Blacklist
                                </Button>}
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </>}
            </div>}
          {/* Blacklist Management */}
          {activeTab === 'blacklist' && <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Shield size={20} className="mr-2 text-rose-400" />
                  Blacklisted Users
                </h2>
                <button onClick={() => toggleSection('blacklist')} className="text-gray-400 hover:text-white">
                  {expandedSections.blacklist ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              {expandedSections.blacklist && <>
                  <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <AlertTriangle size={20} className="text-rose-400 mr-2" />
                      <p className="text-white font-medium">
                        Blacklisted users are automatically hidden from the
                        platform and cannot access their accounts.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {users.filter(u => u.isBlacklisted).length > 0 ? users.filter(u => u.isBlacklisted).map(user => <div key={user.id} className="bg-slate-700 border border-rose-500/30 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-white text-lg flex items-center">
                                  {user.username}
                                  <span className="ml-2 bg-rose-500/20 text-rose-400 text-xs px-2 py-0.5 rounded-full">
                                    Blacklisted
                                  </span>
                                </h3>
                                <p className="text-gray-400 text-sm">
                                  User #{user.id} • {user.email}
                                </p>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => handleRemoveFromBlacklist(user.id)}>
                                <Shield size={14} className="mr-1" />
                                Remove from Blacklist
                              </Button>
                            </div>
                            <div className="mt-4 space-y-3">
                              <div>
                                <h4 className="text-sm font-medium text-gray-300">
                                  Reason for Blacklisting:
                                </h4>
                                <p className="text-gray-300">
                                  {user.blacklistReason || 'No reason provided'}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-300">
                                  Evidence:
                                </h4>
                                <p className="text-gray-300">
                                  {user.blacklistEvidence || 'No evidence provided'}
                                </p>
                              </div>
                              <div className="flex items-center text-sm text-gray-400">
                                <Clock size={14} className="mr-1" />
                                <span>Blacklisted on: {user.lastActive}</span>
                              </div>
                            </div>
                          </div>) : <div className="text-center py-8 text-gray-400">
                        There are currently no blacklisted users
                      </div>}
                  </div>
                </>}
            </div>}
          {/* Transaction History */}
          {activeTab === 'transactions' && <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <DollarSign size={20} className="mr-2 text-amber-400" />
                  Transaction History
                </h2>
                <button onClick={() => toggleSection('transactions')} className="text-gray-400 hover:text-white">
                  {expandedSections.transactions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              {expandedSections.transactions && <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-slate-700">
                        <th className="pb-3 font-medium">Transaction ID</th>
                        <th className="pb-3 font-medium">User</th>
                        <th className="pb-3 font-medium">Profile</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {transactions.map(transaction => <tr key={transaction.id} className="text-gray-300">
                          <td className="py-3">#{transaction.id}</td>
                          <td className="py-3">User #{transaction.userId}</td>
                          <td className="py-3">
                            {profiles.find(p => p.id === transaction.profileId)?.name || 'Unknown'}
                          </td>
                          <td className="py-3 text-amber-400">
                            ₦{transaction.amount.toLocaleString()}
                          </td>
                          <td className="py-3">{transaction.date}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${transaction.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <Button variant="secondary" size="sm">
                              Details
                            </Button>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>}
            </div>}
          {/* Analytics Dashboard */}
          {activeTab === 'analytics' && <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Activity size={20} className="mr-2 text-amber-400" />
                Analytics Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                  <h3 className="text-sm font-medium text-gray-300 mb-4">
                    User Registrations (Last 30 Days)
                  </h3>
                  <div className="h-60 flex items-end justify-between">
                    {/* Placeholder for chart */}
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-gray-400">
                        Chart visualization would appear here
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                  <h3 className="text-sm font-medium text-gray-300 mb-4">
                    Profile Views by Location
                  </h3>
                  <div className="h-60 flex items-end justify-between">
                    {/* Placeholder for chart */}
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-gray-400">
                        Chart visualization would appear here
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                  <h3 className="text-sm font-medium text-gray-300 mb-4">
                    Top Performing Profiles
                  </h3>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-slate-600">
                        <th className="pb-2 font-medium">Profile</th>
                        <th className="pb-2 font-medium">Views</th>
                        <th className="pb-2 font-medium">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-600">
                      {profiles.slice(0, 3).map(profile => <tr key={profile.id} className="text-gray-300">
                          <td className="py-2 flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                              <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" loading="lazy" />
                            </div>
                            {profile.name}
                          </td>
                          <td className="py-2">
                            {Math.floor(Math.random() * 1000) + 100}
                          </td>
                          <td className="py-2 text-amber-400">
                            ₦{(Math.floor(Math.random() * 10) + 1) * 2000}
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
                <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                  <h3 className="text-sm font-medium text-gray-300 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <User size={14} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-gray-300">New user registered</p>
                        <p className="text-xs text-gray-500">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                        <DollarSign size={14} className="text-green-400" />
                      </div>
                      <div>
                        <p className="text-gray-300">New payment received</p>
                        <p className="text-xs text-gray-500">20 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center mr-3">
                        <Bell size={14} className="text-amber-400" />
                      </div>
                      <div>
                        <p className="text-gray-300">
                          New profile verification request
                        </p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          {/* Settings */}
          {activeTab === 'settings' && <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Settings size={20} className="mr-2 text-amber-400" />
                System Settings
              </h2>
              <div className="space-y-6">
                <div className="border-b border-slate-700 pb-6">
                  <h3 className="text-lg font-medium text-white mb-4">
                    General Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-300">Maintenance Mode</p>
                        <p className="text-xs text-gray-500">
                          Disable public access to the site
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-slate-700">
                        <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-gray-400"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-300">New User Registration</p>
                        <p className="text-xs text-gray-500">
                          Allow new users to register
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-amber-500/30">
                        <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-amber-400"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-300">Auto Approve Profiles</p>
                        <p className="text-xs text-gray-500">
                          Automatically approve new profiles
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-slate-700">
                        <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-gray-400"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-300">Require Review Approval</p>
                        <p className="text-xs text-gray-500">
                          Reviews must be approved before appearing publicly
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-amber-500/30">
                        <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-amber-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-b border-slate-700 pb-6">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Payment Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Contact Unlock Price (₦)
                      </label>
                      <input type="number" value="2000" className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Featured Profile Price (₦)
                      </label>
                      <input type="number" value="5000" className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-300">
                          Enable Payment Processing
                        </p>
                        <p className="text-xs text-gray-500">
                          Process payments on the platform
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-amber-500/30">
                        <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-amber-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Settings</Button>
                </div>
              </div>
            </div>}
        </div>
      </main>
      <Footer />
    </div>
    
    {/* Modals */}
    <ProfileDetailsModal 
      isOpen={showProfileDetails} 
      onClose={() => setShowProfileDetails(false)} 
      profile={selectedProfile} 
    />
    <MembershipEditModal 
      isOpen={showMembershipEdit} 
      onClose={() => setShowMembershipEdit(false)} 
      profile={selectedProfile} 
      onSave={handleSaveMembership} 
    />
    <PaymentRequestModal 
      isOpen={showPaymentRequest} 
      onClose={() => setShowPaymentRequest(false)} 
      profile={selectedProfile} 
      onSend={handleSendPaymentRequest} 
    />
    <VerificationRequestModal
      isOpen={showVerificationRequest}
      onClose={() => setShowVerificationRequest(false)}
      profile={selectedProfile}
      onSubmit={handleSubmitVerificationRequest}
    />
      {/* Blacklist User Modal */}
      {showBlacklistForm && selectedUser && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl w-full max-w-lg border border-slate-700 overflow-hidden">
            <div className="bg-slate-700 p-4 flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center">
                <Shield size={18} className="text-rose-500 mr-2" />
                Blacklist User: {selectedUser.username}
              </h3>
              <button onClick={() => setShowBlacklistForm(false)} className="text-gray-400 hover:text-white" aria-label="Close blacklist form">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <AlertTriangle size={16} className="text-rose-400 mr-2" />
                  <p className="text-gray-200 text-sm">
                    Blacklisting a user will prevent them from accessing the
                    platform and hide their profile from public view.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Reason for Blacklisting{' '}
                    <span className="text-rose-400">*</span>
                  </label>
                  <textarea value={blacklistReason} onChange={e => setBlacklistReason(e.target.value)} placeholder="Provide a detailed reason for blacklisting this user..." className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 h-24" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Evidence <span className="text-rose-400">*</span>
                  </label>
                  <textarea value={blacklistEvidence} onChange={e => setBlacklistEvidence(e.target.value)} placeholder="Provide evidence supporting the blacklisting (e.g., screenshots of violations, reports from other users)..." className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 h-24" required />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowBlacklistForm(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleBlacklistUser} disabled={!blacklistReason.trim() || !blacklistEvidence.trim()}>
                  <Shield size={16} className="mr-2" />
                  Blacklist User
                </Button>
              </div>
            </div>
          </div>
        </div>}
      {/* Event Form Modal */}
      {showEventForm && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl w-full max-w-2xl border border-slate-700 overflow-hidden">
            <div className="bg-slate-700 p-4 flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center">
                <Calendar size={18} className="text-amber-400 mr-2" />
                {selectedEvent ? 'Edit Event' : 'Create New Event'}
              </h3>
              <button onClick={() => setShowEventForm(false)} className="text-gray-400 hover:text-white" aria-label="Close event form">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Event Title <span className="text-rose-400">*</span>
                  </label>
                  <input type="text" defaultValue={selectedEvent?.title || ''} placeholder="Enter event title..." className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Date <span className="text-rose-400">*</span>
                    </label>
                    <input type="date" defaultValue={selectedEvent?.date || ''} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Time <span className="text-rose-400">*</span>
                    </label>
                    <input type="text" defaultValue={selectedEvent?.time || ''} placeholder="e.g., 8:00 PM - 2:00 AM" className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Location <span className="text-rose-400">*</span>
                  </label>
                  <input type="text" defaultValue={selectedEvent?.location || ''} placeholder="Enter event location..." className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description <span className="text-rose-400">*</span>
                  </label>
                  <textarea defaultValue={selectedEvent?.description || ''} placeholder="Describe the event..." className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 h-24" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Image URL <span className="text-rose-400">*</span>
                  </label>
                  <input type="text" defaultValue={selectedEvent?.image || ''} placeholder="Enter image URL..." className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Capacity <span className="text-rose-400">*</span>
                    </label>
                    <input type="number" defaultValue={selectedEvent?.capacity || ''} placeholder="e.g., 50" className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Regular Price <span className="text-rose-400">*</span>
                    </label>
                    <input type="text" defaultValue={selectedEvent?.price?.replace('₦', '') || ''} placeholder="e.g., 15000" className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      VIP Price
                    </label>
                    <input type="text" defaultValue={selectedEvent?.vipPrice?.replace('₦', '') || ''} placeholder="e.g., 30000" className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Categories <span className="text-rose-400">*</span>
                  </label>
                  <input type="text" defaultValue={selectedEvent?.categories?.join(', ') || ''} placeholder="e.g., Social, Nightlife, Luxury (comma separated)" className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Status
                  </label>
                  <select defaultValue={selectedEvent?.status || 'draft'} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowEventForm(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => {
              // In a real implementation, you would collect form values
              // For this demo, we'll just simulate saving with mock data
              const mockEventData = {
                title: selectedEvent?.title || 'New Event',
                date: selectedEvent?.date || '2024-01-01',
                time: selectedEvent?.time || '8:00 PM - 11:00 PM',
                location: selectedEvent?.location || 'Event Venue',
                description: selectedEvent?.description || 'Event description',
                image: selectedEvent?.image || 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
                capacity: selectedEvent?.capacity || 50,
                price: selectedEvent?.price || '₦20,000',
                vipPrice: selectedEvent?.vipPrice || '₦40,000',
                categories: selectedEvent?.categories || ['Social', 'Networking'],
                status: selectedEvent?.status || 'draft'
              };
              handleSaveEvent(mockEventData);
            }}>
                  {selectedEvent ? 'Update Event' : 'Create Event'}
                </Button>
              </div>
            </div>
          </div>
        </div>}
      {/* Advertisement Form Modal */}
      {showAdForm && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl w-full max-w-2xl border border-slate-700 overflow-hidden">
            <div className="bg-slate-700 p-4 flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center">
                <Image size={18} className="text-amber-400 mr-2" />
                {selectedAd ? 'Edit Advertisement' : 'Create New Advertisement'}
              </h3>
              <button onClick={() => setShowAdForm(false)} className="text-gray-400 hover:text-white" aria-label="Close advertisement form">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Advertisement Title <span className="text-rose-400">*</span>
                  </label>
                  <input type="text" defaultValue={selectedAd?.title || ''} placeholder="Enter advertisement title..." className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Company <span className="text-rose-400">*</span>
                  </label>
                  <input type="text" defaultValue={selectedAd?.company || ''} placeholder="Enter company name..." className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description <span className="text-rose-400">*</span>
                  </label>
                  <textarea defaultValue={selectedAd?.description || ''} placeholder="Describe the advertisement..." className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 h-24" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Image URL <span className="text-rose-400">*</span>
                  </label>
                  <input type="text" defaultValue={selectedAd?.image || ''} placeholder="Enter image URL..." className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Start Date <span className="text-rose-400">*</span>
                    </label>
                    <input type="date" defaultValue={selectedAd?.startDate || ''} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      End Date <span className="text-rose-400">*</span>
                    </label>
                    <input type="date" defaultValue={selectedAd?.endDate || ''} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Placement <span className="text-rose-400">*</span>
                  </label>
                  <select defaultValue={selectedAd?.placement || 'homepage'} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400">
                    <option value="homepage">Homepage</option>
                    <option value="profiles">Profiles Page</option>
                    <option value="events">Events Page</option>
                    <option value="sidebar">Sidebar (All Pages)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Status
                  </label>
                  <select defaultValue={selectedAd?.status || 'draft'} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400">
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowAdForm(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => {
              // In a real implementation, you would collect form values
              // For this demo, we'll just simulate saving with mock data
              const mockAdData = {
                title: selectedAd?.title || 'New Advertisement',
                company: selectedAd?.company || 'Company Name',
                description: selectedAd?.description || 'Advertisement description',
                image: selectedAd?.image || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3',
                startDate: selectedAd?.startDate || '2023-12-01',
                endDate: selectedAd?.endDate || '2024-01-01',
                placement: selectedAd?.placement || 'homepage',
                status: selectedAd?.status || 'draft'
              };
              handleSaveAd(mockAdData);
            }}>
                  {selectedAd ? 'Update Advertisement' : 'Create Advertisement'}
                </Button>
              </div>
            </div>
          </div>
        </div>}
      {/* Review Details Modal */}
      {showReviewDetails && selectedReview && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl w-full max-w-lg border border-slate-700 overflow-hidden">
            <div className="bg-slate-700 p-4 flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center">
                <MessageSquare size={18} className="text-amber-400 mr-2" />
                Review Details
              </h3>
              <button onClick={() => setShowReviewDetails(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src={selectedReview.profileImage} alt={selectedReview.profileName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium text-white">
                    Review for {selectedReview.profileName}
                  </h3>
                  <p className="text-sm text-gray-400">
                    by {selectedReview.reviewerName} (User #
                    {selectedReview.reviewerId})
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-medium text-gray-300 mr-2">
                      Rating:
                    </span>
                    <div className="flex">
                      {renderStars(selectedReview.rating)}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-1">
                    Review Content:
                  </h4>
                  <p className="text-gray-200 bg-slate-700/50 p-3 rounded-md border border-slate-600">
                    {selectedReview.content}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-1">
                      Date Submitted:
                    </h4>
                    <p className="text-gray-200">{selectedReview.date}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-1">
                      Status:
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${selectedReview.status === 'pending' ? 'bg-amber-500/20 text-amber-400' : selectedReview.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {selectedReview.status.charAt(0).toUpperCase() + selectedReview.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-1">
                      Helpful Votes:
                    </h4>
                    <p className="text-gray-200">
                      {selectedReview.helpfulVotes}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-1">
                      Unhelpful Votes:
                    </h4>
                    <p className="text-gray-200">
                      {selectedReview.unhelpfulVotes}
                    </p>
                  </div>
                </div>
              </div>
              {selectedReview.status === 'pending' && <div className="flex justify-end gap-3 mt-6">
                  <Button variant="danger" onClick={() => {
              handleRejectReview(selectedReview.id);
              setShowReviewDetails(false);
            }}>
                    <XCircle size={16} className="mr-2" />
                    Reject
                  </Button>
                  <Button variant="primary" onClick={() => {
              handleApproveReview(selectedReview.id);
              setShowReviewDetails(false);
            }}>
                    <CheckCircle size={16} className="mr-2" />
                    Approve
                  </Button>
                </div>}
            </div>
          </div>
        </div>}
    </>
  );
}