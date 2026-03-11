import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  type = 'button',
  disabled = false,
  className = '' 
}) => {
  const baseStyles = 'font-sans-elegant cursor-pointer transition-all duration-300 tracking-wider uppercase';
  
  const variantStyles = {
    primary: 'bg-foreground text-background border border-foreground hover:opacity-80 active:opacity-60',
    secondary: 'bg-secondary text-foreground border border-border hover:bg-muted active:bg-muted',
    success: 'bg-foreground text-background border border-foreground hover:opacity-80 active:opacity-60',
    danger: 'bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background active:opacity-60',
    outline: 'bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background active:opacity-60'
  };
  
  const sizeStyles = {
    small: 'px-4 py-2 text-xs',
    medium: 'px-6 py-3 text-xs',
    large: 'px-8 py-4 text-xs'
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

