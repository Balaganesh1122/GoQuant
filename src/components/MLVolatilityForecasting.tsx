import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Target, Clock, Zap } from 'lucide-react';
import { MLPrediction } from '../types';

export const MLVolatilityForecasting: React.FC = () => {
  const [predictions, setPredictions] = useState<MLPrediction[]>([]);
  const [modelStatus, setModelStatus] = useState<'training' | 'ready' | 'predicting'>('ready');

  useEffect(() => {
    // Simulate ML predictions
    const generatePredictions = () => {
      const assets = ['BTC', 'ETH', 'SOL', 'AVAX'];
      const newPredictions: MLPrediction[] = assets.map(asset => ({
        asset,
        predictedVolatility: Math.random() * 0.8 + 0.2,
        confidence: Math.random() * 0.4 + 0.6,
        optimalHedgeTime: new Date(Date.now() + Math.random() * 3600000).toISOString(),
        recommendation: ['hedge_now', 'wait', 'reduce_hedge'][Math.floor(Math.random() * 3)] as any,
        modelAccuracy: Math.random() * 0.2 + 0.8,
      }));
      setPredictions(newPredictions);
    };

    generatePredictions();
    const interval = setInterval(generatePredictions, 10000);
    return () => clearInterval(interval);
  }, []);

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'hedge_now': return 'text-red-400 bg-red-500/20';
      case 'wait': return 'text-yellow-400 bg-yellow-500/20';
      case 'reduce_hedge': return 'text-green-400 bg-green-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'hedge_now': return <Zap className="w-4 h-4" />;
      case 'wait': return <Clock className="w-4 h-4" />;
      case 'reduce_hedge': return <TrendingUp className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700">
      <div className="px-6 py-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">ML Volatility Forecasting</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              modelStatus === 'ready' ? 'bg-green-400' : 
              modelStatus === 'training' ? 'bg-yellow-400' : 'bg-blue-400'
            }`} />
            <span className="text-sm text-slate-400 capitalize">{modelStatus}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predictions.map((prediction) => (
            <div key={prediction.asset} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-400">
                      {prediction.asset.substring(0, 2)}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-white">{prediction.asset}</h4>
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${getRecommendationColor(prediction.recommendation)}`}>
                  {getRecommendationIcon(prediction.recommendation)}
                  <span className="capitalize">{prediction.recommendation.replace('_', ' ')}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Predicted Volatility</span>
                    <span>{(prediction.predictedVolatility * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${prediction.predictedVolatility * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">Confidence</span>
                    <div className="text-white font-medium">{(prediction.confidence * 100).toFixed(1)}%</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Model Accuracy</span>
                    <div className="text-white font-medium">{(prediction.modelAccuracy * 100).toFixed(1)}%</div>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-400">Optimal Hedge Time</span>
                  <div className="text-xs text-white">
                    {new Date(prediction.optimalHedgeTime).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <h4 className="text-sm font-semibold text-white mb-3">Model Performance</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-400">87.3%</div>
              <div className="text-xs text-slate-400">Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-400">0.82</div>
              <div className="text-xs text-slate-400">Sharpe Ratio</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-400">15.2%</div>
              <div className="text-xs text-slate-400">Alpha Generation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};