import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { DesktopNav } from './DesktopNav';
import { MobileNav, HamburgerIcon } from './MobileNav';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const location = useLocation();
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Determine if the current page has a dark hero section where transparent navigation looks best
  const isHeroPage =
    location.pathname === '/' ||
    location.pathname === '/about' ||
    location.pathname === '/our-story' ||
    location.pathname === '/why-ecosummit' ||
    location.pathname === '/team' ||
    location.pathname === '/our-team';

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileNavOpen(false);
  }, [location.pathname]);

  // Keyboard shortcut: ESC to close open mega-menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMobileNavOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Menu hover management with smooth delay to avoid jitter
  const handleMenuEnter = (menuKey: string) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setActiveMenu(menuKey);
  };

  const handleMenuLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const handleMenuKeepOpen = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  };

  const handleCloseMenu = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setActiveMenu(null);
  };

  // Determine navbar appearance
  // Check if current page is a detail page with its own contextual triggered sub-navigation
  const isDetailPage = /^\/(treks|tours|expeditions|destinations)\/[^/]+$/.test(location.pathname);

  // On detail pages with in-page tabs, upper navbar yields to the triggered subnav when scrolled
  // On all other pages (Home, Treks, Destinations, Contact, About, Team, etc.), the upper nav sticks
  const isHiddenOnScroll = isDetailPage && isScrolled;

  // If not a hero page, it is always in the scrolled/solid state so text is legible against light backgrounds
  const effectiveScrolled = !isHeroPage || isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out transform ${
          isHiddenOnScroll
            ? '-translate-y-full opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100'
        } ${
          effectiveScrolled
            ? 'bg-[#FDFBF7]/92 backdrop-blur-md border-b border-[#E8E2D8]/80 shadow-[0_4px_24px_-4px_rgba(23,32,29,0.06)] py-3'
            : 'bg-gradient-to-b from-black/55 via-black/20 to-transparent border-none py-5'
        }`}
      >
        <DesktopNav
          isScrolled={effectiveScrolled}
          activeMenu={activeMenu}
          onMenuEnter={handleMenuEnter}
          onMenuLeave={handleMenuLeave}
          onMenuKeepOpen={handleMenuKeepOpen}
          onCloseMenu={handleCloseMenu}
          mobileMenuButton={
            <HamburgerIcon
              isOpen={mobileNavOpen}
              onClick={() => setMobileNavOpen((prev) => !prev)}
              isScrolled={effectiveScrolled}
            />
          }
        />
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
};
