import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container footer-container">
        {/* Brand & Purpose */}
        <div className="footer-col footer-brand-col">
          <Link to="/" className="footer-brand">
            <span className="brand-flag-small" aria-hidden="true" />
            <span className="footer-brand-title kannada-text">ನಮ್ಮ ಕನ್ನಡ</span>
          </Link>
          <p className="footer-tagline">
            Explore regional Kannada words, meanings, and pronunciations from across Karnataka.
          </p>
          <p className="footer-notice">
            <strong>Development phase:</strong> Initial records are sample fixtures pending community review. No fabricated audio or linguistic data is published.
          </p>
        </div>

        {/* Explore Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Explore</h4>
          <ul className="footer-links">
            <li><Link to="/explore">All Expressions</Link></li>
            <li><Link to="/regions">Dialect Regions</Link></li>
            <li><Link to="/explore?region=uttara-karnataka">Uttara Karnataka</Link></li>
            <li><Link to="/explore?region=karavali">Karavali (Coastal)</Link></li>
            <li><Link to="/explore?region=mysuru-mandya">Mysuru &amp; Mandya</Link></li>
          </ul>
        </div>

        {/* Project Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Project</h4>
          <ul className="footer-links">
            <li><Link to="/contribute">Contribute a Word</Link></li>
            <li><Link to="/about">About &amp; Data Ethics</Link></li>
            <li><Link to="/contact">Contact &amp; Feedback</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="footer-copy">
            © {new Date().getFullYear()} Namma Kannada. Built for Karnataka's living linguistic heritage.
          </p>
          <div className="footer-links-inline">
            <Link to="/about">Ethics &amp; Attribution</Link>
            <span aria-hidden="true">•</span>
            <Link to="/contact">Report a Correction</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
