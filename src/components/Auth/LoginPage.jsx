import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Baby, 
  Eye, 
  EyeOff, 
  User, 
  Lock,
  ArrowRight
} from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const roles = [
    { id: 'admin', name: 'Administrator', color: 'purple', bgColor: 'bg-purple-50', borderColor: 'border-purple-500', dotColor: 'bg-purple-500' },
    { id: 'anganwadi_worker', name: 'Anganwadi Worker', color: 'green', bgColor: 'bg-green-50', borderColor: 'border-green-500', dotColor: 'bg-green-500' },
    { id: 'asha_volunteer', name: 'ASHA Volunteer', color: 'red', bgColor: 'bg-red-50', borderColor: 'border-red-500', dotColor: 'bg-red-500' },
    { id: 'parent', name: 'Parent', color: 'orange', bgColor: 'bg-orange-50', borderColor: 'border-orange-500', dotColor: 'bg-orange-500' },
    { id: 'adolescent_girl', name: 'Adolescent Girl', color: 'pink', bgColor: 'bg-pink-50', borderColor: 'border-pink-500', dotColor: 'bg-pink-500' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedRole && credentials.username && credentials.password) {
      onLogin(selectedRole, credentials.username);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Logo and Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Baby className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            Sampoornaangan
          </h1>
          <p className="text-gray-600 mt-2">
            Anganwadi Management System
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div variants={itemVariants} className="card">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Your Role
              </label>
              <div className="grid grid-cols-1 gap-3">
                {roles.map((role) => (
                  <motion.button
                    key={role.id}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      selectedRole === role.id
                        ? `${role.borderColor} ${role.bgColor}`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{role.name}</span>
                      {selectedRole === role.id && (
                        <div className={`w-5 h-5 rounded-full ${role.dotColor} flex items-center justify-center`}>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="input-field pl-10"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!selectedRole || !credentials.username || !credentials.password}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Demo Credentials:</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p><strong>Username:</strong> demo</p>
                <p><strong>Password:</strong> demo123</p>
                <p className="text-gray-500 mt-2">Select any role and use these credentials to explore the system.</p>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 Sampoornaangan. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;