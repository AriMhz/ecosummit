import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight } from 'lucide-react';
import type { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link
      to={`/travel-guide/${article.slug}`}
      className="group flex flex-col bg-white border border-[#E2DDD5] rounded-xl overflow-hidden hover:border-[#183E63]/40 transition-all duration-300 hover:shadow-sm"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE8E1]">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-3 left-3 bg-[#17201D]/80 backdrop-blur-sm text-[#F7F6F1] text-[11px] uppercase tracking-wider px-2.5 py-1 rounded">
          {article.category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-[#59615D] mb-2.5">
            <span>{article.publishedDate}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#183E63]" /> {article.readingTime}
            </span>
          </div>
          <h3 className="font-serif text-xl md:text-2xl text-[#17201D] mb-2 group-hover:text-[#183E63] transition-colors leading-snug">
            {article.title}
          </h3>
          <p className="text-sm text-[#59615D] line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-5 pt-3 border-t border-[#EFECE6] flex items-center justify-between">
          <span className="text-xs text-[#59615D]">
            By <strong className="text-[#17201D] font-medium">{article.author}</strong>
          </span>
          <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-[#183E63] group-hover:translate-x-1 transition-transform">
            Read Note <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};
