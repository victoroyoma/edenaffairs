import { CheckCircle, X, Star, Eye, Trash, Crown, CreditCard, Diamond, Phone, Mail, MessageCircle, Send, Shield, UserCheck } from 'lucide-react';
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
  price?: number;
  isVip?: boolean;
  phone?: string;
  email?: string;
  telegram?: string;
  whatsapp?: string;
  otherContact?: string;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
  verificationMethod?: string;
  verificationNotes?: string;
}
interface AdminProfileCardProps {
  profile: Profile;
  onVerify: (id: number) => void;
  onReject: (id: number) => void;
  onToggleFeatured: (id: number) => void;
  onViewDetails: (id: number) => void;
  onEditMembership: (id: number) => void;
  onRequestPayment: (id: number) => void;
  onRequestVerification?: (id: number) => void;
}
export function AdminProfileCard({
  profile,
  onVerify,
  onReject,
  onToggleFeatured,
  onViewDetails,
  onEditMembership,
  onRequestPayment,
  onRequestVerification
}: AdminProfileCardProps) {
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
  return <div className="bg-slate-700 rounded-lg overflow-hidden border border-slate-600">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-48 h-48 md:h-auto">
          <img src={profile.image} alt={profile.name} className="w-full h-full object-cover object-center" loading="lazy" />
        </div>
        <div className="flex-1 p-4">
          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-semibold text-white">
                  {profile.name}, {profile.age}
                </h3>
                {profile.isVerified && <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                    <CheckCircle size={12} className="mr-1" />
                    Verified
                  </span>}
                {profile.isFeatured && <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                    <Star size={12} className="mr-1" />
                    Featured
                  </span>}
                {profile.isVip && <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                    <Crown size={12} className="mr-1" />
                    VIP
                  </span>}
                {renderMembershipBadge()}
              </div>
              <p className="text-gray-400 text-sm">{profile.location}</p>
            </div>
            <div className="text-sm text-gray-400">
              Submitted: {profile.submittedAt}
            </div>
          </div>
          <div className="mb-4">
            <p className="text-gray-300 text-sm">{profile.about}</p>
            {profile.price && <div className="mt-2 flex items-center">
                <span className="text-gray-400 text-sm mr-2">Price:</span>
                <span className="text-amber-400 font-medium">
                  ₦{profile.price.toLocaleString()}
                </span>
              </div>}
          </div>

          {/* Contact Details Section */}
          <div className="mb-4 bg-slate-800 rounded-lg p-3 border border-slate-600">
            <h4 className="text-sm font-medium text-white mb-2 flex items-center">
              <Phone size={14} className="mr-1 text-amber-400" />
              Contact Information
            </h4>
            <div className="space-y-1 text-xs">
              {profile.phone && (
                <div className="flex items-center text-gray-300">
                  <Phone size={12} className="mr-2 text-green-400" />
                  <span className="font-medium">Phone:</span>
                  <span className="ml-1">{profile.phone}</span>
                </div>
              )}
              {profile.email && (
                <div className="flex items-center text-gray-300">
                  <Mail size={12} className="mr-2 text-blue-400" />
                  <span className="font-medium">Email:</span>
                  <span className="ml-1">{profile.email}</span>
                </div>
              )}
              {profile.telegram && (
                <div className="flex items-center text-gray-300">
                  <Send size={12} className="mr-2 text-sky-400" />
                  <span className="font-medium">Telegram:</span>
                  <span className="ml-1">{profile.telegram}</span>
                </div>
              )}
              {profile.whatsapp && (
                <div className="flex items-center text-gray-300">
                  <MessageCircle size={12} className="mr-2 text-green-500" />
                  <span className="font-medium">WhatsApp:</span>
                  <span className="ml-1">{profile.whatsapp}</span>
                </div>
              )}
              {profile.otherContact && (
                <div className="flex items-center text-gray-300">
                  <MessageCircle size={12} className="mr-2 text-gray-400" />
                  <span className="font-medium">Other:</span>
                  <span className="ml-1">{profile.otherContact}</span>
                </div>
              )}
              {!profile.phone && !profile.email && !profile.telegram && !profile.whatsapp && !profile.otherContact && (
                <div className="text-gray-500 italic">No contact information provided</div>
              )}
            </div>
          </div>

          {/* Verification Status Section */}
          {profile.verificationStatus && (
            <div className="mb-4 bg-slate-800 rounded-lg p-3 border border-slate-600">
              <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                <Shield size={14} className="mr-1 text-amber-400" />
                Verification Status
              </h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    profile.verificationStatus === 'verified' 
                      ? 'bg-green-500/20 text-green-400' 
                      : profile.verificationStatus === 'rejected'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {profile.verificationStatus === 'verified' ? 'Verified' : 
                     profile.verificationStatus === 'rejected' ? 'Rejected' : 'Pending'}
                  </span>
                </div>
                {profile.verificationMethod && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Method:</span>
                    <span className="text-gray-300">{profile.verificationMethod}</span>
                  </div>
                )}
                {profile.verificationNotes && (
                  <div className="mt-1">
                    <span className="text-gray-400 block">Notes:</span>
                    <span className="text-gray-300 text-xs">{profile.verificationNotes}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {!profile.isVerified && <>
                  <Button variant="success" size="sm" onClick={() => onVerify(profile.id)}>
                    <CheckCircle size={16} className="mr-1" />
                    Approve
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => onReject(profile.id)}>
                    <X size={16} className="mr-1" />
                    Reject
                  </Button>
                </>}
              <Button variant={profile.isFeatured ? 'secondary' : 'primary'} size="sm" onClick={() => onToggleFeatured(profile.id)}>
                <Star size={16} className="mr-1" />
                {profile.isFeatured ? 'Remove Featured' : 'Feature Profile'}
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="secondary" size="sm" onClick={() => onViewDetails(profile.id)}>
                <Eye size={16} className="mr-1" />
                View
              </Button>
              <Button variant="outline" size="sm" onClick={() => onEditMembership(profile.id)}>
                <Crown size={16} className="mr-1" />
                Membership
              </Button>
              <Button variant="primary" size="sm" onClick={() => onRequestPayment(profile.id)}>
                <CreditCard size={16} className="mr-1" />
                Payment
              </Button>
              {onRequestVerification && !profile.isVerified && (
                <Button variant="outline" size="sm" onClick={() => onRequestVerification(profile.id)}>
                  <UserCheck size={16} className="mr-1" />
                  Verify
                </Button>
              )}
              <Button variant="danger" size="sm">
                <Trash size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}