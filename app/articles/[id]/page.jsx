'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import '../articles.css';
import { categoryIcons, contentTypeIcons } from '../components/constants';
import { trackActionApplied } from '../components/UserProgress';
import articlesData from '../../../data/articles.json';

export default function ArticleDetailPage() {
    const params = useParams();
    const [article, setArticle] = useState(null);
    const [actionApplied, setActionApplied] = useState(false);
    const [relatedArticles, setRelatedArticles] = useState([]);

    useEffect(() => {
        const articleId = parseInt(params.id);
        const foundArticle = articlesData.find(a => a.id === articleId);

        if (foundArticle) {
            setArticle(foundArticle);

            // Find related articles (same category, excluding current)
            const related = articlesData
                .filter(a => a.category === foundArticle.category && a.id !== articleId)
                .slice(0, 3);
            setRelatedArticles(related);

            // Check if action was already applied
            try {
                const stored = localStorage.getItem('rse_user_stats');
                if (stored) {
                    const stats = JSON.parse(stored);
                    if (stats.appliedActions?.includes(articleId)) {
                        setActionApplied(true);
                    }
                }
            } catch (error) {
                console.error('Error checking action status:', error);
            }
        }
    }, [params.id]);

    const handleApplyAction = () => {
        if (!actionApplied && article) {
            trackActionApplied(article.id);
            setActionApplied(true);
        }
    };

    const getCategoryClass = (category) => {
        const categoryMap = {
            'Climat': 'climate',
            'Eau': 'water',
            'Préservation de l\'eau': 'water',
            'Énergie': 'energy',
            'Énergie renouvelable': 'energy',
            'Recyclage': 'recycling',
            'Recyclage & Déchets': 'recycling',
            'Biodiversité': 'biodiversity',
            'Biodiversité & Faune': 'biodiversity',
            'Pollution': 'pollution',
            'Pollution & Qualité de l\'air': 'pollution',
            'Green Tech': 'green-tech',
            'Technologie verte': 'green-tech',
            'Agriculture': 'agriculture',
            'Agriculture & Alimentation': 'agriculture',
            'Villes durables': 'climate'
        };
        return categoryMap[category] || 'climate';
    };

    if (!article) {
        return (
            <div className="articles-page">
                <div className="article-detail">
                    <Link href="/Articles" className="back-link">
                        ← Retour aux articles
                    </Link>
                    <div className="no-results">
                        <div className="no-results-icon">📄</div>
                        <h3>Article non trouvé</h3>
                        <p>Cet article n'existe pas ou a été supprimé.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="articles-page">
            <div className="article-detail">
                <Link href="/Articles" className="back-link">
                    ← Retour aux articles
                </Link>

                {/* Hero Image */}
                <div className="detail-hero">
                    <div className="article-image-placeholder" style={{ height: '100%', fontSize: '8rem' }}>
                        {categoryIcons[article.category] || '🌍'}
                    </div>
                    <div className="detail-hero-overlay">
                        <h1 className="detail-title">{article.title}</h1>
                        <div className="detail-badges">
                            <span className={`category-badge ${getCategoryClass(article.category)}`}>
                                {article.category}
                            </span>
                            <span className="impact-badge">{article.impactLevel}</span>
                            <span className="content-type">
                                {contentTypeIcons[article.contentType]} {article.contentType}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="detail-content">
                    <p className="detail-summary">{article.summary}</p>

                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        Cet article provient d'une source officielle et fiable. Nous vous encourageons
                        à consulter l'article complet pour approfondir vos connaissances sur ce sujet
                        environnemental important. Chaque action compte pour préserver notre planète.
                    </p>
                </div>

                {/* Action Section */}
                <div className="action-section">
                    <h3 className="action-title">
                        💪 Ce que vous pouvez faire
                    </h3>
                    <p className="action-text">{article.action}</p>
                    <button
                        className={`action-applied-btn ${actionApplied ? 'applied' : ''}`}
                        onClick={handleApplyAction}
                        disabled={actionApplied}
                    >
                        {actionApplied ? '✓ Action appliquée !' : "J'ai appliqué cette action"}
                    </button>
                </div>

                {/* Buttons */}
                <div className="detail-buttons">
                    <a
                        href={article.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="read-full-btn"
                    >
                        Lire l'article complet <span>↗</span>
                    </a>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <div style={{ marginTop: 'var(--spacing-2xl)' }}>
                        <h3 style={{
                            color: 'var(--text-primary)',
                            marginBottom: 'var(--spacing-lg)',
                            fontSize: '1.25rem'
                        }}>
                            📚 Articles similaires
                        </h3>
                        <div className="articles-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                            {relatedArticles.map(related => (
                                <Link
                                    key={related.id}
                                    href={`/Articles/${related.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <article className="article-card">
                                        <div className="article-image-wrapper" style={{ height: '120px' }}>
                                            <div className="article-image-placeholder" style={{ fontSize: '2.5rem' }}>
                                                {categoryIcons[related.category] || '🌍'}
                                            </div>
                                        </div>
                                        <div className="article-content">
                                            <h4 className="article-title" style={{ fontSize: '1rem' }}>
                                                {related.title}
                                            </h4>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
