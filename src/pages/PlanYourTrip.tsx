import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Calendar,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Clock,
  MapPin,
  Send,
  Phone,
  Users,
  User,
  Heart,
  Sparkles,
  Search,
  X,
} from 'lucide-react';
import { allJourneys } from '../data/journeys';
import { companyData } from '../data/company';
import { AffiliationsAndPayments } from '../components/common/AffiliationsAndPayments';
import travelGuideBg from '../assets/travel_guide_bg.jpg';
import { api } from '../services/api';

export const PlanYourTrip: React.FC = () => {
  const [searchParams] = useSearchParams();
  const journeyParam = searchParams.get('journey') || '';
  const departureParam = searchParams.get('departure') || '';
  const typeParam = searchParams.get('type') || '';

  useEffect(() => {
    document.title = 'Plan a Trip | EcoSummit Nepal';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Form State
  const [travelStyle, setTravelStyle] = useState<string>(
    typeParam === 'private' ? 'group' : 'couple'
  );
  const [travelersCount, setTravelersCount] = useState<number>(
    typeParam === 'private' ? 6 : 2
  );
  const [dateType, setDateType] = useState<'fixed' | 'tentative' | 'planning'>('fixed');
  const [startDate, setStartDate] = useState<string>(departureParam || '2026-10-15');
  const [endDate, setEndDate] = useState<string>('2026-10-28');
  const [tripPlanType, setTripPlanType] = useState<'preferred' | 'advice'>('preferred');
  const [selectedJourneySlug, setSelectedJourneySlug] = useState<string>(
    journeyParam || 'everest-base-camp-trek'
  );
  const initialJourney = allJourneys.find(
    (j) => j.slug === (journeyParam || 'everest-base-camp-trek')
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    initialJourney?.title || 'Everest Base Camp & Kala Patthar'
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [customDestination, setCustomDestination] = useState<string>('');
  const [travelPreferences, setTravelPreferences] = useState<string>('');

  // Lead Traveler Details
  const [leadDetails, setLeadDetails] = useState({
    fullName: '',
    email: '',
    country: 'United States',
    countryCode: '+1',
    phoneNumber: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync if journeyParam changes
  useEffect(() => {
    if (journeyParam) {
      setSelectedJourneySlug(journeyParam);
      const j = allJourneys.find((item) => item.slug === journeyParam);
      if (j) {
        setSearchQuery(j.title);
        setCustomDestination(j.title);
      }
    }
  }, [journeyParam]);

  // Countries List
  const countries = [
    'United States',
    'United Kingdom',
    'Australia',
    'Canada',
    'Germany',
    'France',
    'Netherlands',
    'Switzerland',
    'Singapore',
    'India',
    'Nepal',
    'New Zealand',
    'Spain',
    'Italy',
    'Belgium',
    'Sweden',
    'Norway',
    'Denmark',
    'Austria',
    'Ireland',
    'Japan',
    'South Korea',
    'Malaysia',
    'China',
    'Brazil',
    'South Africa',
    'United Arab Emirates',
    'Other Country',
  ];

  // Country Calling Codes
  const countryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'AU' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' },
    { code: '+31', country: 'NL' },
    { code: '+41', country: 'CH' },
    { code: '+65', country: 'SG' },
    { code: '+977', country: 'NP' },
    { code: '+91', country: 'IN' },
    { code: '+64', country: 'NZ' },
    { code: '+81', country: 'JP' },
    { code: '+82', country: 'KR' },
    { code: '+46', country: 'SE' },
    { code: '+47', country: 'NO' },
    { code: '+34', country: 'ES' },
    { code: '+39', country: 'IT' },
  ];

  // Travel Styles matching inspiration Image 1
  const travelStyles = [
    { id: 'group', label: 'Group / Friends', icon: Users },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'couple', label: 'Couple', icon: Heart },
    { id: 'solo', label: 'Solo', icon: User },
  ];

  // Date Types matching inspiration Image 2
  const dateOptions = [
    { id: 'fixed', label: 'I have fixed My Date', icon: Calendar },
    { id: 'tentative', label: 'I Have Tentative Date', icon: Clock },
    { id: 'planning', label: 'I am Still Planning', icon: Sparkles },
  ];

  // Filtered journeys for live search
  const filteredJourneys = allJourneys.filter((j) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      j.title.toLowerCase().includes(q) ||
      (j.region && j.region.toLowerCase().includes(q)) ||
      (j.category && j.category.toLowerCase().includes(q))
    );
  });

  const popularSuggestions = [
    { title: 'Everest Base Camp & Kala Patthar', icon: '🏔️' },
    { title: 'Annapurna Sanctuary & Base Camp', icon: '⛰️' },
    { title: 'Langtang Valley & Kyanjin Gompa', icon: '🌲' },
    { title: 'Manaslu Circuit & Larkya La', icon: '🚩' },
    { title: 'Upper Mustang Hidden Kingdom', icon: '🏰' },
    { title: 'Chitwan Wildlife Safari', icon: '🦏' },
  ];

  const handleSelectJourney = (journey: typeof allJourneys[0]) => {
    setSelectedJourneySlug(journey.slug);
    setSearchQuery(journey.title);
    setCustomDestination(journey.title);
    setIsDropdownOpen(false);
  };

  // Selected journey object
  const currentJourney = allJourneys.find((j) => j.slug === selectedJourneySlug);
  const destinationDisplay =
    tripPlanType === 'advice'
      ? 'Open to Expert Recommendations'
      : searchQuery.trim()
      ? searchQuery
      : customDestination
      ? customDestination
      : currentJourney?.title || 'Custom Himalayan Route';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.submitInquiry({
        type: 'plan_custom_trip',
        full_name: leadDetails.fullName,
        email: leadDetails.email,
        phone: `${leadDetails.countryCode} ${leadDetails.phoneNumber}`,
        country: leadDetails.country,
        destination: destinationDisplay,
        package_id_or_slug: selectedJourneySlug,
        preferred_date: `${startDate} to ${endDate}`,
        duration_days: `${startDate} - ${endDate}`,
        group_size: `${travelersCount} (${travelStyles.find((s) => s.id === travelStyle)?.label || travelStyle})`,
        travel_style: travelStyle,
        message: travelPreferences || `Custom adventure planned via Plan a Trip builder for ${destinationDisplay}.`,
      });
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const whatsappMessage = `Namaste EcoSummit! I would like to inquire about planning a trip:
• Traveler: ${leadDetails.fullName || 'Guest'} (${leadDetails.country})
• Travel Style: ${travelStyles.find((s) => s.id === travelStyle)?.label || travelStyle} (${travelersCount} travelers)
• Destination: ${destinationDisplay}
• Dates: ${startDate} to ${endDate} (${dateType})
${travelPreferences ? `• Preferences: ${travelPreferences}` : ''}`;

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#142332] font-sans pb-20">
      {/* ── TOP HERO BANNER (MATCHING INSPIRATION BANNER) ── */}
      <div className="relative pt-28 pb-16 px-4 sm:px-6 overflow-hidden bg-[#142332]">
        <img
          src={travelGuideBg}
          alt="Himalayan Monastery and Peaks"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-75 filter contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#142332]/75 via-[#142332]/50 to-[#142332]/85 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-3">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
            Plan a Trip
          </h1>
          <div className="w-20 h-1 bg-[#D46238] mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto font-sans leading-relaxed">
            Tell us about your travel plans and preferences. Our certified Kathmandu team will design your custom itinerary tailored around your schedule and comfort style.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        {submitted ? (
          /* ── SUCCESS / SUBMITTED SCREEN ── */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#E8E2D8] p-8 sm:p-12 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D46238] font-bold">
                Inquiry Successfully Received
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#142332]">
                Thank You, {leadDetails.fullName || 'Traveler'}!
              </h2>
              <p className="text-xs sm:text-sm text-[#566370] max-w-md mx-auto">
                We have logged your custom trip inquiry for <strong className="text-[#142332]">{destinationDisplay}</strong>. A licensed route architect will email your custom day-by-day plan to <strong className="text-[#142332]">{leadDetails.email}</strong> within 24 hours.
              </p>
            </div>

            {/* Inquiry Summary Box */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="font-bold text-[#142332] border-b border-slate-200 pb-2 text-sm flex items-center justify-between">
                <span>Trip Inquiry Summary</span>
                <span className="text-[11px] font-mono font-bold text-[#D46238]">Ref: ES-INQ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#566370]">Destination:</span>
                <span className="font-semibold text-[#142332] text-right truncate max-w-[200px]">
                  {destinationDisplay}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#566370]">Travel Style:</span>
                <span className="font-semibold text-[#142332]">
                  {travelStyles.find((s) => s.id === travelStyle)?.label} ({travelersCount} Pax)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#566370]">Target Dates:</span>
                <span className="font-semibold text-[#142332]">
                  {startDate} to {endDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#566370]">Country:</span>
                <span className="font-semibold text-[#142332]">{leadDetails.country}</span>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${companyData.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat Directly on WhatsApp</span>
              </a>

              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3.5 border border-[#CBD5E0] hover:bg-[#FAF8F5] text-[#142332] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          /* ── MAIN INQUIRY FORM (SAME CLEAN DESIGN AS BOOKING, NO PAYMENT) ── */
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* ═════════════════════════════════════════════════════════ */}
            {/* ── LEFT COLUMN: STRUCTURED INQUIRY CARDS              ── */}
            {/* ═════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-7">
              {/* ── CARD 1: HOW WOULD YOU LIKE TO TRAVEL? ── */}
              <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#142332] text-[#C8A97A] text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    1
                  </span>
                  <div>
                    <h2 className="font-sans text-lg font-bold text-[#142332]">
                      How would you like to travel? <span className="text-[#D46238]">*</span>
                    </h2>
                    <p className="text-xs text-[#566370]">
                      Select your party setup. Private guide and dedicated porter support tailored for your group.
                    </p>
                  </div>
                </div>

                {/* 4 Cards matching Inspiration Image 1 */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  {travelStyles.map((style) => {
                    const isSelected = travelStyle === style.id;
                    const IconComp = style.icon;
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setTravelStyle(style.id)}
                        className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 ${
                          isSelected
                            ? 'bg-[#FAF8F5] border-[#D46238] shadow-xs'
                            : 'bg-white hover:bg-[#FAF8F5] border-[#E8E2D8]'
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-[#D46238] text-white' : 'bg-orange-50 text-[#D46238]'
                          }`}
                        >
                          <IconComp className="w-6 h-6" />
                        </div>

                        {/* Radio Dot indicator */}
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#D46238] bg-[#D46238]' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>

                        <span
                          className={`text-xs font-semibold ${
                            isSelected ? 'text-[#D46238]' : 'text-[#334155]'
                          }`}
                        >
                          {style.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Traveler Count */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-[#142332] block">No. of Travelers</span>
                    <span className="text-[11px] text-[#7A8895]">Total persons travelling in your party</span>
                  </div>

                  <div className="flex items-center border border-[#CBD5E1] rounded-lg overflow-hidden bg-white shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setTravelersCount((prev) => Math.max(1, prev - 1))}
                      disabled={travelersCount <= 1}
                      className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-base font-bold cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-sm font-bold font-mono text-[#142332]">
                      {travelersCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTravelersCount((prev) => Math.min(25, prev + 1))}
                      disabled={travelersCount >= 25}
                      className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-base font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* ── CARD 2: WHEN DO YOU PLAN TO TRAVEL? ── */}
              <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#142332] text-[#C8A97A] text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    2
                  </span>
                  <div>
                    <h2 className="font-sans text-lg font-bold text-[#142332]">
                      When do you plan to travel? <span className="text-[#D46238]">*</span>
                    </h2>
                    <p className="text-xs text-[#566370]">
                      Fixed dates or still deciding? Choose your current stage of planning.
                    </p>
                  </div>
                </div>

                {/* 3 Date Options matching Inspiration Image 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {dateOptions.map((opt) => {
                    const isSelected = dateType === opt.id;
                    const IconComp = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDateType(opt.id as any)}
                        className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 ${
                          isSelected
                            ? 'bg-[#FAF8F5] border-[#D46238] shadow-xs'
                            : 'bg-white hover:bg-[#FAF8F5] border-[#E8E2D8]'
                        }`}
                      >
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-[#D46238] text-white' : 'bg-orange-50 text-[#D46238]'
                          }`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>

                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#D46238] bg-[#D46238]' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>

                        <span
                          className={`text-xs font-semibold ${
                            isSelected ? 'text-[#D46238]' : 'text-[#334155]'
                          }`}
                        >
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Trip Starting & Ending Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">
                      Trip Starting Date <span className="text-[#D46238]">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#7A8895] absolute left-3.5 top-3" />
                      <input
                        type="date"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full border border-[#CBD5E1] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#142332] bg-white focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">
                      Trip Ending Date <span className="text-[#7A8895] font-normal">(Approximate)</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#7A8895] absolute left-3.5 top-3" />
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full border border-[#CBD5E1] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#142332] bg-white focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── CARD 3: WHAT KIND OF TRIP ARE YOU LOOKING FOR? ── */}
              <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#142332] text-[#C8A97A] text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    3
                  </span>
                  <div>
                    <h2 className="font-sans text-lg font-bold text-[#142332]">
                      What kind of trip are you looking for? <span className="text-[#D46238]">*</span>
                    </h2>
                    <p className="text-xs text-[#566370]">
                      Do you have a specific destination or route in mind, or do you want our guidance?
                    </p>
                  </div>
                </div>

                {/* Radio selection matching Inspiration Image 3 */}
                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#142332]">
                    <input
                      type="radio"
                      name="tripPlanType"
                      checked={tripPlanType === 'preferred'}
                      onChange={() => setTripPlanType('preferred')}
                      className="w-4 h-4 text-[#D46238] focus:ring-[#D46238]"
                    />
                    <span>I have my preferred Travel Plan / Trek.</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#142332]">
                    <input
                      type="radio"
                      name="tripPlanType"
                      checked={tripPlanType === 'advice'}
                      onChange={() => setTripPlanType('advice')}
                      className="w-4 h-4 text-[#D46238] focus:ring-[#D46238]"
                    />
                    <span>No, I am Looking for your Travel Expert Advice.</span>
                  </label>
                </div>

                {tripPlanType === 'preferred' && (
                  <div className="space-y-3 pt-2">
                    <div ref={searchContainerRef} className="relative">
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-[11px] font-bold text-[#334155]">
                          Where would you like to visit? <span className="text-[#D46238]">*</span>
                        </label>
                        <span className="text-[10.5px] text-[#7A8895]">Search trek or type custom destination</span>
                      </div>

                      <div className="relative">
                        <Search className="w-4 h-4 text-[#7A8895] absolute left-3.5 top-3 pointer-events-none" />
                        <input
                          type="text"
                          required={tripPlanType === 'preferred'}
                          value={searchQuery}
                          onFocus={() => setIsDropdownOpen(true)}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCustomDestination(e.target.value);
                            setIsDropdownOpen(true);
                          }}
                          placeholder="Type to search or suggest trek (e.g. Everest, Annapurna, Langtang, Mustang...)"
                          className="w-full border border-[#CBD5E1] rounded-xl pl-10 pr-9 py-2.5 text-xs text-[#142332] bg-white focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]"
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery('');
                              setCustomDestination('');
                              setIsDropdownOpen(true);
                            }}
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Live Auto-Suggestions Dropdown */}
                      {isDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl border border-[#CBD5E1] shadow-xl z-30 max-h-64 overflow-y-auto divide-y divide-slate-100">
                          {filteredJourneys.length > 0 ? (
                            filteredJourneys.slice(0, 8).map((j) => (
                              <button
                                key={j.slug}
                                type="button"
                                onClick={() => handleSelectJourney(j)}
                                className="w-full text-left px-3.5 py-2.5 hover:bg-[#FAF8F5] transition-colors flex items-center justify-between cursor-pointer group"
                              >
                                <div className="min-w-0 flex-1 pr-2">
                                  <span className="text-xs font-semibold text-[#142332] group-hover:text-[#D46238] block truncate">
                                    {j.title}
                                  </span>
                                  <span className="text-[10.5px] text-[#7A8895] block">
                                    {j.region || 'Nepal'} • {j.duration}
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono font-bold text-[#183E63] bg-[#183E63]/5 px-2 py-0.5 rounded-full shrink-0">
                                  Select
                                </span>
                              </button>
                            ))
                          ) : (
                            <div className="p-3 text-xs text-[#566370] text-center">
                              <span>No matching trek package found.</span>
                              <button
                                type="button"
                                onClick={() => setIsDropdownOpen(false)}
                                className="block mx-auto mt-1 font-bold text-[#D46238] hover:underline cursor-pointer"
                              >
                                Use "{searchQuery}" as custom destination
                              </button>
                            </div>
                          )}

                          {searchQuery.trim() && (
                            <div className="p-2 bg-[#FAF8F5] border-t border-slate-100 text-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setCustomDestination(searchQuery);
                                  setIsDropdownOpen(false);
                                }}
                                className="text-[11px] font-semibold text-[#D46238] hover:underline cursor-pointer"
                              >
                                ✨ Use "{searchQuery}" as my custom destination
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Quick Popular Suggestion Chips */}
                      <div className="pt-2">
                        <span className="text-[10.5px] text-[#7A8895] block mb-1.5">
                          Suggested routes:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {popularSuggestions.map((s) => {
                            const isCurrent =
                              searchQuery.toLowerCase() === s.title.toLowerCase();
                            return (
                              <button
                                key={s.title}
                                type="button"
                                onClick={() => {
                                  const matched = allJourneys.find((j) =>
                                    j.title.toLowerCase().includes(s.title.toLowerCase())
                                  );
                                  if (matched) {
                                    handleSelectJourney(matched);
                                  } else {
                                    setSearchQuery(s.title);
                                    setCustomDestination(s.title);
                                  }
                                }}
                                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                                  isCurrent
                                    ? 'bg-[#142332] text-white border-[#142332] font-semibold shadow-2xs'
                                    : 'bg-white hover:bg-[#FAF8F5] text-[#334155] border-[#E8E2D8]'
                                }`}
                              >
                                <span>{s.icon}</span>
                                <span>{s.title}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preference description */}
                <div className="pt-2">
                  <label className="block text-[11px] font-bold text-[#334155] mb-1">
                    Describe about your preference and style of travelling <span className="text-[#7A8895] font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={travelPreferences}
                    onChange={(e) => setTravelPreferences(e.target.value)}
                    placeholder="e.g. We love photography, prefer comfortable teahouses with attached bathrooms, need gradual acclimatisation, or have dietary preferences..."
                    className="w-full border border-[#CBD5E1] rounded-xl p-3 text-xs text-[#142332] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]"
                  />
                </div>
              </div>

              {/* ── CARD 4: LEAD TRAVELER DETAILS ── */}
              <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#142332] text-[#C8A97A] text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    4
                  </span>
                  <div>
                    <h2 className="font-sans text-lg font-bold text-[#142332]">
                      Lead Traveler Details
                    </h2>
                    <p className="text-xs text-[#566370]">
                      Where should our licensed Kathmandu team send your custom proposal?
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  {/* Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-[#334155] mb-1">
                        Full Name <span className="text-[#D46238]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={leadDetails.fullName}
                        onChange={(e) => setLeadDetails({ ...leadDetails, fullName: e.target.value })}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#142332] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#334155] mb-1">
                        Email Address <span className="text-[#D46238]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={leadDetails.email}
                        onChange={(e) => setLeadDetails({ ...leadDetails, email: e.target.value })}
                        placeholder="e.g. eleanor@example.com"
                        className="w-full border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#142332] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]"
                      />
                    </div>
                  </div>

                  {/* Select Country & Phone / WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-[#334155] mb-1">
                        Select Your Country <span className="text-[#D46238]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={leadDetails.country}
                          onChange={(e) => setLeadDetails({ ...leadDetails, country: e.target.value })}
                          className="w-full border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#142332] bg-white focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]"
                        >
                          {countries.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#334155] mb-1">
                        Phone / WhatsApp Number <span className="text-[#D46238]">*</span>
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        <select
                          value={leadDetails.countryCode}
                          onChange={(e) => setLeadDetails({ ...leadDetails, countryCode: e.target.value })}
                          className="border border-[#CBD5E1] rounded-xl px-2.5 py-2.5 text-xs text-[#142332] bg-white focus:outline-none focus:border-[#183E63]"
                        >
                          {countryCodes.map((cc) => (
                            <option key={cc.code} value={cc.code}>
                              {cc.code} ({cc.country})
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          required
                          value={leadDetails.phoneNumber}
                          onChange={(e) => setLeadDetails({ ...leadDetails, phoneNumber: e.target.value })}
                          placeholder="e.g. 555-0199"
                          className="col-span-2 sm:col-span-3 border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#142332] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Anti-spam / Trust Reassurance matching inspiration Image 4 */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-[#566370]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#2E7D32] shrink-0" />
                      <span>Zero spam. Direct inquiry to our Kathmandu licensed route planners.</span>
                    </div>
                    <span className="text-[10.5px] font-mono text-slate-400 font-bold uppercase">
                      SSL SECURE
                    </span>
                  </div>

                  {/* Submit CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-xl bg-[#D46238] hover:bg-[#B8522E] disabled:opacity-50 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Submitting Your Inquiry...</span>
                      ) : (
                        <>
                          <span>Submit Trip Inquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ═════════════════════════════════════════════════════════ */}
            {/* ── RIGHT COLUMN: STICKY INQUIRY SUMMARY SIDEBAR       ── */}
            {/* ═════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-4 self-stretch">
              <div className="sticky top-24 lg:top-28 space-y-5">
                {/* Summary Card */}
                <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 shadow-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-sans text-lg font-bold text-[#142332]">
                      Trip Inquiry
                    </h3>
                    <span className="text-[10.5px] font-mono font-bold text-[#183E63] bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                      Tailor-Made
                    </span>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    {/* Destination */}
                    <div className="space-y-0.5">
                      <span className="text-[10.5px] font-mono uppercase text-[#7A8895]">Destination</span>
                      <div className="flex items-start gap-2 font-bold text-[#142332]">
                        <MapPin className="w-4 h-4 text-[#183E63] shrink-0 mt-0.5" />
                        <span className="leading-snug">{destinationDisplay}</span>
                      </div>
                    </div>

                    {/* Travel Style */}
                    <div className="border-t border-slate-100 pt-3 space-y-0.5">
                      <span className="text-[10.5px] font-mono uppercase text-[#7A8895]">Travel Style</span>
                      <div className="flex items-center gap-2 font-semibold text-[#142332]">
                        <Users className="w-4 h-4 text-[#D46238] shrink-0" />
                        <span>
                          {travelStyles.find((s) => s.id === travelStyle)?.label} ({travelersCount}{' '}
                          {travelersCount === 1 ? 'Traveler' : 'Travelers'})
                        </span>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="border-t border-slate-100 pt-3 space-y-0.5">
                      <span className="text-[10.5px] font-mono uppercase text-[#7A8895]">Travel Dates</span>
                      <div className="flex items-center gap-2 font-semibold text-[#142332]">
                        <Calendar className="w-4 h-4 text-[#183E63] shrink-0" />
                        <span>
                          {startDate} to {endDate}
                        </span>
                      </div>
                      <span className="text-[10.5px] text-[#7A8895] block pl-6">
                        Status: {dateOptions.find((d) => d.id === dateType)?.label}
                      </span>
                    </div>

                    {/* Lead Traveler Preview */}
                    {(leadDetails.fullName || leadDetails.email) && (
                      <div className="border-t border-slate-100 pt-3 space-y-0.5">
                        <span className="text-[10.5px] font-mono uppercase text-[#7A8895]">Lead Traveler</span>
                        <div className="font-semibold text-[#142332]">
                          {leadDetails.fullName || 'Guest'}{' '}
                          {leadDetails.country && (
                            <span className="text-[11px] text-slate-500 font-normal">
                              ({leadDetails.country})
                            </span>
                          )}
                        </div>
                        {leadDetails.email && (
                          <span className="text-[11px] text-[#566370] block truncate">
                            {leadDetails.email}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Free Consultation Callout */}
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-amber-950">
                      <Sparkles className="w-3.5 h-3.5 text-[#D46238]" />
                      <span>100% Free Consultation</span>
                    </div>
                    <p className="text-[11px] text-amber-900/90 leading-snug">
                      We design your custom route, altitude profile, and hotel options with zero obligation.
                    </p>
                  </div>
                </div>

                {/* Direct WhatsApp Callout */}
                <div className="p-5 rounded-2xl bg-[#142332] text-white space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#C8A97A] font-mono uppercase tracking-wider font-bold text-[10px]">
                      DIRECT KATHMANDU DESK
                    </span>
                    <span className="text-emerald-400 font-bold uppercase text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Online
                    </span>
                  </div>

                  <h4 className="font-serif text-base text-white">Prefer to Chat Directly?</h4>
                  <p className="text-xs text-white/75 leading-relaxed">
                    Message our Kathmandu operations team on WhatsApp for instant trail advice and custom routes.
                  </p>

                  <a
                    href={`https://wa.me/${companyData.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Quick Chat on WhatsApp</span>
                  </a>
                </div>

                {/* Certified Operators Callout */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2 text-xs text-[#566370]">
                  <div className="flex items-center gap-2 text-[#183E63] font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                    <span>Official TAAN Licensed Operator</span>
                  </div>
                  <p className="leading-relaxed text-[11.5px]">
                    Nepal Ministry of Tourism accredited. Senior certified Sherpa guides and satellite emergency rescue coverage.
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-[11px] font-semibold text-[#183E63]">
                    <Phone className="w-3.5 h-3.5 text-[#C8A97A]" />
                    <span>Kathmandu Office: {companyData.contactPhone}</span>
                  </div>
                </div>

                {/* Affiliations & Payment Acceptance Badges in Sidebar */}
                <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs">
                  <AffiliationsAndPayments variant="light" layout="stack" />
                </div>
              </div>
            </div>
          </form>
        )}

        {/* ── AFFILIATIONS & ONLINE PAYMENT ACCEPTANCE BANNER (MATCHING USER REFERENCE IMAGE 1 & 2) ── */}
        <div className="mt-10 lg:mt-12 p-6 sm:p-8 rounded-3xl bg-[#142332] text-white border border-[#142332] shadow-sm">
          <AffiliationsAndPayments variant="dark" layout="row" />
        </div>
      </div>
    </div>
  );
};

export default PlanYourTrip;
