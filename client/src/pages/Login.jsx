import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Mail, ArrowRight, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    // Simulate authentication (replace with real API call)
    await new Promise((r) => setTimeout(r, 900));
    const stored = localStorage.getItem('nk_users');
    const users = stored ? JSON.parse(stored) : [];
    const found = users.find((u) => u.email === form.email && u.password === form.password);
    if (!found) {
      setErrors({ general: 'Invalid email or password. Please try again.' });
      setLoading(false);
      return;
    }
    login({ name: found.name, email: found.email });
    navigate('/');
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-overlay" />
      <div className="auth-card-wrap">
        <div className="auth-card">
          {/* Logo */}
          <div className="auth-logo">
            <span className="auth-logo-mark">ಕ</span>
            <div>
              <strong>Namma Kannada</strong>
              <small>ನಮ್ಮ ಕನ್ನಡ · Our Language</small>
            </div>
          </div>

          <h1 className="auth-title">ಸ್ವಾಗತ — Welcome Back</h1>
          <p className="auth-sub">Sign in to explore Karnataka's living dialects</p>

          {errors.general && (
            <div className="auth-error-banner">{errors.general}</div>
          )}

          <form onSubmit={handleSubmit} noValidate className="auth-form">
            <div className={`auth-field ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="login-email">
                <Mail size={15} /> Email Address
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email && <span className="auth-field-error">{errors.email}</span>}
            </div>

            <div className={`auth-field ${errors.password ? 'has-error' : ''}`}>
              <label htmlFor="login-password">
                <Lock size={15} /> Password
              </label>
              <div className="auth-input-row">
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && <span className="auth-field-error">{errors.password}</span>}
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <span className="auth-spinner" />
              ) : (
                <>ಒಳಗೆ ಬನ್ನಿ · Sign In <ArrowRight size={17} /></>
              )}
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <div className="auth-switch">
            New to Namma Kannada?{' '}
            <Link to="/signup">Create an account <ArrowRight size={14} /></Link>
          </div>

          <div className="auth-features-hint">
            <BookOpen size={14} />
            <span>Access 40+ dialect words, contribute expressions &amp; track your learning journey</span>
          </div>
        </div>

        {/* Right side decorative panel */}
        <div className="auth-deco-panel">
          <div className="auth-deco-content">
            <div className="auth-deco-script">ಕರ್ನಾಟಕ</div>
            <h2>Discover Karnataka's<br /><em>Living Languages</em></h2>
            <p>From the coastal rhythms of Karavali to the royal cadence of Mysuru — every dialect tells a story.</p>
            <div className="auth-deco-badges">
              <span>🌊 Coastal</span>
              <span>🏔️ Kodagu</span>
              <span>🏛️ Mysuru</span>
              <span>🌾 North</span>
              <span>🌿 Central</span>
              <span>⚡ Eastern</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
