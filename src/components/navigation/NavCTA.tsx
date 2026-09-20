import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface NavCTAProps {
  isScrolled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const NavCTA: React.FC<NavCTAProps> = ({ isScrolled = false, className = '', onClick }) => {
  return (
    <Link
      to="/plan-your-trip"
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 select-none ${
        isScrolled
          ? 'border border-[#E85D2A]/80 text-[#E85D2A] hover:bg-[#E85D2A] hover:text-white shadow-xs hover:shadow-md'
          : 'bg-white/15 hover:bg-[#E85D2A] text-white border border-white/40 hover:border-[#E85D2A] backdrop-blur-xs shadow-xs'
      } ${className}`}
    >
      <span>Plan Your Trip</span>
      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
};
