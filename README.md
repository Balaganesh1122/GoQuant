# GoQuant Risk Management Dashboard

A sophisticated, real-time cryptocurrency risk management and hedging platform built with React, TypeScript, and Tailwind CSS. This dashboard provides institutional-grade risk analytics, automated hedging strategies, and comprehensive portfolio management tools.

![GoQuant Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-blue)

## 🚀 Live Demo

**Deployed Application:** [https://balaganeshgoquant.netlify.app/](https://balaganeshgoquant.netlify.app/)

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components Overview](#components-overview)
- [Bonus Features](#bonus-features)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Risk Management
- **Real-time Portfolio Monitoring** - Live position tracking with P&L calculations
- **Advanced Risk Metrics** - VaR, Greeks (Delta, Gamma, Theta, Vega), correlation analysis
- **Automated Hedging** - Delta-neutral, protective puts, covered calls strategies
- **Multi-Exchange Integration** - OKX, Bybit, Deribit connectivity with latency monitoring
- **Risk Alerts System** - Real-time threshold monitoring with customizable alerts

### Trading & Execution
- **Position Management** - Comprehensive position table with real-time updates
- **Hedging Controls** - Manual and automated hedge execution
- **Exchange Status** - Real-time orderbook data and connection monitoring
- **Strategy Configuration** - Customizable risk thresholds and hedge parameters

### Analytics & Reporting
- **Performance Attribution** - Detailed return analysis and cost-benefit tracking
- **Backtesting Framework** - Historical strategy validation with comprehensive metrics
- **Compliance Reporting** - Regulatory reports for CFTC, SEC, FCA, ESMA
- **Risk Decomposition** - Systematic vs idiosyncratic risk analysis

## 🛠 Technology Stack

- **Frontend Framework:** React 18.3.1 with TypeScript
- **Styling:** Tailwind CSS 3.4.1
- **Build Tool:** Vite 5.4.2
- **Icons:** Lucide React
- **State Management:** React Hooks (useState, useEffect, useCallback)
- **Type Safety:** Full TypeScript implementation
- **Deployment:** Netlify

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd goquant-risk-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Usage

### Dashboard Navigation

1. **Portfolio Overview** - Monitor total portfolio value and unrealized P&L
2. **Risk Metrics** - View real-time VaR, Greeks, and correlation data
3. **Position Management** - Track individual positions and execute hedges
4. **Alert System** - Monitor and acknowledge risk alerts
5. **Telegram Bot** - Interact with automated risk management commands

### Telegram Bot Commands

The integrated Telegram bot supports the following commands:

```bash
/help                    # Show all available commands
/portfolio_risk          # Get portfolio risk metrics
/hedge_status           # Check current hedging status
/monitor_risk <asset>   # Monitor risk for specific asset
/auto_hedge <on/off>    # Toggle automatic hedging
/hedge_now <asset>      # Execute manual hedge
/set_threshold <value>  # Set risk thresholds
/alerts                 # Show active alerts
/exchanges              # Check exchange status
/pnl                    # Get P&L summary
/config                 # View bot configuration
```

### Risk Management Workflow

1. **Monitor Positions** - Real-time tracking of crypto positions
2. **Analyze Risk** - Review Greeks, correlations, and VaR metrics
3. **Set Thresholds** - Configure automated hedge triggers
4. **Execute Hedges** - Manual or automated hedge execution
5. **Track Performance** - Monitor hedge effectiveness and costs

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── AlertsPanel.tsx          # Risk alerts management
│   ├── PositionTable.tsx        # Position tracking table
│   ├── RiskMetricsCard.tsx      # Risk metrics display
│   ├── ExchangeStatus.tsx       # Exchange connectivity
│   ├── HedgingControls.tsx      # Hedge strategy controls
│   ├── TelegramBot.tsx          # Bot interface
│   ├── MLVolatilityForecasting.tsx      # ML predictions
│   ├── AdvancedOptionsStrategies.tsx    # Options strategies
│   ├── BacktestingFramework.tsx         # Strategy backtesting
│   ├── ComplianceReporting.tsx          # Regulatory compliance
│   ├── PerformanceAttribution.tsx       # Performance analysis
│   └── MultiAssetPortfolioHedging.tsx   # Multi-asset hedging
├── hooks/               # Custom React hooks
│   └── useRealTimeData.ts       # Real-time data management
├── types/               # TypeScript type definitions
│   └── index.ts                 # All interface definitions
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## 🧩 Components Overview

### Core Components

- **RiskMetricsCard** - Displays portfolio VaR, Greeks, and correlation matrix
- **PositionTable** - Real-time position tracking with P&L and risk levels
- **AlertsPanel** - Risk alert management with acknowledgment system
- **HedgingControls** - Strategy configuration and execution controls
- **ExchangeStatus** - Multi-exchange connectivity and orderbook data

### Advanced Components

- **TelegramBot** - Interactive bot interface with command system
- **MLVolatilityForecasting** - Machine learning volatility predictions
- **AdvancedOptionsStrategies** - Complex options strategy management
- **BacktestingFramework** - Historical strategy validation
- **ComplianceReporting** - Regulatory reporting and compliance
- **PerformanceAttribution** - Detailed performance analysis

## 🎁 Bonus Features

### 1. Machine Learning Integration
- **Volatility Forecasting** - ML-based volatility predictions with confidence intervals
- **Optimal Hedge Timing** - AI-driven hedge execution recommendations
- **Model Performance Tracking** - Real-time accuracy and effectiveness metrics

### 2. Multi-Asset Portfolio Hedging
- **Cross-Asset Correlations** - Visual correlation matrix with heat mapping
- **Cross-Asset Hedging** - Sophisticated multi-asset hedge strategies
- **Risk Decomposition** - Systematic vs idiosyncratic risk analysis

### 3. Advanced Options Strategies
- **Iron Condors** - Multi-leg options strategies with risk/reward analysis
- **Butterflies & Straddles** - Complex volatility trading strategies
- **Greeks Management** - Comprehensive options Greeks tracking

### 4. Backtesting Framework
- **Strategy Validation** - Historical performance testing
- **Performance Metrics** - Sharpe ratio, max drawdown, win rate analysis
- **Strategy Comparison** - Side-by-side strategy performance comparison

### 5. Regulatory Compliance
- **Position Reporting** - Automated regulatory position reports
- **Risk Disclosure** - Compliance documentation and risk disclosures
- **Stress Testing** - Regulatory stress test scenarios and results

### 6. Performance Attribution
- **Return Analysis** - Detailed breakdown of alpha vs hedging costs
- **Hedging Effectiveness** - Cost-benefit analysis of hedging strategies
- **Risk-Adjusted Returns** - Comprehensive performance metrics

## 🔌 API Integration

### Real-Time Data Simulation

The application includes a comprehensive real-time data simulation system:

```typescript
// Mock data generation for:
- Position updates every 2 seconds
- Risk metrics recalculation
- Exchange connectivity monitoring
- Alert generation based on thresholds
- ML prediction updates
```

### Exchange Integration Points

Ready for integration with:
- **OKX API** - Futures and options trading
- **Bybit API** - Perpetual swaps and options
- **Deribit API** - Options and futures
- **WebSocket Feeds** - Real-time market data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain component modularity
- Use Tailwind CSS for styling
- Implement proper error handling
- Add comprehensive type definitions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the excellent React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon library
- **Vite** - For the fast build tool
- **TypeScript** - For type safety and developer experience

## 📞 Support

For support, email support@goquant.com or join our Slack channel.

## 🔗 Links

- [Live Demo](https://keen-valkyrie-90f7d7.netlify.app)
- [Documentation](https://docs.goquant.com)
- [API Reference](https://api.goquant.com/docs)
- [Community](https://community.goquant.com)

---

**Built with ❤️ by the GoQuant Team**
