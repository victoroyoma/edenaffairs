import React, { useState } from 'react';
import { X, CreditCard, CheckCircle } from 'lucide-react';
import { Button } from './Button';
interface Profile {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  membershipTier?: 'silver' | 'gold' | 'diamond' | '';
}
interface PaymentRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
  onSend: (id: number, data: any) => void;
}
export function PaymentRequestModal({
  isOpen,
  onClose,
  profile,
  onSend
}: PaymentRequestModalProps) {
  const [amount, setAmount] = useState('5000');
  const [description, setDescription] = useState('');
  const [paymentType, setPaymentType] = useState('membership');
  if (!isOpen || !profile) return null;
  const handleSend = () => {
    onSend(profile.id, {
      amount: Number(amount),
      description: description || getDefaultDescription(),
      paymentType
    });
    onClose();
  };
  const getDefaultDescription = () => {
    switch (paymentType) {
      case 'membership':
        return `${profile.membershipTier || 'Silver'} Membership Fee`;
      case 'featured':
        return 'Featured Profile Fee';
      case 'verification':
        return 'Profile Verification Fee';
      default:
        return 'Custom Payment';
    }
  };
  const membershipPrices = {
    silver: '5000',
    gold: '15000',
    diamond: '30000'
  };
  const handlePaymentTypeChange = (type: string) => {
    setPaymentType(type);
    // Set default amount based on payment type
    switch (type) {
      case 'membership':
        setAmount(membershipPrices[profile.membershipTier as keyof typeof membershipPrices] || '5000');
        break;
      case 'featured':
        setAmount('5000');
        break;
      case 'verification':
        setAmount('2000');
        break;
      default:
        setAmount('');
    }
    // Clear custom description when changing payment type
    setDescription('');
  };
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl max-w-md w-full border border-slate-700 shadow-xl">
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white flex items-center">
            <CreditCard size={20} className="mr-2 text-amber-400" />
            Request Payment
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-300 mb-6">
            Send payment request to{' '}
            <span className="font-semibold text-amber-400">{profile.name}</span>
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Payment Type
              </label>
              <select value={paymentType} onChange={e => handlePaymentTypeChange(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400">
                <option value="membership">Membership Fee</option>
                <option value="featured">Featured Profile</option>
                <option value="verification">Verification Fee</option>
                <option value="custom">Custom Payment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Amount (₦)
              </label>
              <input type="number" min="0" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder={getDefaultDescription()} rows={3} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"></textarea>
              <p className="mt-1 text-xs text-gray-400">
                If left empty, a default description will be used
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Notification Method
              </label>
              <div className="space-y-2">
                {profile.email && <div className="flex items-center">
                    <input type="checkbox" id="email-notify" defaultChecked className="w-4 h-4 text-amber-500 border-slate-600 rounded focus:ring-amber-400" />
                    <label htmlFor="email-notify" className="ml-2 text-gray-300">
                      Email ({profile.email})
                    </label>
                  </div>}
                {profile.phone && <div className="flex items-center">
                    <input type="checkbox" id="sms-notify" defaultChecked className="w-4 h-4 text-amber-500 border-slate-600 rounded focus:ring-amber-400" />
                    <label htmlFor="sms-notify" className="ml-2 text-gray-300">
                      SMS ({profile.phone})
                    </label>
                  </div>}
                <div className="flex items-center">
                  <input type="checkbox" id="app-notify" defaultChecked className="w-4 h-4 text-amber-500 border-slate-600 rounded focus:ring-amber-400" />
                  <label htmlFor="app-notify" className="ml-2 text-gray-300">
                    In-App Notification
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700 p-4 flex justify-end">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleSend}>Send Request</Button>
        </div>
      </div>
    </div>;
}