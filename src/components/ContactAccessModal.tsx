import { useState } from 'react';
import { X, CreditCard, Shield, Lock, Star, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from './Button';
import { paymentService, PaymentRequest, ContactInfo } from '../services/payment';

interface ContactAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  escort: {
    id: string;
    name: string;
    age: number;
    location: string;
    rating: number;
    reviewCount: number;
    image: string;
    price: number;
  };
}

export function ContactAccessModal({ isOpen, onClose, escort }: ContactAccessModalProps) {
  const [step, setStep] = useState<'payment' | 'processing' | 'success'>('payment');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStep('processing');
    setError(null);

    // Validate payment data
    if (!paymentService.validateCardNumber(paymentData.cardNumber)) {
      setError('Invalid card number');
      setIsLoading(false);
      setStep('payment');
      return;
    }

    if (!paymentService.validateExpiryDate(paymentData.expiryDate)) {
      setError('Invalid expiry date');
      setIsLoading(false);
      setStep('payment');
      return;
    }

    if (!paymentService.validateCVV(paymentData.cvv)) {
      setError('Invalid CVV');
      setIsLoading(false);
      setStep('payment');
      return;
    }

    const paymentRequest: PaymentRequest = {
      escortId: escort.id,
      amount: escort.price,
      currency: 'NGN',
      paymentMethod: paymentData
    };

    try {
      const response = await paymentService.mockProcessPayment(paymentRequest);
      
      if (response.success && response.contactInfo) {
        setContactInfo(response.contactInfo);
        setStep('success');
      } else {
        setError(response.error || 'Payment failed');
        setStep('payment');
      }
    } catch (err) {
      setError('Payment processing failed. Please try again.');
      setStep('payment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'expiryDate') {
      const formatted = paymentService.formatExpiryDate(value);
      setPaymentData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setPaymentData(prev => ({ ...prev, [name]: value }));
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-500'} 
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {step === 'payment' && 'Access Contact Information'}
              {step === 'processing' && 'Processing Payment'}
              {step === 'success' && 'Contact Information'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Escort Info */}
          <div className="bg-slate-700/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-4">
              <img
                src={escort.image}
                alt={escort.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{escort.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>{escort.age} years</span>
                  <span>•</span>
                  <MapPin size={14} />
                  <span>{escort.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {renderStars(escort.rating)}
                  <span className="text-sm text-gray-400">({escort.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {step === 'payment' && (
            <form onSubmit={handlePayment} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 text-red-400">
                    <X size={18} />
                    <span className="font-medium">Payment Error</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{error}</p>
                </div>
              )}

              <div className="bg-amber-400/10 border border-amber-400/20 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <Shield size={18} />
                  <span className="font-medium">Secure Payment</span>
                </div>
                <p className="text-sm text-gray-300">
                  Pay ₦{escort.price} to access contact information and connect directly with {escort.name}.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) => {
                      const formatted = paymentService.formatCardNumber(e.target.value);
                      setPaymentData(prev => ({ ...prev, cardNumber: formatted }));
                    }}
                    maxLength={19}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  />
                  <CreditCard className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={handleInputChange}
                    maxLength={5}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                    maxLength={4}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardName"
                  placeholder="John Doe"
                  value={paymentData.cardName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>

              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Lock size={16} />
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </div>

              <Button type="submit" fullWidth size="lg" disabled={isLoading}>
                Pay ₦{escort.price} to Access Contact
              </Button>
            </form>
          )}

          {step === 'processing' && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-white mb-2">Processing Payment</h3>
              <p className="text-gray-400">Please wait while we process your payment...</p>
            </div>
          )}

          {step === 'success' && contactInfo && (
            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <Shield size={18} />
                  <span className="font-medium">Payment Successful</span>
                </div>
                <p className="text-sm text-gray-300">
                  You now have access to {escort.name}'s contact information.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Contact {escort.name}</h3>
                
                <div className="space-y-3">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-amber-400" />
                      <div>
                        <div className="text-sm text-gray-400">Phone</div>
                        <div className="text-white font-medium">{contactInfo.phone}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-amber-400" />
                      <div>
                        <div className="text-sm text-gray-400">Email</div>
                        <div className="text-white font-medium">{contactInfo.email}</div>
                      </div>
                    </div>
                  </div>

                  {contactInfo.telegram && (
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-amber-400" />
                        <div>
                          <div className="text-sm text-gray-400">Telegram</div>
                          <div className="text-white font-medium">{contactInfo.telegram}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {contactInfo.whatsapp && (
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-amber-400" />
                        <div>
                          <div className="text-sm text-gray-400">WhatsApp</div>
                          <div className="text-white font-medium">{contactInfo.whatsapp}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {contactInfo.preferredContact && (
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-amber-400" />
                        <div>
                          <div className="text-sm text-gray-400">Note</div>
                          <div className="text-white font-medium">{contactInfo.preferredContact}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-amber-400/10 border border-amber-400/20 rounded-lg p-4">
                  <p className="text-sm text-gray-300">
                    <strong className="text-amber-400">Important:</strong> Please be respectful and professional in all communications. 
                    Follow the escort's guidelines and respect their boundaries.
                  </p>
                </div>
              </div>

              <Button fullWidth size="lg" onClick={onClose}>
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
