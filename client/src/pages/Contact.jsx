import React, { useState } from 'react';
import FormField from '../components/common/FormField';
import Button from '../components/common/Button';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    dialectRegion: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

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

    if (!formData.name.trim()) {
      newErrors.name = 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ (Name is required).';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'ದಯವಿಟ್ಟು ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ (Email is required).';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ (Please enter a valid email).';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ನಮೂದಿಸಿ (Message is required).';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate backend delivery / log integration point
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      category: 'general',
      dialectRegion: '',
      message: ''
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        <div className="contact-header">
          <span className="section-eyebrow">ಸಂಪರ್ಕ & ಸಲಹೆಗಳು</span>
          <h1 className="contact-title">ಸಂಪರ್ಕಿಸಿ (Contact & Feedback)</h1>
          <p className="contact-subtitle">
            Have a linguistic suggestion, dialect correction, or collaboration inquiry? Reach out to the Namma Kannada initiative.
          </p>
        </div>

        <div className="contact-layout">
          {/* Form Box */}
          <div className="contact-form-box">
            {submitted ? (
              <div className="contact-success-state">
                <div className="contact-success-icon" aria-hidden="true">✓</div>
                <h3 className="success-headline kannada-text">ಧನ್ಯವಾದಗಳು! ಸಂದೇಶ ದಾಖಲಾಗಿದೆ</h3>
                <p className="success-text">
                  Thank you, <strong>{formData.name}</strong>. Your feedback has been validated and recorded.
                </p>
                <div className="backend-integration-note">
                  <strong>Technical Architecture Note:</strong> In this frontend prototype, submissions are validated locally. When the Express.js backend is active in Stage 4, this form connects to <code>POST /api/feedback</code>.
                </div>
                <Button variant="primary" onClick={handleReset}>
                  ಮತ್ತೊಂದು ಸಂದೇಶ ಕಳುಹಿಸಿ (Send Another Message)
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <FormField
                  id="name"
                  label="ನಿಮ್ಮ ಹೆಸರು (Full Name)"
                  required={true}
                  error={errors.name}
                >
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormField>

                <FormField
                  id="email"
                  label="ಇಮೇಲ್ ವಿಳಾಸ (Email Address)"
                  required={true}
                  error={errors.email}
                  hint="We will only use this to respond to your specific inquiry."
                >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormField>

                <div className="contact-row-2">
                  <FormField
                    id="category"
                    label="ವಿಷಯ (Feedback Category)"
                  >
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="general">ಸಾಮಾನ್ಯ ವಿಚಾರಣೆ (General Inquiry)</option>
                      <option value="correction">ಪದ ತಿದ್ದುಪಡಿ (Linguistic Correction)</option>
                      <option value="audio">ಧ್ವನಿ ಕೊಡುಗೆ (Audio Recording Volunteer)</option>
                      <option value="review">ಪರಿಶೀಲಕರಾಗಲು (Reviewer Application)</option>
                    </select>
                  </FormField>

                  <FormField
                    id="dialectRegion"
                    label="ಸಂಬಂಧಿತ ಪ್ರದೇಶ (Dialect Region if applicable)"
                  >
                    <input
                      id="dialectRegion"
                      name="dialectRegion"
                      type="text"
                      placeholder="e.g. Dharwad, Mangalore, Mandya"
                      value={formData.dialectRegion}
                      onChange={handleChange}
                    />
                  </FormField>
                </div>

                <FormField
                  id="message"
                  label="ನಿಮ್ಮ ಸಂದೇಶ (Your Message)"
                  required={true}
                  error={errors.message}
                  hint="Provide clear details regarding words, regions, or suggestions."
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </FormField>

                <div className="contact-submit-row">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                  >
                    ಸಂದೇಶ ಕಳುಹಿಸಿ (Submit Message) →
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar Info */}
          <aside className="contact-sidebar">
            <div className="contact-info-card">
              <h3 className="info-title">ಮುಕ್ತ ಸಹಯೋಗ (Open Collaboration)</h3>
              <p className="info-desc">
                Namma Kannada is designed to bridge academic linguistics and grassroots speaker communities.
              </p>
              
              <div className="info-points">
                <div className="info-point">
                  <span className="info-point-icon">📚</span>
                  <div>
                    <strong>Linguistic Authenticity</strong>
                    <p>We welcome native speakers and researchers who can review entries from their regions.</p>
                  </div>
                </div>

                <div className="info-point">
                  <span className="info-point-icon">🎙️</span>
                  <div>
                    <strong>Audio Verification</strong>
                    <p>Want to lend your voice for regional pronunciations? Let us know in the message category.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-info-card privacy-card">
              <h4 className="privacy-title">ಗೌಪ್ಯತೆ ಮತ್ತು ಗೌರವ (Privacy & Ethics)</h4>
              <p className="privacy-text">
                We never sell or share contributor emails. Attributions are credited according to your explicit preferences on the contribution page.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
