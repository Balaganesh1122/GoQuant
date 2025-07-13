import React, { useState } from 'react';
import { Send, MessageCircle, Bot, Users, Settings } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: 'bot' | 'user';
  type?: 'alert' | 'command' | 'response';
}

export const TelegramBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🤖 GoQuant Risk Bot is now active! Type /help for available commands.',
      timestamp: new Date().toISOString(),
      sender: 'bot',
      type: 'response',
    },
    {
      id: '2',
      text: '🚨 Alert: BTC delta exposure exceeded 0.7 threshold. Current delta: 0.84',
      timestamp: new Date().toISOString(),
      sender: 'bot',
      type: 'alert',
    },
    {
      id: '3',
      text: '✅ Hedge executed: Sold 0.5 BTC perpetual on OKX. Cost: $127.50',
      timestamp: new Date().toISOString(),
      sender: 'bot',
      type: 'response',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  const botCommands = [
    { command: '/monitor_risk', description: 'Monitor risk for specific asset' },
    { command: '/hedge_status', description: 'Check current hedging status' },
    { command: '/portfolio_risk', description: 'Get portfolio risk metrics' },
    { command: '/auto_hedge', description: 'Configure auto hedging' },
    { command: '/hedge_now', description: 'Execute manual hedge' },
    { command: '/help', description: 'Show all available commands' },
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      timestamp: new Date().toISOString(),
      sender: 'user',
      type: 'command',
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputText('');
  };

  const generateBotResponse = (command: string): Message => {
    const responses: { [key: string]: string } = {
      '/help': '🤖 Available Commands:\n/monitor_risk <asset> - Monitor risk\n/hedge_status - Check status\n/portfolio_risk - Portfolio metrics\n/auto_hedge <on/off> - Toggle auto hedge\n/hedge_now <asset> - Manual hedge',
      '/portfolio_risk': '📊 Portfolio Risk Metrics:\n• VaR (95%): $45,230\n• Max Drawdown: 8.5%\n• Total Delta: 23.4\n• Total Gamma: 2.1\n• Active Positions: 4',
      '/hedge_status': '🎯 Hedging Status:\n• BTC: Delta-neutral (Active)\n• ETH: Protective Put (Inactive)\n• SOL: Covered Call (Active)\n• Auto-hedging: Enabled',
      '/monitor_risk': '👁️ Risk monitoring activated for all assets. Will alert when thresholds exceeded.',
      '/auto_hedge': '⚙️ Auto-hedging configuration updated. Threshold: 0.6, Strategy: Delta-neutral',
      '/hedge_now': '🛡️ Manual hedge executed. Sold 0.3 BTC perpetual. Cost: $76.20. New delta: 0.42',
      '/set_threshold': '⚙️ Risk threshold updated successfully. New threshold applied to monitoring system.',
      '/hedge_history': '📈 Hedge History (Last 7 days):\n• Total Hedges: 12\n• Success Rate: 91.7%\n• Avg Cost: $89.50\n• Total Savings: $2,340',
      '/alerts': '🚨 Active Alerts (2):\n• BTC delta exposure: 0.84 (threshold: 0.7)\n• Portfolio VaR: $52,100 (limit: $50,000)',
      '/exchanges': '🔗 Exchange Status:\n• OKX: Connected (15ms)\n• Bybit: Connected (22ms)\n• Deribit: Connected (28ms)',
      '/pnl': '💰 P&L Summary:\n• Total Unrealized: +$12,450\n• Today: +$1,230\n• Best Performer: SOL (+$4,200)\n• Worst: ETH (-$890)',
      '/config': '⚙️ Bot Configuration:\n• Auto-hedge: Enabled\n• Risk Threshold: 0.6\n• Rebalance Frequency: 5min\n• Max Position Size: $100k',
    };

    const responseText = responses[command] || responses[command.split(' ')[0]] || 
      '❌ Unknown command. Type /help for available commands.';

    return {
      id: Date.now().toString(),
      text: responseText,
      timestamp: new Date().toISOString(),
      sender: 'bot',
      type: 'response',
    };
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageStyle = (message: Message) => {
    if (message.sender === 'user') {
      return 'bg-blue-600 text-white ml-12';
    }
    
    switch (message.type) {
      case 'alert':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'command':
        return 'bg-slate-700 text-slate-300';
      case 'response':
        return 'bg-slate-700 text-white';
      default:
        return 'bg-slate-700 text-white';
    }
  };

  return (
    <>
      <div className="bg-slate-800 rounded-lg border border-slate-700 h-96 flex flex-col">
      <div className="px-6 py-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">GoQuant Risk Bot</h3>
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400">1 user</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${getMessageStyle(message)}`}>
              <div className="text-sm whitespace-pre-line">{message.text}</div>
              <div className="text-xs mt-1 opacity-70">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a command... (e.g., /help)"
            className="flex-1 bg-slate-700 text-white px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-1">
          {botCommands.slice(0, 3).map((cmd) => (
            <button
              key={cmd.command}
              onClick={() => setInputText(cmd.command)}
              className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-2 py-1 rounded transition-colors"
            >
              {cmd.command}
            </button>
          ))}
        </div>
      </div>
    </div>

      {/* Bot Commands Reference */}
      <div className="mt-4 bg-slate-700/30 rounded-lg p-4 border border-slate-600">
      <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
        <MessageCircle className="w-4 h-4 mr-2" />
        Available Bot Commands
      </h4>
      
      <div className="space-y-3 text-xs">
        <div className="grid grid-cols-1 gap-2">
          <div className="bg-slate-800/50 rounded p-2">
            <div className="font-mono text-blue-400 mb-1">/help</div>
            <div className="text-slate-300">Show all available commands and their descriptions</div>
          </div>
          
          <div className="bg-slate-800/50 rounded p-2">
            <div className="font-mono text-blue-400 mb-1">/portfolio_risk</div>
            <div className="text-slate-300">Get current portfolio risk metrics (VaR, drawdown, Greeks)</div>
          </div>
          
          <div className="bg-slate-800/50 rounded p-2">
            <div className="font-mono text-blue-400 mb-1">/hedge_status</div>
            <div className="text-slate-300">Check current hedging status for all positions</div>
          </div>
          
          <div className="bg-slate-800/50 rounded p-2">
            <div className="font-mono text-blue-400 mb-1">/monitor_risk &lt;asset&gt;</div>
            <div className="text-slate-300">Start risk monitoring for specific asset (BTC, ETH, SOL, AVAX)</div>
          </div>
          
          <div className="bg-slate-800/50 rounded p-2">
            <div className="font-mono text-blue-400 mb-1">/auto_hedge &lt;on/off&gt;</div>
            <div className="text-slate-300">Enable or disable automatic hedging system</div>
          </div>
          
          <div className="bg-slate-800/50 rounded p-2">
            <div className="font-mono text-blue-400 mb-1">/hedge_now &lt;asset&gt;</div>
            <div className="text-slate-300">Execute immediate manual hedge for specified asset</div>
          </div>
          
          <div className="bg-slate-800/50 rounded p-2">
            <div className="font-mono text-blue-400 mb-1">/set_threshold &lt;asset&gt; &lt;value&gt;</div>
            <div className="text-slate-300">Set risk threshold for asset (e.g., /set_threshold BTC 0.7)</div>
          </div>
          
          <div className="bg-slate-800/50 rounded p-2">
            <div className="font-mono text-blue-400 mb-1">/hedge_history &lt;asset&gt;</div>
            <div className="text-slate-300">View historical hedging performance and costs</div>
          </div>
          
          <div className="bg-slate-800/50 rounded p-2">
            <div className="font-mono text-blue-400 mb-1">/alerts</div>
            <div className="text-slate-300">Show all active risk alerts and their status</div>
          </div>
          
          <div className="bg-slate-800/50 rounded p-2">
            <div className="font-mono text-blue-400 mb-1">/exchanges</div>
            <div className="text-slate-300">Check connection status and latency for all exchanges</div>
          </div>
          
          <div className="bg-slate-800/50 rounded p-2">
            <div className="font-mono text-blue-400 mb-1">/pnl</div>
            <div className="text-slate-300">Get current P&L summary for all positions</div>
          </div>
          
          <div className="bg-slate-800/50 rounded p-2">
            <div className="font-mono text-blue-400 mb-1">/config</div>
            <div className="text-slate-300">View current bot configuration and settings</div>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-slate-600">
          <div className="text-slate-400 text-xs">
            <strong>Usage Examples:</strong>
          </div>
          <div className="mt-1 space-y-1 text-slate-300">
            <div>• <span className="font-mono text-blue-400">/monitor_risk BTC</span> - Start monitoring BTC risk</div>
            <div>• <span className="font-mono text-blue-400">/hedge_now ETH</span> - Execute immediate ETH hedge</div>
            <div>• <span className="font-mono text-blue-400">/auto_hedge on</span> - Enable automatic hedging</div>
            <div>• <span className="font-mono text-blue-400">/set_threshold SOL 0.6</span> - Set SOL risk threshold to 0.6</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};