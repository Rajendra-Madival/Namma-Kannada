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
          title="Expression not found"
          description={`No expression with ID "${expressionId}" exists in the current archive.`}
          action={
            <Button variant="primary" onClick={() => navigate('/explore')}>
              ← Back to Explore
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
    contributor,
  } = expression;

  const regionInfo = REGIONS.find((r) => r.id === regionId);

  return (
    <div className="expression-detail-page">
      <div className="container">

        {/* Breadcrumb */}
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/explore">Explore</Link>
          <span aria-hidden="true">/</span>
          <span className="current-crumb kannada-text">{kannada}</span>
        </nav>

        <div className="detail-layout">

          {/* ── Main column ── */}
          <div className="detail-main">

            {/* Status badges */}
            <div className="detail-badges">
              <Link to={`/regions/${regionId}`} className="badge badge-region">
                {regionName}
              </Link>
              {isVerified ? (
                <span className="badge badge-verified">✓ Verified</span>
              ) : (
                <span className="badge badge-sample">Sample fixture</span>
              )}
            </div>

            {/* Word & transliteration */}
            <h1 className="detail-word kannada-text">{kannada}</h1>
            {transliteration && (
              <p className="detail-transliteration">{transliteration}</p>
            )}

            {/* Meaning */}
            <section className="detail-section">
              <h2 className="detail-section-heading">Meaning</h2>
              <p className="meaning-primary">{meaning}</p>
              {literalMeaning && (
                <p className="meaning-literal">
                  <strong>Literal / connotative:</strong> {literalMeaning}
                </p>
              )}
            </section>

            {/* Audio */}
            <section className="detail-section">
              <h2 className="detail-section-heading">Pronunciation</h2>
              <AudioPlayer
                audioUrl={audioUrl}
                expressionKannada={kannada}
                regionName={regionName}
              />
            </section>

            {/* Region */}
            {regionInfo && (
              <section className="detail-section">
                <h2 className="detail-section-heading">Region &amp; dialect</h2>
                <p className="region-name-line">
                  <span className="kannada-text">{regionInfo.nameKn}</span>{' '}
                  — {regionInfo.nameEn}
                </p>
                <p className="region-description-line">{regionInfo.shortDescription}</p>
                {regionInfo.districts && (
                  <p className="districts-line">
                    <strong>Districts:</strong> {regionInfo.districts.join(', ')}
                  </p>
                )}
                <Link to={`/regions/${regionId}`} className="detail-region-link">
                  Browse all {regionInfo.nameEn} expressions →
                </Link>
              </section>
            )}

            {/* Standard equivalent */}
            {standardKannada && (
              <section className="detail-section">
                <h2 className="detail-section-heading">Standard Kannada equivalent</h2>
                <div className="standard-box">
                  <span className="standard-word kannada-text">{standardKannada}</span>
                  <span className="standard-note">As used in formal writing and textbooks</span>
                </div>
              </section>
            )}

            {/* Usage example */}
            {usageExample && (
              <section className="detail-section">
                <h2 className="detail-section-heading">Example sentence</h2>
                <blockquote className="usage-box">
                  <p className="usage-sentence kannada-text">"{usageExample.kannada}"</p>
                  <footer className="usage-translation">— {usageExample.translation}</footer>
                </blockquote>
              </section>
            )}

            {/* Variants */}
            {variants && variants.length > 0 && (
              <section className="detail-section">
                <h2 className="detail-section-heading">Regional variants</h2>
                <div className="variants-list">
                  {variants.map((v, idx) => (
                    <span key={idx} className="variant-chip kannada-text">{v}</span>
                  ))}
                </div>
              </section>
            )}

            {/* Cultural notes */}
            {notes && (
              <section className="detail-section">
                <h2 className="detail-section-heading">Cultural notes</h2>
                <p className="detail-notes-text">{notes}</p>
              </section>
            )}

            {/* Attribution */}
            <section className="detail-section detail-meta">
              <p className="meta-text">
                <strong>Source:</strong> {contributor || 'Community fixture'}
              </p>
              <p className="meta-sub">
                Spotted an inaccuracy?{' '}
                <Link to="/contact">Suggest a correction</Link>
              </p>
            </section>

          </div>

          {/* ── Sidebar: quick nav ── */}
          <aside className="detail-sidebar">
            <div className="sidebar-back">
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => navigate(-1)}
              >
                ← Back
              </button>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
