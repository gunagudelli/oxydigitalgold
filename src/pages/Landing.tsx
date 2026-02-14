import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const goldRate = 16450;

  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">Buy Digital Gold</h1>
          <p className="hero-subtitle">
           Start saving from ₹100 • 999 Pure Gold • Secure Vault Storage
          </p>
          <div className="live-price-banner">
            <span className="price-label">24k Gold Price</span>
            <span className="price-value">₹{goldRate.toLocaleString()} / gram</span>
            <span className="live-indicator">● LIVE</span>
          </div>
          <button className="cta-primary" onClick={() => navigate('/buy-gold')}>
            Start Digital Gold Journey
          </button>
        </div>
      </section>

      <section className="why-section">
        <div className="content-container">
          <h2 className="section-title">Why Digital Gold?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>100% Secure</h3>
              <p>Your gold is stored in insured vaults with bank-grade security</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3>999 Pure</h3>
              <p>Certified 24K gold with guaranteed purity and authenticity</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Liquidity</h3>
              <p>Buy or sell anytime at live market prices with zero hassle</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>No Storage Worries</h3>
              <p>No locker fees, no safety concerns - we handle everything</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="content-container">
          <h2>Ready to begin your digital gold journey?</h2>
          <p>Trusted by thousands for secure gold purchases</p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => navigate('/buy-gold')}>
              Buy Gold Now
            </button>
            <button className="btn-secondary" onClick={() => navigate('/how-it-works')}>
              Learn How It Works
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
