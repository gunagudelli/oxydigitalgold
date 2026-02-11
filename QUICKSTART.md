# 🚀 Quick Start Guide

## Run the Application

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

## 🎯 Test the Complete User Journey

1. **Start at Landing Page** (default)
   - Click "Start Your Gold Journey Now" → Goes to Buy Gold
   - Click "Learn How It Works" → Goes to How It Works

2. **Navigate via Header**
   - Home → Landing Page
   - How It Works → Process Timeline
   - Buy Gold → Purchase Interface
   - Portfolio → Dashboard
   - FAQ → Questions & Trust

3. **Complete a Purchase**
   - Go to "Buy Gold"
   - Toggle between Rupees/Grams
   - Enter amount or click quick buttons
   - Click "Buy at Live Price"
   - See Confirmation Page
   - Click "View Portfolio"

4. **Explore Portfolio**
   - View holdings and stats
   - See transaction history
   - Click "Buy More Gold" → Returns to Buy page

5. **Check FAQ**
   - Click questions to expand
   - Read security information
   - Click "Start Your Gold Journey" → Goes to Buy page

## 📱 Pages Overview

| URL State | Page | Description |
|-----------|------|-------------|
| `landing` | Landing | Hero + Features + CTAs |
| `how-it-works` | How It Works | 5-step timeline |
| `buy` | Buy Gold | Two-column purchase interface |
| `confirmation` | Confirmation | Success state after purchase |
| `portfolio` | Portfolio | Dashboard with holdings |
| `faq` | FAQ | Questions + Security info |

## 🎨 What to Look For

### Desktop Experience (Primary)
- Two-column layouts on Buy Gold page
- Horizontal timeline on How It Works
- Sticky header navigation
- Professional fintech aesthetic
- Clean white cards on grey background

### Responsive Behavior
- Resize browser below 968px
- Layouts adapt to single column
- Navigation remains functional
- All content accessible

## ✅ Features to Test

- [x] Navigation between all 6 pages
- [x] Buy Gold form with rupees/grams toggle
- [x] Live conversion calculation
- [x] Quick amount buttons
- [x] Transaction flow (Buy → Confirm → Portfolio)
- [x] FAQ accordion expand/collapse
- [x] Responsive design
- [x] Sticky header
- [x] All CTAs functional

## 🎯 Key Interactions

1. **Toggle Buy Mode**: Switch between rupees and grams
2. **Enter Amount**: See live conversion
3. **Quick Buttons**: Click ₹100, ₹500, etc.
4. **Complete Purchase**: See confirmation page
5. **View Portfolio**: See updated holdings
6. **Expand FAQs**: Click questions to reveal answers

## 📊 Sample Data

- **Gold Rate**: ₹16,450 per gram
- **Current Holdings**: 2.45 grams
- **Portfolio Value**: ₹40,302
- **Today's Gain**: +₹825

## 🎨 Design Verification

✓ No inline styles (all CSS in separate files)
✓ Semantic HTML (header, section, main)
✓ Desktop-first responsive design
✓ Professional color palette
✓ Consistent typography
✓ Clean visual hierarchy

## 🔧 Troubleshooting

If you see TypeScript errors:
```bash
# Ensure TypeScript is installed
npm install -D typescript @types/react @types/react-dom
```

If styles don't load:
- Check that all CSS files are in `src/styles/` folder
- Verify imports in component files

## 📝 Notes

- This is a **complete web application**, not just UI screens
- All navigation is functional
- State management handles page transitions
- Transaction data flows between pages
- Professional production-ready code

---

**Enjoy exploring the complete Digital Gold Investment Platform!**
