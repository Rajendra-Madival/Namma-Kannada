import React from 'react';
import { Link } from 'react-router-dom';
import './ExpressionCard.css';

export default function ExpressionCard({ expression }) {
  const {
    id,
    kannada,
    transliteration,
    meaning,
    regionId,
    regionName,
    domain,
    audioUrl,
    isDialectSpecific,
  } = expression;

  return (
    <article className="expression-card">
      {/* Region & status badges */}
      <div className="card-badges">
        <Link to={`/explore?region=${regionId}`} className="badge badge-region">
          {regionName}
        </Link>
        {domain && (
          <span className="badge badge-domain" style={{ backgroundColor: '#F5E9CB', color: '#575248', textTransform: 'capitalize' }}>
            {domain.replace('-', ' ')}
          </span>
        )}
        {isDialectSpecific ? (
          <span className="badge badge-verified" title="Verified regional dialect expression">
            Dialect idiom
          </span>
        ) : (
          <span className="badge badge-sample" title="Common heritage Kannada expression">
            Common
          </span>
        )}
      </div>

      {/* Core content */}
      <div className="card-body">
        <h3 className="expression-word kannada-text">{kannada}</h3>
        {transliteration && (
          <p className="expression-transliteration">{transliteration}</p>
        )}
        <p className="expression-meaning">{meaning}</p>
      </div>

      {/* Footer */}
      <div className="card-footer">
        {/* Audio availability indicator only */}
        {audioUrl ? (
          <span className="audio-available-chip" aria-label="Audio recording available">
            ▶ Audio
          </span>
        ) : (
          <span className="audio-pending-chip" aria-label="No audio recording yet">
            No audio yet
          </span>
        )}
        <Link to={`/explore/${id}`} className="view-detail-link" aria-label={`View details for ${kannada}`}>
          View details →
        </Link>
      </div>
    </article>
  );
}
