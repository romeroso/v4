import React from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'btn font-medium rounded-full transition-all flex items-center justify-center focus:outline-none';
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm py-1 px-3',
    md: 'py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover',
    secondary: 'bg-secondary text-white hover:bg-secondary-hover',
    outline: 'bg-transparent border border-neutral-700 text-neutral-200 hover:border-neutral-500 hover:text-white',
    ghost: 'bg-transparent text-neutral-300 hover:bg-neutral-900 hover:text-white',
  };
  
  // Disabled state
  const disabledClasses = disabled || isLoading ? 'opacity-60 cursor-not-allowed' : '';
  
  // Full width
  const widthClasses = fullWidth ? 'w-full' : '';
  
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      disabled={disabled || isLoading}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabledClasses}
        ${widthClasses}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {!isLoading && iconLeft && <span className="mr-2">{iconLeft}</span>}
      {children}
      {!isLoading && iconRight && <span className="ml-2">{iconRight}</span>}
    </motion.button>
  );
};

export default Button;