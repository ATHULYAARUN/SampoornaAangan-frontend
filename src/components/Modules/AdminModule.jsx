import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Settings, 
  BarChart3, 
  Shield, 
  Database,
  UserPlus,
  FileText,
  MapPin,
  Calendar,
  TrendingUp
} from 'lucide-react';
import DashboardCard from '../Dashboard/DashboardCard';
import WorkerManagement from '../admin/WorkerManagement';

const AdminModule = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const adminStats = [
    {
      title: 'Total Users',
      value: '2,847',
      icon: Users,
      color: 'blue',
      trend: 'up',
      trendValue: '+18%'
    },
    {
      title: 'Active Centers',
      value: '45',
      icon: MapPin,
      color: 'green',
      trend: 'up',
      trendValue: '+3%'
    },
    {
      title: 'System Health',
      value: '99.9%',
      icon: Shield,
      color: 'purple',
      trend: 'stable',
      trendValue: '0%'
    },
    {
      title: 'Data Storage',
      value: '2.4TB',
      icon: Database,
      color: 'orange',
      trend: 'up',
      trendValue: '+12%'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'workers', name: 'Worker Management', icon: Users },
    { id: 'centers', name: 'Center Management', icon: MapPin },
    { id: 'reports', name: 'Reports', icon: FileText },
    { id: 'settings', name: 'System Settings', icon: Settings }
  ];

  const recentUsers = [
    { id: 1, name: 'Priya Sharma', role: 'Anganwadi Worker', center: 'Center #12', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Rajesh Kumar', role: 'ASHA Volunteer', center: 'Center #08', status: 'Active', joinDate: '2024-01-14' },
    { id: 3, name: 'Sunita Devi', role: 'Parent', center: 'Center #15', status: 'Pending', joinDate: '2024-01-13' },
    { id: 4, name: 'Meera Patel', role: 'Anganwadi Worker', center: 'Center #03', status: 'Active', joinDate: '2024-01-12' }
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'Server maintenance scheduled for tonight', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'New feature update available', time: '1 day ago' },
    { id: 3, type: 'error', message: 'Failed login attempts detected', time: '3 days ago' }
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
          Admin Panel
        </h1>
        <p className="text-gray-600 mt-2">
          Manage users, centers, and system settings
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {adminStats.map((stat, index) => (
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
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
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
            {/* Recent Users */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Users</h2>
                  <button className="btn-primary">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Center</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <motion.tr
                          key={user.id}
                          whileHover={{ backgroundColor: '#f9fafb' }}
                          className="border-b border-gray-100"
                        >
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">Joined {user.joinDate}</div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{user.role}</td>
                          <td className="py-3 px-4 text-gray-600">{user.center}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              user.status === 'Active' ? 'bg-green-100 text-green-800' :
                              user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                              Edit
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* System Alerts */}
            <div>
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">System Alerts</h2>
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-lg border-l-4 ${
                        alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                        alert.type === 'error' ? 'bg-red-50 border-red-400' :
                        'bg-blue-50 border-blue-400'
                      }`}
                    >
                      <p className={`font-medium ${
                        alert.type === 'warning' ? 'text-yellow-800' :
                        alert.type === 'error' ? 'text-red-800' :
                        'text-blue-800'
                      }`}>
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workers' && (
          <WorkerManagement />
        )}

        {activeTab === 'centers' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Center Management</h2>
              <button className="btn-primary">
                <MapPin className="w-4 h-4 mr-2" />
                Add Center
              </button>
            </div>
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Center Management</h3>
              <p className="text-gray-600">Anganwadi center management interface will be implemented here.</p>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">System Reports</h2>
              <button className="btn-primary">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </button>
            </div>
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Reports & Analytics</h3>
              <p className="text-gray-600">Comprehensive reporting system will be implemented here.</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">System Settings</h2>
            <div className="text-center py-12">
              <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">System Configuration</h3>
              <p className="text-gray-600">System settings and configuration options will be implemented here.</p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AdminModule;