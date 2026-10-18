import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import './SearchBar.css';

export default function SearchBar({
  initialValue = '',
  placeholder = 'ಪದ ಅಥವಾ ಅರ್ಥ ಹುಡುಕಿ... Search by Kannada word or English meaning (e.g. ಬ್ಯಾಡ್ರಿ, friend)',
  onSearch = null,
  autoNavigate = true,
  className = ''
}) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (onSearch) {
      onSearch(trimmed);
    } else if (autoNavigate) {
      navigate(`/explore?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form className={`search-bar-form ${className}`} onSubmit={handleSubmit} role="search">
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          type="search"
          className="search-input kannada-text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          aria-label="Search Kannada expressions and meanings"
        />
        {searchTerm && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
            aria-label="Clear search query"
          >
            ✕
          </button>
        )}
      </div>
      <Button type="submit" variant="primary" size="md">
        ಹುಡುಕಿ (Search)
      </Button>
    </form>
  );
}
