import React, { useState, useMemo } from 'react';

export function SearchAndFilters({ items, onSearch, onFilter }) {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    tags: [],
    moods: [],
    source: ''
  });

  const allTags = useMemo(() => {
    const tagSet = new Set();
    items.forEach(item => {
      item.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [items]);

  const allMoods = useMemo(() => {
    const moodSet = new Set();
    items.forEach(item => {
      item.moods?.forEach(mood => moodSet.add(mood));
    });
    return Array.from(moodSet).sort();
  }, [items]);

  const allTypes = useMemo(() => {
    const typeSet = new Set();
    items.forEach(item => typeSet.add(item.type));
    return Array.from(typeSet).sort();
  }, [items]);

  const allSources = useMemo(() => {
    const sourceSet = new Set();
    items.forEach(item => item.source && sourceSet.add(item.source));
    return Array.from(sourceSet).sort();
  }, [items]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value.toLowerCase());
  };

  const handleFilterChange = (filterType, value) => {
    let updatedFilters;

    if (filterType === 'tags' || filterType === 'moods') {
      if (selectedFilters[filterType].includes(value)) {
        updatedFilters = {
          ...selectedFilters,
          [filterType]: selectedFilters[filterType].filter(item => item !== value)
        };
      } else {
        updatedFilters = {
          ...selectedFilters,
          [filterType]: [...selectedFilters[filterType], value]
        };
      }
    } else {
      updatedFilters = {
        ...selectedFilters,
        [filterType]: value
      };
    }

    setSelectedFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const clearFilters = () => {
    setSearchText('');
    setSelectedFilters({
      type: '',
      tags: [],
      moods: [],
      source: ''
    });
    onSearch('');
    onFilter({
      type: '',
      tags: [],
      moods: [],
      source: ''
    });
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedFilters.type) count++;
    if (selectedFilters.tags.length > 0) count++;
    if (selectedFilters.moods.length > 0) count++;
    if (selectedFilters.source) count++;
    return count;
  }, [selectedFilters]);

  return (
    <aside className="filters-sidebar" aria-labelledby="filters-heading">
      <h2 id="filters-heading">Search & Filters</h2>

      <div className="filter-section">
        <label htmlFor="search-input">Search</label>
        <input
          id="search-input"
          type="text"
          placeholder="Search by title, artist, notes..."
          value={searchText}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {allTypes.length > 0 && (
        <div className="filter-section">
          <legend>Type</legend>
          <div className="filter-options">
            <button
              type="button"
              onClick={() => handleFilterChange('type', '')}
              className={`filter-button ${selectedFilters.type === '' ? 'active' : ''}`}
            >
              All Types
            </button>
            {allTypes.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => handleFilterChange('type', type)}
                className={`filter-button ${selectedFilters.type === type ? 'active' : ''}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {allSources.length > 0 && (
        <div className="filter-section">
          <label htmlFor="source-filter">Source</label>
          <select
            id="source-filter"
            value={selectedFilters.source}
            onChange={(e) => handleFilterChange('source', e.target.value)}
            className="filter-select"
          >
            <option value="">All Sources</option>
            {allSources.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>
      )}

      {allTags.length > 0 && (
        <div className="filter-section">
          <legend>Tags</legend>
          <div className="filter-options">
            {allTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => handleFilterChange('tags', tag)}
                className={`filter-tag ${selectedFilters.tags.includes(tag) ? 'active' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {allMoods.length > 0 && (
        <div className="filter-section">
          <legend>Moods</legend>
          <div className="filter-options">
            {allMoods.map(mood => (
              <button
                key={mood}
                type="button"
                onClick={() => handleFilterChange('moods', mood)}
                className={`filter-mood ${selectedFilters.moods.includes(mood) ? 'active' : ''}`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={clearFilters}
          className="clear-filters-button"
        >
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </aside>
  );
}