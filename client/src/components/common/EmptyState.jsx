import React from 'react';
import './StateScreens.css';

export default function EmptyState({
  title = 'ಯಾವುದೇ ಫಲಿತಾಂಶ ದೊರೆಯಲಿಲ್ಲ (No expressions found)',
  description = 'Try searching with a different Kannada keyword, English meaning, or clear your regional filters.',
  action = null
}) {
  return (
    <div className="state-container empty-state">
      <div className="state-icon" aria-hidden="true">🔍</div>
      <h3 className="state-title">{title}</h3>
      <p className="state-description">{description}</p>
      {action && <div className="state-action">{action}</div>}
    </div>
  );
}
