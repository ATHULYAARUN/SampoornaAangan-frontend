import React from 'react';
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Activity, 
  Heart, 
  Syringe,
  Users,
  MapPin,
  Calendar
} from 'lucide-react';

const HealthActivityLogs = ({ activities, language }) => {
  const getTranslation = (key) => {
    const translations = {
      en: {
        recentActivities: 'Recent Health Activities',
        completed: 'Completed',
        pending: 'Pending',
        critical: 'Critical',
        viewAll: 'View All Activities',
        noActivities: 'No recent activities',
        noActivitiesDesc: 'Health activities will appear here as they are logged',
        children: 'children',
        hoursAgo: 'hours ago',
        daysAgo: 'days ago',
        justNow: 'Just now'
      },
      ml: {
        recentActivities: 'സമീപകാല ആരോഗ്യ പ്രവർത്തനങ്ങൾ',
        completed: 'പൂർത്തിയായി',
        pending: 'പെൻഡിംഗ്',
        critical: 'ഗുരുതരം',
        viewAll: 'എല്ലാ പ്രവർത്തനങ്ങളും കാണുക',
        noActivities: 'സമീപകാല പ്രവർത്തനങ്ങളില്ല',
        noActivitiesDesc: 'ആരോഗ്യ പ്രവർത്തനങ്ങൾ ലോഗ് ചെയ്യുമ്പോൾ അവ ഇവിടെ ദൃശ്യമാകും',
        children: 'കുട്ടികൾ',
        hoursAgo: 'മണിക്കൂർ മുമ്പ്',
        daysAgo: 'ദിവസം മുമ്പ്',
        justNow: 'ഇപ്പോൾ തന്നെ'
      }
    };
    return translations[language][key] || key;
  };

  const getActivityIcon = (activity) => {
    if (activity.includes('vaccination') || activity.includes('immunization')) {
      return Syringe;
    } else if (activity.includes('health checkup') || activity.includes('medical')) {
      return Heart;
    } else if (activity.includes('nutrition') || activity.includes('assessment')) {
      return Activity;
    } else {
      return CheckCircle;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
          label: getTranslation('completed')
        };
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: Clock,
          label: getTranslation('pending')
        };
      case 'critical':
        return {
          color: 'bg-red-100 text-red-800',
          icon: AlertTriangle,
          label: getTranslation('critical')
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: Activity,
          label: status
        };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInHours = Math.floor((now - activityTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return getTranslation('justNow');
    if (diffInHours < 24) return `${diffInHours} ${getTranslation('hoursAgo')}`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ${getTranslation('daysAgo')}`;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {getTranslation('recentActivities')}
          </h3>
        </div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          {getTranslation('viewAll')}
        </button>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {!activities || activities.length === 0 ? (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h4 className="text-lg font-medium text-gray-600 mb-1">
              {getTranslation('noActivities')}
            </h4>
            <p className="text-gray-500 text-sm">
              {getTranslation('noActivitiesDesc')}
            </p>
          </div>
        ) : (
          activities.map((activity) => {
            const ActivityIcon = getActivityIcon(activity.activity);
            const statusBadge = getStatusBadge(activity.status);
            const StatusIcon = statusBadge.icon;
            
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer"
              >
                {/* Activity Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <ActivityIcon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>

                {/* Activity Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-semibold text-gray-900">
                        {activity.center}
                      </h4>
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusBadge.label}</span>
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mb-2">
                    {activity.activity}
                  </p>

                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{activity.children} {getTranslation('children')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(activity.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex-shrink-0">
                  {activity.status === 'completed' && (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  )}
                  {activity.status === 'pending' && (
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  )}
                  {activity.status === 'critical' && (
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Activity Summary */}
      {activities && activities.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {activities.filter(a => a.status === 'completed').length}
              </div>
              <div className="text-xs text-green-600 font-medium">
                {getTranslation('completed')}
              </div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-yellow-600">
                {activities.filter(a => a.status === 'pending').length}
              </div>
              <div className="text-xs text-yellow-600 font-medium">
                {getTranslation('pending')}
              </div>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-red-600">
                {activities.filter(a => a.status === 'critical').length}
              </div>
              <div className="text-xs text-red-600 font-medium">
                {getTranslation('critical')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthActivityLogs;