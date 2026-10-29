import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    region: '',
    agreeTerms: false,
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match.';
    if (!form.agreeTerms) errs.agreeTerms = 'Please agree to the terms to continue.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    const stored = localStorage.getItem('nk_users');
    const users = stored ? JSON.parse(stored) : [];
    if (users.find((u) => u.email === form.email)) {
      setErrors({ email: 'This email is already registered. Please log in.' });
      setLoading(false);
      return;
    }

    const newUser = { name: form.name, email: form.email, password: form.password, region: form.region };
    users.push(newUser);
    localStorage.setItem('nk_users', JSON.stringify(users));
    login({ name: form.name, email: form.email });
    navigate('/');
    setLoading(false);
  };

  const REGIONS = ['North Karnataka', 'Coastal Karnataka', 'Central Karnataka', 'Eastern Karnataka', 'Mysuru Region', 'Kodagu', 'Other'];

  return (
    <div className="auth-page">
      <div className="auth-bg-overlay" />
      <div className="auth-card-wrap auth-card-wrap--signup">
        {/* Right side decorative panel */}
        <div className="auth-deco-panel auth-deco-panel--left">
          <div className="auth-deco-content">
            <div className="auth-deco-script">ನಮ್ಮ<br />ಕನ್ನಡ</div>
            <h2>Join the<br /><em>Living Archive</em></h2>
            <p>Be part of a community preserving Karnataka's rich linguistic heritage for generations to come.</p>
            <ul className="auth-deco-perks">
              <li><CheckCircle size={15} /> Explore 40+ dialect expressions</li>
              <li><CheckCircle size={15} /> Contribute regional words</li>
              <li><CheckCircle size={15} /> Track learning progress</li>
              <li><CheckCircle size={15} /> Connect with linguists</li>
            </ul>
          </div>
        </div>

        <div className="auth-card">
          {/* Logo */}
          <div className="auth-logo">
            <span className="auth-logo-mark">ಕ</span>
            <div>
              <strong>Namma Kannada</strong>
              <small>ನಮ್ಮ ಕನ್ನಡ · Our Language</small>
            </div>
          </div>

          <h1 className="auth-title">ಸೇರಿ ಬನ್ನಿ — Join Us</h1>
          <p className="auth-sub">Create your account and start exploring dialects</p>

          <form onSubmit={handleSubmit} noValidate className="auth-form">
            <div className={`auth-field ${errors.name ? 'has-error' : ''}`}>
              <label htmlFor="signup-name">
                <User size={15} /> Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                autoComplete="name"
              />
              {errors.name && <span className="auth-field-error">{errors.name}</span>}
            </div>

            <div className={`auth-field ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="signup-email">
                <Mail size={15} /> Email Address
              </label>
              <input
                id="signup-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email && <span className="auth-field-error">{errors.email}</span>}
            </div>

            <div className="auth-fields-row">
              <div className={`auth-field ${errors.password ? 'has-error' : ''}`}>
                <label htmlFor="signup-password">
                  <Lock size={15} /> Password
                </label>
                <div className="auth-input-row">
                  <input
                    id="signup-password"
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min 6 characters"
                    autoComplete="new-password"
                  />
                  <button type="button" className="auth-eye-btn" onClick={() => setShowPass((v) => !v)}>
                    {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && <span className="auth-field-error">{errors.password}</span>}
              </div>

              <div className={`auth-field ${errors.confirmPassword ? 'has-error' : ''}`}>
                <label htmlFor="signup-confirm">
                  <Lock size={15} /> Confirm Password
                </label>
                <div className="auth-input-row">
                  <input
                    id="signup-confirm"
                    type={showConfirm ? 'text' : 'password'}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    autoComplete="new-password"
                  />
                  <button type="button" className="auth-eye-btn" onClick={() => setShowConfirm((v) => !v)}>
                    {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="auth-field-error">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="signup-region">
                🗺️ Your Home Region (optional)
              </label>
              <select id="signup-region" name="region" value={form.region} onChange={handleChange}>
                <option value="">Select your Karnataka region…</option>
                {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className={`auth-checkbox-field ${errors.agreeTerms ? 'has-error' : ''}`}>
              <label>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={form.agreeTerms}
                  onChange={handleChange}
                />
                <span>I agree to share language contributions in good faith for the Namma Kannada archive</span>
              </label>
              {errors.agreeTerms && <span className="auth-field-error">{errors.agreeTerms}</span>}
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <span className="auth-spinner" />
              ) : (
                <>ಖಾತೆ ತೆರೆಯಿರಿ · Create Account <ArrowRight size={17} /></>
              )}
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <div className="auth-switch">
            Already have an account?{' '}
            <Link to="/login">Sign in <ArrowRight size={14} /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
