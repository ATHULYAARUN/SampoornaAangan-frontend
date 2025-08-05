import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  Heart, 
  UserCheck, 
  Baby, 
  Settings
} from 'lucide-react';

const MobileNav = ({ activeModule, setActiveModule, userRole }) => {
  const modules = [
    {
      id: 'dashboard',
      name: 'Home',
      icon: Home,
      color: 'text-blue-600',
      roles: ['admin', 'anganwadi_worker', 'asha_volunteer', 'parent', 'adolescent_girl']
    },
    {
      id: 'admin',
      name: 'Admin',
      icon: Settings,
      color: 'text-purple-600',
      roles: ['admin']
    },
    {
      id: 'anganwadi_worker',
      name: 'Center',
      icon: Users,
      color: 'text-green-600',
      roles: ['admin', 'anganwadi_worker']
    },
    {
      id: 'asha_volunteer',
      name: 'ASHA',
      icon: Heart,
      color: 'text-red-600',
      roles: ['admin', 'asha_volunteer']
    },
    {
      id: 'parent',
      name: 'Parent',
      icon: UserCheck,
      color: 'text-orange-600',
      roles: ['admin', 'parent']
    },
    {
      id: 'adolescent_girl',
      name: 'Teen',
      icon: Baby,
      color: 'text-pink-600',
      roles: ['admin', 'adolescent_girl']
    }
  ];

  const filteredModules = modules.filter(module => 
    module.roles.includes(userRole)
  ).slice(0, 5); // Limit to 5 items for mobile

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2">
        {filteredModules.map((module) => {
          const Icon = module.icon;
          const isActive = activeModule === module.id;
          
          return (
            <motion.button
              key={module.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModule(module.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{module.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;