import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ExpressionCard from '../components/features/ExpressionCard';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { DOMAINS, EXPRESSIONS, getRegionById } from '../data/mockData';
import './RegionDetail.css';

export default function RegionDetail() {
  const { regionId } = useParams();
  const navigate = useNavigate();

  const [selectedDomain, setSelectedDomain] = useState('all');
  const [dialectFilter, setDialectFilter] = useState('all'); // 'all' | 'dialect-specific' | 'common'

  // Resolve region using ID or alias
  const region = getRegionById(regionId);
  const canonicalId = region?.id || '';

  // Filter expressions for this region (hook called unconditionally)
  const regionExpressions = useMemo(() => {
    if (!canonicalId) return [];
    return EXPRESSIONS.filter((e) => e.regionId === canonicalId);
  }, [canonicalId]);

  // Apply domain & dialect filters (hook called unconditionally)
  const displayedExpressions = useMemo(() => {
    return regionExpressions.filter((expr) => {
      if (selectedDomain !== 'all' && expr.domain !== selectedDomain) return false;
      if (dialectFilter === 'dialect-specific' && !expr.isDialectSpecific) return false;
      if (dialectFilter === 'common' && expr.isDialectSpecific) return false;
      return true;
    });
  }, [regionExpressions, selectedDomain, dialectFilter]);

  // Counts by domain for this region (hook called unconditionally)
  const domainCounts = useMemo(() => {
    const counts = {};
    DOMAINS.forEach((d) => {
      counts[d.id] = regionExpressions.filter((e) => e.domain === d.id).length;
    });
    return counts;
  }, [regionExpressions]);

  if (!region) {
    return (
      <div className="site-container" style={{ padding: '6rem 1rem' }}>
        <EmptyState
          title="ಪ್ರದೇಶ ದೊರೆಯಲಿಲ್ಲ (Region Not Found)"
          description={`The region identifier "${regionId}" was not found.`}
          action={
            <Button variant="primary" onClick={() => navigate('/regions')}>
              ← ಎಲ್ಲಾ ಪ್ರದೇಶಗಳಿಗೆ ಹಿಂತಿರುಗಿ (Back to Regions)
            </Button>
          }
        />
      </div>
    );
  }

  const {
    nameEn,
    nameKn,
    districts,
    shortDescription,
    fullDescription,
    accentColor,
    lightColor,
  } = region;

  const dialectSpecificCount = regionExpressions.filter((e) => e.isDialectSpecific).length;
  const commonCount = regionExpressions.filter((e) => !e.isDialectSpecific).length;

  return (
    <div className="region-detail-page">
      {/* Top Banner with Region Theme */}
      <div
        className="region-hero-banner"
        style={{
          '--banner-accent': accentColor,
          backgroundColor: lightColor || 'var(--color-warm-ivory-alt)',
        }}
      >
        <div className="site-container">
          <nav className="region-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">ಮುಖಪುಟ (Home)</Link>
            <span>/</span>
            <Link to="/regions">ಪ್ರದೇಶಗಳು (Regions)</Link>
            <span>/</span>
            <span className="current-crumb kannada-text">{nameKn}</span>
          </nav>

          <div className="region-hero-header">
            <span
              className="region-eyebrow-tag"
              style={{ backgroundColor: accentColor, color: '#fff' }}
            >
              ಪ್ರಾದೇಶಿಕ ನುಡಿಗಟ್ಟು • Regional Dialect Zone
            </span>
            <h1 className="region-banner-title kannada-text">{nameKn}</h1>
            <h2 className="region-banner-sub">{nameEn}</h2>
          </div>

          <p className="region-banner-desc">{fullDescription || shortDescription}</p>

          {districts && districts.length > 0 && (
            <div className="region-districts-pillbox">
              <span className="districts-heading">ಪ್ರಮುಖ ಜಿಲ್ಲೆಗಳು (Key Districts):</span>
              <div className="districts-pill-list">
                {districts.map((d) => (
                  <span key={d} className="district-pill">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Verification Honesty Callout */}
          <div className="region-honesty-note">
            <span className="honesty-dot" style={{ backgroundColor: accentColor }} />
            <span>
              <strong>Authenticity guideline:</strong> Expressions below are verified through native regional speakers.
              Verified regional dialect expressions ({dialectSpecificCount}) are distinguished from common heritage usage ({commonCount}).
              Dialect boundaries are porous, and speech varies across families and taluks.
            </span>
          </div>
        </div>
      </div>

      <div className="site-container region-content-container">
        {/* Section Header */}
        <div className="region-expressions-header">
          <div>
            <h3 className="section-title">
              ದಾಖಲಾದ ಪದಗಳು ಮತ್ತು ನುಡಿಗಟ್ಟುಗಳು (Documented Expressions)
            </h3>
            <p className="section-subtitle">
              Browse expressions recorded for {nameEn} ({regionExpressions.length} total entries).
            </p>
          </div>

          <Link to={`/contribute?region=${canonicalId}`}>
            <Button variant="primary" size="sm">
              + ಈ ಪ್ರದೇಶಕ್ಕೆ ಹೊಸ ಪದ ಸೇರಿಸಿ (Contribute)
            </Button>
          </Link>
        </div>

        {/* ── Five Domains Filter Bar ── */}
        <div className="region-filters-bar" role="group" aria-label="Filter by Domain">
          <div className="domain-filters-label">Life Domains:</div>
          <div className="domain-pills-list">
            <button
              type="button"
              className={`domain-pill ${selectedDomain === 'all' ? 'is-active' : ''}`}
              onClick={() => setSelectedDomain('all')}
            >
              All Domains ({regionExpressions.length})
            </button>
            {DOMAINS.map((dom) => (
              <button
                key={dom.id}
                type="button"
                className={`domain-pill ${selectedDomain === dom.id ? 'is-active' : ''}`}
                onClick={() => setSelectedDomain(dom.id)}
              >
                <span>{dom.nameEn}</span>
                <span className="domain-count-badge">({domainCounts[dom.id] || 0})</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Dialect Specificity Filter ── */}
        <div className="specificity-filter-row">
          <span className="specificity-label">Vocabulary Type:</span>
          <div className="specificity-buttons">
            <button
              type="button"
              className={`spec-btn ${dialectFilter === 'all' ? 'active' : ''}`}
              onClick={() => setDialectFilter('all')}
            >
              All ({regionExpressions.length})
            </button>
            <button
              type="button"
              className={`spec-btn ${dialectFilter === 'dialect-specific' ? 'active' : ''}`}
              onClick={() => setDialectFilter('dialect-specific')}
            >
              Verified Regional Specific ({dialectSpecificCount})
            </button>
            <button
              type="button"
              className={`spec-btn ${dialectFilter === 'common' ? 'active' : ''}`}
              onClick={() => setDialectFilter('common')}
            >
              Common Heritage ({commonCount})
            </button>
          </div>
        </div>

        {/* Expressions Grid or Empty State */}
        {displayedExpressions.length > 0 ? (
          <div className="region-expressions-grid">
            {displayedExpressions.map((expr) => (
              <ExpressionCard key={expr.id} expression={expr} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="ಈ ವರ್ಗದಲ್ಲಿ ಯಾವುದೇ ಪದಗಳು ಕಂಡುಬಂದಿಲ್ಲ"
            description={`No expressions match the selected filter combination in ${nameEn}.`}
            action={
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSelectedDomain('all');
                    setDialectFilter('all');
                  }}
                >
                  ಎಲ್ಲಾ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ (Reset filters)
                </Button>
                <Link to={`/contribute?region=${canonicalId}`}>
                  <Button variant="primary">
                    ಈ ವರ್ಗಕ್ಕೆ ಪದ ಸೇರಿಸಿ (Contribute word)
                  </Button>
                </Link>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
}
