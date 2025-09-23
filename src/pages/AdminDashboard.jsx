import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Baby, 
  Heart, 
  GraduationCap, 
  BarChart3, 
  Settings, 
  FileText, 
  MapPin, 
  Calendar, 
  TrendingUp,
  UserCheck,
  Activity,
  Shield,
  Database,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  LogOut,
  RefreshCw,
  Wifi,
  WifiOff
} from 'lucide-react';
import UserManagement from '../components/UserManagement';
import WorkerManagement from '../components/admin/WorkerManagement';
import ExportButton from '../components/admin/ExportButton';
import dashboardService from '../services/dashboardService';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRealTime, setIsRealTime] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Set up real-time dashboard updates
  useEffect(() => {
    console.log('🚀 Setting up real-time dashboard...');

    // Subscribe to dashboard updates
    const unsubscribe = dashboardService.subscribe((data) => {
      console.log('📊 Received dashboard update:', data);
      setDashboardData(data);
      setLastUpdated(data.lastUpdated);
      setIsRealTime(data.isRealTime);
      setIsLoading(false);
    });

    // Start real-time updates (every 15 seconds for more responsive updates)
    dashboardService.startRealTimeUpdates(15000);

    // Set high frequency when user is on anganwadi management tab
    if (activeTab === 'anganwadi') {
      dashboardService.setUpdateFrequency('high'); // 5 seconds
    } else {
      dashboardService.setUpdateFrequency('normal'); // 15 seconds
    }

    // Cleanup on unmount
    return () => {
      console.log('🛑 Cleaning up dashboard service...');
      dashboardService.stopRealTimeUpdates();
      unsubscribe();
    };
  }, []);

  // Update frequency based on active tab
  useEffect(() => {
    if (activeTab === 'anganwadi') {
      dashboardService.setUpdateFrequency('high'); // More frequent updates for anganwadi data
    } else if (activeTab === 'overview') {
      dashboardService.setUpdateFrequency('normal');
    } else {
      dashboardService.setUpdateFrequency('low');
    }
  }, [activeTab]);

  const handleLogout = () => {
    // Stop real-time updates
    dashboardService.stopRealTimeUpdates();

    // Clear authentication data
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAuthenticated');

    // Redirect to login page
    navigate('/login');
  };

  // Manual refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await dashboardService.refreshNow();
      console.log('✅ Manual refresh completed');
    } catch (error) {
      console.error('❌ Manual refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Icon mapping for string to component conversion
  const iconMap = {
    Baby,
    Users,
    Shield,
    Heart,
    Activity,
    FileText,
    Database
  };

  // Get real-time stats or fallback to default values
  const getStats = () => {
    if (isLoading || !dashboardData) {
      return [
        {
          title: 'Total Anganwadis',
          value: '2',
          change: '+0%',
          icon: Baby,
          color: 'blue',
          description: 'Active centers under monitoring'
        },
        {
          title: 'Total Users',
          value: '0',
          change: '+0%',
          icon: Users,
          color: 'green',
          description: 'All registered users in system'
        },
        {
          title: 'Scheme Coverage',
          value: '85%',
          change: '+5.2%',
          icon: Shield,
          color: 'purple',
          description: 'Overall scheme implementation'
        },
        {
          title: 'Health Alerts',
          value: '0',
          change: '+0%',
          icon: Heart,
          color: 'red',
          description: 'High-risk pregnancy & anemia alerts'
        },
        {
          title: 'Waste Management',
          value: '94.5%',
          change: '+2.1%',
          icon: Activity,
          color: 'orange',
          description: 'Collection efficiency rate'
        },
        {
          title: 'Data Verification',
          value: '0',
          change: '+0%',
          icon: FileText,
          color: 'indigo',
          description: 'Pending verifications'
        }
      ];
    }

    // Get stats from service and map icon strings to components
    const serviceStats = dashboardService.getFormattedStats(dashboardData);
    return serviceStats.map(stat => ({
      ...stat,
      icon: iconMap[stat.icon] || Activity
    }));
  };

  const stats = getStats();

  // Get real-time recent activities
  const getRecentActivities = () => {
    if (dashboardData && dashboardData.recentActivities) {
      return dashboardData.recentActivities.map(activity => ({
        ...activity,
        icon: getIconForActivityType(activity.type)
      }));
    }

    // Fallback activities when no data is available
    return [
      {
        id: 'default-1',
        type: 'info',
        message: 'No recent activities to display',
        time: 'Just now',
        icon: Activity,
        priority: 'low'
      },
      {
        id: 'default-2',
        type: 'info',
        message: 'System monitoring active',
        time: '1 min ago',
        icon: Bell,
        priority: 'low'
      }
    ];
  };

  // Helper function to get icon for activity type
  const getIconForActivityType = (type) => {
    switch (type) {
      case 'alert': return Heart;
      case 'registration': return Users;
      case 'verification': return FileText;
      case 'waste': return Activity;
      case 'report': return BarChart3;
      default: return Bell;
    }
  };

  const recentActivities = getRecentActivities();

  // Get real-time Anganwadi data
  const anganwadiData = dashboardService.getAnganwadiData(dashboardData);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${stat.color}-100 text-${stat.color}-600`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-black mt-1">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-2">{stat.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-black mb-4">Monthly Growth</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization will be here</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
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
    </div>
  );

  const renderAnganwadiManagement = () => (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-black">Anganwadi Management</h2>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search anganwadis..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            <Plus className="w-4 h-4" />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* Anganwadi Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Anganwadi Center
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Center Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ward
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Children
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {anganwadiData.map((center) => (
                <tr key={center.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-black">{center.name}</div>
                    <div className="text-sm text-gray-500">Last updated: {center.lastUpdate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Database className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-sm font-semibold text-blue-600">{center.code}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-black">{center.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {center.ward}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-green-500 mr-1" />
                      <span className="font-semibold">{center.workers}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    <div className="flex items-center">
                      <Baby className="w-4 h-4 text-purple-500 mr-1" />
                      <span className="font-semibold">{center.children}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      center.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {center.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );

  const renderUserManagement = () => (
    <UserManagement />
  );

  const renderWorkerManagement = () => (
    <WorkerManagement />
  );

  const renderReports = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Reports & Analytics</h2>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <p className="text-gray-600">Reports and analytics interface will be implemented here.</p>
      </div>
    </div>
  );

  const renderHealthMonitoring = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Health Monitoring & Alerts</h2>
      
      {/* Health Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-red-600">High-Risk Pregnancies</h3>
            <Heart className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-black">12</p>
          <p className="text-sm text-gray-600">Requiring immediate attention</p>
          <button className="mt-4 w-full bg-red-50 text-red-600 py-2 px-4 rounded-lg hover:bg-red-100">
            View Details
          </button>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-orange-600">Anemia Cases</h3>
            <Activity className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-black">34</p>
          <p className="text-sm text-gray-600">Adolescent girls affected</p>
          <button className="mt-4 w-full bg-orange-50 text-orange-600 py-2 px-4 rounded-lg hover:bg-orange-100">
            View Details
          </button>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-green-600">Growth Monitoring</h3>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-black">89%</p>
          <p className="text-sm text-gray-600">Children on track</p>
          <button className="mt-4 w-full bg-green-50 text-green-600 py-2 px-4 rounded-lg hover:bg-green-100">
            View Charts
          </button>
        </motion.div>
      </div>

      {/* Recent Health Activities */}
      <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-black mb-4">Recent Health Activities</h3>
        <div className="space-y-4">
          {[
            { center: 'Akkarakunnu Center', activity: 'Monthly health checkup completed', children: 25, time: '2 hours ago' },
            { center: 'Ward 3 Center', activity: 'Vaccination drive conducted', children: 18, time: '1 day ago' },
            { center: 'Ward 5 Center', activity: 'Nutrition assessment done', children: 32, time: '2 days ago' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-black">{item.center}</p>
                <p className="text-sm text-gray-600">{item.activity} - {item.children} children</p>
              </div>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderWasteManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Waste Management Monitoring</h2>
      
      {/* Waste Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Collection Rate</h3>
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-black">94.5%</p>
          <p className="text-xs text-green-600">+2.1% from last week</p>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Pending Collections</h3>
            <Bell className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-black">8</p>
          <p className="text-xs text-orange-600">Requires attention</p>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Active Workers</h3>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-black">15</p>
          <p className="text-xs text-blue-600">On duty today</p>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Feedback Score</h3>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-black">4.2/5</p>
          <p className="text-xs text-purple-600">Community rating</p>
        </motion.div>
      </div>

      {/* Waste Collection Logs */}
      <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-black">Recent Collection Logs</h3>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All Logs
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Worker</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { area: 'Ward 1', worker: 'Ravi Kumar', status: 'Completed', time: '09:30 AM', notes: 'All bins collected' },
                { area: 'Ward 2', worker: 'Sunita Devi', status: 'In Progress', time: '10:15 AM', notes: 'Partial collection' },
                { area: 'Ward 3', worker: 'Mohan Singh', status: 'Pending', time: '-', notes: 'Equipment issue' }
              ].map((log, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-black">{log.area}</td>
                  <td className="px-4 py-3 text-sm text-black">{log.worker}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      log.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      log.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{log.time}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{log.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">System Settings</h2>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <p className="text-gray-600">System settings interface will be implemented here.</p>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
    { id: 'anganwadis', label: 'Anganwadi Centers', icon: Baby },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'workers', label: 'Worker Management', icon: UserCheck },
    { id: 'monitoring', label: 'Health Monitoring', icon: Heart },
    { id: 'waste', label: 'Waste Management', icon: Activity },
    { id: 'reports', label: 'Analytics & Reports', icon: FileText },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'anganwadis':
        return renderAnganwadiManagement();
      case 'users':
        return renderUserManagement();
      case 'workers':
        return renderWorkerManagement();
      case 'monitoring':
        return renderHealthMonitoring();
      case 'waste':
        return renderWasteManagement();
      case 'reports':
        return renderReports();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Dashboard Header - Not Homepage Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-black">Admin Dashboard</h1>
                <div className="flex items-center space-x-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${isRealTime ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="text-gray-500">
                    {isRealTime ? 'Live' : 'Offline'} •
                    {lastUpdated ? ` Updated ${new Date(lastUpdated).toLocaleTimeString()}` : ' Loading...'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Export Button */}
              <ExportButton />

              {/* Manual Refresh Button */}
              <motion.button
                onClick={handleRefresh}
                disabled={isRefreshing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 text-gray-600 hover:text-black transition-colors duration-200 ${
                  isRefreshing ? 'animate-spin' : ''
                }`}
                title="Refresh dashboard data"
              >
                <RefreshCw className="w-5 h-5" />
              </motion.button>

              {/* Real-time Status */}
              <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg">
                {isRealTime ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500" />
                )}
                <span className="text-xs font-medium text-gray-700">
                  {isRealTime ? 'Live' : 'Offline'}
                </span>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-black transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Logout Button */}
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </motion.button>
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
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
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

export default AdminDashboard;
