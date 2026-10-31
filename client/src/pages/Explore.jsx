import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SearchBar from '../components/features/SearchBar';
import ExpressionCard from '../components/features/ExpressionCard';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { REGIONS, DOMAINS, EXPRESSIONS, getRegionById } from '../data/mockData';
import './Explore.css';

const PAGE_SIZE = 24;

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const selectedRegion = searchParams.get('region') || 'all';
  const selectedDomain = searchParams.get('domain') || 'all';
  const [currentPage, setCurrentPage] = useState(1);

  const [filtersOpen, setFiltersOpen] = useState(
    selectedRegion !== 'all' || selectedDomain !== 'all'
  );

  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedRegion, selectedDomain]);

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

  const totalPages = Math.ceil(filteredExpressions.length / PAGE_SIZE) || 1;
  const paginatedExpressions = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredExpressions.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredExpressions, currentPage]);

  const hasActiveFilter = searchQuery || selectedRegion !== 'all' || selectedDomain !== 'all';
  const activeRegionObj = selectedRegion !== 'all' ? getRegionById(selectedRegion) : null;
  const activeDomainObj = selectedDomain !== 'all' ? DOMAINS.find((d) => d.id === selectedDomain) : null;

  const startIndex = (currentPage - 1) * PAGE_SIZE + 1;
  const endIndex = Math.min(currentPage * PAGE_SIZE, filteredExpressions.length);

  return (
    <div className="explore-page">
      <div className="site-container">

        {/* Page Header */}
        <div className="explore-header">
          <div className="eyebrow" style={{ marginBottom: '8px' }}>
            <span className="eyebrow-rule" /> Regional Vocabulary Explorer · 525+ Expressions
          </div>
          <h1 className="explore-title">Explore Regional Kannada Words</h1>
          <p className="explore-subtitle">
            Search across our comprehensive archive of <strong>{EXPRESSIONS.length} verified regional expressions</strong>, culinary heritage terms, conversational idioms, and local metaphors across Karnataka.
          </p>
        </div>

        {/* Cross-Dialect Feature Teaser Banner */}
        <div className="cross-dialect-teaser-banner">
          <div className="teaser-content">
            <span className="teaser-pill">
              <Sparkles size={14} /> New Feature
            </span>
            <div className="teaser-text">
              <strong>Looking for one word across all dialects?</strong>
              <span>Compare how greetings, foods, feelings and daily phrases sound in North, Coastal, Mysuru, Central, Eastern and Kodagu dialects.</span>
            </div>
          </div>
          <Link to="/compare" className="teaser-action-btn">
            Open Dialect Comparator <ArrowRight size={15} />
          </Link>
        </div>

        {/* Search + filter toggle row */}
        <div className="explore-toolbar">
          <SearchBar
            key={searchQuery}
            initialValue={searchQuery}
            onSearch={handleSearch}
            autoNavigate={false}
            placeholder="Search a Kannada word or meaning (e.g. ಬ್ಯಾಡ್ರಿ, ಮಾರ್ರೆ, ರೊಟ್ಟಿ, ಮುದ್ದೆ, ಠಕ್ ಠಕ್)…"
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
                  All regions ({EXPRESSIONS.length})
                </button>
                {REGIONS.map((reg) => {
                  const regCount = EXPRESSIONS.filter((e) => e.regionId === reg.id).length;
                  return (
                    <button
                      key={reg.id}
                      type="button"
                      className={`filter-pill ${selectedRegion === reg.id ? 'active' : ''}`}
                      onClick={() => handleRegionSelect(reg.id)}
                    >
                      <span className="kannada-text">{reg.nameKn}</span>
                      <span className="pill-en">({reg.short} · {regCount})</span>
                    </button>
                  );
                })}
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
                {DOMAINS.map((dom) => {
                  const domCount = EXPRESSIONS.filter((e) => e.domain === dom.id).length;
                  return (
                    <button
                      key={dom.id}
                      type="button"
                      className={`filter-pill ${selectedDomain === dom.id ? 'active' : ''}`}
                      onClick={() => handleDomainSelect(dom.id)}
                    >
                      <span>{dom.nameEn}</span>
                      <span className="pill-en kannada-text" style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                        ({domCount})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Results summary bar */}
        <div className="active-filters-summary">
          <span className="summary-count">
            {filteredExpressions.length > 0 ? (
              <>
                Showing <strong>{startIndex}–{endIndex}</strong> of <strong>{filteredExpressions.length}</strong>{' '}
                {filteredExpressions.length === 1 ? 'expression' : 'expressions'}
              </>
            ) : (
              'No expressions found'
            )}
          </span>
          {hasActiveFilter && (
            <button type="button" className="clear-all-btn" onClick={clearAllFilters}>
              Reset all filters
            </button>
          )}
        </div>

        {/* Results grid or empty state */}
        {filteredExpressions.length > 0 ? (
          <>
            <div className="explore-grid">
              {paginatedExpressions.map((expr) => (
                <ExpressionCard key={expr.id} expression={expr} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination-controls">
                <button
                  type="button"
                  className="page-btn nav-btn"
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((p) => Math.max(p - 1, 1));
                    window.scrollTo({ top: 280, behavior: 'smooth' });
                  }}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} /> Prev
                </button>

                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                    .map((pageNum, idx, arr) => {
                      const prev = arr[idx - 1];
                      const showEllipsis = prev && pageNum - prev > 1;
                      return (
                        <React.Fragment key={pageNum}>
                          {showEllipsis && <span className="pagination-ellipsis">…</span>}
                          <button
                            type="button"
                            className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                            onClick={() => {
                              setCurrentPage(pageNum);
                              window.scrollTo({ top: 280, behavior: 'smooth' });
                            }}
                          >
                            {pageNum}
                          </button>
                        </React.Fragment>
                      );
                    })}
                </div>

                <button
                  type="button"
                  className="page-btn nav-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((p) => Math.min(p + 1, totalPages));
                    window.scrollTo({ top: 280, behavior: 'smooth' });
                  }}
                  aria-label="Next page"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
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
