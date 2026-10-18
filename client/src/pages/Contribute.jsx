import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import FormField from '../components/common/FormField';
import Button from '../components/common/Button';
import { REGIONS } from '../data/mockData';
import './Contribute.css';

export default function Contribute() {
  const [searchParams] = useSearchParams();
  const preselectedRegion = searchParams.get('region') || '';

  // Form State
  const [formData, setFormData] = useState({
    kannada: '',
    transliteration: '',
    meaning: '',
    standardKannada: '',
    regionId: preselectedRegion,
    usageExampleKn: '',
    usageExampleEn: '',
    notes: '',
    contributorName: '',
    contributorConsent: false,
    audioConsent: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEntry, setSubmittedEntry] = useState(null);

  // Field change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.kannada.trim()) {
      newErrors.kannada = 'ದಯವಿಟ್ಟು ಕನ್ನಡ ಪದ ಅಥವಾ ನುಡಿಗಟ್ಟನ್ನು ನಮೂದಿಸಿ (Kannada word is required).';
    }

    if (!formData.meaning.trim()) {
      newErrors.meaning = 'ದಯವಿಟ್ಟು ಪದದ ಅರ್ಥವನ್ನು ವಿವರಿಸಿ (Meaning/Definition is required).';
    }

    if (!formData.regionId) {
      newErrors.regionId = 'ದಯವಿಟ್ಟು ಸೂಕ್ತ ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ (Please select an associated region).';
    }

    if (!formData.contributorConsent) {
      newErrors.contributorConsent = 'You must confirm that this contribution represents authentic regional usage and consent to community archiving.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate safe API submission with pending moderation status
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedEntry({
        ...formData,
        id: `pending-${Date.now()}`,
        status: 'PENDING_REVIEW',
        submittedAt: new Date().toISOString()
      });
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      kannada: '',
      transliteration: '',
      meaning: '',
      standardKannada: '',
      regionId: '',
      usageExampleKn: '',
      usageExampleEn: '',
      notes: '',
      contributorName: '',
      contributorConsent: false,
      audioConsent: false
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmittedEntry(null);
  };

  // If submitted successfully, show clear pending verification confirmation
  if (isSubmitted && submittedEntry) {
    const selectedRegionObj = REGIONS.find((r) => r.id === submittedEntry.regionId);

    return (
      <div className="contribute-page">
        <div className="container">
          <div className="submission-success-card">
            <div className="success-badge-icon" aria-hidden="true">✓</div>
            <span className="success-tag">ಸಲ್ಲಿಕೆ ಯಶಸ್ವಿಯಾಗಿದೆ (Submission Received)</span>
            <h1 className="success-title kannada-text">
              ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಕೊಡುಗೆ ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ
            </h1>
            <p className="success-desc">
              Your contribution for <strong className="kannada-text">"{submittedEntry.kannada}"</strong> ({selectedRegionObj?.nameKn || submittedEntry.regionId}) has been securely recorded with status:
            </p>

            <div className="status-pill-box">
              <span className="status-indicator-dot" />
              <strong>ಪರಿಶೀಲನೆ ಬಾಕಿ (Pending Review)</strong>
            </div>

            <div className="review-workflow-notice">
              <h4>ನಮ್ಮ ಪರಿಶೀಲನಾ ನಿಯಮ (Quality & Integrity Rule)</h4>
              <p>
                To maintain authentic linguistic accuracy, community contributions do not automatically publish to public search. Authorized native reviewers verify regional context, pronunciation nuances, and dialect validity before releasing it to the public archive.
              </p>
            </div>

            <div className="success-actions">
              <Button variant="primary" onClick={handleReset}>
                + ಇನ್ನೊಂದು ಪದ ಸೇರಿಸಿ (Contribute Another)
              </Button>
              <Link to="/explore">
                <Button variant="outline">
                  ಪದಕೋಶವನ್ನು ಅನ್ವೇಷಿಸಿ (Back to Explorer)
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contribute-page">
      <div className="container">
        {/* Header */}
        <div className="contribute-header">
          <span className="section-eyebrow">ಸಮುದಾಯ ಕೊಡುಗೆ</span>
          <h1 className="contribute-title">ಪ್ರಾದೇಶಿಕ ಪದ ಅಥವಾ ನುಡಿಗಟ್ಟು ಸೇರಿಸಿ (Contribute)</h1>
          <p className="contribute-subtitle">
            Document words, expressions, or colloquial sayings unique to your hometown. Every verified entry enriches Karnataka's digital linguistic heritage.
          </p>
        </div>

        {/* Contribution Form Card */}
        <div className="contribute-form-container">
          <form className="contribute-form" onSubmit={handleSubmit} noValidate>
            <div className="form-section-header">
              <h3 className="section-legend">೧. ಪ್ರಾದೇಶಿಕ ಪದದ ವಿವರ (Expression Details)</h3>
              <p className="section-desc">Provide the Kannada expression and its regional meaning.</p>
            </div>

            {/* Kannada Expression */}
            <FormField
              id="kannada"
              label="ಕನ್ನಡ ಪದ ಅಥವಾ ನುಡಿಗಟ್ಟು (Kannada Word/Phrase)"
              required={true}
              error={errors.kannada}
              hint="Type in Kannada Unicode script (e.g. ಬ್ಯಾಡ್ರಿ, ಮಾರ್ರೆ, ಅತ್ತಿತ್ತ)."
            >
              <input
                id="kannada"
                name="kannada"
                type="text"
                className="kannada-text"
                placeholder="ಉದಾಹರಣೆಗೆ: ಬ್ಯಾಡ್ರಿ"
                value={formData.kannada}
                onChange={handleChange}
                required
              />
            </FormField>

            <div className="form-row-2">
              {/* Transliteration */}
              <FormField
                id="transliteration"
                label="ಇಂಗ್ಲಿಷ್ ಲಿಪ್ಯಂತರ (Transliteration)"
                hint="Phonetic romanization (e.g. Byādri, Mārre)."
              >
                <input
                  id="transliteration"
                  name="transliteration"
                  type="text"
                  placeholder="e.g. Byādri"
                  value={formData.transliteration}
                  onChange={handleChange}
                />
              </FormField>

              {/* Region Selection */}
              <FormField
                id="regionId"
                label="ಸಂಬಂಧಿಸಿದ ಪ್ರದೇಶ (Dialect Region)"
                required={true}
                error={errors.regionId}
                hint="Select the primary dialect region where this is spoken."
              >
                <select
                  id="regionId"
                  name="regionId"
                  value={formData.regionId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- ಪ್ರದೇಶ ಆಯ್ಕೆಮಾಡಿ (Select Region) --</option>
                  {REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.nameKn} ({r.nameEn})
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            {/* Meaning */}
            <FormField
              id="meaning"
              label="ಅರ್ಥ ಮತ್ತು ಬಳಕೆ (Meaning & Nuance)"
              required={true}
              error={errors.meaning}
              hint="Explain what the word means and its emotional or cultural tone (e.g., affectionate, respectful refusal)."
            >
              <textarea
                id="meaning"
                name="meaning"
                placeholder="Explain the meaning, context, and tone..."
                value={formData.meaning}
                onChange={handleChange}
                rows={3}
                required
              />
            </FormField>

            {/* Standard Kannada */}
            <FormField
              id="standardKannada"
              label="ಪ್ರಮಾಣಿತ ಕನ್ನಡ ಸಮಾನಾರ್ಥಕ (Standard Kannada Equivalent)"
              hint="Optional: How would this concept typically be expressed in standard formal Kannada?"
            >
              <input
                id="standardKannada"
                name="standardKannada"
                type="text"
                className="kannada-text"
                placeholder="ಉದಾಹರಣೆಗೆ: ಬೇಡ (Bēda)"
                value={formData.standardKannada}
                onChange={handleChange}
              />
            </FormField>

            <div className="form-section-header">
              <h3 className="section-legend">೨. ಸಂಭಾಷಣಾ ಪ್ರಯೋಗ (Conversational Usage)</h3>
              <p className="section-desc">Help learners grasp how this word is spoken in everyday dialogue.</p>
            </div>

            {/* Usage Example */}
            <FormField
              id="usageExampleKn"
              label="ಉದಾಹರಣೆ ವಾಕ್ಯ (Usage Sentence in Kannada)"
              hint="A short everyday dialogue or phrase using this expression."
            >
              <input
                id="usageExampleKn"
                name="usageExampleKn"
                type="text"
                className="kannada-text"
                placeholder="ಉದಾ: ಇನ್ನೊಂದು ರೊಟ್ಟಿ ತಿನ್ರಿ ಅಂದ್ರೆ, ಬ್ಯಾಡ್ರಿ ಸಾಕು ಅಂದ್ರು."
                value={formData.usageExampleKn}
                onChange={handleChange}
              />
            </FormField>

            <FormField
              id="usageExampleEn"
              label="ವಾಕ್ಯದ ಇಂಗ್ಲಿಷ್ ಅನುವಾದ (Sentence English Translation)"
              hint="Translation of the example sentence."
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

            {/* Cultural Notes */}
            <FormField
              id="notes"
              label="ಸಾಂಸ್ಕೃತಿಕ ಅಥವಾ ಐತಿಹಾಸಿಕ ಹಿನ್ನೆಲೆ (Cultural or Etymological Notes)"
              hint="Optional: Any interesting historical, culinary, or agricultural context?"
            >
              <textarea
                id="notes"
                name="notes"
                placeholder="Any special tradition, gesture, or context associated with this word..."
                value={formData.notes}
                onChange={handleChange}
                rows={2}
              />
            </FormField>

            <div className="form-section-header">
              <h3 className="section-legend">೩. ಕೊಡುಗೆದಾರರ ವಿವರ ಮತ್ತು ಸಮ್ಮತಿ (Attribution & Consent)</h3>
              <p className="section-desc">Protecting contributor consent and linguistic integrity.</p>
            </div>

            {/* Contributor Name */}
            <FormField
              id="contributorName"
              label="ನಿಮ್ಮ ಹೆಸರು ಅಥವಾ ಸಮುದಾಯ (Your Name / Organization)"
              hint="For contributor attribution (leave empty if you prefer anonymous archiving)."
            >
              <input
                id="contributorName"
                name="contributorName"
                type="text"
                placeholder="Your name or handle"
                value={formData.contributorName}
                onChange={handleChange}
              />
            </FormField>

            {/* Consent Checkboxes */}
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
                  I confirm that this word is authentic to the selected region and grant permission for educational and community archiving. *
                </span>
              </label>
              {errors.contributorConsent && (
                <p className="form-error">{errors.contributorConsent}</p>
              )}

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="audioConsent"
                  checked={formData.audioConsent}
                  onChange={handleChange}
                />
                <span>
                  I am willing to provide a native audio recording for pronunciation verification if contacted by reviewers.
                </span>
              </label>
            </div>

            <div className="form-submit-row">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
              >
                ಕೊಡುಗೆ ಸಲ್ಲಿಸಿ (Submit for Review) →
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
