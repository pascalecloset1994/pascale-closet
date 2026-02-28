import React from 'react';

const Button = ({ 
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
    primary: 'bg-[#2C2420] text-white border border-[#2C2420] hover:bg-[#333333] active:bg-black',
    secondary: 'bg-[#F5F0EB] text-[#2C2420] border border-[#E0D6CC] hover:bg-[#E0D6CC] active:bg-[#D5D5D5]',
    success: 'bg-[#2C2420] text-white border border-[#2C2420] hover:bg-[#333333] active:bg-black',
    danger: 'bg-white text-[#2C2420] border border-[#2C2420] hover:bg-[#2C2420] hover:text-white active:bg-black',
    outline: 'bg-transparent text-[#2C2420] border border-[#2C2420] hover:bg-[#2C2420] hover:text-white active:bg-[#333333]'
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

