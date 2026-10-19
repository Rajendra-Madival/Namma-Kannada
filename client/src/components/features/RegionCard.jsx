import React from 'react';
import { Link } from 'react-router-dom';
import './RegionCard.css';

export default function RegionCard({ region, expressionCount }) {
  const {
    id,
    nameEn,
    nameKn,
    shortDescription,
    accentColor,
  } = region;

  // Use passed-in count (computed from real data) or fall back to region field
  const count = expressionCount ?? region.expressionCount ?? 0;

  return (
    <article className="region-card">
      {/* Accent bar */}
      <div className="region-card-accent" style={{ backgroundColor: accentColor }} aria-hidden="true" />

      <div className="region-card-body">
        <h3 className="region-title-kn kannada-text">{nameKn}</h3>
        <h4 className="region-title-en">{nameEn}</h4>
        <p className="region-description">{shortDescription}</p>
      </div>

      <div className="region-card-footer">
        <span className="region-count">
          {count} {count === 1 ? 'expression' : 'expressions'}
        </span>
        <div className="region-actions">
          <Link to={`/regions/${id}`} className="region-btn-primary">
            View region →
          </Link>
        </div>
      </div>
    </article>
  );
}
