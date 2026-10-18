import React from 'react';
import Button from './Button';
import './StateScreens.css';

export default function ErrorState({
  title = 'ದೋಷ ಸಂಭವಿಸಿದೆ (Unable to load data)',
  message = 'We encountered an unexpected error while retrieving this dialect entry.',
  onRetry = null
}) {
  return (
    <div className="state-container error-state" role="alert">
      <div className="state-icon error-icon" aria-hidden="true">⚠️</div>
      <h3 className="state-title">{title}</h3>
      <p className="state-description">{message}</p>
      {onRetry && (
        <div className="state-action">
          <Button variant="primary" onClick={onRetry}>
            ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ (Retry)
          </Button>
        </div>
      )}
    </div>
  );
}
