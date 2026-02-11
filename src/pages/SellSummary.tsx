import { useState, useEffect } from 'react';
import '../styles/SellSummary.css';
import TermsModal from '../components/TermsModal';

interface SellSummaryProps {
  onNavigate: (page: string, data?: any) => void;
  sellData: {
    amount: string;
    sellMode: 'rupees' | 'grams';
    sellRate: number;
    availableGold: number;
    lockedAt: string;
  };
}

const SellSummary = ({ onNavigate, sellData }: SellSummaryProps) => {
  const { amount, sellMode, sellRate, lockedAt } = sellData;
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes = 180 seconds
  const [isPriceLocked, setIsPriceLocked] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const numAmount = parseFloat(amount);
  
  const grams = sellMode === 'rupees' 
    ? (numAmount / sellRate).toFixed(3) 
    : numAmount.toFixed(3);
  
  const rupees = sellMode === 'rupees' 
    ? numAmount 
    : numAmount * sellRate;
  
  const processingFee = rupees * 0.01; // 1% processing fee
  const tds = rupees * 0.01; // 1% TDS
  const finalAmount = rupees - processingFee - tds;

  // Price lock countdown
  useEffect(() => {
    const lockTime = new Date(lockedAt).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - lockTime) / 1000);
      const remaining = 180 - elapsed;
      
      if (remaining <= 0) {
        setIsPriceLocked(false);
        setTimeLeft(0);
        clearInterval(interval);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockedAt]);

  const handleConfirm = () => {
    if (!isPriceLocked) return;
    
    if (!isAccepted) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      onNavigate('bank-account', {
        grams,
        rupees: rupees.toFixed(2),
        processingFee: processingFee.toFixed(2),
        tds: tds.toFixed(2),
        finalAmount: finalAmount.toFixed(2),
        sellRate
      });
    }, 300);
  };

  const handleRefreshPrice = () => {
    onNavigate('sell');
  };

  return (
    <div className="sell-summary-page">
      <div className="sell-summary-container">
        <div className="sell-summary-header">
          <button className="back-button" onClick={() => onNavigate('sell')} disabled={isProcessing}>
            ← Back to Sell
          </button>
          <h1 className="page-title">Review Sell Order</h1>
          {isPriceLocked && (
            <div className={`price-lock-timer ${timeLeft <= 30 ? 'warning' : ''}`}>
              <span className="timer-icon">🔒</span>
              <span className="timer-text">
                Price locked • {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')} remaining
              </span>
            </div>
          )}
          {!isPriceLocked && (
            <div className="price-expired">
              <span className="expired-icon">⚠️</span>
              <span className="expired-text">Price lock expired</span>
            </div>
          )}
        </div>

        <div className="summary-content">
          <div className="summary-card">
            <div className="info-box warning-box">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L1 15H15L8 1Z" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M8 6V9M8 11V11.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Price locked for {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')} • Transaction cannot be cancelled • T+1 settlement</span>
            </div>

            <div className="details-grid">
              <div className="card-section">
                <h2 className="section-title">Sell Details</h2>
                
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Sell Rate</span>
                    <span className="detail-value">₹{sellRate.toLocaleString()}/g</span>
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
                <h2 className="section-title">Payout Breakdown</h2>
                
                <div className="breakdown-list">
                  <div className="breakdown-row">
                    <span className="breakdown-label">Gross Value</span>
                    <span className="breakdown-value">₹{rupees.toLocaleString()}</span>
                  </div>
                  
                  <div className="breakdown-row">
                    <span className="breakdown-label">Processing (1%)</span>
                    <span className="breakdown-value">- ₹{processingFee.toFixed(2)}</span>
                  </div>

                  <div className="breakdown-row">
                    <span className="breakdown-label">TDS (1%)</span>
                    <span className="breakdown-value">- ₹{tds.toFixed(2)}</span>
                  </div>
                  
                  <div className="breakdown-row total-row">
                    <span className="breakdown-label">Net Payout</span>
                    <span className="breakdown-value">₹{finalAmount.toLocaleString()}</span>
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
                  disabled={!isPriceLocked}
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
                className="confirm-button" 
                onClick={handleConfirm}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Confirm & Sell Gold'}
              </button>
            ) : (
              <button 
                className="refresh-button" 
                onClick={handleRefreshPrice}
              >
                Get Fresh Price & Try Again
              </button>
            )}
          </div>
        </div>
      </div>

      <TermsModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)}
        flowType="sell"
      />
    </div>
  );
};

export default SellSummary;
