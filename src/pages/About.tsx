import React, { useEffect } from 'react';
import {
  AboutHero,
  AboutSharingNepal,
  AboutMission,
  AboutTeamSection,
  AboutExploreCTA,
} from '../components/about';

export const About: React.FC = () => {
  useEffect(() => {
    document.title = 'About Us | EcoSummit — Himalayan Journeys in Nepal';
  }, []);

  return (
    <div className="w-full bg-[#FAF8F5] text-[#17201D] overflow-x-hidden">
      {/* 1. Full-Bleed Panoramic Hero with Scroll Parallax */}
      <AboutHero />

      {/* 2. Section 1: "We’re not just showing you Nepal, we’re sharing it." */}
      <AboutSharingNepal />

      {/* 3. Section 2: "Our Mission — Life-Changing Journeys" */}
      <AboutMission />

      {/* 4. Section 3: "Our Team — Local Experts. Global Mindset." */}
      <AboutTeamSection />

      {/* 5. Section 4: "Let’s Explore Nepal Together" (Sunset Panoramic CTA) */}
      <AboutExploreCTA />
    </div>
  );
};
