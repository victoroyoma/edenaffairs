// Payment service for contact access
export interface PaymentRequest {
  escortId: string;
  amount: number;
  currency: string;
  paymentMethod: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardName: string;
  };
}

export interface ContactInfo {
  phone: string;
  email: string;
  telegram?: string;
  whatsapp?: string;
  preferredContact?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  contactInfo?: ContactInfo;
  error?: string;
}

class PaymentService {
  private baseUrl = '/api/payments';

  async processContactPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      // In a real implementation, this would make an API call to your payment processor
      const response = await fetch(`${this.baseUrl}/contact-access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Payment error:', error);
      return {
        success: false,
        error: 'Payment processing failed. Please try again.',
      };
    }
  }

  // Mock payment processing for development
  async mockProcessPayment(request: PaymentRequest): Promise<PaymentResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Basic validation
    if (!request.paymentMethod.cardNumber || !request.paymentMethod.expiryDate) {
      return {
        success: false,
        error: 'Invalid payment details',
      };
    }

    // Mock successful payment
    return {
      success: true,
      transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      contactInfo: {
        phone: '+234 901 234 5678',
        email: 'contact@escort-profile.com',
        telegram: '@escort_username',
        whatsapp: '+234 901 234 5678',
        preferredContact: 'WhatsApp for quick responses'
      }
    };
  }

  async getPaymentHistory(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/history`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payment history');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching payment history:', error);
      return [];
    }
  }

  validateCardNumber(cardNumber: string): boolean {
    // Basic Luhn algorithm validation
    const number = cardNumber.replace(/\s/g, '');
    let sum = 0;
    let isEven = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  validateExpiryDate(expiryDate: string): boolean {
    const [month, year] = expiryDate.split('/').map(num => parseInt(num));
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    if (month < 1 || month > 12) return false;
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
  }

  validateCVV(cvv: string): boolean {
    return /^\d{3,4}$/.test(cvv);
  }

  formatCardNumber(cardNumber: string): string {
    const number = cardNumber.replace(/\D/g, '');
    return number.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  formatExpiryDate(expiryDate: string): string {
    const number = expiryDate.replace(/\D/g, '');
    if (number.length >= 2) {
      return number.substring(0, 2) + '/' + number.substring(2, 4);
    }
    return number;
  }

  getCardType(cardNumber: string): string {
    const number = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(number)) return 'visa';
    if (/^5[1-5]/.test(number)) return 'mastercard';
    if (/^3[47]/.test(number)) return 'amex';
    if (/^6/.test(number)) return 'discover';
    
    return 'unknown';
  }
}

export const paymentService = new PaymentService();
