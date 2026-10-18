import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '../common/Button';
import './Navbar.css';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-container">
        {/* Brand / Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="brand-flag" aria-hidden="true">
            <span className="flag-yellow" />
            <span className="flag-red" />
          </div>
          <div className="brand-text">
            <span className="brand-kannada kannada-text">ನಮ್ಮ ಕನ್ನಡ</span>
            <span className="brand-english">Namma Kannada</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            end
          >
            ಮುಖಪುಟ (Home)
          </NavLink>
          <NavLink 
            to="/explore" 
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            ಅನ್ವೇಷಿಸಿ (Explore)
          </NavLink>
          <NavLink 
            to="/regions" 
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            ಪ್ರದೇಶಗಳು (Regions)
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            ನಮ್ಮ ಬಗ್ಗೆ (About)
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            ಸಂಪರ್ಕ (Contact)
          </NavLink>
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="navbar-actions">
          <Link to="/contribute" className="navbar-cta-desktop">
            <Button variant="primary" size="sm">
              + ಪದ ಸೇರಿಸಿ (Contribute)
            </Button>
          </Link>

          <button 
            type="button" 
            className="mobile-toggle-btn"
            onClick={toggleMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-links" aria-label="Mobile Navigation">
          <NavLink to="/" onClick={closeMenu} className="mobile-link" end>
            ಮುಖಪುಟ (Home)
          </NavLink>
          <NavLink to="/explore" onClick={closeMenu} className="mobile-link">
            ಅನ್ವೇಷಿಸಿ (Explore)
          </NavLink>
          <NavLink to="/regions" onClick={closeMenu} className="mobile-link">
            ಪ್ರದೇಶಗಳು (Regions)
          </NavLink>
          <NavLink to="/contribute" onClick={closeMenu} className="mobile-link">
            + ಪದ ಸೇರಿಸಿ (Contribute)
          </NavLink>
          <NavLink to="/about" onClick={closeMenu} className="mobile-link">
            ನಮ್ಮ ಬಗ್ಗೆ (About)
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu} className="mobile-link">
            ಸಂಪರ್ಕ (Contact)
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
