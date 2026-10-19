import React, { useState } from 'react';
import FormField from '../components/common/FormField';
import Button from '../components/common/Button';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', category: 'general', message: '' });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="contact-page">
      <div className="container">

        <div className="contact-header">
          <h1 className="contact-title">Contact &amp; Feedback</h1>
          <p className="contact-subtitle">
            Have a linguistic correction, collaboration inquiry, or feedback about the archive? We'd like
            to hear from you.
          </p>
          <p className="contact-notice">
            <strong>Note:</strong> This form validates locally. Email delivery is not yet connected —
            a backend integration is planned for a future phase.
          </p>
        </div>

        <div className="contact-form-box">
          {submitted ? (
            <div className="contact-success">
              <div className="success-icon" aria-hidden="true">✓</div>
              <h2 className="success-title kannada-text">ಧನ್ಯವಾದಗಳು!</h2>
              <p>
                Thank you, <strong>{formData.name}</strong>. Your message has been validated.
                Email delivery will be enabled when the backend goes live.
              </p>
              <Button variant="primary" onClick={handleReset}>
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <FormField id="name" label="Full name" required error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </FormField>

              <FormField
                id="email"
                label="Email address"
                required
                error={errors.email}
                hint="Used only to respond to your inquiry."
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </FormField>

              <FormField id="category" label="Feedback type">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="general">General inquiry</option>
                  <option value="correction">Linguistic correction</option>
                  <option value="audio">Volunteer for audio recording</option>
                  <option value="review">Apply as a reviewer</option>
                </select>
              </FormField>

              <FormField
                id="message"
                label="Message"
                required
                error={errors.message}
                hint="Be as specific as possible about the word, region, or issue."
              >
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Your message…"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </FormField>

              <div className="contact-submit-row">
                <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
                  Send message
                </Button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
