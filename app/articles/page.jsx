'use client';

import { useState, useMemo } from 'react';
import './articles.css';
import ArticleCard from './components/ArticleCard';
import Filters from './components/Filters';
import SearchBar from './components/SearchBar';
import UserProgress, { trackExploration } from './components/UserProgress';
import articlesData from '../../data/articles.json';

export default function ArticlesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        theme: [],
        impactLevel: [],
        contentType: [],
        dateRange: []
    });

    // RSE by Design: Impact level priority for beginner-friendly discovery
    const impactPriority = {
        'Beginner-friendly': 0,
        'Everyday Actions': 1,
        'High Impact Research': 2,
        'Expert Insights': 3
    };

    // Helper function to check date range
    const isInDateRange = (dateString, range) => {
        const articleDate = new Date(dateString);
        const now = new Date();

        switch (range) {
            case 'Latest':
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                return articleDate >= weekAgo;
            case 'This Week':
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - now.getDay());
                return articleDate >= startOfWeek;
            case 'This Month':
                return articleDate.getMonth() === now.getMonth() &&
                    articleDate.getFullYear() === now.getFullYear();
            case 'This Year':
                return articleDate.getFullYear() === now.getFullYear();
            default:
                return true;
        }
    };

    // Filter, search and sort articles - RSE by Design: Beginner-friendly first
    const filteredArticles = useMemo(() => {
        const filtered = articlesData.filter(article => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = !searchQuery ||
                article.title.toLowerCase().includes(searchLower) ||
                article.summary.toLowerCase().includes(searchLower) ||
                article.category.toLowerCase().includes(searchLower);

            const matchesTheme = filters.theme.length === 0 ||
                filters.theme.includes(article.category);

            const matchesImpact = filters.impactLevel.length === 0 ||
                filters.impactLevel.includes(article.impactLevel);

            const matchesContentType = filters.contentType.length === 0 ||
                filters.contentType.includes(article.contentType);

            const matchesDate = filters.dateRange.length === 0 ||
                filters.dateRange.some(range => isInDateRange(article.publishedDate, range));

            return matchesSearch && matchesTheme && matchesImpact && matchesContentType && matchesDate;
        });

        // Sort by impact level priority (beginner-friendly first)
        return filtered.sort((a, b) =>
            (impactPriority[a.impactLevel] ?? 99) - (impactPriority[b.impactLevel] ?? 99)
        );
    }, [searchQuery, filters]);

    const handleFilterChange = (filterType, values) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: values
        }));
    };

    const handleExplore = (articleId) => {
        trackExploration(articleId);
    };

    return (
        <div className="articles-page">
            <div className="articles-container">
                {/* RSE by Design Manifesto */}


                {/* Hero Section with User Progress */}
                <header className="articles-hero">
                    <div className="hero-content">
                        <h1>Apprendre. Agir. Protéger.</h1>
                        <p>Explorer un mode de vie durable avec la responsabilité numérique à lesprit.</p>
                    </div>
                    <div className="hero-right">
                        <UserProgress />
                    </div>
                </header>



                {/* Search Box */}
                <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                {/* Filters by Category */}
                <Filters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />

                {/* Results Count */}
                <div className="results-info">
                    <span className="results-count">
                        {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} trouvé{filteredArticles.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Article Cards */}
                <section className="articles-grid">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map(article => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                onExplore={handleExplore}
                            />
                        ))
                    ) : (
                        <div className="no-results">
                            <div className="no-results-icon">🔍</div>
                            <h3>Aucun article trouvé</h3>
                            <p>Essayez dajuster vos filtres ou votre recherche.</p>
                        </div>
                    )}
                </section>

                {/* Footer */}
                <footer className="page-footer">
                    <p>Conçu pour un impact écologique réduit. Pas de traceurs. 2024 EcoConnect.</p>
                    <div className="footer-links">
                        <a href="#">Sources</a>
                        <a href="#">Confidentialité</a>
                        <a href="#">Contact</a>
                    </div>
                </footer>
            </div>
        </div>
    );
}
