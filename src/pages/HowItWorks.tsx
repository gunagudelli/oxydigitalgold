import '../styles/HowItWorks.css';

interface HowItWorksProps {
  onNavigate: (page: string) => void;
}

const HowItWorks = ({ onNavigate }: HowItWorksProps) => {
  const steps = [
    {
      number: 1,
      title: 'Check Live Price',
      description: 'View real-time gold rates updated every minute'
    },
    {
      number: 2,
      title: 'Choose Amount',
      description: 'Buy in rupees or grams starting from just ₹100'
    },
    {
      number: 3,
      title: 'Pay Securely',
      description: 'Complete payment through secure payment gateway'
    },
    {
      number: 4,
      title: 'Gold Stored in Vault',
      description: 'Your gold is stored in insured, secure vaults'
    },
    {
      number: 5,
      title: 'Track & Sell Anytime',
      description: 'Monitor your portfolio and sell at live prices'
    }
  ];

  return (
    <div className="how-it-works-page">
      <section className="page-hero">
        <div className="hero-content">
          <h1>How Digital Gold Works</h1>
          <p>Simple, secure, and transparent - start investing in 5 easy steps</p>
        </div>
      </section>

      <section className="timeline-section">
        <div className="timeline-container">
          <div className="timeline-line"></div>
          <div className="steps-grid">
            {steps.map((step) => (
              <div key={step.number} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="content-wrapper">
          <h2>Why Choose Digital Gold?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <h4>No Making Charges</h4>
              <p>Unlike physical gold, pay only for the gold you buy</p>
            </div>
            <div className="benefit-item">
              <h4>Start Small</h4>
              <p>Start buying digital gold from just ₹100 </p>
            </div>
            <div className="benefit-item">
              <h4>24/7 Trading</h4>
              <p>Buy or sell anytime at live market prices</p>
            </div>
            <div className="benefit-item">
              <h4>Certified Purity</h4>
              <p>24K gold with 99.5% purity and certified authenticity  </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-bottom">
        <h2>Ready to get started?</h2>
        <button className="cta-btn" onClick={() => onNavigate('buy')}>
         Start Your Gold Journey Now
        </button>
      </section>
    </div>
  );
};

export default HowItWorks;
