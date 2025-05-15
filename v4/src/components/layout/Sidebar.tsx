import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Dumbbell, 
  Heart, 
  UserCircle, 
  Watch, 
  BarChart, 
  Settings, 
  Award, 
  Calendar, 
  PieChart
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const mainNavItems = [
    { to: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/workouts', icon: <Dumbbell size={20} />, label: 'Workouts' },
    { to: '/health', icon: <Heart size={20} />, label: 'Health Metrics' },
    { to: '/devices', icon: <Watch size={20} />, label: 'Devices' },
    { to: '/stats', icon: <BarChart size={20} />, label: 'Statistics' },
  ];
  
  const secondaryNavItems = [
    { to: '/goals', icon: <Award size={20} />, label: 'Goals' },
    { to: '/calendar', icon: <Calendar size={20} />, label: 'Calendar' },
    { to: '/nutrition', icon: <PieChart size={20} />, label: 'Nutrition' },
  ];
  
  const userNavItems = [
    { to: '/profile', icon: <UserCircle size={20} />, label: 'Profile' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];
  
  return (
    <aside className="hidden md:flex flex-col bg-background-light border-r border-neutral-900 fixed top-0 left-0 h-full w-64 pt-16 pb-6">
      <div className="flex flex-col flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase text-neutral-500 tracking-wider mb-3 px-3">
            Main
          </h3>
          <ul className="space-y-1">
            {mainNavItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: isActive ? 1.1 : 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="font-medium">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase text-neutral-500 tracking-wider mb-3 px-3">
            Features
          </h3>
          <ul className="space-y-1">
            {secondaryNavItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                    }`
                  }
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto">
          <h3 className="text-xs font-semibold uppercase text-neutral-500 tracking-wider mb-3 px-3">
            Account
          </h3>
          <ul className="space-y-1">
            {userNavItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                    }`
                  }
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;