import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SearchBar from '../components/features/SearchBar';
import ExpressionCard from '../components/features/ExpressionCard';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { REGIONS, EXPRESSIONS } from '../data/mockData';
import './Explore.css';

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const regionParam = searchParams.get('region') || 'all';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedRegion, setSelectedRegion] = useState(regionParam);

  // Sync state if URL search parameters change
  useEffect(() => {
    setSearchQuery(queryParam);
    setSelectedRegion(regionParam);
  }, [queryParam, regionParam]);

  const updateFilters = (newQuery, newRegion) => {
    const params = new URLSearchParams();
    if (newQuery && newQuery.trim()) {
      params.set('q', newQuery.trim());
    }
    if (newRegion && newRegion !== 'all') {
      params.set('region', newRegion);
    }
    setSearchParams(params);
  };

  const handleSearch = (term) => {
    setSearchQuery(term);
    updateFilters(term, selectedRegion);
  };

  const handleRegionSelect = (regionId) => {
    setSelectedRegion(regionId);
    updateFilters(searchQuery, regionId);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSearchParams({});
  };

  // Filtered dataset
  const filteredExpressions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return EXPRESSIONS.filter((expr) => {
      // Region filter
      if (selectedRegion !== 'all' && expr.regionId !== selectedRegion) {
        return false;
      }

      // Query filter (supports Kannada script and English meanings)
      if (q) {
        const matchKannada = expr.kannada.toLowerCase().includes(q);
        const matchTranslit = expr.transliteration.toLowerCase().includes(q);
        const matchMeaning = expr.meaning.toLowerCase().includes(q);
        const matchRegion = expr.regionName.toLowerCase().includes(q);
        const matchStandard = expr.standardKannada?.toLowerCase().includes(q);
        const matchVariants = expr.variants?.some((v) => v.toLowerCase().includes(q));

        return matchKannada || matchTranslit || matchMeaning || matchRegion || matchStandard || matchVariants;
      }

      return true;
    });
  }, [searchQuery, selectedRegion]);

  return (
    <div className="explore-page">
      <div className="container">
        {/* Page Header */}
        <div className="explore-header">
          <div className="explore-header-text">
            <span className="section-eyebrow">ಕನ್ನಡ ಪದ ಕೋಶ</span>
            <h1 className="explore-title">ಅನ್ವೇಷಿಸಿ (Explore Expressions)</h1>
            <p className="explore-subtitle">
              Search by Kannada word, transliteration, or English meaning. Filter across regional dialect zones.
            </p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="explore-toolbar">
          <SearchBar
            initialValue={searchQuery}
            onSearch={handleSearch}
            autoNavigate={false}
            placeholder="ಕನ್ನಡ ಪದ, ಲಿಪ್ಯಂತರ ಅಥವಾ ಅರ್ಥ ಹುಡುಕಿ... Search word or meaning"
          />

          {/* Region Filter Pills */}
          <div className="region-filter-bar">
            <span className="filter-label">ಪ್ರದೇಶ (Region):</span>
            <div className="filter-pills">
              <button
                type="button"
                className={`filter-pill ${selectedRegion === 'all' ? 'active' : ''}`}
                onClick={() => handleRegionSelect('all')}
              >
                ಎಲ್ಲಾ ಪ್ರದೇಶಗಳು (All)
              </button>
              {REGIONS.map((reg) => (
                <button
                  key={reg.id}
                  type="button"
                  className={`filter-pill kannada-text ${selectedRegion === reg.id ? 'active' : ''}`}
                  onClick={() => handleRegionSelect(reg.id)}
                >
                  {reg.nameKn} ({reg.nameEn})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filter Summary Bar */}
        {(searchQuery || selectedRegion !== 'all') && (
          <div className="active-filters-summary">
            <span className="summary-count">
              <strong>{filteredExpressions.length}</strong> {filteredExpressions.length === 1 ? 'ಪದ ದೊರೆತಿದೆ (result)' : 'ಪದಗಳು ದೊರೆತಿವೆ (results)'}
            </span>
            <div className="active-tags">
              {searchQuery && (
                <span className="active-tag">
                  ಹುಡುಕಾಟ: "{searchQuery}"
                  <button type="button" onClick={() => handleSearch('')} aria-label="Remove search filter">✕</button>
                </span>
              )}
              {selectedRegion !== 'all' && (
                <span className="active-tag">
                  ಪ್ರದೇಶ: {REGIONS.find((r) => r.id === selectedRegion)?.nameKn}
                  <button type="button" onClick={() => handleRegionSelect('all')} aria-label="Remove region filter">✕</button>
                </span>
              )}
              <button type="button" className="clear-all-btn" onClick={clearAllFilters}>
                ಎಲ್ಲವನ್ನೂ ತೆರವುಗೊಳಿಸಿ (Clear all)
              </button>
            </div>
          </div>
        )}

        {/* Results Grid or Empty State */}
        {filteredExpressions.length > 0 ? (
          <div className="explore-grid">
            {filteredExpressions.map((expr) => (
              <ExpressionCard key={expr.id} expression={expr} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={`"${searchQuery}" ಗೆ ಸಂಬಂಧಿಸಿದ ಯಾವುದೇ ಪದ ದೊರೆಯಲಿಲ್ಲ`}
            description="We couldn't find any recorded dialect expression matching your search query or selected region."
            action={
              <div className="empty-actions">
                <Button variant="secondary" onClick={clearAllFilters}>
                  ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ (Clear Filters)
                </Button>
                <Link to="/contribute">
                  <Button variant="primary">
                    ಈ ಪದವನ್ನು ಸೇರಿಸಿ (Contribute "{searchQuery || 'Expression'}")
                  </Button>
                </Link>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
}
