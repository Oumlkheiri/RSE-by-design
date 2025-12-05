'use client';

import { useState, useMemo } from 'react';
import ArticleCard from '@/components/article/ArticleCard';
import Filters from '@/components/article/Filters';
import SearchBar from '@/components/article/SearchBar';
import UserProgress, { trackExploration } from '@/components/article/UserProgress';
import articlesData from '@/data/articles.json';
import { Search } from 'lucide-react';

export default function ArticlesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<{
        theme: string[];
        impactLevel: string[];
        contentType: string[];
        dateRange: string[];
    }>({
        theme: [],
        impactLevel: [],
        contentType: [],
        dateRange: []
    });

    // RSE by Design: Impact level priority for beginner-friendly discovery
    const impactPriority: { [key: string]: number } = {
        'Beginner-friendly': 0,
        'Everyday Actions': 1,
        'High Impact Research': 2,
        'Expert Insights': 3
    };

    // Helper function to check date range
    const isInDateRange = (dateString : any, range : string) => {
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

    const handleFilterChange = (filterType : any, values : string[]) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: values
        }));
    };

    

    return (
        <div className="font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif] bg-[#120e0c] min-h-screen text-[#cec38c]">
            <div className="max-w-[1200px] mx-auto px-8">
                {/* RSE by Design Manifesto */}


                {/* Hero Section with User Progress */}
                <header className="flex justify-between items-center py-12 mb-8 md:flex-col md:text-center">
                    <div className="flex-1">
                        <h1 className="text-5xl font-bold text-[#07b549] mb-4 leading-tight md:text-3xl">Apprendre. Agir. Protéger.</h1>
                        <p className="text-lg text-[#cec38c] max-w-[500px]">Explorer un mode de vie durable avec la responsabilité numérique à lesprit.</p>
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
                <div className="mb-6">
                    <span className="text-sm text-[#cec38c]">
                        {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} trouvé{filteredArticles.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Article Cards */}
                <section className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8 md:grid-cols-1">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map(article => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-[#cec38c]">
                            <Search className="w-16 h-16 mx-auto mb-4 text-[#cec38c]" />
                            <h3>Aucun article trouvé</h3>
                            <p>Essayez dajuster vos filtres ou votre recherche.</p>
                        </div>
                    )}
                </section>

                {/* Footer */}
                <footer className="flex justify-between items-center py-8 mt-12 border-t-2 border-[#cec38c] text-sm text-[#cec38c] md:flex-col md:gap-4">
                    <p>Conçu pour un impact écologique réduit. Pas de traceurs. 2024 EcoConnect.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-[#cec38c] no-underline transition-colors hover:text-[#07b549]">Sources</a>
                        <a href="#" className="text-[#cec38c] no-underline transition-colors hover:text-[#07b549]">Confidentialité</a>
                        <a href="#" className="text-[#cec38c] no-underline transition-colors hover:text-[#07b549]">Contact</a>
                    </div>
                </footer>
            </div>
        </div>
    );
}