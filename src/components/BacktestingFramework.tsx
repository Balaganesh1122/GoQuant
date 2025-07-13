import React, { useState } from 'react';
import { BarChart3, Play, Pause, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';
import { BacktestResult } from '../types';

export const BacktestingFramework: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState('delta-neutral');
  const [backtestResults, setBacktestResults] = useState<BacktestResult[]>([
    {
      strategy: 'Delta Neutral',
      period: '2023-01-01 to 2023-12-31',
      totalReturn: 0.156,
      sharpeRatio: 1.42,
      maxDrawdown: 0.087,
      winRate: 0.673,
      avgHedgeCost: 0.0023,
      totalTrades: 1247,
      profitFactor: 1.89,
      calmarRatio: 1.79,
    },
    {
      strategy: 'Protective Put',
      period: '2023-01-01 to 2023-12-31',
      totalReturn: 0.134,
      sharpeRatio: 1.28,
      maxDrawdown: 0.052,
      winRate: 0.712,
      avgHedgeCost: 0.0045,
      totalTrades: 892,
      profitFactor: 2.12,
      calmarRatio: 2.58,
    },
    {
      strategy: 'Iron Condor',
      period: '2023-01-01 to 2023-12-31',
      totalReturn: 0.098,
      sharpeRatio: 0.95,
      maxDrawdown: 0.034,
      winRate: 0.785,
      avgHedgeCost: 0.0012,
      totalTrades: 456,
      profitFactor: 1.67,
      calmarRatio: 2.88,
    },
  ]);

  const strategies = [
    'delta-neutral',
    'protective-put',
    'iron-condor',
    'butterfly',
    'straddle',
    'covered-call',
  ];

  const runBacktest = () => {
    setIsRunning(true);
    // Simulate backtest running
    setTimeout(() => {
      setIsRunning(false);
      // Add new result or update existing
    }, 3000);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const formatNumber = (value: number, decimals: number = 2) => {
    return value.toFixed(decimals);
  };

  const getPerformanceColor = (value: number, isPositive: boolean = true) => {
    if (isPositive) {
      return value > 0 ? 'text-green-400' : 'text-red-400';
    } else {
      return value < 0 ? 'text-green-400' : 'text-red-400';
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700">
      <div className="px-6 py-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Backtesting Framework</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-yellow-400' : 'bg-green-400'}`} />
            <span className="text-sm text-slate-400">
              {isRunning ? 'Running...' : 'Ready'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Backtest Configuration */}
        <div className="mb-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <h4 className="text-sm font-semibold text-white mb-3">Backtest Configuration</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Strategy</label>
              <select
                value={selectedStrategy}
                onChange={(e) => setSelectedStrategy(e.target.value)}
                className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 text-sm"
              >
                {strategies.map(strategy => (
                  <option key={strategy} value={strategy}>
                    {strategy.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Time Period</label>
              <select className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 text-sm">
                <option>Last 1 Year</option>
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Initial Capital</label>
              <input
                type="number"
                defaultValue={100000}
                className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 text-sm"
              />
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={runBacktest}
              disabled={isRunning}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Running...' : 'Run Backtest'}</span>
            </button>
            <button className="flex items-center space-x-2 bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded text-sm transition-colors">
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Backtest Results */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white">Historical Results</h4>
          {backtestResults.map((result, index) => (
            <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h5 className="text-sm font-medium text-white">{result.strategy}</h5>
                  <p className="text-xs text-slate-400">{result.period}</p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getPerformanceColor(result.totalReturn)}`}>
                    {formatPercentage(result.totalReturn)}
                  </div>
                  <div className="text-xs text-slate-400">Total Return</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-sm font-medium text-white">{formatNumber(result.sharpeRatio)}</div>
                  <div className="text-xs text-slate-400">Sharpe Ratio</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-red-400">{formatPercentage(result.maxDrawdown)}</div>
                  <div className="text-xs text-slate-400">Max Drawdown</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-green-400">{formatPercentage(result.winRate)}</div>
                  <div className="text-xs text-slate-400">Win Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-blue-400">{formatNumber(result.profitFactor)}</div>
                  <div className="text-xs text-slate-400">Profit Factor</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-600">
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400">Avg Hedge Cost: </span>
                    <span className="text-white">{formatPercentage(result.avgHedgeCost)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Total Trades: </span>
                    <span className="text-white">{result.totalTrades.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Calmar Ratio: </span>
                    <span className="text-white">{formatNumber(result.calmarRatio)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Comparison */}
        <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <h4 className="text-sm font-semibold text-white mb-3">Strategy Comparison</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400">
                  <th className="text-left py-2">Strategy</th>
                  <th className="text-right py-2">Return</th>
                  <th className="text-right py-2">Sharpe</th>
                  <th className="text-right py-2">Drawdown</th>
                  <th className="text-right py-2">Win Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600">
                {backtestResults.map((result, index) => (
                  <tr key={index}>
                    <td className="py-2 text-white">{result.strategy}</td>
                    <td className={`py-2 text-right font-medium ${getPerformanceColor(result.totalReturn)}`}>
                      {formatPercentage(result.totalReturn)}
                    </td>
                    <td className="py-2 text-right text-white">{formatNumber(result.sharpeRatio)}</td>
                    <td className="py-2 text-right text-red-400">{formatPercentage(result.maxDrawdown)}</td>
                    <td className="py-2 text-right text-green-400">{formatPercentage(result.winRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};