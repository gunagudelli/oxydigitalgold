import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentProcessing.css';

interface PaymentProcessingProps {
  paymentData: any;
}

const PaymentProcessing = ({ paymentData }: PaymentProcessingProps) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/payment-success');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="payment-processing-page">
      <div className="processing-content">
        <div className="processing-icon">
          <div className="loader-ring"></div>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="6" y="14" width="20" height="14" rx="2" stroke="#1a1a1a" strokeWidth="2"/>
            <path d="M10 14V10C10 6.68629 12.6863 4 16 4C19.3137 4 22 6.68629 22 10V14" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        
        <h1 className="processing-title">Processing payment securely</h1>
        <p className="processing-subtitle">Please do not close this window or press back button</p>
        
        <div className="processing-status">
          <div className="status-item">
            <div className="status-dot active"></div>
            <span>Verifying payment details</span>
          </div>
          <div className="status-item">
            <div className="status-dot"></div>
            <span>Confirming transaction</span>
          </div>
          <div className="status-item">
            <div className="status-dot"></div>
            <span>Updating your account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
