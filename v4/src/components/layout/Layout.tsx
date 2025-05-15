import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';
import Navigation from './Navigation';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex min-h-screen bg-background-dark">
      {isAuthenticated && <Sidebar />}
      
      <div className={`flex-1 ${isAuthenticated ? 'md:ml-64' : ''}`}>
        <Header />
        
        <AnimatePresence mode="wait">
          <motion.main
            key={window.location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`
              pt-16 pb-16 px-4 sm:px-6 lg:px-8 
              max-w-7xl mx-auto
              ${isAuthenticated ? 'pb-20 md:pb-8' : ''}
            `}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        
        {isAuthenticated && <Navigation />}
      </div>
    </div>
  );
};

export default Layout;