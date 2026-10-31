import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Compass, BookOpen, Volume2, ArrowRight, Check, Shuffle, Sparkles } from 'lucide-react';
import { REGIONS, CROSS_DIALECT_COMPARISONS } from '../data/mockData';
import './CompareDialects.css';

export default function CompareDialects() {
  const [selectedConceptId, setSelectedConceptId] = useState(CROSS_DIALECT_COMPARISONS[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter comparisons based on search query
  const filteredConcepts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return CROSS_DIALECT_COMPARISONS;

    return CROSS_DIALECT_COMPARISONS.filter((item) => {
      const matchConcept = item.concept.toLowerCase().includes(q);
      const matchConceptKn = item.conceptKn.toLowerCase().includes(q);
      const matchStd = item.standard.toLowerCase().includes(q);
      const matchDialect = Object.values(item.dialects).some((d) => 
        d.term.toLowerCase().includes(q) || d.transliteration.toLowerCase().includes(q)
      );
      return matchConcept || matchConceptKn || matchStd || matchDialect;
    });
  }, [searchQuery]);

  // Current selected concept data
  const currentItem = useMemo(() => {
    return (
      CROSS_DIALECT_COMPARISONS.find((c) => c.id === selectedConceptId) ||
      filteredConcepts[0] ||
      CROSS_DIALECT_COMPARISONS[0]
    );
  }, [selectedConceptId, filteredConcepts]);

  // Pick random concept
  const handleRandom = () => {
    const rand = CROSS_DIALECT_COMPARISONS[Math.floor(Math.random() * CROSS_DIALECT_COMPARISONS.length)];
    setSelectedConceptId(rand.id);
  };

  // Text to speech helper for Kannada
  const speakWord = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'kn-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="compare-page">
      <div className="site-container">
        {/* Header */}
        <div className="compare-header">
          <div className="eyebrow">
            <span className="eyebrow-rule" />
            ಉಪಭಾಷಾ ಹೋಲಿಕೆದಾರ · Cross-Dialect Meaning Comparator
          </div>
          <h1 className="compare-title">
            ಒಂದೇ ಅರ್ಥ — ಆರು ಪ್ರಾದೇಶಿಕ ರೂಪಗಳು
          </h1>
          <p className="compare-subtitle">
            Discover how a single word or concept transforms across Karnataka&apos;s 6 linguistic zones — from Hubballi&apos;s rhythmic cadences to Mangaluru&apos;s coastal melodies and Kodagu&apos;s highland expressions.
          </p>

          <div className="compare-stats-pills">
            <span className="stat-pill">
              <strong>{CROSS_DIALECT_COMPARISONS.length}+</strong> Core concepts mapped
            </span>
            <span className="stat-pill">
              <strong>6</strong> Cultural dialects
            </span>
            <span className="stat-pill highlight">
              <strong>525</strong> Total archive words
            </span>
          </div>
        </div>

        {/* Search & Selector Toolbar */}
        <div className="compare-toolbar">
          <div className="compare-search-wrap">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="compare-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search meaning in Kannada or English (e.g. Why, ಊಟ, How are you, ಮಳೆ, ನೀರು)…"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="button"
            className="random-btn"
            onClick={handleRandom}
            title="Pick a random concept"
          >
            <Shuffle size={16} /> Random concept
          </button>
        </div>

        {/* Quick Concept Pills */}
        <div className="concept-pills-bar">
          <span className="pills-label">Quick select:</span>
          <div className="pills-scroll">
            {filteredConcepts.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`concept-pill ${currentItem?.id === c.id ? 'active' : ''}`}
                onClick={() => setSelectedConceptId(c.id)}
              >
                <span className="concept-pill-kn">{c.conceptKn}</span>
                <span className="concept-pill-en">({c.concept})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Comparison Spotlight Hero */}
        {currentItem && (
          <section className="spotlight-card">
            <div className="spotlight-top">
              <div className="spotlight-concept-info">
                <span className="spotlight-badge">Selected Concept</span>
                <h2 className="spotlight-concept-kn kannada-text">{currentItem.conceptKn}</h2>
                <div className="spotlight-concept-en">{currentItem.concept}</div>
              </div>

              <div className="spotlight-standard-box">
                <span className="standard-label">Standard Kannada / ಪ್ರಮಾಣ ಕನ್ನಡ:</span>
                <div className="standard-term kannada-text">{currentItem.standard}</div>
                <button
                  type="button"
                  className="audio-speak-btn"
                  onClick={() => speakWord(currentItem.standard.split('(')[0])}
                  title="Pronounce"
                >
                  <Volume2 size={15} /> Listen
                </button>
              </div>
            </div>

            {/* 6 Dialects Grid */}
            <div className="dialects-grid">
              {REGIONS.map((reg) => {
                const dialectData = currentItem.dialects[reg.id] || {
                  term: '—',
                  transliteration: '—',
                  note: 'Regional variation in review',
                };

                return (
                  <div
                    key={reg.id}
                    className="dialect-box"
                    style={{ borderTopColor: reg.accentColor }}
                  >
                    <div className="dialect-box-head">
                      <div>
                        <span className="dialect-reg-name">{reg.nameKn}</span>
                        <div className="dialect-reg-en">{reg.nameEn}</div>
                      </div>
                      <span
                        className="dialect-badge-dot"
                        style={{ backgroundColor: reg.accentColor }}
                        title={reg.nameEn}
                      />
                    </div>

                    <div className="dialect-box-body">
                      <div className="dialect-term kannada-text">{dialectData.term}</div>
                      <div className="dialect-trans">{dialectData.transliteration}</div>
                      {dialectData.note && (
                        <p className="dialect-note">{dialectData.note}</p>
                      )}
                    </div>

                    <div className="dialect-box-foot">
                      <button
                        type="button"
                        className="dialect-listen-btn"
                        onClick={() => speakWord(dialectData.term.split('/')[0])}
                      >
                        <Volume2 size={13} /> Speak
                      </button>
                      <Link
                        to={`/explore?region=${reg.id}&q=${encodeURIComponent(currentItem.conceptKn.split('/')[0].trim())}`}
                        className="dialect-explore-link"
                      >
                        Find in {reg.short} →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Master Comparison Matrix Table */}
        <section className="matrix-section">
          <div className="matrix-head">
            <div>
              <h2 className="matrix-title">ಸರ್ವ ಉಪಭಾಷಾ ಸಮಷ್ಟಿ ಕೋಷ್ಟಕ (Full Comparison Matrix)</h2>
              <p className="matrix-desc">
                Direct comparative overview of everyday core words across all 6 regions:
              </p>
            </div>
            <Link to="/explore" className="matrix-explore-all">
              Browse 525+ expressions <ArrowRight size={15} />
            </Link>
          </div>

          <div className="matrix-table-wrap">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th>Concept / ಅರ್ಥ</th>
                  <th>Standard (ಪ್ರಮಾಣ)</th>
                  <th style={{ color: '#c62828' }}>North (ಉತ್ತರ)</th>
                  <th style={{ color: '#b9832f' }}>Coastal (ಕರಾವಳಿ)</th>
                  <th style={{ color: '#426d87' }}>Mysuru (ಮೈಸೂರು)</th>
                  <th style={{ color: '#c08a27' }}>Central (ಮಧ್ಯ)</th>
                  <th style={{ color: '#587c72' }}>Eastern (ಪೂರ್ವ)</th>
                  <th style={{ color: '#7a5b7e' }}>Kodagu (ಕೊಡಗು)</th>
                </tr>
              </thead>
              <tbody>
                {filteredConcepts.map((item) => (
                  <tr
                    key={item.id}
                    className={currentItem?.id === item.id ? 'highlight-row' : ''}
                    onClick={() => setSelectedConceptId(item.id)}
                  >
                    <td className="concept-cell">
                      <strong>{item.conceptKn}</strong>
                      <small>{item.concept}</small>
                    </td>
                    <td className="standard-cell kannada-text">{item.standard}</td>
                    <td className="dialect-cell kannada-text">{item.dialects.north?.term || '—'}</td>
                    <td className="dialect-cell kannada-text">{item.dialects.coastal?.term || '—'}</td>
                    <td className="dialect-cell kannada-text">{item.dialects.mysuru?.term || '—'}</td>
                    <td className="dialect-cell kannada-text">{item.dialects.central?.term || '—'}</td>
                    <td className="dialect-cell kannada-text">{item.dialects.eastern?.term || '—'}</td>
                    <td className="dialect-cell kannada-text">{item.dialects.kodagu?.term || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Callout banner to Explore 525+ words */}
        <div className="compare-cta-banner">
          <div className="banner-text">
            <h3>ಇನ್ನೂ ಹೆಚ್ಚು ಪ್ರಾದೇಶಿಕ ಪದಗಳನ್ನು ಅನ್ವೇಷಿಸಿ</h3>
            <p>Our archive now hosts <strong>525+ verified authentic regional Kannada entries</strong> across everyday greetings, food, farming, family and colloquial idioms.</p>
          </div>
          <Link to="/explore" className="btn btn-primary banner-btn">
            Explore 525+ Words Archive <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
