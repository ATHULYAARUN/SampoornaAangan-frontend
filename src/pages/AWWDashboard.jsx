import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ChildRegistrationForm from '../components/Registration/ChildRegistrationForm';
import PregnantWomanRegistrationForm from '../components/Registration/PregnantWomanRegistrationForm';
import AdolescentRegistrationForm from '../components/Registration/AdolescentRegistrationForm';
import NewbornRegistrationForm from '../components/Registration/NewbornRegistrationForm';
import AttendanceManagement from '../components/attendance/AttendanceManagement';
import HealthGrowthMonitoring from '../components/health/HealthGrowthMonitoring';
import AWWProfile from '../components/Profile/AWWProfile';
import registrationService from '../services/registrationService';
import authService from '../services/authService';
import sessionManager from '../utils/sessionManager';
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
  Stethoscope,
  User
} from 'lucide-react';

const AWWDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showRegistrationForm, setShowRegistrationForm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Nutrition state management
  const [nutritionData, setNutritionData] = useState({
    todayDistribution: 45,
    totalChildren: 45,
    weeklyMenu: {
      // Week 1
      'Week1-Monday': {
        snack: 'Ragi Porridge (with jaggery)',
        lunch: 'Rice + Sambar + Egg Curry / Green Gram Curry',
        evening: 'Steamed Banana (Nendran)'
      },
      'Week1-Tuesday': {
        snack: 'Wheat Upma with vegetables',
        lunch: 'Rice + Moru Curry + Cabbage Thoran + Fish Curry / Vanpayar Curry',
        evening: 'Rava Ladoo + Milk'
      },
      'Week1-Wednesday': {
        snack: 'Green Gram Sundal',
        lunch: 'Rice + Dal Curry + Beetroot Thoran + Papadam',
        evening: 'Aval Nanachathu (with banana & jaggery)'
      },
      'Week1-Thursday': {
        snack: 'Boiled Sweet Potato',
        lunch: 'Rice + Sambar + Spinach Thoran + Fish Fry / Soya Curry',
        evening: 'Milk + Banana'
      },
      'Week1-Friday': {
        snack: 'Ragi Idiyappam with Coconut Milk',
        lunch: 'Rice + Vegetable Kurma + Yam Upperi',
        evening: 'Groundnut Chikki'
      },
      'Week1-Saturday': {
        snack: 'Idli + Sambar',
        lunch: 'Rice + Vegetable Pulissery + Beans Thoran + Curd',
        evening: 'Upma + Milk'
      },
      // Week 2
      'Week2-Monday': {
        snack: 'Wheat Porridge with milk',
        lunch: 'Rice + Vegetable Sambar + Egg Roast / Cowpea Curry',
        evening: 'Banana Fry (Pazham Pori with less oil)'
      },
      'Week2-Tuesday': {
        snack: 'Rava Upma with groundnuts',
        lunch: 'Rice + Tomato Rasam + Cabbage Thoran',
        evening: 'Boiled Corn with salt'
      },
      'Week2-Wednesday': {
        snack: 'Aval Ladoo',
        lunch: 'Rice + Dal Curry + Pumpkin Erissery',
        evening: 'Milk + Chana Sundal'
      },
      'Week2-Thursday': {
        snack: 'Banana + Jaggery Drink',
        lunch: 'Rice + Spinach Sambar + Fish Curry / Soya Thoran',
        evening: 'Vegetable Cutlet + Milk'
      },
      'Week2-Friday': {
        snack: 'Wheat Dosa + Coconut Chutney',
        lunch: 'Rice + Vegetable Kurma + Beetroot Thoran',
        evening: 'Boiled Chickpeas with onion & coconut'
      },
      'Week2-Saturday': {
        snack: 'Puttu + Banana',
        lunch: 'Rice + Moru Curry + Beans Mezhukkupuratti + Papadam',
        evening: 'Sweet Aval + Milk'
      },
      // Week 3
      'Week3-Monday': {
        snack: 'Ragi Malt (Ragi + Milk + Jaggery)',
        lunch: 'Rice + Sambar + Egg Curry',
        evening: 'Banana + Groundnuts'
      },
      'Week3-Tuesday': {
        snack: 'Vegetable Upma',
        lunch: 'Rice + Moru Curry + Cabbage Thoran + Fish Fry',
        evening: 'Roasted Bengal Gram with Jaggery'
      },
      'Week3-Wednesday': {
        snack: 'Boiled Sweet Potato',
        lunch: 'Rice + Dal Curry + Drumstick Sambar',
        evening: 'Aval with Milk + Banana'
      },
      'Week3-Thursday': {
        snack: 'Idiyappam + Coconut Milk',
        lunch: 'Rice + Spinach Dal + Vegetable Stir Fry',
        evening: 'Vegetable Pakora + Milk'
      },
      'Week3-Friday': {
        snack: 'Banana Dosa',
        lunch: 'Rice + Vegetable Kurma + Cowpea Thoran',
        evening: 'Green Gram Sundal'
      },
      'Week3-Saturday': {
        snack: 'Idli + Tomato Chutney',
        lunch: 'Rice + Pulissery + Beans Thoran',
        evening: 'Upma + Milk'
      },
      // Week 4
      'Week4-Monday': {
        snack: 'Wheat Halwa (less ghee)',
        lunch: 'Rice + Sambar + Egg Curry',
        evening: 'Steamed Banana'
      },
      'Week4-Tuesday': {
        snack: 'Vegetable Rava Upma',
        lunch: 'Rice + Moru Curry + Snake Gourd Thoran + Fish Curry / Soya Fry',
        evening: 'Sweet Aval + Milk'
      },
      'Week4-Wednesday': {
        snack: 'Boiled Green Gram with coconut',
        lunch: 'Rice + Dal Curry + Pumpkin Erissery',
        evening: 'Banana + Milk'
      },
      'Week4-Thursday': {
        snack: 'Banana + Jaggery',
        lunch: 'Rice + Drumstick Sambar + Spinach Thoran',
        evening: 'Groundnut Chikki'
      },
      'Week4-Friday': {
        snack: 'Idiyappam + Egg Curry (Veg: Potato Curry)',
        lunch: 'Rice + Vegetable Kurma + Yam Stir Fry',
        evening: 'Milk + Banana'
      },
      'Week4-Saturday': {
        snack: 'Wheat Upma',
        lunch: 'Rice + Pulissery + Beans Thoran + Curd',
        evening: 'Roasted Chana with Jaggery'
      }
    },
    currentStock: {
      rice: { quantity: 25, unit: 'kg', minStock: 10 },
      dal: { quantity: 15, unit: 'kg', minStock: 8 },
      wheat: { quantity: 12, unit: 'kg', minStock: 5 },
      vegetables: { quantity: 8, unit: 'kg', minStock: 3 },
      milk: { quantity: 20, unit: 'liters', minStock: 10 }
    }
  });
  const [showDistributionModal, setShowDistributionModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);

  const handleLogout = async () => {
    try {
      console.log('🔐 AWW logout button clicked, starting logout process...');
      
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
      console.error('❌ AWW logout error:', error);
      // Force logout even if there's an error
      console.log('🔧 Force clearing session data...');
      sessionManager.destroySession();
      navigate('/login', { replace: true });
    }
  };

  // Registration handlers
  const handleChildRegistration = async (childData) => {
    try {
      setIsLoading(true);
      console.log('🚀 Starting child registration...');
      console.log('📋 Child data received:', JSON.stringify(childData, null, 2));

      // Validate required fields before sending
      const requiredFields = ['name', 'dateOfBirth', 'gender', 'parentName', 'parentPhone', 'relationToChild', 'anganwadiCenter'];
      const missingFields = requiredFields.filter(field => !childData[field] || childData[field].trim() === '');

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate address
      const requiredAddressFields = ['street', 'village', 'block', 'district', 'state', 'pincode'];
      const missingAddressFields = requiredAddressFields.filter(field => !childData.address[field] || childData.address[field].trim() === '');

      if (missingAddressFields.length > 0) {
        throw new Error(`Missing address fields: ${missingAddressFields.join(', ')}`);
      }

      await registrationService.registerChild(childData);
      setShowRegistrationForm(null);
      alert('Child registered successfully!');
    } catch (error) {
      console.error('Registration error:', error);
      alert(`Registration failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePregnantWomanRegistration = async (womanData) => {
    try {
      setIsLoading(true);
      await registrationService.registerPregnantWoman(womanData);
      setShowRegistrationForm(null);
      alert('Pregnant woman registered successfully!');
    } catch (error) {
      console.error('Registration error:', error);
      alert(`Registration failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdolescentRegistration = async (adolescentData) => {
    try {
      setIsLoading(true);
      await registrationService.registerAdolescent(adolescentData);
      setShowRegistrationForm(null);
      alert('Adolescent registered successfully!');
    } catch (error) {
      console.error('Registration error:', error);
      alert(`Registration failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewbornRegistration = async (newbornData) => {
    try {
      setIsLoading(true);
      await registrationService.registerNewborn(newbornData);
      setShowRegistrationForm(null);
      alert('Newborn registered successfully!');
    } catch (error) {
      console.error('Registration error:', error);
      alert(`Registration failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
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
    { id: 'reports', label: 'Daily Reports', icon: FileText },
    { id: 'profile', label: 'My Profile', icon: User }
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

  const renderRegistration = () => {
    // If a registration form is shown, render it
    if (showRegistrationForm === 'child') {
      return (
        <ChildRegistrationForm
          onSubmit={handleChildRegistration}
          onCancel={() => setShowRegistrationForm(null)}
          isLoading={isLoading}
        />
      );
    }

    if (showRegistrationForm === 'pregnant-woman') {
      return (
        <PregnantWomanRegistrationForm
          onSubmit={handlePregnantWomanRegistration}
          onCancel={() => setShowRegistrationForm(null)}
          isLoading={isLoading}
        />
      );
    }

    if (showRegistrationForm === 'adolescent') {
      return (
        <AdolescentRegistrationForm
          onSubmit={handleAdolescentRegistration}
          onCancel={() => setShowRegistrationForm(null)}
          isLoading={isLoading}
        />
      );
    }

    if (showRegistrationForm === 'newborn') {
      return (
        <NewbornRegistrationForm
          onSubmit={handleNewbornRegistration}
          onCancel={() => setShowRegistrationForm(null)}
          isLoading={isLoading}
        />
      );
    }

    // Default registration selection view
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-black">Registration Management</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Register Child',
              icon: Baby,
              color: 'blue',
              description: 'Add new child to the system',
              action: () => setShowRegistrationForm('child')
            },
            {
              title: 'Register Pregnant Woman',
              icon: Heart,
              color: 'pink',
              description: 'Add expectant mother',
              action: () => setShowRegistrationForm('pregnant-woman')
            },
            {
              title: 'Register Adolescent',
              icon: Users,
              color: 'purple',
              description: 'Add adolescent girl (10-19 years)',
              action: () => setShowRegistrationForm('adolescent')
            },
            {
              title: 'Register Newborn',
              icon: Baby,
              color: 'green',
              description: 'Add newborn baby',
              action: () => setShowRegistrationForm('newborn')
            }
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
              <button
                onClick={item.action}
                className={`mt-4 w-full bg-${item.color}-50 text-${item.color}-600 py-2 px-4 rounded-lg hover:bg-${item.color}-100 transition-colors`}
              >
                Start Registration
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderAttendance = () => {
    // Get the anganwadi center from user info or use a default
    // Try various sources for the center name
    const anganwadiCenter = localStorage.getItem('anganwadiCenter') || 
                           localStorage.getItem('userAnganwadiCenter') ||
                           sessionStorage.getItem('anganwadiCenter') ||
                           'Akkarakunnu Anganwadi'; // Use the actual center name from database
    
    console.log('🏢 Using anganwadi center for attendance:', anganwadiCenter);
    
    return <AttendanceManagement anganwadiCenter={anganwadiCenter} />;
  };

  const renderNutrition = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-black">Nutrition Distribution</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-orange-600">Today's Distribution</h3>
              <Utensils className="w-6 h-6 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-black">{nutritionData.todayDistribution}/{nutritionData.totalChildren}</p>
            <p className="text-sm text-gray-600">Children fed today</p>
            <button 
              onClick={() => setShowDistributionModal(true)}
              className="mt-4 w-full bg-orange-50 text-orange-600 py-2 px-4 rounded-lg hover:bg-orange-100 transition-colors"
            >
              Log Distribution
            </button>
          </motion.div>

          <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-600">Weekly Menu</h3>
              <Calendar className="w-6 h-6 text-green-500" />
            </div>
            {(() => {
              const currentWeek = 1; // This can be dynamic based on actual week
              const todayMenuKey = `Week${currentWeek}-${today}`;
              const todayMenuData = nutritionData.weeklyMenu[todayMenuKey];
              
              return (
                <div className="space-y-2">
                  <p className="text-sm text-black font-medium">Today's Menu ({today}):</p>
                  {todayMenuData && (
                    <div className="text-xs space-y-1">
                      <div><span className="font-medium text-orange-600">Snack:</span> <span className="text-gray-700">{todayMenuData.snack}</span></div>
                      <div><span className="font-medium text-green-600">Lunch:</span> <span className="text-gray-700">{todayMenuData.lunch}</span></div>
                      <div><span className="font-medium text-blue-600">Evening:</span> <span className="text-gray-700">{todayMenuData.evening}</span></div>
                    </div>
                  )}
                </div>
              );
            })()}
            <button 
              onClick={() => setShowMenuModal(true)}
              className="mt-4 w-full bg-green-50 text-green-600 py-2 px-4 rounded-lg hover:bg-green-100 transition-colors"
            >
              View Menu
            </button>
          </motion.div>

          <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-600">Stock Status</h3>
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-sm text-black">Rice: {nutritionData.currentStock.rice.quantity}{nutritionData.currentStock.rice.unit}</p>
            <p className="text-sm text-gray-600">Dal: {nutritionData.currentStock.dal.quantity}{nutritionData.currentStock.dal.unit}</p>
            <button 
              onClick={() => setShowStockModal(true)}
              className="mt-4 w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Update Stock
            </button>
          </motion.div>
        </div>

        {/* Distribution Modal */}
        {showDistributionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Log Nutrition Distribution</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Children Fed Today</label>
                  <input 
                    type="number" 
                    value={nutritionData.todayDistribution}
                    onChange={(e) => setNutritionData(prev => ({ ...prev, todayDistribution: parseInt(e.target.value) || 0 }))}
                    max={nutritionData.totalChildren}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total enrolled children: {nutritionData.totalChildren}</p>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => {
                      setShowDistributionModal(false);
                      alert('Distribution logged successfully!');
                    }}
                    className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => setShowDistributionModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Menu Modal */}
        {showMenuModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 w-full max-w-lg mx-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">4-Week Nutritional Menu Plan</h3>
              <div className="max-h-96 overflow-y-auto space-y-4">
                {[1, 2, 3, 4].map(week => (
                  <div key={week} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-semibold text-green-600 mb-3">Week {week}</h4>
                    <div className="space-y-2">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => {
                        const menuKey = `Week${week}-${day}`;
                        const menu = nutritionData.weeklyMenu[menuKey];
                        const isToday = today === day && week === 1; // Assuming we're in week 1
                        
                        return (
                          <div key={day} className={`p-2 rounded-lg ${isToday ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-gray-900">{day}</span>
                              {isToday && <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Today</span>}
                            </div>
                            <div className="text-xs space-y-1">
                              <div><span className="font-medium text-orange-600">Snack:</span> <span className="text-gray-600">{menu.snack}</span></div>
                              <div><span className="font-medium text-green-600">Lunch:</span> <span className="text-gray-600">{menu.lunch}</span></div>
                              <div><span className="font-medium text-blue-600">Evening:</span> <span className="text-gray-600">{menu.evening}</span></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setShowMenuModal(false)}
                className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}

        {/* Stock Modal */}
        {showStockModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 w-full max-w-lg mx-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Update Stock Status</h3>
              <div className="space-y-4">
                {Object.entries(nutritionData.currentStock).map(([item, data]) => (
                  <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 capitalize">{item}</span>
                      <p className="text-xs text-gray-500">Min stock: {data.minStock} {data.unit}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="number" 
                        value={data.quantity}
                        onChange={(e) => setNutritionData(prev => ({
                          ...prev,
                          currentStock: {
                            ...prev.currentStock,
                            [item]: { ...prev.currentStock[item], quantity: parseInt(e.target.value) || 0 }
                          }
                        }))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">{data.unit}</span>
                      {data.quantity <= data.minStock && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Low</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => {
                    setShowStockModal(false);
                    alert('Stock updated successfully!');
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Stock
                </button>
                <button 
                  onClick={() => setShowStockModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    );
  };

  const renderHealth = () => {
    // Get the anganwadi center from user info or use a default
    const anganwadiCenter = localStorage.getItem('anganwadiCenter') || 
                           localStorage.getItem('userAnganwadiCenter') ||
                           sessionStorage.getItem('anganwadiCenter') ||
                           'Akkarakunnu Anganwadi'; // Use the actual center name from database
    
    console.log('🏥 Using anganwadi center for health monitoring:', anganwadiCenter);
    
    return <HealthGrowthMonitoring anganwadiCenter={anganwadiCenter} />;
  };

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
      case 'profile':
        return <AWWProfile />;
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