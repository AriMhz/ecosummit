import React from 'react';
import { Hero } from '../components/hero/Hero';
import { HeroTrustBar } from '../components/hero/HeroTrustBar';
import { CompanyIntro } from '../components/sections/CompanyIntro';
import { FeaturedJourneys } from '../components/sections/FeaturedJourneys';
import { FeaturedTours } from '../components/sections/FeaturedTours';
import { FeaturedExpeditions } from '../components/sections/FeaturedExpeditions';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
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


      {/* 4. Featured Treks */}
      <FeaturedJourneys />

      {/* 5. Featured Tours */}
      <FeaturedTours />

      {/* 6. Featured Expeditions */}
      <FeaturedExpeditions />

      {/* 7. Featured Destinations */}
      <DestinationExperience />

      {/* 9. Meet Your Local Himalayan Experts */}
      <LocalExperts />

      {/* 10. Private & Refined Journeys */}
      <PrivateJourneys />

      {/* 10.5 Welcome to Nepal - Editorial Invitation & Brand Story */}
      <HimalayanWelcome />

      {/* 11. Cinematic Story Section (The Himalayan Essence / Some Journeys Stay With You) */}
      <CinematicStory />

      {/* 11.5 The EcoSummit Standard - Why EcoSummit */}
      <WhyChooseUs />

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
