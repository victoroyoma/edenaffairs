import { useState } from 'react';
import { Crown, Diamond, Check, Zap, Users, TrendingUp, Shield } from 'lucide-react';
import { Button } from './Button';

interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  badge: string;
  color: string;
  icon: React.ReactNode;
  popular?: boolean;
}

interface SubscriptionPlansProps {
  currentTier?: string;
  onUpgrade: (tierId: string) => void;
  className?: string;
}

export function SubscriptionPlans({ currentTier = 'basic', onUpgrade, className = '' }: SubscriptionPlansProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const subscriptionTiers: SubscriptionTier[] = [
    {
      id: 'gold',
      name: 'Gold',
      price: 0,
      duration: 'free',
      features: [
        'Basic profile listing',
        'Standard photo gallery (8 photos)',
        'Basic search visibility',
        'Email support',
        'Contact access: ₦2,000 per profile'
      ],
      badge: 'Free',
      color: 'from-yellow-500 to-yellow-600',
      icon: <Users size={24} />
    },
    {
      id: 'diamond',
      name: 'Diamond',
      price: billingCycle === 'monthly' ? 5000 : 50000,
      duration: billingCycle === 'monthly' ? 'per month' : 'per year',
      features: [
        'Featured profile placement',
        'Extended photo gallery (15 photos)',
        'Enhanced search ranking',
        'Advanced profile customization',
        'Analytics dashboard',
        'Priority customer support',
        'Verification badge',
        'Contact access: ₦2,000 per profile'
      ],
      badge: 'Most Popular',
      color: 'from-blue-500 to-cyan-500',
      icon: <Diamond size={24} />,
      popular: true
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: billingCycle === 'monthly' ? 10000 : 100000,
      duration: billingCycle === 'monthly' ? 'per month' : 'per year',
      features: [
        'Top-tier featured placement',
        'Unlimited photo gallery',
        'Maximum search visibility',
        'Custom profile themes',
        'Advanced analytics & insights',
        'VIP customer support',
        'Premium verification',
        'Social media integration',
        'Exclusive promotional opportunities',
        'Personal account manager',
        'Contact access: ₦2,000 per profile'
      ],
      badge: 'Elite',
      color: 'from-purple-500 to-pink-500',
      icon: <Crown size={24} />
    }
  ];

  const getDiscountPercentage = () => {
    return billingCycle === 'yearly' ? '17% OFF' : null;
  };

  const handleUpgrade = (tierId: string) => {
    onUpgrade(tierId);
  };

  const isCurrentTier = (tierId: string) => {
    return currentTier === tierId;
  };

  const canUpgradeTo = (tierId: string) => {
    const tierLevels = { gold: 0, diamond: 1, platinum: 2 };
    return tierLevels[tierId as keyof typeof tierLevels] > tierLevels[currentTier as keyof typeof tierLevels];
  };

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Choose Your <span className="text-gradient">Subscription Plan</span>
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Enhance your visibility and attract more clients with our premium subscription plans.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-800 rounded-lg p-1 flex">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-amber-500 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
              billingCycle === 'yearly'
                ? 'bg-amber-500 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Yearly
            {getDiscountPercentage() && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {getDiscountPercentage()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Subscription Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionTiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative bg-slate-800 rounded-xl border-2 transition-all duration-300 ${
              isCurrentTier(tier.id)
                ? 'border-amber-400 shadow-xl shadow-amber-400/20'
                : 'border-slate-700 hover:border-slate-600'
            } ${tier.popular ? 'scale-105' : ''}`}
          >
            {/* Popular Badge */}
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-bold px-4 py-1 rounded-full">
                  {tier.badge}
                </span>
              </div>
            )}

            {/* Current Tier Badge */}
            {isCurrentTier(tier.id) && (
              <div className="absolute -top-3 right-4">
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Check size={12} />
                  Current
                </span>
              </div>
            )}

            <div className="p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${tier.color} mb-4`}>
                  {tier.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="text-3xl font-bold text-white">
                  ₦{tier.price.toLocaleString()}
                  <span className="text-sm text-gray-400 font-normal">/{tier.duration}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="space-y-3">
                {isCurrentTier(tier.id) ? (
                  <Button
                    variant="outline"
                    fullWidth
                    disabled
                    className="border-green-500 text-green-500"
                  >
                    Current Plan
                  </Button>
                ) : canUpgradeTo(tier.id) ? (
                  <Button
                    variant={tier.popular ? 'primary' : 'outline'}
                    fullWidth
                    onClick={() => handleUpgrade(tier.id)}
                    className={tier.popular ? 'btn-luxury' : ''}
                  >
                    <TrendingUp size={16} className="mr-2" />
                    Upgrade to {tier.name}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    fullWidth
                    disabled
                    className="opacity-50"
                  >
                    Downgrade
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="mt-12 bg-slate-800/50 rounded-xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 text-center">
          Why Upgrade Your Subscription?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex p-3 rounded-full bg-blue-500/20 mb-4">
              <Zap className="text-blue-400" size={24} />
            </div>
            <h4 className="font-semibold text-white mb-2">Increased Visibility</h4>
            <p className="text-sm text-gray-400">
              Get featured placement and priority ranking in search results.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex p-3 rounded-full bg-green-500/20 mb-4">
              <Users className="text-green-400" size={24} />
            </div>
            <h4 className="font-semibold text-white mb-2">More Clients</h4>
            <p className="text-sm text-gray-400">
              Attract more potential clients with enhanced profile features.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex p-3 rounded-full bg-purple-500/20 mb-4">
              <Shield className="text-purple-400" size={24} />
            </div>
            <h4 className="font-semibold text-white mb-2">Premium Support</h4>
            <p className="text-sm text-gray-400">
              Get priority customer support and account management.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400">
          Need help choosing the right plan? 
          <button className="text-amber-400 hover:text-amber-300 ml-1 underline">
            Contact our support team
          </button>
        </p>
      </div>
    </div>
  );
}
