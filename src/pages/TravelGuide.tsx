import React, { useState } from 'react';
import { articlesData } from '../data/articles';
import { ArticleCard } from '../components/cards/ArticleCard';
import { BookOpen, Filter } from 'lucide-react';

export const TravelGuide: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Seasons & Weather', 'Trek Planning', 'Fitness & Altitude', 'Equipment & Packing'];

  const filteredArticles = selectedCategory === 'All'
    ? articlesData
    : articlesData.filter((a) => a.category === selectedCategory);

  return (
    <div className="pt-28 md:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#183E63] mb-3">
            <BookOpen className="w-4 h-4" />
            <span>Field Notes & Planning</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#17201D] font-light leading-tight">
            The Nepal Travel Guide
          </h1>
          <p className="text-base sm:text-lg text-[#59615D] mt-4 font-light leading-relaxed">
            Essential preparation insights written by native mountain guides and wilderness medical advisors. Practical advice on weather, packing, altitude illness, and trail etiquette.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 pb-8 mb-8 border-b border-[#E2DDD5] overflow-x-auto no-scrollbar text-xs">
          <span className="flex items-center gap-1.5 text-[#59615D] uppercase tracking-wider font-semibold mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#183E63]" /> Topic:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#183E63] text-white'
                  : 'bg-white text-[#59615D] hover:bg-[#EAE8E1] border border-[#E2DDD5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};
