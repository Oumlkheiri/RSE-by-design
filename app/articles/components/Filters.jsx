'use client';

import { useState } from 'react';
import { filterCategories, categoryIcons, impactIcons, contentTypeIcons } from './constants';

export default function Filters({ filters, onFilterChange }) {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    const toggleFilter = (filterType, value) => {
        const currentValues = filters[filterType] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];

        onFilterChange(filterType, newValues);
    };

    const getActiveCount = (filterType) => {
        return filters[filterType]?.length || 0;
    };

    const clearAllFilters = () => {
        onFilterChange('theme', []);
        onFilterChange('impactLevel', []);
        onFilterChange('contentType', []);
        onFilterChange('dateRange', []);
    };

    const hasActiveFilters = Object.values(filters).some(arr => arr && arr.length > 0);

    return (
        <section className="filters-section">
            <div className="filter-buttons-row">
                {/* Theme Filter */}
                <div className="filter-dropdown-container">
                    <button
                        className={`filter-dropdown-btn ${openDropdown === 'theme' ? 'open' : ''} ${getActiveCount('theme') > 0 ? 'has-active' : ''}`}
                        onClick={() => toggleDropdown('theme')}
                    >
                        🌍 Thème
                        {getActiveCount('theme') > 0 && <span className="filter-count">{getActiveCount('theme')}</span>}
                        <span className="dropdown-arrow">▼</span>
                    </button>

                    {openDropdown === 'theme' && (
                        <div className="filter-dropdown-menu">
                            <div className="dropdown-header">Thèmes Environnementaux</div>
                            {filterCategories.theme.map(item => (
                                <label key={item} className="filter-option">
                                    <input
                                        type="checkbox"
                                        checked={filters.theme?.includes(item) || false}
                                        onChange={() => toggleFilter('theme', item)}
                                    />
                                    <span className="option-icon">{categoryIcons[item] || '🌱'}</span>
                                    <span className="option-text">{item}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Impact Level Filter */}
                <div className="filter-dropdown-container">
                    <button
                        className={`filter-dropdown-btn ${openDropdown === 'impact' ? 'open' : ''} ${getActiveCount('impactLevel') > 0 ? 'has-active' : ''}`}
                        onClick={() => toggleDropdown('impact')}
                    >
                        📊 Niveau d Impact
                        {getActiveCount('impactLevel') > 0 && <span className="filter-count">{getActiveCount('impactLevel')}</span>}
                        <span className="dropdown-arrow">▼</span>
                    </button>

                    {openDropdown === 'impact' && (
                        <div className="filter-dropdown-menu">
                            <div className="dropdown-header">Choisir la complexité</div>
                            {filterCategories.impactLevel.map(item => (
                                <label key={item} className="filter-option">
                                    <input
                                        type="checkbox"
                                        checked={filters.impactLevel?.includes(item) || false}
                                        onChange={() => toggleFilter('impactLevel', item)}
                                    />
                                    <span className="option-icon">{impactIcons[item] || '📌'}</span>
                                    <span className="option-text">{item}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content Type Filter */}
                <div className="filter-dropdown-container">
                    <button
                        className={`filter-dropdown-btn ${openDropdown === 'content' ? 'open' : ''} ${getActiveCount('contentType') > 0 ? 'has-active' : ''}`}
                        onClick={() => toggleDropdown('content')}
                    >
                        📑 Type de Contenu
                        {getActiveCount('contentType') > 0 && <span className="filter-count">{getActiveCount('contentType')}</span>}
                        <span className="dropdown-arrow">▼</span>
                    </button>

                    {openDropdown === 'content' && (
                        <div className="filter-dropdown-menu">
                            <div className="dropdown-header">Type de Contenu</div>
                            {filterCategories.contentType.map(item => (
                                <label key={item} className="filter-option">
                                    <input
                                        type="checkbox"
                                        checked={filters.contentType?.includes(item) || false}
                                        onChange={() => toggleFilter('contentType', item)}
                                    />
                                    <span className="option-icon">{contentTypeIcons[item] || '📄'}</span>
                                    <span className="option-text">{item}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Date Filter */}
                <div className="filter-dropdown-container">
                    <button
                        className={`filter-dropdown-btn ${openDropdown === 'date' ? 'open' : ''} ${getActiveCount('dateRange') > 0 ? 'has-active' : ''}`}
                        onClick={() => toggleDropdown('date')}
                    >
                        📅 Date
                        {getActiveCount('dateRange') > 0 && <span className="filter-count">{getActiveCount('dateRange')}</span>}
                        <span className="dropdown-arrow">▼</span>
                    </button>

                    {openDropdown === 'date' && (
                        <div className="filter-dropdown-menu">
                            <div className="dropdown-header">Publié</div>
                            {filterCategories.dateRange.map(item => (
                                <label key={item} className="filter-option">
                                    <input
                                        type="checkbox"
                                        checked={filters.dateRange?.includes(item) || false}
                                        onChange={() => toggleFilter('dateRange', item)}
                                    />
                                    <span className="option-text">{item}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Clear All */}
                {hasActiveFilters && (
                    <button className="clear-all-btn" onClick={clearAllFilters}>
                        ✕ Tout effacer
                    </button>
                )}
            </div>

            {/* Active Filters Tags */}
            {hasActiveFilters && (
                <div className="active-filters-tags">
                    {filters.theme?.map(tag => (
                        <span key={tag} className="filter-tag theme" onClick={() => toggleFilter('theme', tag)}>
                            {categoryIcons[tag]} {tag} ✕
                        </span>
                    ))}
                    {filters.impactLevel?.map(tag => (
                        <span key={tag} className="filter-tag impact" onClick={() => toggleFilter('impactLevel', tag)}>
                            {impactIcons[tag]} {tag} ✕
                        </span>
                    ))}
                    {filters.contentType?.map(tag => (
                        <span key={tag} className="filter-tag content" onClick={() => toggleFilter('contentType', tag)}>
                            {contentTypeIcons[tag]} {tag} ✕
                        </span>
                    ))}
                    {filters.dateRange?.map(tag => (
                        <span key={tag} className="filter-tag date" onClick={() => toggleFilter('dateRange', tag)}>
                            📅 {tag} ✕
                        </span>
                    ))}
                </div>
            )}
        </section>
    );
}
