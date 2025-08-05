import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Baby, 
  Heart, 
  UserCheck, 
  TrendingUp, 
  Calendar,
  MapPin,
  Activity,
  Award,
  AlertCircle
} from 'lucide-react';
import DashboardCard from './DashboardCard';

const MainDashboard = ({ activeModule, setActiveModule }) => {
  const stats = [
    {
      title: 'Total Children',
      value: '1,247',
      icon: Baby,
      color: 'blue',
      trend: 'up',
      trendValue: '+12%'
    },
    {
      title: 'Active Anganwadis',
      value: '45',
      icon: MapPin,
      color: 'green',
      trend: 'up',
      trendValue: '+3%'
    },
    {
      title: 'ASHA Volunteers',
      value: '89',
      icon: Heart,
      color: 'red',
      trend: 'stable',
      trendValue: '0%'
    },
    {
      title: 'Registered Parents',
      value: '892',
      icon: UserCheck,
      color: 'purple',
      trend: 'up',
      trendValue: '+8%'
    },
    {
      title: 'Adolescent Girls',
      value: '156',
      icon: Users,
      color: 'pink',
      trend: 'up',
      trendValue: '+15%'
    },
    {
      title: 'Health Checkups',
      value: '234',
      icon: Activity,
      color: 'orange',
      trend: 'up',
      trendValue: '+22%'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'New child registration',
      description: 'Rahul Kumar (Age: 3) registered at Anganwadi Center #12',
      time: '2 hours ago',
      type: 'registration',
      icon: Baby
    },
    {
      id: 2,
      title: 'Health checkup completed',
      description: '15 children completed monthly health screening',
      time: '4 hours ago',
      type: 'health',
      icon: Heart
    },
    {
      id: 3,
      title: 'Nutrition distribution',
      description: 'Weekly nutrition supplements distributed to 45 children',
      time: '1 day ago',
      type: 'nutrition',
      icon: Award
    },
    {
      id: 4,
      title: 'ASHA visit scheduled',
      description: 'Home visit scheduled for 8 families in Sector 15',
      time: '2 days ago',
      type: 'visit',
      icon: Calendar
    }
  ];

  const alerts = [
    {
      id: 1,
      title: 'Vaccination Due',
      message: '12 children have pending vaccinations',
      type: 'warning',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Low Stock Alert',
      message: 'Nutrition supplements running low at 3 centers',
      type: 'error',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Monthly Report',
      message: 'Monthly progress report is ready for review',
      type: 'info',
      priority: 'low'
    }
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
          Dashboard Overview
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome to Sampoornaangan Anganwadi Management System
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            transition={{ delay: index * 0.1 }}
          >
            <DashboardCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-600" />
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
        </motion.div>

        {/* Alerts */}
        <motion.div variants={itemVariants}>
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
              <AlertCircle className="w-5 h-5 text-orange-500" />
            </div>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                    alert.type === 'error' ? 'bg-red-50 border-red-400' :
                    'bg-blue-50 border-blue-400'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        alert.type === 'warning' ? 'text-yellow-800' :
                        alert.type === 'error' ? 'text-red-800' :
                        'text-blue-800'
                      }`}>
                        {alert.title}
                      </h3>
                      <p className={`text-sm mt-1 ${
                        alert.type === 'warning' ? 'text-yellow-700' :
                        alert.type === 'error' ? 'text-red-700' :
                        'text-blue-700'
                      }`}>
                        {alert.message}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                      alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.priority}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Register Child', icon: Baby, module: 'anganwadi_worker' },
              { name: 'Schedule Visit', icon: Calendar, module: 'asha_volunteer' },
              { name: 'Health Checkup', icon: Heart, module: 'anganwadi_worker' },
              { name: 'View Reports', icon: TrendingUp, module: 'admin' }
            ].map((action) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveModule(action.module)}
                  className="p-4 text-center rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                >
                  <Icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">{action.name}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MainDashboard;