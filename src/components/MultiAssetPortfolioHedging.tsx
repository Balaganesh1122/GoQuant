import React, { useState } from 'react';
import { Network, Shuffle, TrendingUp, AlertCircle } from 'lucide-react';

interface CorrelationMatrix {
  assets: string[];
  matrix: number[][];
}

interface CrossAssetHedge {
  primaryAsset: string;
  hedgeAsset: string;
  correlation: number;
  hedgeRatio: number;
  effectiveness: number;
}

export const MultiAssetPortfolioHedging: React.FC = () => {
  const [correlationMatrix] = useState<CorrelationMatrix>({
    assets: ['BTC', 'ETH', 'SOL', 'AVAX', 'MATIC', 'DOT'],
    matrix: [
      [1.00, 0.85, 0.72, 0.68, 0.61, 0.58],
      [0.85, 1.00, 0.78, 0.74, 0.69, 0.65],
      [0.72, 0.78, 1.00, 0.82, 0.71, 0.67],
      [0.68, 0.74, 0.82, 1.00, 0.75, 0.72],
      [0.61, 0.69, 0.71, 0.75, 1.00, 0.68],
      [0.58, 0.65, 0.67, 0.72, 0.68, 1.00],
    ],
  });

  const [crossAssetHedges] = useState<CrossAssetHedge[]>([
    {
      primaryAsset: 'SOL',
      hedgeAsset: 'ETH',
      correlation: 0.78,
      hedgeRatio: 0.65,
      effectiveness: 0.89,
    },
    {
      primaryAsset: 'AVAX',
      hedgeAsset: 'SOL',
      correlation: 0.82,
      hedgeRatio: 0.72,
      effectiveness: 0.91,
    },
    {
      primaryAsset: 'MATIC',
      hedgeAsset: 'AVAX',
      correlation: 0.75,
      hedgeRatio: 0.58,
      effectiveness: 0.85,
    },
  ]);

  const getCorrelationColor = (correlation: number) => {
    if (correlation > 0.8) return 'bg-red-500';
    if (correlation > 0.6) return 'bg-yellow-500';
    if (correlation > 0.4) return 'bg-green-500';
    if (correlation > 0.2) return 'bg-blue-500';
    return 'bg-slate-500';
  };

  const getCorrelationIntensity = (correlation: number) => {
    return Math.abs(correlation);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700">
      <div className="px-6 py-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center">
              <Network className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Multi-Asset Portfolio Hedging</h3>
          </div>
          <div className="text-sm text-slate-400">
            {correlationMatrix.assets.length} assets tracked
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Correlation Matrix */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-white mb-4">Cross-Asset Correlation Matrix</h4>
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left text-slate-400 p-2"></th>
                  {correlationMatrix.assets.map(asset => (
                    <th key={asset} className="text-center text-slate-400 p-2 font-medium">
                      {asset}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {correlationMatrix.matrix.map((row, i) => (
                  <tr key={i}>
                    <td className="text-slate-400 p-2 font-medium">
                      {correlationMatrix.assets[i]}
                    </td>
                    {row.map((correlation, j) => (
                      <td key={j} className="p-2 text-center">
                        <div
                          className={`w-8 h-8 rounded flex items-center justify-center text-white text-xs font-medium ${getCorrelationColor(correlation)}`}
                          style={{ 
                            opacity: i === j ? 1 : getCorrelationIntensity(correlation) 
                          }}
                        >
                          {correlation.toFixed(2)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-slate-400">High (0.8+)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-slate-400">Medium (0.6-0.8)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-slate-400">Low (0.4-0.6)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-slate-400">Very Low (0.2-0.4)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-Asset Hedging Strategies */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-white mb-4">Active Cross-Asset Hedges</h4>
          <div className="space-y-3">
            {crossAssetHedges.map((hedge, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-400">
                          {hedge.primaryAsset.substring(0, 2)}
                        </span>
                      </div>
                      <Shuffle className="w-4 h-4 text-slate-400" />
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-green-400">
                          {hedge.hedgeAsset.substring(0, 2)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {hedge.primaryAsset} → {hedge.hedgeAsset}
                      </div>
                      <div className="text-xs text-slate-400">Cross-asset hedge</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-400">
                      {formatPercentage(hedge.effectiveness)} effective
                    </div>
                    <div className="text-xs text-slate-400">
                      Ratio: {hedge.hedgeRatio.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400">Correlation</span>
                    <div className="text-white font-medium">{hedge.correlation.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Hedge Ratio</span>
                    <div className="text-white font-medium">{hedge.hedgeRatio.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Effectiveness</span>
                    <div className="text-green-400 font-medium">{formatPercentage(hedge.effectiveness)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Risk Decomposition */}
        <div className="mb-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <h4 className="text-sm font-semibold text-white mb-4">Portfolio Risk Decomposition</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">67.3%</div>
              <div className="text-xs text-slate-400">Systematic Risk</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">32.7%</div>
              <div className="text-xs text-slate-400">Idiosyncratic Risk</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-400">0.78</div>
              <div className="text-xs text-slate-400">Avg Correlation</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-400">85.2%</div>
              <div className="text-xs text-slate-400">Hedge Coverage</div>
            </div>
          </div>
        </div>

        {/* Risk Alerts */}
        <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 text-yellow-400" />
            Correlation Risk Alerts
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
              <span className="text-yellow-400">High correlation detected: BTC-ETH (0.85)</span>
              <span className="text-slate-400">Consider diversification</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-red-500/10 rounded border border-red-500/20">
              <span className="text-red-400">Correlation spike: SOL-AVAX (0.82 → 0.89)</span>
              <span className="text-slate-400">Adjust hedge ratios</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-blue-500/10 rounded border border-blue-500/20">
              <span className="text-blue-400">Correlation breakdown: MATIC-DOT (0.68 → 0.45)</span>
              <span className="text-slate-400">Hedge opportunity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};