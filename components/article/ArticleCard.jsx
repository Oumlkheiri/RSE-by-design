'use client';

import Image from 'next/image';
import { categoryIcons, contentTypeIcons } from './constants';
import { Globe, FileText, Calendar, Leaf } from 'lucide-react';

export default function ArticleCard({ article, onExplore }) {
  const getCategoryIcon = (category) => {
    const Icon = categoryIcons[category] || Globe;
    return <Icon className="w-16 h-16" />;
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
    <article className="bg-[#cec38c] border-none rounded-[20px] overflow-hidden transition-all flex flex-col hover:shadow-[0_12px_40px_rgba(7,181,73,0.3)] hover:-translate-y-1.5">
      {/* Image Section */}
      <div className="w-full h-[180px] relative overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-[rgba(18,14,12,0.1)] to-[rgba(18,14,12,0.2)]" style={{ display: article.image ? 'none' : 'flex' }}>
          {getCategoryIcon(article.category)}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Category Badge */}
        <div className="flex gap-1 flex-wrap mb-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[0.7rem] font-semibold text-[#cec38c] bg-[#07b549]">{article.category}</span>
          {article.region && <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[0.7rem] font-medium text-[#120e0c] bg-[rgba(18,14,12,0.15)]"><Globe className="w-3 h-3" /> {article.region}</span>}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[#120e0c] mb-1 leading-tight">{article.title}</h3>

        {/* Description */}
        <p className="text-sm text-[#2a2520] leading-relaxed mb-4 line-clamp-3">{article.summary}</p>

        {/* Content Type & Date */}
        <div className="flex flex-wrap gap-4 mt-auto">
          <span className="inline-flex items-center gap-1 text-xs text-[#4a4540]">
            {(() => {
              const Icon = contentTypeIcons[article.contentType] || FileText;
              return <Icon className="w-3 h-3" />;
            })()}
            {article.contentType}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-[#4a4540]">
            <Calendar className="w-3 h-3" />
            {formatDate(article.publishedDate)}
          </span>
        </div>
      </div>

      {/* RSE by Design: Prominent Action Section */}
      <div className="flex items-start gap-2 px-6 py-4 bg-[rgba(18,14,12,0.15)] border-t-2 border-[rgba(7,181,73,0.3)]">
        <Leaf className="w-5 h-5 text-[#07b549] mt-0.5" />
        <div className="flex-1">
          <p className="text-xs font-semibold text-[#07b549] mb-0.5">Votre Action</p>
          <p className="text-sm text-[#2a2520] leading-snug">{article.action}</p>
        </div>
      </div>

      {/* Footer with link */}
      <div className="flex justify-end items-center px-6 py-4 border-t border-[rgba(18,14,12,0.15)]">
        <a
          href={article.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-4 py-1 bg-[#07b549] border-none rounded-lg text-[#120e0c] text-sm font-semibold no-underline cursor-pointer transition-all font-inherit hover:bg-[#2fcf66] hover:text-[#120e0c] hover:scale-105"
          onClick={handleSeeMore}
        >
          Voir plus <span className="transition-transform hover:translate-x-1">→</span>
        </a>
      </div>
    </article>
  );
}