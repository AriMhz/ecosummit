import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { articlesData } from '../data/articles';
import { Clock, ArrowLeft, ArrowRight, User } from 'lucide-react';

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articlesData.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/travel-guide" replace />;
  }

  return (
    <div className="pt-28 md:pt-36 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/travel-guide"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#183E63] hover:text-[#17201D] mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Travel Guide
        </Link>

        {/* Article Header */}
        <div className="space-y-4 mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#26483D] block">
            {article.category}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#17201D] font-light leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#59615D] pt-2 border-b border-[#E2DDD5] pb-6">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#183E63]" />
              <span>
                By <strong className="text-[#17201D]">{article.author}</strong> ({article.authorRole})
              </span>
            </div>
            <span>•</span>
            <span>{article.publishedDate}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#183E63]" />
              <span>{article.readingTime}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-sm border border-[#E2DDD5] bg-[#EAE8E1]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Excerpt Lead */}
        <p className="font-serif text-xl sm:text-2xl text-[#17201D] italic font-light leading-relaxed mb-10 pb-8 border-b border-[#E2DDD5]">
          "{article.excerpt}"
        </p>

        {/* Article Body */}
        <div className="space-y-10 text-sm sm:text-base text-[#17201D] leading-relaxed">
          {article.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              {section.heading && (
                <h2 className="font-serif text-2xl sm:text-3xl text-[#17201D] pt-4">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-[#59615D] leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-8 border-t border-[#E2DDD5] bg-white p-8 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-xl text-[#17201D]">
              Have questions about your travel plans?
            </h4>
            <p className="text-xs text-[#59615D] mt-1">
              Our local team in Kathmandu can advise on route choices, gear, and current trail conditions.
            </p>
          </div>
          <Link
            to="/plan-your-trip"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#183E63] text-white text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-[#102942] transition-colors shrink-0"
          >
            Plan Your Journey <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
