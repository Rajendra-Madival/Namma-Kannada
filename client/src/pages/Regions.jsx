import React from 'react';
import RegionCard from '../components/features/RegionCard';
import { REGIONS, EXPRESSIONS } from '../data/mockData';
import './Regions.css';

export default function Regions() {
  // Compute real expression counts from actual data
  const expressionCountByRegion = REGIONS.reduce((acc, region) => {
    acc[region.id] = EXPRESSIONS.filter((e) => e.regionId === region.id).length;
    return acc;
  }, {});

  return (
    <div className="regions-page">
      <div className="site-container">

        <div className="regions-page-header">
          <div className="eyebrow" style={{ marginBottom: '8px' }}>
            <span className="eyebrow-rule" /> Regional Zones of Karnataka
          </div>
          <h1 className="regions-page-title">Dialect Regions</h1>
          <p className="regions-page-subtitle">
            Karnataka&apos;s geographic and cultural diversity shapes how Kannada is spoken. Each region below
            has its own vocabulary, cadence, and idiom. Explore documented expressions across these six provisional zones.
          </p>
        </div>

        <div className="regions-page-grid">
          {REGIONS.map((region) => (
            <RegionCard
              key={region.id}
              region={region}
              expressionCount={expressionCountByRegion[region.id]}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
