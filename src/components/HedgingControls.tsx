import React, { useState } from 'react';
import { Play, Pause, Settings, Target, Zap } from 'lucide-react';
import { HedgeStrategy } from '../types';

interface HedgingControlsProps {
  onExecuteHedge: (strategy: string, asset: string) => void;
}

export const HedgingControls: React.FC<HedgingControlsProps> = ({ onExecuteHedge }) => {
  const [strategies, setStrategies] = useState<HedgeStrategy[]>([
    {
      id: 'delta-neutral-1',
      name: 'Delta Neutral BTC',
      type: 'delta-neutral',
      enabled: true,
      threshold: 0.5,
      instrument: 'perpetual',
      exchange: 'OKX',
    },
    {
      id: 'protective-put-1',
      name: 'Protective Put ETH',
      type: 'protective-put',
      enabled: false,
      threshold: 0.7,
      instrument: 'options',
      exchange: 'Deribit',
    },
    {
      id: 'covered-call-1',
      name: 'Covered Call SOL',
      type: 'covered-call',
      enabled: true,
      threshold: 0.6,
      instrument: 'options',
      exchange: 'Deribit',
    },
  ]);

  const [autoHedgingEnabled, setAutoHedgingEnabled] = useState(true);

  const toggleStrategy = (strategyId: string) => {
    setStrategies(prev => prev.map(strategy => 
      strategy.id === strategyId 
        ? { ...strategy, enabled: !strategy.enabled }
        : strategy
    ));
  };

  const updateThreshold = (strategyId: string, threshold: number) => {
    setStrategies(prev => prev.map(strategy => 
      strategy.id === strategyId 
        ? { ...strategy, threshold }
        : strategy
    ));
  };

  const getStrategyIcon = (type: HedgeStrategy['type']) => {
    switch (type) {
      case 'delta-neutral':
        return <Target className="w-4 h-4" />;
      case 'protective-put':
        return <Settings className="w-4 h-4" />;
      case 'covered-call':
        return <Zap className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  const getStrategyColor = (type: HedgeStrategy['type']) => {
    switch (type) {
      case 'delta-neutral':
        return 'text-blue-400 bg-blue-500/20';
      case 'protective-put':
        return 'text-green-400 bg-green-500/20';
      case 'covered-call':
        return 'text-purple-400 bg-purple-500/20';
      default:
        return 'text-slate-400 bg-slate-500/20';
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700">
      <div className="px-6 py-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Hedging Controls</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setAutoHedgingEnabled(!autoHedgingEnabled)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                autoHedgingEnabled 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-slate-700 text-slate-400 border border-slate-600'
              }`}
            >
              {autoHedgingEnabled ? (
                <Play className="w-4 h-4" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
              <span>{autoHedgingEnabled ? 'Auto On' : 'Auto Off'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className={`bg-slate-700/50 rounded-lg p-4 border transition-all ${
                strategy.enabled 
                  ? 'border-slate-600 bg-slate-700/50' 
                  : 'border-slate-700 bg-slate-800/50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStrategyColor(strategy.type)}`}>
                    {getStrategyIcon(strategy.type)}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">{strategy.name}</h4>
                    <p className="text-xs text-slate-400 capitalize">
                      {strategy.type.replace('-', ' ')} • {strategy.instrument} • {strategy.exchange}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleStrategy(strategy.id)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${
                      strategy.enabled ? 'bg-green-500' : 'bg-slate-600'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-0.5 ${
                        strategy.enabled ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Risk Threshold
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={strategy.threshold}
                    onChange={(e) => updateThreshold(strategy.id, parseFloat(e.target.value))}
                    className="w-full"
                    disabled={!strategy.enabled}
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>0.1</span>
                    <span className="text-white">{strategy.threshold.toFixed(1)}</span>
                    <span>1.0</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Current Status
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      strategy.enabled ? 'bg-green-400' : 'bg-slate-400'
                    }`} />
                    <span className="text-xs text-white">
                      {strategy.enabled ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Quick Actions
                  </label>
                  <button
                    onClick={() => onExecuteHedge(strategy.type, strategy.name.split(' ')[2])}
                    disabled={!strategy.enabled}
                    className={`w-full px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      strategy.enabled
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Execute Hedge
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <h4 className="text-sm font-medium text-white mb-2">Quick Manual Hedge</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {['BTC', 'ETH', 'SOL', 'AVAX'].map((asset) => (
              <button
                key={asset}
                onClick={() => onExecuteHedge('delta-neutral', asset)}
                className="px-3 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-md text-sm font-medium transition-colors"
              >
                Hedge {asset}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};