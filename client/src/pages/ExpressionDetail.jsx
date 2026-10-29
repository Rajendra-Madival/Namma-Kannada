import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AudioPlayer from '../components/features/AudioPlayer';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { EXPRESSIONS, REGIONS, getRegionById } from '../data/mockData';
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
    domain,
    usageExample,
    variants,
    otherDialects,
    audioUrl,
    notes,
    isDialectSpecific,
    contributor,
  } = expression;

  const regionInfo = getRegionById(regionId) || REGIONS.find((r) => r.id === regionId);

  return (
    <div className="expression-detail-page">
      <div className="site-container">

        {/* Breadcrumb */}
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/explore">Explore</Link>
          <span aria-hidden="true">/</span>
          {regionInfo && (
            <>
              <Link to={`/regions/${regionInfo.id}`}>{regionInfo.nameEn}</Link>
              <span aria-hidden="true">/</span>
            </>
          )}
          <span className="current-crumb kannada-text">{kannada}</span>
        </nav>

        <div className="detail-layout">

          {/* ── Main column ── */}
          <div className="detail-main">

            {/* Status badges */}
            <div className="detail-badges" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {regionInfo && (
                <Link to={`/regions/${regionInfo.id}`} className="badge badge-region">
                  {regionInfo.nameEn}
                </Link>
              )}
              {domain && (
                <span className="badge badge-domain" style={{ backgroundColor: '#F5E9CB', color: '#575248', textTransform: 'capitalize' }}>
                  {domain.replace('-', ' ')}
                </span>
              )}
              {isDialectSpecific ? (
                <span className="badge badge-verified" style={{ backgroundColor: '#E8F5E9', color: '#2E7D32' }}>
                  ✓ Verified Regional Expression
                </span>
              ) : (
                <span className="badge badge-sample" style={{ backgroundColor: '#F1F3F5', color: '#575248' }}>
                  Common Kannada Heritage
                </span>
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

            {/* In Other Regional Dialects */}
            {otherDialects && (
              <section className="detail-section cross-dialect-section">
                <div className="cross-dialect-header-row">
                  <div>
                    <h2 className="detail-section-heading" style={{ marginBottom: '4px' }}>
                      ಇತರ ಉಪಭಾಷೆಗಳಲ್ಲಿ ಈ ಪದ (In Other Dialects)
                    </h2>
                    <p className="cross-dialect-sub">
                      How this word or meaning is expressed across Karnataka&apos;s distinct cultural regions:
                    </p>
                  </div>
                  <span className="cross-dialect-badge-pill">
                    ೬ ಪ್ರಾದೇಶಿಕ ರೂಪಗಳು (6 Regional Forms)
                  </span>
                </div>

                <div className="cross-dialect-grid">
                  {REGIONS.map((reg) => {
                    const regionalTerm = otherDialects[reg.id];
                    const isCurrent = reg.id === regionId;
                    return (
                      <div
                        key={reg.id}
                        className={`cross-dialect-card ${isCurrent ? 'is-current-region' : ''}`}
                        style={{ borderTop: `3px solid ${reg.accentColor}` }}
                      >
                        <div className="cross-card-top">
                          <span className="cross-reg-kn">{reg.nameKn}</span>
                          <span className="cross-reg-en">{reg.nameEn}</span>
                          {isCurrent && <span className="current-dialect-chip">Current Entry</span>}
                        </div>
                        <div className="cross-card-word kannada-text">
                          {regionalTerm || kannada}
                        </div>
                        <div className="cross-card-footer">
                          <Link to={`/explore?region=${reg.id}`} className="cross-card-link">
                            Explore {reg.short} →
                          </Link>
                        </div>
                      </div>
                    );
                  })}
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
