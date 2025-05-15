import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Home, Watch, Dumbbell, Heart, UserCircle } from 'lucide-react';

const Navigation: React.FC = () => {
  const navigationItems = [
    { to: '/', icon: <Home size={20} />, label: 'Home' },
    { to: '/workouts', icon: <Dumbbell size={20} />, label: 'Workouts' },
    { to: '/devices', icon: <Watch size={20} />, label: 'Devices' },
    { to: '/health', icon: <Heart size={20} />, label: 'Health' },
    { to: '/profile', icon: <UserCircle size={20} />, label: 'Profile' }
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background-light border-t border-neutral-900 py-2 px-4 sm:px-6 md:hidden z-10">
      <ul className="flex justify-between items-center max-w-md mx-auto">
        {navigationItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) => 
                `flex flex-col items-center py-1 px-2 rounded-md transition-colors ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-neutral-500 hover:text-neutral-300'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: isActive ? -2 : 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {item.icon}
                  </motion.div>
                  <span className="text-xs mt-1">{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;