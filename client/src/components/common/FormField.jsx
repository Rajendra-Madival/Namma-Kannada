import React from 'react';
import './FormField.css';

export default function FormField({
  id,
  label,
  kannadaLabel,
  hint,
  error,
  required = false,
  children
}) {
  return (
    <div className={`form-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id} className="form-label">
        <span className="label-text">
          {label}
          {kannadaLabel && <span className="kannada-label kannada-text"> ({kannadaLabel})</span>}
        </span>
        {required && <span className="required-indicator" aria-hidden="true">*</span>}
      </label>
      
      {hint && <p id={`${id}-hint`} className="form-hint">{hint}</p>}
      
      <div className="form-control-wrapper">
        {children}
      </div>

      {error && (
        <p id={`${id}-error`} className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
