import React from 'react';
import './UI.css';

export default function Button({ 
  children, 
  variant = 'primary', // 'primary', 'secondary', 'danger', 'outline'
  type = 'button', 
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
