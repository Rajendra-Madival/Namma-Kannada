import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, X, LogIn, UserCircle, LogOut, ChevronDown } from 'lucide-react';
import logoImg from '../../assets/namma_kannada_map_letter_a.png';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

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
          <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/explore" className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
            Explore
          </NavLink>
          <NavLink to="/compare" className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
            Compare
          </NavLink>
          <NavLink to="/translator" className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
            Translator
          </NavLink>
          <NavLink to="/regions" className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
            Regions
          </NavLink>
          <NavLink to="/contribute" className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
            Contribute
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
            About
          </NavLink>
        </nav>

        {/* Desktop Header Actions */}
        <div className="header-actions">
          {isLoggedIn ? (
            /* User Menu Dropdown */
            <div className="user-menu-wrap" ref={userMenuRef}>
              <button
                type="button"
                className="user-avatar-btn"
                onClick={() => setIsUserMenuOpen((v) => !v)}
                aria-expanded={isUserMenuOpen}
                aria-label="User menu"
              >
                <span className="user-avatar-initials">{getInitials(user?.name)}</span>
                <span className="user-avatar-name">{user?.name?.split(' ')[0]}</span>
                <ChevronDown size={14} className={`user-chevron ${isUserMenuOpen ? 'rotated' : ''}`} />
              </button>
              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <span className="user-dropdown-name">{user?.name}</span>
                    <span className="user-dropdown-email">{user?.email}</span>
                  </div>
                  <div className="user-dropdown-divider" />
                  <Link
                    to="/contribute"
                    className="user-dropdown-item"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    ✍️ Contribute a Word
                  </Link>
                  <button
                    type="button"
                    className="user-dropdown-item user-dropdown-logout"
                    onClick={handleLogout}
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Login / Signup buttons */
            <div className="auth-nav-btns">
              <Link to="/login" className="nav-login-btn">
                <LogIn size={15} /> Sign In
              </Link>
              <Link to="/signup" className="nav-signup-btn">
                Join Free <ArrowRight size={14} />
              </Link>
            </div>
          )}

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
          {isLoggedIn && (
            <div className="mobile-user-bar">
              <span className="user-avatar-initials">{getInitials(user?.name)}</span>
              <div>
                <strong>{user?.name}</strong>
                <small>{user?.email}</small>
              </div>
            </div>
          )}
          <nav className="mobile-links" aria-label="Mobile Navigation">
            <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => `mobile-nav-item ${isActive ? 'is-active' : ''}`}>Home</NavLink>
            <NavLink to="/explore" onClick={closeMenu} className={({ isActive }) => `mobile-nav-item ${isActive ? 'is-active' : ''}`}>Explore (525+ Words)</NavLink>
            <NavLink to="/compare" onClick={closeMenu} className={({ isActive }) => `mobile-nav-item ${isActive ? 'is-active' : ''}`}>Compare Dialects</NavLink>
            <NavLink to="/translator" onClick={closeMenu} className={({ isActive }) => `mobile-nav-item ${isActive ? 'is-active' : ''}`}>Dialect Translator</NavLink>
            <NavLink to="/regions" onClick={closeMenu} className={({ isActive }) => `mobile-nav-item ${isActive ? 'is-active' : ''}`}>Regions</NavLink>
            <NavLink to="/contribute" onClick={closeMenu} className={({ isActive }) => `mobile-nav-item ${isActive ? 'is-active' : ''}`}>Contribute</NavLink>
            <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => `mobile-nav-item ${isActive ? 'is-active' : ''}`}>About</NavLink>
          </nav>
          <div className="mobile-drawer-cta">
            {isLoggedIn ? (
              <button type="button" className="mobile-logout-btn" onClick={() => { handleLogout(); closeMenu(); }}>
                <LogOut size={16} /> Sign Out
              </button>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="mobile-login-btn">
                  <LogIn size={16} /> Sign In
                </Link>
                <Link to="/signup" onClick={closeMenu} className="mobile-cta-btn">
                  Join Namma Kannada <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
