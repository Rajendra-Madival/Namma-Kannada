import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/namma_kannada_map_letter_a.png';
import './Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="site-container footer-grid">
        {/* Brand & Mission Column */}
        <div className="footer-brand">
          <Link to="/" className="brand-lockup" aria-label="Namma Kannada home">
            <span className="brand-mark brand-mark-img" aria-hidden="true">
              <img src={logoImg} alt="Namma Kannada Logo" className="brand-logo-img" />
            </span>
            <span className="brand-wordmark">
              <strong>Namma Kannada</strong>
              <small>ನಮ್ಮ ಕನ್ನಡ · our Kannada</small>
            </span>
          </Link>
          <p className="footer-description">
            A regional Kannada dialect explorer for noticing, comparing, and preserving the ways people speak across Karnataka.
          </p>
        </div>

        {/* Explore Links */}
        <div className="footer-column">
          <span className="footer-label">Explore</span>
          <Link to="/">Home (ಮುಖಪುಟ)</Link>
          <Link to="/explore">All Expressions</Link>
          <Link to="/regions">Regional Zones</Link>
          <Link to="/regions/north">North Karnataka</Link>
          <Link to="/regions/coastal">Coastal Karnataka</Link>
          <Link to="/regions/central">Central Karnataka</Link>
          <Link to="/regions/mysuru">Mysuru Region</Link>
        </div>

        {/* Project Links */}
        <div className="footer-column">
          <span className="footer-label">Project</span>
          <Link to="/contribute">Contribute a Word</Link>
          <Link to="/about">About Namma Kannada</Link>
          <Link to="/about#verification">Verification Process</Link>
          <Link to="/about#ethics">Ethics &amp; Attribution</Link>
          <Link to="/contact">Contact &amp; Feedback</Link>
        </div>

        {/* Principles */}
        <div className="footer-column">
          <span className="footer-label">Principles</span>
          <span className="footer-principle-item">Verification first</span>
          <span className="footer-principle-item">Context over certainty</span>
          <span className="footer-principle-item">Consent for recordings</span>
          <span className="footer-principle-item">Respect for every speaker</span>
        </div>
      </div>

      <div className="site-container footer-bottom">
        <span>© {CURRENT_YEAR} Namma Kannada</span>
        <span>Zones are provisional product navigation, not scientific dialect boundaries.</span>
        <span>Made for Kannada, with care.</span>
      </div>
    </footer>
  );
}
