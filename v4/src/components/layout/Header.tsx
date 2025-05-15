import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Menu, 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  Heart
} from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/workouts':
        return 'Workouts';
      case '/devices':
        return 'Devices';
      case '/profile':
        return 'Profile';
      default:
        return 'HealthSync';
    }
  };
  
  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 px-4 py-3
        ${scrolled ? 'bg-background-dark shadow-md' : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center text-white no-underline"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: scrolled ? 0 : [0, -10, 10, -5, 5, 0] }}
              transition={{ 
                duration: 1,
                ease: "easeInOut",
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 5
              }}
              className="text-accent-heart mr-3"
            >
              <Heart size={24} fill="#FF2D55" />
            </motion.div>
            <span className="font-bold text-xl">HealthSync</span>
          </Link>
          
          <span className="hidden md:block ml-4 text-neutral-400 font-medium">
            {getPageTitle()}
          </span>
        </div>
        
        {currentUser && (
          <div className="flex items-center">
            <button className="p-2 rounded-full text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors">
              <Bell size={20} />
            </button>
            
            <div className="relative ml-2">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center rounded-full hover:bg-neutral-900 pl-2 pr-3 py-1 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center overflow-hidden mr-2">
                  {currentUser.profilePicture ? (
                    <img 
                      src={currentUser.profilePicture} 
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={16} className="text-white" />
                  )}
                </div>
                <span className="hidden md:block text-sm font-medium text-white">
                  {currentUser.name}
                </span>
                <ChevronDown size={16} className="ml-1 text-neutral-400" />
              </button>
              
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 py-2 bg-background-light rounded-lg shadow-lg border border-neutral-800 z-50"
                  >
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-900 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <User size={16} className="mr-2" />
                      Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="flex items-center px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-900 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </Link>
                    <div className="border-t border-neutral-800 my-1"></div>
                    <button 
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-neutral-900 transition-colors"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
        
        {!currentUser && (
          <div>
            <Link 
              to="/login" 
              className="btn-outline text-sm py-1 px-3 inline-block mr-2"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="btn-primary text-sm py-1 px-3 inline-block"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;