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
  Sparkles,
} from 'lucide-react';
import { REGIONS, EXPRESSIONS, DOMAINS } from '../data/mockData';
import DialectSoundboard from '../components/features/DialectSoundboard';
import './ManusLanding.css';

// ── Word of the Day data (cycles through expressions) ──
function WordOfTheDay() {
  const [idx, setIdx] = useState(() => {
    // Use date to pick a "daily" word (changes per day, consistent per session)
    return new Date().getDate() % EXPRESSIONS.length;
  });

  const word = EXPRESSIONS[idx] || EXPRESSIONS[0];
  if (!word) return null;

  const prev = () => setIdx((i) => (i - 1 + EXPRESSIONS.length) % EXPRESSIONS.length);
  const next = () => setIdx((i) => (i + 1) % EXPRESSIONS.length);

  return (
    <section className="wotd-section" aria-labelledby="wotd-title">
      <div className="site-container">
        <div className="wotd-inner">
          {/* Left: word info */}
          <div>
            <span className="wotd-label">Word of the Day</span>
            <div className="wotd-kannada" id="wotd-title" lang="kn">
              {word.kannada}
            </div>
            <div className="wotd-transliteration">{word.transliteration}</div>
            <div className="wotd-meaning">{word.meaning}</div>
            {word.standardKannada && (
              <div style={{ fontSize: '0.82rem', color: '#888', marginTop: '0.3rem' }}>
                Standard: {word.standardKannada}
              </div>
            )}
            <span className="wotd-region-tag">
              <MapPin size={12} /> {word.regionName}
            </span>
            <div className="wotd-nav-btns" aria-label="Navigate words">
              <button className="wotd-nav-btn" onClick={prev} aria-label="Previous word">‹</button>
              <button className="wotd-nav-btn" onClick={next} aria-label="Next word">›</button>
            </div>
          </div>

          {/* Right: usage example */}
          <div className="wotd-example-box">
            {word.usageExample ? (
              <>
                <p className="wotd-example-kannada" lang="kn">
                  {word.usageExample.kannada}
                </p>
                <p className="wotd-example-en">{word.usageExample.translation}</p>
              </>
            ) : (
              <p style={{ color: '#888', fontStyle: 'italic' }}>No usage example available.</p>
            )}
            {word.notes && (
              <p style={{ fontSize: '0.8rem', color: '#a08060', marginTop: '0.75rem', borderTop: '1px solid #f0e8d5', paddingTop: '0.6rem' }}>
                📝 {word.notes}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Dialect Quiz ──
const QUIZ_QUESTIONS = EXPRESSIONS
  .filter((e) => e.usageExample)
  .slice(0, 10)
  .map((expr) => {
    // Generate 3 wrong answers from other expressions
    const wrongPool = EXPRESSIONS
      .filter((e) => e.id !== expr.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((e) => (e.meaning || '').split('(')[0].trim().slice(0, 50));

    const correct = (expr.meaning || '').split('(')[0].trim().slice(0, 50);
    const options = [...wrongPool, correct].sort(() => Math.random() - 0.5);

    return {
      id: expr.id,
      word: expr.kannada,
      transliteration: expr.transliteration,
      region: expr.regionName,
      correctAnswer: correct,
      options,
    };
  });

function DialectQuiz() {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = QUIZ_QUESTIONS[qIdx];
  if (!q) return null;

  const handleSelect = (option) => {
    if (selected !== null) return;
    setSelected(option);
    if (option === q.correctAnswer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (qIdx + 1 >= QUIZ_QUESTIONS.length) {
      setFinished(true);
    } else {
      setQIdx((i) => i + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setQIdx(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <section className="quiz-section" aria-labelledby="quiz-title">
      <div className="site-container">
        <div className="quiz-inner">
          {/* Left: heading */}
          <div className="quiz-heading-col">
            <div className="eyebrow">
              <span className="eyebrow-rule" /> ಭಾಷಾ ಆಟ
            </div>
            <h2 id="quiz-title">
              Test your<br />
              <em>dialect knowledge</em>
            </h2>
            <p>
              How well do you know Karnataka's regional words?
              Guess the meaning of these authentic dialect expressions from across Karnataka's six zones.
            </p>
            {finished && (
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F4C430' }}>
                  {score} / {QUIZ_QUESTIONS.length}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  {score >= 7 ? '🏆 Excellent! You know Karnataka well!' :
                   score >= 4 ? '👏 Good effort! Keep exploring the dialects.' :
                   '📚 Keep learning — the archive awaits you!'}
                </div>
                <button className="quiz-next-btn" onClick={handleRestart}>
                  Play Again <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>

          {/* Right: quiz card */}
          {!finished && (
            <div className="quiz-card">
              <div className="quiz-question-num">
                Question {qIdx + 1} of {QUIZ_QUESTIONS.length} · {q.region}
              </div>
              <div className="quiz-word" lang="kn">{q.word}</div>
              <div className="quiz-prompt">({q.transliteration}) — What does this mean?</div>

              <div className="quiz-options">
                {q.options.map((option, i) => {
                  let cls = 'quiz-option';
                  if (selected !== null) {
                    if (option === q.correctAnswer) cls += ' correct';
                    else if (option === selected) cls += ' wrong';
                  }
                  return (
                    <button
                      key={option}
                      type="button"
                      className={cls}
                      onClick={() => handleSelect(option)}
                      disabled={selected !== null}
                    >
                      <span className="quiz-option-letter">{String.fromCharCode(65 + i)}</span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <>
                  <div className={`quiz-result ${selected === q.correctAnswer ? 'correct' : 'wrong'}`}>
                    {selected === q.correctAnswer
                      ? '✅ ಸರಿಯಾದ ಉತ್ತರ! Correct!'
                      : `❌ Wrong — the answer is: "${q.correctAnswer}"`}
                  </div>
                  <button className="quiz-next-btn" onClick={handleNext}>
                    {qIdx + 1 >= QUIZ_QUESTIONS.length ? 'See Results' : 'Next Question'} <ArrowRight size={15} />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Region Map (unchanged) ──
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
        <span className="map-note-dot" /> Karnataka dialect zones
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

  // App stats
  const totalExpressions = EXPRESSIONS.length;
  const verifiedCount = EXPRESSIONS.filter((e) => e.isVerified).length;
  const dialectSpecific = EXPRESSIONS.filter((e) => e.isDialectSpecific).length;

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
              <span className="eyebrow-rule" /> ಕರ್ನಾಟಕದ ಜೀವಂತ ಭಾಷೆ
            </div>
            <h1 id="hero-title">
              Discover Kannada,<br />
              <em>the way Karnataka speaks.</em>
            </h1>
            <p className="hero-lede">
              ಮಾತು ಮನೆ ಮನೆಗೆ ಬದಲಾಗುತ್ತದೆ — Words change from home to home.
              Namma Kannada maps the living dialects of all six regions of Karnataka with authentic expressions, real usage, and native context.
            </p>

            {/* Functional Search Form */}
            <form className="search-form" onSubmit={handleSearchSubmit} role="search">
              <Search className="search-icon" size={21} aria-hidden="true" />
              <label className="sr-only" htmlFor="expression-search">
                Search Kannada expressions
              </label>
              <input
                id="expression-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ಪದ ಹುಡುಕಿ — Search an expression, meaning, or region…"
                autoComplete="off"
              />
              <button type="submit" className="search-button">
                ಹುಡುಕಿ <ArrowRight size={17} aria-hidden="true" />
              </button>
            </form>

            {/* Quick domain starts */}
            <div className="quick-starts" aria-label="Quick search categories">
              <span>ಹುಡುಕಿ:</span>
              {DOMAINS.map((dom) => (
                <button
                  key={dom.id}
                  type="button"
                  onClick={() => handleQuickDomain(dom.id)}
                  title={`Explore ${dom.nameEn} (${dom.nameKn})`}
                >
                  {dom.nameKn}
                </button>
              ))}
            </div>

            {/* Browse Regions */}
            <div style={{ marginTop: '1.25rem' }}>
              <Link to="/regions" className="text-link" style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                ಎಲ್ಲ ಪ್ರಾಂತ್ಯಗಳನ್ನು ನೋಡಿ (Browse all 6 regions) <ArrowRight size={15} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </Link>
            </div>

            {/* Stats bar */}
            <div className="hero-stats-bar" aria-label="Archive statistics">
              <div className="hero-stat">
                <span className="hero-stat-num">{totalExpressions}+</span>
                <span className="hero-stat-label">Expressions</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">{REGIONS.length}</span>
                <span className="hero-stat-label">Regions</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">{verifiedCount}</span>
                <span className="hero-stat-label">Verified</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">{dialectSpecific}</span>
                <span className="hero-stat-label">Dialect-only</span>
              </div>
            </div>
          </div>

          <div className="hero-aside" aria-label="Project note">
            <div className="hero-note-card">
              <div className="note-stamp">01</div>
              <p>
                ಕನ್ನಡ ಒಂದೇ,<br />
                <strong>ಆದರೆ ಬಗೆ ಹಲವು.</strong>
              </p>
              <span className="note-doodle" aria-hidden="true">✳</span>
            </div>
            <div className="hero-script" aria-hidden="true">
              ನಮ್ಮ<br />
              <span>ಕನ್ನಡ</span>
            </div>
          </div>
        </div>
        <a className="scroll-cue" href="#wotd-section" aria-label="Scroll to word of the day">
          <span /> Explore the archive
        </a>
      </section>

      {/* ── Word of the Day ── */}
      <div id="wotd-section">
        <WordOfTheDay />
      </div>

      {/* ── Features Grid ── */}
      <section className="features-section" aria-labelledby="features-title">
        <div className="site-container">
          <div className="section-heading centered-heading">
            <div className="eyebrow">
              <span className="eyebrow-rule" /> What you can do
            </div>
            <h2 id="features-title">
              Everything to explore<br />
              <em>Karnataka's living language</em>
            </h2>
          </div>
          <div className="features-grid">
            {[
              { icon: '🔍', bg: 'rgba(198,40,40,0.08)', title: 'Search Expressions', desc: 'Find any Kannada word, phrase, or meaning across all six regional zones. Filter by domain — food, greetings, home & more.' },
              { icon: '🗺️', bg: 'rgba(198,40,40,0.08)', title: 'Explore by Region', desc: 'Dive into North Karnataka\'s crisp cadence, Coastal\'s melodic voice, Kodagu\'s highland warmth, or Mysuru\'s royal dialect.' },
              { icon: '✍️', bg: 'rgba(244,196,48,0.12)', title: 'Contribute Words', desc: 'Add regional expressions you know. Share authentic usage examples and help preserve Karnataka\'s linguistic heritage.' },
              { icon: '📖', bg: 'rgba(198,40,40,0.08)', title: 'Dialect Comparisons', desc: 'See how the same concept — like "home", "come", or "no" — shifts dramatically across Karnataka\'s dialects.' },
              { icon: '🎯', bg: 'rgba(244,196,48,0.12)', title: 'Dialect Quiz', desc: 'Test your knowledge with our interactive quiz. Guess the meaning of authentic regional words and track your score.' },
              { icon: '🔊', bg: 'rgba(198,40,40,0.08)', title: 'Native Pronunciations', desc: 'Listen to authentic regional recordings verified by native speakers — when audio is available and consented.' },
            ].map((f) => (
              <article key={f.title} className="feature-card">
                <div className="feature-icon" style={{ background: f.bg }}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Regional Explorer Section ── */}
      <section className="explore-section site-container" id="explore-zones" aria-labelledby="explore-title">
        <div className="section-heading split-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-rule" /> ಒಂದು ಸ್ಥಳದಿಂದ ಶುರು ಮಾಡಿ
            </div>
            <h2 id="explore-title">
              Where does your Kannada<br />
              <em>feel like home?</em>
            </h2>
          </div>
          <p>
            Choose a broad zone to browse what the project documents across Karnataka.
            These are illustrative navigation zones — not definitive dialect borders.
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

      {/* ── Cross-Dialect Showcase Section ── */}
      <section className="cross-dialect-home-section site-container" style={{ margin: '48px auto' }}>
        <div className="cross-home-card" style={{
          background: 'linear-gradient(135deg, #2b1f13 0%, #171109 100%)',
          borderRadius: '20px',
          padding: '36px 42px',
          color: '#fff9ed',
          boxShadow: '0 14px 36px rgba(0, 0, 0, 0.22)',
          border: '1px solid rgba(244, 196, 48, 0.25)'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(244, 196, 48, 0.18)',
            border: '1px solid rgba(244, 196, 48, 0.4)',
            color: '#f4c430',
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '4px 12px',
            borderRadius: '999px',
            marginBottom: '16px'
          }}>
            <Sparkles size={14} /> ಹೊಸ ವೈಶಿಷ್ಟ್ಯ · Cross-Dialect Comparator
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ fontSize: '1.9rem', fontWeight: '800', color: '#ffffff', lineHeight: '1.3', marginBottom: '12px' }}>
                ಒಂದೇ ಅರ್ಥ — ಆರು ಪ್ರಾದೇಶಿಕ ನುಡಿಗಟ್ಟುಗಳು
              </h2>
              <p style={{ color: 'rgba(255, 249, 237, 0.85)', fontSize: '0.98rem', lineHeight: '1.65', marginBottom: '22px' }}>
                "ಹೇಗಿದ್ದೀರಾ?" ಎನ್ನಲು ಧಾರವಾಡದಲ್ಲಿ <em>ಆರಾಮದೀರಾ</em>, ಮಂಗಳೂರಿನಲ್ಲಿ <em>ಎಂಚ ಉಲ್ಲರ್</em>, ಮೈಸೂರಿನಲ್ಲಿ <em>ಕುಶಲವೇ ಸ್ವಾಮಿ</em>, ಕೊಡಗಿನಲ್ಲಿ <em>ಎನ್ನನೆ ಇದ್ದೀರ</em>. ಒಂದೇ ಕಲ್ಪನೆ ನಾಡಿನಾದ್ಯಂತ ಹೇಗೆ ರೂಪಾಂತರಗೊಳ್ಳುತ್ತದೆ ಎಂಬುದನ್ನು ಪರಿಶೀಲಿಸಿ.
              </p>
              <Link to="/compare" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.95rem' }}>
                ಉಪಭಾಷಾ ಹೋಲಿಕೆದಾರ ಆರಂಭಿಸಿ (Compare Words) <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '12px'
            }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: '#ff8a80', fontWeight: '700' }}>North Karnataka</span>
                <strong style={{ fontSize: '1.15rem', color: '#ffffff', display: 'block', marginTop: '4px' }}>ಬ್ಯಾಡ್ರಿ / ಆರಾಮದೀರಾ</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: '#ffd54f', fontWeight: '700' }}>Coastal Karnataka</span>
                <strong style={{ fontSize: '1.15rem', color: '#ffffff', display: 'block', marginTop: '4px' }}>ಮಾರ್ರೆ / ಎಂಚ ಉಲ್ಲರ್</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: '#81d4fa', fontWeight: '700' }}>Mysuru Region</span>
                <strong style={{ fontSize: '1.15rem', color: '#ffffff', display: 'block', marginTop: '4px' }}>ಕಣ್ರೀ / ಬಾ ಗುರು</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: '#ce93d8', fontWeight: '700' }}>Kodagu</span>
                <strong style={{ fontSize: '1.15rem', color: '#ffffff', display: 'block', marginTop: '4px' }}>ಠಕ್ ಠಕ್ / ಬೋಂಡ</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dialect Quiz Section ── */}
      <DialectQuiz />

      {/* ── Interactive Dialect Soundboard Section ── */}
      <DialectSoundboard />

      {/* ── Method / How It Works Section ── */}
      <section className="method-section" id="method" aria-labelledby="method-title">
        <div className="site-container">
          <div className="section-heading centered-heading">
            <div className="eyebrow">
              <span className="eyebrow-rule" /> ಹೇಗೆ ಬಳಸುವುದು
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
              <h3>ಪದ ಹುಡುಕಿ · Search an expression</h3>
              <p>Start with a word, phrase, feeling, or everyday moment. Search by Kannada script, transliteration, or English meaning.</p>
            </article>

            <article className="method-card method-card-featured">
              <span className="method-number">02</span>
              <div className="method-icon">
                <Compass size={22} />
              </div>
              <h3>ಪ್ರಾಂತ್ಯ ಹೋಲಿಸಿ · Compare regional use</h3>
              <p>See how the same idea shifts across our six broad zones — from ಬ್ಯಾಡ್ರಿ (North) to ಬ್ಯಾಡ (Standard) to ಇಲ್ಲ.</p>
            </article>

            <article className="method-card">
              <span className="method-number">03</span>
              <div className="method-icon">
                <Headphones size={22} />
              </div>
              <h3>ಕಿವಿಗೊಡಿ · Listen with care</h3>
              <p>When recordings are verified and consented, hear pronunciation in the authentic voices of regional speakers.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── Featured Expression Section ── */}
      <section className="featured-section site-container" aria-labelledby="featured-title">
        <div className="featured-intro">
          <div className="eyebrow">
            <span className="eyebrow-rule" /> ಆರ್ಕೈವ್ ಮಾದರಿ
          </div>
          <h2 id="featured-title">
            Every entry should<br />
            <em>show its working.</em>
          </h2>
          <p>
            Language is lived, local, and layered. We're building the explorer so context and source status stay visible — not tucked away in fine print.
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
              <span className="eyebrow-rule" /> ನಿಮ್ಮ ಕೊಡುಗೆ
            </div>
            <h2 id="contribute-cta-title">
              Know a word that belongs<br />
              <em>in the conversation?</em>
            </h2>
            <p>
              Namma Kannada is shaped with speakers, researchers, and careful source-checking.
              Share a regional word or expression from your corner of Karnataka — ಧಾರವಾಡ ಇರಲಿ, ಮಂಗಳೂರು ಇರಲಿ, ಮೈಸೂರು ಇರಲಿ.
            </p>
          </div>
          <button
            type="button"
            className="outline-light-button"
            onClick={() => navigate('/contribute')}
          >
            ಕೊಡುಗೆ ನೀಡಿ · Contribute now <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
