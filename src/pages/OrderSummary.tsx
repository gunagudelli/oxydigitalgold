import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/OrderSummary.css';
import TermsModal from '../components/TermsModal';

interface OrderSummaryProps {
  orderData: {
    amount: string;
    buyMode: 'rupees' | 'grams';
    goldRate: number;
  };
  onDataPass: (data: any) => void;
}

const OrderSummary = ({ orderData, onDataPass }: OrderSummaryProps) => {
  const navigate = useNavigate();
  const { amount, buyMode, goldRate } = orderData || {};
  const [timeLeft, setTimeLeft] = useState(300);
  const [isPriceLocked, setIsPriceLocked] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showError, setShowError] = useState(false);
  
  if (!orderData) {
    navigate('/buy-gold');
    return null;
  }

  const numAmount = parseFloat(amount);
  
  const grams = buyMode === 'rupees' 
    ? (numAmount / goldRate).toFixed(3) 
    : numAmount.toFixed(3);
  
  const rupees = buyMode === 'rupees' 
    ? numAmount 
    : numAmount * goldRate;
  
  const gst = rupees * 0.03;
  const total = rupees + gst;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPriceLocked(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProceed = () => {
    if (!isPriceLocked) return;
    
    if (!isAccepted) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    onDataPass({
      grams,
      rupees: rupees.toFixed(2),
      gst: gst.toFixed(2),
      total: total.toFixed(2),
      goldRate
    });
    navigate('/payment-method');
  };

  return (
    <div className="order-summary-page">
      <div className="order-summary-container">
        <div className="order-summary-header">
          <button className="back-button" onClick={() => navigate('/buy-gold')}>
            ← Back to Buy Gold
          </button>
          <h1 className="page-title">Review Your Order</h1>
          {isPriceLocked && (
            <div className={`price-lock-timer ${timeLeft <= 60 ? 'warning' : ''}`}>
              <span className="timer-icon">🔒</span>
              <span className="timer-text">
                Price locked • {formatTime(timeLeft)} remaining
              </span>
            </div>
          )}
          {!isPriceLocked && (
            <div className="price-expired">
              <span className="expired-icon">⚠️</span>
              <span className="expired-text">Price lock expired - Please refresh</span>
            </div>
          )}
        </div>

        <div className="order-content">
          <div className="order-details-card">
            <div className="info-box warning-box-top">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L1 15H15L8 1Z" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M8 6V9M8 11V11.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Price locked for {formatTime(timeLeft)} • Transaction cannot be cancelled once confirmed</span>
            </div>

            <div className="details-grid">
              <div className="card-section">
                <h2 className="section-title">Order Details</h2>
                
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Gold Rate</span>
                    <span className="detail-value">₹{goldRate.toLocaleString()}/g</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Quantity</span>
                    <span className="detail-value">{grams} grams</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Purity</span>
                    <span className="detail-value">24K • 99.5%</span>
                  </div>
                </div>
              </div>

              <div className="card-section">
                <h2 className="section-title">Payment Breakdown</h2>
                
                <div className="breakdown-list">
                  <div className="breakdown-row">
                    <span className="breakdown-label">Gold Value</span>
                    <span className="breakdown-value">₹{rupees.toLocaleString()}</span>
                  </div>
                  
                  <div className="breakdown-row">
                    <span className="breakdown-label">GST (3%)</span>
                    <span className="breakdown-value">₹{gst.toFixed(2)}</span>
                  </div>
                  
                  <div className="breakdown-row total-row">
                    <span className="breakdown-label">Total Amount</span>
                    <span className="breakdown-value">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="terms-acceptance-inline">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={isAccepted}
                  onChange={(e) => setIsAccepted(e.target.checked)}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">
                  I agree to the{' '}
                  <button 
                    type="button"
                    className="terms-link" 
                    onClick={() => setShowTermsModal(true)}
                  >
                    Terms & Conditions
                  </button>
                </span>
              </label>
              {showError && (
                <div className="error-message-terms">
                  Please accept the Terms & Conditions to continue
                </div>
              )}
            </div>

            {isPriceLocked ? (
              <button 
                className="proceed-button" 
                onClick={handleProceed}
              >
                Proceed to Payment
              </button>
            ) : (
              <button className="refresh-button" onClick={() => navigate('/buy-gold')}>
                Get Fresh Price & Try Again
              </button>
            )}
          </div>
        </div>
      </div>

      <TermsModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)}
        flowType="buy"
      />
    </div>
  );
};

export default OrderSummary;
