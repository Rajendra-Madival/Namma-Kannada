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
    audioUrl,
    isVerified,
    isSample,
  } = expression;

  return (
    <article className="expression-card">
      {/* Region & status badges */}
      <div className="card-badges">
        <Link to={`/explore?region=${regionId}`} className="badge badge-region">
          {regionName}
        </Link>
        {isSample && !isVerified && (
          <span className="badge badge-sample" title="Sample development record">
            Sample
          </span>
        )}
        {isVerified && (
          <span className="badge badge-verified" title="Reviewed by native speakers">
            Verified
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
