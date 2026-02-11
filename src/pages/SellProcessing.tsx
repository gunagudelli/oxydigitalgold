import { useEffect } from 'react';
import '../styles/SellProcessing.css';

interface SellProcessingProps {
  onNavigate: (page: string, data?: any) => void;
  sellData: any;
}

const SellProcessing = ({ onNavigate, sellData }: SellProcessingProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate('sell-success', sellData);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNavigate, sellData]);

  return (
    <div className="sell-processing-page">
      <div className="processing-container">
        <div className="processing-spinner"></div>
        <h2 className="processing-title">Processing Your Sell Order</h2>
        <p className="processing-message">Please wait while we process your transaction...</p>
        
        <div className="processing-steps">
          <div className="step-item">
            <div className="step-icon">✓</div>
            <span>Verifying gold balance</span>
          </div>
          <div className="step-item">
            <div className="step-icon">✓</div>
            <span>Calculating sell value</span>
          </div>
          <div className="step-item active">
            <div className="step-icon">⟳</div>
            <span>Processing transaction</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellProcessing;
