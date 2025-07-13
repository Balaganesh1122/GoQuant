import { useState, useEffect, useCallback } from 'react';
import { Position, RiskMetrics, Alert, ExchangeData } from '../types';

export const useRealTimeData = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [exchanges, setExchanges] = useState<ExchangeData[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const generateMockPosition = useCallback((asset: string, index: number): Position => {
    const basePrice = 45000 + index * 5000;
    const currentPrice = basePrice + (Math.random() - 0.5) * 2000;
    const size = Math.random() * 10 + 1;
    
    return {
      id: `pos-${asset}-${index}`,
      asset,
      size,
      entryPrice: basePrice,
      currentPrice,
      unrealizedPnl: (currentPrice - basePrice) * size,
      delta: Math.random() * 0.8 + 0.1,
      gamma: Math.random() * 0.05 + 0.01,
      theta: -(Math.random() * 50 + 10),
      vega: Math.random() * 100 + 20,
      lastUpdated: new Date().toISOString(),
    };
  }, []);

  const generateMockRiskMetrics = useCallback((): RiskMetrics => {
    return {
      portfolioVaR: Math.random() * 50000 + 10000,
      maxDrawdown: Math.random() * 0.15 + 0.05,
      totalDelta: Math.random() * 100 - 50,
      totalGamma: Math.random() * 5 + 1,
      totalTheta: -(Math.random() * 500 + 100),
      totalVega: Math.random() * 1000 + 200,
      correlationMatrix: [
        [1, 0.8, 0.6, 0.4],
        [0.8, 1, 0.7, 0.5],
        [0.6, 0.7, 1, 0.6],
        [0.4, 0.5, 0.6, 1],
      ],
      lastUpdated: new Date().toISOString(),
    };
  }, []);

  const generateMockAlert = useCallback((): Alert => {
    const alerts = [
      'Delta exposure exceeded threshold for BTC position',
      'High volatility detected in ETH options',
      'Correlation breakdown detected between BTC and ETH',
      'Portfolio VaR limit approaching',
      'Hedge execution completed for SOL position',
    ];
    
    return {
      id: `alert-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString(),
      type: ['warning', 'critical', 'info'][Math.floor(Math.random() * 3)] as 'warning' | 'critical' | 'info',
      message: alerts[Math.floor(Math.random() * alerts.length)],
      asset: ['BTC', 'ETH', 'SOL', 'AVAX'][Math.floor(Math.random() * 4)],
      action: Math.random() > 0.5 ? 'hedge' : 'monitor',
      acknowledged: false,
    };
  }, []);

  const generateMockExchanges = useCallback((): ExchangeData[] => {
    return [
      {
        name: 'OKX',
        connected: true,
        latency: Math.random() * 50 + 10,
        orderbook: {
          bids: Array.from({ length: 5 }, (_, i) => [45000 - i * 10, Math.random() * 10 + 1]),
          asks: Array.from({ length: 5 }, (_, i) => [45010 + i * 10, Math.random() * 10 + 1]),
        },
      },
      {
        name: 'Bybit',
        connected: true,
        latency: Math.random() * 50 + 15,
        orderbook: {
          bids: Array.from({ length: 5 }, (_, i) => [44995 - i * 10, Math.random() * 10 + 1]),
          asks: Array.from({ length: 5 }, (_, i) => [45005 + i * 10, Math.random() * 10 + 1]),
        },
      },
      {
        name: 'Deribit',
        connected: true,
        latency: Math.random() * 50 + 20,
        orderbook: {
          bids: Array.from({ length: 5 }, (_, i) => [45005 - i * 10, Math.random() * 10 + 1]),
          asks: Array.from({ length: 5 }, (_, i) => [45015 + i * 10, Math.random() * 10 + 1]),
        },
      },
    ];
  }, []);

  useEffect(() => {
    // Initialize data
    const initialPositions = [
      generateMockPosition('BTC', 0),
      generateMockPosition('ETH', 1),
      generateMockPosition('SOL', 2),
      generateMockPosition('AVAX', 3),
    ];
    
    setPositions(initialPositions);
    setRiskMetrics(generateMockRiskMetrics());
    setExchanges(generateMockExchanges());
    setIsConnected(true);

    // Update data every 2 seconds
    const interval = setInterval(() => {
      setPositions(prev => prev.map(pos => ({
        ...pos,
        currentPrice: pos.currentPrice + (Math.random() - 0.5) * 100,
        delta: Math.max(0, Math.min(1, pos.delta + (Math.random() - 0.5) * 0.1)),
        gamma: Math.max(0, pos.gamma + (Math.random() - 0.5) * 0.005),
        theta: pos.theta + (Math.random() - 0.5) * 10,
        vega: Math.max(0, pos.vega + (Math.random() - 0.5) * 20),
        lastUpdated: new Date().toISOString(),
      })));

      setRiskMetrics(generateMockRiskMetrics());
      setExchanges(generateMockExchanges());

      // Generate random alerts
      if (Math.random() < 0.1) {
        setAlerts(prev => [generateMockAlert(), ...prev.slice(0, 9)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [generateMockPosition, generateMockRiskMetrics, generateMockAlert, generateMockExchanges]);

  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  }, []);

  return {
    positions,
    riskMetrics,
    alerts,
    exchanges,
    isConnected,
    acknowledgeAlert,
  };
};