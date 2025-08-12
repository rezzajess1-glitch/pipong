# Toney PiPong - Mini Tournament Management System

A user-friendly ping pong tournament management application with mobile-first design supporting various tournament formats.

## ✨ Features

### 🏓 Tournament Management
- **Multiple Tournament Types**:
  - Round Robin (liga format) ⭐
  - Round Robin + Knockout
  - Group Round Robin ⭐
  - Single Elimination
  - Double Elimination
  - Friendly Matches ⭐

### 🔐 Access Control System
- **4-digit PIN system** for secure access control
- **Role-based permissions**:
  - Creator/Admin: Full access
  - User with PIN: Player management + Umpire access
  - User: Read-only access

### 📱 Mobile-First Design
- Responsive layout optimized for mobile devices
- Bottom navigation for easy mobile access
- Touch-friendly interface elements

### ⚡ Core Functionality
- **Tournament Creation**: Comprehensive form with all required fields
- **Player Management**: Add players manually (name only required)
- **Match Scheduling**: Auto-generate matches based on tournament type
- **Live Scoreboard**: Real-time score tracking with deuce handling
- **Results & Rankings**: Tie-break system (H2H → Set Ratio → Point Ratio)
- **ITTF Compliance**: Optional ITTF law & regulation support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd toney-pipong
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── create/            # Tournament creation
│   ├── tournaments/       # Tournament details & management
│   └── page.tsx          # Home page
├── components/
│   ├── layout/           # Navigation & layout components
│   ├── ui/               # Reusable UI components
│   ├── tournament/       # Tournament-specific components
│   └── match/            # Match & scoreboard components
├── types/                # TypeScript type definitions
├── utils/                # Utility functions & constants
│   ├── constants.ts      # App constants & configurations
│   └── tournament.ts     # Tournament logic & calculations
└── hooks/                # Custom React hooks
```

## 🎯 Key Components

### Tournament Types
1. **Round Robin** - Liga format, points-based ranking
2. **Group Round Robin** - Multiple groups with knockout stages
3. **Single/Double Elimination** - Traditional bracket format
4. **Friendly** - Team-based matches with manual scheduling

### Scoring System
- **11-point sets** with deuce at 10-10
- **Best of 5 sets** (configurable)
- **Automatic serve tracking** (changes every 2 points)
- **Real-time score updates** with verification system

### Access Control
- **Tournament PIN**: 4-digit security code
- **Creator privileges**: Full tournament management
- **PIN holders**: Player management + umpire access
- **Public access**: View-only for results

## 🎨 UI/UX Features

### Design Principles
- **Mobile-first**: Optimized for smartphones and tablets
- **Clean interface**: Minimalist design with intuitive navigation
- **Accessibility**: Proper contrast and touch targets
- **Performance**: Fast loading with optimized components

### Navigation
- **Header**: Logo, notifications, user menu with settings
- **Bottom nav** (mobile): Home, Tournament, Player, Matches, Result
- **Language support**: English & Bahasa Malaysia
- **Theme options**: Light/Dark mode toggle

## ⚙️ Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Date handling**: date-fns
- **State management**: React hooks (useState, useEffect)

## 🔧 Configuration

### Tournament Settings
```typescript
// Scoring configuration
SCORING_SYSTEM = {
  POINTS_TO_WIN_SET: 11,
  DEUCE_POINT: 10,
  DEUCE_LEAD_REQUIRED: 2,
  DEFAULT_BEST_OF: 5,
  MIN_SETS_TO_WIN: 3,
}

// PIN system
PIN_CONFIG = {
  LENGTH: 4,
  PATTERN: /^\d{4}$/,
}
```

### File Upload Limits
- **Banner**: 5MB max
- **Logo**: 2MB max  
- **Profile images**: 1MB max
- **Supported formats**: JPG, PNG, WebP

## 🏆 Tournament Flow

1. **Create Tournament** → Set details, type, PIN
2. **Add Players** → Manual entry by creator/PIN users
3. **Generate Matches** → Auto-create based on tournament type
4. **Score Matches** → Real-time scoreboard with umpire access
5. **View Results** → Rankings with tie-break resolution

## 📊 Tie-Break System

When players have equal points:
1. **Head-to-Head** record
2. **Set Ratio** (sets won / sets lost)
3. **Point Ratio** (points won / points lost)
4. **Random draw** (manual intervention)

## 🌍 Internationalization

- **Primary**: Bahasa Malaysia
- **Secondary**: English
- Language toggle in user settings
- Localized date/time formatting

## 🚧 Development Status

### ✅ Completed Features
- [x] Project setup with Next.js + TailwindCSS
- [x] Responsive layout with header & bottom navigation
- [x] Home page with hero section & tournament cards
- [x] Tournament creation form with PIN system
- [x] Tournament detail pages with access control
- [x] Core tournament logic & calculations
- [x] Live scoreboard with deuce handling

### 🔄 In Progress / Pending
- [ ] Player management system with search/filtering
- [ ] Matches page with status management
- [ ] Results pages for different tournament types
- [ ] Complete mobile optimization
- [ ] Backend integration & data persistence
- [ ] User authentication system
- [ ] Notification system
- [ ] Tournament calculator widget

## 📱 Mobile Optimization

- Touch-friendly button sizes (44px minimum)
- Optimized layouts for various screen sizes
- Bottom navigation for easy thumb access
- Swipe gestures for navigation
- Fast loading with minimal bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or support, please create an issue in the repository.

---

**Toney PiPong** - Making ping pong tournaments simple and accessible! 🏓
