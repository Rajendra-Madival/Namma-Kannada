import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SearchBar from '../components/features/SearchBar';
import ExpressionCard from '../components/features/ExpressionCard';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { REGIONS, DOMAINS, EXPRESSIONS, getRegionById } from '../data/mockData';
import './Explore.css';

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const selectedRegion = searchParams.get('region') || 'all';
  const selectedDomain = searchParams.get('domain') || 'all';

  const [filtersOpen, setFiltersOpen] = useState(
    selectedRegion !== 'all' || selectedDomain !== 'all'
  );

  const updateFilters = (newQuery, newRegion, newDomain) => {
    const params = new URLSearchParams();
    if (newQuery && newQuery.trim()) params.set('q', newQuery.trim());
    if (newRegion && newRegion !== 'all') params.set('region', newRegion);
    if (newDomain && newDomain !== 'all') params.set('domain', newDomain);
    setSearchParams(params);
  };

  const handleSearch = (term) => {
    updateFilters(term, selectedRegion, selectedDomain);
  };

  const handleRegionSelect = (regionId) => {
    updateFilters(searchQuery, regionId, selectedDomain);
  };

  const handleDomainSelect = (domainId) => {
    updateFilters(searchQuery, selectedRegion, domainId);
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  const filteredExpressions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return EXPRESSIONS.filter((expr) => {
      // Region check with alias resolution
      if (selectedRegion !== 'all') {
        const canonicalTarget = getRegionById(selectedRegion)?.id || selectedRegion;
        if (expr.regionId !== canonicalTarget) return false;
      }

      // Domain check
      if (selectedDomain !== 'all') {
        if (expr.domain !== selectedDomain) return false;
      }

      // Search text query
      if (q) {
        return (
          expr.kannada.toLowerCase().includes(q) ||
          expr.transliteration?.toLowerCase().includes(q) ||
          expr.meaning.toLowerCase().includes(q) ||
          expr.regionName?.toLowerCase().includes(q) ||
          expr.standardKannada?.toLowerCase().includes(q) ||
          expr.variants?.some((v) => v.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [searchQuery, selectedRegion, selectedDomain]);

  const hasActiveFilter = searchQuery || selectedRegion !== 'all' || selectedDomain !== 'all';

  const activeRegionObj = selectedRegion !== 'all' ? getRegionById(selectedRegion) : null;
  const activeDomainObj = selectedDomain !== 'all' ? DOMAINS.find((d) => d.id === selectedDomain) : null;

  return (
    <div className="explore-page">
      <div className="site-container">

        {/* Page Header */}
        <div className="explore-header">
          <div className="eyebrow" style={{ marginBottom: '8px' }}>
            <span className="eyebrow-rule" /> Regional Vocabulary Explorer
          </div>
          <h1 className="explore-title">Explore Expressions</h1>
          <p className="explore-subtitle">
            Search by Kannada word, transliteration, English meaning, or filter across Karnataka&apos;s regions and life domains.
          </p>
        </div>

        {/* Search + filter toggle row */}
        <div className="explore-toolbar">
          <SearchBar
            key={searchQuery}
            initialValue={searchQuery}
            onSearch={handleSearch}
            autoNavigate={false}
            placeholder="Search a Kannada word or meaning (e.g. ಬ್ಯಾಡ್ರಿ, ಮಾರ್ರೆ, ರೊಟ್ಟಿ)…"
          />
          <button
            type="button"
            className={`filter-toggle-btn ${filtersOpen ? 'active' : ''} ${selectedRegion !== 'all' || selectedDomain !== 'all' ? 'has-active' : ''}`}
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
          >
            Filters
            {(activeRegionObj || activeDomainObj) && (
              <span className="filter-badge">
                {[activeRegionObj?.nameEn, activeDomainObj?.nameEn].filter(Boolean).join(' · ')}
              </span>
            )}
            <span className="toggle-caret" aria-hidden="true">{filtersOpen ? '▲' : '▼'}</span>
          </button>
        </div>

        {/* Filter bars — collapsible */}
        {filtersOpen && (
          <div className="filters-container">
            {/* Region filter pills */}
            <div className="filter-group">
              <span className="filter-group-label">Region:</span>
              <div className="region-filter-bar" role="group" aria-label="Filter by region">
                <button
                  type="button"
                  className={`filter-pill ${selectedRegion === 'all' ? 'active' : ''}`}
                  onClick={() => handleRegionSelect('all')}
                >
                  All regions
                </button>
                {REGIONS.map((reg) => (
                  <button
                    key={reg.id}
                    type="button"
                    className={`filter-pill ${selectedRegion === reg.id ? 'active' : ''}`}
                    onClick={() => handleRegionSelect(reg.id)}
                  >
                    <span className="kannada-text">{reg.nameKn}</span>
                    <span className="pill-en">({reg.nameEn})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Domain filter pills */}
            <div className="filter-group" style={{ marginTop: '12px' }}>
              <span className="filter-group-label">Domain:</span>
              <div className="region-filter-bar" role="group" aria-label="Filter by domain">
                <button
                  type="button"
                  className={`filter-pill ${selectedDomain === 'all' ? 'active' : ''}`}
                  onClick={() => handleDomainSelect('all')}
                >
                  All domains
                </button>
                {DOMAINS.map((dom) => (
                  <button
                    key={dom.id}
                    type="button"
                    className={`filter-pill ${selectedDomain === dom.id ? 'active' : ''}`}
                    onClick={() => handleDomainSelect(dom.id)}
                  >
                    <span>{dom.nameEn}</span>
                    <span className="pill-en kannada-text" style={{ fontSize: '0.75rem', opacity: 0.8 }}>({dom.nameKn})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active filter summary */}
        {hasActiveFilter && (
          <div className="active-filters-summary">
            <span className="summary-count">
              Found <strong>{filteredExpressions.length}</strong>{' '}
              {filteredExpressions.length === 1 ? 'expression' : 'expressions'}
            </span>
            <button type="button" className="clear-all-btn" onClick={clearAllFilters}>
              Reset all filters
            </button>
          </div>
        )}

        {/* Results grid or empty state */}
        {filteredExpressions.length > 0 ? (
          <div className="explore-grid">
            {filteredExpressions.map((expr) => (
              <ExpressionCard key={expr.id} expression={expr} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={searchQuery ? `ಯಾವುದೇ ಫಲಿತಾಂಶ ದೊರೆಯಲಿಲ್ಲ (No results for "${searchQuery}")` : 'No expressions found'}
            description={
              searchQuery
                ? 'Try checking spelling, exploring other regional filters, or suggest this word to the archive.'
                : 'No expressions match the selected region and domain combination.'
            }
            action={
              <div className="empty-actions" style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <Button variant="secondary" onClick={clearAllFilters}>
                  Clear filters
                </Button>
                <Link to="/contribute">
                  <Button variant="primary">
                    Contribute a word
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
