import React from 'react';
import { reviewsData } from '../data/reviews';
import { Quote, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Reviews: React.FC = () => {
  return (
    <div className="pt-28 md:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#183E63] mb-3">
            <Quote className="w-4 h-4" />
            <span>Traveller Perspectives</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#17201D] font-light leading-tight">
            Guest Travel Notes & Reviews
          </h1>
          <p className="text-base sm:text-lg text-[#59615D] mt-4 font-light leading-relaxed">
            Reflections and travel letters from foreign guests who have walked Himalayan paths with EcoSummit. Genuine, unedited, human feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {reviewsData.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#E2DDD5] rounded-xl p-8 flex flex-col justify-between shadow-xs hover:border-[#183E63]/30 transition-colors"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#F7F6F1] border border-[#E2DDD5] rounded text-[11px] text-[#26483D] font-medium mb-4">
                  <span>{rev.journey}</span>
                  <span>•</span>
                  <span className="text-[#59615D]">{rev.seasonYear}</span>
                </div>
                <blockquote className="font-serif text-lg sm:text-xl text-[#17201D] font-light leading-relaxed mb-6">
                  "{rev.content}"
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[#EFECE6] flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm text-[#17201D]">{rev.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#59615D]">
                    <Globe className="w-3.5 h-3.5 text-[#183E63]" />
                    <span>{rev.country}</span>
                  </div>
                </div>
                <span className="text-[10px] text-[#26483D] bg-[#26483D]/10 px-2 py-1 rounded">
                  {rev.source}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#F7F6F1] border border-[#E2DDD5] p-8 sm:p-12 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl text-[#17201D]">
              Ready to write your own Himalayan story?
            </h3>
            <p className="text-xs sm:text-sm text-[#59615D] mt-1">
              Start a conversation with our Kathmandu specialists.
            </p>
          </div>
          <Link
            to="/plan-your-trip"
            className="inline-flex items-center gap-1.5 px-6 py-3.5 bg-[#183E63] text-white text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-[#102942] transition-colors shrink-0"
          >
            Plan Your Nepal Trip <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
