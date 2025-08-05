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
  Plus,
  Edit,
  Eye,
  FileText,
  Utensils,
  Scale,
  Stethoscope
} from 'lucide-react';

const AWWDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  // AWW Dashboard Stats - Day-to-day data entry and local management
  const stats = [
    {
      title: 'Registered Children',
      value: '45',
      change: '+3 this month',
      icon: Baby,
      color: 'blue',
      description: 'Total children under care'
    },
    {
      title: 'Pregnant Women',
      value: '12',
      change: '+2 this month',
      icon: Heart,
      color: 'pink',
      description: 'Active pregnancies monitored'
    },
    {
      title: 'Adolescents',
      value: '18',
      change: '+1 this month',
      icon: Users,
      color: 'purple',
      description: 'Girls aged 10-19 years'
    },
    {
      title: 'Daily Attendance',
      value: '38/45',
      change: '84% today',
      icon: Calendar,
      color: 'green',
      description: 'Children present today'
    },
    {
      title: 'Nutrition Distributed',
      value: '45',
      change: 'Today',
      icon: Utensils,
      color: 'orange',
      description: 'Meals served today'
    },
    {
      title: 'Pending Vaccinations',
      value: '8',
      change: 'Due this week',
      icon: Stethoscope,
      color: 'red',
      description: 'Children requiring vaccination'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'registration',
      message: 'New child registered - Aarav Kumar (2 years)',
      time: '30 minutes ago',
      icon: Baby,
      priority: 'medium'
    },
    {
      id: 2,
      type: 'nutrition',
      message: 'Nutrition distribution completed for 45 children',
      time: '2 hours ago',
      icon: Utensils,
      priority: 'low'
    },
    {
      id: 3,
      type: 'health',
      message: 'Growth monitoring completed for 15 children',
      time: '3 hours ago',
      icon: Scale,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'vaccination',
      message: 'Vaccination due alert for 8 children',
      time: '4 hours ago',
      icon: Stethoscope,
      priority: 'high'
    },
    {
      id: 5,
      type: 'waste',
      message: 'Waste collection logged for newborn care area',
      time: '5 hours ago',
      icon: Activity,
      priority: 'low'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: Activity },
    { id: 'registration', label: 'Registration', icon: Plus },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'health', label: 'Health & Growth', icon: Heart },
    { id: 'waste', label: 'Waste Tracking', icon: TrendingUp },
    { id: 'reports', label: 'Daily Reports', icon: FileText }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { name: 'Register Child', icon: Baby, action: () => setActiveTab('registration'), color: 'blue' },
          { name: 'Mark Attendance', icon: Calendar, action: () => setActiveTab('attendance'), color: 'green' },
          { name: 'Log Nutrition', icon: Utensils, action: () => setActiveTab('nutrition'), color: 'orange' },
          { name: 'Health Update', icon: Heart, action: () => setActiveTab('health'), color: 'red' }
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
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-black mt-1">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-2">{stat.description}</p>
            
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

  const renderRegistration = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Registration Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Register Child', icon: Baby, color: 'blue', description: 'Add new child to the system' },
          { title: 'Register Pregnant Woman', icon: Heart, color: 'pink', description: 'Add expectant mother' },
          { title: 'Register Adolescent', icon: Users, color: 'purple', description: 'Add adolescent girl (10-19 years)' },
          { title: 'Register Newborn', icon: Baby, color: 'green', description: 'Add newborn baby' }
        ].map((item, index) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-all"
          >
            <div className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center mb-4`}>
              <item.icon className={`w-6 h-6 text-${item.color}-600`} />
            </div>
            <h3 className="font-semibold text-black mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <button className={`mt-4 w-full bg-${item.color}-50 text-${item.color}-600 py-2 px-4 rounded-lg hover:bg-${item.color}-100 transition-colors`}>
              Start Registration
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Daily Attendance</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-black">Today's Attendance - {new Date().toLocaleDateString()}</h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Present: 38/45 (84%)</span>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Mark All Present
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Aarav Kumar', age: '3 years', status: 'present' },
            { name: 'Priya Sharma', age: '4 years', status: 'present' },
            { name: 'Rahul Singh', age: '2 years', status: 'absent' },
            { name: 'Anita Devi', age: '5 years', status: 'present' },
            { name: 'Vikash Kumar', age: '3 years', status: 'late' },
            { name: 'Sunita Rani', age: '4 years', status: 'present' }
          ].map((child, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-black">{child.name}</p>
                <p className="text-sm text-gray-600">{child.age}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  child.status === 'present' ? 'bg-green-100 text-green-800' :
                  child.status === 'absent' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {child.status}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNutrition = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Nutrition Distribution</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-orange-600">Today's Distribution</h3>
            <Utensils className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-black">45/45</p>
          <p className="text-sm text-gray-600">Children fed today</p>
          <button className="mt-4 w-full bg-orange-50 text-orange-600 py-2 px-4 rounded-lg hover:bg-orange-100">
            Log Distribution
          </button>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-green-600">Weekly Menu</h3>
            <Calendar className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-sm text-black font-medium">Today: Rice & Dal</p>
          <p className="text-sm text-gray-600">With vegetables</p>
          <button className="mt-4 w-full bg-green-50 text-green-600 py-2 px-4 rounded-lg hover:bg-green-100">
            View Menu
          </button>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-600">Stock Status</h3>
            <TrendingUp className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-sm text-black">Rice: 25kg</p>
          <p className="text-sm text-gray-600">Dal: 15kg</p>
          <button className="mt-4 w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100">
            Update Stock
          </button>
        </motion.div>
      </div>
    </div>
  );

  const renderHealth = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Health & Growth Monitoring</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Growth Monitoring</h3>
          <div className="space-y-4">
            {[
              { name: 'Aarav Kumar', age: '3 years', weight: '12.5kg', height: '92cm', status: 'normal' },
              { name: 'Priya Sharma', age: '4 years', weight: '14.2kg', height: '98cm', status: 'normal' },
              { name: 'Rahul Singh', age: '2 years', weight: '9.8kg', height: '82cm', status: 'underweight' }
            ].map((child, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-black">{child.name}</p>
                  <p className="text-sm text-gray-600">{child.age} - {child.weight}, {child.height}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  child.status === 'normal' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {child.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Vaccination Schedule</h3>
          <div className="space-y-4">
            {[
              { name: 'Vikash Kumar', vaccine: 'DPT Booster', due: '2024-01-20', status: 'due' },
              { name: 'Sunita Rani', vaccine: 'MMR', due: '2024-01-22', status: 'scheduled' },
              { name: 'Amit Singh', vaccine: 'Polio', due: '2024-01-18', status: 'overdue' }
            ].map((vaccination, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-black">{vaccination.name}</p>
                  <p className="text-sm text-gray-600">{vaccination.vaccine} - {vaccination.due}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  vaccination.status === 'due' ? 'bg-yellow-100 text-yellow-800' :
                  vaccination.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {vaccination.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderWasteTracking = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Waste Collection Tracking</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-black mb-4">Newborn-Related Waste Collection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Today's Collection Log</h4>
            <div className="space-y-3">
              {[
                { area: 'Delivery Room', time: '09:00 AM', status: 'completed' },
                { area: 'Newborn Care Area', time: '11:30 AM', status: 'completed' },
                { area: 'Mother Care Unit', time: '02:00 PM', status: 'pending' }
              ].map((log, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-black">{log.area}</p>
                    <p className="text-sm text-gray-600">{log.time}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    log.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
            <div className="space-y-3">
              <button className="w-full bg-blue-50 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-100 text-left">
                <div className="flex items-center">
                  <Plus className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-medium">Log Waste Collection</p>
                    <p className="text-sm opacity-75">Record new collection activity</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full bg-orange-50 text-orange-600 py-3 px-4 rounded-lg hover:bg-orange-100 text-left">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-medium">Request Collection</p>
                    <p className="text-sm opacity-75">Alert sanitation team</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Daily Activity Reports</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-black">Submit Daily Activity Log</h3>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
            Submit Report
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Today's Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Children Attendance</span>
                <span className="font-medium text-black">38/45</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Nutrition Distributed</span>
                <span className="font-medium text-black">45</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Health Checkups</span>
                <span className="font-medium text-black">8</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Vaccinations</span>
                <span className="font-medium text-black">3</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Alerts & Referrals</h4>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">High Priority</p>
                <p className="text-red-700 text-sm">1 child requires immediate medical attention</p>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 font-medium">Medium Priority</p>
                <p className="text-yellow-700 text-sm">3 children need follow-up checkups</p>
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
      case 'registration':
        return renderRegistration();
      case 'attendance':
        return renderAttendance();
      case 'nutrition':
        return renderNutrition();
      case 'health':
        return renderHealth();
      case 'waste':
        return renderWasteTracking();
      case 'reports':
        return renderReports();
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
                <Baby className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-black">Anganwadi Worker Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-black transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="text-sm text-gray-600">
                Welcome, {localStorage.getItem('userName') || 'Anganwadi Worker'}
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

export default AWWDashboard;