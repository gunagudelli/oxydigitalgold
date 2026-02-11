import '../styles/OrderSummary.css';

interface OrderSummaryProps {
  onNavigate: (page: string, data?: any) => void;
  orderData: {
    amount: string;
    buyMode: 'rupees' | 'grams';
    goldRate: number;
  };
}

const OrderSummary = ({ onNavigate, orderData }: OrderSummaryProps) => {
  const { amount, buyMode, goldRate } = orderData;
  const numAmount = parseFloat(amount);
  
  const grams = buyMode === 'rupees' 
    ? (numAmount / goldRate).toFixed(3) 
    : numAmount.toFixed(3);
  
  const rupees = buyMode === 'rupees' 
    ? numAmount 
    : numAmount * goldRate;
  
  const gst = rupees * 0.03;
  const total = rupees + gst;

  const handleProceed = () => {
    onNavigate('payment-method', {
      grams,
      rupees: rupees.toFixed(2),
      gst: gst.toFixed(2),
      total: total.toFixed(2),
      goldRate
    });
  };

  return (
    <div className="order-summary-page">
      <div className="order-summary-container">
        <div className="order-summary-header">
          <button className="back-button" onClick={() => onNavigate('buy')}>
            ← Back to Buy Gold
          </button>
          <h1 className="page-title">Review Your Order</h1>
        </div>

        <div className="order-content">
          <div className="order-details-card">
            <div className="card-section">
              <h2 className="section-title">Order Details</h2>
              
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Gold Rate</span>
                  <span className="detail-value">₹{goldRate.toLocaleString()} per gram</span>
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

            <div className="divider"></div>

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

            <div className="info-box">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#0369a1" strokeWidth="1.5"/>
                <path d="M8 7V11M8 5V5.5" stroke="#0369a1" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p>Gold will be credited to your account instantly after payment confirmation</p>
            </div>

            <button className="proceed-button" onClick={handleProceed}>
              Proceed to Payment
            </button>
          </div>

          <div className="security-info">
            <div className="security-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 5V9C3 13.5 6 17 10 18C14 17 17 13.5 17 9V5L10 2Z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Secure Payment Gateway</span>
            </div>
            <div className="security-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="8" width="14" height="9" rx="2" stroke="#666" strokeWidth="1.5"/>
                <path d="M7 8V6C7 4.34315 8.34315 3 10 3C11.6569 3 13 4.34315 13 6V8" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>256-bit Encryption</span>
            </div>
            <div className="security-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9 16L4 11L5.5 9.5L9 13L14.5 7.5L16 9L9 16Z" fill="#666"/>
              </svg>
              <span>PCI DSS Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
