import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <div className="container">
        {/* Header */}
        <div className="about-header">
          <span className="section-eyebrow">ಯೋಜನೆಯ ಉದ್ದೇಶ ಮತ್ತು ಮೌಲ್ಯಗಳು</span>
          <h1 className="about-title">ನಮ್ಮ ಕನ್ನಡ (About Namma Kannada)</h1>
          <p className="about-lead">
            A digital exploration platform dedicated to documenting, celebrating, and preserving the regional dialects, conversational idioms, and acoustic nuances of the Kannada language across Karnataka.
          </p>
        </div>

        <div className="about-content">
          {/* Section 1: The Linguistic Reality */}
          <section className="about-card">
            <h2 className="about-section-heading">
              ೧. ಭಾಷಾ ವೈವಿಧ್ಯದ ಮಹತ್ವ (Why Regional Diversity Matters)
            </h2>
            <p>
              Kannada is not a monolithic spoken language. Across Karnataka's distinct geographical zones—from the coastal plains of Karavali and the Deccan plateaus of Kalaburagi to the river basins of Mysuru and the northern plains of Hubballi-Dharwad—speakers employ unique vocabularies, grammatical shorteners, intonations, and honorific particles.
            </p>
            <p>
              Standard textbook Kannada provides a formal unifying grammar, but regional dialects preserve irreplaceable social histories, agricultural customs, familial structures, and local humor.
            </p>
          </section>

          {/* Section 2: How We Organize Data */}
          <section className="about-card">
            <h2 className="about-section-heading">
              ೨. ಪದ ಮತ್ತು ಧ್ವನಿ ವಿಂಗಡಣೆ (How Information is Organized)
            </h2>
            <p>
              The platform structures linguistic knowledge around relational entities:
            </p>
            <ul className="about-list">
              <li>
                <strong>ಪ್ರಾದೇಶಿಕ ಪದಗಳು (Expressions):</strong> The headword in authentic Kannada script with phonetic transliteration.
              </li>
              <li>
                <strong>ಅರ್ಥ ಮತ್ತು ಸಂದರ್ಭ (Meaning & Nuance):</strong> Contextual definition alongside standard formal Kannada equivalents.
              </li>
              <li>
                <strong>ವಾಕ್ಯ ಬಳಕೆ (Dialogue Examples):</strong> Real-world conversational sentences demonstrating grammatical placement.
              </li>
              <li>
                <strong>ಪ್ರದೇಶ ಸಂಬಂಧ (Geographic Association):</strong> Regional dialect zone and representative districts.
              </li>
              <li>
                <strong>ಧ್ವನಿ ದಾಖಲೆ (Acoustic Pronunciation):</strong> Recordings contributed by native regional speakers.
              </li>
            </ul>
          </section>

          {/* Section 3: Community Contribution & Review */}
          <section className="about-card">
            <h2 className="about-section-heading">
              ೩. ಸಮುದಾಯ ಸಲ್ಲಿಕೆ ಮತ್ತು ಪರಿಶೀಲನೆ (Community Review Process)
            </h2>
            <p>
              To maintain linguistic veracity, public community submissions do not automatically appear in public search. Our moderation pipeline enforces:
            </p>
            <div className="pipeline-steps">
              <div className="pipeline-step">
                <span className="step-num">Step 1</span>
                <h4>ಸಲ್ಲಿಕೆ (Submission)</h4>
                <p>Native speakers submit local words with meaning, regional tagging, and usage examples.</p>
              </div>
              <div className="pipeline-step">
                <span className="step-num">Step 2</span>
                <h4>ಪರಿಶೀಲನೆ (Review)</h4>
                <p>Authorized reviewers with regional familiarity verify phonology, definition, and authentic regional context.</p>
              </div>
              <div className="pipeline-step">
                <span className="step-num">Step 3</span>
                <h4>ಪ್ರಕಟಣೆ (Publication)</h4>
                <p>Only verified entries are added to the live public archive and indexed for search.</p>
              </div>
            </div>
          </section>

          {/* Section 4: Dataset Limitations */}
          <section className="about-card limitation-card" id="dataset-notes">
            <h2 className="about-section-heading">
              ೪. ಪ್ರಸ್ತುತ ಡೇಟಾಸೆಟ್ ಮಿತಿಗಳು (Dataset Limitations)
            </h2>
            <div className="limitation-alert">
              <p>
                <strong>Academic & Integrity Disclaimer:</strong> Namma Kannada is in active development. Initial records in this prototype are illustrative fixtures designated as <em>Sample Fixtures</em>. Dialects change across taluks, villages, and communities; our records do not claim that a small sample reflects all speakers across an entire region. We strictly avoid fabricating linguistic claims, fake statistics, or synthetic pronunciations.
              </p>
            </div>
          </section>

          {/* Call to action */}
          <div className="about-cta-card">
            <h3 className="kannada-text">ಕನ್ನಡ ಭಾಷಾ ದಾಖಲೀಕರಣದಲ್ಲಿ ಭಾಗವಹಿಸಿ</h3>
            <p>Join us in building a verified, community-grounded archive of Karnataka's living voices.</p>
            <div className="about-cta-buttons">
              <Link to="/contribute">
                <Button variant="primary" size="md">
                  + ಪದ ಕೊಡುಗೆ ನೀಡಿ (Contribute)
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="md">
                  ಪ್ರತಿಕ್ರಿಯೆ ನೀಡಿ (Send Feedback)
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
