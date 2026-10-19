import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-container">
        {/* Brand / Logo → Home */}
        <Link to="/" className="navbar-brand" onClick={closeMenu} aria-label="Namma Kannada — Home">
          <div className="brand-flag" aria-hidden="true">
            <span className="flag-yellow" />
            <span className="flag-red" />
          </div>
          <div className="brand-text">
            <span className="brand-kannada kannada-text">ನಮ್ಮ ಕನ್ನಡ</span>
            <span className="brand-english">Namma Kannada</span>
          </div>
        </Link>

        {/* Desktop Navigation — 4 primary links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          <NavLink
            to="/explore"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            Explore
          </NavLink>
          <NavLink
            to="/regions"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            Regions
          </NavLink>
          <NavLink
            to="/contribute"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            Contribute
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            About
          </NavLink>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="navbar-actions">
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={toggleMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="mobile-links" aria-label="Mobile Navigation">
          <NavLink to="/explore" onClick={closeMenu} className="mobile-link">
            Explore
          </NavLink>
          <NavLink to="/regions" onClick={closeMenu} className="mobile-link">
            Regions
          </NavLink>
          <NavLink to="/contribute" onClick={closeMenu} className="mobile-link">
            Contribute
          </NavLink>
          <NavLink to="/about" onClick={closeMenu} className="mobile-link">
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
