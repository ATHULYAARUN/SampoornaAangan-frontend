import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  // Parent Dashboard Stats - Monitor child status
  const stats = [
    {
      title: 'My Children',
      value: '2',
      change: 'Registered',
      icon: Baby,
      color: 'blue',
      description: 'Children enrolled in anganwadi'
    },
    {
      title: 'Attendance Rate',
      value: '92%',
      change: 'This month',
      icon: Calendar,
      color: 'green',
      description: 'Average attendance percentage'
    },
    {
      title: 'Pending Vaccinations',
      value: '1',
      change: 'Due this week',
      icon: Stethoscope,
      color: 'red',
      description: 'Immunizations required'
    },
    {
      title: 'Growth Status',
      value: 'Normal',
      change: 'Last checkup',
      icon: TrendingUp,
      color: 'green',
      description: 'Overall health progress'
    },
    {
      title: 'Scheme Benefits',
      value: '3',
      change: 'Active',
      icon: Gift,
      color: 'purple',
      description: 'Welfare schemes enrolled'
    },
    {
      title: 'Nutrition Score',
      value: '8/10',
      change: 'Good progress',
      icon: Utensils,
      color: 'orange',
      description: 'Nutritional development rating'
    }
  ];

  const children = [
    {
      id: 1,
      name: 'Aarav Kumar',
      age: '3 years 2 months',
      lastVisit: '2024-01-15',
      weight: '12.5 kg',
      height: '92 cm',
      vaccinations: '8/10',
      status: 'Healthy'
    },
    {
      id: 2,
      name: 'Priya Kumar',
      age: '5 years 8 months',
      lastVisit: '2024-01-14',
      weight: '16.2 kg',
      height: '105 cm',
      vaccinations: '10/10',
      status: 'Healthy'
    }
  ];

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
        <h3 className="text-lg font-semibold text-black mb-4">My Children</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {children.map((child) => (
            <div key={child.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-black">{child.name}</h4>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  child.status === 'Healthy' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {child.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Age:</strong> {child.age}</p>
                <p><strong>Weight:</strong> {child.weight}</p>
                <p><strong>Height:</strong> {child.height}</p>
                <p><strong>Vaccinations:</strong> {child.vaccinations}</p>
                <p><strong>Last Visit:</strong> {child.lastVisit}</p>
              </div>
            </div>
          ))}
        </div>
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
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-4">My Children's Details</h2>
            <p className="text-gray-600">Detailed health records, attendance, and development tracking for your children will be displayed here.</p>
          </div>
        );
      case 'health':
        return (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-4">Health & Growth Charts</h2>
            <p className="text-gray-600">Interactive growth charts showing your children's height, weight, and development progress over time will be displayed here.</p>
          </div>
        );
      case 'attendance':
        return (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-4">Attendance Records</h2>
            <p className="text-gray-600">View your children's daily attendance records and monthly statistics.</p>
          </div>
        );
      case 'benefits':
        return (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-4">Welfare Benefits</h2>
            <p className="text-gray-600">Track all welfare scheme benefits, allowances, and support received for your family will be displayed here.</p>
          </div>
        );
      case 'feedback':
        return (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-4">Submit Feedback</h2>
            <p className="text-gray-600">Submit feedback about hygiene, sanitation, and anganwadi services will be available here.</p>
          </div>
        );
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