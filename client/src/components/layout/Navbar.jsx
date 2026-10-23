import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import logoImg from '../../assets/namma_kannada_map_letter_a.png';
import './Navbar.css';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        {/* Brand / Logo → Home */}
        <Link to="/" className="brand-lockup" onClick={closeMenu} aria-label="Namma Kannada — Home">
          <span className="brand-mark brand-mark-img" aria-hidden="true">
            <img src={logoImg} alt="Namma Kannada Logo" className="brand-logo-img" />
          </span>
          <span className="brand-wordmark">
            <strong>Namma Kannada</strong>
            <small>ನಮ್ಮ ಕನ್ನಡ · our Kannada</small>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}
          >
            Explore
          </NavLink>
          <NavLink
            to="/regions"
            className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}
          >
            Regions
          </NavLink>
          <NavLink
            to="/contribute"
            className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}
          >
            Contribute
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}
          >
            About
          </NavLink>
        </nav>

        {/* Desktop Header Actions */}
        <div className="header-actions">
          <Link to="/contribute" className="header-link">
            Contribute <ArrowRight size={15} aria-hidden="true" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="menu-button"
            onClick={toggleMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`mobile-nav-drawer ${isMobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="site-container mobile-drawer-inner">
          <nav className="mobile-links" aria-label="Mobile Navigation">
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'is-active' : ''}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/explore"
              onClick={closeMenu}
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'is-active' : ''}`}
            >
              Explore
            </NavLink>
            <NavLink
              to="/regions"
              onClick={closeMenu}
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'is-active' : ''}`}
            >
              Regions
            </NavLink>
            <NavLink
              to="/contribute"
              onClick={closeMenu}
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'is-active' : ''}`}
            >
              Contribute
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'is-active' : ''}`}
            >
              About
            </NavLink>
          </nav>
          <div className="mobile-drawer-cta">
            <Link to="/contribute" onClick={closeMenu} className="mobile-cta-btn">
              Contribute an Expression <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
