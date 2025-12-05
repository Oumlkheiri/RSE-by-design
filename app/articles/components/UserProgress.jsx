'use client';

import { useState, useEffect } from 'react';

export default function UserProgress() {
    const [stats, setStats] = useState({
        articlesExplored: 0,
        actionsApplied: 0,
        todayExplored: 0,
        points: 0
    });

    useEffect(() => {
        const loadStats = () => {
            try {
                const stored = localStorage.getItem('rse_user_stats');
                if (stored) {
                    const parsed = JSON.parse(stored);

                    // Check if todayExplored needs to be reset (new day)
                    const today = new Date().toDateString();
                    if (parsed.lastVisitDate !== today) {
                        parsed.todayExplored = 0;
                        parsed.lastVisitDate = today;
                        localStorage.setItem('rse_user_stats', JSON.stringify(parsed));
                    }

                    // Calculate points: 10 per article explored, 25 per action applied
                    parsed.points = (parsed.articlesExplored || 0) * 10 + (parsed.actionsApplied || 0) * 25;

                    setStats(parsed);
                } else {
                    const initialStats = {
                        articlesExplored: 0,
                        actionsApplied: 0,
                        todayExplored: 0,
                        points: 0,
                        exploredArticles: [],
                        appliedActions: [],
                        lastVisitDate: new Date().toDateString()
                    };
                    localStorage.setItem('rse_user_stats', JSON.stringify(initialStats));
                }
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        };

        loadStats();

        const handleStatsUpdate = () => loadStats();
        window.addEventListener('rse_stats_updated', handleStatsUpdate);

        return () => {
            window.removeEventListener('rse_stats_updated', handleStatsUpdate);
        };
    }, []);

    const getLevel = (points) => {
        if (points >= 500) return { name: 'Champion Écolo', icon: '🏆', color: '#ffd700' };
        if (points >= 250) return { name: 'Leader Vert', icon: '🌳', color: '#22c55e' };
        if (points >= 100) return { name: 'Gardien de la Terre', icon: '🌍', color: '#3b82f6' };
        if (points >= 50) return { name: 'Explorateur Écolo', icon: '🌱', color: '#84cc16' };
        return { name: 'Débutant', icon: '🌿', color: '#a7c4b5' };
    };

    const level = getLevel(stats.points);

    return (
        <div className="user-progress-card">
            <div className="progress-header">
                <span className="progress-level-icon" style={{ color: level.color }}>{level.icon}</span>
                <div className="progress-info">
                    <span className="progress-level-name" style={{ color: level.color }}>{level.name}</span>
                    <span className="progress-points">{stats.points} points</span>
                </div>
            </div>

            <div className="progress-stats">
                <div className="stat-item">
                    <span className="stat-value">{stats.articlesExplored}</span>
                    <span className="stat-label">Articles explorés</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                    <span className="stat-value">{stats.actionsApplied}</span>
                    <span className="stat-label">Actions appliquées</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                    <span className="stat-value">{stats.todayExplored}</span>
                    <span className="stat-label">Aujourdhui</span>
                </div>
            </div>

            {stats.todayExplored > 0 && (
                <div className="progress-message">
                    🌱 Bravo ! Vous avez exploré {stats.todayExplored} article{stats.todayExplored > 1 ? 's' : ''} aujourdhui !
                </div>
            )}
        </div>
    );
}

// Utility function to track article exploration
export function trackExploration(articleId) {
    try {
        const stored = localStorage.getItem('rse_user_stats');
        const stats = stored ? JSON.parse(stored) : {
            articlesExplored: 0,
            actionsApplied: 0,
            todayExplored: 0,
            exploredArticles: [],
            appliedActions: [],
            lastVisitDate: new Date().toDateString()
        };

        if (!stats.exploredArticles?.includes(articleId)) {
            stats.articlesExplored++;
            stats.todayExplored++;
            stats.exploredArticles = [...(stats.exploredArticles || []), articleId];
            localStorage.setItem('rse_user_stats', JSON.stringify(stats));

            window.dispatchEvent(new CustomEvent('rse_stats_updated'));
        }
    } catch (error) {
        console.error('Error tracking exploration:', error);
    }
}

// Utility function to track action applied
export function trackActionApplied(articleId) {
    try {
        const stored = localStorage.getItem('rse_user_stats');
        const stats = stored ? JSON.parse(stored) : {
            articlesExplored: 0,
            actionsApplied: 0,
            todayExplored: 0,
            exploredArticles: [],
            appliedActions: [],
            lastVisitDate: new Date().toDateString()
        };

        if (!stats.appliedActions?.includes(articleId)) {
            stats.actionsApplied++;
            stats.appliedActions = [...(stats.appliedActions || []), articleId];
            localStorage.setItem('rse_user_stats', JSON.stringify(stats));

            window.dispatchEvent(new CustomEvent('rse_stats_updated'));
        }
    } catch (error) {
        console.error('Error tracking action:', error);
    }
}
