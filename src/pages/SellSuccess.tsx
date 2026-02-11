import '../styles/SellSuccess.css';

interface SellSuccessProps {
  onNavigate: (page: string) => void;
  sellData: {
    grams: string;
    finalAmount: string;
  };
}

const SellSuccess = ({ onNavigate, sellData }: SellSuccessProps) => {
  const { grams, finalAmount } = sellData;
  const transactionId = `TXN${Date.now().toString().slice(-10)}`;
  const timestamp = new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const updatedBalance = (5.234 - parseFloat(grams)).toFixed(3); // Mock calculation

  return (
    <div className="sell-success-page">
      <div className="success-container">
        <div className="success-icon">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="38" stroke="#2e7d32" strokeWidth="3"/>
            <path d="M25 40L35 50L55 30" stroke="#2e7d32" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="success-title">Gold Sold Successfully!</h1>
        <p className="success-message">Your gold has been sold and amount will be credited soon</p>

        <div className="success-card">
          <div className="success-detail">
            <span className="detail-label">Amount Credited</span>
            <span className="detail-value amount">₹{parseFloat(finalAmount).toLocaleString()}</span>
          </div>

          <div className="divider"></div>

          <div className="success-detail">
            <span className="detail-label">Gold Sold</span>
            <span className="detail-value">{grams} grams</span>
          </div>

          <div className="success-detail">
            <span className="detail-label">Updated Balance</span>
            <span className="detail-value">{updatedBalance} grams</span>
          </div>

          <div className="divider"></div>

          <div className="success-detail">
            <span className="detail-label">Transaction ID</span>
            <span className="detail-value">{transactionId}</span>
          </div>

          <div className="success-detail">
            <span className="detail-label">Date & Time</span>
            <span className="detail-value">{timestamp}</span>
          </div>
        </div>

        <div className="success-actions">
          <button className="action-btn primary" onClick={() => onNavigate('portfolio')}>
            View Portfolio
          </button>
          <button className="action-btn secondary" onClick={() => onNavigate('sell')}>
            Sell More Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellSuccess;
