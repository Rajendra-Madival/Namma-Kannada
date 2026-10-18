import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AudioPlayer from '../components/features/AudioPlayer';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { EXPRESSIONS, REGIONS } from '../data/mockData';
import './ExpressionDetail.css';

export default function ExpressionDetail() {
  const { expressionId } = useParams();
  const navigate = useNavigate();

  const expression = EXPRESSIONS.find((e) => e.id === expressionId);

  if (!expression) {
    return (
      <div className="container" style={{ padding: '4rem 1rem' }}>
        <EmptyState
          title="ಪದ ದೊರೆಯಲಿಲ್ಲ (Expression Not Found)"
          description={`The expression ID "${expressionId}" does not exist in our current dataset.`}
          action={
            <Button variant="primary" onClick={() => navigate('/explore')}>
              ← ಅನ್ವೇಷಣೆಗೆ ಹಿಂತಿರುಗಿ (Back to Explore)
            </Button>
          }
        />
      </div>
    );
  }

  const {
    kannada,
    transliteration,
    meaning,
    literalMeaning,
    standardKannada,
    regionId,
    regionName,
    usageExample,
    variants,
    audioUrl,
    notes,
    isVerified,
    isSample,
    contributor
  } = expression;

  const regionInfo = REGIONS.find((r) => r.id === regionId);

  return (
    <div className="expression-detail-page">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">ಮುಖಪುಟ (Home)</Link>
          <span>/</span>
          <Link to="/explore">ಅನ್ವೇಷಿಸಿ (Explore)</Link>
          <span>/</span>
          <span className="current-crumb kannada-text">{kannada}</span>
        </nav>

        <div className="detail-layout">
          {/* Main Info Card */}
          <div className="detail-main-card">
            <div className="detail-header-badges">
              <Link to={`/regions/${regionId}`} className="badge badge-region">
                📍 {regionName}
              </Link>
              {isVerified ? (
                <span className="badge badge-verified">✓ ಪರಿಶೀಲಿತ ನುಡಿ (Verified)</span>
              ) : (
                <span className="badge badge-sample">ಪರೀಕ್ಷಾರ್ಥ ದಾಖಲೆ (Sample Fixture)</span>
              )}
            </div>

            <h1 className="detail-word kannada-text">{kannada}</h1>
            {transliteration && (
              <p className="detail-transliteration">{transliteration}</p>
            )}

            <div className="detail-meaning-box">
              <h2 className="meaning-heading">ಅರ್ಥ (Meaning)</h2>
              <p className="meaning-primary">{meaning}</p>
              {literalMeaning && (
                <p className="meaning-literal">
                  <strong>ನೇರ ಅಥವಾ ಸಾಂಕೇತಿಕ ಅರ್ಥ (Literal/Connotative):</strong> {literalMeaning}
                </p>
              )}
            </div>

            {/* Standard Kannada comparison */}
            {standardKannada && (
              <div className="detail-section">
                <h3 className="section-title-sm">ಪ್ರಮಾಣಿತ ಕನ್ನಡ ಸಮಾನಾರ್ಥಕ (Standard Equivalent)</h3>
                <div className="standard-box">
                  <span className="standard-word kannada-text">{standardKannada}</span>
                  <span className="standard-note">As commonly written in textbooks and formal media</span>
                </div>
              </div>
            )}

            {/* Usage Example */}
            {usageExample && (
              <div className="detail-section">
                <h3 className="section-title-sm">ಪ್ರಯೋಗ / ವಾಕ್ಯ ಬಳಕೆ (Usage in Dialogue)</h3>
                <div className="usage-box">
                  <p className="usage-sentence kannada-text">"{usageExample.kannada}"</p>
                  <p className="usage-translation">— {usageExample.translation}</p>
                </div>
              </div>
            )}

            {/* Dialect Variants */}
            {variants && variants.length > 0 && (
              <div className="detail-section">
                <h3 className="section-title-sm">ಇತರ ರೂಪಗಳು ಮತ್ತು ರೂಪಾಂತರಗಳು (Dialect Variants)</h3>
                <div className="variants-list">
                  {variants.map((v, idx) => (
                    <span key={idx} className="variant-chip kannada-text">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Cultural & Linguistic Notes */}
            {notes && (
              <div className="detail-section">
                <h3 className="section-title-sm">ಭಾಷಿಕ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಹಿನ್ನೆಲೆ (Cultural Notes)</h3>
                <p className="detail-notes-text">{notes}</p>
              </div>
            )}
          </div>

          {/* Sidebar: Audio & Region Context */}
          <aside className="detail-sidebar">
            {/* Audio Panel */}
            <div className="sidebar-card">
              <h3 className="sidebar-title">ಧ್ವನಿ ಉಚ್ಚಾರಣೆ (Pronunciation)</h3>
              <AudioPlayer
                audioUrl={audioUrl}
                expressionKannada={kannada}
                regionName={regionName}
              />
              <p className="audio-guideline">
                Authentic dialect pronunciation reflects natural speed, tonal contour, and regional honorifics.
              </p>
            </div>

            {/* Region Details Panel */}
            {regionInfo && (
              <div className="sidebar-card">
                <span className="sidebar-eyebrow">ಸಂಬಂಧಿತ ಪ್ರದೇಶ</span>
                <h3 className="sidebar-region-title kannada-text">{regionInfo.nameKn}</h3>
                <p className="sidebar-region-en">{regionInfo.nameEn}</p>
                <p className="sidebar-region-desc">{regionInfo.shortDescription}</p>
                
                {regionInfo.districts && (
                  <div className="sidebar-districts">
                    <strong>ವ್ಯಾಪ್ತಿ (Districts):</strong> {regionInfo.districts.slice(0, 4).join(', ')}...
                  </div>
                )}

                <Link to={`/regions/${regionId}`} className="sidebar-link">
                  ಈ ಪ್ರದೇಶದ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ (Learn more) →
                </Link>
              </div>
            )}

            {/* Attribution / Integrity Note */}
            <div className="sidebar-card sidebar-meta">
              <span className="sidebar-eyebrow">ದಾಖಲೆಯ ಮೂಲ</span>
              <p className="meta-text">
                <strong>ಮೂಲ / ದೃಢೀಕರಣ:</strong> {contributor || 'ಸಮುದಾಯ ಪರಿಶೀಲನೆ (Community Fixture)'}
              </p>
              <p className="meta-sub">
                Notice an inaccuracy? You can submit an edit or contextual note via our feedback form.
              </p>
              <Link to="/contact">
                <Button variant="outline" size="sm" className="w-full">
                  ತಿದ್ದುಪಡಿ ಸೂಚಿಸಿ (Suggest Correction)
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
