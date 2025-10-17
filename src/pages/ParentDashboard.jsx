import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import parentService from '../services/parentService';
import authService from '../services/authService';
import sessionManager from '../utils/sessionManager';
import ChildDetailsCard from '../components/Parent/ChildDetailsCard';
import ParentHealthGrowthMultiChild from '../components/Parent/ParentHealthGrowthMultiChild';
import ParentAttendanceTracker from '../components/Parent/ParentAttendanceTracker';
import ParentFeedbackSystem from '../components/Parent/ParentFeedbackSystem';
import WelfareBenefitsSimple from '../components/WelfareBenefitsSimple';
import { 
  Baby, 
  Users, 
  Heart, 
  Calendar, 
  TrendingUp,
  Activity,
  Bell,
  LogOut,
  Eye,
  FileText,
  Utensils,
  Scale,
  Stethoscope,
  Gift,
  MessageSquare
} from 'lucide-react';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [children, setChildren] = useState([]);
  const [parentStats, setParentStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch parent data on component mount
  useEffect(() => {
    fetchParentData();
  }, []);

  const fetchParentData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Fetching parent dashboard data...');
      console.log('👤 User info:', {
        name: localStorage.getItem('userName'),
        email: localStorage.getItem('userEmail'),
        role: localStorage.getItem('userRole'),
        isAuthenticated: localStorage.getItem('isAuthenticated'),
        hasAuthToken: !!localStorage.getItem('authToken'),
        hasFirebaseToken: !!localStorage.getItem('firebaseToken')
      });

      // Fetch parent statistics and children data
      const stats = await parentService.getParentStats();

      setParentStats(stats);
      setChildren(stats.children);

      console.log('✅ Parent data loaded successfully');
      console.log('📊 Stats:', stats);
      console.log('👶 Children found:', stats.children?.length || 0);

    } catch (error) {
      console.error('❌ Failed to fetch parent data:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack,
        userInfo: {
          name: localStorage.getItem('userName'),
          email: localStorage.getItem('userEmail'),
          role: localStorage.getItem('userRole')
        }
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('🔐 Logout button clicked, starting logout process...');
      
      // Use sessionManager for complete cleanup
      sessionManager.destroySession();
      console.log('🧹 Session destroyed via sessionManager');
      
      // Call the logout service
      await authService.logout();
      
      console.log('✅ Logout successful, navigating to login page');
      navigate('/login', { replace: true });
      
    } catch (error) {
      console.error('❌ Logout error:', error);
      
      // Force logout even if there's an error
      console.log('🔧 Force clearing session data...');
      sessionManager.destroySession();
      
      // Navigate to login page
      navigate('/login', { replace: true });
    }
  };

  const handleViewChildDetails = (childId) => {
    console.log('👶 Viewing details for child:', childId);
    // Navigate to child details page or open modal
    setActiveTab('children');
    // You could also navigate to a dedicated child details page
    // navigate(`/parent/child/${childId}`);
  };

  // Generate stats from real data
  const getStats = () => {
    if (!parentStats) {
      return [
        {
          title: 'My Children',
          value: '0',
          change: 'Loading...',
          icon: Baby,
          color: 'blue',
          description: 'Children enrolled in anganwadi'
        },
        {
          title: 'Attendance Rate',
          value: '-%',
          change: 'Loading...',
          icon: Calendar,
          color: 'green',
          description: 'Average attendance percentage'
        },
        {
          title: 'Pending Vaccinations',
          value: '-',
          change: 'Loading...',
          icon: Stethoscope,
          color: 'red',
          description: 'Immunizations required'
        },
        {
          title: 'Health Status',
          value: '-',
          change: 'Loading...',
          icon: TrendingUp,
          color: 'green',
          description: 'Overall health progress'
        }
      ];
    }

    return [
      {
        title: 'My Children',
        value: parentStats.totalChildren.toString(),
        change: 'Registered',
        icon: Baby,
        color: 'blue',
        description: 'Children enrolled in anganwadi'
      },
      {
        title: 'Attendance Rate',
        value: `${parentStats.attendanceRate}%`,
        change: 'This month',
        icon: Calendar,
        color: parentStats.attendanceRate >= 90 ? 'green' : parentStats.attendanceRate >= 75 ? 'yellow' : 'red',
        description: 'Average attendance percentage'
      },
      {
        title: 'Pending Vaccinations',
        value: parentStats.pendingVaccinations.toString(),
        change: parentStats.pendingVaccinations > 0 ? 'Action needed' : 'All up-to-date',
        icon: Stethoscope,
        color: parentStats.pendingVaccinations > 0 ? 'red' : 'green',
        description: 'Immunizations required'
      },
      {
        title: 'Healthy Children',
        value: `${parentStats.healthyChildren}/${parentStats.totalChildren}`,
        change: 'Current status',
        icon: TrendingUp,
        color: parentStats.healthyChildren === parentStats.totalChildren ? 'green' : 'yellow',
        description: 'Overall health progress'
      }
    ];
  };

  const stats = getStats();

  // Children data is now loaded from the API via useState

  const recentActivities = [
    {
      id: 1,
      type: 'vaccination',
      message: 'Vaccination reminder: DPT booster due for Aarav',
      time: '2 hours ago',
      icon: Stethoscope
    },
    {
      id: 2,
      type: 'nutrition',
      message: 'Nutrition supplement distributed to Priya',
      time: '1 day ago',
      icon: Utensils
    },
    {
      id: 3,
      type: 'growth',
      message: 'Growth monitoring completed for both children',
      time: '3 days ago',
      icon: Scale
    },
    {
      id: 4,
      type: 'benefit',
      message: 'Monthly nutrition allowance credited: ₹1,200',
      time: '1 week ago',
      icon: Gift
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: Activity },
    { id: 'children', label: 'My Children', icon: Baby },
    { id: 'health', label: 'Health & Growth', icon: Heart },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'benefits', label: 'Scheme Benefits', icon: Gift },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare }
  ];

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
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Children Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-black">My Children</h3>
          {children.length > 0 && (
            <button
              onClick={() => setActiveTab('children')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All Details →
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading children data...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-red-600 mb-2">❌ Failed to load children data</div>
            <p className="text-gray-600 text-sm">{error}</p>
            <button
              onClick={fetchParentData}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : !children || children.length === 0 ? (
          <div className="text-center py-8">
            <Baby className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Children Found</h4>
            <p className="text-gray-600 mb-4">
              No children are registered under your account. Please contact your Anganwadi Worker if this seems incorrect.
            </p>
            <div className="text-sm text-gray-500">
              <p>Parent: {localStorage.getItem('userName')}</p>
              <p>Email: {localStorage.getItem('userEmail')}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {children.slice(0, 2).map((child) => (
              <ChildDetailsCard
                key={child.id}
                child={child}
                onViewDetails={handleViewChildDetails}
              />
            ))}
            {children.length > 2 && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setActiveTab('children')}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  View {children.length - 2} More Children
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-black mb-4">Recent Updates</h3>
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

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'children':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-black">My Children's Details</h2>
                  <p className="text-gray-600">Comprehensive health records, attendance, and development tracking</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Children</p>
                  <p className="text-2xl font-bold text-blue-600">{children.length}</p>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading children details...</span>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-red-600 mb-4">❌ Failed to load children data</div>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <button
                    onClick={fetchParentData}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Retry Loading
                  </button>
                </div>
              ) : !children || children.length === 0 ? (
                <div className="text-center py-12">
                  <Baby className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Children Registered</h3>
                  <p className="text-gray-600 mb-4">
                    No children are currently registered under your account.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-blue-800 font-medium mb-2">Logged in as:</p>
                    <p className="text-sm text-blue-700">Name: {localStorage.getItem('userName')}</p>
                    <p className="text-sm text-blue-700">Email: {localStorage.getItem('userEmail')}</p>
                    <p className="text-sm text-blue-700">Role: {localStorage.getItem('userRole')}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Please contact your local Anganwadi Worker if you believe this is an error.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {children.map((child) => (
                    <ChildDetailsCard
                      key={child.id}
                      child={child}
                      onViewDetails={handleViewChildDetails}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'health':
        return <ParentHealthGrowthMultiChild />;
      case 'attendance':
        return <ParentAttendanceTracker />;
      case 'benefits':
        return <WelfareBenefitsSimple />;
      case 'feedback':
        return <ParentFeedbackSystem />;
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
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-black">Parent Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-black transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="text-sm text-gray-600">
                Welcome, {localStorage.getItem('userName') || 'Parent'}
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

export default ParentDashboard;