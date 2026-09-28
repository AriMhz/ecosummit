import React from 'react';
import { Hero } from '../components/hero/Hero';
import { HeroTrustBar } from '../components/hero/HeroTrustBar';
import { CompanyIntro } from '../components/sections/CompanyIntro';
import { FeaturedJourneys } from '../components/sections/FeaturedJourneys';
import { ExploreCategories } from '../components/sections/ExploreCategories';
import { DestinationExperience } from '../components/sections/DestinationExperience';
import { VoluntaryWork } from '../components/sections/VoluntaryWork';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { LocalExperts } from '../components/sections/LocalExperts';
import { PrivateJourneys } from '../components/sections/PrivateJourneys';
import { HimalayanWelcome } from '../components/sections/HimalayanWelcome';
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

      {/* 5. Explore Categories */}
      <ExploreCategories />

      {/* 6. Featured Destinations */}
      <DestinationExperience />

      {/* 8. Volunteer & Community Work */}
      <VoluntaryWork />

      {/* 10. Private & Refined Journeys */}
      <PrivateJourneys />

      {/* 10.5 Welcome to Nepal - Editorial Invitation & Brand Story */}
      <HimalayanWelcome />

      {/* 11.5 The EcoSummit Standard - Why EcoSummit */}
      <WhyChooseUs />

      {/* 12. Stories from the Trail */}
      <TrailStories />

      {/* 13. Traveller Reviews */}
      <Testimonials />

      {/* 14. The Nepal Travel Guide */}
      <TravelGuidePreview />

      {/* 15. Final Enquiry CTA (BEGIN YOUR JOURNEY) */}
      <FinalCTA />

      {/* 16. Our Team - Meet Your Local Himalayan Experts */}
      <LocalExperts />
    </>
  );
};
