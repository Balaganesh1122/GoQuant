import React from 'react';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { Alert } from '../types';

interface AlertsPanelProps {
  alerts: Alert[];
  onAcknowledgeAlert: (alertId: string) => void;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, onAcknowledgeAlert }) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />;
      default:
        return <Info className="w-5 h-5 text-slate-400" />;
    }
  };

  const getAlertBorderColor = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return 'border-l-red-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'info':
        return 'border-l-blue-500';
      default:
        return 'border-l-slate-500';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700">
      <div className="px-6 py-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Risk Alerts</h3>
          <div className="flex items-center text-sm text-slate-400">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {alerts.filter(a => !a.acknowledged).length} active
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="px-6 py-8 text-center text-slate-400">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-400" />
            <p>No active alerts</p>
            <p className="text-sm mt-1">All risk metrics are within acceptable ranges</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 border-l-4 ${getAlertBorderColor(alert.type)} ${
                  alert.acknowledged ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-white">
                          {alert.message}
                        </p>
                        {alert.asset && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-300">
                            {alert.asset}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center space-x-4 text-xs text-slate-400">
                        <span>{formatTime(alert.timestamp)}</span>
                        {alert.action && (
                          <span className="capitalize">Action: {alert.action}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!alert.acknowledged && (
                      <button
                        onClick={() => onAcknowledgeAlert(alert.id)}
                        className="text-slate-400 hover:text-white transition-colors"
                        title="Acknowledge alert"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};