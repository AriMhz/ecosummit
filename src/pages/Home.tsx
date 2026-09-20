import React from 'react';
import { Hero } from '../components/hero/Hero';
import { HeroTrustBar } from '../components/hero/HeroTrustBar';
import { CompanyIntro } from '../components/sections/CompanyIntro';
import { FeaturedJourneys } from '../components/sections/FeaturedJourneys';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { ExploreCategories } from '../components/sections/ExploreCategories';
import { DestinationExperience } from '../components/sections/DestinationExperience';
import { LocalExperts } from '../components/sections/LocalExperts';
import { PrivateJourneys } from '../components/sections/PrivateJourneys';
import { HimalayanWelcome } from '../components/sections/HimalayanWelcome';
import { CinematicStory } from '../components/sections/CinematicStory';
import { TrailStories } from '../components/sections/TrailStories';
import { Testimonials } from '../components/sections/Testimonials';
import { TravelGuidePreview } from '../components/sections/TravelGuidePreview';
import { FinalCTA } from '../components/sections/FinalCTA';

export const Home: React.FC = () => {
  return (
    <>
      {/* 2. Hero */}
      <Hero />

      {/* 2.2 Credentials & Trust Guarantee Strip */}
      <HeroTrustBar />

      {/* 2.5 Company Editorial Introduction */}
      <CompanyIntro />


      {/* 4. Most-Loved Himalayan Journeys */}
      <FeaturedJourneys />

      {/* 5. Why EcoSummit */}
      <WhyChooseUs />

      {/* 7. More Ways to Explore Nepal */}
      <ExploreCategories />

      {/* 8. Discover Nepal Beyond the Trails */}
      <DestinationExperience />

      {/* 9. Meet Your Local Himalayan Experts */}
      <LocalExperts />

      {/* 10. Private & Refined Journeys */}
      <PrivateJourneys />

      {/* 10.5 Welcome to Nepal - Editorial Invitation & Brand Story */}
      <HimalayanWelcome />

      {/* 11. Cinematic Story Section */}
      <CinematicStory />

      {/* 12. Stories from the Trail */}
      <TrailStories />

      {/* 13. Traveller Reviews */}
      <Testimonials />

      {/* 14. The Nepal Travel Guide */}
      <TravelGuidePreview />

      {/* 15. Final Enquiry CTA */}
      <FinalCTA />
    </>
  );
};
