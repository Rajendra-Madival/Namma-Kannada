import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <div className="site-container">

        <div className="about-header">
          <div className="eyebrow" style={{ marginBottom: '8px' }}>
            <span className="eyebrow-rule" /> Documentation &amp; Archival Purpose
          </div>
          <h1 className="about-title">About Namma Kannada</h1>
          <p className="about-lead">
            A community initiative for documenting and exploring how Kannada is spoken across Karnataka&apos;s distinct
            geographic and cultural regions — not as a rigid textbook exercise, but as a living, breathing record.
          </p>
        </div>

        <div className="about-content">

          <section className="about-section">
            <h2>Why regional Kannada matters</h2>
            <p>
              Standard Kannada provides a shared formal grammar, but the Kannada spoken in Dharwad,
              Mangaluru, Davanagere, Kalaburagi, Mysuru, and Kodagu is as richly varied in cadence,
              vocabulary, and feeling as Karnataka&apos;s diverse landscapes. These regional varieties carry
              centuries of history, agricultural idioms, folk humor, and kinship terminology that standard textbooks cannot fully convey.
            </p>
            <p>
              Namma Kannada exists to document these voices — not to rank or rigidly define dialects, but
              to provide an accessible, respectful digital home for regional speech.
            </p>
          </section>

          <section className="about-section">
            <h2>What each entry documents</h2>
            <ul className="about-list">
              <li><strong>Kannada expression</strong> — in authentic Unicode Kannada script.</li>
              <li><strong>Transliteration &amp; Pronunciation</strong> — phonetically transcribed with native speaker notes.</li>
              <li><strong>Meaning &amp; Cultural Context</strong> — explaining tone, usage moments, and nuance.</li>
              <li><strong>Regional Zone &amp; Districts</strong> — provisional geographical association.</li>
              <li><strong>Life Domain</strong> — categorized under Greetings, Food, Home, Feelings, or Everyday Verbs.</li>
              <li><strong>Conversational Example</strong> — authentic regional dialogue sentence with English translation.</li>
              <li><strong>Dialect Specificity</strong> — clearly marked as either verified region-specific idiom or common Kannada heritage.</li>
            </ul>
          </section>

          <section className="about-section" id="verification">
            <h2>How expressions are reviewed and verified</h2>
            <div className="pipeline-steps">
              <div className="pipeline-step">
                <span className="step-num">1</span>
                <div>
                  <h4>Community Submission</h4>
                  <p>Speakers submit words with meaning, regional tagging, and a conversational usage example.</p>
                </div>
              </div>
              <div className="pipeline-step">
                <span className="step-num">2</span>
                <div>
                  <h4>Regional Review</h4>
                  <p>Authorized native reviewers with familiarity in the regional speech check meaning, spelling, and authentic context.</p>
                </div>
              </div>
              <div className="pipeline-step">
                <span className="step-num">3</span>
                <div>
                  <h4>Verified Publication</h4>
                  <p>Verified entries appear in the public explorer with source attribution. Unverified or pending entries are clearly held for review.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section limitation-section" id="ethics">
            <h2>Limitations and data honesty</h2>
            <p>
              Namma Kannada operates with strict commitment to linguistic honesty. The six regional zones
              (North, Coastal, Central, Eastern, Mysuru, Kodagu) are broad provisional navigation categories designed
              for user exploration, not immutable scientific dialect borders.
            </p>
            <p>
              Speech varieties in Karnataka are continuous and fluid across taluks, communities, and families.
              We do not fabricate dialect distinctions, invent artificial statistics, or present unverified vocabulary as definitive facts.
              Every entry clearly displays its verified regional status and community source.
            </p>
          </section>

          <div className="about-cta">
            <h3 className="kannada-text">ಕನ್ನಡ ದಾಖಲೀಕರಣದಲ್ಲಿ ಭಾಗವಹಿಸಿ</h3>
            <p>Join us in building an authentic, community-grounded archive of Karnataka&apos;s living voices.</p>
            <div className="about-cta-buttons">
              <Link to="/contribute">
                <Button variant="primary" size="md">Contribute a word</Button>
              </Link>
              <Link to="/explore">
                <Button variant="secondary" size="md">Explore expressions</Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
