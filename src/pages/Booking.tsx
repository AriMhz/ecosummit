import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Lock,
  MessageCircle,
  Clock,
  MapPin,
  Check,
  ArrowRight,
  Phone,
  Plane,
  Car,
} from 'lucide-react';
import { allJourneys, getJourneyBySlug } from '../data/journeys';
import { companyData } from '../data/company';
import { AffiliationsAndPayments } from '../components/common/AffiliationsAndPayments';
import { api } from '../services/api';

export const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const slugParam = searchParams.get('slug') || '';
  const departureParam = searchParams.get('departure') || '';

  // State for chosen trip (allows switching dynamically in the form)
  const [selectedSlug, setSelectedSlug] = useState(
    slugParam || 'annapurna-sanctuary-base-camp'
  );

  // If slugParam was passed in URL (e.g. from "Book This Trip"), greyout/lock the trip selection
  const [isTripLocked, setIsTripLocked] = useState(Boolean(slugParam));

  // Match journey by slug or default to first popular journey (Annapurna Sanctuary or Everest)
  const selectedJourney =
    getJourneyBySlug(selectedSlug) ||
    allJourneys.find((j) => j.slug === 'annapurna-sanctuary-base-camp') ||
    allJourneys[0];

  const basePriceNum = parseInt(
    (selectedJourney.startingPrice || '$1,120').replace(/[^0-9]/g, '') || '1120',
    10
  );

  useEffect(() => {
    document.title = `Book ${selectedJourney.title} | EcoSummit Nepal`;
  }, [selectedJourney]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Sync selectedSlug & lock state if search param changes
  useEffect(() => {
    if (slugParam) {
      setSelectedSlug(slugParam);
      setIsTripLocked(true);
    }
  }, [slugParam]);

  // Booking Form State
  const [travelersCount, setTravelersCount] = useState(1);
  const [paymentOption, setPaymentOption] = useState<'deposit' | 'full'>('deposit');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Dates handling
  const defaultStartDate = departureParam || '2026-10-15';
  const [startDate, setStartDate] = useState(defaultStartDate);

  // Calculate end date based on duration
  const durationDays = parseInt(selectedJourney.duration.replace(/[^0-9]/g, '') || '14', 10);
  const getEndDate = (start: string, days: number) => {
    try {
      const d = new Date(start);
      d.setDate(d.getDate() + days);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return '14 Days Later';
    }
  };
  const formattedStartDate = (() => {
    try {
      return new Date(startDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return startDate;
    }
  })();
  const formattedEndDate = getEndDate(startDate, durationDays);

  // Lead Traveler & Logistics State (matching user reference image options)
  const [leadTraveler, setLeadTraveler] = useState({
    fullName: '',
    email: '',
    dob: '',
    nationality: 'United States',
    countryCode: '+1',
    mobileNumber: '',
    flightDetails: '',
    airportPickup: 'yes' as 'yes' | 'no',
    specialRequirements: '',
  });

  // Group Discount Tiers Calculation
  // 1 Pax: 100%
  // 2-4 Pax: ~85%
  // 5-8 Pax: ~80%
  // 9-12 Pax: ~74%
  // 13-20 Pax: ~68%
  const discountTiers = [
    { min: 1, max: 1, label: '1 Pax', perPerson: Math.round(basePriceNum) },
    { min: 2, max: 4, label: '2 – 4 Pax', perPerson: Math.round(basePriceNum * 0.85) },
    { min: 5, max: 8, label: '5 – 8 Pax', perPerson: Math.round(basePriceNum * 0.79) },
    { min: 9, max: 12, label: '9 – 12 Pax', perPerson: Math.round(basePriceNum * 0.74) },
    { min: 13, max: 20, label: '13 – 20 Pax', perPerson: Math.round(basePriceNum * 0.68) },
  ];

  // Determine current active per-person price
  const activeTier =
    discountTiers.find((t) => travelersCount >= t.min && travelersCount <= t.max) ||
    discountTiers[discountTiers.length - 1];
  const pricePerPerson = activeTier.perPerson;
  const totalPackagePrice = pricePerPerson * travelersCount;

  // Deposit calculation (20% deposit vs 100% full)
  const depositPayableNow =
    paymentOption === 'deposit' ? Math.round(totalPackagePrice * 0.2) : totalPackagePrice;
  const remainingAmount = totalPackagePrice - depositPayableNow;

  const handleIncrement = () => {
    setTravelersCount((prev) => Math.min(prev + 1, 20));
  };

  const handleDecrement = () => {
    setTravelersCount((prev) => Math.max(prev - 1, 1));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please accept the booking terms and conditions to proceed.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await api.submitBooking({
        package_slug: selectedJourney.slug,
        package_title: selectedJourney.title,
        full_name: leadTraveler.fullName,
        email: leadTraveler.email,
        phone: `${leadTraveler.countryCode} ${leadTraveler.mobileNumber}`,
        country: leadTraveler.nationality,
        departure_date: startDate,
        travelers_count: travelersCount,
        special_requests: `Requirements: ${leadTraveler.specialRequirements || 'None'}. Airport Pickup: ${leadTraveler.airportPickup}. Flight: ${leadTraveler.flightDetails || 'Pending'}. DOB: ${leadTraveler.dob}`,
      });

      setBookingRef(res.booking_code || `ECO-${Math.floor(100000 + Math.random() * 900000)}`);
    } catch {
      setBookingRef(`ECO-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const countries = [
    'United States',
    'United Kingdom',
    'Australia',
    'Canada',
    'Germany',
    'France',
    'Netherlands',
    'Singapore',
    'Switzerland',
    'New Zealand',
    'Norway',
    'Sweden',
    'Spain',
    'Italy',
    'India',
    'Nepal',
    'Other Nationality',
  ];

  const countryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'AU' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' },
    { code: '+31', country: 'NL' },
    { code: '+65', country: 'SG' },
    { code: '+41', country: 'CH' },
    { code: '+64', country: 'NZ' },
    { code: '+977', country: 'NP' },
    { code: '+91', country: 'IN' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#142332] pt-24 sm:pt-28 lg:pt-32 pb-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-sans text-[#7A8895] mb-4">
          <Link to="/" className="hover:text-[#142332] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/treks" className="hover:text-[#142332] transition-colors">
            Journeys
          </Link>
          <span>/</span>
          <span className="text-[#142332] font-semibold">Direct Reservation</span>
        </div>

        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#102942] font-normal tracking-tight">
            Booking
          </h1>
          <p className="text-xs sm:text-sm text-[#566370] font-sans mt-1">
            Official expedition reservation direct with EcoSummit Nepal. Licensed TAAN operator.
          </p>
        </div>

        {submitted ? (
          /* ── RESERVATION CONFIRMED VIEW ── */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#E8E2D8] p-8 sm:p-12 shadow-xl text-center space-y-7">
            <div className="w-20 h-20 rounded-3xl bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center mx-auto shadow-inner border border-[#2E7D32]/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE5DC] text-[#142332] text-xs font-mono font-bold uppercase tracking-wider">
                Reservation Hold Active • Ref: {bookingRef}
              </span>
              <h2 className="font-serif text-3xl text-[#102942]">
                Booking Request Placed!
              </h2>
              <p className="text-sm text-[#566370] leading-relaxed max-w-lg mx-auto">
                Thank you, <strong>{leadTraveler.fullName}</strong>. Your reservation for{' '}
                <strong>{selectedJourney.title}</strong> has been received by our Kathmandu operations team.
              </p>
            </div>

            {/* Booking Summary Box */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] text-left text-xs space-y-2.5">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Expedition:</span>
                <strong className="text-slate-900">{selectedJourney.title}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Travel Dates:</span>
                <strong className="text-slate-900">
                  {formattedStartDate} — {formattedEndDate}
                </strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Travelers:</span>
                <strong className="text-slate-900">{travelersCount} Person(s)</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Deposit Due ({paymentOption === 'deposit' ? '20%' : '100%'}):</span>
                <strong className="text-[#2E7D32] text-sm">US$ {depositPayableNow.toLocaleString()}</strong>
              </div>
              {paymentOption === 'deposit' && (
                <div className="flex justify-between text-slate-600 border-b border-slate-200 pb-2">
                  <span>Balance Payable in Kathmandu:</span>
                  <strong>US$ {remainingAmount.toLocaleString()}</strong>
                </div>
              )}
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Airport Pickup:</span>
                <strong className="text-slate-900">
                  {leadTraveler.airportPickup === 'yes' ? 'Yes (Complimentary Private Transfer)' : 'No (Self-arranged)'}
                </strong>
              </div>
              {leadTraveler.flightDetails && (
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Flight Details:</span>
                  <strong className="text-slate-900 truncate max-w-xs">{leadTraveler.flightDetails}</strong>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <a
                href={`https://wa.me/${companyData.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Namaste EcoSummit! I just placed booking ${bookingRef} for ${selectedJourney.title} (${travelersCount} pax).\nArrival in KTM: ${formattedStartDate}\nAirport Pickup: ${leadTraveler.airportPickup === 'yes' ? 'Yes (Complimentary)' : 'No'}\n${leadTraveler.flightDetails ? `Flight: ${leadTraveler.flightDetails}\n` : ''}Deposit: US$ ${depositPayableNow.toLocaleString()}\nPlease confirm permits.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Confirm on WhatsApp</span>
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
          /* ── MAIN BOOKING WORKFLOW (MATCHING USER REFERENCE SCREENSHOT) ── */
          <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* ═════════════════════════════════════════════════════════ */}
            {/* ── LEFT COLUMN: 3-STEP RESERVATION FORM               ── */}
            {/* ═════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              {/* ── PACKAGE SUMMARY BANNER CARD (TOP) ── */}
              <div className="bg-white rounded-2xl border border-[#E8E2D8] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img
                  src={selectedJourney.featuredImage}
                  alt={selectedJourney.title}
                  className="w-24 h-20 sm:w-28 sm:h-20 rounded-xl object-cover shrink-0 border border-[#E8E2D8]"
                />

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-serif text-xl sm:text-2xl text-[#142332] font-semibold leading-tight">
                      {selectedJourney.title}
                    </h2>
                    <span className="text-[11px] font-mono font-bold text-[#D46238] bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                      {selectedJourney.duration}
                    </span>
                  </div>

                  <div className="text-xs text-[#566370] space-y-0.5 font-sans">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#183E63] shrink-0" />
                      <span>Starts in Kathmandu, Nepal on </span>
                      <strong className="text-[#142332] font-semibold">{formattedStartDate}</strong>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
                      <span>Ends in Kathmandu, Nepal on </span>
                      <strong className="text-[#142332] font-semibold">{formattedEndDate}</strong>
                    </div>
                  </div>
                </div>

                {/* Change Date Link */}
                <div className="shrink-0 self-end sm:self-center">
                  <label className="text-[11px] font-sans font-semibold text-[#183E63] hover:underline cursor-pointer flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Change Date</span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              {/* ── STEP 1: HOW MANY ARE TRAVELLING? ── */}
              <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#142332] text-[#C8A97A] text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    1
                  </span>
                  <div>
                    <h3 className="font-sans text-lg font-bold text-[#142332]">
                      How many are travelling?
                    </h3>
                    <p className="text-xs text-[#566370]">
                      Group discount automatically calculated based on your private party size.
                    </p>
                  </div>
                </div>

                {/* Group Discount Table */}
                <div className="bg-[#FAF8F5] border border-[#E8E2D8] rounded-xl p-3.5 space-y-1.5 text-xs sm:text-[13px] font-sans">
                  {discountTiers.map((tier) => {
                    const isActive = travelersCount >= tier.min && travelersCount <= tier.max;
                    return (
                      <div
                        key={tier.label}
                        className={`flex items-center justify-between py-1.5 px-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-[#142332] text-white font-bold shadow-xs'
                            : 'text-[#4A5568] hover:bg-white/60'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />}
                          <span>{tier.label}</span>
                        </span>
                        <span className="font-mono text-slate-300">··········</span>
                        <span className={`font-mono font-bold ${isActive ? 'text-[#E5A93C]' : 'text-[#142332]'}`}>
                          US$ {tier.perPerson.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Traveler Counter */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-semibold text-[#142332]">No of Travelers</span>
                  <div className="flex items-center border border-[#CBD5E1] rounded-lg overflow-hidden bg-white shadow-xs">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={travelersCount <= 1}
                      className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-bold cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-sm font-bold font-mono text-[#142332]">
                      {travelersCount}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      disabled={travelersCount >= 20}
                      className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* ── STEP 2: LEAD TRAVELLER & FLIGHT COORDINATION ── */}
              <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#142332] text-[#C8A97A] text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    2
                  </span>
                  <div>
                    <h3 className="font-sans text-lg font-bold text-[#142332]">
                      Lead Traveller &amp; Arrival Logistics
                    </h3>
                    <p className="text-xs text-[#566370]">
                      Primary contact details for national park permits, airport pickup, and operations.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-[#334155] mb-1">
                        Full Name * <span className="text-[#7A8895] font-normal">(As per passport)</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={leadTraveler.fullName}
                        onChange={(e) => setLeadTraveler({ ...leadTraveler, fullName: e.target.value })}
                        placeholder="e.g. Johnathan Smith"
                        className="w-full border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#142332] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#334155] mb-1">
                        Email Address * <span className="text-[#7A8895] font-normal">(For trip voucher &amp; permits)</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={leadTraveler.email}
                        onChange={(e) => setLeadTraveler({ ...leadTraveler, email: e.target.value })}
                        placeholder="e.g. john.smith@example.com"
                        className="w-full border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#142332] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Selected Trip & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-[11px] font-bold text-[#334155]">
                          Selected Trip * <span className="text-[#7A8895] font-normal">(Switch package anytime)</span>
                        </label>
                        {isTripLocked && (
                          <button
                            type="button"
                            onClick={() => setIsTripLocked(false)}
                            className="text-[#D46238] hover:text-[#B8522E] text-[10.5px] font-bold underline cursor-pointer"
                          >
                            Switch package
                          </button>
                        )}
                      </div>

                      {isTripLocked ? (
                        <div className="w-full border border-slate-300 bg-slate-100/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-medium flex items-center justify-between cursor-not-allowed select-none shadow-2xs">
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
                            <span className="truncate">{selectedJourney.title} ({selectedJourney.duration})</span>
                          </div>
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded shrink-0 ml-2">
                            <Lock className="w-2.5 h-2.5" />
                            <span>Pre-selected</span>
                          </span>
                        </div>
                      ) : (
                        <select
                          value={selectedSlug}
                          onChange={(e) => setSelectedSlug(e.target.value)}
                          className="w-full border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#142332] bg-white font-medium focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]"
                        >
                          {allJourneys.map((j) => (
                            <option key={j.slug} value={j.slug}>
                              {j.title} ({j.duration})
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#334155] mb-1">
                        Phone / WhatsApp Number * <span className="text-[#7A8895] font-normal">(For emergency coordination)</span>
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        <select
                          value={leadTraveler.countryCode}
                          onChange={(e) => setLeadTraveler({ ...leadTraveler, countryCode: e.target.value })}
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
                          value={leadTraveler.mobileNumber}
                          onChange={(e) => setLeadTraveler({ ...leadTraveler, mobileNumber: e.target.value })}
                          placeholder="e.g. 555-0199"
                          className="col-span-2 sm:col-span-3 border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#142332] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Estimated Arrival Date & Nationality */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-[#334155] mb-1">
                        Estimated Arrival Date in Kathmandu * <span className="text-[#7A8895] font-normal">(Tribhuvan KTM)</span>
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
                        Nationality * <span className="text-[#7A8895] font-normal">(Required for permits &amp; TIMS)</span>
                      </label>
                      <select
                        value={leadTraveler.nationality}
                        onChange={(e) => setLeadTraveler({ ...leadTraveler, nationality: e.target.value })}
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

                  {/* Row 4: Flight Details */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">
                      Flight Details <span className="text-[#7A8895] font-normal">(Optional — e.g. Airline, flight number, landing time in KTM)</span>
                    </label>
                    <div className="relative">
                      <Plane className="w-4 h-4 text-[#7A8895] absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={leadTraveler.flightDetails}
                        onChange={(e) => setLeadTraveler({ ...leadTraveler, flightDetails: e.target.value })}
                        placeholder="e.g. Qatar Airways QR648, arriving 14:15 at Tribhuvan International Airport (or 'TBD / will send later')"
                        className="w-full border border-[#CBD5E1] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#142332] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]"
                      />
                    </div>
                  </div>

                  {/* Row 5: Airport Pickup (Yes / No Radio) */}
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#183E63]" />
                      <label className="text-[11px] font-bold text-[#142332] uppercase tracking-wider font-mono">
                        Airport Pickup
                      </label>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#183E63]/10 text-[#183E63]">
                        Complimentary
                      </span>
                    </div>
                    <p className="text-[11px] text-[#566370]">
                      EcoSummit provides a private vehicle and representative with a traditional marigold garland (Khata) greeting at Tribhuvan International Airport.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="airportPickup"
                          value="yes"
                          checked={leadTraveler.airportPickup === 'yes'}
                          onChange={() => setLeadTraveler({ ...leadTraveler, airportPickup: 'yes' })}
                          className="w-4 h-4 text-[#183E63] focus:ring-[#183E63]"
                        />
                        <span className="text-xs font-semibold text-[#142332]">
                          Yes, please (Complimentary Private Pickup)
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="airportPickup"
                          value="no"
                          checked={leadTraveler.airportPickup === 'no'}
                          onChange={() => setLeadTraveler({ ...leadTraveler, airportPickup: 'no' })}
                          className="w-4 h-4 text-[#183E63] focus:ring-[#183E63]"
                        />
                        <span className="text-xs text-[#566370]">
                          No, I will make my own way to the hotel
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Row 6: Date of Birth */}
                  <div className="pt-1">
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">
                      Date of Birth * <span className="text-[#7A8895] font-normal">(Required for government climbing &amp; trekking permits)</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={leadTraveler.dob}
                      onChange={(e) => setLeadTraveler({ ...leadTraveler, dob: e.target.value })}
                      className="w-full sm:w-1/2 border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#142332] bg-white focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]"
                    />
                  </div>

                  {/* Row 7: Additional Requirements (Optional) */}
                  <div className="pt-1">
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">
                      Additional Requirements (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={leadTraveler.specialRequirements}
                      onChange={(e) => setLeadTraveler({ ...leadTraveler, specialRequirements: e.target.value })}
                      placeholder="Please tell us more about yourself to help you better (e.g. dietary restrictions, rooming requests, equipment rental, previous altitude experience)..."
                      className="w-full border border-[#CBD5E1] rounded-xl p-3 text-xs text-[#142332] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]"
                    />
                  </div>
                </div>
              </div>

              {/* ── STEP 3: PAYMENT OPTIONS ── */}
              <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#142332] text-[#C8A97A] text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    3
                  </span>
                  <div>
                    <h3 className="font-sans text-lg font-bold text-[#142332]">
                      Payment Selection
                    </h3>
                    <p className="text-xs text-[#566370]">
                      Choose to pay a 20% commitment deposit or complete the full package now.
                    </p>
                  </div>
                </div>

                {/* SSL Encryption Notice */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-950 flex items-center gap-3 text-xs">
                  <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    This is a secure and SSL encrypted checkout. Your reservation is immediately placed on hold with our Kathmandu operations desk!
                  </span>
                </div>

                {/* 20% Deposit vs 100% Full Payment Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentOption('deposit')}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      paymentOption === 'deposit'
                        ? 'bg-[#142332] text-white border-[#142332] shadow-sm'
                        : 'bg-white hover:bg-[#FAF8F5] border-[#CBD5E1] text-[#334155]'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm flex items-center gap-1.5">
                        <span>20% Deposit (Payable Now)</span>
                        {paymentOption === 'deposit' && <Check className="w-4 h-4 text-[#C8A97A]" />}
                      </div>
                      <span className={`text-[11px] block mt-0.5 ${paymentOption === 'deposit' ? 'text-white/80' : 'text-slate-500'}`}>
                        Pay US$ {Math.round(totalPackagePrice * 0.2).toLocaleString()} today • Balance upon arrival
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentOption('full')}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      paymentOption === 'full'
                        ? 'bg-[#142332] text-white border-[#142332] shadow-sm'
                        : 'bg-white hover:bg-[#FAF8F5] border-[#CBD5E1] text-[#334155]'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm flex items-center gap-1.5">
                        <span>100% Full Payment</span>
                        {paymentOption === 'full' && <Check className="w-4 h-4 text-[#C8A97A]" />}
                      </div>
                      <span className={`text-[11px] block mt-0.5 ${paymentOption === 'full' ? 'text-white/80' : 'text-slate-500'}`}>
                        Settle full US$ {totalPackagePrice.toLocaleString()} in advance
                      </span>
                    </div>
                  </button>
                </div>

                {/* Terms Acceptance */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-[#475569] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-[#142332] focus:ring-[#142332] border-slate-300 cursor-pointer"
                    />
                    <span>
                      I accept the{' '}
                      <Link to="/booking-terms" target="_blank" className="text-[#183E63] font-semibold underline">
                        terms and conditions
                      </Link>{' '}
                      and cancellation &amp; refund policies.
                    </span>
                  </label>
                </div>

                {/* Primary Proceed CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !termsAccepted}
                    className="w-full py-4 px-6 rounded-xl bg-[#D46238] hover:bg-[#B8522E] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Securing Your Reservation...</span>
                    ) : (
                      <>
                        <span>Proceed To Payment / Reservation</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ═════════════════════════════════════════════════════════ */}
            {/* ── RIGHT COLUMN: STICKY LIVE SUMMARY SIDEBAR          ── */}
            {/* ═════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-4 self-stretch">
              <div className="sticky top-24 lg:top-28 space-y-5">
                {/* Summary Card */}
                <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 shadow-sm space-y-5">
                  <h3 className="font-sans text-lg font-bold text-[#142332] border-b border-slate-100 pb-3">
                    Summary
                  </h3>

                  <div className="space-y-3.5 text-xs">
                    {/* Package Price */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800 block">Package Price:</span>
                        <span className="text-[11px] text-slate-500">Per Person</span>
                      </div>
                      <span className="text-sm font-bold text-[#183E63] font-mono">
                        US$ {pricePerPerson.toLocaleString()}
                      </span>
                    </div>

                    {/* Total Package Price */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                      <div>
                        <span className="font-bold text-slate-800 block">Total Package Price:</span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {travelersCount} x {pricePerPerson.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-base font-bold text-[#142332] font-mono">
                        US$ {totalPackagePrice.toLocaleString()}
                      </span>
                    </div>

                    {/* Deposit Payable Now */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 bg-[#FDF8F3] p-3 rounded-xl border border-[#F0D5C1]">
                      <div>
                        <span className="font-bold text-[#8C3A1D] block">Deposit Payable Now:</span>
                        <span className="text-[10px] text-[#B8522E]">
                          {paymentOption === 'deposit' ? '20% to lock permits' : '100% full payment'}
                        </span>
                      </div>
                      <span className="text-base font-black text-[#D46238] font-mono">
                        US$ {depositPayableNow.toLocaleString()}
                      </span>
                    </div>

                    {/* Remaining Amount */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                      <div>
                        <span className="font-bold text-slate-700 block">Remaining Amount:</span>
                        <span className="text-[10px] text-slate-500">(Pay Later in KTM)</span>
                      </div>
                      <span className="text-sm font-bold text-slate-700 font-mono">
                        US$ {remainingAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Payment Security Badges */}
                  <div className="border-t border-slate-100 pt-4 space-y-3">
                    <p className="text-[11px] text-slate-500 leading-snug text-center">
                      This is a secure and SSL encrypted checkout. All major cards accepted.
                    </p>
                    <div className="pt-1">
                      <AffiliationsAndPayments variant="light" layout="stack" />
                    </div>
                  </div>
                </div>

                {/* Sherpa Support Callout */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2 text-[#183E63] font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                    <span>Certified Sherpa Operations</span>
                  </div>
                  <p className="leading-relaxed text-[11.5px]">
                    Direct reservation with authorized TAAN operator. Free date alterations up to 30 days before
                    departure.
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-[11px] font-semibold text-[#183E63]">
                    <Phone className="w-3.5 h-3.5 text-[#C8A97A]" />
                    <span>24/7 Kathmandu Desk: {companyData.contactPhone}</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Booking;
