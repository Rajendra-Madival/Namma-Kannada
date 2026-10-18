import React from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';
import './ExpressionCard.css';

export default function ExpressionCard({ expression }) {
  const {
    id,
    kannada,
    transliteration,
    meaning,
    standardKannada,
    regionId,
    regionName,
    usageExample,
    audioUrl,
    isVerified,
    isSample,
  } = expression;

  return (
    <article className="expression-card">
      <div className="card-header">
        <div className="badges-row">
          <Link to={`/explore?region=${regionId}`} className="badge badge-region">
            📍 {regionName}
          </Link>
          {isVerified ? (
            <span className="badge badge-verified" title="Reviewed by native speakers">
              ✓ ಪರಿಶೀಲಿತ (Verified)
            </span>
          ) : (
            <span className="badge badge-sample" title="Sample development record">
              ಪರೀಕ್ಷಾರ್ಥ (Sample)
            </span>
          )}
        </div>
      </div>

      <div className="card-body">
        <h3 className="expression-word kannada-text">{kannada}</h3>
        <p className="expression-transliteration">{transliteration}</p>
        <p className="expression-meaning">{meaning}</p>

        {standardKannada && (
          <div className="standard-equivalent">
            <span className="equivalent-label">ಪ್ರಮಾಣಿತ ರೂಪ (Standard):</span>{' '}
            <span className="equivalent-val kannada-text">{standardKannada}</span>
          </div>
        )}

        {usageExample && (
          <div className="usage-snippet">
            <p className="usage-kannada kannada-text">"{usageExample.kannada}"</p>
            <p className="usage-translation">— {usageExample.translation}</p>
          </div>
        )}
      </div>

      <div className="card-footer">
        <div className="card-audio-container">
          <AudioPlayer
            audioUrl={audioUrl}
            expressionKannada={kannada}
            regionName={regionName}
            compact={true}
          />
        </div>

        <Link to={`/explore/${id}`} className="view-detail-link">
          ವಿವರ ನೋಡಿ (Details) →
        </Link>
      </div>
    </article>
  );
}
