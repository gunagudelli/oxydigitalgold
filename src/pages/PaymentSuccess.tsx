import '../styles/PaymentSuccess.css';

interface PaymentSuccessProps {
  onNavigate: (page: string, data?: any) => void;
  transactionData: {
    transactionId: string;
    timestamp: string;
    grams: string;
    total: string;
    paymentMethod: string;
  };
}

const PaymentSuccess = ({ onNavigate, transactionData }: PaymentSuccessProps) => {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="payment-success-page">
      <div className="success-content">
        <div className="success-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" stroke="#2e7d32" strokeWidth="2"/>
            <path d="M14 24L20 30L34 16" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 className="success-title">Payment Successful</h1>
        <p className="success-message">
          {transactionData.grams} grams of gold has been credited to your account
        </p>

        <div className="transaction-details">
          <div className="detail-row">
            <span className="detail-label">Transaction ID</span>
            <span className="detail-value">{transactionData.transactionId}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date & Time</span>
            <span className="detail-value">{formatDate(transactionData.timestamp)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Amount Paid</span>
            <span className="detail-value">₹{parseFloat(transactionData.total).toLocaleString()}</span>
          </div>
        </div>

        <div className="success-actions">
          <button 
            className="action-button primary"
            onClick={() => onNavigate('payment-details', transactionData)}
          >
            View Payment Details
          </button>
          <button 
            className="action-button secondary"
            onClick={() => onNavigate('portfolio')}
          >
            Go to Portfolio
          </button>
        </div>

        <p className="confirmation-note">
          A confirmation email has been sent to your registered email address
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
