import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  Home, 
  Calendar, 
  TrendingUp,
  Activity,
  Bell,
  LogOut,
  Plus,
  Edit,
  Eye,
  FileText,
  MapPin,
  Phone,
  UserCheck
} from 'lucide-react';

const ASHADashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  // ASHA Dashboard Stats - Field support and outreach
  const stats = [
    {
      title: 'Households Covered',
      value: '156',
      change: '+8 this month',
      icon: Home,
      color: 'blue',
      description: 'Total households under coverage'
    },
    {
      title: 'Health Visits',
      value: '28',
      change: '+5 this week',
      icon: Heart,
      color: 'red',
      description: 'Home visits completed'
    },
    {
      title: 'Awareness Sessions',
      value: '12',
      change: 'This month',
      icon: Users,
      color: 'green',
      description: 'Community awareness programs'
    },
    {
      title: 'Scheme Tracking',
      value: '89%',
      change: '+3% this month',
      icon: TrendingUp,
      color: 'purple',
      description: 'Scheme awareness coverage'
    },
    {
      title: 'Follow-ups Pending',
      value: '15',
      change: 'Due this week',
      icon: Calendar,
      color: 'orange',
      description: 'Household follow-ups required'
    },
    {
      title: 'Referrals Made',
      value: '8',
      change: '+2 this week',
      icon: UserCheck,
      color: 'indigo',
      description: 'Medical referrals to health centers'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'visit',
      message: 'Household visit completed - Sharma Family',
      time: '1 hour ago',
      icon: Home
    },
    {
      id: 2,
      type: 'awareness',
      message: 'Menstrual hygiene awareness session conducted',
      time: '3 hours ago',
      icon: Users
    },
    {
      id: 3,
      type: 'referral',
      message: 'High-risk pregnancy case referred to PHC',
      time: '5 hours ago',
      icon: Heart
    },
    {
      id: 4,
      type: 'update',
      message: 'Updated health records for 5 families',
      time: '1 day ago',
      icon: FileText
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: Activity },
    { id: 'visits', label: 'Home Visits', icon: Home },
    { id: 'awareness', label: 'Awareness Sessions', icon: Users },
    { id: 'schemes', label: 'Scheme Tracking', icon: TrendingUp },
    { id: 'data', label: 'Field Data', icon: FileText },
    { id: 'feedback', label: 'Feedback', icon: Heart }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { name: 'Schedule Visit', icon: Home, action: () => setActiveTab('visits'), color: 'blue' },
          { name: 'Log Awareness', icon: Users, action: () => setActiveTab('awareness'), color: 'green' },
          { name: 'Update Schemes', icon: TrendingUp, action: () => setActiveTab('schemes'), color: 'purple' },
          { name: 'Submit Feedback', icon: Heart, action: () => setActiveTab('feedback'), color: 'red' }
        ].map((action) => (
          <motion.button
            key={action.name}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.action}
            className={`p-4 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all text-center`}
          >
            <action.icon className={`w-8 h-8 text-${action.color}-600 mx-auto mb-2`} />
            <p className="text-sm font-medium text-gray-900">{action.name}</p>
          </motion.button>
        ))}
      </div>

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
              <span className="text-xs text-gray-500">{stat.change}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-black mt-1">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-2">{stat.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-black mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                <activity.icon className="w-4 h-4 text-secondary-600" />
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

  const renderVisits = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Home Visits & Follow-ups</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Scheduled Visits</h3>
          <div className="space-y-4">
            {[
              { family: 'Sharma Family', address: 'Ward 3, House 45', type: 'Pregnancy Follow-up', time: '10:00 AM', status: 'pending' },
              { family: 'Kumar Family', address: 'Ward 1, House 23', type: 'Child Health Check', time: '02:00 PM', status: 'completed' },
              { family: 'Singh Family', address: 'Ward 2, House 67', type: 'Immunization Follow-up', time: '04:00 PM', status: 'pending' }
            ].map((visit, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-black">{visit.family}</p>
                  <p className="text-sm text-gray-600">{visit.address}</p>
                  <p className="text-sm text-blue-600">{visit.type} - {visit.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  visit.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {visit.status}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100">
            Schedule New Visit
          </button>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Visit Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">This Week</span>
              <span className="font-medium text-black">28 visits</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Completed</span>
              <span className="font-medium text-green-600">23 visits</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Pending</span>
              <span className="font-medium text-yellow-600">5 visits</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Follow-ups Due</span>
              <span className="font-medium text-red-600">12 families</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderAwareness = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Awareness Sessions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-green-600">Hygiene Awareness</h3>
            <Users className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-black">8</p>
          <p className="text-sm text-gray-600">Sessions this month</p>
          <button className="mt-4 w-full bg-green-50 text-green-600 py-2 px-4 rounded-lg hover:bg-green-100">
            Schedule Session
          </button>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-orange-600">Nutrition Education</h3>
            <Heart className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-black">6</p>
          <p className="text-sm text-gray-600">Sessions this month</p>
          <button className="mt-4 w-full bg-orange-50 text-orange-600 py-2 px-4 rounded-lg hover:bg-orange-100">
            Schedule Session
          </button>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-pink-600">Menstrual Care</h3>
            <Users className="w-6 h-6 text-pink-500" />
          </div>
          <p className="text-3xl font-bold text-black">4</p>
          <p className="text-sm text-gray-600">Sessions this month</p>
          <button className="mt-4 w-full bg-pink-50 text-pink-600 py-2 px-4 rounded-lg hover:bg-pink-100">
            Schedule Session
          </button>
        </motion.div>
      </div>

      <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-black mb-4">Recent Awareness Activities</h3>
        <div className="space-y-4">
          {[
            { topic: 'Hand Washing Techniques', participants: 25, location: 'Community Center', date: '2024-01-15' },
            { topic: 'Nutritional Food for Children', participants: 18, location: 'Anganwadi Center', date: '2024-01-12' },
            { topic: 'Menstrual Hygiene Management', participants: 15, location: 'School Premises', date: '2024-01-10' }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-black">{session.topic}</p>
                <p className="text-sm text-gray-600">{session.location} - {session.participants} participants</p>
              </div>
              <span className="text-xs text-gray-500">{session.date}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderSchemes = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Scheme Awareness Tracking</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Scheme Coverage Status</h3>
          <div className="space-y-4">
            {[
              { scheme: 'Pradhan Mantri Matru Vandana Yojana', coverage: '92%', families: 145 },
              { scheme: 'Anganwadi Services', coverage: '89%', families: 156 },
              { scheme: 'Immunization Program', coverage: '95%', families: 134 },
              { scheme: 'Nutrition Supplementation', coverage: '87%', families: 142 }
            ].map((scheme, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium text-black">{scheme.scheme}</p>
                  <span className="text-sm font-medium text-green-600">{scheme.coverage}</span>
                </div>
                <p className="text-sm text-gray-600">{scheme.families} families covered</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: scheme.coverage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Update Scheme Awareness</h3>
          <div className="space-y-4">
            <button className="w-full bg-blue-50 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-100 text-left">
              <div className="flex items-center">
                <Plus className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-medium">Add New Family</p>
                  <p className="text-sm opacity-75">Register family for schemes</p>
                </div>
              </div>
            </button>
            
            <button className="w-full bg-green-50 text-green-600 py-3 px-4 rounded-lg hover:bg-green-100 text-left">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-medium">Update Coverage</p>
                  <p className="text-sm opacity-75">Mark scheme awareness status</p>
                </div>
              </div>
            </button>

            <button className="w-full bg-purple-50 text-purple-600 py-3 px-4 rounded-lg hover:bg-purple-100 text-left">
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-medium">Generate Report</p>
                  <p className="text-sm opacity-75">Monthly coverage report</p>
                </div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderFieldData = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Field Data Collection</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-black mb-4">Assist AWW Data Collection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Data Collection Tasks</h4>
            <div className="space-y-3">
              {[
                { task: 'Child Growth Measurements', center: 'Akkarakunnu Center', status: 'pending', priority: 'high' },
                { task: 'Pregnancy Health Updates', center: 'Ward 3 Center', status: 'in-progress', priority: 'medium' },
                { task: 'Vaccination Status Update', center: 'Ward 1 Center', status: 'completed', priority: 'low' }
              ].map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-black">{task.task}</p>
                    <p className="text-sm text-gray-600">{task.center}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      task.status === 'completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {task.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Quick Data Entry</h4>
            <div className="space-y-3">
              <button className="w-full bg-blue-50 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-100 text-left">
                <div className="flex items-center">
                  <Plus className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-medium">Update Child Data</p>
                    <p className="text-sm opacity-75">Growth, attendance, health</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full bg-pink-50 text-pink-600 py-3 px-4 rounded-lg hover:bg-pink-100 text-left">
                <div className="flex items-center">
                  <Heart className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-medium">Pregnancy Updates</p>
                    <p className="text-sm opacity-75">Health status, checkups</p>
                  </div>
                </div>
              </button>

              <button className="w-full bg-green-50 text-green-600 py-3 px-4 rounded-lg hover:bg-green-100 text-left">
                <div className="flex items-center">
                  <UserCheck className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-medium">Vaccination Data</p>
                    <p className="text-sm opacity-75">Update immunization records</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Health Visit Feedback</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-black">Submit Visit Feedback</h3>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
            Submit New Feedback
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Recent Feedback Submitted</h4>
            <div className="space-y-3">
              {[
                { family: 'Sharma Family', type: 'Pregnancy Follow-up', feedback: 'Mother needs iron supplements', date: '2024-01-15', status: 'reviewed' },
                { family: 'Kumar Family', type: 'Child Health', feedback: 'Child showing signs of malnutrition', date: '2024-01-14', status: 'pending' },
                { family: 'Singh Family', type: 'Immunization', feedback: 'Vaccination completed successfully', date: '2024-01-13', status: 'reviewed' }
              ].map((feedback, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-black">{feedback.family}</p>
                      <p className="text-sm text-gray-600">{feedback.type}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      feedback.status === 'reviewed' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {feedback.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{feedback.feedback}</p>
                  <p className="text-xs text-gray-500">{feedback.date}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Feedback Categories</h4>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Health Concerns</span>
                <span className="font-medium text-red-600">8 pending</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Nutrition Issues</span>
                <span className="font-medium text-orange-600">5 pending</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Vaccination Updates</span>
                <span className="font-medium text-green-600">12 completed</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Follow-up Required</span>
                <span className="font-medium text-blue-600">6 scheduled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'visits':
        return renderVisits();
      case 'awareness':
        return renderAwareness();
      case 'schemes':
        return renderSchemes();
      case 'data':
        return renderFieldData();
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
              <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center mr-3">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-black">ASHA Worker Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-black transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="text-sm text-gray-600">
                Welcome, {localStorage.getItem('userName') || 'ASHA Worker'}
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
                    ? 'border-secondary-500 text-secondary-600'
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

export default ASHADashboard;