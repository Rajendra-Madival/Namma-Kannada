import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/features/SearchBar';
import ExpressionCard from '../components/features/ExpressionCard';
import { REGIONS, EXPRESSIONS } from '../data/mockData';
import './Home.css';

export default function Home() {
  // A handful of expressions from different regions to illustrate diversity
  const featuredExpressions = EXPRESSIONS.slice(0, 4);

  return (
    <div className="home-page">

      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="container hero-container">
          <h1 className="hero-heading">
            Discover Kannada,<br />
            <span className="hero-heading-accent">the way Karnataka speaks.</span>
          </h1>
          <p className="hero-subtext">
            Explore regional words, meanings, expressions, and pronunciations from across Karnataka.
          </p>

          <div className="hero-search-container">
            <SearchBar placeholder="Search a Kannada word or its meaning…" />
          </div>

          <Link to="/regions" className="hero-secondary-link">
            Browse regions instead →
          </Link>
        </div>
      </section>

      {/* ── Regional variation intro ── */}
      <section className="home-section">
        <div className="container">
          <div className="intro-block">
            <h2 className="intro-heading">One language, many voices</h2>
            <p className="intro-body">
              Kannada is spoken across Karnataka's mountains, coasts, river plains, and cities — each region
              carrying its own rhythm, vocabulary, and character. From the respectful <em className="kannada-text">ಬ್ಯಾಡ್ರಿ</em> of
              Dharwad to the warm <em className="kannada-text">ಮಾರ್ರೆ</em> of Mangalore, regional Kannada
              preserves stories, customs, and community that no textbook fully captures.
            </p>
          </div>

          {/* Region list */}
          <ul className="region-intro-list" role="list">
            {REGIONS.map((region) => (
              <li key={region.id} className="region-intro-item">
                <Link to={`/regions/${region.id}`} className="region-intro-link">
                  <span className="region-intro-name kannada-text">{region.nameKn}</span>
                  <span className="region-intro-en">{region.nameEn}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Featured expressions ── */}
      <section className="home-section home-section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Expressions from the archive</h2>
            <Link to="/explore" className="section-view-all">View all {EXPRESSIONS.length} →</Link>
          </div>

          <p className="section-data-note">
            These are sample fixtures — verified regional expressions awaiting full community review.
          </p>

          <div className="expressions-grid">
            {featuredExpressions.map((expr) => (
              <ExpressionCard key={expr.id} expression={expr} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contribution invite ── */}
      <section className="home-section">
        <div className="container">
          <div className="contribute-invite">
            <div className="contribute-invite-text">
              <h2 className="contribute-invite-heading kannada-text">
                ನಿಮ್ಮ ಊರಿನ ಮಾತನ್ನು ದಾಖಲಿಸಿ
              </h2>
              <p className="contribute-invite-sub">
                Do you speak a regional variety of Kannada at home? Share a word, expression, or phrase with the archive. All contributions are reviewed before publication.
              </p>
            </div>
            <Link to="/contribute" className="btn btn-primary btn-md">
              Contribute a word →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
