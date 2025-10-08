import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Heart, 
  TrendingUp, 
  Syringe, 
  Clock, 
  CheckCircle,
  XCircle,
  Eye,
  Bell,
  Filter
} from 'lucide-react';

const AlertsPanel = ({ alerts, language }) => {
  const [filter, setFilter] = useState('all'); // all, pending, in-progress, resolved
  const [sortBy, setSortBy] = useState('timestamp'); // timestamp, severity, status

  const getTranslation = (key) => {
    const translations = {
      en: {
        alertsNotifications: 'Alerts & Notifications',
        highRisk: 'High Risk',
        growth: 'Growth Alert',
        vaccination: 'Vaccination',
        pending: 'Pending',
        inProgress: 'In Progress',
        resolved: 'Resolved',
        markResolved: 'Mark as Resolved',
        viewDetails: 'View Details',
        allAlerts: 'All Alerts',
        sortBy: 'Sort by',
        timestamp: 'Time',
        severity: 'Severity',
        status: 'Status',
        noAlerts: 'No alerts found',
        noAlertsDesc: 'All health indicators are within normal ranges'
      },
      ml: {
        alertsNotifications: 'അലേർട്ടുകളും അറിയിപ്പുകളും',
        highRisk: 'ഉയർന്ന അപകടസാധ്യത',
        growth: 'വളർച്ചാ അലേർട്ട്',
        vaccination: 'വാക്സിനേഷൻ',
        pending: 'പെൻഡിംഗ്',
        inProgress: 'പ്രോഗ്രസ്സിൽ',
        resolved: 'പരിഹരിച്ചു',
        markResolved: 'പരിഹരിച്ചതായി അടയാളപ്പെടുത്തുക',
        viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
        allAlerts: 'എല്ലാ അലേർട്ടുകളും',
        sortBy: 'ക്രമപ്പെടുത്തുക',
        timestamp: 'സമയം',
        severity: 'തീവ്രത',
        status: 'നില',
        noAlerts: 'അലേർട്ടുകൾ കണ്ടെത്തിയില്ല',
        noAlertsDesc: 'എല്ലാ ആരോഗ്യ സൂചകങ്ങളും സാധാരണ പരിധിയിലാണ്'
      }
    };
    return translations[language][key] || key;
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'high-risk':
        return Heart;
      case 'growth':
        return TrendingUp;
      case 'vaccination':
        return Syringe;
      default:
        return AlertTriangle;
    }
  };

  const getAlertColor = (type, status) => {
    if (status === 'resolved') return 'text-green-600 bg-green-100';
    
    switch (type) {
      case 'high-risk':
        return 'text-red-600 bg-red-100';
      case 'growth':
        return 'text-orange-600 bg-orange-100';
      case 'vaccination':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return CheckCircle;
      case 'in-progress':
        return Clock;
      default:
        return XCircle;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'text-green-600 bg-green-100';
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-red-600 bg-red-100';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInHours = Math.floor((now - alertTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const handleMarkResolved = (alertId) => {
    // In a real app, this would call an API to update the alert status
    console.log('Marking alert as resolved:', alertId);
  };

  const filteredAlerts = (alerts || [])
    .filter(alert => filter === 'all' || alert.status === filter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'timestamp':
          return new Date(b.timestamp) - new Date(a.timestamp);
        case 'severity': {
          const severityOrder = { 'high-risk': 3, 'growth': 2, 'vaccination': 1 };
          return (severityOrder[b.type] || 0) - (severityOrder[a.type] || 0);
        }
        case 'status': {
          const statusOrder = { 'pending': 3, 'in-progress': 2, 'resolved': 1 };
          return (statusOrder[b.status] || 0) - (statusOrder[a.status] || 0);
        }
        default:
          return 0;
      }
    });

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {getTranslation('alertsNotifications')}
          </h3>
        </div>
        {filteredAlerts.length > 0 && (
          <span className="px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
            {filteredAlerts.filter(a => a.status === 'pending').length} pending
          </span>
        )}
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{getTranslation('allAlerts')}</option>
            <option value="pending">{getTranslation('pending')}</option>
            <option value="in-progress">{getTranslation('inProgress')}</option>
            <option value="resolved">{getTranslation('resolved')}</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{getTranslation('sortBy')}:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500"
          >
            <option value="timestamp">{getTranslation('timestamp')}</option>
            <option value="severity">{getTranslation('severity')}</option>
            <option value="status">{getTranslation('status')}</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <h4 className="text-lg font-medium text-gray-900 mb-1">
              {getTranslation('noAlerts')}
            </h4>
            <p className="text-gray-500">
              {getTranslation('noAlertsDesc')}
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const AlertIcon = getAlertIcon(alert.type);
            const StatusIcon = getStatusIcon(alert.status);
            
            return (
              <div
                key={alert.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getAlertColor(alert.type, alert.status)}`}>
                    <AlertIcon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">
                        {alert.center}
                      </p>
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span className="capitalize">{alert.status.replace('-', ' ')}</span>
                        </div>
                        
                        {alert.type === 'high-risk' && (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium text-red-600">Critical</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{getTranslation('viewDetails')}</span>
                        </button>
                        
                        {alert.status !== 'resolved' && (
                          <button
                            onClick={() => handleMarkResolved(alert.id)}
                            className="text-green-600 hover:text-green-800 text-xs font-medium"
                          >
                            {getTranslation('markResolved')}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;