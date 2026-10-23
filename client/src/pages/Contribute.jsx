import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import FormField from '../components/common/FormField';
import Button from '../components/common/Button';
import { REGIONS, DOMAINS, getRegionById } from '../data/mockData';
import './Contribute.css';

const UNKNOWN_REGION_VALUE = '__unknown__';

export default function Contribute() {
  const [searchParams] = useSearchParams();
  const rawPreselectedRegion = searchParams.get('region') || '';
  const resolvedRegion = getRegionById(rawPreselectedRegion)?.id || rawPreselectedRegion;

  const [formData, setFormData] = useState({
    kannada: '',
    transliteration: '',
    meaning: '',
    regionId: resolvedRegion,
    domain: 'greetings',
    locality: '',
    usageExampleKn: '',
    usageExampleEn: '',
    contributorName: '',
    contributorConsent: false,
  });

  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState(null);
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
    if (submissionError) {
      setSubmissionError(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.kannada.trim()) {
      newErrors.kannada = 'Kannada word or expression is required.';
    }
    if (!formData.meaning.trim()) {
      newErrors.meaning = 'Meaning and usage description is required.';
    }
    if (!formData.regionId) {
      newErrors.regionId = 'Please select a regional dialect zone.';
    }
    if (!formData.domain) {
      newErrors.domain = 'Please select a life domain for this word.';
    }
    if (!formData.contributorConsent) {
      newErrors.contributorConsent =
        'Please confirm this expression is authentic regional usage before submitting.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const payload = {
      word: formData.kannada.trim(),
      kannada: formData.kannada.trim(),
      transliteration: formData.transliteration.trim(),
      meaning: formData.meaning.trim(),
      regionId: formData.regionId,
      domain: formData.domain,
      locality: formData.locality.trim(),
      exampleSentence: formData.usageExampleKn.trim(),
      usageExampleKn: formData.usageExampleKn.trim(),
      usageExampleEn: formData.usageExampleEn.trim(),
      contributorName: formData.contributorName.trim(),
      contributorConsent: formData.contributorConsent,
    };

    try {
      const response = await fetch('/api/contributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || `Submission failed with status code ${response.status}`);
      }

      setSubmittedEntry(data?.entry || {
        ...formData,
        id: `contrib-${Date.now()}`,
        status: 'PENDING_REVIEW',
        submittedAt: new Date().toISOString(),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Contribution submission error:', err);
      setSubmissionError(
        err.message || 'Unable to submit contribution to the server. Please verify your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      kannada: '',
      transliteration: '',
      meaning: '',
      regionId: '',
      domain: 'greetings',
      locality: '',
      usageExampleKn: '',
      usageExampleEn: '',
      contributorName: '',
      contributorConsent: false,
    });
    setErrors({});
    setSubmissionError(null);
    setIsSubmitted(false);
    setSubmittedEntry(null);
  };

  // ── Success view ──
  if (isSubmitted && submittedEntry) {
    const selectedRegionObj = REGIONS.find((r) => r.id === submittedEntry.regionId);
    const selectedDomainObj = DOMAINS.find((d) => d.id === submittedEntry.domain);

    return (
      <div className="contribute-page">
        <div className="site-container">
          <div className="submission-success-card">
            <div className="success-icon" aria-hidden="true">✓</div>
            <h1 className="success-title kannada-text">ಧನ್ಯವಾದಗಳು! (Thank you!)</h1>
            <p className="success-desc">
              Your contribution for{' '}
              <strong className="kannada-text">&ldquo;{submittedEntry.kannada}&rdquo;</strong>{' '}
              {selectedRegionObj ? `(${selectedRegionObj.nameEn})` : ''} has been successfully recorded in the review queue.
            </p>

            <div className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              <strong>Status: {submittedEntry.status || 'Pending review'}</strong>
            </div>

            <div className="review-notice">
              <p>
                <strong>Review protocol:</strong> All submissions are cross-checked with native regional speakers before publication to ensure authenticity.
                Verified entries will appear in the public explorer under {selectedDomainObj?.nameEn || 'the selected category'}.
              </p>
            </div>

            <div className="success-actions">
              <Button variant="primary" onClick={handleReset}>
                Contribute another word
              </Button>
              <Link to="/explore">
                <Button variant="secondary">Browse Explore</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Form view ──
  return (
    <div className="contribute-page">
      <div className="site-container">

        <div className="contribute-header">
          <div className="eyebrow" style={{ marginBottom: '8px' }}>
            <span className="eyebrow-rule" /> Community Language Archive
          </div>
          <h1 className="contribute-title">Contribute a word</h1>
          <p className="contribute-subtitle">
            Share a regional Kannada word, expression, or idiom from your corner of Karnataka.
            All contributions undergo careful community review before publication.
          </p>
        </div>

        {/* Prominent error notification if backend failed */}
        {submissionError && (
          <div
            className="submission-error-banner"
            role="alert"
            style={{
              background: '#FDF2F2',
              border: '1px solid #F8B4B4',
              borderRadius: '8px',
              padding: '16px 20px',
              marginBottom: '24px',
              color: '#C62828',
              fontSize: '0.95rem',
            }}
          >
            <strong>Submission could not be completed:</strong> {submissionError}
          </div>
        )}

        <div className="contribute-form-container">
          <form className="contribute-form" onSubmit={handleSubmit} noValidate>

            {/* Kannada expression */}
            <FormField
              id="kannada"
              label="Kannada word or expression"
              required
              error={errors.kannada}
              hint="Type in Kannada script — e.g. ಬ್ಯಾಡ್ರಿ, ಮಾರ್ರೆ, ಅತ್ತಿತ್ತ, ಗಿರ್ಮಿಟ್"
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
              label="Transliteration (recommended)"
              hint="Phonetic romanization — e.g. Byādri, Mārre, Girmit"
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
              hint="Explain what the word means, how it is used, and its cultural tone (e.g. polite refusal, affectionate teasing)."
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

            {/* Region dropdown */}
            <FormField
              id="regionId"
              label="Region where this expression is used"
              required
              error={errors.regionId}
              hint="Select the regional dialect zone. Choose Unknown / Other if unsure."
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
                    {r.nameEn} ({r.nameKn})
                  </option>
                ))}
                <option value={UNKNOWN_REGION_VALUE}>Unknown / Other Karnataka</option>
              </select>
            </FormField>

            {/* Domain category */}
            <FormField
              id="domain"
              label="Life Domain"
              required
              error={errors.domain}
              hint="Select the category that best fits this expression."
            >
              <select
                id="domain"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                required
              >
                {DOMAINS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nameEn} ({d.nameKn})
                  </option>
                ))}
              </select>
            </FormField>

            {/* Locality */}
            <FormField
              id="locality"
              label="Specific locality, taluk, or town (optional)"
              hint="e.g. Hubballi, Kundapura, Mandya, Kalaburagi, Madikeri"
            >
              <input
                id="locality"
                name="locality"
                type="text"
                placeholder="e.g. Kundapura"
                value={formData.locality}
                onChange={handleChange}
              />
            </FormField>

            {/* Usage example — optional */}
            <FormField
              id="usageExampleKn"
              label="Example sentence in Kannada (optional)"
              hint="A short conversational sentence showing how the word lives in speech."
            >
              <input
                id="usageExampleKn"
                name="usageExampleKn"
                type="text"
                className="kannada-text"
                placeholder="e.g. ಇನ್ನೊಂದು ಚಪಾತಿ ತಿನ್ರಿ ಅಂದ್ರೆ, ಬ್ಯಾಡ್ರಿ ಸಾಕು ಅಂದ್ರು."
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
                placeholder="e.g. When offered another chapati, they said no thanks."
                value={formData.usageExampleEn}
                onChange={handleChange}
              />
            </FormField>

            {/* Contributor name — optional */}
            <FormField
              id="contributorName"
              label="Your name or handle (optional)"
              hint="For community acknowledgment. Leave empty if you prefer anonymous submission."
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

            {/* Consent checkbox */}
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
                  I confirm this word is authentic to the selected regional speech and grant permission
                  for community archiving and educational preservation. *
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
