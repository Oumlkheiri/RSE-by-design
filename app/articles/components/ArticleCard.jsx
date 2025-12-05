'use client';

import Image from 'next/image';
import { categoryIcons, contentTypeIcons } from './constants';

export default function ArticleCard({ article, onExplore }) {
  const getCategoryIcon = (category) => {
    return categoryIcons[category] || '🌍';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleSeeMore = () => {
    if (onExplore) {
      onExplore(article.id);
    }
  };

  return (
    <article className="article-card">
      {/* Image Section */}
      <div className="article-image-container">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="article-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="article-image-fallback" style={{ display: article.image ? 'none' : 'flex' }}>
          {getCategoryIcon(article.category)}
        </div>
      </div>

      {/* Main Content */}
      <div className="article-content">
        {/* Category Badge */}
        <div className="article-badges">
          <span className="category-badge">{article.category}</span>
          {article.region && <span className="region-badge">🌍 {article.region}</span>}
        </div>

        {/* Title */}
        <h3 className="article-title">{article.title}</h3>

        {/* Description */}
        <p className="article-summary">{article.summary}</p>

        {/* Content Type & Date */}
        <div className="article-meta">
          <span className="meta-item">
            <span className="meta-icon">📄</span>
            {article.contentType}
          </span>
          <span className="meta-item">
            <span className="meta-icon">📅</span>
            {formatDate(article.publishedDate)}
          </span>
        </div>
      </div>

      {/* RSE by Design: Prominent Action Section */}
      <div className="eco-tip">
        <span className="eco-tip-icon">🌿</span>
        <div className="eco-tip-content">
          <p className="eco-tip-label">Votre Action</p>
          <p className="eco-tip-text">{article.action}</p>
        </div>
      </div>

      {/* Footer with link */}
      <div className="article-footer">
        <a
          href={article.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="see-more-btn"
          onClick={handleSeeMore}
        >
          Voir plus <span className="arrow">→</span>
        </a>
      </div>
    </article>
  );
}
