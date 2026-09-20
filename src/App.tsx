import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/common/LoadingScreen';
import { ScrollToTop } from './components/common/ScrollToTop';
import { DemoProtection } from './components/common/DemoProtection';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Treks } from './pages/Treks';
import { TrekDetail } from './pages/TrekDetail';
import { Tours } from './pages/Tours';
import { Expeditions } from './pages/Expeditions';
import { Destinations } from './pages/Destinations';
import { DestinationDetail } from './pages/DestinationDetail';
import { About } from './pages/About';
import { Team } from './pages/Team';
import { TravelGuide } from './pages/TravelGuide';
import { ArticleDetail } from './pages/ArticleDetail';
import { SafetyAltitude } from './pages/SafetyAltitude';
import { ResponsibleTravel } from './pages/ResponsibleTravel';
import { TravelInsurance } from './pages/TravelInsurance';
import { EmergencyRescue } from './pages/EmergencyRescue';
import { BookingTerms } from './pages/BookingTerms';
import { Reviews } from './pages/Reviews';
import { Contact } from './pages/Contact';
import { PlanYourTrip } from './pages/PlanYourTrip';
import { Booking } from './pages/Booking';
import { PrivacyPolicy } from './pages/PrivacyPolicy';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      {/* ── Client Demo Security & Review Watermark ── */}
      <DemoProtection enabled={true} showWatermark={true} clientName="EcoSummit Nepal" />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      <Layout>
        <Routes>
          {/* 1. Homepage */}
          <Route path="/" element={<Home />} />

          {/* 2. Treks */}
          <Route path="/treks" element={<Treks />} />
          <Route path="/treks/:slug" element={<TrekDetail />} />

          {/* 3. Tours */}
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:slug" element={<TrekDetail />} />

          {/* 4. Expeditions */}
          <Route path="/expeditions" element={<Expeditions />} />
          <Route path="/expeditions/:slug" element={<TrekDetail />} />

          {/* 5. Destinations */}
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />

          {/* 6. About & Story */}
          <Route path="/about" element={<About />} />
          <Route path="/our-story" element={<About />} />
          <Route path="/why-ecosummit" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/our-team" element={<Team />} />

          {/* 7. Travel Guide */}
          <Route path="/travel-guide" element={<TravelGuide />} />
          <Route path="/travel-guide/:slug" element={<ArticleDetail />} />

          {/* 8. Resources & Safety */}
          <Route path="/safety-altitude" element={<SafetyAltitude />} />
          <Route path="/responsible-travel" element={<ResponsibleTravel />} />
          <Route path="/travel-insurance" element={<TravelInsurance />} />
          <Route path="/emergency-rescue" element={<EmergencyRescue />} />
          <Route path="/booking-terms" element={<BookingTerms />} />

          {/* 9. Reviews & Contact */}
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plan-your-trip" element={<PlanYourTrip />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
