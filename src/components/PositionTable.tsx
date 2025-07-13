import React from 'react';
import { TrendingUp, TrendingDown, Shield, AlertCircle } from 'lucide-react';
import { Position } from '../types';

interface PositionTableProps {
  positions: Position[];
  onHedgePosition: (positionId: string) => void;
}

export const PositionTable: React.FC<PositionTableProps> = ({ positions, onHedgePosition }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 2) => {
    return value.toFixed(decimals);
  };

  const getPnlColor = (pnl: number) => {
    return pnl >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getRiskLevel = (delta: number) => {
    if (delta > 0.7) return { level: 'High', color: 'text-red-400', bg: 'bg-red-500/20' };
    if (delta > 0.4) return { level: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    return { level: 'Low', color: 'text-green-400', bg: 'bg-green-500/20' };
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Active Positions</h3>
          <div className="flex items-center text-sm text-slate-400">
            <Shield className="w-4 h-4 mr-1" />
            {positions.length} positions
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Asset
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Entry Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Current Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                P&L
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Delta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Gamma
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Theta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Vega
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Risk Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {positions.map((position) => {
              const riskLevel = getRiskLevel(position.delta);
              return (
                <tr key={position.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-blue-400">
                          {position.asset.substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{position.asset}</div>
                        <div className="text-xs text-slate-400">
                          {new Date(position.lastUpdated).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {formatNumber(position.size, 4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {formatCurrency(position.entryPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    <div className="flex items-center">
                      {formatCurrency(position.currentPrice)}
                      {position.currentPrice > position.entryPrice ? (
                        <TrendingUp className="w-4 h-4 ml-1 text-green-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 ml-1 text-red-400" />
                      )}
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getPnlColor(position.unrealizedPnl)}`}>
                    {formatCurrency(position.unrealizedPnl)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {formatNumber(position.delta, 3)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {formatNumber(position.gamma, 3)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-400">
                    {formatCurrency(position.theta)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {formatNumber(position.vega, 1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${riskLevel.bg} ${riskLevel.color}`}>
                      {riskLevel.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onHedgePosition(position.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200 flex items-center"
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      Hedge
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};