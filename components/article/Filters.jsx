'use client';

import { useState } from 'react';
import { filterCategories, categoryIcons, impactIcons, contentTypeIcons } from './constants';
import { Globe, BarChart3, FileText, Calendar, X, Target } from 'lucide-react';

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
        <section className="mb-8">
            <div className="flex flex-wrap gap-2 items-center">
                {/* Theme Filter */}
                <div className="relative">
                    <button
                        className={`inline-flex items-center gap-1 px-4 py-2 bg-transparent border-2 rounded-full text-sm font-medium cursor-pointer transition-all font-inherit ${
                            openDropdown === 'theme' 
                                ? 'border-[#07b549] bg-[#07b549] text-white' 
                                : getActiveCount('theme') > 0
                                ? 'border-[#07b549] bg-[rgba(7,181,73,0.1)] text-[#07b549]'
                                : 'border-[#cec38c] text-[#cec38c] hover:border-[#07b549] hover:text-[#07b549] hover:bg-[rgba(7,181,73,0.1)]'
                        }`}
                        onClick={() => toggleDropdown('theme')}
                    >
                        <Globe className="w-4 h-4" /> Thème
                        {getActiveCount('theme') > 0 && (
                            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold ${
                                openDropdown === 'theme' ? 'bg-white text-[#07b549]' : 'bg-[#07b549] text-white'
                            }`}>
                                {getActiveCount('theme')}
                            </span>
                        )}
                        <span className={`text-[0.6rem] ml-1 transition-transform ${openDropdown === 'theme' ? 'rotate-180' : ''}`}>▼</span>
                    </button>

                    {openDropdown === 'theme' && (
                        <div className="absolute top-[calc(100%+8px)] left-0 min-w-[280px] max-h-[350px] overflow-y-auto bg-[#cec38c] border-2 border-[#120e0c] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-[100] opacity-0 translate-y-[-8px] animate-[fadeIn_0.2s_ease_forwards] md:min-w-[240px] md:left-auto md:right-0">
                            <div className="px-4 py-2 text-xs font-semibold text-[#120e0c] uppercase tracking-wide bg-[rgba(18,14,12,0.1)] border-b border-[rgba(18,14,12,0.2)] sticky top-0">Thèmes Environnementaux</div>
                            {filterCategories.theme.map(item => (
                                <label key={item} className="flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors hover:bg-[rgba(7,181,73,0.15)]">
                                    <input
                                        type="checkbox"
                                        className="w-[18px] h-[18px] accent-[#07b549] cursor-pointer flex-shrink-0"
                                        checked={filters.theme?.includes(item) || false}
                                        onChange={() => toggleFilter('theme', item)}
                                    />
                                    <span className="flex-shrink-0">
                                        {(() => {
                                            const Icon = categoryIcons[item] || GlobeIcon;
                                            return <Icon className="w-4 h-4" />;
                                        })()}
                                    </span>
                                    <span className="text-sm text-[#120e0c]">{item}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Impact Level Filter */}
                <div className="relative">
                    <button
                        className={`inline-flex items-center gap-1 px-4 py-2 bg-transparent border-2 rounded-full text-sm font-medium cursor-pointer transition-all font-inherit ${
                            openDropdown === 'impact' 
                                ? 'border-[#07b549] bg-[#07b549] text-white' 
                                : getActiveCount('impactLevel') > 0
                                ? 'border-[#07b549] bg-[rgba(7,181,73,0.1)] text-[#07b549]'
                                : 'border-[#cec38c] text-[#cec38c] hover:border-[#07b549] hover:text-[#07b549] hover:bg-[rgba(7,181,73,0.1)]'
                        }`}
                        onClick={() => toggleDropdown('impact')}
                    >
                        <BarChart3 className="w-4 h-4" /> Niveau d Impact
                        {getActiveCount('impactLevel') > 0 && (
                            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold ${
                                openDropdown === 'impact' ? 'bg-white text-[#07b549]' : 'bg-[#07b549] text-white'
                            }`}>
                                {getActiveCount('impactLevel')}
                            </span>
                        )}
                        <span className={`text-[0.6rem] ml-1 transition-transform ${openDropdown === 'impact' ? 'rotate-180' : ''}`}>▼</span>
                    </button>

                    {openDropdown === 'impact' && (
                        <div className="absolute top-[calc(100%+8px)] left-0 min-w-[280px] max-h-[350px] overflow-y-auto bg-[#cec38c] border-2 border-[#120e0c] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-[100] opacity-0 translate-y-[-8px] animate-[fadeIn_0.2s_ease_forwards] md:min-w-[240px] md:left-auto md:right-0">
                            <div className="px-4 py-2 text-xs font-semibold text-[#120e0c] uppercase tracking-wide bg-[rgba(18,14,12,0.1)] border-b border-[rgba(18,14,12,0.2)] sticky top-0">Choisir la complexité</div>
                            {filterCategories.impactLevel.map(item => (
                                <label key={item} className="flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors hover:bg-[rgba(7,181,73,0.15)]">
                                    <input
                                        type="checkbox"
                                        className="w-[18px] h-[18px] accent-[#07b549] cursor-pointer flex-shrink-0"
                                        checked={filters.impactLevel?.includes(item) || false}
                                        onChange={() => toggleFilter('impactLevel', item)}
                                    />
                                    <span className="flex-shrink-0">
                                        {(() => {
                                            const Icon = impactIcons[item] || Target;
                                            return <Icon className="w-4 h-4" />;
                                        })()}
                                    </span>
                                    <span className="text-sm text-[#120e0c]">{item}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content Type Filter */}
                <div className="relative">
                    <button
                        className={`inline-flex items-center gap-1 px-4 py-2 bg-transparent border-2 rounded-full text-sm font-medium cursor-pointer transition-all font-inherit ${
                            openDropdown === 'content' 
                                ? 'border-[#07b549] bg-[#07b549] text-white' 
                                : getActiveCount('contentType') > 0
                                ? 'border-[#07b549] bg-[rgba(7,181,73,0.1)] text-[#07b549]'
                                : 'border-[#cec38c] text-[#cec38c] hover:border-[#07b549] hover:text-[#07b549] hover:bg-[rgba(7,181,73,0.1)]'
                        }`}
                        onClick={() => toggleDropdown('content')}
                    >
                        <FileText className="w-4 h-4" /> Type de Contenu
                        {getActiveCount('contentType') > 0 && (
                            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold ${
                                openDropdown === 'content' ? 'bg-white text-[#07b549]' : 'bg-[#07b549] text-white'
                            }`}>
                                {getActiveCount('contentType')}
                            </span>
                        )}
                        <span className={`text-[0.6rem] ml-1 transition-transform ${openDropdown === 'content' ? 'rotate-180' : ''}`}>▼</span>
                    </button>

                    {openDropdown === 'content' && (
                        <div className="absolute top-[calc(100%+8px)] left-0 min-w-[280px] max-h-[350px] overflow-y-auto bg-[#cec38c] border-2 border-[#120e0c] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-[100] opacity-0 translate-y-[-8px] animate-[fadeIn_0.2s_ease_forwards] md:min-w-[240px] md:left-auto md:right-0">
                            <div className="px-4 py-2 text-xs font-semibold text-[#120e0c] uppercase tracking-wide bg-[rgba(18,14,12,0.1)] border-b border-[rgba(18,14,12,0.2)] sticky top-0">Type de Contenu</div>
                            {filterCategories.contentType.map(item => (
                                <label key={item} className="flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors hover:bg-[rgba(7,181,73,0.15)]">
                                    <input
                                        type="checkbox"
                                        className="w-[18px] h-[18px] accent-[#07b549] cursor-pointer flex-shrink-0"
                                        checked={filters.contentType?.includes(item) || false}
                                        onChange={() => toggleFilter('contentType', item)}
                                    />
                                    <span className="flex-shrink-0">
                                        {(() => {
                                            const Icon = contentTypeIcons[item] || FileText;
                                            return <Icon className="w-4 h-4" />;
                                        })()}
                                    </span>
                                    <span className="text-sm text-[#120e0c]">{item}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Date Filter */}
                <div className="relative">
                    <button
                        className={`inline-flex items-center gap-1 px-4 py-2 bg-transparent border-2 rounded-full text-sm font-medium cursor-pointer transition-all font-inherit ${
                            openDropdown === 'date' 
                                ? 'border-[#07b549] bg-[#07b549] text-white' 
                                : getActiveCount('dateRange') > 0
                                ? 'border-[#07b549] bg-[rgba(7,181,73,0.1)] text-[#07b549]'
                                : 'border-[#cec38c] text-[#cec38c] hover:border-[#07b549] hover:text-[#07b549] hover:bg-[rgba(7,181,73,0.1)]'
                        }`}
                        onClick={() => toggleDropdown('date')}
                    >
                        <Calendar className="w-4 h-4" /> Date
                        {getActiveCount('dateRange') > 0 && (
                            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold ${
                                openDropdown === 'date' ? 'bg-white text-[#07b549]' : 'bg-[#07b549] text-white'
                            }`}>
                                {getActiveCount('dateRange')}
                            </span>
                        )}
                        <span className={`text-[0.6rem] ml-1 transition-transform ${openDropdown === 'date' ? 'rotate-180' : ''}`}>▼</span>
                    </button>

                    {openDropdown === 'date' && (
                        <div className="absolute top-[calc(100%+8px)] left-0 min-w-[280px] max-h-[350px] overflow-y-auto bg-[#cec38c] border-2 border-[#120e0c] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-[100] opacity-0 translate-y-[-8px] animate-[fadeIn_0.2s_ease_forwards] md:min-w-[240px] md:left-auto md:right-0">
                            <div className="px-4 py-2 text-xs font-semibold text-[#120e0c] uppercase tracking-wide bg-[rgba(18,14,12,0.1)] border-b border-[rgba(18,14,12,0.2)] sticky top-0">Publié</div>
                            {filterCategories.dateRange.map(item => (
                                <label key={item} className="flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors hover:bg-[rgba(7,181,73,0.15)]">
                                    <input
                                        type="checkbox"
                                        className="w-[18px] h-[18px] accent-[#07b549] cursor-pointer flex-shrink-0"
                                        checked={filters.dateRange?.includes(item) || false}
                                        onChange={() => toggleFilter('dateRange', item)}
                                    />
                                    <span className="text-sm text-[#120e0c]">{item}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Clear All */}
                {hasActiveFilters && (
                    <button className="inline-flex items-center gap-1 px-4 py-2 bg-transparent border-2 border-[#cec38c] rounded-full text-[#cec38c] text-sm cursor-pointer transition-all font-inherit hover:border-[#c45c4c] hover:text-[#c45c4c]" onClick={clearAllFilters}>
                        <X className="w-4 h-4" /> Tout effacer
                    </button>
                )}
            </div>

            {/* Active Filters Tags */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {filters.theme?.map(tag => {
                        const Icon = categoryIcons[tag] || Globe;
                        return (
                            <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-[rgba(7,181,73,0.1)] border border-[#07b549] rounded-full text-sm text-[#07b549] cursor-pointer hover:bg-[rgba(7,181,73,0.2)]" onClick={() => toggleFilter('theme', tag)}>
                                <Icon className="w-3 h-3" /> {tag} <X className="w-3 h-3" />
                            </span>
                        );
                    })}
                    {filters.impactLevel?.map(tag => {
                        const Icon = impactIcons[tag] || Target;
                        return (
                            <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-[rgba(7,181,73,0.1)] border border-[#07b549] rounded-full text-sm text-[#07b549] cursor-pointer hover:bg-[rgba(7,181,73,0.2)]" onClick={() => toggleFilter('impactLevel', tag)}>
                                <Icon className="w-3 h-3" /> {tag} <X className="w-3 h-3" />
                            </span>
                        );
                    })}
                    {filters.contentType?.map(tag => {
                        const Icon = contentTypeIcons[tag] || FileText;
                        return (
                            <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-[rgba(7,181,73,0.1)] border border-[#07b549] rounded-full text-sm text-[#07b549] cursor-pointer hover:bg-[rgba(7,181,73,0.2)]" onClick={() => toggleFilter('contentType', tag)}>
                                <Icon className="w-3 h-3" /> {tag} <X className="w-3 h-3" />
                            </span>
                        );
                    })}
                    {filters.dateRange?.map(tag => (
                        <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-[rgba(7,181,73,0.1)] border border-[#07b549] rounded-full text-sm text-[#07b549] cursor-pointer hover:bg-[rgba(7,181,73,0.2)]" onClick={() => toggleFilter('dateRange', tag)}>
                            <Calendar className="w-3 h-3" /> {tag} <X className="w-3 h-3" />
                        </span>
                    ))}
                </div>
            )}
        </section>
    );
}