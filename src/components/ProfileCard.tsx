import { useState } from 'react';
import { Lock, CheckCircle, Phone, MessageCircle, Send, Globe, Crown, Diamond, Sparkles, Heart, MapPin } from 'lucide-react';
import { Button } from './Button';
import { PaymentModal } from './PaymentModal';
import { ContactAccessModal } from './ContactAccessModal';
import { StatusIndicator, StatusBadge } from './StatusIndicator';

interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  image: string;
  interests: string;
  about: string;
  price: number;
  isVip: boolean;
  isVerified: boolean;
  isFeatured?: boolean;
  isOnline?: boolean;
  phone?: string;
  telegram?: string;
  whatsapp?: string;
  otherContact?: string;
  subscriptionTier?: 'basic' | 'premium' | 'platinum';
}

interface ProfileCardProps {
  profile: Profile;
  onProfileClick?: () => void;
}

export function ProfileCard({ profile, onProfileClick }: ProfileCardProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactUnlocked, setContactUnlocked] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const handleUnlockContact = () => {
    setShowContactModal(true);
  };

  const handlePaymentComplete = () => {
    setContactUnlocked(true);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed: ', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const formatPrice = (price: number) => {
    return '₦' + price.toLocaleString();
  };

  const displayPrice = profile.price ? formatPrice(profile.price) : '₦20,000';
  const vipAccessFee = profile.isVip ? '₦5,000' : null;

  const renderMembershipBadge = () => {
    if (!profile.subscriptionTier) return null;
    
    let badgeClass = '';
    let icon = null;
    
    switch (profile.subscriptionTier) {
      case 'basic':
        badgeClass = 'bg-gray-400/20 text-gray-300 border-gray-400/30';
        break;
      case 'premium':
        badgeClass = 'bg-amber-400/20 text-amber-300 border-amber-400/30';
        icon = <Crown size={12} className="mr-1" />;
        break;
      case 'platinum':
        badgeClass = 'bg-purple-400/20 text-purple-300 border-purple-400/30';
        icon = <Diamond size={12} className="mr-1" />;
        break;
      default:
        return null;
    }

    return (
      <span className={`${badgeClass} text-xs px-2 py-1 rounded-full flex items-center border backdrop-blur-sm`}>
        {icon}
        {profile.subscriptionTier.charAt(0).toUpperCase() + profile.subscriptionTier.slice(1)}
      </span>
    );
  };

  return (
    <div className="group">
      <div className="glass-effect rounded-2xl overflow-hidden border border-slate-600/50 transition-all duration-500 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-400/20 card-hover">
        {/* Clickable Profile Preview Area */}
        <div onClick={onProfileClick} className="cursor-pointer">
          {/* Enhanced Image Container */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/20" />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {/* Online Status Indicator */}
              <StatusBadge userId={profile.id.toString()} variant="compact" />
              
              {profile.isVerified && (
                <span className="bg-blue-500/90 text-white text-xs px-2 py-1 rounded-full flex items-center backdrop-blur-sm">
                  <CheckCircle size={12} className="mr-1" />
                  Verified
                </span>
              )}
              {profile.isVip && (
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center backdrop-blur-sm">
                  <Sparkles size={12} className="mr-1" />
                  VIP
                </span>
              )}
              {renderMembershipBadge()}
            </div>

            {/* Heart/Like Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/50 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300"
            >
              <Heart
                size={20}
                className={`transition-all duration-300 ${
                  isLiked ? 'text-red-500 fill-red-500' : 'text-white hover:text-red-500'
                }`}
              />
            </button>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-white text-xl font-bold mb-1">
                    {profile.name}, {profile.age}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-gray-300 text-sm">
                      <MapPin size={14} className="mr-1" />
                      {profile.location}
                    </div>
                    {/* Online Status Indicator */}
                    <StatusIndicator userId={profile.id.toString()} size="sm" showText={true} />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-amber-400 font-bold text-lg">
                    {displayPrice}
                  </div>
                  {vipAccessFee && (
                    <div className="text-gray-400 text-xs">
                      VIP Access: {vipAccessFee}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-6">
            <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
              {profile.about}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6 space-y-3">
          {contactUnlocked ? (
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-emerald-400 text-sm font-medium mb-3 flex items-center justify-center">
                  <CheckCircle size={16} className="mr-2" />
                  Contact information unlocked!
                </p>
              </div>
              
              {/* Contact Options */}
              <div className="grid grid-cols-2 gap-2">
                {profile.phone && (
                  <button
                    onClick={() => copyToClipboard(profile.phone!, 'phone')}
                    className="flex items-center justify-center p-3 bg-slate-600/50 hover:bg-slate-600 rounded-xl transition-all duration-300 text-sm"
                  >
                    <Phone size={16} className="mr-2 text-green-400" />
                    {copiedField === 'phone' ? 'Copied!' : 'Phone'}
                  </button>
                )}
                
                {profile.telegram && (
                  <button
                    onClick={() => copyToClipboard(profile.telegram!, 'telegram')}
                    className="flex items-center justify-center p-3 bg-slate-600/50 hover:bg-slate-600 rounded-xl transition-all duration-300 text-sm"
                  >
                    <Send size={16} className="mr-2 text-blue-500" />
                    {copiedField === 'telegram' ? 'Copied!' : 'Telegram'}
                  </button>
                )}
                
                {profile.whatsapp && (
                  <button
                    onClick={() => copyToClipboard(profile.whatsapp!, 'whatsapp')}
                    className="flex items-center justify-center p-3 bg-slate-600/50 hover:bg-slate-600 rounded-xl transition-all duration-300 text-sm"
                  >
                    <MessageCircle size={16} className="mr-2 text-green-500" />
                    {copiedField === 'whatsapp' ? 'Copied!' : 'WhatsApp'}
                  </button>
                )}
              </div>
              
              {profile.otherContact && (
                <button
                  onClick={() => copyToClipboard(profile.otherContact!, 'other')}
                  className="w-full flex items-center justify-center p-3 bg-slate-600/50 hover:bg-slate-600 rounded-xl transition-all duration-300 text-sm"
                >
                  <Globe size={16} className="mr-2 text-purple-400" />
                  {copiedField === 'other' ? 'Copied!' : 'Other Contact'}
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <Button
                variant="primary"
                fullWidth
                onClick={handleUnlockContact}
                className="btn-luxury"
                icon={<Lock size={16} />}
              >
                Unlock Contact - ₦2,000
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  fullWidth
                  size="sm"
                  onClick={onProfileClick}
                >
                  View Details
                </Button>
                <Button
                  variant="secondary"
                  fullWidth
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? 'bg-red-500 hover:bg-red-600' : ''}
                >
                  {isLiked ? 'Liked' : 'Like'}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Contact Access Modal */}
        {showContactModal && (
          <ContactAccessModal
            isOpen={showContactModal}
            onClose={() => setShowContactModal(false)}
            escort={{
              id: profile.id.toString(),
              name: profile.name,
              age: profile.age,
              location: profile.location,
              rating: 4.8, // You can make this dynamic
              reviewCount: 127, // You can make this dynamic
              image: profile.image,
              price: 2000 // Contact access fee
            }}
          />
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            profileName={profile.name}
            amount="₦2,000"
            onPaymentComplete={handlePaymentComplete}
          />
        )}
      </div>
    </div>
  );
}