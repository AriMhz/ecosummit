import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { NavItem } from './NavItem';
import { NavCTA } from './NavCTA';
import { MegaMenu } from './MegaMenu';
import { TreksMegaMenu } from './TreksMegaMenu';
import { ToursMegaMenu } from './ToursMegaMenu';
import { ExpeditionsMegaMenu } from './ExpeditionsMegaMenu';
import { DestinationsMegaMenu } from './DestinationsMegaMenu';
import { AboutDropdown } from './AboutDropdown';
import logoImg from '../../assets/logo.png';

interface DesktopNavProps {
  isScrolled: boolean;
  activeMenu: string | null;
  onMenuEnter: (menu: string) => void;
  onMenuLeave: () => void;
  onMenuKeepOpen: () => void;
  onCloseMenu: () => void;
  mobileMenuButton?: React.ReactNode;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({
  isScrolled,
  activeMenu,
  onMenuEnter,
  onMenuLeave,
  onMenuKeepOpen,
  onCloseMenu,
  mobileMenuButton,
}) => {
  const location = useLocation();

  return (
    <div className="w-full relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Identity / Logo */}
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3.5 shrink-0 group py-1 cursor-pointer"
          title="EcoSummit Nepal - Return to Home"
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center p-1 transition-all duration-300 ${
              isScrolled
                ? 'bg-white shadow-xs border border-[#E8E2D8]'
                : 'bg-white/95 backdrop-blur-md shadow-md border border-white/40 group-hover:scale-105'
            }`}
          >
            <img
              src={logoImg}
              alt="EcoSummit Nepal"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <span
              className={`font-serif text-2xl font-bold tracking-tight leading-none uppercase transition-colors duration-300 ${
                isScrolled ? 'text-[#17201D]' : 'text-white'
              }`}
            >
              EcoSummit
            </span>
            <span
              className={`text-[9.5px] font-semibold tracking-[0.2em] uppercase mt-1 leading-none transition-colors duration-300 ${
                isScrolled ? 'text-[#59615D]' : 'text-white/75'
              }`}
            >
              Expeditions · Nepal
            </span>
          </div>
        </Link>

        {/* Center Navigation Links - Original Headings with Redesigned Hover Menus */}
        <nav
          className="hidden xl:flex items-center gap-5 2xl:gap-7 font-sans"
          onMouseLeave={onMenuLeave}
        >
          <NavItem
            label="Treks"
            hasMenu={true}
            isOpen={activeMenu === 'treks'}
            isActiveRoute={location.pathname.startsWith('/treks')}
            isScrolled={isScrolled}
            onMouseEnter={() => onMenuEnter('treks')}
            onClick={() => (activeMenu === 'treks' ? onCloseMenu() : onMenuEnter('treks'))}
          />

          <NavItem
            label="Tours"
            hasMenu={true}
            isOpen={activeMenu === 'tours'}
            isActiveRoute={location.pathname.startsWith('/tours')}
            isScrolled={isScrolled}
            onMouseEnter={() => onMenuEnter('tours')}
            onClick={() => (activeMenu === 'tours' ? onCloseMenu() : onMenuEnter('tours'))}
          />

          <NavItem
            label="Expeditions"
            hasMenu={true}
            isOpen={activeMenu === 'expeditions'}
            isActiveRoute={location.pathname.startsWith('/expeditions')}
            isScrolled={isScrolled}
            onMouseEnter={() => onMenuEnter('expeditions')}
            onClick={() => (activeMenu === 'expeditions' ? onCloseMenu() : onMenuEnter('expeditions'))}
          />

          <NavItem
            label="Destinations"
            hasMenu={true}
            isOpen={activeMenu === 'destinations'}
            isActiveRoute={location.pathname.startsWith('/destinations')}
            isScrolled={isScrolled}
            onMouseEnter={() => onMenuEnter('destinations')}
            onClick={() => (activeMenu === 'destinations' ? onCloseMenu() : onMenuEnter('destinations'))}
          />

          <NavItem
            label="About"
            hasMenu={true}
            isOpen={activeMenu === 'about'}
            isActiveRoute={
              location.pathname === '/about' ||
              location.pathname === '/our-story' ||
              location.pathname === '/team' ||
              location.pathname === '/our-team'
            }
            isScrolled={isScrolled}
            onMouseEnter={() => onMenuEnter('about')}
            onClick={() => (activeMenu === 'about' ? onCloseMenu() : onMenuEnter('about'))}
          />

          <NavItem
            label="Travel Guide"
            to="/travel-guide"
            hasMenu={false}
            isActiveRoute={location.pathname.startsWith('/travel-guide')}
            isScrolled={isScrolled}
            onMouseEnter={onCloseMenu}
          />
        </nav>

        {/* Right Actions: Search + Plan Your Trip CTA */}
        <div className="hidden xl:flex items-center gap-4">
          <Link
            to="/treks"
            aria-label="Search trips and treks"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isScrolled
                ? 'text-[#2D3748] hover:text-[#E85D2A] hover:bg-[#F2F5F8]'
                : 'text-white/85 hover:text-white hover:bg-white/15'
            }`}
          >
            <Search className="w-4 h-4" />
          </Link>

          <NavCTA isScrolled={isScrolled} />
        </div>

        {/* Mobile / Tablet Hamburger Button */}
        {mobileMenuButton && (
          <div className="xl:hidden flex items-center">
            {mobileMenuButton}
          </div>
        )}
      </div>

      {/* Mega Menu Dropdown Container */}
      <MegaMenu
        isOpen={Boolean(activeMenu)}
        onMouseEnter={onMenuKeepOpen}
        onMouseLeave={onMenuLeave}
      >
        {activeMenu === 'treks' && <TreksMegaMenu onClose={onCloseMenu} />}
        {activeMenu === 'tours' && <ToursMegaMenu onClose={onCloseMenu} />}
        {activeMenu === 'expeditions' && <ExpeditionsMegaMenu onClose={onCloseMenu} />}
        {activeMenu === 'destinations' && <DestinationsMegaMenu onClose={onCloseMenu} />}
        {activeMenu === 'about' && <AboutDropdown onClose={onCloseMenu} />}
      </MegaMenu>
    </div>
  );
};
