import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  fullWidth = false,
  icon,
  className = '',
  ...props
}) => {
  // Width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Error state
  const errorClass = error 
    ? 'border-accent-heart focus:border-accent-heart focus:ring-accent-heart' 
    : 'border-neutral-800 focus:border-primary focus:ring-primary';
  
  return (
    <div className={`mb-4 ${widthClass}`}>
      {label && (
        <label 
          htmlFor={props.id} 
          className="block text-sm font-medium text-neutral-300 mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
            {icon}
          </div>
        )}
        
        <input
          className={`
            bg-neutral-950 
            rounded-lg 
            px-4 
            py-2.5 
            text-white 
            w-full
            transition-all 
            duration-200
            border
            ${errorClass}
            ${icon ? 'pl-10' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error ? (
        <p className="mt-1 text-sm text-accent-heart">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;