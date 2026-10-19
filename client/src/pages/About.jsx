import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <div className="container">

        <div className="about-header">
          <h1 className="about-title">About Namma Kannada</h1>
          <p className="about-lead">
            A community archive for documenting how Kannada is spoken across Karnataka's distinct
            geographic and cultural regions — not as a textbook exercise, but as a living record.
          </p>
        </div>

        <div className="about-content">

          <section className="about-section">
            <h2>Why regional Kannada matters</h2>
            <p>
              Standard Kannada provides a shared formal grammar, but the Kannada spoken in Dharwad,
              Mangalore, Mysuru, Kalaburagi, and the Malenadu hills is as different in rhythm,
              vocabulary, and feeling as the landscapes themselves. These regional varieties carry
              histories, humour, agricultural customs, and kinship that formal Kannada cannot
              fully express.
            </p>
            <p>
              Namma Kannada exists to document these voices — not to rank or classify dialects, but
              to give them a place in the digital record.
            </p>
          </section>

          <section className="about-section">
            <h2>What each entry contains</h2>
            <ul className="about-list">
              <li><strong>Kannada expression</strong> — in authentic Unicode script.</li>
              <li><strong>Meaning and usage</strong> — in plain English, with cultural tone.</li>
              <li><strong>Region and dialect zone</strong> — with specific districts where relevant.</li>
              <li><strong>Conversational example</strong> — showing how the word lives in speech.</li>
              <li><strong>Regional variants</strong> — alternate forms heard within the region.</li>
              <li><strong>Pronunciation audio</strong> — contributed by verified native speakers, when available.</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>How expressions are verified</h2>
            <div className="pipeline-steps">
              <div className="pipeline-step">
                <span className="step-num">1</span>
                <div>
                  <h4>Submission</h4>
                  <p>Native speakers submit words with meaning, regional tagging, and a usage example.</p>
                </div>
              </div>
              <div className="pipeline-step">
                <span className="step-num">2</span>
                <div>
                  <h4>Review</h4>
                  <p>Authorized reviewers with regional familiarity check phonology, definition, and context.</p>
                </div>
              </div>
              <div className="pipeline-step">
                <span className="step-num">3</span>
                <div>
                  <h4>Publication</h4>
                  <p>Only verified entries appear in public search results. Pending submissions are never shown.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section limitation-section" id="dataset-notes">
            <h2>Limitations and data honesty</h2>
            <p>
              Namma Kannada is in active development. The current records are illustrative sample fixtures
              awaiting full community review. No fabricated statistics, synthetic pronunciations, or invented
              dialect facts are used. Dialects vary across taluks and communities — a small sample does not
              represent all speakers of a region. We are committed to being clear about what is verified,
              what is sampled, and what is unknown.
            </p>
          </section>

          <div className="about-cta">
            <h3 className="kannada-text">ಕನ್ನಡ ದಾಖಲೀಕರಣದಲ್ಲಿ ಭಾಗವಹಿಸಿ</h3>
            <p>Join us in building a verified, community-grounded archive of Karnataka's living voices.</p>
            <div className="about-cta-buttons">
              <Link to="/contribute">
                <Button variant="primary" size="md">Contribute a word</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="md">Send feedback</Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
