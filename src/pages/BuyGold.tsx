import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BuyGold.css';

interface BuyGoldProps {
  onDataPass: (data: any) => void;
}

const BuyGold = ({ onDataPass }: BuyGoldProps) => {
  const navigate = useNavigate();
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
    
    onDataPass({ amount, buyMode, goldRate });
    navigate('/order-summary');
  };

  return (
    <div className="buy-gold-page">
      <section className="buy-hero">
        <div className="hero-wrapper">
          <h1>Buy Digital Gold</h1>
          <p>24K • 999 Purity • Secure Vault Storage.</p>
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
              <div className="trust-icon">🔒</div>
              <div>
                <div className="trust-heading">Bank-Grade Security</div>
                <div className="trust-subtext">Your gold is 100% secure in insured vaults</div>
              </div>
            </div>
            <div className="trust-row">
              <div className="trust-icon">⚡</div>
              <div>
                <div className="trust-heading">Instant Trading</div>
                <div className="trust-subtext">Buy and sell anytime at live market prices</div>
              </div>
            </div>
            <div className="trust-row">
              <div className="trust-icon">✓</div>
              <div>
                <div className="trust-heading">Transparent Pricing</div>
                <div className="trust-subtext">All taxes and charges included upfront</div>
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

            <div className="inline-disclaimer">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#999" strokeWidth="1.5"/>
                <path d="M8 7V11M8 5V5.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Gold prices are dynamic and may change until confirmation</span>
            </div>

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
