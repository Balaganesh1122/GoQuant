import React, { useState } from 'react';
import { Layers, TrendingUp, TrendingDown, Target, Calendar } from 'lucide-react';
import { AdvancedOptionsStrategy, OptionsLeg } from '../types';

export const AdvancedOptionsStrategies: React.FC = () => {
  const [strategies] = useState<AdvancedOptionsStrategy[]>([
    {
      id: 'iron-condor-1',
      name: 'BTC Iron Condor',
      type: 'iron_condor',
      legs: [
        { type: 'put', action: 'sell', strike: 42000, expiry: '2024-02-16', quantity: 1, premium: 850 },
        { type: 'put', action: 'buy', strike: 40000, expiry: '2024-02-16', quantity: 1, premium: 450 },
        { type: 'call', action: 'sell', strike: 48000, expiry: '2024-02-16', quantity: 1, premium: 920 },
        { type: 'call', action: 'buy', strike: 50000, expiry: '2024-02-16', quantity: 1, premium: 520 },
      ],
      maxProfit: 800,
      maxLoss: 1200,
      breakevens: [42800, 47200],
      impliedVolatility: 0.65,
      timeDecay: -45,
    },
    {
      id: 'butterfly-1',
      name: 'ETH Butterfly Spread',
      type: 'butterfly',
      legs: [
        { type: 'call', action: 'buy', strike: 2400, expiry: '2024-02-16', quantity: 1, premium: 180 },
        { type: 'call', action: 'sell', strike: 2500, expiry: '2024-02-16', quantity: 2, premium: 120 },
        { type: 'call', action: 'buy', strike: 2600, expiry: '2024-02-16', quantity: 1, premium: 80 },
      ],
      maxProfit: 60,
      maxLoss: 40,
      breakevens: [2440, 2560],
      impliedVolatility: 0.58,
      timeDecay: -12,
    },
    {
      id: 'straddle-1',
      name: 'SOL Long Straddle',
      type: 'straddle',
      legs: [
        { type: 'call', action: 'buy', strike: 100, expiry: '2024-02-16', quantity: 1, premium: 8.5 },
        { type: 'put', action: 'buy', strike: 100, expiry: '2024-02-16', quantity: 1, premium: 7.2 },
      ],
      maxProfit: Infinity,
      maxLoss: 157,
      breakevens: [84.3, 115.7],
      impliedVolatility: 0.72,
      timeDecay: -8.5,
    },
  ]);

  const getStrategyIcon = (type: string) => {
    switch (type) {
      case 'iron_condor': return <Layers className="w-4 h-4" />;
      case 'butterfly': return <Target className="w-4 h-4" />;
      case 'straddle': return <TrendingUp className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getStrategyColor = (type: string) => {
    switch (type) {
      case 'iron_condor': return 'text-purple-400 bg-purple-500/20';
      case 'butterfly': return 'text-blue-400 bg-blue-500/20';
      case 'straddle': return 'text-green-400 bg-green-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700">
      <div className="px-6 py-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Layers className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Advanced Options Strategies</h3>
          </div>
          <div className="text-sm text-slate-400">
            {strategies.length} active strategies
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStrategyColor(strategy.type)}`}>
                    {getStrategyIcon(strategy.type)}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">{strategy.name}</h4>
                    <p className="text-xs text-slate-400 capitalize">
                      {strategy.type.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-400">
                    Max Profit: {strategy.maxProfit === Infinity ? '∞' : formatCurrency(strategy.maxProfit)}
                  </div>
                  <div className="text-xs text-red-400">
                    Max Loss: {formatCurrency(strategy.maxLoss)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-xs font-medium text-slate-400 mb-2">Strategy Legs</h5>
                  <div className="space-y-2">
                    {strategy.legs.map((leg, index) => (
                      <div key={index} className="flex items-center justify-between text-xs bg-slate-800/50 rounded p-2">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            leg.action === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {leg.action}
                          </span>
                          <span className="text-white">{leg.quantity}x {leg.type.toUpperCase()}</span>
                          <span className="text-slate-300">${leg.strike}</span>
                        </div>
                        <span className="text-slate-400">${leg.premium}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-medium text-slate-400 mb-2">Risk Metrics</h5>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400">Implied Vol</span>
                      <div className="text-white font-medium">{(strategy.impliedVolatility * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Time Decay</span>
                      <div className="text-orange-400 font-medium">${strategy.timeDecay}/day</div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400">Breakeven Points</span>
                      <div className="text-white font-medium">
                        {strategy.breakevens.map(be => `$${be.toLocaleString()}`).join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-green-400" />
                      <span className="text-slate-400">P&L: </span>
                      <span className="text-green-400">+$234</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-3 h-3 text-blue-400" />
                      <span className="text-slate-400">Delta: </span>
                      <span className="text-white">0.12</span>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors">
                    Adjust Strategy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <h4 className="text-sm font-semibold text-white mb-3">Strategy Performance</h4>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-400">+12.8%</div>
              <div className="text-xs text-slate-400">Total Return</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-400">78.5%</div>
              <div className="text-xs text-slate-400">Win Rate</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-400">1.85</div>
              <div className="text-xs text-slate-400">Profit Factor</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-400">-4.2%</div>
              <div className="text-xs text-slate-400">Max Drawdown</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};