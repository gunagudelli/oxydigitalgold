import { useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import HowItWorks from './pages/HowItWorks';
import BuyGold from './pages/BuyGold';
import SellGold from './pages/SellGold';
import OrderSummary from './pages/OrderSummary';
import PaymentMethod from './pages/PaymentMethod';
import PaymentProcessing from './pages/PaymentProcessing';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentDetails from './pages/PaymentDetails';
import SellSummary from './pages/SellSummary';
import SellProcessing from './pages/SellProcessing';
import SellSuccess from './pages/SellSuccess';
import BankAccount from './pages/BankAccount';
import TermsConditions from './pages/TermsConditions';
import Portfolio from './pages/Portfolio';
import FAQ from './pages/FAQ';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [transactionData, setTransactionData] = useState(null);

  const handleNavigate = (page: string, data?: any) => {
    if (data) {
      setTransactionData(data);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={handleNavigate} />;
      case 'how-it-works':
        return <HowItWorks onNavigate={handleNavigate} />;
      case 'buy':
        return <BuyGold onNavigate={handleNavigate} />;
      case 'sell':
        return <SellGold onNavigate={handleNavigate} />;
      case 'order-summary':
        return <OrderSummary onNavigate={handleNavigate} orderData={transactionData} />;
      case 'payment-method':
        return <PaymentMethod onNavigate={handleNavigate} paymentData={transactionData} />;
      case 'payment-processing':
        return <PaymentProcessing onNavigate={handleNavigate} paymentData={transactionData} />;
      case 'payment-success':
        return <PaymentSuccess onNavigate={handleNavigate} transactionData={transactionData} />;
      case 'payment-details':
        return <PaymentDetails onNavigate={handleNavigate} transactionData={transactionData} />;
      case 'sell-summary':
        return <SellSummary onNavigate={handleNavigate} sellData={transactionData} />;
      case 'bank-account':
        return <BankAccount onNavigate={handleNavigate} sellData={transactionData} />;
      case 'terms-conditions':
        return <TermsConditions onNavigate={handleNavigate} termsData={transactionData} flowType={transactionData?.flowType || 'buy'} />;
      case 'sell-processing':
        return <SellProcessing onNavigate={handleNavigate} sellData={transactionData} />;
      case 'sell-success':
        return <SellSuccess onNavigate={handleNavigate} sellData={transactionData} />;
      case 'portfolio':
        return <Portfolio onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQ onNavigate={handleNavigate} />;
      default:
        return <Landing onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app">
      {!['payment-processing', 'sell-processing'].includes(currentPage) && (
        <Header 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
        />
      )}
      <div className="page-container">
        {renderPage()}
      </div>
      {!['payment-processing', 'sell-processing'].includes(currentPage) && <Footer />}
    </div>
  );
}

export default App;
