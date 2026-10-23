import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Compass,
  Headphones,
  MapPin,
  Search,
  Volume2,
} from 'lucide-react';
import { REGIONS, EXPRESSIONS, DOMAINS } from '../data/mockData';
import './ManusLanding.css';

function RegionMap({ selected, onSelect }) {
  const handleMarkerKeyDown = (event, region) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(region.id);
    }
  };

  return (
    <div className="map-shell">
      <div className="map-note">
        <span className="map-note-dot" /> Supplied Karnataka outline
      </div>
      <div className="outline-map" role="img" aria-labelledby="map-title map-desc">
        <span id="map-title" className="sr-only">Karnataka region explorer</span>
        <span id="map-desc" className="sr-only">
          The supplied Karnataka outline with six provisional exploration zones marked as selectable color-coded points.
        </span>
        <img className="outline-image" src="/karnataka-outline.png" alt="Outline of Karnataka" />
        <div className="map-markers" aria-label="Select a provisional exploration zone">
          {REGIONS.map((region) => (
            <button
              type="button"
              key={region.id}
              className={`map-marker ${selected === region.id ? 'is-selected' : ''}`}
              style={{
                left: region.markerPosition?.left || '50%',
                top: region.markerPosition?.top || '50%',
                '--marker-color': region.accentColor,
              }}
              onClick={() => onSelect(region.id)}
              onMouseEnter={() => onSelect(region.id)}
              onFocus={() => onSelect(region.id)}
              onKeyDown={(event) => handleMarkerKeyDown(event, region)}
              aria-pressed={selected === region.id}
              aria-label={`Select ${region.nameEn}`}
            >
              <span className="marker-dot" />
              <span className="marker-label">{region.short}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="map-legend">
        <span className="legend-line" /> Tap or hover a zone to preview
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState('central');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const activeRegion = REGIONS.find((r) => r.id === selectedRegion) ?? REGIONS[0];

  // Expressions count for the selected region
  const activeRegionExpressions = EXPRESSIONS.filter((e) => e.regionId === activeRegion.id);

  // Featured sample expression for preview card
  const featuredSample = EXPRESSIONS.find((e) => e.id === 'byadari') || EXPRESSIONS[0];

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const handleQuickDomain = (domainId) => {
    navigate(`/explore?domain=${encodeURIComponent(domainId)}`);
  };

  return (
    <div className="manus-landing" id="top">
      {/* ── Hero Section ── */}
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-texture" aria-hidden="true">
          <span /><span /><span />
        </div>
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-rule" /> A living archive of how we speak
            </div>
            <h1 id="hero-title">
              Discover Kannada,<br />
              <em>the way Karnataka speaks.</em>
            </h1>
            <p className="hero-lede">
              Words travel. Their shape, rhythm, and feeling change from one place to the next.
              Namma Kannada helps you notice those differences—and keep them in conversation.
            </p>

            {/* Functional Search Form navigating to /explore */}
            <form className="search-form" onSubmit={handleSearchSubmit} role="search">
              <Search className="search-icon" size={21} aria-hidden="true" />
              <label className="sr-only" htmlFor="expression-search">
                Search Kannada expressions
              </label>
              <input
                id="expression-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search an expression · ಪದ ಅಥವಾ ಅರ್ಥ ಹುಡುಕಿ…"
                autoComplete="off"
              />
              <button type="submit" className="search-button">
                Search <ArrowRight size={17} aria-hidden="true" />
              </button>
            </form>

            {/* Quick starts by category domain */}
            <div className="quick-starts" aria-label="Quick search categories">
              <span>Try exploring</span>
              {DOMAINS.map((dom) => (
                <button
                  key={dom.id}
                  type="button"
                  onClick={() => handleQuickDomain(dom.id)}
                  title={`Explore ${dom.nameEn} (${dom.nameKn})`}
                >
                  {dom.nameEn}
                </button>
              ))}
            </div>

            {/* Browse Regions direct link */}
            <div style={{ marginTop: '1.25rem' }}>
              <Link to="/regions" className="text-link" style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                ಪ್ರಾಂತ್ಯಗಳನ್ನು ನೋಡಿ (Browse all 6 regions) <ArrowRight size={15} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </Link>
            </div>
          </div>

          <div className="hero-aside" aria-label="Project note">
            <div className="hero-note-card">
              <div className="note-stamp">01</div>
              <p>
                Start with curiosity.<br />
                <strong>Leave room for context.</strong>
              </p>
              <span className="note-doodle" aria-hidden="true">✳</span>
            </div>
            <div className="hero-script" aria-hidden="true">
              ಮಾತು<br />
              <span>ಮನೆ ಮನೆಗೆ</span>
            </div>
          </div>
        </div>
        <a className="scroll-cue" href="#explore-zones" aria-label="Scroll to regional explorer">
          <span /> See the regions
        </a>
      </section>

      {/* ── Interactive Regional Explorer Section ── */}
      <section className="explore-section site-container" id="explore-zones" aria-labelledby="explore-title">
        <div className="section-heading split-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-rule" /> Start with a place
            </div>
            <h2 id="explore-title">
              Where does your Kannada<br />
              <em>feel like home?</em>
            </h2>
          </div>
          <p>
            Choose a broad zone to browse what the project documents across Karnataka.
            These are illustrative navigation zones—not definitive dialect borders.
          </p>
        </div>

        <div className="explorer-layout">
          <div className="map-column">
            <RegionMap selected={selectedRegion} onSelect={setSelectedRegion} />
          </div>

          <div className="region-panel">
            <div
              className="selected-region-card"
              style={{
                '--region-color': activeRegion.accentColor,
                '--region-light': activeRegion.lightColor || '#F5E9CB',
              }}
            >
              <div className="selected-region-kicker">
                <MapPin size={15} /> Selected zone • {activeRegion.nameKn}
              </div>
              <h3>{activeRegion.nameEn}</h3>
              <p>{activeRegion.shortDescription}</p>
              <div style={{ margin: '0.75rem 0', fontSize: '0.85rem', color: '#6b6258' }}>
                <strong>{activeRegionExpressions.length}</strong> documented expressions in this zone
              </div>
              <Link to={`/regions/${activeRegion.id}`} className="text-link">
                Explore {activeRegion.nameEn} zone <ArrowRight size={15} />
              </Link>
            </div>

            <div className="region-list" aria-label="Select an exploration zone">
              {REGIONS.map((region, index) => (
                <button
                  type="button"
                  key={region.id}
                  className={`region-list-item ${selectedRegion === region.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedRegion(region.id)}
                  onMouseEnter={() => setSelectedRegion(region.id)}
                  aria-pressed={selectedRegion === region.id}
                >
                  <span className="region-index">0{index + 1}</span>
                  <span className="region-color" style={{ backgroundColor: region.accentColor }} />
                  <span className="region-name">
                    {region.nameEn} <small style={{ color: '#888', marginLeft: '6px' }}>({region.nameKn})</small>
                  </span>
                  <ChevronDown className="region-chevron" size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Method / How It Works Section ── */}
      <section className="method-section" id="method" aria-labelledby="method-title">
        <div className="site-container">
          <div className="section-heading centered-heading">
            <div className="eyebrow">
              <span className="eyebrow-rule" /> A careful way in
            </div>
            <h2 id="method-title">
              From a word you know<br />
              <em>to a story you can share.</em>
            </h2>
          </div>
          <div className="method-grid">
            <article className="method-card">
              <span className="method-number">01</span>
              <div className="method-icon">
                <Search size={22} />
              </div>
              <h3>Search an expression</h3>
              <p>Start with a word, phrase, feeling, or everyday moment you want to understand better.</p>
            </article>

            <article className="method-card method-card-featured">
              <span className="method-number">02</span>
              <div className="method-icon">
                <Compass size={22} />
              </div>
              <h3>Compare regional use</h3>
              <p>See how the same idea may shift across our six broad exploration zones.</p>
            </article>

            <article className="method-card">
              <span className="method-number">03</span>
              <div className="method-icon">
                <Headphones size={22} />
              </div>
              <h3>Listen with care</h3>
              <p>When recordings are verified and consented, hear pronunciation in the authentic voices of regional speakers.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── Featured Expression Section ── */}
      <section className="featured-section site-container" aria-labelledby="featured-title">
        <div className="featured-intro">
          <div className="eyebrow">
            <span className="eyebrow-rule" /> The archive, in progress
          </div>
          <h2 id="featured-title">
            Every entry should<br />
            <em>show its working.</em>
          </h2>
          <p>
            Language is lived, local, and layered. We're building the explorer so context and source status stay visible—not tucked away in the fine print.
          </p>
          <Link className="text-link" to="/explore">
            Browse all {EXPRESSIONS.length} entries <ArrowRight size={15} />
          </Link>
        </div>

        <article className="expression-card">
          <div className="expression-card-top">
            <span className="status-badge">
              <span className="status-dot" style={{ backgroundColor: '#2E7D32' }} />
              Verified Regional Entry
            </span>
            <span className="expression-ref">NK / {featuredSample.id.toUpperCase()}</span>
          </div>

          <div className="expression-card-body">
            <div className="expression-placeholder" aria-hidden="true">
              {featuredSample.kannada}
            </div>
            <div>
              <div className="field-label">Expression · {featuredSample.transliteration}</div>
              <h3>{featuredSample.kannada}</h3>
              <p>{featuredSample.meaning}</p>
              {featuredSample.usageExample && (
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic', fontSize: '0.9rem', color: '#575248' }}>
                  &ldquo;{featuredSample.usageExample.kannada}&rdquo; — {featuredSample.usageExample.translation}
                </p>
              )}
            </div>
          </div>

          <div className="expression-meta">
            <div>
              <span className="field-label">Region</span>
              <strong>{featuredSample.regionName}</strong>
            </div>
            <div>
              <span className="field-label">Pronunciation</span>
              <strong className="muted-meta">
                <Volume2 size={15} /> Native speaker verified
              </strong>
            </div>
            <div>
              <span className="field-label">Source status</span>
              <strong style={{ color: '#2E7D32' }}>
                <Check size={15} /> {featuredSample.contributor}
              </strong>
            </div>
          </div>
        </article>
      </section>

      {/* ── Contribution Invite Section ── */}
      <section className="contribute-section" id="contribute-cta" aria-labelledby="contribute-cta-title">
        <div className="site-container contribute-inner">
          <div className="contribute-badge" aria-hidden="true">
            ನಮ್ಮ<br />ಕನ್ನಡ
          </div>
          <div>
            <div className="eyebrow light-eyebrow">
              <span className="eyebrow-rule" /> Built with listening
            </div>
            <h2 id="contribute-cta-title">
              Know a word that belongs<br />
              <em>in the conversation?</em>
            </h2>
            <p>
              Namma Kannada is shaped with speakers, researchers, and careful source-checking.
              Share a regional word or expression from your corner of Karnataka.
            </p>
          </div>
          <button
            type="button"
            className="outline-light-button"
            onClick={() => navigate('/contribute')}
          >
            Contribute now <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
