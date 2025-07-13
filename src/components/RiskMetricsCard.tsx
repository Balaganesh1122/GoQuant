import React from 'react';
import { TrendingUp, TrendingDown, Shield, AlertTriangle } from 'lucide-react';
import { RiskMetrics } from '../types';

interface RiskMetricsCardProps {
  metrics: RiskMetrics;
}

export const RiskMetricsCard: React.FC<RiskMetricsCardProps> = ({ metrics }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const formatDecimal = (value: number) => {
    return value.toFixed(2);
  };

  const getRiskColor = (value: number, threshold: number) => {
    if (Math.abs(value) > threshold) return 'text-red-400';
    if (Math.abs(value) > threshold * 0.7) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Portfolio Risk Metrics</h3>
        <div className="flex items-center text-sm text-slate-400">
          <Shield className="w-4 h-4 mr-1" />
          Real-time
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Portfolio VaR</span>
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-xl font-bold text-white">
            {formatCurrency(metrics.portfolioVaR)}
          </div>
          <div className="text-xs text-slate-400 mt-1">95% confidence</div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Max Drawdown</span>
            <TrendingDown className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-xl font-bold text-red-400">
            {formatPercentage(metrics.maxDrawdown)}
          </div>
          <div className="text-xs text-slate-400 mt-1">Historical</div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Total Delta</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className={`text-xl font-bold ${getRiskColor(metrics.totalDelta, 30)}`}>
            {formatDecimal(metrics.totalDelta)}
          </div>
          <div className="text-xs text-slate-400 mt-1">Directional exposure</div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Total Gamma</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className={`text-xl font-bold ${getRiskColor(metrics.totalGamma, 3)}`}>
            {formatDecimal(metrics.totalGamma)}
          </div>
          <div className="text-xs text-slate-400 mt-1">Convexity</div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Total Theta</span>
            <TrendingDown className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-xl font-bold text-orange-400">
            {formatCurrency(metrics.totalTheta)}
          </div>
          <div className="text-xs text-slate-400 mt-1">Time decay</div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Total Vega</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className={`text-xl font-bold ${getRiskColor(metrics.totalVega, 500)}`}>
            {formatDecimal(metrics.totalVega)}
          </div>
          <div className="text-xs text-slate-400 mt-1">Volatility exposure</div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 col-span-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Correlation Matrix</span>
            <div className="text-xs text-slate-400">
              {new Date(metrics.lastUpdated).toLocaleTimeString()}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1 text-xs">
            {metrics.correlationMatrix.map((row, i) => 
              row.map((value, j) => (
                <div 
                  key={`${i}-${j}`}
                  className={`text-center p-1 rounded ${
                    value > 0.7 ? 'bg-green-500/20 text-green-400' :
                    value > 0.3 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}
                >
                  {value.toFixed(2)}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};