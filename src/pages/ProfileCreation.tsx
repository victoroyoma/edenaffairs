import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FormInput } from '../components/FormInput';
import { FormTextarea } from '../components/FormTextarea';
import { MediaUploader } from '../components/MediaUploader';
import { Button } from '../components/Button';
import { Crown, Info, Clock, Calendar, Circle } from 'lucide-react';
import { onlineStatusService, OnlineStatus } from '../services/onlineStatus';
export function ProfileCreation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    interests: '',
    about: '',
    fantasies: '',
    telegram: '',
    whatsapp: '',
    phone: '',
    email: '',
    otherContact: '',
    availability: '',
    preferences: '',
    shortTimePrice: '20000',
    dayBreakPrice: '30000',
    isVip: false,
    membershipTier: 'silver',
    subscriptionDuration: 'monthly',
    onlineStatus: 'online' as OnlineStatus,
    availabilitySchedule: '',
    preferredContactMethod: 'telegram'
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showVipTooltip, setShowVipTooltip] = useState(false);
  const [showMembershipTooltip, setShowMembershipTooltip] = useState(false);
  const [showServiceTooltip, setShowServiceTooltip] = useState(false);
  const [showAvailabilityTooltip, setShowAvailabilityTooltip] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value,
      type
    } = e.target;
    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      // Handle regular inputs
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
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 19) {
      newErrors.age = 'Age must be a number 19 or older';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.about.trim()) {
      newErrors.about = 'About section is required';
    }
    if (photos.length === 0) {
      newErrors.photos = 'At least one photo is required';
    }
    // At least one contact method is required
    if (!formData.telegram.trim() && !formData.whatsapp.trim() && !formData.phone.trim() && !formData.email.trim() && !formData.otherContact.trim()) {
      newErrors.contact = 'At least one contact method is required';
    }
    // Validate short time price based on membership tier
    const shortTimePrice = Number(formData.shortTimePrice);
    if (isNaN(shortTimePrice)) {
      newErrors.shortTimePrice = 'Price must be a number';
    } else {
      if (formData.membershipTier === 'silver' && (shortTimePrice < 10000 || shortTimePrice > 30000)) {
        newErrors.shortTimePrice = 'Silver members: Short time price must be between ₦10,000 - ₦30,000';
      } else if (formData.membershipTier === 'gold' && (shortTimePrice < 30000 || shortTimePrice > 50000)) {
        newErrors.shortTimePrice = 'Gold members: Short time price must be between ₦30,000 - ₦50,000';
      } else if (formData.membershipTier === 'diamond' && shortTimePrice < 100000) {
        newErrors.shortTimePrice = 'Diamond members: Short time price must be at least ₦100,000';
      }
    }
    // Validate day break price based on membership tier
    const dayBreakPrice = Number(formData.dayBreakPrice);
    if (isNaN(dayBreakPrice)) {
      newErrors.dayBreakPrice = 'Price must be a number';
    } else {
      if (formData.membershipTier === 'silver' && (dayBreakPrice < 20000 || dayBreakPrice > 50000)) {
        newErrors.dayBreakPrice = 'Silver members: Day break price must be between ₦20,000 - ₦50,000';
      } else if (formData.membershipTier === 'gold' && (dayBreakPrice < 100000 || dayBreakPrice > 200000)) {
        newErrors.dayBreakPrice = 'Gold members: Day break price must be between ₦100,000 - ₦200,000';
      } else if (formData.membershipTier === 'diamond' && dayBreakPrice < 200000) {
        newErrors.dayBreakPrice = 'Diamond members: Day break price must be at least ₦200,000';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Generate a temporary user ID for demo purposes
      const tempUserId = `user-${Date.now()}`;
      
      // In a real app, you would send this data to your backend
      console.log('Profile data:', {
        ...formData,
        photos,
        videos,
        userId: tempUserId
      });

      // Register user's initial online status in the service
      onlineStatusService.registerUser(tempUserId, formData.onlineStatus);

      // Show success message and redirect
      alert('Profile submitted for verification! An administrator will review your profile shortly.');
      navigate('/');
    }
  };
  const locations = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Kaduna', 'Enugu', 'Benin City', 'Calabar', 'Warri'];
  
  const membershipBenefits = {
    silver: ['Free registration', 'Basic profile visibility', 'Contact access: ₦2,000 per unlock'],
    gold: ['Free membership', 'Enhanced profile visibility', 'Contact access: ₦2,000 per unlock', 'Basic support'],
    diamond: ['Premium placement in search results', 'Featured profile badge', 'Priority customer support', 'Contact access: ₦2,000 per unlock', 'Analytics dashboard'],
    platinum: ['Top placement in all searches', 'VIP badge and exclusive features', 'Dedicated account manager', 'Premium verification badge', 'Contact access: ₦2,000 per unlock', 'Advanced analytics', 'Custom profile themes']
  };
  // Get price range based on membership tier
  const getPriceRange = (tier: string, serviceType: 'shortTime' | 'dayBreak') => {
    if (serviceType === 'shortTime') {
      switch (tier) {
        case 'silver':
          return {
            min: 10000,
            max: 30000
          };
        case 'gold':
          return {
            min: 30000,
            max: 50000
          };
        case 'diamond':
          return {
            min: 100000,
            max: null
          };
        default:
          return {
            min: 10000,
            max: 30000
          };
      }
    } else {
      switch (tier) {
        case 'silver':
          return {
            min: 20000,
            max: 50000
          };
        case 'gold':
          return {
            min: 100000,
            max: 200000
          };
        case 'diamond':
          return {
            min: 200000,
            max: null
          };
        default:
          return {
            min: 20000,
            max: 50000
          };
      }
    }
  };
  // Update price limits when membership tier changes
  useEffect(() => {
    const shortTimeRange = getPriceRange(formData.membershipTier, 'shortTime');
    const dayBreakRange = getPriceRange(formData.membershipTier, 'dayBreak');
    // Adjust prices if they're outside the allowed range
    let shortTimePrice = Number(formData.shortTimePrice);
    let dayBreakPrice = Number(formData.dayBreakPrice);
    if (shortTimeRange.min && shortTimePrice < shortTimeRange.min) {
      shortTimePrice = shortTimeRange.min;
    } else if (shortTimeRange.max && shortTimePrice > shortTimeRange.max) {
      shortTimePrice = shortTimeRange.max;
    }
    if (dayBreakRange.min && dayBreakPrice < dayBreakRange.min) {
      dayBreakPrice = dayBreakRange.min;
    } else if (dayBreakRange.max && dayBreakPrice > dayBreakRange.max) {
      dayBreakPrice = dayBreakRange.max;
    }
    setFormData(prev => ({
      ...prev,
      shortTimePrice: shortTimePrice.toString(),
      dayBreakPrice: dayBreakPrice.toString()
    }));
  }, [formData.membershipTier]);

  const getStatusColor = (status: OnlineStatus) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'away': return 'text-yellow-400';
      case 'offline': return 'text-gray-400';
    }
  };

  const getStatusText = (status: OnlineStatus) => {
    switch (status) {
      case 'online': return 'Available Online';
      case 'away': return 'Away / Busy';
      case 'offline': return 'Currently Offline';
    }
  };
  return <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h1 className="text-2xl font-bold mb-2 text-white">
              Create Your Profile
            </h1>
            <p className="text-gray-300 mb-6">
              Complete your profile to start connecting with others.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput label="Name or Nickname" id="name" name="name" type="text" placeholder="How you want to be known" value={formData.name} onChange={handleChange} error={errors.name} />
                  <FormInput label="Age" id="age" name="age" type="number" min="19" placeholder="Must be 19+" value={formData.age} onChange={handleChange} error={errors.age} />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-200 mb-1">
                    Location
                  </label>
                  <select id="location" name="location" value={formData.location} onChange={handleChange} className={`w-full bg-slate-800 border ${errors.location ? 'border-rose-500' : 'border-slate-700'} rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400`}>
                    <option value="">Select your location</option>
                    {locations.map(location => <option key={location} value={location}>
                        {location}
                      </option>)}
                  </select>
                  {errors.location && <p className="mt-1 text-sm text-rose-500">
                      {errors.location}
                    </p>}
                </div>
                <FormTextarea label="About Me" id="about" name="about" placeholder="Tell others about yourself, your personality, and what makes you special..." rows={4} value={formData.about} onChange={handleChange} error={errors.about} />
                <FormTextarea label="Fantasies & Desires" id="fantasies" name="fantasies" placeholder="Share your fantasies, desires, and what excites you..." rows={3} value={formData.fantasies} onChange={handleChange} error={errors.fantasies} />
                <FormInput label="Interests/Hobbies" id="interests" name="interests" type="text" placeholder="e.g. Travel, Fine dining, Art, Music" value={formData.interests} onChange={handleChange} error={errors.interests} />
                <FormInput label="Availability" id="availability" name="availability" type="text" placeholder="e.g. Weekends, Evenings, Anytime" value={formData.availability} onChange={handleChange} error={errors.availability} />
                <FormInput label="Preferences" id="preferences" name="preferences" type="text" placeholder="e.g. Age range, interests, personality traits you prefer" value={formData.preferences} onChange={handleChange} error={errors.preferences} />
                <div className="border-t border-slate-700 pt-6">
                  <h2 className="text-lg font-semibold mb-4 text-white flex items-center">
                    Membership & Pricing
                    <button type="button" className="ml-2 text-gray-400 hover:text-amber-400" onClick={() => setShowMembershipTooltip(!showMembershipTooltip)}>
                      <Info size={16} />
                    </button>
                  </h2>
                  {showMembershipTooltip && <div className="bg-slate-700 p-3 rounded-md mb-4 text-sm text-gray-300">
                      <p>
                        Choose your membership tier to determine your pricing
                        range and visibility on the platform. Higher tiers allow
                        you to charge higher rates and gain more visibility.
                      </p>
                    </div>}
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className={`border ${formData.membershipTier === 'silver' ? 'border-amber-400 bg-slate-700' : 'border-slate-700 bg-slate-800'} rounded-lg p-4 cursor-pointer hover:border-amber-400 transition`} onClick={() => setFormData({
                    ...formData,
                    membershipTier: 'silver'
                  })}>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-white">Silver</h3>
                        <span className="text-amber-400 font-semibold">
                          Free
                        </span>
                      </div>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {membershipBenefits.silver.map((benefit, i) => <li key={i} className="flex items-start">
                            <span className="text-amber-400 mr-2">•</span>
                            {benefit}
                          </li>)}
                      </ul>
                    </div>
                    <div className={`border ${formData.membershipTier === 'gold' ? 'border-amber-400 bg-slate-700' : 'border-slate-700 bg-slate-800'} rounded-lg p-4 cursor-pointer hover:border-amber-400 transition`} onClick={() => setFormData({
                    ...formData,
                    membershipTier: 'gold'
                  })}>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-white">Gold</h3>
                        <div className="text-right">
                          <span className="text-amber-400 font-semibold block">
                            ₦5,000 / month
                          </span>
                          <span className="text-gray-400 text-xs">
                            ₦30,000 / 6 months • ₦100,000 / year
                          </span>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {membershipBenefits.gold.map((benefit, i) => <li key={i} className="flex items-start">
                            <span className="text-amber-400 mr-2">•</span>
                            {benefit}
                          </li>)}
                      </ul>
                    </div>
                    <div className={`border ${formData.membershipTier === 'diamond' ? 'border-amber-400 bg-slate-700' : 'border-slate-700 bg-slate-800'} rounded-lg p-4 cursor-pointer hover:border-amber-400 transition`} onClick={() => setFormData({
                    ...formData,
                    membershipTier: 'diamond'
                  })}>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-white">Diamond</h3>
                        <div className="text-right">
                          <span className="text-amber-400 font-semibold block">
                            ₦10,000 / month
                          </span>
                          <span className="text-gray-400 text-xs">
                            ₦60,000 / 6 months • ₦120,000 / year
                          </span>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {membershipBenefits.diamond.map((benefit, i) => <li key={i} className="flex items-start">
                            <span className="text-amber-400 mr-2">•</span>
                            {benefit}
                          </li>)}
                      </ul>
                    </div>
                  </div>
                  {formData.membershipTier !== 'silver' && <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Subscription Duration
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <div className={`border ${formData.subscriptionDuration === 'monthly' ? 'border-amber-400 bg-slate-700' : 'border-slate-700 bg-slate-800'} rounded-lg p-3 text-center cursor-pointer hover:border-amber-400 transition`} onClick={() => setFormData({
                      ...formData,
                      subscriptionDuration: 'monthly'
                    })}>
                          <span className="block text-xs text-gray-400">
                            1 Month
                          </span>
                          <span className="block text-white font-medium mt-1">
                            {formData.membershipTier === 'gold' ? '₦5,000' : '₦10,000'}
                          </span>
                        </div>
                        <div className={`border ${formData.subscriptionDuration === 'sixMonths' ? 'border-amber-400 bg-slate-700' : 'border-slate-700 bg-slate-800'} rounded-lg p-3 text-center cursor-pointer hover:border-amber-400 transition`} onClick={() => setFormData({
                      ...formData,
                      subscriptionDuration: 'sixMonths'
                    })}>
                          <span className="block text-xs text-gray-400">
                            6 Months
                          </span>
                          <span className="block text-white font-medium mt-1">
                            {formData.membershipTier === 'gold' ? '₦30,000' : '₦60,000'}
                          </span>
                        </div>
                        <div className={`border ${formData.subscriptionDuration === 'yearly' ? 'border-amber-400 bg-slate-700' : 'border-slate-700 bg-slate-800'} rounded-lg p-3 text-center cursor-pointer hover:border-amber-400 transition`} onClick={() => setFormData({
                      ...formData,
                      subscriptionDuration: 'yearly'
                    })}>
                          <span className="block text-xs text-gray-400">
                            1 Year
                          </span>
                          <span className="block text-white font-medium mt-1">
                            {formData.membershipTier === 'gold' ? '₦100,000' : '₦120,000'}
                          </span>
                          <span className="block text-xs text-green-400 mt-1">
                            Best Value
                          </span>
                        </div>
                      </div>
                    </div>}
                  <div className="border-t border-slate-700 pt-6 mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-md font-semibold text-white flex items-center">
                        Service Pricing
                        <button type="button" className="ml-2 text-gray-400 hover:text-amber-400" onClick={() => setShowServiceTooltip(!showServiceTooltip)}>
                          <Info size={16} />
                        </button>
                      </h3>
                    </div>
                    {showServiceTooltip && <div className="bg-slate-700 p-3 rounded-md mb-4 text-sm text-gray-300">
                        <p>
                          Set your prices for different service durations. Your
                          membership tier determines the minimum and maximum
                          prices you can charge.
                        </p>
                      </div>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-200 mb-1">
                          <Clock size={16} className="mr-2 text-amber-400" />
                          Short Time Price (₦)
                        </label>
                        <input type="number" name="shortTimePrice" value={formData.shortTimePrice} onChange={handleChange} className={`w-full bg-slate-800 border ${errors.shortTimePrice ? 'border-rose-500' : 'border-slate-700'} rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400`} />
                        {errors.shortTimePrice ? <p className="mt-1 text-sm text-rose-500">
                            {errors.shortTimePrice}
                          </p> : <p className="mt-1 text-xs text-gray-400">
                            {formData.membershipTier === 'silver' && 'Range: ₦10,000 - ₦30,000'}
                            {formData.membershipTier === 'gold' && 'Range: ₦30,000 - ₦50,000'}
                            {formData.membershipTier === 'diamond' && 'Minimum: ₦100,000'}
                          </p>}
                      </div>
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-200 mb-1">
                          <Calendar size={16} className="mr-2 text-amber-400" />
                          Day Break Price (₦)
                        </label>
                        <input type="number" name="dayBreakPrice" value={formData.dayBreakPrice} onChange={handleChange} className={`w-full bg-slate-800 border ${errors.dayBreakPrice ? 'border-rose-500' : 'border-slate-700'} rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400`} />
                        {errors.dayBreakPrice ? <p className="mt-1 text-sm text-rose-500">
                            {errors.dayBreakPrice}
                          </p> : <p className="mt-1 text-xs text-gray-400">
                            {formData.membershipTier === 'silver' && 'Range: ₦20,000 - ₦50,000'}
                            {formData.membershipTier === 'gold' && 'Range: ₦100,000 - ₦200,000'}
                            {formData.membershipTier === 'diamond' && 'Minimum: ₦200,000'}
                          </p>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start mt-6">
                    <div className="flex items-center h-5 mt-1">
                      <input id="isVip" name="isVip" type="checkbox" checked={formData.isVip} onChange={e => {
                      setFormData({
                        ...formData,
                        isVip: e.target.checked
                      });
                    }} className="w-4 h-4 text-amber-500 border-slate-600 rounded focus:ring-amber-400" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="isVip" className="font-medium text-gray-200 flex items-center">
                        VIP Profile
                        <Crown size={16} className="ml-2 text-amber-400" />
                        <button type="button" className="ml-2 text-gray-400 hover:text-amber-400" onClick={() => setShowVipTooltip(!showVipTooltip)}>
                          <Info size={16} />
                        </button>
                      </label>
                      <p className="text-gray-400">
                        Premium visibility and exclusive features
                      </p>
                    </div>
                  </div>
                  {showVipTooltip && <div className="bg-slate-700 p-3 rounded-md mt-2 text-sm text-gray-300">
                      <p>
                        VIP profiles require users to pay ₦5,000 just to view
                        your contact details, in addition to your set price.
                      </p>
                    </div>}
                </div>

                {/* Online Status & Availability Section */}
                <div className="border-t border-slate-700 pt-6">
                  <h2 className="text-lg font-semibold mb-4 text-white flex items-center">
                    Online Status & Availability
                    <button 
                      type="button" 
                      className="ml-2 text-gray-400 hover:text-amber-400" 
                      onClick={() => setShowAvailabilityTooltip(!showAvailabilityTooltip)}
                    >
                      <Info size={16} />
                    </button>
                  </h2>
                  
                  {showAvailabilityTooltip && (
                    <div className="bg-slate-700 p-3 rounded-md mb-4 text-sm text-gray-300">
                      <p>
                        Set your online status and availability schedule. This helps clients know when you're available for bookings.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Online Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-3">
                        Default Online Status
                      </label>
                      <div className="space-y-3">
                        {(['online', 'away', 'offline'] as OnlineStatus[]).map((status) => (
                          <label key={status} className="flex items-center cursor-pointer group">
                            <input
                              type="radio"
                              name="onlineStatus"
                              value={status}
                              checked={formData.onlineStatus === status}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div className={`flex items-center gap-3 w-full p-3 rounded-lg border transition-all ${
                              formData.onlineStatus === status 
                                ? 'border-amber-400 bg-slate-700' 
                                : 'border-slate-700 bg-slate-800 group-hover:border-slate-600'
                            }`}>
                              <Circle 
                                size={12} 
                                className={`${getStatusColor(status)} fill-current`}
                              />
                              <span className="text-white font-medium">
                                {getStatusText(status)}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-3">
                        Preferred Contact Method
                      </label>
                      <select
                        name="preferredContactMethod"
                        value={formData.preferredContactMethod}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        <option value="telegram">Telegram</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="phone">Phone Call</option>
                        <option value="email">Email</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Availability Schedule */}
                  <div className="mt-6">
                    <FormTextarea
                      label="Availability Schedule"
                      id="availabilitySchedule"
                      name="availabilitySchedule"
                      placeholder="e.g. Monday-Friday: 6PM-12AM, Weekends: 2PM-2AM, or 24/7 Available"
                      rows={3}
                      value={formData.availabilitySchedule}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6">
                  <h2 className="text-lg font-semibold mb-4 text-white">
                    Contact Information
                  </h2>
                  <p className="text-sm text-gray-400 mb-4">
                    This information will only be visible to users who have paid
                    to unlock your profile.
                  </p>
                  {errors.contact && <p className="mb-4 text-sm text-rose-500">
                      {errors.contact}
                    </p>}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="Telegram" id="telegram" name="telegram" type="text" placeholder="@username" value={formData.telegram} onChange={handleChange} />
                    <FormInput label="WhatsApp" id="whatsapp" name="whatsapp" type="text" placeholder="+234..." value={formData.whatsapp} onChange={handleChange} />
                    <FormInput label="Phone Number" id="phone" name="phone" type="text" placeholder="+234..." value={formData.phone} onChange={handleChange} />
                    <FormInput label="Email" id="email" name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} />
                  </div>
                  <FormInput label="Other Contact Method" id="otherContact" name="otherContact" type="text" placeholder="e.g. Instagram, Snapchat, etc." value={formData.otherContact} onChange={handleChange} />
                </div>
                <div className="border-t border-slate-700 pt-6">
                  <h2 className="text-lg font-semibold mb-4 text-white">
                    Profile Media
                  </h2>
                  <MediaUploader maxPhotos={4} maxVideos={2} onPhotoChange={setPhotos} onVideoChange={setVideos} />
                  {errors.photos && <p className="mt-1 text-sm text-rose-500">
                      {errors.photos}
                    </p>}
                </div>
                <div className="border-t border-slate-700 pt-6">
                  <div className="flex justify-end">
                    <Button type="submit" size="lg">
                      Submit Profile for Verification
                    </Button>
                  </div>
                  <p className="mt-4 text-sm text-gray-400 text-center">
                    Your profile will be reviewed by our administrators before
                    being published.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}