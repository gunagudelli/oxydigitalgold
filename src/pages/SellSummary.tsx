import { useState, useEffect } from 'react';
import '../styles/SellSummary.css';

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
  const [timeLeft, setTimeLeft] = useState(15);
  const [isPriceLocked, setIsPriceLocked] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
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
      const remaining = 15 - elapsed;
      
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
    
    setIsProcessing(true);
    
    // Simulate brief processing delay for better UX
    setTimeout(() => {
      onNavigate('sell-processing', {
        grams,
        rupees: rupees.toFixed(2),
        processingFee: processingFee.toFixed(2),
        tds: tds.toFixed(2),
        finalAmount: finalAmount.toFixed(2),
        sellRate
      });
    }, 500);
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
            <div className={`price-lock-timer ${timeLeft <= 5 ? 'warning' : ''}`}>
              <span className="timer-icon">🔒</span>
              <span className="timer-text">
                Price locked • {timeLeft}s remaining
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
            <div className="card-section">
              <h2 className="section-title">Transaction Details</h2>
              
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Locked Sell Rate</span>
                  <span className="detail-value highlight">₹{sellRate.toLocaleString()}/gram</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Quantity to Sell</span>
                  <span className="detail-value">{grams} grams</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Gross Sell Value</span>
                  <span className="detail-value">₹{rupees.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="card-section">
              <h2 className="section-title">Payout Calculation</h2>
              
              <div className="breakdown-list">
                <div className="breakdown-row">
                  <span className="breakdown-label">Gross Sell Value</span>
                  <span className="breakdown-value">₹{rupees.toLocaleString()}</span>
                </div>
                
                <div className="breakdown-row deduction">
                  <span className="breakdown-label">Processing Fee (1%)</span>
                  <span className="breakdown-value">- ₹{processingFee.toFixed(2)}</span>
                </div>

                <div className="breakdown-row deduction">
                  <span className="breakdown-label">TDS (1%)</span>
                  <span className="breakdown-value">- ₹{tds.toFixed(2)}</span>
                </div>
                
                <div className="breakdown-row total-row">
                  <span className="breakdown-label">Net Payout</span>
                  <span className="breakdown-value">₹{finalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="info-box">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#0369a1" strokeWidth="1.5"/>
                <path d="M8 7V11M8 5V5.5" stroke="#0369a1" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <div>
                <p><strong>Settlement:</strong> T+1 working day</p>
                <p>Funds will be credited to your registered bank account within 1 working day from transaction date.</p>
              </div>
            </div>

            <div className="legal-disclaimer">
              <h4>Terms & Regulatory Compliance</h4>
              <ul>
                <li>This transaction is governed by RBI guidelines and platform terms of service</li>
                <li>Sell rates are market-linked and valid only during the lock period</li>
                <li>TDS deducted as per Income Tax Act, 1961 (Section 194Q)</li>
                <li>Processing fee covers transaction, vault, and compliance costs</li>
                <li>Settlement timeline subject to bank processing and working days</li>
                <li>Transaction cannot be reversed once confirmed</li>
              </ul>
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
    </div>
  );
};

export default SellSummary;
