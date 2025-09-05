import { useState } from 'react';
import { CheckCircle, Star, Trash, ChevronDown, Crown, CreditCard } from 'lucide-react';
import { Button } from './Button';
type MembershipTier = '' | 'silver' | 'gold' | 'diamond';

interface AdminBulkActionsProps {
  selectedCount: number;
  onVerifyAll: () => void;
  onFeatureAll: () => void;
  onUnfeatureAll: () => void;
  onDeleteAll: () => void;
  onSetMembership: (tier: MembershipTier) => void;
  onRequestPayment: () => void;
}
export function AdminBulkActions({
  selectedCount,
  onVerifyAll,
  onFeatureAll,
  onUnfeatureAll,
  onDeleteAll,
  onSetMembership,
  onRequestPayment
}: AdminBulkActionsProps) {
  const [showMembershipDropdown, setShowMembershipDropdown] = useState(false);
  if (selectedCount === 0) return null;
  return <div className="bg-slate-700 rounded-lg border border-slate-600 p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <span className="text-white font-medium">
            {selectedCount} profiles selected
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="success" size="sm" onClick={onVerifyAll}>
            <CheckCircle size={16} className="mr-1" />
            Verify All
          </Button>
          <Button variant="secondary" size="sm" onClick={onFeatureAll}>
            <Star size={16} className="mr-1" />
            Feature All
          </Button>
          <Button variant="outline" size="sm" onClick={onUnfeatureAll}>
            <Star size={16} className="mr-1" />
            Unfeature All
          </Button>
          <div className="relative">
            <Button variant="primary" size="sm" onClick={() => setShowMembershipDropdown(!showMembershipDropdown)}>
              <Crown size={16} className="mr-1" />
              Set Membership
              <ChevronDown size={14} className="ml-1" />
            </Button>
            {showMembershipDropdown && <div className="absolute top-full left-0 mt-1 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-10 w-48">
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white" onClick={() => {
                onSetMembership('silver');
                setShowMembershipDropdown(false);
              }}>
                    Silver Membership
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white" onClick={() => {
                onSetMembership('gold');
                setShowMembershipDropdown(false);
              }}>
                    Gold Membership
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white" onClick={() => {
                onSetMembership('diamond');
                setShowMembershipDropdown(false);
              }}>
                    Diamond Membership
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white" onClick={() => {
                onSetMembership('');
                setShowMembershipDropdown(false);
              }}>
                    Remove Membership
                  </button>
                </div>
              </div>}
          </div>
          <Button variant="primary" size="sm" onClick={onRequestPayment}>
            <CreditCard size={16} className="mr-1" />
            Request Payment
          </Button>
          <Button variant="danger" size="sm" onClick={() => {
          if (window.confirm(`Are you sure you want to delete ${selectedCount} profiles? This action cannot be undone.`)) {
            onDeleteAll();
          }
        }}>
            <Trash size={16} className="mr-1" />
            Delete All
          </Button>
        </div>
      </div>
    </div>;
}