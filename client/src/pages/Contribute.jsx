import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import FormField from '../components/common/FormField';
import Button from '../components/common/Button';
import { REGIONS } from '../data/mockData';
import './Contribute.css';

const UNKNOWN_REGION_VALUE = '__unknown__';

export default function Contribute() {
  const [searchParams] = useSearchParams();
  const preselectedRegion = searchParams.get('region') || '';

  const [formData, setFormData] = useState({
    kannada: '',
    transliteration: '',
    meaning: '',
    regionId: preselectedRegion,
    usageExampleKn: '',
    usageExampleEn: '',
    contributorName: '',
    contributorConsent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEntry, setSubmittedEntry] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.kannada.trim()) {
      newErrors.kannada = 'Kannada word or expression is required.';
    }
    if (!formData.meaning.trim()) {
      newErrors.meaning = 'Meaning and usage is required.';
    }
    if (!formData.regionId) {
      newErrors.regionId = 'Please select a region. Choose "Unknown / Other" if unsure.';
    }
    if (!formData.contributorConsent) {
      newErrors.contributorConsent =
        'Please confirm this is authentic regional usage before submitting.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call — no backend yet; marks clearly as pending
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedEntry({
        ...formData,
        id: `pending-${Date.now()}`,
        status: 'PENDING_REVIEW',
        submittedAt: new Date().toISOString(),
      });
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      kannada: '',
      transliteration: '',
      meaning: '',
      regionId: '',
      usageExampleKn: '',
      usageExampleEn: '',
      contributorName: '',
      contributorConsent: false,
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmittedEntry(null);
  };

  // ── Success state ──
  if (isSubmitted && submittedEntry) {
    const selectedRegionObj = REGIONS.find((r) => r.id === submittedEntry.regionId);

    return (
      <div className="contribute-page">
        <div className="container">
          <div className="submission-success-card">
            <div className="success-icon" aria-hidden="true">✓</div>
            <h1 className="success-title kannada-text">ಧನ್ಯವಾದಗಳು!</h1>
            <p className="success-desc">
              Your contribution for{' '}
              <strong className="kannada-text">"{submittedEntry.kannada}"</strong>{' '}
              {selectedRegionObj ? `(${selectedRegionObj.nameEn})` : ''} has been received.
            </p>

            <div className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              <strong>Pending review</strong>
            </div>

            <div className="review-notice">
              <p>
                Contributions do not appear in public search until reviewed and confirmed by authorized
                native reviewers. This frontend prototype records submissions locally — backend
                integration is planned for a future phase.
              </p>
            </div>

            <div className="success-actions">
              <Button variant="primary" onClick={handleReset}>
                Contribute another word
              </Button>
              <Link to="/explore">
                <Button variant="outline">Back to Explore</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ──
  return (
    <div className="contribute-page">
      <div className="container">

        <div className="contribute-header">
          <h1 className="contribute-title">Contribute a word</h1>
          <p className="contribute-subtitle">
            Share a regional Kannada word, expression, or phrase from your hometown. All contributions
            are reviewed before publication.
          </p>
          <p className="backend-notice">
            <strong>Note:</strong> This form is live on the frontend but backend storage is not yet
            implemented. Your submission will be acknowledged locally and not persisted until the
            backend goes live.
          </p>
        </div>

        <div className="contribute-form-container">
          <form className="contribute-form" onSubmit={handleSubmit} noValidate>

            {/* Kannada expression */}
            <FormField
              id="kannada"
              label="Kannada word or expression"
              required
              error={errors.kannada}
              hint="Type in Kannada script — e.g. ಬ್ಯಾಡ್ರಿ, ಮಾರ್ರೆ, ಅತ್ತಿತ್ತ"
            >
              <input
                id="kannada"
                name="kannada"
                type="text"
                className="kannada-text"
                placeholder="e.g. ಬ್ಯಾಡ್ರಿ"
                value={formData.kannada}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </FormField>

            {/* Transliteration */}
            <FormField
              id="transliteration"
              label="Transliteration (optional)"
              hint="Phonetic romanization — e.g. Byādri, Mārre"
            >
              <input
                id="transliteration"
                name="transliteration"
                type="text"
                placeholder="e.g. Byādri"
                value={formData.transliteration}
                onChange={handleChange}
                autoComplete="off"
              />
            </FormField>

            {/* Meaning */}
            <FormField
              id="meaning"
              label="Meaning and usage"
              required
              error={errors.meaning}
              hint="Explain what the word means and when it is used — include the tone (e.g. affectionate, polite refusal)."
            >
              <textarea
                id="meaning"
                name="meaning"
                rows={3}
                placeholder="Explain the meaning, context, and tone…"
                value={formData.meaning}
                onChange={handleChange}
                required
              />
            </FormField>

            {/* Region */}
            <FormField
              id="regionId"
              label="Region where this expression is used"
              required
              error={errors.regionId}
              hint="Select the primary region. Choose Unknown / Other if you are unsure."
            >
              <select
                id="regionId"
                name="regionId"
                value={formData.regionId}
                onChange={handleChange}
                required
              >
                <option value="">— Select a region —</option>
                {REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nameKn} ({r.nameEn})
                  </option>
                ))}
                <option value={UNKNOWN_REGION_VALUE}>Unknown / Other</option>
              </select>
            </FormField>

            {/* Usage example — optional */}
            <FormField
              id="usageExampleKn"
              label="Example sentence in Kannada (optional)"
              hint="A short conversational sentence using this expression."
            >
              <input
                id="usageExampleKn"
                name="usageExampleKn"
                type="text"
                className="kannada-text"
                placeholder="e.g. ಇನ್ನೊಂದು ರೊಟ್ಟಿ ತಿನ್ರಿ ಅಂದ್ರೆ, ಬ್ಯಾಡ್ರಿ ಸಾಕು ಅಂದ್ರು."
                value={formData.usageExampleKn}
                onChange={handleChange}
              />
            </FormField>

            <FormField
              id="usageExampleEn"
              label="English translation of the example (optional)"
            >
              <input
                id="usageExampleEn"
                name="usageExampleEn"
                type="text"
                placeholder="e.g. When offered another roti, they politely said no thanks."
                value={formData.usageExampleEn}
                onChange={handleChange}
              />
            </FormField>

            {/* Contributor name — optional */}
            <FormField
              id="contributorName"
              label="Your name or handle (optional)"
              hint="For attribution. Leave empty if you prefer anonymous submission."
            >
              <input
                id="contributorName"
                name="contributorName"
                type="text"
                placeholder="Your name or handle"
                value={formData.contributorName}
                onChange={handleChange}
                autoComplete="name"
              />
            </FormField>

            {/* Consent */}
            <div className="consent-checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="contributorConsent"
                  checked={formData.contributorConsent}
                  onChange={handleChange}
                  required
                />
                <span>
                  I confirm this word is authentic to the selected region and grant permission
                  for educational and community archiving. *
                </span>
              </label>
              {errors.contributorConsent && (
                <p className="form-error" role="alert">{errors.contributorConsent}</p>
              )}
            </div>

            <div className="form-submit-row">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
              >
                Submit for review
              </Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
