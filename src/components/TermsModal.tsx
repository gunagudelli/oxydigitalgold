import '../styles/TermsModal.css';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  flowType: 'buy' | 'sell';
}

const TermsModal = ({ isOpen, onClose, flowType }: TermsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="terms-modal-overlay" onClick={onClose}>
      <div className="terms-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="terms-modal-header">
          <h2>Terms & Conditions</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="terms-modal-body">
          {flowType === 'buy' ? (
            <>
              <section className="terms-section">
                <h3>1. Dynamic Pricing</h3>
                <p>Gold prices are market-linked and subject to real-time fluctuations based on international gold rates and currency exchange rates. The rate displayed at the time of transaction initiation is locked for a limited period (typically 5 minutes). If the transaction is not completed within this timeframe, the price may change based on current market rates. We reserve the right to modify prices without prior notice based on market conditions.</p>
              </section>

              <section className="terms-section">
                <h3>2. GST & Charges</h3>
                <p>Goods and Services Tax (GST) at the applicable rate (currently 3%) is levied on all gold purchases as per Indian tax regulations under the CGST Act, 2017. The GST amount is clearly displayed in the order summary and is included in the total payable amount. No additional hidden charges are applicable. All prices are inclusive of applicable taxes unless otherwise stated.</p>
              </section>

              <section className="terms-section">
                <h3>3. Vault Storage & Custody</h3>
                <p>All purchased gold is stored in secure, insured vaults maintained by our authorized vault partners who are SEBI-registered custodians. The gold is held in your name and is 99.5% pure (24K) as per BIS standards. Storage is provided free of charge. You can view your holdings in your portfolio at any time. Physical delivery options may be available subject to minimum quantity requirements and applicable charges.</p>
              </section>

              <section className="terms-section">
                <h3>4. No Cancellation Policy</h3>
                <p>Once a purchase transaction is confirmed and payment is processed successfully, it cannot be cancelled, reversed, or refunded under any circumstances. This is due to the real-time nature of gold pricing and immediate allocation of gold to your account. Please review your order carefully before proceeding with payment. You may sell your gold holdings at any time at the prevailing market rate through the sell feature.</p>
              </section>

              <section className="terms-section">
                <h3>5. KYC Requirements</h3>
                <p>As per regulatory guidelines issued by RBI and PMLA (Prevention of Money Laundering Act), KYC (Know Your Customer) verification is mandatory for all users. Transactions may be subject to limits based on your KYC status. Complete KYC with PAN verification is required for transactions exceeding ₹50,000 per financial year. We reserve the right to request additional documentation for verification purposes.</p>
              </section>

              <section className="terms-section">
                <h3>6. Payment Security</h3>
                <p>All payments are processed through secure, PCI DSS Level 1 compliant payment gateways. We use 256-bit SSL encryption for all transactions. We do not store your card details, CVV, or banking credentials on our servers. Your payment information is encrypted and transmitted securely to authorized payment processors only.</p>
              </section>

              <section className="terms-section">
                <h3>7. Transaction Confirmation</h3>
                <p>Gold will be credited to your account instantly upon successful payment confirmation from the payment gateway. You will receive a transaction confirmation via email and SMS to your registered contact details. A detailed tax invoice will be available for download in your transaction history section within 24 hours of purchase.</p>
              </section>

              <section className="terms-section">
                <h3>8. Risk Disclaimer</h3>
                <p>Investment in gold is subject to market risks. The value of your investment may fluctuate based on market conditions. Past performance is not indicative of future results. You are advised to carefully read all terms and assess your risk appetite before investing. We do not guarantee any returns or capital protection.</p>
              </section>

              <section className="terms-section">
                <h3>9. Regulatory Compliance</h3>
                <p>This service is operated in compliance with RBI guidelines, SEBI regulations, PMLA norms, and all applicable Indian laws. We reserve the right to refuse, cancel, or reverse transactions that do not meet regulatory requirements, appear suspicious, or violate our terms of service.</p>
              </section>
            </>
          ) : (
            <>
              <section className="terms-section">
                <h3>1. Live Sell Price</h3>
                <p>Sell prices are based on real-time market rates and are typically lower than buy prices due to market spreads and operational costs. The sell rate is locked for a limited period (typically 15 seconds) once you reach the review screen. If the lock period expires, you will need to refresh and get a new price quote. Prices are subject to change without notice based on market volatility.</p>
              </section>

              <section className="terms-section">
                <h3>2. Settlement Timeline</h3>
                <p>Funds from gold sales are credited to your registered bank account on a T+1 basis (next working day from transaction date). Settlement may be delayed due to bank holidays, weekends, RBI system maintenance, or technical issues beyond our control. In exceptional cases, settlement may take up to T+2 working days. No interest is payable for settlement delays.</p>
              </section>

              <section className="terms-section">
                <h3>3. Bank Verification & Payout</h3>
                <p>Payouts are made only to bank accounts that have been verified and registered in your name as per KYC records. For security and regulatory compliance, we do not support third-party bank account transfers under any circumstances. Please ensure your bank details (Account Number, IFSC Code, Account Holder Name) are accurate before confirming the sale. We are not responsible for failed transactions due to incorrect bank details.</p>
              </section>

              <section className="terms-section">
                <h3>4. Tax Deduction at Source (TDS)</h3>
                <p>As per Section 194Q of the Income Tax Act, 1961, TDS at the applicable rate (currently 0.1% for transactions below ₹50 lakhs) is deducted from the gross sale value. Higher TDS rates apply if PAN is not linked or for transactions exceeding specified limits. A TDS certificate (Form 26AS) will be available in your account for tax filing purposes. TDS deducted is adjustable against your final tax liability.</p>
              </section>

              <section className="terms-section">
                <h3>5. Processing Fees & Charges</h3>
                <p>A processing fee (currently 1% of transaction value, subject to change) is charged to cover transaction costs, vault management, compliance, GST on services, and operational expenses. This fee is clearly displayed in the payout calculation before confirmation. All charges are inclusive of applicable taxes.</p>
              </section>

              <section className="terms-section">
                <h3>6. No Reversal Policy</h3>
                <p>Once a sell order is confirmed, it cannot be cancelled, reversed, or modified under any circumstances. The gold will be debited from your account immediately upon confirmation, and the payout process will be initiated. This policy is in place due to the real-time nature of gold pricing and immediate settlement obligations. Please review all details carefully before confirming.</p>
              </section>

              <section className="terms-section">
                <h3>7. PAN & KYC Requirements</h3>
                <p>For transactions exceeding regulatory thresholds (currently ₹2 lakhs per financial year), PAN verification is mandatory as per Income Tax regulations. Higher TDS rates (20%) may apply if PAN is not provided or is invalid. Complete KYC with address proof is required for all sell transactions. Ensure your PAN is linked to your account for seamless transactions and accurate TDS reporting.</p>
              </section>

              <section className="terms-section">
                <h3>8. Market Risk Disclaimer</h3>
                <p>Gold prices are subject to market volatility and may fluctuate significantly. The sell price may be lower than your purchase price, resulting in capital loss. We do not guarantee any minimum sell price or returns. You are advised to carefully assess market conditions and your financial needs before selling.</p>
              </section>

              <section className="terms-section">
                <h3>9. Regulatory Compliance</h3>
                <p>This service operates under RBI guidelines, Income Tax regulations, PMLA norms, and all applicable Indian laws. We reserve the right to refuse, cancel, or reverse transactions that do not meet regulatory requirements, appear suspicious, involve money laundering concerns, or violate our terms of service. We may report suspicious transactions to relevant authorities as required by law.</p>
              </section>
            </>
          )}
        </div>

        <div className="terms-modal-footer">
          <button className="close-footer-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
