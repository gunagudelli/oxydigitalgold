# 🏗️ Application Architecture

## Component Hierarchy

```
App.tsx (Main Router)
│
├── Header.tsx (Global Navigation)
│   └── Header.css
│
└── Pages (Conditional Rendering)
    │
    ├── Landing.tsx
    │   └── Landing.css
    │   └── Features: Hero, Live Price, Feature Grid, CTAs
    │
    ├── HowItWorks.tsx
    │   └── HowItWorks.css
    │   └── Features: Timeline, 5 Steps, Benefits Grid
    │
    ├── BuyGold.tsx
    │   └── BuyGold.css
    │   └── Features: Two-Column Layout, Portfolio, Buy Form
    │
    ├── Confirmation.tsx
    │   └── Confirmation.css
    │   └── Features: Success Icon, Transaction Summary
    │
    ├── Portfolio.tsx
    │   └── Portfolio.css
    │   └── Features: Stats Grid, Transaction Table
    │
    └── FAQ.tsx
        └── FAQ.css
        └── Features: Accordion, Trust Section
```

## Data Flow

```
User Action → App.tsx (handleNavigate)
                ↓
        Update currentPage state
                ↓
        Conditional rendering
                ↓
        Render appropriate page component
                ↓
        Pass onNavigate callback
                ↓
        Page component can trigger navigation
```

## Navigation Flow Map

```
                    ┌─────────────┐
                    │   Landing   │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
   ┌─────────┐      ┌──────────┐      ┌──────────┐
   │How It   │      │Buy Gold  │      │   FAQ    │
   │Works    │      │          │      │          │
   └────┬────┘      └────┬─────┘      └────┬─────┘
        │                │                  │
        └────────────────┼──────────────────┘
                         ↓
                  ┌─────────────┐
                  │Confirmation │
                  └──────┬──────┘
                         ↓
                  ┌─────────────┐
                  │  Portfolio  │
                  └──────┬──────┘
                         │
                         ↓ (Buy More)
                  ┌─────────────┐
                  │  Buy Gold   │
                  └─────────────┘
```

## State Management

```typescript
// App.tsx
const [currentPage, setCurrentPage] = useState('landing');
const [transactionData, setTransactionData] = useState(null);

// Navigation handler
const handleNavigate = (page: string, data?: any) => {
  if (data) setTransactionData(data);
  setCurrentPage(page);
  window.scrollTo(0, 0);
};
```

## Page Props Interface

```typescript
// All pages receive navigation callback
interface PageProps {
  onNavigate: (page: string, data?: any) => void;
}

// Confirmation page also receives transaction data
interface ConfirmationProps extends PageProps {
  transactionData?: {
    grams: string;
    rupees: string;
  };
}
```

## CSS Architecture

```
Global Styles (index.css)
    ↓
Component-Specific Styles
    ├── Header.css (Navigation bar)
    ├── Landing.css (Hero, features)
    ├── HowItWorks.css (Timeline, benefits)
    ├── BuyGold.css (Two-column layout)
    ├── Confirmation.css (Success state)
    ├── Portfolio.css (Dashboard, table)
    └── FAQ.css (Accordion, trust)
```

## Responsive Strategy

```
Desktop First (Default)
    ↓
@media (max-width: 968px)
    ↓
Mobile/Tablet Adaptations
    - Grid → Single column
    - Sticky → Static
    - Horizontal → Vertical
    - Large text → Smaller
```

## Key Design Patterns

### 1. Container Pattern
```css
.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem;
}
```

### 2. Card Pattern
```css
.card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 2rem;
}
```

### 3. Button Pattern
```css
.btn-primary {
  padding: 1rem 2rem;
  background: #1a1a1a;
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
}
```

## Technology Stack

```
React 18.2.0
    ├── TypeScript 5.2.0
    ├── Vite 5.0.0 (Build tool)
    └── Plain CSS (No libraries)
```

## File Organization

```
src/
├── components/          ← Reusable components
├── pages/              ← Page-level components
├── styles/             ← CSS files (one per component)
├── App.tsx             ← Main router
├── index.css           ← Global styles
└── main.jsx            ← Entry point
```

## Build & Deploy

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

---

**Clean architecture with clear separation of concerns**
**Scalable, maintainable, production-ready**
