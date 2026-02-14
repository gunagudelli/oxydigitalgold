import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BankAccount.css';

interface BankAccountProps {
  sellData: any;
  onDataPass: (data: any) => void;
}

const BankAccount = ({ sellData, onDataPass }: BankAccountProps) => {
  const navigate = useNavigate();
  const [accountHolder, setAccountHolder] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [bankSearchQuery, setBankSearchQuery] = useState('');

  const bankList = [
    'Axis Bank',
    'Bank of Baroda',
    'Bank of India',
    'Bank of Maharashtra',
    'Canara Bank',
    'Central Bank of India',
    'City Union Bank',
    'DCB Bank',
    'Dhanlaxmi Bank',
    'Federal Bank',
    'HDFC Bank',
    'ICICI Bank',
    'IDBI Bank',
    'IDFC First Bank',
    'Indian Bank',
    'Indian Overseas Bank',
    'IndusInd Bank',
    'Jammu & Kashmir Bank',
    'Karnataka Bank',
    'Karur Vysya Bank',
    'Kotak Mahindra Bank',
    'Lakshmi Vilas Bank',
    'Punjab & Sind Bank',
    'Punjab National Bank',
    'RBL Bank',
    'South Indian Bank',
    'State Bank of India',
    'UCO Bank',
    'Union Bank of India',
    'Yes Bank'
  ];

  const filteredBanks = bankList.filter(bank =>
    bank.toLowerCase().includes(bankSearchQuery.toLowerCase())
  );

  const validateForm = () => {
    const newErrors: any = {};

    if (!accountHolder.trim()) {
      newErrors.accountHolder = 'Account holder name is required';
    } else if (accountHolder.trim().length < 3) {
      newErrors.accountHolder = 'Name must be at least 3 characters';
    }

    if (!bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }

    if (!accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    } else if (!/^\d{9,18}$/.test(accountNumber)) {
      newErrors.accountNumber = 'Invalid account number (9-18 digits)';
    }

    if (!confirmAccountNumber) {
      newErrors.confirmAccountNumber = 'Please confirm account number';
    } else if (accountNumber !== confirmAccountNumber) {
      newErrors.confirmAccountNumber = 'Account numbers do not match';
    }

    if (!ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode.toUpperCase())) {
      newErrors.ifscCode = 'Invalid IFSC code format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Mask account number for display
    const maskedAccount = accountNumber.slice(0, 4) + 'XXXX' + accountNumber.slice(-4);

    onDataPass({
      ...sellData,
      bankDetails: {
        accountHolder,
        bankName,
        accountNumber: maskedAccount,
        ifscCode: ifscCode.toUpperCase()
      }
    });
    navigate('/sell-processing');
  };

  return (
    <div className="bank-account-page" onClick={() => setShowBankDropdown(false)}>
      <div className="bank-account-container" onClick={(e) => e.stopPropagation()}>
        <div className="bank-account-header">
          <button className="back-button" onClick={() => navigate('/sell-summary')}>
            ← Back
          </button>
          <h1 className="page-title">Add Bank Account</h1>
          <p className="page-subtitle">Enter your bank details to receive funds</p>
        </div>

        <div className="bank-form-card">
          <div className="info-banner">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#0369a1" strokeWidth="1.5"/>
              <path d="M8 7V11M8 5V5.5" stroke="#0369a1" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p>Funds will be credited to this account within T+1 working day</p>
          </div>

          <div className="form-group full-width bank-dropdown-wrapper">
            <label className="form-label">Bank Name</label>
            <div className="bank-select-container">
              <input
                type="text"
                className={`form-input ${errors.bankName ? 'error' : ''}`}
                placeholder="Select your bank"
                value={bankName}
                onFocus={() => setShowBankDropdown(true)}
                onChange={(e) => {
                  setBankName(e.target.value);
                  setBankSearchQuery(e.target.value);
                  setShowBankDropdown(true);
                  setErrors({ ...errors, bankName: '' });
                }}
                readOnly={!showBankDropdown}
              />
              <svg className="dropdown-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              {showBankDropdown && (
                <div className="bank-dropdown">
                  <div className="bank-search">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="7" cy="7" r="5" stroke="#666" strokeWidth="1.5"/>
                      <path d="M11 11L14 14" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <input
                      type="text"
                      className="bank-search-input"
                      placeholder="Search bank..."
                      value={bankSearchQuery}
                      onChange={(e) => setBankSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="bank-list">
                    {filteredBanks.length > 0 ? (
                      filteredBanks.map((bank) => (
                        <div
                          key={bank}
                          className="bank-item"
                          onClick={() => {
                            setBankName(bank);
                            setShowBankDropdown(false);
                            setBankSearchQuery('');
                            setErrors({ ...errors, bankName: '' });
                          }}
                        >
                          {bank}
                        </div>
                      ))
                    ) : (
                      <div className="bank-item no-results">No banks found</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {errors.bankName && <span className="error-text">{errors.bankName}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Account Holder Name</label>
              <input
                type="text"
                className={`form-input ${errors.accountHolder ? 'error' : ''}`}
                placeholder="As per bank records"
                value={accountHolder}
                onChange={(e) => {
                  setAccountHolder(e.target.value.toUpperCase());
                  setErrors({ ...errors, accountHolder: '' });
                }}
              />
              {errors.accountHolder && <span className="error-text">{errors.accountHolder}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">IFSC Code</label>
              <input
                type="text"
                className={`form-input ${errors.ifscCode ? 'error' : ''}`}
                placeholder="e.g., SBIN0001234"
                value={ifscCode}
                onChange={(e) => {
                  setIfscCode(e.target.value.toUpperCase());
                  setErrors({ ...errors, ifscCode: '' });
                }}
                maxLength={11}
              />
              {errors.ifscCode && <span className="error-text">{errors.ifscCode}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Account Number</label>
              <input
                type="text"
                inputMode="numeric"
                className={`form-input ${errors.accountNumber ? 'error' : ''}`}
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setAccountNumber(value);
                  setErrors({ ...errors, accountNumber: '' });
                }}
                maxLength={18}
              />
              {errors.accountNumber && <span className="error-text">{errors.accountNumber}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Account Number</label>
              <input
                type="text"
                inputMode="numeric"
                className={`form-input ${errors.confirmAccountNumber ? 'error' : ''}`}
                placeholder="Re-enter account number"
                value={confirmAccountNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setConfirmAccountNumber(value);
                  setErrors({ ...errors, confirmAccountNumber: '' });
                }}
                maxLength={18}
              />
              {errors.confirmAccountNumber && <span className="error-text">{errors.confirmAccountNumber}</span>}
            </div>
          </div>

          <div className="security-note">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L3 4V7C3 10 5 12.5 8 13C11 12.5 13 10 13 7V4L8 2Z" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 8L7.5 9.5L10 7" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Bank details are encrypted and stored securely</span>
          </div>

          <button className="submit-button" onClick={handleSubmit}>
            Verify & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankAccount;
