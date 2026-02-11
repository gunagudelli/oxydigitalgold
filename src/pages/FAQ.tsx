import { useState } from 'react';
import '../styles/FAQ.css';

interface FAQProps {
  onNavigate: (page: string) => void;
}

const FAQ = ({ onNavigate }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
  {
    question: 'What is Digital Gold?',
    answer:
      'Digital Gold allows you to buy gold online. Every gram you purchase is backed by physical gold stored securely with a trusted partner.'
  },
  {
    question: 'Who is the gold partner?',
    answer:
      'The physical gold is stored with an authorized and trusted gold partner in insured vaults, as per their terms and conditions.'
  },
  {
    question: 'Is Digital Gold regulated by RBI or SEBI?',
    answer:
      'No. Digital Gold is not regulated by RBI or SEBI. It is backed by physical gold stored with a partner, but it is not a regulated investment product.'
  },
  {
    question: 'How can I buy Digital Gold?',
    answer:
      'You can buy Digital Gold instantly using Indian Rupees (₹) or by selecting the quantity in grams. Just confirm the live price and complete the payment.'
  },
  {
    question: 'What is the minimum amount required to buy Digital Gold?',
    answer:
      'You can start buying Digital Gold with a very small amount, making it accessible even for first-time investors.'
  },
  {
    question: 'At what price is Digital Gold bought?',
    answer:
      'Digital Gold is bought at the live market price at the time of purchase, which may include partner charges.'
  },
  {
    question: 'Where is my Digital Gold stored?',
    answer:
      'Your gold is stored safely in insured vaults managed by the gold partner. You don’t need to worry about storage or security.'
  },
  {
    question: 'Can I track my Digital Gold value?',
    answer:
      'Yes. The value of your Digital Gold updates in real time based on current gold market prices.'
  },
  {
    question: 'Can I sell Digital Gold anytime?',
    answer:
      'Yes. You can sell your Digital Gold anytime through the app, subject to partner availability and terms.'
  },
  {
    question: 'At what price is Digital Gold sold?',
    answer:
      'Digital Gold is sold at the live market price at the time of selling.'
  },
  {
    question: 'How will I receive money after selling Digital Gold?',
    answer:
      'The sale amount is credited to your linked bank account or wallet as per the app’s payout flow.'
  },
  {
    question: 'Are there any charges for buying or selling?',
    answer:
      'Partner charges such as spread, GST, or minting charges (for physical conversion) may apply. These are shown during the transaction.'
  },
  {
    question: 'Is my Digital Gold insured?',
    answer:
      'Yes. The physical gold stored with the partner is insured as per their storage policy.'
  },
  {
    question: 'Can I convert Digital Gold into physical gold?',
    answer:
      'Depending on the partner’s terms, you may be able to convert Digital Gold into physical gold coins or jewellery. Additional charges may apply.'
  },
  {
    question: 'What are the risks of Digital Gold?',
    answer:
      'The value of Digital Gold depends on market prices and may fluctuate. Since it is not regulated by RBI or SEBI, users should understand the risks before investing.'
  }

  ];

  return (
    <div className="faq-page">
      <section className="faq-header">
        <div className="faq-header-content">
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about Digital Gold</p>
        </div>
      </section>

      <main className="faq-content">
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        <div className="trust-section">
          <h2>Security & Trust</h2>
          <div className="trust-grid">
            <div className="trust-card">
              <h3>🏦Trusted Vault Partners</h3>
              <p>Your gold is stored in certified, insured vaults with regular audits</p>
            </div>
            <div className="trust-card">
              <h3>🔐Advanced Security</h3>
              <p>Bank-grade encryption and multi-factor authentication for account safety</p>
            </div>
            <div className="trust-card">
              <h3>✓ Compliance</h3>
              <p>Designed in line with Indian regulatory and RBI guidelines </p>
            </div>
            <div className="trust-card">
              <h3>📜 Complete Transparency</h3>
              <p>Real-time pricing, detailed transaction history, and instant confirmations</p>
            </div>
          </div>
        </div>

        <div className="cta-section-faq">
          <h2>Still have questions?</h2>
          <p>Start your Gold journey today</p>
          <button className="cta-button" onClick={() => onNavigate('buy')}>
Start Your Gold Journey
          </button>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
