import { useNavigate } from 'react-router-dom';
import '../styles/Portfolio.css';

const Portfolio = () => {
  const navigate = useNavigate();
  const goldBalance = 2.45;
  const goldRate = 16450;
  const currentValue = goldBalance * goldRate;
  const investedAmount = 38000;
  const gain = currentValue - investedAmount;
  const gainPercent = ((gain / investedAmount) * 100).toFixed(2);

  const transactions = [
    { date: '2024-01-15', type: 'Buy', grams: 0.061, amount: 1000, status: 'Completed' },
    { date: '2024-01-10', type: 'Buy', grams: 0.305, amount: 5000, status: 'Completed' },
    { date: '2024-01-05', type: 'Buy', grams: 0.610, amount: 10000, status: 'Completed' },
    { date: '2023-12-28', type: 'Buy', grams: 1.220, amount: 20000, status: 'Completed' },
    { date: '2023-12-20', type: 'Sell', grams: 0.122, amount: 2000, status: 'Completed' }
  ];

  return (
    <div className="portfolio-page">
      <section className="portfolio-header">
        <div className="header-wrapper">
          <h1>Your Portfolio</h1>
          <p>Track your digital gold investments</p>
        </div>
      </section>

      <main className="portfolio-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Gold Holdings</div>
            <div className="stat-value">{goldBalance} grams</div>
            <div className="stat-subtext">24K • 999 Pure</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Current Value</div>
            <div className="stat-value">₹{currentValue.toLocaleString()}</div>
            <div className="stat-subtext">@ ₹{goldRate.toLocaleString()}/gram</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Total Gain/Loss</div>
            <div className="stat-value gain-positive">+₹{gain.toLocaleString()}</div>
            <div className="stat-subtext">+{gainPercent}% returns</div>
          </div>
        </div>

        <div className="action-row">
          <button className="action-btn primary" onClick={() => navigate('/buy-gold')}>
            Buy More Gold
          </button>
          <button className="action-btn secondary" onClick={() => navigate('/sell-gold')}>
            Sell Gold
          </button>
        </div>

        <div className="transactions-section">
          <h2>Transaction History</h2>
          <div className="table-container">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, index) => (
                  <tr key={index}>
                    <td>{txn.date}</td>
                    <td>
                      <span className={`type-badge ${txn.type.toLowerCase()}`}>
                        {txn.type}
                      </span>
                    </td>
                    <td>{txn.grams} g</td>
                    <td>₹{txn.amount.toLocaleString()}</td>
                    <td>
                      <span className="status-badge">{txn.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
