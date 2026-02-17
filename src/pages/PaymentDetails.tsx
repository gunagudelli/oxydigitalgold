import { useNavigate } from 'react-router-dom';
import '../styles/PaymentDetails.css';

interface PaymentDetailsProps {
  transactionData: {
    transactionId?: string;
    timestamp?: string;
    grams: string;
    rupees: string;
    gst: string;
    total: string;
    goldRate: number;
    paymentMethod?: string;
  };
}

const PaymentDetails = ({ transactionData }: PaymentDetailsProps) => {
  const navigate = useNavigate();
  
  if (!transactionData) {
    navigate('/buy-gold');
    return null;
  }
  
  const txnId = transactionData.transactionId || `TXN${Date.now()}`;
  const txnTime = transactionData.timestamp || new Date().toISOString();
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getPaymentMethodName = (method?: string) => {
    if (!method) return 'UPI';
    const methods: { [key: string]: string } = {
      'upi': 'UPI',
      'debit': 'Debit Card',
      'credit': 'Credit Card',
      'netbanking': 'Net Banking'
    };
    return methods[method] || method;
  };

  return (
    <div className="payment-details-page">
      <div className="details-container">
        <div className="details-header">
          <button className="back-button" onClick={() => navigate('/portfolio')}>
            ← Back to Portfolio
          </button>
          <div className="header-content">
            <h1 className="page-title">Payment Receipt</h1>
            <div className="status-badge">
              <div className="status-indicator"></div>
              <span>COMPLETED</span>
            </div>
          </div>
        </div>

        <div className="receipt-card">
          <div className="receipt-header">
            <div className="company-info">
              <h2>Digital Gold</h2>
              <p>Payment Receipt</p>
            </div>
            <div className="receipt-meta">
              <div className="meta-item">
                <span className="meta-label">Transaction ID</span>
                <span className="meta-value">{txnId}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Date</span>
                <span className="meta-value">{formatDate(txnTime)}</span>
              </div>
            </div>
          </div>

          <div className="receipt-section">
            <h3 className="section-heading">Transaction Details</h3>
            <table className="details-table">
              <tbody>
                <tr>
                  <td className="table-label">Payment Method</td>
                  <td className="table-value">{getPaymentMethodName(transactionData.paymentMethod)}</td>
                </tr>
                <tr>
                  <td className="table-label">Status</td>
                  <td className="table-value status-success">Completed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="receipt-section">
            <h3 className="section-heading">Purchase Details</h3>
            <table className="details-table">
              <tbody>
                <tr>
                  <td className="table-label">Gold Rate</td>
                  <td className="table-value">₹{transactionData.goldRate.toLocaleString()} per gram</td>
                </tr>
                <tr>
                  <td className="table-label">Quantity</td>
                  <td className="table-value">{transactionData.grams} grams</td>
                </tr>
                <tr>
                  <td className="table-label">Purity</td>
                  <td className="table-value">24K • 999</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="receipt-section">
            <h3 className="section-heading">Payment Breakdown</h3>
            <table className="details-table">
              <tbody>
                <tr>
                  <td className="table-label">Gold Value</td>
                  <td className="table-value">₹{parseFloat(transactionData.rupees).toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="table-label">GST (3%)</td>
                  <td className="table-value">₹{parseFloat(transactionData.gst).toLocaleString()}</td>
                </tr>
                <tr className="total-row">
                  <td className="table-label">Total Amount Paid</td>
                  <td className="table-value">₹{parseFloat(transactionData.total).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="details-actions">
          <button className="action-btn secondary" onClick={() => window.print()}>
            Download Receipt
          </button>
          <button className="action-btn primary" onClick={() => navigate('/portfolio')}>
            View Portfolio
          </button>
        </div>

        <p className="support-text">
          For any queries, contact us at support@digitalgold.com
        </p>
      </div>
    </div>
  );
};

export default PaymentDetails;
