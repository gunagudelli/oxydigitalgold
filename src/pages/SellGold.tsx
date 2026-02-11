import { useState, useEffect } from 'react';
import '../styles/SellGold.css';

interface SellGoldProps {
  onNavigate: (page: string, data?: any) => void;
}

const SellGold = ({ onNavigate }: SellGoldProps) => {
  const [goldRate, setGoldRate] = useState(16450);
  const sellRate = goldRate - 100; // Sell rate slightly lower
  const availableGold = 5.234; // Mock user balance in grams
  const availableValue = availableGold * sellRate;
  const MIN_SELL_AMOUNT = 100; // Minimum ₹100

  const [sellMode, setSellMode] = useState<'rupees' | 'grams'>('rupees');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  // Simulate live price updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGoldRate(prev => {
        const change = (Math.random() - 0.5) * 50;
        return Math.round(prev + change);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAmountChange = (value: string) => {
    // Allow only valid decimal input
    if (value && !/^\d*\.?\d{0,3}$/.test(value)) return;
    
    setAmount(value);
    setError('');

    const numValue = parseFloat(value);
    if (!value || isNaN(numValue) || numValue <= 0) return;

    // Validate minimum amount
    if (sellMode === 'rupees' && numValue < MIN_SELL_AMOUNT) {
      setError(`Minimum sell amount is ₹${MIN_SELL_AMOUNT}`);
      return;
    }

    // Validate against available balance
    if (sellMode === 'grams' && numValue > availableGold) {
      setError(`Insufficient balance. Available: ${availableGold.toFixed(3)} grams`);
    } else if (sellMode === 'rupees' && numValue > availableValue) {
      setError(`Insufficient balance. Available: ₹${availableValue.toFixed(2)}`);
    }
  };

  const getConversionText = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return '';

    if (sellMode === 'rupees') {
      const grams = (numAmount / sellRate).toFixed(3);
      return `≈ ${grams} grams of 24K gold`;
    } else {
      const rupees = (numAmount * sellRate).toFixed(2);
      return `≈ ₹${rupees}`;
    }
  };

  const handleSell = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (error) return;

    onNavigate('sell-summary', {
      amount,
      sellMode,
      sellRate,
      availableGold,
      lockedAt: new Date().toISOString()
    });
  };

  // Empty state - no gold balance
  if (availableGold === 0) {
    return (
      <div className="sell-gold-page">
        <div className="empty-state-container">
          <div className="empty-state-card">
            <div className="empty-icon">📊</div>
            <h2 className="empty-title">No Gold Available</h2>
            <p className="empty-message">
              You don't have any gold in your portfolio to sell.
              Start investing today to build your digital gold holdings.
            </p>
            <button className="empty-cta-btn" onClick={() => onNavigate('buy')}>
              Buy Gold Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sell-gold-page">
      <div className="sell-hero">
        <div className="hero-wrapper">
          <h1>Sell Digital Gold</h1>
          <p>Get instant credit at live market rates</p>
          <div className="live-rate-box">
            <span className="rate-text">Live Sell Rate</span>
            <span className="rate-amount">₹{sellRate.toLocaleString()}</span>
            <span className="live-dot">● LIVE</span>
          </div>
        </div>
      </div>

      <div className="sell-main-content">
        <div className="left-section">
          <div className="balance-box">
            <h3 className="box-title">Available Balance</h3>
            <div className="balance-amount">{availableGold.toFixed(3)} g</div>
            <div className="balance-value">≈ ₹{availableValue.toLocaleString()}</div>
            <div className="price-update-note">Rates update every 5 seconds</div>
          </div>

          <div className="trust-box">
            <div className="trust-row">
              <span className="trust-emoji">⚡</span>
              <div>
                <div className="trust-heading">Instant Settlement</div>
                <div className="trust-subtext">T+1 working day credit</div>
              </div>
            </div>
            <div className="trust-row">
              <span className="trust-emoji">💰</span>
              <div>
                <div className="trust-heading">Live Market Rates</div>
                <div className="trust-subtext">Best prices guaranteed</div>
              </div>
            </div>
            <div className="trust-row">
              <span className="trust-emoji">🔒</span>
              <div>
                <div className="trust-heading">Secure & Compliant</div>
                <div className="trust-subtext">RBI regulated process</div>
              </div>
            </div>
          </div>

          <div className="disclaimer-box">
            <h4 className="disclaimer-title">Important Information</h4>
            <ul className="disclaimer-list">
              <li>Minimum sell amount: ₹{MIN_SELL_AMOUNT}</li>
              <li>Rates are market-linked and subject to change</li>
              <li>Price locked for 15 seconds post-confirmation</li>
              <li>Settlement: T+1 working day to registered bank account</li>
              <li>TDS and processing charges applicable as per regulations</li>
            </ul>
          </div>
        </div>

        <div className="right-section">
          <div className="sell-box">
            <div className="mode-toggle">
              <button
                className={`mode-btn ${sellMode === 'rupees' ? 'active' : ''}`}
                onClick={() => { setSellMode('rupees'); setAmount(''); setError(''); }}
              >
                Sell in ₹
              </button>
              <button
                className={`mode-btn ${sellMode === 'grams' ? 'active' : ''}`}
                onClick={() => { setSellMode('grams'); setAmount(''); setError(''); }}
              >
                Sell in Grams
              </button>
            </div>

            <input
              type="text"
              inputMode="decimal"
              className={`sell-input ${error ? 'error' : ''}`}
              placeholder={sellMode === 'rupees' ? `Min ₹${MIN_SELL_AMOUNT}` : 'Enter grams (e.g., 0.500)'}
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
            />

            {error && <div className="error-message">{error}</div>}

            {amount && !error && (
              <div className="conversion-info">{getConversionText()}</div>
            )}

            <div className="quick-chips">
              <button className="chip-btn" onClick={() => handleAmountChange('1000')}>
                ₹1,000
              </button>
              <button className="chip-btn" onClick={() => handleAmountChange('2500')}>
                ₹2,500
              </button>
              <button className="chip-btn" onClick={() => handleAmountChange('5000')}>
                ₹5,000
              </button>
              <button className="chip-btn" onClick={() => handleAmountChange(availableValue.toFixed(2))}>
                Sell All
              </button>
            </div>

            <button
              className="primary-sell-btn"
              onClick={handleSell}
              disabled={!amount || !!error || parseFloat(amount) <= 0}
            >
              {!amount || !!error ? 'Enter Valid Amount' : 'Review Sell Order'}
            </button>

            <div className="sell-info">
              Funds will be credited to your registered bank account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellGold;
