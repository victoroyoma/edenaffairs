import React, { useEffect, useState } from 'react';
import { X, CreditCard, CheckCircle, Crown, Building, Smartphone, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileName: string;
  amount: string;
  onPaymentComplete: () => void;
  isVip?: boolean;
  profilePrice?: number;
}

interface FormErrors {
  cardNumber?: string;
  cardName?: string;
  expiry?: string;
  cvv?: string;
  bankName?: string;
  accountNumber?: string;
  phoneNumber?: string;
}
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileName: string;
  amount: string;
  onPaymentComplete: () => void;
  isVip?: boolean;
  profilePrice?: number;
}
export function PaymentModal({
  isOpen,
  onClose,
  profileName,
  amount,
  onPaymentComplete,
  isVip = false,
  profilePrice
}: PaymentModalProps) {
  const [step, setStep] = useState<'payment' | 'processing' | 'success'>('payment');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'mobile'>('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    bankName: '',
    accountNumber: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateCardNumber = (value: string) => {
    const cleaned = value.replace(/\s+/g, '');
    if (cleaned.length !== 16) return 'Card number must be 16 digits';
    if (!/^\d+$/.test(cleaned)) return 'Card number must contain only digits';
    return '';
  };

  const validateExpiry = (value: string) => {
    if (!/^\d{2}\/\d{2}$/.test(value)) return 'Enter expiry as MM/YY';
    const [month, year] = value.split('/');
    const monthNum = parseInt(month);
    if (monthNum < 1 || monthNum > 12) return 'Invalid month';
    
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const yearNum = parseInt(year);
    
    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      return 'Card has expired';
    }
    return '';
  };

  const validateCVV = (value: string) => {
    if (!/^\d{3,4}$/.test(value)) return 'CVV must be 3 or 4 digits';
    return '';
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      else {
        const cardError = validateCardNumber(formData.cardNumber);
        if (cardError) newErrors.cardNumber = cardError;
      }
      
      if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
      
      if (!formData.expiry) newErrors.expiry = 'Expiry date is required';
      else {
        const expiryError = validateExpiry(formData.expiry);
        if (expiryError) newErrors.expiry = expiryError;
      }
      
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
      else {
        const cvvError = validateCVV(formData.cvv);
        if (cvvError) newErrors.cvv = cvvError;
      }
    }
    
    if (paymentMethod === 'bank') {
      if (!formData.bankName) newErrors.bankName = 'Bank name is required';
      if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
      else if (formData.accountNumber.length < 10) newErrors.accountNumber = 'Account number must be at least 10 digits';
    }
    
    if (paymentMethod === 'mobile') {
      if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
      else if (!/^0[789]\d{8}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Enter a valid Nigerian phone number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Format card number input
  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\s+/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (formatted.length <= 19) { // 16 digits + 3 spaces
      setFormData(prev => ({ ...prev, cardNumber: formatted }));
      if (errors.cardNumber) {
        setErrors(prev => ({ ...prev, cardNumber: '' }));
      }
    }
  };

  // Format expiry input
  const handleExpiryChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length >= 2) {
      formatted = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    if (formatted.length <= 5) {
      setFormData(prev => ({ ...prev, expiry: formatted }));
      if (errors.expiry) {
        setErrors(prev => ({ ...prev, expiry: '' }));
      }
    }
  };
  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep('payment');
      setPaymentMethod('card');
      setFormData({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: '',
        bankName: '',
        accountNumber: '',
        phoneNumber: ''
      });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Accessibility: close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, step]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setStep('processing');
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep('success');
    } catch (error) {
      // Handle payment error
      setStep('payment');
      setErrors({ cardNumber: 'Payment failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleComplete = () => {
    onPaymentComplete();
    onClose();
  };
  const handleClose = () => {
    // Prevent closing during processing
    if (step === 'processing' || isSubmitting) {
      if (window.confirm('Are you sure you want to cancel the payment process?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };
  const formatPrice = (price: number) => {
    return '₦' + price.toLocaleString();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="payment-modal-title">
      <div className="bg-slate-800 rounded-xl max-w-md w-full border border-slate-700 shadow-xl">
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 id="payment-modal-title" className="text-xl font-bold text-white flex items-center">
            {isVip ? <>
                <Crown size={20} className="mr-2 text-purple-400" />
                VIP Access
              </> : <>Unlock Contact</>}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition" aria-label="Close payment modal">
            <X size={24} />
          </button>
        </div>
        {step === 'payment' && <div className="p-6">
            <p className="text-gray-300 mb-6">
              {isVip ? <>
                  You're about to unlock VIP access to{' '}
                  <span className="font-semibold text-amber-400">
                    {profileName}
                  </span>
                  's profile
                </> : <>
                  You're about to unlock contact details for{' '}
                  <span className="font-semibold text-amber-400">
                    {profileName}
                  </span>
                </>}
            </p>
            <div className="flex flex-col space-y-2 mb-6 border-b border-slate-700 pb-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Access Fee:</span>
                <span className="font-semibold text-white">{amount}</span>
              </div>
              {isVip && profilePrice && <>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Profile Price:</span>
                    <span className="font-semibold text-white">
                      {formatPrice(profilePrice)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-700 mt-2">
                    <span className="text-gray-300">Total:</span>
                    <span className="font-semibold text-amber-400">
                      {formatPrice(5000 + profilePrice)}
                    </span>
                  </div>
                </>}
            </div>
            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-3">
                Select payment method:
              </div>
              <div className="grid grid-cols-3 gap-3">
                <button 
                  type="button" 
                  className={`p-3 rounded-md border transition-colors ${paymentMethod === 'card' ? 'border-amber-500 bg-slate-700' : 'border-slate-700 bg-slate-800 hover:bg-slate-700'} flex flex-col items-center justify-center`} 
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={24} className={paymentMethod === 'card' ? 'text-amber-400' : 'text-gray-400'} />
                  <span className="text-xs mt-1 text-gray-300">Card</span>
                </button>
                <button 
                  type="button" 
                  className={`p-3 rounded-md border transition-colors ${paymentMethod === 'bank' ? 'border-amber-500 bg-slate-700' : 'border-slate-700 bg-slate-800 hover:bg-slate-700'} flex flex-col items-center justify-center`} 
                  onClick={() => setPaymentMethod('bank')}
                >
                  <Building size={24} className={paymentMethod === 'bank' ? 'text-amber-400' : 'text-gray-400'} />
                  <span className="text-xs mt-1 text-gray-300">Bank</span>
                </button>
                <button 
                  type="button" 
                  className={`p-3 rounded-md border transition-colors ${paymentMethod === 'mobile' ? 'border-amber-500 bg-slate-700' : 'border-slate-700 bg-slate-800 hover:bg-slate-700'} flex flex-col items-center justify-center`} 
                  onClick={() => setPaymentMethod('mobile')}
                >
                  <Smartphone size={24} className={paymentMethod === 'mobile' ? 'text-amber-400' : 'text-gray-400'} />
                  <span className="text-xs mt-1 text-gray-300">Mobile</span>
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {paymentMethod === 'card' && <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Card Number
                    </label>
                    <input 
                      type="text" 
                      placeholder="1234 5678 9012 3456" 
                      className={`w-full bg-slate-700 border ${errors.cardNumber ? 'border-red-500' : 'border-slate-600'} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400`}
                      value={formData.cardNumber} 
                      onChange={e => handleCardNumberChange(e.target.value)}
                      maxLength={19}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Name on Card
                    </label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className={`w-full bg-slate-700 border ${errors.cardName ? 'border-red-500' : 'border-slate-600'} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400`}
                      value={formData.cardName} 
                      onChange={e => {
                        setFormData({ ...formData, cardName: e.target.value });
                        if (errors.cardName) setErrors(prev => ({ ...prev, cardName: '' }));
                      }}
                    />
                    {errors.cardName && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.cardName}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Expiry Date
                      </label>
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        className={`w-full bg-slate-700 border ${errors.expiry ? 'border-red-500' : 'border-slate-600'} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400`}
                        value={formData.expiry} 
                        onChange={e => handleExpiryChange(e.target.value)}
                        maxLength={5}
                      />
                      {errors.expiry && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle size={16} className="mr-1" />
                          {errors.expiry}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        CVV
                      </label>
                      <input 
                        type="text" 
                        placeholder="123" 
                        className={`w-full bg-slate-700 border ${errors.cvv ? 'border-red-500' : 'border-slate-600'} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400`}
                        value={formData.cvv} 
                        onChange={e => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 4) {
                            setFormData({ ...formData, cvv: value });
                            if (errors.cvv) setErrors(prev => ({ ...prev, cvv: '' }));
                          }
                        }}
                        maxLength={4}
                      />
                      {errors.cvv && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle size={16} className="mr-1" />
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                </>}
              {paymentMethod === 'bank' && (
                <div className="space-y-4 mb-6">
                  <div className="bg-slate-700 rounded-md p-4">
                    <p className="text-gray-300 mb-3 flex items-center">
                      <Building size={20} className="mr-2 text-amber-400" />
                      Bank Transfer Details:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-gray-400">Bank Name:</span>
                      <span className="text-white">Eden Bank</span>
                      <span className="text-gray-400">Account Number:</span>
                      <span className="text-white">0123456789</span>
                      <span className="text-gray-400">Account Name:</span>
                      <span className="text-white">Eden Affairs Ltd</span>
                      <span className="text-gray-400">Reference:</span>
                      <span className="text-white">
                        EA-{Math.floor(Math.random() * 10000)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Your Bank Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. First Bank, GTBank, etc." 
                      className={`w-full bg-slate-700 border ${errors.bankName ? 'border-red-500' : 'border-slate-600'} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400`}
                      value={formData.bankName} 
                      onChange={e => {
                        setFormData({ ...formData, bankName: e.target.value });
                        if (errors.bankName) setErrors(prev => ({ ...prev, bankName: '' }));
                      }}
                    />
                    {errors.bankName && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.bankName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Your Account Number
                    </label>
                    <input 
                      type="text" 
                      placeholder="Enter your 10-digit account number" 
                      className={`w-full bg-slate-700 border ${errors.accountNumber ? 'border-red-500' : 'border-slate-600'} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400`}
                      value={formData.accountNumber} 
                      onChange={e => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 10) {
                          setFormData({ ...formData, accountNumber: value });
                          if (errors.accountNumber) setErrors(prev => ({ ...prev, accountNumber: '' }));
                        }
                      }}
                      maxLength={10}
                    />
                    {errors.accountNumber && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.accountNumber}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {paymentMethod === 'mobile' && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      placeholder="08012345678" 
                      className={`w-full bg-slate-700 border ${errors.phoneNumber ? 'border-red-500' : 'border-slate-600'} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400`}
                      value={formData.phoneNumber} 
                      onChange={e => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 11) {
                          setFormData({ ...formData, phoneNumber: value });
                          if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: '' }));
                        }
                      }}
                      maxLength={11}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                  <div className="bg-slate-700 rounded-md p-4">
                    <p className="text-gray-300 mb-3 flex items-center">
                      <Smartphone size={20} className="mr-2 text-amber-400" />
                      Select mobile payment provider:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        type="button" 
                        className="p-3 rounded-md border border-slate-600 bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center"
                      >
                        <span className="text-white">MTN MoMo</span>
                      </button>
                      <button 
                        type="button" 
                        className="p-3 rounded-md border border-slate-600 bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center"
                      >
                        <span className="text-white">Airtel Money</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <Button 
                type="submit" 
                fullWidth 
                disabled={isSubmitting}
                className={`${isVip ? 'bg-purple-600 hover:bg-purple-500' : ''} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 size={20} className="animate-spin mr-2" />
                    Processing...
                  </span>
                ) : (
                  `Pay ${isVip && profilePrice ? formatPrice(5000 + profilePrice) : amount}`
                )}
              </Button>
              <p className="text-xs text-gray-400 mt-4 text-center">
                Your payment information is secure and encrypted
              </p>
            </form>
          </div>}
        {step === 'processing' && (
          <div className="p-6 flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center mb-6">
              <Loader2 size={48} className="text-amber-400 animate-spin" />
            </div>
            <p className="text-white text-lg font-medium mb-2">
              Processing Payment
            </p>
            <p className="text-gray-400 text-center">
              Please wait while we process your payment...
            </p>
            <div className="mt-4 text-xs text-gray-500 text-center">
              Do not close this window or refresh the page
            </div>
          </div>
        )}
        {step === 'success' && <div className="p-6 flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-green-500/20 rounded-full mb-6">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <p className="text-white text-lg font-medium mb-2">
              Payment Successful!
            </p>
            <p className="text-gray-400 text-center mb-6">
              {isVip ? <>You now have VIP access to {profileName}'s profile</> : <>You now have access to {profileName}'s contact details</>}
            </p>
            <Button onClick={handleComplete} fullWidth className={isVip ? 'bg-purple-600 hover:bg-purple-500' : ''}>
              View Contact Details
            </Button>
          </div>}
      </div>
    </div>;
}