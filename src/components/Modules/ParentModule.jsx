import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Baby, 
  Calendar, 
  Heart, 
  BookOpen,
  Utensils,
  Activity,
  MessageCircle,
  Bell,
  FileText,
  Camera,
  Award,
  TrendingUp
} from 'lucide-react';
import DashboardCard from '../Dashboard/DashboardCard';

const ParentModule = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const parentStats = [
    {
      title: 'My Children',
      value: '2',
      icon: Baby,
      color: 'blue',
      trend: 'stable',
      trendValue: '0%'
    },
    {
      title: 'Attendance Rate',
      value: '95%',
      icon: Calendar,
      color: 'green',
      trend: 'up',
      trendValue: '+5%'
    },
    {
      title: 'Health Checkups',
      value: '8',
      icon: Heart,
      color: 'red',
      trend: 'up',
      trendValue: '+2'
    },
    {
      title: 'Learning Progress',
      value: '85%',
      icon: BookOpen,
      color: 'purple',
      trend: 'up',
      trendValue: '+10%'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'children', name: 'My Children', icon: Baby },
    { id: 'attendance', name: 'Attendance', icon: Calendar },
    { id: 'health', name: 'Health Records', icon: Heart },
    { id: 'nutrition', name: 'Nutrition', icon: Utensils },
    { id: 'learning', name: 'Learning Progress', icon: BookOpen },
    { id: 'communication', name: 'Messages', icon: MessageCircle }
  ];

  const myChildren = [
    { 
      id: 1, 
      name: 'Aarav Kumar', 
      age: '4 years', 
      class: 'Pre-School A',
      attendance: '96%',
      lastCheckup: '2024-01-15',
      status: 'Active',
      photo: '/api/placeholder/60/60'
    },
    { 
      id: 2, 
      name: 'Kavya Kumar', 
      age: '3 years', 
      class: 'Nursery B',
      attendance: '94%',
      lastCheckup: '2024-01-18',
      status: 'Active',
      photo: '/api/placeholder/60/60'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'attendance',
      title: 'Aarav attended school',
      description: 'Present for morning session and activities',
      time: '2 hours ago',
      icon: Calendar,
      color: 'green'
    },
    {
      id: 2,
      type: 'health',
      title: 'Health checkup completed',
      description: 'Monthly health screening for Kavya',
      time: '1 day ago',
      icon: Heart,
      color: 'red'
    },
    {
      id: 3,
      type: 'learning',
      title: 'Learning milestone achieved',
      description: 'Aarav completed alphabet recognition',
      time: '2 days ago',
      icon: Award,
      color: 'purple'
    },
    {
      id: 4,
      type: 'nutrition',
      title: 'Nutrition supplement provided',
      description: 'Weekly nutrition package distributed',
      time: '3 days ago',
      icon: Utensils,
      color: 'orange'
    }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Parent-Teacher Meeting', date: '2024-01-25', time: '10:00 AM', type: 'meeting' },
    { id: 2, title: 'Health Camp', date: '2024-01-28', time: '09:00 AM', type: 'health' },
    { id: 3, title: 'Cultural Program', date: '2024-02-02', time: '11:00 AM', type: 'event' },
    { id: 4, title: 'Vaccination Drive', date: '2024-02-05', time: '10:00 AM', type: 'health' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-gray-900 font-display">
          Parent Portal
        </h1>
        <p className="text-gray-600 mt-2">
          Track your child's progress, health, and activities
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {parentStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            transition={{ delay: index * 0.1 }}
          >
            <DashboardCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants}>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* My Children Cards */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">My Children</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myChildren.map((child) => (
                    <motion.div
                      key={child.id}
                      whileHover={{ y: -5 }}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <Baby className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{child.name}</h3>
                          <p className="text-sm text-gray-600">{child.age} • {child.class}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Attendance</span>
                          <span className="text-sm font-medium text-green-600">{child.attendance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Last Checkup</span>
                          <span className="text-sm font-medium text-gray-900">{child.lastCheckup}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Status</span>
                          <span className="text-sm font-medium text-green-600">{child.status}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent Activities */}
              <div className="card mt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <motion.div
                        key={activity.id}
                        whileHover={{ x: 5 }}
                        className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-lg bg-${activity.color}-100 flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 text-${activity.color}-600`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900">{activity.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                          <p className="text-xs text-gray-400 mt-2">{activity.time}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
                  <Bell className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                    >
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">{event.time}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          event.type === 'health' ? 'bg-red-100 text-red-800' :
                          event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'children' && (
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Children Details</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {myChildren.map((child) => (
                <motion.div
                  key={child.id}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Baby className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{child.name}</h3>
                      <p className="text-gray-600">{child.age} • {child.class}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{child.attendance}</p>
                      <p className="text-sm text-gray-600">Attendance</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm font-medium text-gray-900">{child.lastCheckup}</p>
                      <p className="text-sm text-gray-600">Last Checkup</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Attendance Records</h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Attendance Tracking</h3>
              <p className="text-gray-600">Detailed attendance records and calendar view will be implemented here.</p>
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Health Records</h2>
              <Heart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Health Monitoring</h3>
              <p className="text-gray-600">Health records, vaccination status, and growth charts will be implemented here.</p>
            </div>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Nutrition Information</h2>
              <Utensils className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center py-12">
              <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nutrition Tracking</h3>
              <p className="text-gray-600">Nutrition information, meal plans, and dietary recommendations will be implemented here.</p>
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Learning Progress</h2>
              <BookOpen className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Learning Development</h3>
              <p className="text-gray-600">Learning milestones, progress reports, and educational activities will be implemented here.</p>
            </div>
          </div>
        )}

        {activeTab === 'communication' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Messages & Communication</h2>
              <MessageCircle className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Communication Hub</h3>
              <p className="text-gray-600">Messages from teachers, announcements, and parent-teacher communication will be implemented here.</p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ParentModule;