import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container footer-container">
        {/* Brand & Purpose Column */}
        <div className="footer-col footer-brand-col">
          <div className="footer-brand">
            <span className="brand-flag-small" aria-hidden="true" />
            <span className="footer-brand-title kannada-text">ನಮ್ಮ ಕನ್ನಡ</span>
          </div>
          <p className="footer-tagline">
            ಒಂದು ಭಾಷೆ. ಹಲವು ಧ್ವನಿಗಳು — One language. Many voices.
          </p>
          <p className="footer-mission">
            A cultural repository documenting regional Kannada vocabulary, dialect variations, pronunciation nuances, and verified native expressions across Karnataka.
          </p>
        </div>

        {/* Navigation Links Column */}
        <div className="footer-col">
          <h4 className="footer-heading">ಅನ್ವೇಷಣೆ (Explore)</h4>
          <ul className="footer-links">
            <li><Link to="/explore">ಎಲ್ಲಾ ಪದಗಳು (All Expressions)</Link></li>
            <li><Link to="/regions">ಪ್ರಾದೇಶಿಕ ಭಾಷಾರೂಪಗಳು (Dialects & Regions)</Link></li>
            <li><Link to="/explore?region=uttara-karnataka">ಉತ್ತರ ಕರ್ನಾಟಕ (Uttara Karnataka)</Link></li>
            <li><Link to="/explore?region=karavali">ಕರಾವಳಿ ಕನ್ನಡ (Coastal Dialect)</Link></li>
            <li><Link to="/explore?region=mysuru-mandya">ಮೈಸೂರು - ಮಂಡ್ಯ (Mysuru & Mandya)</Link></li>
          </ul>
        </div>

        {/* Community & Verification Column */}
        <div className="footer-col">
          <h4 className="footer-heading">ಭಾಗವಹಿಸುವಿಕೆ (Community)</h4>
          <ul className="footer-links">
            <li><Link to="/contribute">ಪದ ಅಥವಾ ನುಡಿಗಟ್ಟು ಸೇರಿಸಿ (Contribute)</Link></li>
            <li><Link to="/about">ಪರಿಶೀಲನಾ ಪ್ರಕ್ರಿಯೆ (Review Workflow)</Link></li>
            <li><Link to="/about#dataset-notes">ಡೇಟಾಸೆಟ್ ವಿವರಣೆ (Data Integrity)</Link></li>
            <li><Link to="/contact">ಸಲಹೆ & ಸಂಪರ್ಕ (Feedback & Contact)</Link></li>
          </ul>
        </div>

        {/* Linguistic Integrity Disclaimer */}
        <div className="footer-col footer-notice-col">
          <h4 className="footer-heading">ಗೌರವ ಮತ್ತು ಪರಿಶೀಲನೆ (Data Notice)</h4>
          <div className="footer-notice-box">
            <p>
              <strong>Development Phase Notice:</strong> Initial linguistic fixtures are marked as sample records. Public contributions undergo verification by native speakers and authorized reviewers before final publication.
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="footer-copy">
            © {new Date().getFullYear()} Namma Kannada. Built with pride for Karnataka's linguistic heritage.
          </p>
          <div className="footer-links-inline">
            <Link to="/about">Ethics & Attribution</Link>
            <span>•</span>
            <Link to="/contact">Report Correction</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
