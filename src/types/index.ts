export interface Position {
  id: string;
  asset: string;
  size: number;
  entryPrice: number;
  currentPrice: number;
  unrealizedPnl: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  lastUpdated: string;
}

export interface HedgeStrategy {
  id: string;
  name: string;
  type: 'delta-neutral' | 'protective-put' | 'covered-call' | 'collar';
  enabled: boolean;
  threshold: number;
  instrument: 'perpetual' | 'options';
  exchange: string;
}

export interface RiskMetrics {
  portfolioVaR: number;
  maxDrawdown: number;
  totalDelta: number;
  totalGamma: number;
  totalTheta: number;
  totalVega: number;
  correlationMatrix: number[][];
  lastUpdated: string;
}

export interface Alert {
  id: string;
  timestamp: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  asset?: string;
  action?: string;
  acknowledged: boolean;
}

export interface ExchangeData {
  name: string;
  connected: boolean;
  latency: number;
  orderbook: {
    bids: [number, number][];
    asks: [number, number][];
  };
}

// Bonus Feature Types
export interface MLPrediction {
  asset: string;
  predictedVolatility: number;
  confidence: number;
  optimalHedgeTime: string;
  recommendation: 'hedge_now' | 'wait' | 'reduce_hedge';
  modelAccuracy: number;
}

export interface AdvancedOptionsStrategy {
  id: string;
  name: string;
  type: 'iron_condor' | 'butterfly' | 'straddle' | 'strangle' | 'calendar_spread';
  legs: OptionsLeg[];
  maxProfit: number;
  maxLoss: number;
  breakevens: number[];
  impliedVolatility: number;
  timeDecay: number;
}

export interface OptionsLeg {
  type: 'call' | 'put';
  action: 'buy' | 'sell';
  strike: number;
  expiry: string;
  quantity: number;
  premium: number;
}

export interface BacktestResult {
  strategy: string;
  period: string;
  totalReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  avgHedgeCost: number;
  totalTrades: number;
  profitFactor: number;
  calmarRatio: number;
}

export interface ComplianceReport {
  id: string;
  timestamp: string;
  type: 'position_report' | 'risk_disclosure' | 'var_report' | 'stress_test';
  data: any;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  regulatoryBody: string;
}

export interface PerformanceAttribution {
  period: string;
  totalReturn: number;
  hedgingReturn: number;
  alphaReturn: number;
  hedgingCosts: number;
  effectiveness: number;
  costBenefitRatio: number;
  riskAdjustedReturn: number;
}