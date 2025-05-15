import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  accentColor?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  icon,
  children,
  className = '',
  onClick,
  accentColor,
}) => {
  const cardVariants = {
    initial: { opacity: 0.9, scale: 0.98 },
    hover: { 
      opacity: 1,
      scale: 1.02,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      borderColor: accentColor || 'rgb(59, 130, 246)'
    },
    tap: { scale: 0.99 }
  };

  const accentStyle = accentColor 
    ? { borderLeft: `3px solid ${accentColor}` } 
    : {};

  return (
    <motion.div
      className={`card ${className} ${onClick ? 'cursor-pointer' : ''}`}
      initial="initial"
      whileHover={onClick ? "hover" : undefined}
      whileTap={onClick ? "tap" : undefined}
      variants={cardVariants}
      onClick={onClick}
      style={accentStyle}
    >
      {(title || icon) && (
        <div className="flex items-center justify-between mb-3">
          {title && (
            <div>
              <h3 className="text-lg font-medium text-white">{title}</h3>
              {subtitle && (
                <p className="text-sm text-neutral-400">{subtitle}</p>
              )}
            </div>
          )}
          {icon && (
            <div className="text-neutral-400">
              {icon}
            </div>
          )}
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default Card;