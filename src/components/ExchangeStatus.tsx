import React from 'react';
import { Wifi, WifiOff, Activity } from 'lucide-react';
import { ExchangeData } from '../types';

interface ExchangeStatusProps {
  exchanges: ExchangeData[];
}

export const ExchangeStatus: React.FC<ExchangeStatusProps> = ({ exchanges }) => {
  const getLatencyColor = (latency: number) => {
    if (latency < 20) return 'text-green-400';
    if (latency < 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getLatencyBg = (latency: number) => {
    if (latency < 20) return 'bg-green-500/20';
    if (latency < 50) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  const formatOrderbook = (orderbook: ExchangeData['orderbook']) => {
    const bestBid = orderbook.bids[0]?.[0] || 0;
    const bestAsk = orderbook.asks[0]?.[0] || 0;
    const spread = bestAsk - bestBid;
    const spreadBps = ((spread / bestBid) * 10000).toFixed(1);
    
    return {
      bestBid,
      bestAsk,
      spread,
      spreadBps,
    };
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700">
      <div className="px-6 py-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Exchange Status</h3>
          <div className="flex items-center text-sm text-slate-400">
            <Activity className="w-4 h-4 mr-1" />
            Real-time
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exchanges.map((exchange) => {
            const orderbookData = formatOrderbook(exchange.orderbook);
            
            return (
              <div
                key={exchange.name}
                className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-400">
                        {exchange.name.substring(0, 2)}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-white">{exchange.name}</h4>
                  </div>
                  <div className="flex items-center space-x-1">
                    {exchange.connected ? (
                      <Wifi className="w-4 h-4 text-green-400" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-red-400" />
                    )}
                    <span
                      className={`text-xs px-2 py-1 rounded ${getLatencyBg(exchange.latency)} ${getLatencyColor(exchange.latency)}`}
                    >
                      {exchange.latency.toFixed(0)}ms
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Best Bid</span>
                    <span className="text-green-400">
                      ${orderbookData.bestBid.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Best Ask</span>
                    <span className="text-red-400">
                      ${orderbookData.bestAsk.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Spread</span>
                    <span className="text-slate-300">
                      {orderbookData.spreadBps} bps
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-600">
                  <div className="text-xs text-slate-400 mb-1">Order Book Depth</div>
                  <div className="space-y-1">
                    {exchange.orderbook.bids.slice(0, 3).map((bid, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-green-400">${bid[0].toLocaleString()}</span>
                        <span className="text-slate-300">{bid[1].toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t border-slate-600 my-1"></div>
                    {exchange.orderbook.asks.slice(0, 3).map((ask, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-red-400">${ask[0].toLocaleString()}</span>
                        <span className="text-slate-300">{ask[1].toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};