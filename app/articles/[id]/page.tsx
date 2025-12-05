'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { categoryIcons, contentTypeIcons } from '@/components/article/constants';
import articlesData from '@/data/articles.json';
import { FileText, Globe, Dumbbell, BookOpen, ArrowLeft, Check } from 'lucide-react';

interface Article {
    id: number;
    title: string;
    category: string;
    summary: string;
    action: string;
    officialUrl: string;
    impactLevel: string;
    contentType: string;
}

export default function ArticleDetailPage() {
    const params = useParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [actionApplied, setActionApplied] = useState(false);
    const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

    useEffect(() => {
        const id = params.id;
        if (!id || Array.isArray(id)) return;
        
        const articleId = parseInt(id);
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
            setActionApplied(true);
        }
    };

    const getCategoryClass = (category: string): string => {
        const categoryMap: Record<string, string> = {
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
            <div className="font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif] bg-[#120e0c] min-h-screen text-[#cec38c]">
                <div className="max-w-[1200px] mx-auto px-8 py-12">
                    <Link href="/articles" className="inline-flex items-center gap-2 text-[#cec38c] no-underline mb-8 hover:text-[#07b549] transition-colors">
                        ← Retour aux articles
                    </Link>
                    <div className="text-center py-12">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-[#cec38c]" />
                        <h3 className="text-2xl font-semibold text-[#cec38c] mb-2">Article non trouvé</h3>
                        <p className="text-[#cec38c]">Cet article n'existe pas ou a été supprimé.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif] bg-[#120e0c] min-h-screen text-[#cec38c]">
            <div className="max-w-[1200px] mx-auto px-8 py-12">
                <Link href="/articles" className="inline-flex items-center gap-2 text-[#cec38c] no-underline mb-8 hover:text-[#07b549] transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Retour aux articles
                </Link>

                {/* Hero Image */}
                <div className="relative w-full h-[400px] rounded-[20px] overflow-hidden mb-8">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[rgba(18,14,12,0.1)] to-[rgba(18,14,12,0.2)]">
                        {(() => {
                            const Icon = categoryIcons[article.category] || Globe;
                            return <Icon className="w-32 h-32 text-[#cec38c]" />;
                        })()}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120e0c] via-[rgba(18,14,12,0.7)] to-transparent flex flex-col justify-end p-8">
                        <h1 className="text-4xl font-bold text-[#cec38c] mb-4 md:text-2xl">{article.title}</h1>
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-[#cec38c] bg-[#07b549]">
                                {article.category}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-[#120e0c] bg-[rgba(18,14,12,0.15)]">
                                {article.impactLevel}
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-[#120e0c] bg-[rgba(18,14,12,0.15)]">
                                {(() => {
                                    const Icon = contentTypeIcons[article.contentType] || FileText;
                                    return <Icon className="w-3 h-3" />;
                                })()}
                                {article.contentType}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-[#cec38c] rounded-[20px] p-8 mb-8">
                    <p className="text-lg text-[#120e0c] mb-6 leading-relaxed">{article.summary}</p>

                    <p className="text-[#2a2520] leading-relaxed">
                        Cet article provient d'une source officielle et fiable. Nous vous encourageons
                        à consulter l'article complet pour approfondir vos connaissances sur ce sujet
                        environnemental important. Chaque action compte pour préserver notre planète.
                    </p>
                </div>

                {/* Action Section */}
                <div className="bg-[#cec38c] rounded-[20px] p-8 mb-8 border-t-2 border-[#07b549]">
                    <h3 className="text-xl font-semibold text-[#120e0c] mb-4 inline-flex items-center gap-2">
                        <Dumbbell className="w-5 h-5" /> Ce que vous pouvez faire
                    </h3>
                    <p className="text-[#2a2520] mb-6">{article.action}</p>
                    <button
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                            actionApplied 
                                ? 'bg-[#07b549] text-[#120e0c] cursor-not-allowed' 
                                : 'bg-[#07b549] text-[#120e0c] hover:bg-[#2fcf66] hover:scale-105'
                        }`}
                        onClick={handleApplyAction}
                        disabled={actionApplied}
                    >
                        {actionApplied ? (
                            <>
                                <Check className="w-4 h-4" /> Action appliquée !
                            </>
                        ) : (
                            "J'ai appliqué cette action"
                        )}
                    </button>
                </div>

                {/* Buttons */}
                <div className="mb-12">
                    <a
                        href={article.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#07b549] text-[#120e0c] font-semibold rounded-lg no-underline hover:bg-[#2fcf66] transition-all hover:scale-105"
                    >
                        Lire l'article complet <span className="inline-block">↗</span>
                    </a>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <div className="mt-12">
                        <h3 className="text-[#120e0c] mb-6 text-xl font-semibold bg-[#cec38c] p-4 rounded-lg inline-flex items-center gap-2">
                            <BookOpen className="w-5 h-5" /> Articles similaires
                        </h3>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8 md:grid-cols-1">
                            {relatedArticles.map(related => (
                                <Link
                                    key={related.id}
                                    href={`/articles/${related.id}`}
                                    className="no-underline"
                                >
                                    <article className="bg-[#cec38c] rounded-[20px] overflow-hidden transition-all hover:shadow-[0_12px_40px_rgba(7,181,73,0.3)] hover:-translate-y-1.5 flex flex-col">
                                        <div className="w-full h-[120px] flex items-center justify-center bg-gradient-to-br from-[rgba(18,14,12,0.1)] to-[rgba(18,14,12,0.2)]">
                                            {(() => {
                                                const Icon = categoryIcons[related.category] || Globe;
                                                return <Icon className="w-12 h-12 text-[#120e0c]" />;
                                            })()}
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h4 className="text-base font-semibold text-[#120e0c] m-0 leading-tight">
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