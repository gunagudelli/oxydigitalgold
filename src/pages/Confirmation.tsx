import '../styles/Confirmation.css';

interface ConfirmationProps {
  onNavigate: (page: string) => void;
  transactionData?: {
    grams: string;
    rupees: string;
  };
}

const Confirmation = ({ onNavigate, transactionData }: ConfirmationProps) => {
  const grams = transactionData?.grams || '0.061';
  const rupees = transactionData?.rupees || '1000';

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="success-icon">✓</div>
        <h1 className="success-title">Purchase Successful!</h1>
        <p className="success-subtitle">Your gold has been credited to your portfolio</p>

        <div className="transaction-card">
          <h3>Transaction Summary</h3>
          <div className="summary-row">
            <span className="summary-label">Gold Purchased</span>
            <span className="summary-value">{grams} grams</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Amount Paid</span>
            <span className="summary-value">₹{parseFloat(rupees).toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Purity</span>
            <span className="summary-value">24K • 99.5%</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Status</span>
            <span className="summary-value status-success">Completed</span>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn-primary-action" onClick={() => onNavigate('portfolio')}>
            View Portfolio
          </button>
          <button className="btn-secondary-action" onClick={() => onNavigate('buy')}>
            Buy More Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
