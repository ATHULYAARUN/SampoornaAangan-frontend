import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Home, 
  Calendar, 
  Users, 
  MapPin,
  Phone,
  FileText,
  Activity,
  UserCheck,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import DashboardCard from '../Dashboard/DashboardCard';

const AshaVolunteerModule = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const ashaStats = [
    {
      title: 'Families Assigned',
      value: '45',
      icon: Home,
      color: 'blue',
      trend: 'up',
      trendValue: '+3%'
    },
    {
      title: 'Home Visits',
      value: '28',
      icon: MapPin,
      color: 'green',
      trend: 'up',
      trendValue: '+12%'
    },
    {
      title: 'Health Referrals',
      value: '12',
      icon: Heart,
      color: 'red',
      trend: 'up',
      trendValue: '+8%'
    },
    {
      title: 'Follow-ups Due',
      value: '7',
      icon: Clock,
      color: 'orange',
      trend: 'down',
      trendValue: '-15%'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'families', name: 'Family Management', icon: Home },
    { id: 'visits', name: 'Home Visits', icon: MapPin },
    { id: 'health', name: 'Health Services', icon: Heart },
    { id: 'referrals', name: 'Referrals', icon: UserCheck },
    { id: 'reports', name: 'Reports', icon: FileText }
  ];

  const assignedFamilies = [
    { id: 1, name: 'Sharma Family', address: 'House #123, Sector 15', members: 5, lastVisit: '2024-01-18', status: 'Active', priority: 'Medium' },
    { id: 2, name: 'Kumar Family', address: 'House #456, Sector 12', members: 4, lastVisit: '2024-01-15', status: 'Needs Visit', priority: 'High' },
    { id: 3, name: 'Patel Family', address: 'House #789, Sector 18', members: 6, lastVisit: '2024-01-20', status: 'Active', priority: 'Low' },
    { id: 4, name: 'Singh Family', address: 'House #321, Sector 10', members: 3, lastVisit: '2024-01-12', status: 'Follow-up Due', priority: 'High' }
  ];

  const upcomingVisits = [
    { id: 1, family: 'Kumar Family', time: '10:00 AM', purpose: 'Routine Checkup', status: 'scheduled' },
    { id: 2, family: 'Singh Family', time: '02:00 PM', purpose: 'Follow-up Visit', status: 'scheduled' },
    { id: 3, family: 'Gupta Family', time: '04:00 PM', purpose: 'Health Education', status: 'pending' }
  ];

  const healthAlerts = [
    { id: 1, type: 'urgent', message: 'Child vaccination overdue - Kumar Family', time: '2 hours ago' },
    { id: 2, type: 'warning', message: 'Pregnant mother missed checkup - Sharma Family', time: '1 day ago' },
    { id: 3, type: 'info', message: 'Health camp scheduled for next week', time: '2 days ago' }
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
          ASHA Volunteer Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Manage family visits, health services, and community outreach
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {ashaStats.map((stat, index) => (
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
            {/* Today's Visits */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Today's Visits</h2>
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {upcomingVisits.map((visit) => (
                    <motion.div
                      key={visit.id}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className={`w-3 h-3 rounded-full ${
                          visit.status === 'completed' ? 'bg-green-500' :
                          visit.status === 'scheduled' ? 'bg-blue-500' :
                          'bg-gray-300'
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">{visit.family}</h3>
                          <span className="text-sm text-gray-500">{visit.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{visit.purpose}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Health Alerts */}
            <div>
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Health Alerts</h2>
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </div>
                <div className="space-y-4">
                  {healthAlerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-lg border-l-4 ${
                        alert.type === 'urgent' ? 'bg-red-50 border-red-400' :
                        alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                        'bg-blue-50 border-blue-400'
                      }`}
                    >
                      <p className={`font-medium text-sm ${
                        alert.type === 'urgent' ? 'text-red-800' :
                        alert.type === 'warning' ? 'text-yellow-800' :
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

        {activeTab === 'families' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Assigned Families</h2>
              <button className="btn-primary">
                <Home className="w-4 h-4 mr-2" />
                Add Family
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Family Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Address</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Members</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Last Visit</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedFamilies.map((family) => (
                    <motion.tr
                      key={family.id}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className="border-b border-gray-100"
                    >
                      <td className="py-3 px-4 font-medium text-gray-900">{family.name}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{family.address}</td>
                      <td className="py-3 px-4 text-gray-600">{family.members}</td>
                      <td className="py-3 px-4 text-gray-600">{family.lastVisit}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          family.status === 'Active' ? 'bg-green-100 text-green-800' :
                          family.status === 'Needs Visit' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {family.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          family.priority === 'High' ? 'bg-red-100 text-red-800' :
                          family.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {family.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          Visit
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'visits' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Home Visits</h2>
              <button className="btn-primary">
                <MapPin className="w-4 h-4 mr-2" />
                Schedule Visit
              </button>
            </div>
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Visit Management</h3>
              <p className="text-gray-600">Home visit scheduling and tracking system will be implemented here.</p>
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Health Services</h2>
              <button className="btn-primary">
                <Heart className="w-4 h-4 mr-2" />
                New Health Record
              </button>
            </div>
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Health Service Management</h3>
              <p className="text-gray-600">Health services and medical record management will be implemented here.</p>
            </div>
          </div>
        )}

        {activeTab === 'referrals' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Referrals</h2>
              <button className="btn-primary">
                <UserCheck className="w-4 h-4 mr-2" />
                New Referral
              </button>
            </div>
            <div className="text-center py-12">
              <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Referral Management</h3>
              <p className="text-gray-600">Medical referral and follow-up system will be implemented here.</p>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Reports</h2>
              <button className="btn-primary">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </button>
            </div>
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Reporting System</h3>
              <p className="text-gray-600">Activity reports and performance tracking will be implemented here.</p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AshaVolunteerModule;