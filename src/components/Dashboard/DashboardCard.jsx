import React from 'react';
import { motion } from 'framer-motion';

const DashboardCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'blue', 
  trend, 
  trendValue,
  onClick,
  className = '' 
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 text-blue-600',
    green: 'from-green-500 to-green-600 text-green-600',
    purple: 'from-purple-500 to-purple-600 text-purple-600',
    red: 'from-red-500 to-red-600 text-red-600',
    orange: 'from-orange-500 to-orange-600 text-orange-600',
    pink: 'from-pink-500 to-pink-600 text-pink-600',
    yellow: 'from-yellow-500 to-yellow-600 text-yellow-600',
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`card cursor-pointer hover:shadow-lg transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {trend && (
            <div className="flex items-center">
              <span className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-600' : 
                trend === 'down' ? 'text-red-600' : 
                'text-gray-600'
              }`}>
                {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardCard;