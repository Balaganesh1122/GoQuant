import React, { useState } from 'react';
import { FileText, Shield, AlertTriangle, CheckCircle, Clock, Download } from 'lucide-react';
import { ComplianceReport } from '../types';

export const ComplianceReporting: React.FC = () => {
  const [reports] = useState<ComplianceReport[]>([
    {
      id: 'pos-001',
      timestamp: new Date().toISOString(),
      type: 'position_report',
      data: { totalPositions: 4, totalValue: 450000, leverage: 2.1 },
      status: 'submitted',
      regulatoryBody: 'CFTC',
    },
    {
      id: 'var-001',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      type: 'var_report',
      data: { portfolioVaR: 45230, confidence: 0.95, timeHorizon: '1d' },
      status: 'approved',
      regulatoryBody: 'SEC',
    },
    {
      id: 'risk-001',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      type: 'risk_disclosure',
      data: { riskLevel: 'Medium', maxLoss: 50000, hedgeRatio: 0.85 },
      status: 'pending',
      regulatoryBody: 'FCA',
    },
    {
      id: 'stress-001',
      timestamp: new Date(Date.now() - 259200000).toISOString(),
      type: 'stress_test',
      data: { scenarios: 5, worstCase: -0.15, averageCase: -0.03 },
      status: 'approved',
      regulatoryBody: 'ESMA',
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'submitted': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'pending': return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      case 'rejected': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-400 bg-green-500/20';
      case 'submitted': return 'text-yellow-400 bg-yellow-500/20';
      case 'pending': return 'text-orange-400 bg-orange-500/20';
      case 'rejected': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'position_report': return <FileText className="w-4 h-4" />;
      case 'var_report': return <Shield className="w-4 h-4" />;
      case 'risk_disclosure': return <AlertTriangle className="w-4 h-4" />;
      case 'stress_test': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const formatReportType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const generateReport = (type: string) => {
    console.log('Generating report:', type);
    // In a real implementation, this would generate and submit the report
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700">
      <div className="px-6 py-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Regulatory Compliance</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-sm text-slate-400">Compliant</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Quick Actions */}
        <div className="mb-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <h4 className="text-sm font-semibold text-white mb-3">Generate Reports</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button
              onClick={() => generateReport('position_report')}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs transition-colors"
            >
              <FileText className="w-3 h-3" />
              <span>Position Report</span>
            </button>
            <button
              onClick={() => generateReport('var_report')}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs transition-colors"
            >
              <Shield className="w-3 h-3" />
              <span>VaR Report</span>
            </button>
            <button
              onClick={() => generateReport('risk_disclosure')}
              className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded text-xs transition-colors"
            >
              <AlertTriangle className="w-3 h-3" />
              <span>Risk Disclosure</span>
            </button>
            <button
              onClick={() => generateReport('stress_test')}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-xs transition-colors"
            >
              <CheckCircle className="w-3 h-3" />
              <span>Stress Test</span>
            </button>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white">Recent Reports</h4>
          {reports.map((report) => (
            <div key={report.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    {getReportTypeIcon(report.type)}
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-white">
                      {formatReportType(report.type)}
                    </h5>
                    <p className="text-xs text-slate-400">
                      {new Date(report.timestamp).toLocaleDateString()} • {report.regulatoryBody}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${getStatusColor(report.status)}`}>
                    {getStatusIcon(report.status)}
                    <span className="ml-1 capitalize">{report.status}</span>
                  </span>
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {report.type === 'position_report' && (
                  <>
                    <div>
                      <span className="text-slate-400">Total Positions: </span>
                      <span className="text-white">{report.data.totalPositions}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Total Value: </span>
                      <span className="text-white">${report.data.totalValue.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Leverage: </span>
                      <span className="text-white">{report.data.leverage}x</span>
                    </div>
                  </>
                )}
                {report.type === 'var_report' && (
                  <>
                    <div>
                      <span className="text-slate-400">Portfolio VaR: </span>
                      <span className="text-white">${report.data.portfolioVaR.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Confidence: </span>
                      <span className="text-white">{(report.data.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Time Horizon: </span>
                      <span className="text-white">{report.data.timeHorizon}</span>
                    </div>
                  </>
                )}
                {report.type === 'risk_disclosure' && (
                  <>
                    <div>
                      <span className="text-slate-400">Risk Level: </span>
                      <span className="text-white">{report.data.riskLevel}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Max Loss: </span>
                      <span className="text-white">${report.data.maxLoss.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Hedge Ratio: </span>
                      <span className="text-white">{(report.data.hedgeRatio * 100).toFixed(0)}%</span>
                    </div>
                  </>
                )}
                {report.type === 'stress_test' && (
                  <>
                    <div>
                      <span className="text-slate-400">Scenarios: </span>
                      <span className="text-white">{report.data.scenarios}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Worst Case: </span>
                      <span className="text-red-400">{(report.data.worstCase * 100).toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Average Case: </span>
                      <span className="text-yellow-400">{(report.data.averageCase * 100).toFixed(1)}%</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Summary */}
        <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <h4 className="text-sm font-semibold text-white mb-3">Compliance Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-400">100%</div>
              <div className="text-xs text-slate-400">Compliance Rate</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-400">12</div>
              <div className="text-xs text-slate-400">Reports This Month</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-400">2</div>
              <div className="text-xs text-slate-400">Pending Reviews</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-400">4</div>
              <div className="text-xs text-slate-400">Regulatory Bodies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};