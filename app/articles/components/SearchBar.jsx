'use client';

export default function SearchBar({ searchQuery, onSearchChange }) {
    return (
        <section className="search-section">
            <div className="search-wrapper">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    aria-label="Rechercher des articles"
                />
                {searchQuery && (
                    <button
                        className="search-clear"
                        onClick={() => onSearchChange('')}
                        aria-label="Effacer la recherche"
                    >
                        ✕
                    </button>
                )}
                <span className="search-icon">🔍</span>
            </div>
        </section>
    );
}
