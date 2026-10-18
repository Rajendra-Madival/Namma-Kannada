import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/features/SearchBar';
import ExpressionCard from '../components/features/ExpressionCard';
import RegionCard from '../components/features/RegionCard';
import Button from '../components/common/Button';
import { REGIONS, EXPRESSIONS } from '../data/mockData';
import './Home.css';

export default function Home() {
  // Select top featured expressions from different regions
  const featuredExpressions = EXPRESSIONS.slice(0, 6);
  const featuredRegions = REGIONS.slice(0, 4);

  const quickChips = [
    { label: 'ಬ್ಯಾಡ್ರಿ (Uttara Karnataka)', query: 'ಬ್ಯಾಡ್ರಿ' },
    { label: 'ಮಾರ್ರೆ (Karavali)', query: 'ಮಾರ್ರೆ' },
    { label: 'ಯಾಕ್ರೀ ಹಿಂಗೆ (Mysuru)', query: 'ಯಾಕ್ರೀ' },
    { label: 'ಗಿರ್ಮಿಟ್ (Dharwad)', query: 'ಗಿರ್ಮಿಟ್' },
    { label: 'ಗುರು (Bengaluru)', query: 'ಗುರು' },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            <span>ಪ್ರಾದೇಶಿಕ ಕನ್ನಡ ಉಪಭಾಷೆಗಳ ಕೋಶ • Regional Kannada Dialect Explorer</span>
          </div>

          <h1 className="hero-heading">
            <span className="hero-heading-kn kannada-text">ಒಂದು ಭಾಷೆ. ಹಲವು ಧ್ವನಿಗಳು.</span>
            <span className="hero-heading-en">One language. Many voices.</span>
          </h1>

          <p className="hero-subtext">
            Explore the vibrant tapestry of Kannada as spoken across Karnataka—from the rhythmic cadence of Dharwad and the lyrical warmth of Mysuru to the coastal rhythms of Mangalore and the monsoon idioms of Malenadu.
          </p>

          <div className="hero-search-container">
            <SearchBar placeholder="ಪದ, ನುಡಿಗಟ್ಟು ಅಥವಾ ಅರ್ಥ ಹುಡುಕಿ... e.g. ಬ್ಯಾಡ್ರಿ, ಮಾರ್ರೆ, friend" />
            <div className="quick-search-chips">
              <span className="chips-label">ಜನಪ್ರಿಯ ಹುಡುಕಾಟಗಳು (Popular):</span>
              <div className="chips-list">
                {quickChips.map((chip) => (
                  <Link
                    key={chip.query}
                    to={`/explore?q=${encodeURIComponent(chip.query)}`}
                    className="chip-item kannada-text"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-cta-group">
            <Link to="/explore">
              <Button variant="primary" size="lg">
                ಪದಗಳನ್ನು ಅನ್ವೇಷಿಸಿ (Explore Expressions) →
              </Button>
            </Link>
            <Link to="/regions">
              <Button variant="secondary" size="lg">
                ಪ್ರದೇಶಗಳ ಪರಿಚಯ (Browse Regions)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Expressions Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">ಆಯ್ದ ನುಡಿಮುತ್ತುಗಳು</span>
              <h2 className="section-title">ವಿಶೇಷ ಪ್ರಾದೇಶಿಕ ಪದಗಳು (Featured Expressions)</h2>
              <p className="section-subtitle">
                A curated glance at verified and sample expressions from distinct dialect hubs.
              </p>
            </div>
            <Link to="/explore" className="section-view-all">
              ಎಲ್ಲಾ ಪದಗಳನ್ನು ನೋಡಿ (View all {EXPRESSIONS.length}) →
            </Link>
          </div>

          <div className="expressions-grid">
            {featuredExpressions.map((expr) => (
              <ExpressionCard key={expr.id} expression={expr} />
            ))}
          </div>
        </div>
      </section>

      {/* Regions Discovery Section */}
      <section className="regions-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">ಕರ್ನಾಟಕದ ಭೌಗೋಳಿಕ ವ್ಯಾಪ್ತಿ</span>
              <h2 className="section-title">ಪ್ರಾದೇಶಿಕ ಉಪಭಾಷಾ ವಲಯಗಳು (Dialect Regions)</h2>
              <p className="section-subtitle">
                Each corner of Karnataka carries its own distinct tone, colloquialisms, and agrarian history.
              </p>
            </div>
            <Link to="/regions" className="section-view-all">
              ಎಲ್ಲಾ ಪ್ರದೇಶಗಳು (All {REGIONS.length} Regions) →
            </Link>
          </div>

          <div className="regions-grid">
            {featuredRegions.map((region) => (
              <RegionCard key={region.id} region={region} />
            ))}
          </div>
        </div>
      </section>

      {/* Audio Preservation Highlight Section */}
      <section className="audio-discovery-section">
        <div className="container">
          <div className="audio-discovery-card">
            <div className="audio-discovery-content">
              <span className="section-eyebrow eyebrow-light">ಮೂಲ ಧ್ವನಿ ಸಂರಕ್ಷಣೆ</span>
              <h2 className="audio-discovery-title kannada-text">
                ಧ್ವನಿಯಲ್ಲಿದೆ ಮಾತಿನ ಜೀವ (The Soul of Dialect is Sound)
              </h2>
              <p className="audio-discovery-desc">
                Written text conveys meaning, but intonation, pitch, and pronunciation breathe life into regional Kannada. Our platform documents authentic native recordings tagged to exact geographic dialects.
              </p>
              <div className="audio-discovery-features">
                <div className="feature-item">
                  <span className="feature-icon">🎙️</span>
                  <div>
                    <strong>ಸ್ಥಳೀಯ ಧ್ವನಿಗಳು (Native Recordings)</strong>
                    <p>Contributed by verified speakers from each specific locality.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🛡️</span>
                  <div>
                    <strong>ಪರಿಶೀಲಿತ ಗುಣಮಟ್ಟ (Rigorous Review)</strong>
                    <p>No synthetic or unverified recordings passed off as authentic.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="audio-discovery-action">
              <div className="recording-prompt-box">
                <span className="prompt-badge">ನಿಮ್ಮ ಧ್ವನಿ ದಾಖಲಿಸಿ</span>
                <h3 className="prompt-title kannada-text">ನಿಮ್ಮ ಊರಿನ ಮಾತನ್ನು ದಾಖಲಿಸಿ</h3>
                <p className="prompt-desc">
                  Do you speak a unique regional dialect at home? Share your local words with verified pronunciations.
                </p>
                <Link to="/contribute">
                  <Button variant="secondary" size="md">
                    ಧ್ವನಿ ಅಥವಾ ಪದ ಕೊಡುಗೆ ನೀಡಿ (Contribute Now)
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Contribution CTA Banner */}
      <section className="community-cta-section">
        <div className="container">
          <div className="community-cta-box">
            <div className="community-cta-text">
              <h2 className="community-cta-title kannada-text">
                ಕನ್ನಡದ ಶ್ರೀಮಂತಿಕೆಯನ್ನು ಒಟ್ಟಾಗಿ ಉಳಿಸೋಣ
              </h2>
              <p className="community-cta-subtitle">
                Languages flourish when communities document their living heritage. Help us build an open, authentic, and respectful regional Kannada archive.
              </p>
            </div>
            <div className="community-cta-buttons">
              <Link to="/contribute">
                <Button variant="primary" size="lg">
                  + ಹೊಸ ನುಡಿಗಟ್ಟು ಸೇರಿಸಿ (Add Expression)
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  ಯೋಜನೆಯ ಉದ್ದೇಶ (Learn More)
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
