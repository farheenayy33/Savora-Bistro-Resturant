import React, { memo } from 'react';
const AnimatedButton = memo(({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  ariaLabel = null,
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl focus:ring-orange-500',
    secondary: 'bg-white text-orange-600 border-2 border-orange-500 hover:bg-orange-50 focus:ring-orange-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl focus:ring-red-500',
    success: 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl focus:ring-green-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for better performance
  return (
    prevProps.children === nextProps.children &&
    prevProps.onClick === nextProps.onClick &&
    prevProps.variant === nextProps.variant &&
    prevProps.className === nextProps.className &&
    prevProps.type === nextProps.type &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.ariaLabel === nextProps.ariaLabel
  );
});

AnimatedButton.displayName = 'AnimatedButton';
export default AnimatedButton;
