# React Router Migration Guide

## ✅ What's Been Done

1. **Installed react-router-dom** - Added to package.json
2. **Updated App.tsx** - Converted to use BrowserRouter, Routes, Route
3. **Updated Header.tsx** - Now uses useNavigate and useLocation hooks
4. **Updated Landing.tsx** - Uses useNavigate instead of onNavigate prop
5. **Updated BuyGold.tsx** - Uses useNavigate + onDataPass callback
6. **Updated OrderSummary.tsx** - Uses useNavigate + onDataPass callback
7. **Created vercel.json** - Handles client-side routing on Vercel

## 🔧 Next Steps - Update Remaining Pages

You need to update these pages following the same pattern:

### Pages to Update:
- HowItWorks.tsx
- SellGold.tsx
- PaymentMethod.tsx
- PaymentProcessing.tsx
- PaymentSuccess.tsx
- PaymentDetails.tsx
- SellSummary.tsx
- SellProcessing.tsx
- SellSuccess.tsx
- BankAccount.tsx
- TermsConditions.tsx
- Portfolio.tsx
- FAQ.tsx

## 📝 Migration Pattern

### Before (Old Pattern):
```tsx
interface PageProps {
  onNavigate: (page: string, data?: any) => void;
}

const MyPage = ({ onNavigate }: PageProps) => {
  const handleClick = () => {
    onNavigate('other-page', { someData: 'value' });
  };
  
  return <button onClick={handleClick}>Go</button>;
};
```

### After (New Pattern):

#### For pages WITHOUT data passing:
```tsx
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/other-page');
  };
  
  return <button onClick={handleClick}>Go</button>;
};
```

#### For pages WITH data passing:
```tsx
import { useNavigate } from 'react-router-dom';

interface MyPageProps {
  onDataPass: (data: any) => void;
}

const MyPage = ({ onDataPass }: MyPageProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    onDataPass({ someData: 'value' });
    navigate('/other-page');
  };
  
  return <button onClick={handleClick}>Go</button>;
};
```

#### For pages that RECEIVE data:
```tsx
import { useNavigate } from 'react-router-dom';

interface MyPageProps {
  myData: { someData: string };
}

const MyPage = ({ myData }: MyPageProps) => {
  const navigate = useNavigate();
  
  // Redirect if no data
  if (!myData) {
    navigate('/buy-gold');
    return null;
  }
  
  return <div>{myData.someData}</div>;
};
```

## 🗺️ Route Mapping

Old page names → New routes:
- 'landing' → '/'
- 'how-it-works' → '/how-it-works'
- 'buy' → '/buy-gold'
- 'sell' → '/sell-gold'
- 'order-summary' → '/order-summary'
- 'payment-method' → '/payment-method'
- 'payment-processing' → '/payment-processing'
- 'payment-success' → '/payment-success'
- 'payment-details' → '/payment-details'
- 'sell-summary' → '/sell-summary'
- 'bank-account' → '/bank-account'
- 'terms-conditions' → '/terms-conditions'
- 'sell-processing' → '/sell-processing'
- 'sell-success' → '/sell-success'
- 'portfolio' → '/portfolio'
- 'faq' → '/faq'

## 🚀 Installation & Running

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

4. **Deploy to Vercel:**
```bash
vercel --prod
```

## ✨ Benefits You Get

✅ **URL updates** - Each page has its own URL
✅ **Browser back/forward** - Works correctly
✅ **Bookmarkable pages** - Users can bookmark any page
✅ **SEO friendly** - Search engines can index pages
✅ **No 404 on refresh** - vercel.json handles this
✅ **Shareable links** - Users can share specific pages

## 🔍 Testing Checklist

After updating all pages, test:
- [ ] Navigate between all pages
- [ ] Browser back button works
- [ ] Browser forward button works
- [ ] Refresh page doesn't break
- [ ] URL updates correctly
- [ ] Data passes between pages
- [ ] Direct URL access works
- [ ] Deploy to Vercel and test there

## 💡 Pro Tips

1. **Scroll to top on navigation** - Already handled in Header.tsx
2. **Data validation** - Check if data exists before using it
3. **Redirect on missing data** - Navigate back if required data is missing
4. **Type safety** - Keep TypeScript interfaces for props
5. **Clean URLs** - Use kebab-case for routes (/buy-gold not /buyGold)

## 🐛 Common Issues

**Issue:** Page shows blank after refresh
**Fix:** Make sure vercel.json is deployed

**Issue:** Data is undefined
**Fix:** Add data validation and redirect if missing

**Issue:** TypeScript errors
**Fix:** Update interface to remove onNavigate, add onDataPass if needed

**Issue:** 404 on Vercel
**Fix:** Ensure vercel.json is in root directory and deployed
