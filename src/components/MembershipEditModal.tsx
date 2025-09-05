import React, { useEffect, useState } from 'react';
import { X, Diamond, Crown, CheckCircle, Clock, Calendar } from 'lucide-react';
import { Button } from './Button';
interface Profile {
  id: number;
  name: string;
  membershipTier?: 'silver' | 'gold' | 'diamond' | '';
  isVip?: boolean;
  shortTimePrice?: number;
  dayBreakPrice?: number;
  subscriptionDuration?: 'monthly' | 'sixMonths' | 'yearly';
  subscriptionEndDate?: string;
}
interface MembershipEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
  onSave: (id: number, data: {
    membershipTier: string;
    isVip: boolean;
    shortTimePrice?: number;
    dayBreakPrice?: number;
    subscriptionDuration?: string;
    subscriptionEndDate?: string;
  }) => void;
}
export function MembershipEditModal({
  isOpen,
  onClose,
  profile,
  onSave
}: MembershipEditModalProps) {
  const [membershipTier, setMembershipTier] = useState<string>('');
  const [isVip, setIsVip] = useState(false);
  const [shortTimePrice, setShortTimePrice] = useState('');
  const [dayBreakPrice, setDayBreakPrice] = useState('');
  const [subscriptionDuration, setSubscriptionDuration] = useState('monthly');
  const [subscriptionEndDate, setSubscriptionEndDate] = useState('');
  useEffect(() => {
    if (profile) {
      setMembershipTier(profile.membershipTier || '');
      setIsVip(profile.isVip || false);
      setShortTimePrice(profile.shortTimePrice ? String(profile.shortTimePrice) : '');
      setDayBreakPrice(profile.dayBreakPrice ? String(profile.dayBreakPrice) : '');
      setSubscriptionDuration(profile.subscriptionDuration || 'monthly');
      // If no end date is set, default to 30 days from now
      if (profile.subscriptionEndDate) {
        setSubscriptionEndDate(profile.subscriptionEndDate);
      } else {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setSubscriptionEndDate(date.toISOString().split('T')[0]);
      }
    }
  }, [profile]);
  if (!isOpen || !profile) return null;
  const handleSave = () => {
    onSave(profile.id, {
      membershipTier,
      isVip,
      shortTimePrice: shortTimePrice ? Number(shortTimePrice) : undefined,
      dayBreakPrice: dayBreakPrice ? Number(dayBreakPrice) : undefined,
      subscriptionDuration,
      subscriptionEndDate
    });
    onClose();
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
    const shortTimeRange = getPriceRange(membershipTier, 'shortTime');
    const dayBreakRange = getPriceRange(membershipTier, 'dayBreak');
    // Adjust prices if they're outside the allowed range
    let shortTimePriceNum = Number(shortTimePrice);
    let dayBreakPriceNum = Number(dayBreakPrice);
    if (shortTimeRange.min && shortTimePriceNum < shortTimeRange.min) {
      shortTimePriceNum = shortTimeRange.min;
    } else if (shortTimeRange.max && shortTimePriceNum > shortTimeRange.max) {
      shortTimePriceNum = shortTimeRange.max;
    }
    if (dayBreakRange.min && dayBreakPriceNum < dayBreakRange.min) {
      dayBreakPriceNum = dayBreakRange.min;
    } else if (dayBreakRange.max && dayBreakPriceNum > dayBreakRange.max) {
      dayBreakPriceNum = dayBreakRange.max;
    }
    setShortTimePrice(shortTimePriceNum.toString());
    setDayBreakPrice(dayBreakPriceNum.toString());
  }, [membershipTier]);
  const membershipPricing = {
    silver: {
      monthly: 'Free',
      sixMonths: 'Free',
      yearly: 'Free'
    },
    gold: {
      monthly: '₦5,000',
      sixMonths: '₦30,000',
      yearly: '₦100,000'
    },
    diamond: {
      monthly: '₦10,000',
      sixMonths: '₦60,000',
      yearly: '₦120,000'
    }
  };
  const membershipBenefits = {
    silver: ['Free registration', 'Short time: ₦10,000 - ₦30,000', 'Day break: ₦20,000 - ₦50,000', 'Basic profile visibility'],
    gold: ['Premium placement in search results', 'Short time: ₦30,000 - ₦50,000', 'Day break: ₦100,000 - ₦200,000', 'Featured profile badge', 'Priority customer support'],
    diamond: ['Top placement in all searches', 'Short time: ₦100,000+', 'Day break: ₦200,000+', 'VIP badge and exclusive features', 'Dedicated account manager', 'Premium verification badge']
  };
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full border border-slate-700 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <h2 className="text-xl font-bold text-white">Edit Membership</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-300 mb-6">
            Update membership status for{' '}
            <span className="font-semibold text-amber-400">{profile.name}</span>
          </p>
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white mb-3">
              Membership Tier
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className={`border ${membershipTier === 'silver' ? 'border-amber-400 bg-slate-700' : 'border-slate-700 bg-slate-800'} rounded-lg p-4 cursor-pointer hover:border-amber-400 transition`} onClick={() => setMembershipTier('silver')}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-white">Silver</h3>
                  <span className="text-amber-400 font-semibold">Free</span>
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  {membershipBenefits.silver.map((benefit, i) => <li key={i} className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      {benefit}
                    </li>)}
                </ul>
              </div>
              <div className={`border ${membershipTier === 'gold' ? 'border-amber-400 bg-slate-700' : 'border-slate-700 bg-slate-800'} rounded-lg p-4 cursor-pointer hover:border-amber-400 transition`} onClick={() => setMembershipTier('gold')}>
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
              <div className={`border ${membershipTier === 'diamond' ? 'border-amber-400 bg-slate-700' : 'border-slate-700 bg-slate-800'} rounded-lg p-4 cursor-pointer hover:border-amber-400 transition`} onClick={() => setMembershipTier('diamond')}>
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
              <div className={`border ${membershipTier === '' ? 'border-amber-400 bg-slate-700' : 'border-slate-700 bg-slate-800'} rounded-lg p-4 cursor-pointer hover:border-amber-400 transition`} onClick={() => setMembershipTier('')}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-white">No Membership</h3>
                  <span className="text-gray-400 font-semibold">₦0</span>
                </div>
                <p className="text-sm text-gray-300">
                  Standard profile without premium benefits
                </p>
              </div>
            </div>
          </div>
          {membershipTier !== 'silver' && membershipTier !== '' && <div className="mb-6">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Subscription Duration
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div className={`border ${subscriptionDuration === 'monthly' ? 'border-amber-400 bg-slate-700' : 'border-slate-700 bg-slate-800'} rounded-lg p-3 text-center cursor-pointer hover:border-amber-400 transition`} onClick={() => setSubscriptionDuration('monthly')}>
                  <span className="block text-xs text-gray-400">1 Month</span>
                  <span className="block text-white font-medium mt-1">
                    {membershipTier === 'gold' ? '₦5,000' : '₦10,000'}
                  </span>
                </div>
                <div className={`border ${subscriptionDuration === 'sixMonths' ? 'border-amber-400 bg-slate-700' : 'border-slate-700 bg-slate-800'} rounded-lg p-3 text-center cursor-pointer hover:border-amber-400 transition`} onClick={() => setSubscriptionDuration('sixMonths')}>
                  <span className="block text-xs text-gray-400">6 Months</span>
                  <span className="block text-white font-medium mt-1">
                    {membershipTier === 'gold' ? '₦30,000' : '₦60,000'}
                  </span>
                </div>
                <div className={`border ${subscriptionDuration === 'yearly' ? 'border-amber-400 bg-slate-700' : 'border-slate-700 bg-slate-800'} rounded-lg p-3 text-center cursor-pointer hover:border-amber-400 transition`} onClick={() => setSubscriptionDuration('yearly')}>
                  <span className="block text-xs text-gray-400">1 Year</span>
                  <span className="block text-white font-medium mt-1">
                    {membershipTier === 'gold' ? '₦100,000' : '₦120,000'}
                  </span>
                  <span className="block text-xs text-green-400 mt-1">
                    Best Value
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Subscription End Date
                </label>
                <input type="date" value={subscriptionEndDate} onChange={e => setSubscriptionEndDate(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
            </div>}
          <div className="mb-6 border-t border-slate-700 pt-6">
            <h3 className="text-sm font-medium text-white mb-3">
              Service Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-200 mb-1">
                  <Clock size={16} className="mr-2 text-amber-400" />
                  Short Time Price (₦)
                </label>
                <input type="number" value={shortTimePrice} onChange={e => setShortTimePrice(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <p className="mt-1 text-xs text-gray-400">
                  {membershipTier === 'silver' && 'Range: ₦10,000 - ₦30,000'}
                  {membershipTier === 'gold' && 'Range: ₦30,000 - ₦50,000'}
                  {membershipTier === 'diamond' && 'Minimum: ₦100,000'}
                </p>
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-200 mb-1">
                  <Calendar size={16} className="mr-2 text-amber-400" />
                  Day Break Price (₦)
                </label>
                <input type="number" value={dayBreakPrice} onChange={e => setDayBreakPrice(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <p className="mt-1 text-xs text-gray-400">
                  {membershipTier === 'silver' && 'Range: ₦20,000 - ₦50,000'}
                  {membershipTier === 'gold' && 'Range: ₦100,000 - ₦200,000'}
                  {membershipTier === 'diamond' && 'Minimum: ₦200,000'}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-1">
                <input id="isVip" type="checkbox" checked={isVip} onChange={e => setIsVip(e.target.checked)} className="w-4 h-4 text-amber-500 border-slate-600 rounded focus:ring-amber-400" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isVip" className="font-medium text-gray-200 flex items-center">
                  VIP Profile
                  <Crown size={16} className="ml-2 text-amber-400" />
                </label>
                <p className="text-gray-400">
                  Premium pricing above ₦50,000. Users pay ₦5,000 to view
                  contact details.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700 p-4 flex justify-end sticky bottom-0 bg-slate-800">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <CheckCircle size={16} className="mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>;
}