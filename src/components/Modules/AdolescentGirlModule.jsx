import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  BookOpen, 
  Users, 
  Calendar, 
  Award,
  Activity,
  MessageCircle,
  Bell,
  FileText,
  Target,
  TrendingUp,
  Star
} from 'lucide-react';
import DashboardCard from '../Dashboard/DashboardCard';

const AdolescentGirlModule = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const adolescentStats = [
    {
      title: 'Health Score',
      value: '92%',
      icon: Heart,
      color: 'red',
      trend: 'up',
      trendValue: '+8%'
    },
    {
      title: 'Learning Progress',
      value: '88%',
      icon: BookOpen,
      color: 'blue',
      trend: 'up',
      trendValue: '+12%'
    },
    {
      title: 'Skill Development',
      value: '85%',
      icon: Award,
      color: 'purple',
      trend: 'up',
      trendValue: '+15%'
    },
    {
      title: 'Community Activities',
      value: '16',
      icon: Users,
      color: 'green',
      trend: 'up',
      trendValue: '+4'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'health', name: 'Health & Wellness', icon: Heart },
    { id: 'education', name: 'Education', icon: BookOpen },
    { id: 'skills', name: 'Skill Development', icon: Award },
    { id: 'community', name: 'Community', icon: Users },
    { id: 'goals', name: 'Goals & Achievements', icon: Target },
    { id: 'resources', name: 'Resources', icon: FileText }
  ];

  const healthActivities = [
    {
      id: 1,
      title: 'Monthly Health Checkup',
      description: 'Regular health screening completed',
      date: '2024-01-20',
      status: 'completed',
      type: 'health'
    },
    {
      id: 2,
      title: 'Nutrition Counseling',
      description: 'Dietary guidance and meal planning session',
      date: '2024-01-18',
      status: 'completed',
      type: 'nutrition'
    },
    {
      id: 3,
      title: 'Mental Health Workshop',
      description: 'Stress management and wellness session',
      date: '2024-01-15',
      status: 'completed',
      type: 'mental-health'
    }
  ];

  const learningModules = [
    {
      id: 1,
      title: 'Digital Literacy',
      progress: 85,
      totalLessons: 12,
      completedLessons: 10,
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Financial Literacy',
      progress: 70,
      totalLessons: 8,
      completedLessons: 6,
      category: 'Life Skills'
    },
    {
      id: 3,
      title: 'Communication Skills',
      progress: 92,
      totalLessons: 10,
      completedLessons: 9,
      category: 'Soft Skills'
    },
    {
      id: 4,
      title: 'Health Education',
      progress: 78,
      totalLessons: 15,
      completedLessons: 12,
      category: 'Health'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Digital Champion',
      description: 'Completed advanced digital literacy course',
      date: '2024-01-15',
      badge: 'gold'
    },
    {
      id: 2,
      title: 'Community Leader',
      description: 'Led 3 community awareness programs',
      date: '2024-01-10',
      badge: 'silver'
    },
    {
      id: 3,
      title: 'Health Advocate',
      description: 'Promoted health awareness in community',
      date: '2024-01-05',
      badge: 'bronze'
    }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Skill Development Workshop', date: '2024-01-25', time: '10:00 AM', type: 'workshop' },
    { id: 2, title: 'Health Awareness Camp', date: '2024-01-28', time: '09:00 AM', type: 'health' },
    { id: 3, title: 'Community Service Day', date: '2024-02-02', time: '08:00 AM', type: 'community' },
    { id: 4, title: 'Career Guidance Session', date: '2024-02-05', time: '11:00 AM', type: 'career' }
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
          Adolescent Girl Portal
        </h1>
        <p className="text-gray-600 mt-2">
          Your journey of growth, learning, and empowerment
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {adolescentStats.map((stat, index) => (
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
            {/* Learning Progress */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Progress</h2>
                <div className="space-y-4">
                  {learningModules.slice(0, 3).map((module) => (
                    <motion.div
                      key={module.id}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{module.title}</h3>
                          <span className="text-sm font-medium text-primary-600">{module.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${module.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{module.category}</span>
                          <span>{module.completedLessons}/{module.totalLessons} lessons</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="card mt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Achievements</h2>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.badge === 'gold' ? 'bg-yellow-500' :
                        achievement.badge === 'silver' ? 'bg-gray-400' :
                        'bg-orange-600'
                      }`}>
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{achievement.date}</p>
                      </div>
                    </motion.div>
                  ))}
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
                          event.type === 'workshop' ? 'bg-blue-100 text-blue-800' :
                          event.type === 'community' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
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

        {activeTab === 'health' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Health & Wellness</h2>
              <Heart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{activity.title}</h3>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <div className="mt-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {activity.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Learning Modules</h2>
              <BookOpen className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningModules.map((module) => (
                <motion.div
                  key={module.id}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">{module.title}</h3>
                    <span className="text-sm font-medium text-blue-600">{module.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{module.category}</span>
                    <span>{module.completedLessons}/{module.totalLessons} lessons</span>
                  </div>
                  <button className="w-full mt-4 btn-primary">
                    Continue Learning
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Skill Development</h2>
              <Award className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center py-12">
              <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Skill Development Programs</h3>
              <p className="text-gray-600">Vocational training, life skills, and career development programs will be implemented here.</p>
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Community Activities</h2>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Community Engagement</h3>
              <p className="text-gray-600">Community service projects, peer groups, and social activities will be implemented here.</p>
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Goals & Achievements</h2>
              <Target className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Current Goals</h3>
                <div className="space-y-3">
                  {[
                    { goal: 'Complete Digital Literacy Course', progress: 85 },
                    { goal: 'Lead Community Health Program', progress: 60 },
                    { goal: 'Develop Communication Skills', progress: 92 }
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{item.goal}</span>
                        <span className="text-sm text-primary-600">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Achievements</h3>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.badge === 'gold' ? 'bg-yellow-500' :
                        achievement.badge === 'silver' ? 'bg-gray-400' :
                        'bg-orange-600'
                      }`}>
                        <Star className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{achievement.title}</p>
                        <p className="text-xs text-gray-600">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Resources & Support</h2>
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Learning Resources</h3>
              <p className="text-gray-600">Educational materials, guides, and support resources will be implemented here.</p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AdolescentGirlModule;