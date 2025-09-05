 
import { X, CheckCircle, Star, Crown, Diamond, Clock, Calendar } from 'lucide-react';
import { Button } from './Button';
interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  image: string;
  about: string;
  isVerified: boolean;
  isFeatured: boolean;
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
}
interface ProfileDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
}
export function ProfileDetailsModal({
  isOpen,
  onClose,
  profile
}: ProfileDetailsModalProps) {
  if (!isOpen || !profile) return null;
  const renderMembershipBadge = () => {
    if (!profile.membershipTier) return null;
    let badgeColor = '';
    let badgeIcon = null;
    switch (profile.membershipTier) {
      case 'silver':
        badgeColor = 'bg-gray-300 text-gray-800';
        break;
      case 'gold':
        badgeColor = 'bg-amber-500 text-amber-900';
        break;
      case 'diamond':
        badgeColor = 'bg-blue-300 text-blue-900';
        badgeIcon = <Diamond size={12} className="mr-1" />;
        break;
      default:
        return null;
    }
    return <span className={`${badgeColor} text-xs px-2 py-0.5 rounded-full flex items-center`}>
        {badgeIcon}
        {profile.membershipTier.charAt(0).toUpperCase() + profile.membershipTier.slice(1)}
      </span>;
  };
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-800 rounded-xl max-w-3xl w-full border border-slate-700 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <h2 className="text-xl font-bold text-white">Profile Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4">
                <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.isVerified && <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <CheckCircle size={12} className="mr-1" />
                    Verified
                  </span>}
                {profile.isFeatured && <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Star size={12} className="mr-1" />
                    Featured
                  </span>}
                {profile.isVip && <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Crown size={12} className="mr-1" />
                    VIP
                  </span>}
                {renderMembershipBadge()}
              </div>
              <div className="bg-slate-700 rounded-lg p-4 mb-4">
                <h3 className="text-white font-medium mb-2">Profile Info</h3>
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
                    <span className="text-white">{profile.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Submitted:</span>
                    <span className="text-white">{profile.submittedAt}</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-700 rounded-lg p-4 mb-4">
                <h3 className="text-white font-medium mb-2">
                  Membership & Pricing
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Membership:</span>
                    <span className="text-white capitalize">
                      {profile.membershipTier || 'None'}
                    </span>
                  </div>
                  {profile.subscriptionEndDate && <div className="flex justify-between">
                      <span className="text-gray-400">Expires:</span>
                      <span className="text-white">
                        {profile.subscriptionEndDate}
                      </span>
                    </div>}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1 text-amber-400" />
                      <span className="text-gray-400">Short Time:</span>
                    </div>
                    <span className="text-amber-400 font-medium">
                      {profile.shortTimePrice ? `₦${profile.shortTimePrice.toLocaleString()}` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-amber-400" />
                      <span className="text-gray-400">Day Break:</span>
                    </div>
                    <span className="text-amber-400 font-medium">
                      {profile.dayBreakPrice ? `₦${profile.dayBreakPrice.toLocaleString()}` : 'N/A'}
                    </span>
                  </div>
                  {profile.price && <div className="flex justify-between">
                      <span className="text-gray-400">Legacy Price:</span>
                      <span className="text-amber-400 font-medium">
                        ₦{profile.price.toLocaleString()}
                      </span>
                    </div>}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-2">About</h3>
                <p className="text-gray-300">{profile.about}</p>
              </div>
              {profile.fantasies && <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Fantasies & Desires
                  </h3>
                  <p className="text-gray-300">{profile.fantasies}</p>
                </div>}
              {profile.interests && <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Interests
                  </h3>
                  <p className="text-gray-300">{profile.interests}</p>
                </div>}
              {profile.availability && <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Availability
                  </h3>
                  <p className="text-gray-300">{profile.availability}</p>
                </div>}
              {profile.preferences && <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Preferences
                  </h3>
                  <p className="text-gray-300">{profile.preferences}</p>
                </div>}
              {profile.photos && profile.photos.length > 0 && <div>
                  <h3 className="text-lg font-medium text-white mb-3">
                    Photos
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {profile.photos.map((photo, index) => <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img src={photo} alt={`${profile.name}'s photo ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
                      </div>)}
                  </div>
                </div>}
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700 p-4 flex justify-end sticky bottom-0 bg-slate-800">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>;
}