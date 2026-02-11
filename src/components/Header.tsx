import { useState } from 'react';
import '../styles/Header.css';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <h1 className="logo" onClick={() => handleNavigate('landing')}>OXYGOLD</h1>
        
        <button 
          className="hamburger-menu" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <button 
            className={currentPage === 'landing' ? 'active' : ''} 
            onClick={() => handleNavigate('landing')}
          >
            Home
          </button>
          <button 
            className={currentPage === 'how-it-works' ? 'active' : ''} 
            onClick={() => handleNavigate('how-it-works')}
          >
            How It Works
          </button>
          <button 
            className={currentPage === 'buy' ? 'active' : ''} 
            onClick={() => handleNavigate('buy')}
          >
            Buy Gold
          </button>
          <button 
            className={currentPage === 'portfolio' ? 'active' : ''} 
            onClick={() => handleNavigate('portfolio')}
          >
            Portfolio
          </button>
          <button 
            className={currentPage === 'faq' ? 'active' : ''} 
            onClick={() => handleNavigate('faq')}
          >
            FAQ
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
