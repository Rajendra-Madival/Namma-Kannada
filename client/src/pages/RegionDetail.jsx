import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ExpressionCard from '../components/features/ExpressionCard';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { REGIONS, EXPRESSIONS } from '../data/mockData';
import './RegionDetail.css';

export default function RegionDetail() {
  const { regionId } = useParams();
  const navigate = useNavigate();

  const region = REGIONS.find((r) => r.id === regionId);

  if (!region) {
    return (
      <div className="container" style={{ padding: '4rem 1rem' }}>
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
    fullDescription,
    accentColor
  } = region;

  // Find all expressions tagged to this region
  const regionExpressions = EXPRESSIONS.filter((e) => e.regionId === regionId);

  return (
    <div className="region-detail-page">
      {/* Top Banner with Region Theme */}
      <div className="region-hero-banner" style={{ '--banner-accent': accentColor }}>
        <div className="container">
          <nav className="region-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">ಮುಖಪುಟ (Home)</Link>
            <span>/</span>
            <Link to="/regions">ಪ್ರದೇಶಗಳು (Regions)</Link>
            <span>/</span>
            <span className="current-crumb kannada-text">{nameKn}</span>
          </nav>

          <div className="region-hero-header">
            <span className="region-eyebrow-tag">ಪ್ರಾದೇಶಿಕ ಉಪಭಾಷಾ ವಿವರ</span>
            <h1 className="region-banner-title kannada-text">{nameKn}</h1>
            <h2 className="region-banner-sub">{nameEn}</h2>
          </div>

          <p className="region-banner-desc">{fullDescription}</p>

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
        </div>
      </div>

      <div className="container region-content-container">
        {/* Section Header */}
        <div className="region-expressions-header">
          <div>
            <h3 className="section-title">
              ದಾಖಲಾದ ಪದಗಳು ಮತ್ತು ನುಡಿಗಟ್ಟುಗಳು (Documented Expressions)
            </h3>
            <p className="section-subtitle">
              Browse expressions currently recorded for this region ({regionExpressions.length} entries).
            </p>
          </div>

          <Link to={`/contribute?region=${regionId}`}>
            <Button variant="primary" size="sm">
              + ಈ ಪ್ರದೇಶಕ್ಕೆ ಹೊಸ ಪದ ಸೇರಿಸಿ (Contribute)
            </Button>
          </Link>
        </div>

        {/* Expressions List or Empty State */}
        {regionExpressions.length > 0 ? (
          <div className="region-expressions-grid">
            {regionExpressions.map((expr) => (
              <ExpressionCard key={expr.id} expression={expr} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="ಈ ಪ್ರದೇಶಕ್ಕೆ ಇನ್ನೂ ಪದಗಳನ್ನು ಸೇರಿಸಲಾಗಿಲ್ಲ"
            description={`No dialect expressions have been recorded for ${nameEn} yet. Be the first native speaker to contribute!`}
            action={
              <Link to={`/contribute?region=${regionId}`}>
                <Button variant="primary">
                  ಮೊದಲ ಪದ ಕೊಡುಗೆ ನೀಡಿ (Contribute First Expression)
                </Button>
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
}
