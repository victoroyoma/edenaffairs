import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'luxury' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variantStyles = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-400 shadow-md hover:shadow-lg',
    secondary: 'bg-dark-700 hover:bg-dark-600 text-white focus:ring-dark-500 shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-2 border-dark-600 hover:border-primary-500 hover:bg-primary-500/10 text-gray-300 hover:text-primary-300 focus:ring-primary-500',
    danger: 'bg-error-500 hover:bg-error-600 text-white focus:ring-error-400 shadow-md hover:shadow-lg',
    success: 'bg-success-500 hover:bg-success-600 text-white focus:ring-success-400 shadow-md hover:shadow-lg',
    luxury: 'bg-gradient-to-r from-primary-500 to-luxury-gold hover:from-primary-600 hover:to-luxury-gold/90 text-white focus:ring-primary-400 shadow-luxury hover:shadow-luxury-lg hover:scale-105',
    ghost: 'bg-transparent hover:bg-dark-800 text-gray-300 hover:text-white focus:ring-dark-500'
  };
  
  const sizeStyles = {
    sm: 'text-sm px-3 py-2 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2',
    xl: 'text-lg px-8 py-4 gap-3'
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  const isDisabled = disabled || loading;

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`} 
      disabled={isDisabled}
      {...props}
    >
      {/* Shimmer effect for luxury variant */}
      {variant === 'luxury' && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 animate-shimmer" />
      )}
      
      {loading && (
        <Loader2 size={size === 'sm' ? 14 : size === 'md' ? 16 : size === 'lg' ? 18 : 20} className="animate-spin" />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">
          {icon}
        </span>
      )}
      
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">
          {icon}
        </span>
      )}
    </button>
  );
}