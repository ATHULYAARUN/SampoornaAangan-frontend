import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from '../Common/MobileNav';

const Layout = ({ children, userRole = 'admin', userName = 'Admin User', activeModule, setActiveModule }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <AnimatePresence>
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          userRole={userRole}
        />
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          userRole={userRole}
          userName={userName}
        />

        <main className="flex-1 overflow-auto pb-16 lg:pb-0">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {React.cloneElement(children, { activeModule, setActiveModule })}
          </motion.div>
        </main>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav 
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        userRole={userRole}
      />
    </div>
  );
};

export default Layout;