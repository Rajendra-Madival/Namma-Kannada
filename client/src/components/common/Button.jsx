import React from 'react';
import './Button.css';

/**
 * Reusable Button Component
 * @param {'primary' | 'secondary' | 'outline' | 'ghost'} variant - Button visual style
 * @param {'sm' | 'md' | 'lg'} size - Button size scale
 * @param {boolean} isLoading - Loading spinner state
 * @param {React.ReactNode} icon - Optional leading or trailing icon
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="btn-spinner" aria-hidden="true" />
      ) : icon ? (
        <span className="btn-icon" aria-hidden="true">{icon}</span>
      ) : null}
      <span className="btn-label">{children}</span>
    </button>
  );
}
