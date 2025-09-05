import { useState } from 'react';
import { X, CheckCircle, Star, Crown, Diamond, Clock, Calendar, Lock, Phone, Mail, MessageCircle, Send, Globe } from 'lucide-react';
import { Button } from './Button';
import { PaymentModal } from './PaymentModal';

interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  image: string;
  bio: string;
  about: string;
  isVerified: boolean;
  isFeatured: boolean;
  isNew?: boolean;
  submittedAt: string;
  membershipTier?: 'silver' | 'gold' | 'diamond' | '';
  shortTimePrice?: number;
  dayBreakPrice?: number;
  price?: number;
  isVip?: boolean;
  interests?: string;
  fantasies?: string;
  availability?: string;
  preferences?: string;
  photos?: string[];
  subscriptionEndDate?: string;
  phone?: string;
  email?: string;
  telegram?: string;
  whatsapp?: string;
  otherContact?: string;
}

interface ProfilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
}

export function ProfilePreviewModal({
  isOpen,
  onClose,
  profile
}: ProfilePreviewModalProps) {
  const [contactUnlocked, setContactUnlocked] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [copiedField, setCopiedField] = useState<string>('');

  if (!isOpen || !profile) return null;

  const renderMembershipBadge = () => {
    if (!profile.membershipTier) return null;
    
    const badgeConfig = {
      diamond: { icon: <Diamond size={12} className="mr-1" />, color: 'bg-purple-500 text-white' },
      gold: { icon: <Crown size={12} className="mr-1" />, color: 'bg-amber-500 text-white' },
      silver: { icon: <Star size={12} className="mr-1" />, color: 'bg-gray-400 text-white' }
    };
    
    const config = badgeConfig[profile.membershipTier];
    if (!config) return null;
    
    return (
      <span className={`${config.color} text-xs px-2 py-1 rounded-full flex items-center`}>
        {config.icon}
        {profile.membershipTier.charAt(0).toUpperCase() + profile.membershipTier.slice(1)}
      </span>
    );
  };

  const handleUnlockContact = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = () => {
    setContactUnlocked(true);
    setShowPaymentModal(false);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Calculate pricing
  const vipAccessFee = profile.isVip && profile.price ? `₦${(profile.price * 0.1).toLocaleString()}` : null;
  const displayPrice = profile.isVip && profile.price 
    ? `₦${profile.price.toLocaleString()}`
    : profile.price 
    ? `₦${profile.price.toLocaleString()}`
    : 'Contact for pricing';

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-slate-800 rounded-xl max-w-4xl w-full border border-slate-700 shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
            <h2 className="text-2xl font-bold text-white">Profile Preview</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white transition p-2 hover:bg-slate-700 rounded-full"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Image and Basic Info */}
              <div className="space-y-6">
                <div className="aspect-[3/4] rounded-lg overflow-hidden">
                  <img 
                    src={profile.image} 
                    alt={profile.name} 
                    className="w-full h-full object-cover" 
                    loading="lazy" 
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {profile.isVerified && (
                    <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <CheckCircle size={12} className="mr-1" />
                      Verified
                    </span>
                  )}
                  {profile.isFeatured && (
                    <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <Star size={12} className="mr-1" />
                      Featured
                    </span>
                  )}
                  {profile.isNew && (
                    <span className="bg-rose-500 text-white text-xs px-2 py-1 rounded-full flex items-center animate-pulse">
                      ✨ New
                    </span>
                  )}
                  {profile.isVip && (
                    <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <Crown size={12} className="mr-1" />
                      VIP
                    </span>
                  )}
                  {renderMembershipBadge()}
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-3">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white">{profile.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Age:</span>
                      <span className="text-white">{profile.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white flex items-center">
                        <Globe size={14} className="mr-1 text-amber-400" />
                        {profile.location}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Member Since:</span>
                      <span className="text-white">{profile.submittedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-3">Pricing Information</h3>
                  <div className="space-y-2 text-sm">
                    {profile.shortTimePrice && (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1 text-amber-400" />
                          <span className="text-gray-400">Short Time:</span>
                        </div>
                        <span className="text-amber-400 font-medium">
                          ₦{profile.shortTimePrice.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {profile.dayBreakPrice && (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1 text-amber-400" />
                          <span className="text-gray-400">Day Break:</span>
                        </div>
                        <span className="text-amber-400 font-medium">
                          ₦{profile.dayBreakPrice.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Base Price:</span>
                      <span className="text-amber-400 font-medium">
                        {displayPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Details and Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">About Me</h3>
                  <p className="text-gray-300 leading-relaxed">{profile.about}</p>
                </div>

                {profile.interests && (
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Interests & Hobbies</h3>
                    <p className="text-gray-300">{profile.interests}</p>
                  </div>
                )}

                {profile.fantasies && (
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Fantasies & Desires</h3>
                    <p className="text-gray-300">{profile.fantasies}</p>
                  </div>
                )}

                {profile.availability && (
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Availability</h3>
                    <p className="text-gray-300">{profile.availability}</p>
                  </div>
                )}

                {profile.preferences && (
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Preferences</h3>
                    <p className="text-gray-300">{profile.preferences}</p>
                  </div>
                )}

                {/* Contact Information Section */}
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white flex items-center">
                      {contactUnlocked ? (
                        <>Contact Information</>
                      ) : (
                        <>
                          <Lock size={16} className="mr-2 text-amber-400" />
                          Contact Information
                        </>
                      )}
                    </h3>
                  </div>

                  {contactUnlocked ? (
                    <div className="space-y-3">
                      {profile.phone && (
                        <div className="flex items-center justify-between p-3 bg-slate-800 rounded-md border border-slate-600">
                          <div className="flex items-center">
                            <Phone size={16} className="text-amber-400 mr-3" />
                            <span className="text-white">{profile.phone}</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => copyToClipboard(profile.phone || '', 'phone')}
                            aria-label="Copy phone number"
                          >
                            {copiedField === 'phone' ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                      )}
                      
                      {profile.email && (
                        <div className="flex items-center justify-between p-3 bg-slate-800 rounded-md border border-slate-600">
                          <div className="flex items-center">
                            <Mail size={16} className="text-amber-400 mr-3" />
                            <span className="text-white">{profile.email}</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => copyToClipboard(profile.email || '', 'email')}
                            aria-label="Copy email address"
                          >
                            {copiedField === 'email' ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                      )}
                      
                      {profile.telegram && (
                        <div className="flex items-center justify-between p-3 bg-slate-800 rounded-md border border-slate-600">
                          <div className="flex items-center">
                            <Send size={16} className="text-amber-400 mr-3" />
                            <span className="text-white">{profile.telegram}</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => copyToClipboard(profile.telegram || '', 'telegram')}
                            aria-label="Copy Telegram handle"
                          >
                            {copiedField === 'telegram' ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                      )}
                      
                      {profile.whatsapp && (
                        <div className="flex items-center justify-between p-3 bg-slate-800 rounded-md border border-slate-600">
                          <div className="flex items-center">
                            <MessageCircle size={16} className="text-amber-400 mr-3" />
                            <span className="text-white">{profile.whatsapp}</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => copyToClipboard(profile.whatsapp || '', 'whatsapp')}
                            aria-label="Copy WhatsApp number"
                          >
                            {copiedField === 'whatsapp' ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                      )}
                      
                      {profile.otherContact && (
                        <div className="flex items-center justify-between p-3 bg-slate-800 rounded-md border border-slate-600">
                          <div className="flex items-center">
                            <Globe size={16} className="text-amber-400 mr-3" />
                            <span className="text-white">{profile.otherContact}</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => copyToClipboard(profile.otherContact || '', 'otherContact')}
                            aria-label="Copy other contact"
                          >
                            {copiedField === 'otherContact' ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Lock size={48} className="text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 mb-4">
                        Contact information is protected. Make a payment to unlock and get in touch.
                      </p>
                      <div className="bg-slate-800 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400">Access Fee:</span>
                          <span className="font-semibold text-amber-400">
                            {profile.isVip ? vipAccessFee : '₦2,000'}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant={profile.isVip ? 'secondary' : 'primary'} 
                        onClick={handleUnlockContact}
                        className={profile.isVip ? 'bg-purple-600 hover:bg-purple-500' : ''}
                      >
                        <Lock size={16} className="mr-2" />
                        {profile.isVip ? `VIP Access • ${vipAccessFee}` : 'Unlock Contact • ₦2,000'}
                      </Button>
                    </div>
                  )}
                </div>

                {profile.photos && profile.photos.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Additional Photos</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {profile.photos.map((photo, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden">
                          <img 
                            src={photo} 
                            alt={`${profile.name}'s photo ${index + 1}`} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                            loading="lazy" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 p-6 flex justify-end sticky bottom-0 bg-slate-800">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
      
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        profileName={profile.name}
        amount={profile.isVip ? vipAccessFee! : '₦2,000'}
        onPaymentComplete={handlePaymentComplete}
        isVip={profile.isVip}
        profilePrice={profile.price}
      />
    </>
  );
}
