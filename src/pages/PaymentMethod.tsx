import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentMethod.css';

interface PaymentMethodProps {
  paymentData: {
    grams: string;
    rupees: string;
    gst: string;
    total: string;
    goldRate: number;
  };
  onDataPass: (data: any) => void;
}

const PaymentMethod = ({ paymentData, onDataPass }: PaymentMethodProps) => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const paymentMethods = [
    { 
      id: 'upi', 
      name: 'UPI', 
      desc: 'Pay using Google Pay, PhonePe, Paytm or any UPI app',
      recommended: true
    },
    { 
      id: 'netbanking', 
      name: 'Net Banking', 
      desc: 'All major banks supported'
    },
    { 
      id: 'debit', 
      name: 'Debit Card', 
      desc: 'Visa, Mastercard, RuPay'
    },
    { 
      id: 'credit', 
      name: 'Credit Card', 
      desc: 'Visa, Mastercard, American Express'
    }
  ];

  const handlePayment = () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }
    onDataPass({ ...paymentData, paymentMethod: selectedMethod });
    navigate('/payment-processing');
  };

  return (
    <div className="payment-method-page">
      <div className="payment-method-container">
        <div className="payment-header-section">
          <button className="back-button" onClick={() => navigate('/order-summary')}>
            ← Back
          </button>
          <h1 className="page-title">Select Payment Method</h1>
        </div>

        <div className="payment-layout">
          <div className="payment-left">
            <div className="order-summary-sidebar">
              <h3 className="sidebar-title">Order Summary</h3>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span className="summary-label">Gold Quantity</span>
                  <span className="summary-value">{paymentData.grams} grams</span>
                </div>
                
                <div className="summary-row">
                  <span className="summary-label">Gold Rate</span>
                  <span className="summary-value">₹{paymentData.goldRate.toLocaleString()}/g</span>
                </div>
                
                <div className="summary-row">
                  <span className="summary-label">Gold Value</span>
                  <span className="summary-value">₹{parseFloat(paymentData.rupees).toLocaleString()}</span>
                </div>
                
                <div className="summary-row">
                  <span className="summary-label">GST (3%)</span>
                  <span className="summary-value">₹{parseFloat(paymentData.gst).toLocaleString()}</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total">
                  <span className="summary-label">Total Payable</span>
                  <span className="summary-value">₹{parseFloat(paymentData.total).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-right">
            <div className="payment-methods-card">
              <h3 className="methods-title">Choose Payment Method</h3>
              
              <div className="methods-list">
                {paymentMethods.map((method) => (
                  <label key={method.id} className="method-option">
                    <input
                      type="radio"
                      name="payment-method"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={() => setSelectedMethod(method.id)}
                      className="method-radio"
                    />
                    <div className="method-content">
                      <div className="method-header">
                        <span className="method-name">{method.name}</span>
                        {method.recommended && (
                          <span className="recommended-badge">Recommended</span>
                        )}
                      </div>
                      <span className="method-desc">{method.desc}</span>
                    </div>
                    <div className="radio-indicator">
                      {selectedMethod === method.id && <div className="radio-dot"></div>}
                    </div>
                  </label>
                ))}
              </div>

              <button 
                className={`pay-button ${!selectedMethod ? 'disabled' : ''}`}
                onClick={handlePayment}
                disabled={!selectedMethod}
              >
                Pay ₹{parseFloat(paymentData.total).toLocaleString()}
              </button>

              <div className="security-footer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="7" width="10" height="7" rx="1" stroke="#666" strokeWidth="1.2"/>
                  <path d="M5 7V5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5V7" stroke="#666" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span>Secured by 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
