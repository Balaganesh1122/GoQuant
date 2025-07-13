import React from 'react';
import { Shield, Activity, TrendingUp, Bot } from 'lucide-react';
import { useRealTimeData } from './hooks/useRealTimeData';
import { RiskMetricsCard } from './components/RiskMetricsCard';
import { PositionTable } from './components/PositionTable';
import { AlertsPanel } from './components/AlertsPanel';
import { ExchangeStatus } from './components/ExchangeStatus';
import { HedgingControls } from './components/HedgingControls';
import { TelegramBot } from './components/TelegramBot';
import { MLVolatilityForecasting } from './components/MLVolatilityForecasting';
import { AdvancedOptionsStrategies } from './components/AdvancedOptionsStrategies';
import { BacktestingFramework } from './components/BacktestingFramework';
import { ComplianceReporting } from './components/ComplianceReporting';
import { PerformanceAttribution } from './components/PerformanceAttribution';
import { MultiAssetPortfolioHedging } from './components/MultiAssetPortfolioHedging';

function App() {
  const { 
    positions, 
    riskMetrics, 
    alerts, 
    exchanges, 
    isConnected, 
    acknowledgeAlert 
  } = useRealTimeData();

  const handleHedgePosition = (positionId: string) => {
    console.log('Hedging position:', positionId);
    // In a real implementation, this would trigger the hedging logic
  };

  const handleExecuteHedge = (strategy: string, asset: string) => {
    console.log('Executing hedge:', strategy, 'for', asset);
    // In a real implementation, this would execute the hedge
  };

  const totalPortfolioValue = positions.reduce((sum, pos) => sum + (pos.currentPrice * pos.size), 0);
  const totalUnrealizedPnL = positions.reduce((sum, pos) => sum + pos.unrealizedPnl, 0);
  const activeAlerts = alerts.filter(alert => !alert.acknowledged).length;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white">GoQuant Risk Management</h1>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="text-slate-300">
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-slate-400">
                  <Activity className="w-4 h-4" />
                  <span>Real-time</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm text-slate-400">Portfolio Value</div>
                <div className="text-lg font-semibold text-white">
                  ${totalPortfolioValue.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Unrealized P&L</div>
                <div className={`text-lg font-semibold ${totalUnrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${totalUnrealizedPnL.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Active Alerts</div>
                <div className="text-lg font-semibold text-yellow-400">
                  {activeAlerts}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Top Row - Key Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {riskMetrics && (
                <RiskMetricsCard metrics={riskMetrics} />
              )}
            </div>
            <div>
              <AlertsPanel 
                alerts={alerts} 
                onAcknowledgeAlert={acknowledgeAlert}
              />
            </div>
          </div>

          {/* Second Row - Positions and Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PositionTable 
                positions={positions} 
                onHedgePosition={handleHedgePosition}
              />
            </div>
            <div>
              <HedgingControls onExecuteHedge={handleExecuteHedge} />
            </div>
          </div>

          {/* Third Row - ML and Advanced Strategies */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MLVolatilityForecasting />
            <AdvancedOptionsStrategies />
          </div>

          {/* Fourth Row - Multi-Asset and Backtesting */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MultiAssetPortfolioHedging />
            <BacktestingFramework />
          </div>

          {/* Fifth Row - Performance and Compliance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PerformanceAttribution />
            <ComplianceReporting />
          </div>

          {/* Sixth Row - Exchange Status and Telegram Bot */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ExchangeStatus exchanges={exchanges} />
            </div>
            <div>
              <TelegramBot />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;