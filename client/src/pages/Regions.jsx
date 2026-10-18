import React from 'react';
import RegionCard from '../components/features/RegionCard';
import { REGIONS } from '../data/mockData';
import './Regions.css';

export default function Regions() {
  return (
    <div className="regions-page">
      <div className="container">
        {/* Header */}
        <div className="regions-page-header">
          <span className="section-eyebrow">ಕರ್ನಾಟಕದ ಭಾಷಾ ವೈವಿಧ್ಯ</span>
          <h1 className="regions-page-title">ಪ್ರಾದೇಶಿಕ ಉಪಭಾಷೆಗಳು (Dialect Regions)</h1>
          <p className="regions-page-subtitle">
            Karnataka's linguistic topography is defined by natural geographic borders, historical realms, and cultural interactions. Explore the dialect profiles documented in our platform.
          </p>
        </div>

        {/* Linguistic Respect Note */}
        <div className="regions-respect-banner">
          <span className="banner-icon" aria-hidden="true">💡</span>
          <div>
            <strong>Linguistic & Cultural Context:</strong> Regional dialects are living, evolving systems of communication. The records presented here are community-curated samples and do not claim to encapsulate the entire spectrum or every variation spoken within these historic regions.
          </div>
        </div>

        {/* Regions Grid */}
        <div className="regions-page-grid">
          {REGIONS.map((region) => (
            <RegionCard key={region.id} region={region} />
          ))}
        </div>
      </div>
    </div>
  );
}
