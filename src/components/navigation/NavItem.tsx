import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface NavItemProps {
  label: string;
  to?: string;
  hasMenu?: boolean;
  isOpen?: boolean;
  isActiveRoute?: boolean;
  isScrolled?: boolean;
  onMouseEnter?: () => void;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  label,
  to,
  hasMenu = false,
  isOpen = false,
  isActiveRoute = false,
  isScrolled = false,
  onMouseEnter,
  onClick,
}) => {
  const content = (
    <div className="relative flex items-center gap-1.5 py-2">
      <span
        className={`transition-colors duration-200 uppercase font-semibold text-[13px] tracking-wider ${
          isOpen
            ? 'text-[#E85D2A]'
            : isActiveRoute
            ? isScrolled
              ? 'text-[#E85D2A]'
              : 'text-white'
            : isScrolled
            ? 'text-[#2D3748] group-hover:text-[#E85D2A]'
            : 'text-white/85 group-hover:text-white'
        }`}
      >
        {label}
      </span>

      {hasMenu && (
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-[#E85D2A]' : ''
          } ${
            isOpen
              ? 'text-[#E85D2A]'
              : isScrolled
              ? 'text-[#718096] group-hover:text-[#E85D2A]'
              : 'text-white/70 group-hover:text-white'
          }`}
        />
      )}

      {/* Refined orange underline bar on hover / open, matching mockup */}
      <span
        className={`absolute -bottom-1 left-0 h-[2.5px] rounded-full transition-all duration-300 ${
          isOpen
            ? 'w-full bg-[#E85D2A]'
            : isActiveRoute
            ? isScrolled
              ? 'w-full bg-[#E85D2A]'
              : 'w-full bg-white'
            : 'w-0 group-hover:w-full bg-[#E85D2A]'
        }`}
      />
    </div>
  );

  const containerClasses =
    'group relative cursor-pointer text-[14px] font-medium tracking-[0.015em] select-none py-4 px-2.5 focus:outline-none';

  if (to && !hasMenu) {
    return (
      <Link
        to={to}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        className={containerClasses}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={containerClasses}
      aria-expanded={isOpen}
    >
      {content}
    </button>
  );
};
