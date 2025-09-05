import { useState, useEffect } from 'react';
import { X, Crown, Diamond, Star, Calendar } from 'lucide-react';
import { Button } from './Button';

interface MembershipEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    id: number;
    name: string;
    membershipTier?: string;
    isVip?: boolean;
  } | null;
  onSave: (id: number, data: {
    membershipTier: string;
    isVip: boolean;
    shortTimePrice?: number;
    dayBreakPrice?: number;
    subscriptionDuration?: string;
    subscriptionEndDate?: string;
  }) => void;
}

export function MembershipEditModal({ isOpen, onClose, profile, onSave }: MembershipEditModalProps) {
  const [membershipTier, setMembershipTier] = useState('');
  const [isVip, setIsVip] = useState(false);
  const [subscriptionDuration, setSubscriptionDuration] = useState('monthly');
  const [subscriptionEndDate, setSubscriptionEndDate] = useState('');

  useEffect(() => {
    if (profile) {
      setMembershipTier(profile.membershipTier || '');
      setIsVip(profile.isVip || false);
      
      // Calculate end date based on duration
      const endDate = new Date();
      if (subscriptionDuration === 'monthly') {
        endDate.setMonth(endDate.getMonth() + 1);
      } else if (subscriptionDuration === 'quarterly') {
        endDate.setMonth(endDate.getMonth() + 3);
      } else if (subscriptionDuration === 'yearly') {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }
      setSubscriptionEndDate(endDate.toISOString().split('T')[0]);
    }
  }, [profile, subscriptionDuration]);

  if (!isOpen || !profile) return null;

  const handleSave = () => {
    onSave(profile.id, {
      membershipTier,
      isVip,
      subscriptionDuration,
      subscriptionEndDate
    });
    onClose();
  };

  const membershipTiers = [
    {
      id: '',
      name: 'No Membership',
      price: 'Free',
      icon: null,
      color: 'gray',
      features: ['Basic profile listing']
    },
    {
      id: 'silver',
      name: 'Silver',
      price: 'Free',
      icon: Star,
      color: 'gray',
      features: ['Free registration', 'Basic profile visibility', 'Contact access: ₦2,000 per unlock']
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 'Free',
      icon: Star,
      color: 'yellow',
      features: ['Free membership', 'Enhanced profile visibility', 'Contact access: ₦2,000 per unlock', 'Basic support']
    },
    {
      id: 'diamond',
      name: 'Diamond',
      price: '₦5,000',
      icon: Diamond,
      color: 'blue',
      features: ['Premium placement in search results', 'Featured profile badge', 'Priority customer support', 'Contact access: ₦2,000 per unlock', 'Analytics dashboard']
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: '₦10,000',
      icon: Crown,
      color: 'purple',
      features: ['Top placement in all searches', 'VIP badge and exclusive features', 'Dedicated account manager', 'Premium verification badge', 'Contact access: ₦2,000 per unlock', 'Advanced analytics', 'Custom profile themes']
    }
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = 'border-2 transition-all duration-200';
    
    if (isSelected) {
      switch (color) {
        case 'yellow':
          return `${baseClasses} border-yellow-400 bg-yellow-400/10 ring-2 ring-yellow-400/30`;
        case 'blue':
          return `${baseClasses} border-blue-400 bg-blue-400/10 ring-2 ring-blue-400/30`;
        case 'purple':
          return `${baseClasses} border-purple-400 bg-purple-400/10 ring-2 ring-purple-400/30`;
        default:
          return `${baseClasses} border-gray-400 bg-gray-400/10 ring-2 ring-gray-400/30`;
      }
    }
    
    return `${baseClasses} border-slate-600 hover:border-slate-500`;
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'yellow':
        return 'text-yellow-400';
      case 'blue':
        return 'text-blue-400';
      case 'purple':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Edit Membership</h2>
            <p className="text-gray-400 mt-1">Update membership tier for {profile.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Current Status */}
          <div className="mb-8 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <h3 className="text-lg font-semibold text-white mb-2">Current Status</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-300">
                Tier: <span className="font-medium text-amber-400">
                  {profile.membershipTier ? profile.membershipTier.charAt(0).toUpperCase() + profile.membershipTier.slice(1) : 'None'}
                </span>
              </span>
              <span className="text-gray-300">
                VIP Status: <span className={`font-medium ${profile.isVip ? 'text-purple-400' : 'text-gray-400'}`}>
                  {profile.isVip ? 'Active' : 'Inactive'}
                </span>
              </span>
            </div>
          </div>

          {/* Membership Tiers */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Select Membership Tier</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {membershipTiers.map((tier) => {
                const isSelected = membershipTier === tier.id;
                const IconComponent = tier.icon;
                
                return (
                  <div
                    key={tier.id}
                    onClick={() => setMembershipTier(tier.id)}
                    className={`p-4 rounded-lg cursor-pointer ${getColorClasses(tier.color, isSelected)}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {IconComponent && (
                          <IconComponent size={20} className={getIconColor(tier.color)} />
                        )}
                        <h4 className="font-semibold text-white">{tier.name}</h4>
                      </div>
                      <span className={`text-sm font-medium ${getIconColor(tier.color)}`}>
                        {tier.price}
                      </span>
                    </div>
                    
                    <ul className="space-y-1">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="text-xs text-gray-300 flex items-start gap-1">
                          <span className="text-green-400 mt-0.5">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* VIP Status */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">VIP Status</h3>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVip}
                  onChange={(e) => setIsVip(e.target.checked)}
                  className="w-5 h-5 text-purple-500 bg-slate-700 border-slate-600 rounded focus:ring-purple-400 focus:ring-2"
                />
                <div>
                  <span className="text-white font-medium">Enable VIP Status</span>
                  <p className="text-sm text-gray-400">Grants premium features and priority support</p>
                </div>
              </label>
            </div>
          </div>

          {/* Subscription Duration (only for paid tiers) */}
          {membershipTier && membershipTier !== 'silver' && membershipTier !== 'gold' && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar size={20} />
                Subscription Duration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center gap-3 p-3 border border-slate-600 rounded-lg cursor-pointer hover:border-slate-500 transition-colors">
                  <input
                    type="radio"
                    name="duration"
                    value="monthly"
                    checked={subscriptionDuration === 'monthly'}
                    onChange={(e) => setSubscriptionDuration(e.target.value)}
                    className="text-amber-400 focus:ring-amber-400"
                  />
                  <div>
                    <span className="text-white font-medium">Monthly</span>
                    <p className="text-sm text-gray-400">Renews every month</p>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-3 border border-slate-600 rounded-lg cursor-pointer hover:border-slate-500 transition-colors">
                  <input
                    type="radio"
                    name="duration"
                    value="quarterly"
                    checked={subscriptionDuration === 'quarterly'}
                    onChange={(e) => setSubscriptionDuration(e.target.value)}
                    className="text-amber-400 focus:ring-amber-400"
                  />
                  <div>
                    <span className="text-white font-medium">Quarterly</span>
                    <p className="text-sm text-gray-400">Renews every 3 months</p>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-3 border border-slate-600 rounded-lg cursor-pointer hover:border-slate-500 transition-colors">
                  <input
                    type="radio"
                    name="duration"
                    value="yearly"
                    checked={subscriptionDuration === 'yearly'}
                    onChange={(e) => setSubscriptionDuration(e.target.value)}
                    className="text-amber-400 focus:ring-amber-400"
                  />
                  <div>
                    <span className="text-white font-medium">Yearly</span>
                    <p className="text-sm text-gray-400">Renews every year</p>
                  </div>
                </label>
              </div>
              
              <div className="mt-4 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                <p className="text-sm text-gray-300">
                  <strong>Subscription will end on:</strong> {new Date(subscriptionEndDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700 bg-slate-800/50">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
