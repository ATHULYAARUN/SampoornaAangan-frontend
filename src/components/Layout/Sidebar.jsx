import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  Heart, 
  UserCheck, 
  Baby, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, activeModule, setActiveModule, userRole }) => {
  const modules = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: Home,
      color: 'text-blue-600',
      roles: ['admin', 'anganwadi_worker', 'asha_volunteer', 'parent', 'adolescent_girl']
    },
    {
      id: 'admin',
      name: 'Admin Panel',
      icon: Settings,
      color: 'text-purple-600',
      roles: ['admin']
    },
    {
      id: 'anganwadi_worker',
      name: 'Anganwadi Management',
      icon: Users,
      color: 'text-green-600',
      roles: ['admin', 'anganwadi_worker']
    },
    {
      id: 'asha_volunteer',
      name: 'ASHA Services',
      icon: Heart,
      color: 'text-red-600',
      roles: ['admin', 'asha_volunteer']
    },
    {
      id: 'parent',
      name: 'Parent Portal',
      icon: UserCheck,
      color: 'text-orange-600',
      roles: ['admin', 'parent']
    },
    {
      id: 'adolescent_girl',
      name: 'Adolescent Care',
      icon: Baby,
      color: 'text-pink-600',
      roles: ['admin', 'adolescent_girl']
    }
  ];

  const filteredModules = modules.filter(module => 
    module.roles.includes(userRole)
  );

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40
      }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
        className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50 lg:relative lg:translate-x-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-gray-900">
                  Sampoornaangan
                </h1>
                <p className="text-xs text-gray-500">Anganwadi System</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {filteredModules.map((module, index) => {
              const Icon = module.icon;
              const isActive = activeModule === module.id;
              
              return (
                <motion.button
                  key={module.id}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setActiveModule(module.id);
                    setIsOpen(false);
                  }}
                  className={`w-full sidebar-item ${isActive ? 'active' : ''}`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${module.color}`} />
                  <span className="font-medium">{module.name}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <motion.button
              variants={itemVariants}
              className="w-full sidebar-item text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;