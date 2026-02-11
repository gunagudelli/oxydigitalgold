import { useState } from 'react';
import '../styles/TermsConditions.css';

interface TermsConditionsProps {
  onNavigate: (page: string, data?: any) => void;
  termsData: any;
  flowType: 'buy' | 'sell';
}

const TermsConditions = ({ onNavigate, termsData, flowType }: TermsConditionsProps) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleProceed = () => {
    if (flowType === 'buy') {
      onNavigate('payment-method', termsData);
    } else {
      onNavigate('sell-processing', termsData);
    }
  };

  return (
    <div className="terms-page">
      <div className="terms-container">
        <div className="terms-header">
          <button 
            className="back-button" 
            onClick={() => onNavigate(flowType === 'buy' ? 'order-summary' : 'sell-summary', termsData)}
          >
            ← Back
          </button>
          <h1 className="page-title">Terms & Conditions</h1>
        </div>

        <div className="terms-content">
          <div className="terms-scroll-box">
            {flowType === 'buy' ? (
              <>
                <section className="terms-section">
                  <h2>1. Dynamic Pricing</h2>
                  <p>Gold prices are market-linked and subject to real-time fluctuations. The rate displayed at the time of transaction initiation is locked for a limited period (typically 5 minutes). If the transaction is not completed within this timeframe, the price may change based on current market rates.</p>
                </section>

                <section className="terms-section">
                  <h2>2. GST Applicability</h2>
                  <p>Goods and Services Tax (GST) at the applicable rate (currently 3%) is levied on all gold purchases as per Indian tax regulations. The GST amount is clearly displayed in the order summary and is included in the total payable amount.</p>
                </section>

                <section className="terms-section">
                  <h2>3. Vault Storage</h2>
                  <p>All purchased gold is stored in secure, insured vaults maintained by our authorized vault partners. The gold is held in your name and is 99.5% pure (24K). You can view your holdings in your portfolio at any time.</p>
                </section>

                <section className="terms-section">
                  <h2>4. No Cancellation Policy</h2>
                  <p>Once a purchase transaction is confirmed and payment is processed, it cannot be cancelled or reversed. Please review your order carefully before proceeding with payment. You may sell your gold holdings at any time at the prevailing market rate.</p>
                </section>

                <section className="terms-section">
                  <h2>5. KYC Requirement</h2>
                  <p>As per regulatory guidelines, KYC (Know Your Customer) verification is mandatory for all users. Transactions may be subject to limits based on your KYC status. Complete KYC is required for transactions exceeding specified thresholds.</p>
                </section>

                <section className="terms-section">
                  <h2>6. Payment Security</h2>
                  <p>All payments are processed through secure, PCI DSS compliant payment gateways. We do not store your card details or banking credentials. Your payment information is encrypted and transmitted securely.</p>
                </section>

                <section className="terms-section">
                  <h2>7. Transaction Confirmation</h2>
                  <p>Gold will be credited to your account instantly upon successful payment confirmation. You will receive a transaction confirmation via email and SMS. A detailed invoice will be available for download in your transaction history.</p>
                </section>

                <section className="terms-section">
                  <h2>8. Regulatory Compliance</h2>
                  <p>This service is operated in compliance with RBI guidelines, SEBI regulations, and applicable Indian laws. We reserve the right to refuse or cancel transactions that do not meet regulatory requirements.</p>
                </section>
              </>
            ) : (
              <>
                <section className="terms-section">
                  <h2>1. Live Sell Price</h2>
                  <p>Sell prices are based on real-time market rates and are locked for a limited period (typically 15 seconds). The locked rate is displayed on the review screen. If the lock period expires, you will need to refresh and get a new price quote.</p>
                </section>

                <section className="terms-section">
                  <h2>2. Settlement Timeline</h2>
                  <p>Funds from gold sales are credited to your registered bank account on a T+1 basis (next working day from transaction date). Settlement may be delayed due to bank holidays, weekends, or technical issues beyond our control.</p>
                </section>

                <section className="terms-section">
                  <h2>3. Bank Verification</h2>
                  <p>Payouts are made only to bank accounts that have been verified and registered in your name. For security reasons, we do not support third-party bank account transfers. Please ensure your bank details are accurate before confirming the sale.</p>
                </section>

                <section className="terms-section">
                  <h2>4. Tax Deduction at Source (TDS)</h2>
                  <p>As per Section 194Q of the Income Tax Act, 1961, TDS at the applicable rate (currently 1%) is deducted from the gross sale value for transactions exceeding specified limits. A TDS certificate will be provided for your tax filing purposes.</p>
                </section>

                <section className="terms-section">
                  <h2>5. Processing Fees</h2>
                  <p>A processing fee (currently 1% of transaction value) is charged to cover transaction costs, vault management, compliance, and operational expenses. This fee is clearly displayed in the payout calculation before confirmation.</p>
                </section>

                <section className="terms-section">
                  <h2>6. No Reversal Policy</h2>
                  <p>Once a sell order is confirmed, it cannot be cancelled or reversed. The gold will be debited from your account immediately, and the payout process will be initiated. Please review all details carefully before confirming.</p>
                </section>

                <section className="terms-section">
                  <h2>7. PAN Requirement</h2>
                  <p>For transactions exceeding regulatory thresholds (currently ₹2 lakhs per financial year), PAN verification is mandatory. Higher TDS rates may apply if PAN is not provided. Ensure your PAN is linked to your account for seamless transactions.</p>
                </section>

                <section className="terms-section">
                  <h2>8. Regulatory Compliance</h2>
                  <p>This service operates under RBI guidelines, Income Tax regulations, and applicable Indian laws. We reserve the right to refuse or cancel transactions that do not meet regulatory requirements or appear suspicious.</p>
                </section>
              </>
            )}
          </div>

          <div className="terms-acceptance">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                checked={isAccepted}
                onChange={(e) => setIsAccepted(e.target.checked)}
              />
              <span className="checkmark"></span>
              <span className="checkbox-label">
                I have read and agree to the Terms & Conditions and Disclaimer
              </span>
            </label>

            <button 
              className="proceed-button" 
              onClick={handleProceed}
              disabled={!isAccepted}
            >
              {flowType === 'buy' ? 'Proceed to Payment' : 'Confirm & Sell Gold'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
