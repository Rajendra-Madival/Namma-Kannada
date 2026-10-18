import React from 'react';
import { Link } from 'react-router-dom';
import './RegionCard.css';

export default function RegionCard({ region }) {
  const {
    id,
    nameEn,
    nameKn,
    districts,
    shortDescription,
    accentColor,
    expressionCount
  } = region;

  return (
    <article className="region-card" style={{ '--region-accent': accentColor }}>
      <div className="region-card-top">
        <div className="region-card-badge">
          <span className="region-count-badge">
            {expressionCount} {expressionCount === 1 ? 'ಪದ (Word)' : 'ಪದಗಳು (Words)'}
          </span>
        </div>
        <h3 className="region-title-kn kannada-text">{nameKn}</h3>
        <h4 className="region-title-en">{nameEn}</h4>
      </div>

      <p className="region-description">{shortDescription}</p>

      {districts && districts.length > 0 && (
        <div className="region-districts">
          <span className="districts-label">ಜಿಲ್ಲೆಗಳು (Districts):</span>{' '}
          <span className="districts-list">{districts.join(', ')}</span>
        </div>
      )}

      <div className="region-card-actions">
        <Link to={`/regions/${id}`} className="region-btn-primary">
          ಪ್ರದೇಶದ ವಿವರ (View Region) →
        </Link>
        <Link to={`/explore?region=${id}`} className="region-btn-subtle">
          ಪದಗಳನ್ನು ಅನ್ವೇಷಿಸಿ (Browse Words)
        </Link>
      </div>
    </article>
  );
}
