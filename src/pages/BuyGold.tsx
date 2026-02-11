import { useState } from 'react';
import '../styles/BuyGold.css';

interface BuyGoldProps {
  onNavigate: (page: string, data?: any) => void;
}

const BuyGold = ({ onNavigate }: BuyGoldProps) => {
  const [buyMode, setBuyMode] = useState<'rupees' | 'grams'>('rupees');
  const [amount, setAmount] = useState('');
  const goldBalance = 2.45;
  const goldRate = 16450;

  const handleBuyGold = () => {
    const value = parseFloat(amount);
    if (!value || value <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    onNavigate('order-summary', { amount, buyMode, goldRate });
  };

  return (
    <div className="buy-gold-page">
      <section className="buy-hero">
        <div className="hero-wrapper">
          <h1>Buy Digital Gold</h1>
          <p>24K • 99.5% Pure • Secure Vault Storage.</p>
          <div className="live-rate-box">
            <span className="rate-text">Live Gold Rate:</span>
            <span className="rate-amount">₹{goldRate.toLocaleString()} / gram</span>
            <span className="live-dot">● LIVE</span>
          </div>
        </div>
      </section>

      <main className="buy-main-content">
        <section className="left-section">
          <div className="portfolio-box">
            <h3 className="box-title">Your Gold Portfolio</h3>
            <div className="portfolio-amount">₹{(goldBalance * goldRate).toLocaleString()}</div>
            <div className="portfolio-weight">{goldBalance} grams</div>
            <div className="portfolio-profit">+₹825 today's gain</div>
          </div>

          <div className="trust-box">
            <div className="trust-row">
              <span className="trust-emoji">🔒</span>
              <div>
                <div className="trust-heading">Bank-grade security</div>
                <div className="trust-subtext">Your gold is 100% secure</div>
              </div>
            </div>
            <div className="trust-row">
              <span className="trust-emoji">⚡</span>
              <div>
                <div className="trust-heading">Instant buy & sell</div>
                <div className="trust-subtext">Trade anytime at live prices</div>
              </div>
            </div>
            <div className="trust-row">
              <span className="trust-emoji">📊</span>
              <div>
                <div className="trust-heading">GST included</div>
                <div className="trust-subtext">No hidden charges</div>
              </div>
            </div>
          </div>
        </section>

        <section className="right-section">
          <div className="buy-box">
            <h3 className="box-title">Buy Gold</h3>

            <div className="mode-toggle">
              <button
                className={`mode-btn ${buyMode === 'rupees' ? 'active' : ''}`}
                onClick={() => setBuyMode('rupees')}
              >
                Buy in Rupees
              </button>
              <button
                className={`mode-btn ${buyMode === 'grams' ? 'active' : ''}`}
                onClick={() => setBuyMode('grams')}
              >
                Buy in Grams
              </button>
            </div>

            <input
              type="number"
              className="buy-input"
              placeholder={buyMode === 'rupees' ? 'Enter amount in ₹' : 'Enter grams'}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {amount && (
              <div className="conversion-info">
                {buyMode === 'rupees'
                  ? `≈ ${(parseFloat(amount) / goldRate).toFixed(3)} grams`
                  : `≈ ₹${(parseFloat(amount) * goldRate).toFixed(0)}`}
              </div>
            )}

            {buyMode === 'rupees' && (
              <div className="quick-chips">
                {[100, 500, 1000, 10000].map((value) => (
                  <button
                    key={value}
                    className="chip-btn"
                    onClick={() => setAmount(value.toString())}
                  >
                    ₹{value.toLocaleString()}
                  </button>
                ))}
              </div>
            )}

            <button className="primary-buy-btn" onClick={handleBuyGold}>
              Buy at Live Price
            </button>

            <div className="buy-info">
              Minimum purchase: ₹100 • GST included
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BuyGold;
