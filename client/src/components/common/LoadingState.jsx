import React from 'react';
import './StateScreens.css';

export default function LoadingState({ message = 'ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ... Loading linguistic data' }) {
  return (
    <div className="state-container" role="status" aria-live="polite">
      <div className="state-spinner" aria-hidden="true" />
      <p className="state-message">{message}</p>
    </div>
  );
}
