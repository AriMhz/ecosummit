import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Mountain,
  Check,
  Compass,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Grid,
  ChevronLeft,
  ChevronRight,
  X as XIcon,
  Sun,
  CloudSun,
  Award,
  Users,
  CheckCircle2,
  Layers,
  Binoculars,
  TreePine,
  Mail
} from 'lucide-react';
import { destinationsData } from '../data/destinations';
import { allJourneys } from '../data/journeys';
import { JourneyCard } from '../components/cards/JourneyCard';
import logoImg from '../assets/logo.png';
import { companyData } from '../data/company';
import { EnquiryModal } from '../components/common/EnquiryModal';

export const DestinationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const destination = destinationsData.find((d) => d.slug === slug);

  // States
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [journeyFilter, setJourneyFilter] = useState<string>('all');
  const [isGroupDiscountsOpen, setIsGroupDiscountsOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [showSubNav, setShowSubNav] = useState(false);

  // Price computations
  const numericPrice = parseInt((destination?.startingPrice || '450').replace(/[^0-9]/g, ''), 10) || 450;
  const soloPrice = Math.round(numericPrice * 1.45);
  const groupDiscountPrice = Math.round(numericPrice * 0.9);

  // Fallback gallery if destination doesn't have 5 images
  const fallbackGallery = [
    destination?.image || 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
  ];

  const galleryImages = (destination?.gallery && destination.gallery.length >= 5)
    ? destination.gallery
    : fallbackGallery;

  // Sub-navigation sections (streamlined labels for clean fit)
  const navTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'summits', label: 'Summits' },
    { id: 'landmarks', label: 'Landmarks' },
    { id: 'seasonality', label: 'Season' },
    { id: 'logistics', label: 'Permits' },
    { id: 'ecology', label: 'Culture' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'journeys', label: 'Journeys' },
  ];

  // Horizontal scroll state & controls for sub-navigation tabs
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkTabScroll = () => {
    const el = tabsContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 6);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 6);
    }
  };

  useEffect(() => {
    checkTabScroll();
    window.addEventListener('resize', checkTabScroll);
    return () => window.removeEventListener('resize', checkTabScroll);
  }, []);

  const scrollTabs = (direction: 'left' | 'right') => {
    const el = tabsContainerRef.current;
    if (el) {
      const scrollAmount = 240;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkTabScroll, 320);
    }
  };

  // Auto-scroll active tab into view when activeTab updates
  useEffect(() => {
    if (activeTab && tabsContainerRef.current) {
      const activeEl = tabsContainerRef.current.querySelector(`[data-tab-id="${activeTab}"]`) as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        setTimeout(checkTabScroll, 350);
      }
    }
  }, [activeTab]);

  // Scroll spy to highlight active tab and conditionally trigger subnav
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Only trigger subnav after scrolling past the above-the-fold hero dossier into editorial content
      setShowSubNav(scrollPosition > 460);

      const offsetPos = scrollPosition + 100;
      for (let i = navTabs.length - 1; i >= 0; i--) {
        const tab = navTabs[i];
        const el = document.getElementById(tab.id);
        if (el && el.offsetTop <= offsetPos) {
          setActiveTab(tab.id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navTabs]);

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setActivePhotoIndex((prev) => (prev + 1) % galleryImages.length);
      if (e.key === 'ArrowLeft') setActivePhotoIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, galleryImages.length]);

  if (!destination) {
    return <Navigate to="/destinations" replace />;
  }

  // Find journeys matching this region or general fallback
  const allMatchingJourneys = allJourneys.filter((j) =>
    j.region.toLowerCase().includes(destination.name.toLowerCase().split(' ')[0]) ||
    destination.name.toLowerCase().includes(j.region.toLowerCase().split(' ')[0]) ||
    destination.slug.includes(j.region.toLowerCase().replace(/\s+/g, '-'))
  );

  const filteredJourneys = journeyFilter === 'all'
    ? allMatchingJourneys
    : allMatchingJourneys.filter((j) => j.category === journeyFilter);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -60;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const openLightboxAt = (idx: number) => {
    setActivePhotoIndex(idx);
    setLightboxOpen(true);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const months = destination.monthlySeasonality || [
    { month: 'January', short: 'J', status: 'average', description: 'Crisp cold skies, snow on high passes' },
    { month: 'February', short: 'F', status: 'average', description: 'Late winter, pleasant lower elevations' },
    { month: 'March', short: 'M', status: 'best', description: 'Rhododendron blossoms, clear mountain views' },
    { month: 'April', short: 'A', status: 'best', description: 'Peak trekking season, warm days, lively trails' },
    { month: 'May', short: 'M', status: 'best', description: 'High pass expedition window, lush lower hills' },
    { month: 'June', short: 'J', status: 'average', description: 'Early summer, afternoon cloud formations' },
    { month: 'July', short: 'J', status: 'average', description: 'Monsoon season, lush green terraces' },
    { month: 'August', short: 'A', status: 'average', description: 'Alpine wildflower carpets, rain shadow areas dry' },
    { month: 'September', short: 'S', status: 'good', description: 'Post-monsoon freshness, clearing blue skies' },
    { month: 'October', short: 'O', status: 'best', description: 'Finest clarity on Earth, vibrant festival season' },
    { month: 'November', short: 'N', status: 'best', description: 'Crisp azure skies, ideal trekking conditions' },
    { month: 'December', short: 'D', status: 'good', description: 'Quiet uncrowded trails, sunny winter days' },
  ];

  const regionalFaqs = destination.faqs || [
    {
      question: `What is the best time of year to visit the ${destination.name}?`,
      answer: `The premier trekking windows are Autumn (October to November) for crystal-clear mountain visibility, and Spring (March to May) for vibrant rhododendron blooms and milder high-pass temperatures.`,
    },
    {
      question: `What permits are required for the ${destination.name}?`,
      answer: `All national park and conservation area permits, local municipality registrations, and required guide credentials are organized and secured directly by EcoSummit prior to your departure from Kathmandu.`,
    },
    {
      question: `How physically challenging are journeys in this region?`,
      answer: `Routes range from gentle cultural lodge walks (3–5 hours daily) to challenging high-pass crossings (6–8 hours daily). Every itinerary includes built-in acclimatisation pacing to ensure safe altitude progression.`,
    },
    {
      question: `Can EcoSummit customize a private bespoke itinerary here?`,
      answer: `Yes, absolutely. We tailor private departures according to your travel window, fitness level, preferred accommodation style (luxury lodges vs. remote wilderness camps), and personal interests.`,
    },
  ];

  const renderPricingCard = () => (
    <div className="bg-white border border-[#E8E2D8] rounded-3xl p-6 sm:p-7 shadow-[0_12px_36px_rgba(20,35,50,0.06)] space-y-4">
      {/* Price Display */}
      <div className="space-y-1">
        <span className="text-[11px] uppercase tracking-wider text-[#7A8895] block font-sans font-bold">
          REGIONAL TRIPS FROM
        </span>
        <div className="flex items-baseline gap-2.5">
          <span className="font-sans text-3xl sm:text-4xl lg:text-[40px] text-[#142332] font-black tracking-tight leading-none">
            USD {numericPrice.toLocaleString()}
          </span>
          <span className="text-[11px] font-sans font-bold text-[#5D6B78] uppercase tracking-wider bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#E8E2D8]">
            / PERSON
          </span>
        </div>
      </div>

      {/* Group Size Discounts Collapsible Table */}
      <div className="space-y-2 pt-2 border-t border-[#E8E2D8]">
        <button
          type="button"
          onClick={() => setIsGroupDiscountsOpen(!isGroupDiscountsOpen)}
          className="w-full flex items-center justify-between text-left group cursor-pointer"
        >
          <span className="text-xs sm:text-sm font-sans font-bold text-[#142332] group-hover:text-[#D46238] transition-colors flex items-center gap-1.5">
            <span>SEE GROUP BOOKING DISCOUNT</span>
          </span>
          <span className="text-[#7A8895] group-hover:text-[#D46238] transition-transform duration-200">
            {isGroupDiscountsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </button>

        {isGroupDiscountsOpen && (
          <div className="space-y-2 pt-1">
            <p className="text-[11px] text-[#5D6B78] leading-relaxed font-normal">
              Discounts are solely based on your group size. We do not add strangers to private groups.
            </p>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-[#E8E2D8] text-xs">
              <div className="grid grid-cols-2 bg-[#142332] text-white font-semibold text-[11px] uppercase tracking-wider px-3.5 py-2">
                <span>No. of people</span>
                <span className="text-right">Price per person</span>
              </div>
              <div className="divide-y divide-[#E8E2D8] bg-white text-[#5D6B78]">
                <div className="grid grid-cols-2 px-3.5 py-2 hover:bg-[#FAF8F5] transition-colors">
                  <span>1 pax</span>
                  <span className="text-right font-sans font-semibold text-[#142332]">USD {soloPrice.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 px-3.5 py-2 bg-[#FAF8F5] font-medium text-[#142332] border-l-2 border-[#D46238]">
                  <span className="font-semibold text-[#142332]">2-6 pax</span>
                  <span className="text-right font-sans font-bold text-[#D46238]">USD {numericPrice.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 px-3.5 py-2 hover:bg-[#FAF8F5] transition-colors">
                  <span>7+ pax</span>
                  <span className="text-right font-sans font-semibold text-[#142332]">USD {groupDiscountPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fast Action Buttons */}
      <div className="space-y-2.5 pt-1">
        <Link
          to={`/plan-your-trip?destination=${encodeURIComponent(destination?.name || '')}`}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 bg-[#D46238] hover:bg-[#B8522E] text-white text-sm sm:text-base font-sans font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.01] cursor-pointer text-center group"
        >
          <span>Plan This Destination</span>
          <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => scrollToSection('journeys')}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white hover:bg-[#FAF8F5] text-[#142332] border border-[#E8E2D8] hover:border-[#142332] text-xs sm:text-sm font-sans font-bold rounded-xl transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer text-center group"
          >
            <Compass className="w-3.5 h-3.5 text-[#7A8895] group-hover:text-[#D46238] transition-colors" />
            <span>View Routes</span>
          </button>

          <button
            type="button"
            onClick={() => setEnquiryOpen(true)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white hover:bg-[#FAF8F5] text-[#142332] border border-[#E8E2D8] hover:border-[#142332] text-xs sm:text-sm font-sans font-bold rounded-xl transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer text-center group"
          >
            <Mail className="w-3.5 h-3.5 text-[#7A8895] group-hover:text-[#D46238] transition-colors" />
            <span>Inquire Now</span>
          </button>
        </div>
      </div>

      {/* Guarantees & Safety List */}
      <div className="space-y-2 pt-2.5 border-t border-[#E8E2D8]">
        <h4 className="text-[11px] uppercase tracking-wider font-mono font-bold text-[#142332]">
          EcoSummit Safety & Quality
        </h4>
        <div className="space-y-1.5 text-xs text-[#5D6B78]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700/80 shrink-0" />
            <span>Native High-Altitude Sherpa Guides</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700/80 shrink-0" />
            <span>98% Route & Itinerary Success Rate</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700/80 shrink-0" />
            <span>Free Date Changes up to 30 Days</span>
          </div>
        </div>
      </div>

      {/* Direct Contact Specialists */}
      <div className="space-y-2 pt-2.5 border-t border-[#E8E2D8]">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A8895] block">
          Questions? Speak With A Specialist:
        </span>

        <a
          href={`https://wa.me/${companyData.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20EcoSummit,%20I%20am%20interested%20in%20visiting%20the%20${encodeURIComponent(destination?.name || '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white hover:bg-[#FAF8F5] border border-[#E8E2D8] hover:border-[#25D366]/60 text-[#142332] text-xs font-semibold rounded-xl transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]/20 shrink-0" />
            <span className="font-sans font-medium text-[#142332]">Chat on WhatsApp</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Online Now
          </span>
        </a>

        <a
          href={`tel:${companyData.contactPhone.replace(/\s+/g, '')}`}
          className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white hover:bg-[#FAF8F5] border border-[#E8E2D8] hover:border-[#142332] text-[#142332] text-xs font-semibold rounded-xl transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#7A8895] group-hover:text-[#D46238] transition-colors shrink-0" />
            <span className="font-sans font-medium text-[#142332]">{companyData.contactPhone}</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#7A8895] group-hover:text-[#142332] group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FAF8F5] text-[#142332] min-h-screen">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── 1. EXPEDITION TOP HEADER (BREADCRUMB, TITLE, ACTION)    ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="pt-28 sm:pt-32 pb-4 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-3.5">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B7D8F]">
            <Link to="/" className="hover:text-[#142332] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/destinations" className="hover:text-[#142332] transition-colors">Destinations</Link>
            <span>/</span>
            <span className="text-[#142332] font-medium truncate max-w-xs">{destination.name}</span>
          </nav>

          {/* Title & Action Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2.5 max-w-4xl">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#142332] font-normal leading-[1.15] tracking-tight">
                {destination.name} - Nepal Regional Dossier
              </h1>

              {/* TripAdvisor Rating & Trust Row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-[13px]">
                {/* TripAdvisor 5 Green Dots Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#00AA6C]/10 border border-[#00AA6C]/30 text-[#006644]">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="w-3.5 h-3.5 rounded-full bg-[#00AA6C] flex items-center justify-center text-white text-[9px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </span>
                    ))}
                  </div>
                  <span className="font-bold text-[#142332] ml-0.5">4.97</span>
                  <span className="text-[#526B7E] font-medium">(280+ TripAdvisor Reviews)</span>
                </div>

                <span className="hidden sm:inline text-[#CBD5E1]">•</span>

                <span className="inline-flex items-center gap-1.5 text-[#2E7D32] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                  <span>NTB Vetted Himalayan Corridor</span>
                </span>

                <span className="hidden sm:inline text-[#CBD5E1]">•</span>

                <span className="inline-flex items-center gap-1.5 text-[#183E63] font-semibold">
                  <Award className="w-4 h-4 text-[#E5A93C]" />
                  <span>{destination.journeyCount || 3} Sherpa-Led Routes</span>
                </span>
              </div>
            </div>

            {/* Quick Action to Explore Journeys */}
            <div className="shrink-0 flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToSection('journeys')}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#E8E2D8] hover:border-[#142332] text-[#142332] text-xs sm:text-sm font-sans font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
              >
                <Compass className="w-4 h-4 text-[#7A8895] group-hover:text-[#D46238] transition-colors" />
                <span>Explore {destination.journeyCount} Journeys</span>
              </button>
            </div>
          </div>

          {/* Narrative Lead Paragraph */}
          <p className="text-sm sm:text-base text-[#566370] leading-relaxed font-light max-w-4xl pt-1">
            {destination.subtitle ? `"${destination.subtitle}" — ` : ''}{destination.description}
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── 2. 5-PHOTO MOSAIC GALLERY (AIRBNB STYLE) ON VERY TOP    ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="pt-2 pb-4 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="relative rounded-3xl overflow-hidden border border-[#E8E2D8] bg-slate-900 shadow-sm">
            {/* Gallery Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[320px] sm:h-[420px] lg:h-[480px]">
              {/* Left Column: Hero Main Photo (Spans 2 columns on desktop) */}
              <div
                onClick={() => openLightboxAt(0)}
                className="md:col-span-2 h-full overflow-hidden relative group cursor-pointer"
              >
                <img
                  src={galleryImages[0]}
                  alt={`${destination.name} - Featured Panorama`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <span className="absolute top-4 left-4 bg-[#142332]/85 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured Panorama
                </span>
              </div>

              {/* Right Column: 4-Photo 2x2 Mosaic (Spans 2 columns on desktop) */}
              <div className="hidden md:grid col-span-2 grid-cols-2 gap-2 h-full">
                {galleryImages.slice(1, 5).map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => openLightboxAt(idx + 1)}
                    className="h-full overflow-hidden relative group cursor-pointer"
                  >
                    <img
                      src={imgUrl}
                      alt={`${destination.name} photo ${idx + 2}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Floating "Show all photos" Button at Bottom Right */}
            <button
              onClick={() => openLightboxAt(0)}
              className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-[#142332] text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 border border-[#E8E2D8] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <Grid className="w-4 h-4 text-[#183E63]" />
              <span>Show all {galleryImages.length} photos</span>
            </button>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── 3. FULL-SCREEN LIGHTBOX MODAL                            ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between text-white p-4 sm:p-6 select-none">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg text-[#FAF8F5]">{destination.name}</span>
              <span className="text-xs text-white/60 font-mono">
                {activePhotoIndex + 1} / {galleryImages.length}
              </span>
            </div>

            <button
              onClick={() => setLightboxOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close photo viewer"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image View with Arrows */}
          <div className="relative flex-grow flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={() => setActivePhotoIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
              className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={galleryImages[activePhotoIndex]}
              alt={`${destination.name} preview`}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
            />

            <button
              onClick={() => setActivePhotoIndex((prev) => (prev + 1) % galleryImages.length)}
              className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div className="flex items-center justify-center gap-2.5 overflow-x-auto py-2 border-t border-white/10">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActivePhotoIndex(i)}
                className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  activePhotoIndex === i ? 'border-[#D46238] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── CONDITIONAL TRIGGERED SUB-NAVIGATION BAR (HIDDEN BY DEFAULT) ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ease-in-out ${
          showSubNav
            ? 'translate-y-0 opacity-100 bg-white/95 backdrop-blur-md border-b border-[#E8E2D8] shadow-md pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-4 py-3.5 sm:py-4">
            {/* Brand Logo for home access when upper nav is hidden */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 shrink-0 pr-4 sm:pr-5 border-r border-[#E8E2D8] hover:opacity-85 transition-opacity cursor-pointer"
              title="Return to EcoSummit Nepal Home"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-[#E8E2D8] p-1.5 flex items-center justify-center shadow-xs">
                <img src={logoImg} alt="EcoSummit" className="w-full h-full object-contain" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-serif font-bold text-lg sm:text-xl text-[#142332] tracking-tight leading-none">
                  EcoSummit
                </span>
                <span className="text-[9.5px] font-sans uppercase tracking-[0.2em] text-[#6B7D8F] font-bold mt-0.5">
                  Expeditions
                </span>
              </div>
            </Link>

            {/* Middle: Horizontal scrolling tabs with scroll controls & smooth gradient edge masks */}
            <div className="relative flex items-center flex-grow min-w-0 overflow-hidden px-1">
              {/* Left scroll button */}
              {canScrollLeft && (
                <button
                  type="button"
                  onClick={() => scrollTabs('left')}
                  className="absolute left-1 z-20 w-8 h-8 rounded-full bg-white/95 border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-[#183E63] hover:bg-slate-50 transition-all cursor-pointer shrink-0"
                  aria-label="Scroll tabs left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {/* Left fade gradient */}
              {canScrollLeft && (
                <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
              )}

              {/* Tabs container */}
              <div
                ref={tabsContainerRef}
                onScroll={checkTabScroll}
                className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar scroll-smooth flex-grow py-1 px-1"
              >
                {navTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      data-tab-id={tab.id}
                      onClick={() => scrollToSection(tab.id)}
                      className={`px-3.5 sm:px-4 py-1.5 rounded-full font-semibold text-xs sm:text-[13.5px] whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 tracking-tight ${
                        isActive
                          ? 'bg-[#142332] text-white shadow-sm font-bold'
                          : 'bg-transparent text-[#2D3748] hover:text-[#142332] hover:bg-slate-100/90'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Right fade gradient */}
              {canScrollRight && (
                <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
              )}

              {/* Right scroll button */}
              {canScrollRight && (
                <button
                  type="button"
                  onClick={() => scrollTabs('right')}
                  className="absolute right-1 z-20 w-8 h-8 rounded-full bg-white/95 border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-[#183E63] hover:bg-slate-50 transition-all cursor-pointer shrink-0"
                  aria-label="Scroll tabs right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Right: Quick Action (Explore Journeys) */}
            <div className="shrink-0 hidden md:flex items-center gap-2 pl-3 border-l border-[#E8E2D8]">
              <button
                onClick={() => scrollToSection('journeys')}
                className="px-5 py-2 rounded-full bg-[#D46238] hover:bg-[#b8522e] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                Explore Routes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── 5. MAIN CONTENT TWO-COLUMN DOSSIER                       ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="pt-2 pb-16 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* ═══════════════════════════════════════════════════════ */}
            {/* ── LEFT COLUMN: DETAILED REGIONAL DOSSIER (8 COLS)   ── */}
            {/* ═══════════════════════════════════════════════════════ */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-14">
            
            {/* Key Facts Card (2-Column Tabular Grid Matching Treks Page Reference) */}
            <div className="bg-white rounded-2xl border border-[#E8E2D8] shadow-xs overflow-hidden mt-1">
              <div className="px-5 py-3 bg-[#FAF8F5] border-b border-[#E8E2D8] flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-[#142332] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D46238]" />
                  Key Facts & Regional Dossier
                </span>
                <span className="text-xs text-[#6B7D8F] font-mono">
                  {destination.coordinates || 'Nepal Himalaya'}
                </span>
              </div>

              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs sm:text-[13.5px]">
                
                {/* Country / Zone */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1]">
                  <span className="text-[#6B7D8F] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#183E63]" />
                    Country / Zone:
                  </span>
                  <span className="font-semibold text-[#142332]">Nepal</span>
                </div>

                {/* Best Season */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1]">
                  <span className="text-[#6B7D8F] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#D46238]" />
                    Best Season:
                  </span>
                  <span className="font-semibold text-[#142332] truncate max-w-[200px]" title={destination.bestSeason}>
                    {destination.bestSeason?.split('(')[0]?.trim() || 'Year-round'}
                  </span>
                </div>

                {/* Elevation Span */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1]">
                  <span className="text-[#6B7D8F] flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-[#183E63]" />
                    Elevation Span:
                  </span>
                  <span className="font-semibold text-[#142332]">
                    {destination.elevationRange?.split('(')[0]?.trim() || '1,300m – 2,200m'}
                  </span>
                </div>

                {/* Trail Style */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1]">
                  <span className="text-[#6B7D8F] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#D46238]" />
                    Trail Style:
                  </span>
                  <span className="font-semibold text-[#142332] truncate max-w-[200px]" title={destination.trailStyle}>
                    {destination.trailStyle?.split(',')[0]?.trim() || 'Scenic Alpine Trails'}
                  </span>
                </div>

                {/* Gateway Hub */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1]">
                  <span className="text-[#6B7D8F] flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#183E63]" />
                    Gateway Hub:
                  </span>
                  <span className="font-semibold text-[#142332] truncate max-w-[210px] sm:max-w-[240px]" title={destination.gateway}>
                    {destination.gateway?.replace('International Airport', "Int'l Airport").split('/')[0]?.trim() || 'Kathmandu (KTM)'}
                  </span>
                </div>

                {/* Curated Journeys */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1]">
                  <span className="text-[#6B7D8F] flex items-center gap-2">
                    <Binoculars className="w-4 h-4 text-[#D46238]" />
                    Curated Journeys:
                  </span>
                  <span className="font-semibold text-[#142332]">
                    {destination.journeyCount || 3} Curated Routes
                  </span>
                </div>

                {/* Conservation Status */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1]">
                  <span className="text-[#6B7D8F] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#183E63]" />
                    Protected Status:
                  </span>
                  <span className="font-semibold text-[#142332] truncate max-w-[210px] sm:max-w-[240px]" title={destination.unescoStatus || 'National Protected Area'}>
                    {destination.unescoStatus?.toLowerCase().includes('unesco')
                      ? 'UNESCO World Heritage'
                      : destination.unescoStatus?.toLowerCase().includes('ramsar')
                        ? 'Ramsar Wetland Site'
                        : destination.unescoStatus?.toLowerCase().includes('conservation')
                          ? 'Conservation Area'
                          : destination.unescoStatus?.toLowerCase().includes('national park')
                            ? 'National Park'
                            : 'Protected Sanctuary'}
                  </span>
                </div>

                {/* Starting Rate */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1]">
                  <span className="text-[#6B7D8F] flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#D46238]" />
                    Starting Price:
                  </span>
                  <span className="font-semibold text-[#142332]">
                    From {destination.startingPrice || '$450'} / person
                  </span>
                </div>

                {/* Living Heritage */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1] sm:border-b-0">
                  <span className="text-[#6B7D8F] flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#183E63]" />
                    Living Heritage:
                  </span>
                  <span className="font-semibold text-[#142332] truncate max-w-[210px] sm:max-w-[240px]" title={destination.dominantCulture}>
                    {destination.dominantCulture
                      ? destination.dominantCulture
                          .split('•')[0]
                          .split('&')[0]
                          .replace(/\s+and\s+/i, ' & ')
                          .replace(/lakeside communities|monastic heritage|cultural mosaic|sanctuaries/gi, '')
                          .trim()
                      : 'Highland Cultures'}
                  </span>
                </div>

                {/* Official Vetting */}
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#6B7D8F] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                    Official Vetting:
                  </span>
                  <span className="font-semibold text-[#2E7D32] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] animate-pulse" />
                    NTB Vetted Corridor
                  </span>
                </div>

              </div>
            </div>

            {/* Mobile-Only Pricing Card (Visible directly below Key Facts on mobile) */}
            <div className="block lg:hidden">
              {renderPricingCard()}
            </div>

            {/* Section A: Overview & Cultural Heritage */}
            <section id="overview" className="scroll-mt-36 space-y-6">
              <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-[#D46238]">
                <span className="w-8 h-[2px] bg-[#D46238]"></span>
                <span>REGIONAL INSIGHT & HERITAGE</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#142332] font-normal leading-tight">
                What Makes {destination.name} Unique
              </h2>

              <div className="text-[#3D4B58] font-light leading-relaxed text-base sm:text-lg lg:text-xl space-y-4">
                <p>
                  {destination.description} Travelling here offers a distinct combination of high biodiversity, ancient monastic sanctuaries, stone-walled hamlets, and Himalayan panoramas that distinguish this corridor from the rest of Nepal.
                </p>
                {destination.culturalProfile && (
                  <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-4 my-8">
                    <div className="flex items-center gap-3 text-[#183E63]">
                      <Sparkles className="w-6 h-6 text-[#D46238]" />
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#142332] font-normal">
                        {destination.culturalProfile.title}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-[#566370] font-light">
                      {destination.culturalProfile.narrative}
                    </p>

                    {destination.culturalProfile.monasteries && destination.culturalProfile.monasteries.length > 0 && (
                      <div className="pt-3 border-t border-[#EAE5DC]">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#142332] block mb-2">
                          Venerated Sanctuaries & Monasteries:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {destination.culturalProfile.monasteries.map((m, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#EAE5DC] text-xs text-[#142332]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D46238]" />
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Section B: Prominent Summits & High Passes */}
            <section id="summits" className="scroll-mt-36 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-[#D46238] mb-2">
                  <span className="w-8 h-[2px] bg-[#D46238]"></span>
                  <span>ALPINE TOPOGRAPHY & SKYLINE</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#142332] font-normal leading-tight">
                  Prominent Summits & High Passes
                </h2>
                <p className="text-sm text-[#566370] font-light mt-2">
                  The crown jewels of the regional skyline, shaping weather patterns and inspiring spiritual devotion.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(destination.detailedPeaks && destination.detailedPeaks.length > 0
                  ? destination.detailedPeaks
                  : destination.keyPeaks.map((p) => ({ name: p, altitude: 'Himalayan Giant', significance: 'Prominent mountain crest framing this corridor.' }))
                ).map((peak, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-[#E8E2D8] hover:border-[#183E63]/40 transition-all hover:shadow-md">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-[#183E63]/10 text-[#183E63] flex items-center justify-center shrink-0">
                        <Mountain className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[#D46238] border border-[#EAE5DC]">
                        {peak.altitude}
                      </span>
                    </div>
                    <h4 className="font-serif text-xl text-[#142332] font-medium">{peak.name}</h4>
                    <p className="text-xs text-[#6B7D8F] mt-1.5 leading-relaxed font-light">{peak.significance}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section C: Key Landmarks & Waypoints */}
            <section id="landmarks" className="scroll-mt-36 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-[#D46238] mb-2">
                  <span className="w-8 h-[2px] bg-[#D46238]"></span>
                  <span>ICONIC REGIONAL WAYPOINTS</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#142332] font-normal leading-tight">
                  Iconic Landmarks & Waypoint Highlights
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(destination.landmarksList && destination.landmarksList.length > 0
                  ? destination.landmarksList
                  : destination.highlights.map((h) => ({ name: h, category: 'Iconic Highlight', description: 'Essential milestone experienced on routes through this region.', altitude: 'Alpine' }))
                ).map((landmark, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-[#E8E2D8] hover:border-[#D46238]/40 transition-all space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#183E63]/10 text-[#183E63] font-medium uppercase tracking-wider text-[10px]">
                        {landmark.category}
                      </span>
                      {landmark.altitude && (
                        <span className="font-mono text-[#6B7D8F]">{landmark.altitude}</span>
                      )}
                    </div>
                    <h4 className="font-serif text-lg text-[#142332] font-medium">{landmark.name}</h4>
                    <p className="text-xs text-[#566370] leading-relaxed font-light">{landmark.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section D: When to Visit (12-Month Indicator) */}
            <section id="seasonality" className="scroll-mt-36 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-[#D46238] mb-2">
                  <span className="w-8 h-[2px] bg-[#D46238]"></span>
                  <span>CLIMATE & VISIBILITY CALENDAR</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#142332] font-normal leading-tight">
                  When to Visit {destination.name}
                </h2>
                <p className="text-sm text-[#566370] font-light mt-1">
                  Nepal experiences distinct microclimates. Use our 12-month calendar to choose your preferred balance of visibility, temperature, and flora.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-6">
                {/* 12-month grid */}
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
                  {months.map((m, idx) => {
                    const isBest = m.status === 'best';
                    const isGood = m.status === 'good';
                    return (
                      <div
                        key={idx}
                        className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                          isBest
                            ? 'bg-[#2E7D32]/10 border-[#2E7D32]/30 text-[#1B5E20]'
                            : isGood
                            ? 'bg-[#F59E0B]/10 border-[#F59E0B]/30 text-[#B45309]'
                            : 'bg-[#FAF8F5] border-[#E8E2D8] text-[#7A8895]'
                        }`}
                      >
                        <span className="text-xs font-bold">{m.short}</span>
                        <span className="text-[9px] uppercase tracking-wider mt-0.5 font-medium">
                          {isBest ? 'Best' : isGood ? 'Good' : 'Low'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#566370] pt-4 border-t border-[#EAE5DC]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#2E7D32]" />
                    <span><strong>Prime Season:</strong> Crystal-clear views, stable high pressures</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                    <span><strong>Good Season:</strong> Favorable conditions, quieter paths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#9E9E9E]" />
                    <span><strong>Monsoon / Winter:</strong> Off-season or specialized routes</span>
                  </div>
                </div>

                {/* Seasonal Breakdown Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-1.5">
                    <div className="flex items-center gap-2 text-[#2E7D32] font-semibold text-xs uppercase tracking-wider">
                      <Sun className="w-4 h-4" />
                      <span>Spring (March – May)</span>
                    </div>
                    <p className="text-xs text-[#566370] leading-relaxed">
                      Wild rhododendron forests in bloom, mild high-pass temperatures, active mountaineering expeditions preparing Base Camps.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-1.5">
                    <div className="flex items-center gap-2 text-[#183E63] font-semibold text-xs uppercase tracking-wider">
                      <CloudSun className="w-4 h-4" />
                      <span>Autumn (October – November)</span>
                    </div>
                    <p className="text-xs text-[#566370] leading-relaxed">
                      Unmatched atmospheric clarity with pure cobalt skies following monsoon rains. Ideal for high panoramic photography and cultural festivals.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section E: Permits & Logistics Guide */}
            <section id="logistics" className="scroll-mt-36 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-[#D46238] mb-2">
                  <span className="w-8 h-[2px] bg-[#D46238]"></span>
                  <span>PERMITS & CORRIDOR LOGISTICS</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#142332] font-normal leading-tight">
                  Permits, Checkpoints & Mountain Logistics
                </h2>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Permits Column */}
                  <div className="space-y-3">
                    <h4 className="font-serif text-lg text-[#142332] font-medium flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                      <span>Required Permits & Fees</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-[#566370]">
                      {(destination.permitsLogistics?.permits || [
                        'National Park / Conservation Area Entry Permit',
                        'Local Municipality Conservation Card',
                        'TIMS Registration Card',
                      ]).map((permit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                          <span>{permit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Flight & Transport Logistics */}
                  <div className="space-y-3">
                    <h4 className="font-serif text-lg text-[#142332] font-medium flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#D46238]" />
                      <span>Access & Flight Logistics</span>
                    </h4>
                    <p className="text-xs text-[#566370] leading-relaxed">
                      {destination.permitsLogistics?.flightLogistics ||
                        `Regular scheduled domestic flights and private overland 4WD transport connect Kathmandu directly to regional trailheads.`}
                    </p>
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] text-[11px] text-[#8C5D38]">
                      <strong>Weather Contingency:</strong> {destination.permitsLogistics?.weatherNote || 'EcoSummit maintains priority helicopter reserve status for weather delays.'}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section F: Ecology & Wildlife */}
            <section id="ecology" className="scroll-mt-36 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-[#D46238] mb-2">
                  <span className="w-8 h-[2px] bg-[#D46238]"></span>
                  <span>BIODIVERSITY & LIVING HERITAGE</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#142332] font-normal leading-tight">
                  High Himalayan Flora & Fauna
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center">
                    <TreePine className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-xl text-[#142332]">Flora & Forest Belts</h4>
                  <ul className="space-y-1.5 text-xs text-[#566370]">
                    {(destination.wildlifeEcology?.flora || [
                      'Subalpine Rhododendron (multiple varieties)',
                      'Himalayan Birch & Blue Pine forests',
                      'Alpine meadows with dwarf juniper and edelweiss',
                    ]).map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D46238]/10 text-[#D46238] flex items-center justify-center">
                    <Binoculars className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-xl text-[#142332]">Wildlife & Rare Species</h4>
                  <ul className="space-y-1.5 text-xs text-[#566370]">
                    {(destination.wildlifeEcology?.fauna || [
                      'Snow Leopard (Panthera uncia)',
                      'Himalayan Tahr & Musk Deer',
                      'Danphe / Himalayan Monal (National Bird)',
                    ]).map((fauna, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D46238]" />
                        <span>{fauna}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section G: Why EcoSummit */}
            <section id="why-us" className="scroll-mt-36 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-[#D46238] mb-2">
                  <span className="w-8 h-[2px] bg-[#D46238]"></span>
                  <span>THE ECOSUMMIT STANDARD</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#142332] font-normal leading-tight">
                  Why Explore {destination.name} With Us
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#183E63]/10 text-[#183E63] flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="font-serif text-lg text-[#142332]">Native Sherpa Leadership</h4>
                  <p className="text-xs text-[#566370] leading-relaxed">
                    Our expedition leaders were born and raised in these mountain valleys, bringing deep generational knowledge and trusted community relationships.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="font-serif text-lg text-[#142332]">Daily Pulse Oximetry Pacing</h4>
                  <p className="text-xs text-[#566370] leading-relaxed">
                    Every morning and evening, your guide monitors your blood oxygen saturation and resting pulse, making informed acclimatisation decisions.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#D46238]/10 text-[#D46238] flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="font-serif text-lg text-[#142332]">Fair Porter Welfare (IPPG)</h4>
                  <p className="text-xs text-[#566370] leading-relaxed">
                    We strictly adhere to the International Porter Protection Group guidelines with fair wages, mountain gear, medical insurance, and strict weight caps.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#B8860B]/10 text-[#B8860B] flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <h4 className="font-serif text-lg text-[#142332]">100% Direct Transparent Pricing</h4>
                  <p className="text-xs text-[#566370] leading-relaxed">
                    No middlemen or offshore booking agencies. As a locally registered operator in Thamel, your investment directly empowers Nepali mountain staff.
                  </p>
                </div>
              </div>
            </section>

            {/* Section H: Regional FAQs */}
            <section id="faqs" className="scroll-mt-36 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-[#D46238] mb-2">
                  <span className="w-8 h-[2px] bg-[#D46238]"></span>
                  <span>FREQUENTLY ASKED QUESTIONS</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#142332] font-normal leading-tight">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3">
                {regionalFaqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white border border-[#E8E2D8] overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-[#142332] hover:text-[#183E63] transition-colors cursor-pointer"
                      >
                        <span className="pr-4">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#D46238] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#7A8895] shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-xs sm:text-sm text-[#566370] font-light leading-relaxed border-t border-[#FAF8F5] pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ═════════════════════════════════════════════════════════ */}
          {/* ── RIGHT COLUMN: Desktop Sticky Pricing Card            ── */}
          {/* ═════════════════════════════════════════════════════════ */}
          <div className="hidden lg:block lg:col-span-4 self-stretch">
            <div className="sticky top-20 lg:top-24 space-y-5">
              {renderPricingCard()}

              {/* Expedition Lead Profile Card */}
              <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] flex items-center gap-4 shadow-xs">
                <div className="w-13 h-13 rounded-2xl bg-[#142332] text-white flex items-center justify-center font-serif text-lg font-bold shrink-0 shadow-xs">
                  ES
                </div>
                <div>
                  <span className="text-[11px] text-[#D46238] uppercase tracking-wider font-semibold block font-mono">Regional Specialist</span>
                  <strong className="text-sm text-[#142332] block font-serif">EcoSummit Field Leaders</strong>
                  <span className="text-xs text-[#6B7D8F] font-light">Sherpa-led alpine logistics & 24/7 rescue coordination</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── 7. CURATED JOURNEYS IN THIS REGION                       ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="journeys" className="py-16 border-t border-[#E8E2D8] bg-[#F4F1EA]/60 scroll-mt-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-[#D46238] mb-2">
                <span className="w-8 h-[2px] bg-[#D46238]"></span>
                <span>CURATED REGIONAL ROUTES</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#142332] font-normal tracking-tight">
                Journeys in {destination.name}
              </h2>
              <p className="text-sm text-[#566370] font-light mt-1">
                From high-altitude passes to luxury tea-lodge circuits, choose your preferred expedition style.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
              <button
                onClick={() => setJourneyFilter('all')}
                className={`px-4 py-2 rounded-full font-medium transition-colors shrink-0 cursor-pointer ${
                  journeyFilter === 'all'
                    ? 'bg-[#142332] text-white shadow-xs'
                    : 'bg-white text-[#566370] hover:bg-[#EAE5DC] border border-[#E8E2D8]'
                }`}
              >
                All ({allMatchingJourneys.length})
              </button>
              <button
                onClick={() => setJourneyFilter('trek')}
                className={`px-4 py-2 rounded-full font-medium transition-colors shrink-0 cursor-pointer ${
                  journeyFilter === 'trek'
                    ? 'bg-[#142332] text-white shadow-xs'
                    : 'bg-white text-[#566370] hover:bg-[#EAE5DC] border border-[#E8E2D8]'
                }`}
              >
                Alpine Treks
              </button>
              <button
                onClick={() => setJourneyFilter('expedition')}
                className={`px-4 py-2 rounded-full font-medium transition-colors shrink-0 cursor-pointer ${
                  journeyFilter === 'expedition'
                    ? 'bg-[#142332] text-white shadow-xs'
                    : 'bg-white text-[#566370] hover:bg-[#EAE5DC] border border-[#E8E2D8]'
                }`}
              >
                Expeditions
              </button>
              <button
                onClick={() => setJourneyFilter('tour')}
                className={`px-4 py-2 rounded-full font-medium transition-colors shrink-0 cursor-pointer ${
                  journeyFilter === 'tour'
                    ? 'bg-[#142332] text-white shadow-xs'
                    : 'bg-white text-[#566370] hover:bg-[#EAE5DC] border border-[#E8E2D8]'
                }`}
              >
                Cultural Tours
              </button>
            </div>
          </div>

          {filteredJourneys.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredJourneys.map((j) => (
                <JourneyCard key={j.slug} journey={j} variant="editorial" />
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-white border border-[#E8E2D8] text-center max-w-lg mx-auto space-y-4">
              <p className="text-sm text-[#566370]">No journeys currently listed under this specific filter.</p>
              <button
                onClick={() => setJourneyFilter('all')}
                className="text-xs font-bold text-[#183E63] underline cursor-pointer"
              >
                View all journeys in {destination.name}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── 8. BOTTOM REGIONAL CUSTOM PLANNING CTA                  ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#142332] text-white relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D46238]/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D46238] block">
              Bespoke Himalayan Journeys
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
              Ready to Walk the Trails of {destination.name}?
            </h2>
            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
              Whether you wish to stand at high mountain base camps, cross untamed passes, or linger in ancient village monasteries, our Kathmandu team will craft an itinerary matched to your vision.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/plan-your-trip"
                className="px-8 py-4 rounded-full bg-[#D46238] hover:bg-[#b8522e] text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Plan Your Private Journey
              </Link>
              <a
                href={`https://wa.me/9779841063000?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20a%20trip%20to%20${encodeURIComponent(destination.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs font-bold uppercase tracking-widest transition-all backdrop-blur-xs flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: +977 984-1063000</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Popup Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        journeyTitle={`${destination.name} Regional Exploration`}
      />
    </div>
  );
};
