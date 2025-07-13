import React, { useState } from 'react';
import { TrendingUp, DollarSign, Target, BarChart3, PieChart } from 'lucide-react';
import { PerformanceAttribution as PerformanceAttributionType } from '../types';

export const PerformanceAttribution: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  const [attributionData] = useState<PerformanceAttributionType[]>([
    {
      period: '1M',
      totalReturn: 0.087,
      hedgingReturn: -0.023,
      alphaReturn: 0.110,
      hedgingCosts: 0.0045,
      effectiveness: 0.89,
      costBenefitRatio: 2.34,
      riskAdjustedReturn: 0.156,
    },
    {
      period: '3M',
      totalReturn: 0.156,
      hedgingReturn: -0.034,
      alphaReturn: 0.190,
      hedgingCosts: 0.0067,
      effectiveness: 0.92,
      costBenefitRatio: 2.89,
      riskAdjustedReturn: 0.234,
    },
    {
      period: '6M',
      totalReturn: 0.234,
      hedgingReturn: -0.045,
      alphaReturn: 0.279,
      hedgingCosts: 0.0089,
      effectiveness: 0.87,
      costBenefitRatio: 3.12,
      riskAdjustedReturn: 0.345,
    },
    {
      period: '1Y',
      totalReturn: 0.345,
      hedgingReturn: -0.067,
      alphaReturn: 0.412,
      hedgingCosts: 0.0123,
      effectiveness: 0.85,
      costBenefitRatio: 3.45,
      riskAdjustedReturn: 0.456,
    },
  ]);

  const currentData = attributionData.find(d => d.period === selectedPeriod) || attributionData[0];

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const formatNumber = (value: number, decimals: number = 2) => {
    return value.toFixed(decimals);
  };

  const getPerformanceColor = (value: number) => {
    return value >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const periods = ['1M', '3M', '6M', '1Y'];

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700">
      <div className="px-6 py-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Performance Attribution</h3>
          </div>
          <div className="flex space-x-1">
            {periods.map(period => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className={`text-xl font-bold ${getPerformanceColor(currentData.totalReturn)}`}>
              {formatPercentage(currentData.totalReturn)}
            </div>
            <div className="text-xs text-slate-400">Total Return</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <div className={`text-xl font-bold ${getPerformanceColor(currentData.alphaReturn)}`}>
              {formatPercentage(currentData.alphaReturn)}
            </div>
            <div className="text-xs text-slate-400">Alpha Return</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-xl font-bold text-red-400">
              {formatPercentage(currentData.hedgingCosts)}
            </div>
            <div className="text-xs text-slate-400">Hedging Costs</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <PieChart className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-xl font-bold text-purple-400">
              {formatNumber(currentData.costBenefitRatio)}
            </div>
            <div className="text-xs text-slate-400">Cost/Benefit Ratio</div>
          </div>
        </div>

        {/* Return Attribution Breakdown */}
        <div className="mb-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <h4 className="text-sm font-semibold text-white mb-4">Return Attribution Breakdown</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Alpha Generation</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.abs(currentData.alphaReturn) * 200}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-green-400 w-16 text-right">
                  {formatPercentage(currentData.alphaReturn)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Hedging Impact</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.abs(currentData.hedgingReturn) * 400}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-red-400 w-16 text-right">
                  {formatPercentage(currentData.hedgingReturn)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Transaction Costs</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${currentData.hedgingCosts * 2000}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-orange-400 w-16 text-right">
                  -{formatPercentage(currentData.hedgingCosts)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Net Total Return</span>
              <span className={`text-lg font-bold ${getPerformanceColor(currentData.totalReturn)}`}>
                {formatPercentage(currentData.totalReturn)}
              </span>
            </div>
          </div>
        </div>

        {/* Hedging Effectiveness Analysis */}
        <div className="mb-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <h4 className="text-sm font-semibold text-white mb-4">Hedging Effectiveness Analysis</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {formatPercentage(currentData.effectiveness)}
              </div>
              <div className="text-xs text-slate-400">Hedge Effectiveness</div>
              <div className="text-xs text-slate-500 mt-1">
                Correlation between hedge and underlying
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">
                {formatPercentage(currentData.riskAdjustedReturn)}
              </div>
              <div className="text-xs text-slate-400">Risk-Adjusted Return</div>
              <div className="text-xs text-slate-500 mt-1">
                Return per unit of risk taken
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {formatNumber(currentData.costBenefitRatio)}
              </div>
              <div className="text-xs text-slate-400">Cost/Benefit Ratio</div>
              <div className="text-xs text-slate-500 mt-1">
                Risk reduction per dollar of cost
              </div>
            </div>
          </div>
        </div>

        {/* Historical Comparison */}
        <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <h4 className="text-sm font-semibold text-white mb-4">Historical Performance Comparison</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-600">
                  <th className="text-left py-2">Period</th>
                  <th className="text-right py-2">Total Return</th>
                  <th className="text-right py-2">Alpha</th>
                  <th className="text-right py-2">Hedge Cost</th>
                  <th className="text-right py-2">Effectiveness</th>
                  <th className="text-right py-2">Cost/Benefit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600">
                {attributionData.map((data, index) => (
                  <tr key={index} className={selectedPeriod === data.period ? 'bg-slate-700/50' : ''}>
                    <td className="py-2 text-white font-medium">{data.period}</td>
                    <td className={`py-2 text-right font-medium ${getPerformanceColor(data.totalReturn)}`}>
                      {formatPercentage(data.totalReturn)}
                    </td>
                    <td className={`py-2 text-right ${getPerformanceColor(data.alphaReturn)}`}>
                      {formatPercentage(data.alphaReturn)}
                    </td>
                    <td className="py-2 text-right text-red-400">
                      {formatPercentage(data.hedgingCosts)}
                    </td>
                    <td className="py-2 text-right text-blue-400">
                      {formatPercentage(data.effectiveness)}
                    </td>
                    <td className="py-2 text-right text-purple-400">
                      {formatNumber(data.costBenefitRatio)}
                    </td>
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