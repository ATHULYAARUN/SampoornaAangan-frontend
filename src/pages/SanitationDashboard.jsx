import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  MapPin, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Activity,
  Bell,
  LogOut,
  Eye,
  FileText,
  MessageSquare,
  Calendar,
  TrendingUp
} from 'lucide-react';
import authService from '../services/authService';
import sessionManager from '../utils/sessionManager';

const SanitationDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    try {
      console.log('🔐 Sanitation logout button clicked, starting logout process...');
      
      // Use sessionManager for complete cleanup
      sessionManager.destroySession();
      console.log('🧹 Session destroyed via sessionManager');

      // Call logout service
      await authService.logout();
      console.log('✅ AuthService logout successful');
      
      // Redirect to login page
      navigate('/login', { replace: true });
      console.log('📍 Navigated to login page');
      
    } catch (error) {
      console.error('❌ Sanitation logout error:', error);
      // Force logout even if there's an error
      console.log('🔧 Force clearing session data...');
      sessionManager.destroySession();
      navigate('/login', { replace: true });
    }
  };

  // Sanitation Worker Dashboard Stats - Read-only and checklist access
  const stats = [
    {
      title: 'Assigned Locations',
      value: '12',
      change: 'Active routes',
      icon: MapPin,
      color: 'blue',
      description: 'Total collection points assigned'
    },
    {
      title: 'Collections Today',
      value: '9/12',
      change: '75% Complete',
      icon: CheckCircle,
      color: 'green',
      description: 'Waste collection progress'
    },
    {
      title: 'Pending Collections',
      value: '3',
      change: 'Remaining today',
      icon: Clock,
      color: 'orange',
      description: 'Collections yet to be completed'
    },
    {
      title: 'Issues Reported',
      value: '2',
      change: 'This week',
      icon: AlertTriangle,
      color: 'red',
      description: 'Collection issues logged'
    },
    {
      title: 'Newborn Waste',
      value: '4',
      change: 'Special collections',
      icon: Trash2,
      color: 'purple',
      description: 'Newborn-related waste pickups'
    },
    {
      title: 'Weekly Target',
      value: '84/84',
      change: '100% achieved',
      icon: TrendingUp,
      color: 'indigo',
      description: 'Weekly collection target status'
    }
  ];

  const wasteCollectionLogs = [
    {
      id: 1,
      location: 'Anganwadi Center - Pune East',
      address: 'Sector 15, Pune East',
      status: 'Done',
      time: '09:30 AM',
      type: 'General Waste',
      notes: 'Collection completed successfully'
    },
    {
      id: 2,
      location: 'Anganwadi Center - Mumbai North',
      address: 'Block A, Mumbai North',
      status: 'Done',
      time: '10:15 AM',
      type: 'Newborn Waste',
      notes: 'Special handling completed'
    },
    {
      id: 3,
      location: 'Anganwadi Center - Nashik Rural',
      address: 'Village Road, Nashik',
      status: 'Pending',
      time: '11:00 AM',
      type: 'General Waste',
      notes: 'Route delayed due to traffic'
    },
    {
      id: 4,
      location: 'Anganwadi Center - Thane West',
      address: 'Sector 7, Thane West',
      status: 'Partial',
      time: '02:30 PM',
      type: 'Mixed Waste',
      notes: 'Partial collection - container full'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'collection',
      message: 'Waste collection completed at Pune East center',
      time: '30 minutes ago',
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'issue',
      message: 'Reported container overflow at Mumbai North',
      time: '2 hours ago',
      icon: AlertTriangle
    },
    {
      id: 3,
      type: 'collection',
      message: 'Special newborn waste handling completed',
      time: '3 hours ago',
      icon: Trash2
    },
    {
      id: 4,
      type: 'feedback',
      message: 'Submitted feedback for route optimization',
      time: '1 day ago',
      icon: MessageSquare
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: Activity },
    { id: 'collections', label: 'Collection Logs', icon: Trash2 },
    { id: 'routes', label: 'Assigned Routes', icon: MapPin },
    { id: 'checklist', label: 'Daily Checklist', icon: CheckCircle },
    { id: 'feedback', label: 'Report Issues', icon: MessageSquare }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Partial':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-black mt-2">{stat.value}</p>
                <p className="text-sm text-blue-600 mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Today's Collections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-black mb-4">Today's Collection Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {wasteCollectionLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-black">{log.location}</div>
                    <div className="text-sm text-gray-500">{log.address}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-black">{log.time}</td>
                  <td className="px-4 py-4 text-sm text-black">{log.type}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{log.notes}</td>
                  <td className="px-4 py-4">
                    {log.status === 'Pending' && (
                      <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                        Mark Done
                      </button>
                    )}
                    {log.status === 'Partial' && (
                      <button className="text-orange-600 hover:text-orange-900 text-sm font-medium">
                        Complete
                      </button>
                    )}
                    {log.status === 'Done' && (
                      <span className="text-green-600 text-sm">✓ Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-black mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <activity.icon className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-black">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderCollections = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Waste Collection Logs</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-black">Today's Collection Status</h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Progress: 9/12 completed</span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {wasteCollectionLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-black">{log.location}</div>
                    <div className="text-sm text-gray-500">{log.address}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-black">{log.time}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      log.type === 'Newborn Waste' ? 'bg-purple-100 text-purple-800' :
                      log.type === 'Medical Waste' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      log.status === 'Done' ? 'bg-green-100 text-green-800' :
                      log.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {log.status === 'Pending' && (
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                        Mark Done
                      </button>
                    )}
                    {log.status === 'Partial' && (
                      <button className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700">
                        Complete
                      </button>
                    )}
                    {log.status === 'Done' && (
                      <span className="text-green-600 text-sm">✓ Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRoutes = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Assigned Collection Routes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Route A - East Zone</h3>
          <div className="space-y-4">
            {[
              { location: 'Anganwadi Center - Pune East', time: '08:00 AM', priority: 'high', type: 'General + Newborn' },
              { location: 'Community Health Center', time: '09:30 AM', priority: 'medium', type: 'Medical Waste' },
              { location: 'Anganwadi Center - Sector 15', time: '11:00 AM', priority: 'high', type: 'General + Newborn' },
              { location: 'Primary Health Center', time: '12:30 PM', priority: 'medium', type: 'Medical Waste' }
            ].map((stop, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-black">{stop.location}</p>
                  <p className="text-sm text-gray-600">{stop.time} • {stop.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  stop.priority === 'high' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {stop.priority}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Route B - West Zone</h3>
          <div className="space-y-4">
            {[
              { location: 'Anganwadi Center - Mumbai West', time: '02:00 PM', priority: 'high', type: 'General + Newborn' },
              { location: 'Maternity Ward - West Hospital', time: '03:30 PM', priority: 'high', type: 'Newborn Waste' },
              { location: 'Anganwadi Center - Sector 22', time: '04:30 PM', priority: 'medium', type: 'General' },
              { location: 'Community Center', time: '05:30 PM', priority: 'low', type: 'General' }
            ].map((stop, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-black">{stop.location}</p>
                  <p className="text-sm text-gray-600">{stop.time} • {stop.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  stop.priority === 'high' ? 'bg-red-100 text-red-800' :
                  stop.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {stop.priority}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-black mb-4">Special Collection Points</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { type: 'Newborn Waste Collection', locations: 4, frequency: 'Daily', color: 'purple' },
            { type: 'Medical Waste Pickup', locations: 2, frequency: 'Twice Daily', color: 'red' },
            { type: 'General Waste Collection', locations: 6, frequency: 'Daily', color: 'gray' }
          ].map((category, index) => (
            <div key={index} className={`p-4 bg-${category.color}-50 border border-${category.color}-200 rounded-lg`}>
              <h4 className={`font-medium text-${category.color}-800 mb-2`}>{category.type}</h4>
              <p className={`text-${category.color}-700 text-sm`}>{category.locations} locations</p>
              <p className={`text-${category.color}-600 text-xs`}>{category.frequency}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderChecklist = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Daily Collection Checklist</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-black">Today's Checklist - {new Date().toLocaleDateString()}</h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Progress: 9/12 completed</span>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Submit Daily Report
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {[
            { task: 'Anganwadi Center - Pune East', status: 'done', time: '08:30 AM', type: 'General + Newborn' },
            { task: 'Community Health Center', status: 'done', time: '09:45 AM', type: 'Medical Waste' },
            { task: 'Anganwadi Center - Sector 15', status: 'done', time: '11:15 AM', type: 'General + Newborn' },
            { task: 'Primary Health Center', status: 'done', time: '12:45 PM', type: 'Medical Waste' },
            { task: 'Anganwadi Center - Mumbai West', status: 'done', time: '02:15 PM', type: 'General + Newborn' },
            { task: 'Maternity Ward - West Hospital', status: 'done', time: '03:45 PM', type: 'Newborn Waste' },
            { task: 'Anganwadi Center - Sector 22', status: 'done', time: '04:45 PM', type: 'General' },
            { task: 'Community Center', status: 'done', time: '05:45 PM', type: 'General' },
            { task: 'Anganwadi Center - North Zone', status: 'done', time: '06:15 PM', type: 'General' },
            { task: 'Health Sub-Center', status: 'pending', time: 'Scheduled: 07:00 PM', type: 'Medical Waste' },
            { task: 'Anganwadi Center - South Zone', status: 'pending', time: 'Scheduled: 07:30 PM', type: 'General + Newborn' },
            { task: 'Emergency Collection Point', status: 'pending', time: 'Scheduled: 08:00 PM', type: 'Special Waste' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  item.status === 'done' ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {item.status === 'done' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-black">{item.task}</p>
                  <p className="text-sm text-gray-600">{item.time} • {item.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {item.status === 'pending' && (
                  <>
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                      Mark Done
                    </button>
                    <button className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700">
                      Partial
                    </button>
                  </>
                )}
                {item.status === 'done' && (
                  <span className="text-green-600 text-sm font-medium">✓ Completed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Report Issues & Feedback</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Quick Issue Reporting</h3>
          <div className="space-y-4">
            {[
              { issue: 'Container Overflow', icon: AlertTriangle, color: 'red', description: 'Report overflowing waste containers' },
              { issue: 'Access Problem', icon: MapPin, color: 'orange', description: 'Report access issues to collection points' },
              { issue: 'Equipment Issue', icon: Trash2, color: 'blue', description: 'Report problems with collection equipment' },
              { issue: 'Route Optimization', icon: TrendingUp, color: 'green', description: 'Suggest route improvements' }
            ].map((item, index) => (
              <button
                key={index}
                className={`w-full p-4 bg-${item.color}-50 text-${item.color}-600 rounded-lg hover:bg-${item.color}-100 transition-colors text-left`}
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-medium">{item.issue}</p>
                    <p className="text-sm opacity-75">{item.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Recent Issues Reported</h3>
          <div className="space-y-4">
            {[
              { 
                issue: 'Container Overflow', 
                location: 'Anganwadi Center - Pune East', 
                status: 'Resolved', 
                date: '2024-01-14',
                response: 'Additional container provided'
              },
              { 
                issue: 'Access Problem', 
                location: 'Community Health Center', 
                status: 'In Progress', 
                date: '2024-01-13',
                response: 'Maintenance team contacted'
              },
              { 
                issue: 'Route Optimization', 
                location: 'West Zone Route', 
                status: 'Under Review', 
                date: '2024-01-12',
                response: 'Route analysis in progress'
              }
            ].map((report, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-black">{report.issue}</p>
                    <p className="text-sm text-gray-600">{report.location}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    report.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                    report.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {report.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{report.response}</p>
                <p className="text-xs text-gray-500">{report.date}</p>
              </div>
            ))}
          </div>
          
          <button className="mt-4 w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700">
            Submit New Issue Report
          </button>
        </motion.div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'collections':
        return renderCollections();
      case 'routes':
        return renderRoutes();
      case 'checklist':
        return renderChecklist();
      case 'feedback':
        return renderFeedback();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mr-3">
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-black">Sanitation Worker Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-black transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="text-sm text-gray-600">
                Welcome, {localStorage.getItem('userName') || 'Sanitation Worker'}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-black transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-accent-500 text-accent-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default SanitationDashboard;