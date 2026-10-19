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
  const [filtersOpen, setFiltersOpen] = useState(regionParam !== 'all');

  // Sync state when URL params change (e.g. navigated from Home chips)
  useEffect(() => {
    setSearchQuery(queryParam);
    setSelectedRegion(regionParam);
    if (regionParam !== 'all') setFiltersOpen(true);
  }, [queryParam, regionParam]);

  const updateFilters = (newQuery, newRegion) => {
    const params = new URLSearchParams();
    if (newQuery && newQuery.trim()) params.set('q', newQuery.trim());
    if (newRegion && newRegion !== 'all') params.set('region', newRegion);
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

  const filteredExpressions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return EXPRESSIONS.filter((expr) => {
      if (selectedRegion !== 'all' && expr.regionId !== selectedRegion) return false;
      if (q) {
        return (
          expr.kannada.toLowerCase().includes(q) ||
          expr.transliteration.toLowerCase().includes(q) ||
          expr.meaning.toLowerCase().includes(q) ||
          expr.regionName.toLowerCase().includes(q) ||
          expr.standardKannada?.toLowerCase().includes(q) ||
          expr.variants?.some((v) => v.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [searchQuery, selectedRegion]);

  const hasActiveFilter = searchQuery || selectedRegion !== 'all';

  return (
    <div className="explore-page">
      <div className="container">

        {/* Page Header */}
        <div className="explore-header">
          <h1 className="explore-title">Explore Expressions</h1>
          <p className="explore-subtitle">
            Search by Kannada word, transliteration, or English meaning.
          </p>
        </div>

        {/* Search + filter toggle row */}
        <div className="explore-toolbar">
          <SearchBar
            initialValue={searchQuery}
            onSearch={handleSearch}
            autoNavigate={false}
            placeholder="Search a Kannada word or its meaning…"
          />
          <button
            type="button"
            className={`filter-toggle-btn ${filtersOpen ? 'active' : ''} ${selectedRegion !== 'all' ? 'has-active' : ''}`}
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
          >
            {selectedRegion !== 'all'
              ? `Region: ${REGIONS.find((r) => r.id === selectedRegion)?.nameEn}`
              : 'Filter by region'}
            <span className="toggle-caret" aria-hidden="true">{filtersOpen ? '▲' : '▼'}</span>
          </button>
        </div>

        {/* Region filter pills — collapsible */}
        {filtersOpen && (
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
        )}

        {/* Active filter summary */}
        {hasActiveFilter && (
          <div className="active-filters-summary">
            <span className="summary-count">
              <strong>{filteredExpressions.length}</strong>{' '}
              {filteredExpressions.length === 1 ? 'result' : 'results'}
            </span>
            <button type="button" className="clear-all-btn" onClick={clearAllFilters}>
              Clear filters
            </button>
          </div>
        )}

        {/* Results or empty state */}
        {filteredExpressions.length > 0 ? (
          <div className="explore-grid">
            {filteredExpressions.map((expr) => (
              <ExpressionCard key={expr.id} expression={expr} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={searchQuery ? `No results for "${searchQuery}"` : 'No expressions found'}
            description={
              searchQuery
                ? 'Try a different search term, or contribute this word to the archive.'
                : 'No expressions match the selected filter.'
            }
            action={
              <div className="empty-actions">
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
