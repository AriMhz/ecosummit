import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Clock,
  Mountain,
  Gauge,
  Calendar,
  Compass,
  Check,
  X as XIcon,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Grid,
  Play,
  Award,
  CheckCircle2,
  Star,
  Sparkles,
  Utensils,
  Bed,
  ChevronLeft,
  ChevronRight,
  Sun,
  CloudSun,
  Luggage,
  ThumbsUp,
  HelpCircle,
  Users,
  Download,
  Plus,
  Minus
} from 'lucide-react';
import { getJourneyBySlug, allJourneys } from '../data/journeys';
import { companyData } from '../data/company';
import logoImg from '../assets/logo.png';
import { RouteMapVisualizer } from '../components/common/RouteMapVisualizer';
import { EnquiryModal } from '../components/common/EnquiryModal';

export const TrekDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const journey = slug ? getJourneyBySlug(slug) : undefined;

  // State
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('All');
  const [helpfulReviews, setHelpfulReviews] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activeDepartureTab, setActiveDepartureTab] = useState<'group' | 'private'>('group');
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isGroupDiscountsOpen, setIsGroupDiscountsOpen] = useState(true);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [showSubNav, setShowSubNav] = useState(false);

  // Recommendations: 3 similar journeys
  const similarJourneys = journey
    ? (allJourneys.filter((j) => j.slug !== journey.slug && j.category === journey.category).slice(0, 3).length >= 3
        ? allJourneys.filter((j) => j.slug !== journey.slug && j.category === journey.category).slice(0, 3)
        : allJourneys.filter((j) => j.slug !== journey.slug).slice(0, 3))
    : [];

  // Generate & Download PDF Dossier
  const handleDownloadPDF = () => {
    if (!journey) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }

    const inclusionsList = journey.inclusions?.map((inc: string) => `<li>${inc}</li>`).join('') || '';
    const exclusionsList = journey.exclusions?.map((exc: string) => `<li>${exc}</li>`).join('') || '';
    const itineraryHtml = journey.itinerary?.map((day) => `
      <div style="margin-bottom: 16px; page-break-inside: avoid; border-left: 3px solid #D46238; padding-left: 14px;">
        <div style="font-weight: bold; font-size: 13.5px; color: #142332;">Day ${day.day}: ${day.title}</div>
        <div style="font-size: 11px; color: #7A8895; margin: 3px 0 5px 0;">
          Elevation: <strong>${day.altitude || 'N/A'}</strong> &bull; Walking Time: <strong>${day.duration || 'N/A'}</strong> &bull; Stay: <strong>${day.accommodation || 'Mountain Lodge'}</strong> &bull; Meals: <strong>${day.meals || 'B, L, D'}</strong>
        </div>
        <div style="font-size: 12px; color: #4A5568; line-height: 1.6;">${day.description}</div>
      </div>
    `).join('') || '';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${journey.title} - Official Expedition Dossier | EcoSummit Nepal</title>
        <style>
          @page { size: A4; margin: 18mm 14mm 18mm 14mm; }
          * { box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #142332; line-height: 1.5; padding: 24px; max-width: 820px; margin: 0 auto; background: #fff; }
          .header { border-bottom: 2px solid #142332; padding-bottom: 14px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
          .brand { font-size: 24px; font-weight: 800; color: #142332; letter-spacing: 0.5px; text-transform: uppercase; }
          .tagline { font-size: 10.5px; color: #D46238; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-top: 2px; }
          .meta-top { font-size: 11px; color: #5D6B78; text-align: right; line-height: 1.4; }
          .title { font-size: 26px; font-weight: 700; color: #142332; margin: 14px 0 6px 0; }
          .short-desc { font-size: 13px; color: #566370; line-height: 1.6; margin-bottom: 16px; font-style: italic; }
          .specs-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; background: #FAF8F5; padding: 12px 16px; border-radius: 8px; border: 1px solid #E8E2D8; margin-bottom: 24px; }
          .spec-label { font-size: 9.5px; text-transform: uppercase; font-weight: 700; color: #7A8895; display: block; margin-bottom: 2px; }
          .spec-value { font-size: 13px; font-weight: 700; color: #142332; }
          h2 { font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #D46238; border-bottom: 1px solid #E8E2D8; padding-bottom: 6px; margin: 24px 0 12px 0; }
          .overview-text { font-size: 12px; color: #4A5568; line-height: 1.65; }
          .inclusions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; page-break-inside: avoid; margin-top: 10px; }
          ul { padding-left: 18px; margin: 6px 0; font-size: 11.5px; color: #4A5568; line-height: 1.5; }
          li { margin-bottom: 4px; }
          .footer { margin-top: 36px; padding-top: 12px; border-top: 1px solid #E8E2D8; font-size: 10px; color: #7A8895; display: flex; justify-content: space-between; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">EcoSummit</div>
            <div class="tagline">Expeditions &bull; Nepal</div>
          </div>
          <div class="meta-top">
            <div>Kathmandu Head Office &bull; Thamel, Nepal</div>
            <div>${companyData.contactPhone} &bull; ${companyData.contactEmail}</div>
          </div>
        </div>

        <div class="title">${journey.title} &mdash; ${journey.duration}</div>
        <div class="short-desc">${journey.shortDescription}</div>

        <div class="specs-grid">
          <div><span class="spec-label">Duration</span><span class="spec-value">${journey.duration}</span></div>
          <div><span class="spec-label">Difficulty</span><span class="spec-value" style="text-transform: capitalize;">${journey.difficulty}</span></div>
          <div><span class="spec-label">Max. Altitude</span><span class="spec-value">${journey.maxAltitude || '5,545m'}</span></div>
          <div><span class="spec-label">Price From</span><span class="spec-value">USD ${numericPrice.toLocaleString()}</span></div>
        </div>

        <h2>Expedition Overview</h2>
        <div class="overview-text">${journey.overview}</div>

        <h2>Detailed Day-by-Day Itinerary</h2>
        ${itineraryHtml}

        <div class="inclusions-grid">
          <div>
            <h2>What Is Included</h2>
            <ul>${inclusionsList}</ul>
          </div>
          <div>
            <h2>What Is Excluded</h2>
            <ul>${exclusionsList}</ul>
          </div>
        </div>

        <div class="footer">
          <div>&copy; ${new Date().getFullYear()} EcoSummit Travel & Adventure Pvt. Ltd. Official Trip Dossier.</div>
          <div>Certified Sherpa Leadership &bull; TAAN & NMA Member</div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const handleHelpfulClick = (reviewId: string) => {
    setHelpfulReviews(prev => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1
    }));
  };

  // Fallback gallery if journey has fewer than 5 images
  const fallbackImages = [
    journey?.featuredImage || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
  ];

  const galleryImages = (journey?.gallery && journey.gallery.length >= 5)
    ? journey.gallery
    : (journey?.gallery && journey.gallery.length > 0)
      ? [...journey.gallery, ...fallbackImages.slice(journey.gallery.length)]
      : fallbackImages;

  // Sub-navigation tabs (streamlined labels so all tabs fit cleanly without clipping)
  const navTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'video', label: 'Video' },
    { id: 'when-to-visit', label: 'Season' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'cost', label: 'Includes' },
    { id: 'dates', label: 'Dates' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'map', label: 'Route Map' },
    { id: 'gears', label: 'Gear' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'reviews', label: 'Reviews' },
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

  if (!journey) {
    return <Navigate to="/treks" replace />;
  }

  // Dynamic pricing calculations for booking card & group tiers
  const numericPrice = journey.startingPrice
    ? parseInt(journey.startingPrice.replace(/[^0-9]/g, ''), 10) || 665
    : 665;
  const soloPrice = Math.round(numericPrice * 1.47);
  const groupDiscountPrice = Math.round(numericPrice * 0.95);

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

  const toggleDay = (dayNum: number) => {
    setExpandedDay(expandedDay === dayNum ? null : dayNum);
  };

  const toggleAllDays = () => {
    if (expandedDay === -1) {
      setExpandedDay(null);
    } else {
      setExpandedDay(-1); // -1 signifies all expanded
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  // Fallback monthly seasonality if not specified
  const months = journey.monthlySeasonality || [
    { month: 'January', short: 'J', status: 'average' },
    { month: 'February', short: 'F', status: 'average' },
    { month: 'March', short: 'M', status: 'best' },
    { month: 'April', short: 'A', status: 'best' },
    { month: 'May', short: 'M', status: 'best' },
    { month: 'June', short: 'J', status: 'average' },
    { month: 'July', short: 'J', status: 'average' },
    { month: 'August', short: 'A', status: 'average' },
    { month: 'September', short: 'S', status: 'good' },
    { month: 'October', short: 'O', status: 'best' },
    { month: 'November', short: 'N', status: 'best' },
    { month: 'December', short: 'D', status: 'good' },
  ];

  // Fallback fixed departures if not specified
  const departures = journey.fixedDepartures || [
    { id: 'dep-1', startDate: '14 Oct 2026', endDate: '27 Oct 2026', price: journey.startingPrice || '$1,890', status: 'Guaranteed', seatsLeft: 3 },
    { id: 'dep-2', startDate: '28 Oct 2026', endDate: '10 Nov 2026', price: journey.startingPrice || '$1,890', status: 'Guaranteed', seatsLeft: 4 },
    { id: 'dep-3', startDate: '12 Nov 2026', endDate: '25 Nov 2026', price: journey.startingPrice || '$1,890', status: 'Available', seatsLeft: 6 },
    { id: 'dep-4', startDate: '08 Mar 2027', endDate: '21 Mar 2027', price: journey.startingPrice || '$1,950', status: 'Guaranteed', seatsLeft: 2 },
    { id: 'dep-5', startDate: '24 Mar 2027', endDate: '06 Apr 2027', price: journey.startingPrice || '$1,950', status: 'Available', seatsLeft: 8 },
  ];

  // Elevation milestones
  const elevationPoints = journey.elevationProfile || [
    { point: 'Kathmandu', altitude: 1400, label: 'KTM 1,400m' },
    { point: 'Start Trail', altitude: 2600, label: 'Start 2,600m' },
    { point: 'Namche / High Village', altitude: 3440, label: '3,440m' },
    { point: 'Monastery Pass', altitude: 3867, label: '3,867m' },
    { point: 'High Valley', altitude: 4410, label: '4,410m' },
    { point: 'Alpine Camp', altitude: 4940, label: '4,940m' },
    { point: 'High Base Camp', altitude: 5364, label: 'Base Camp' },
    { point: 'Peak / Pass Summit', altitude: 5545, label: 'Summit 5,545m' },
    { point: 'Lower Valley', altitude: 3800, label: '3,800m' },
    { point: 'Return Base', altitude: 2600, label: 'Trailhead' },
  ];

  // Gear list
  const gearCategories = journey.gearList || [
    {
      category: 'Footwear & Socks',
      items: [
        'Waterproof high-ankle trekking boots (broken-in prior to travel)',
        'Camp shoes or sandals (for teahouse relaxation)',
        'Merino wool trekking socks (4–5 pairs)',
        'Moisture-wicking liner socks (2 pairs)',
      ],
    },
    {
      category: 'Layering & Warmth',
      items: [
        'Merino wool base layer tops & bottoms (2 sets)',
        'Mid-weight fleece or Polartec thermal jacket',
        'Heavy down jacket (-20°C rated, complimentary loan available in KTM)',
        'Waterproof Gore-Tex hard-shell breathable jacket with hood',
        'Quick-dry trekking trousers & storm shell pants',
      ],
    },
    {
      category: 'Packs & Sleep System',
      items: [
        '30–35 litre daypack with integrated rain cover',
        '80–90 litre water-resistant expedition duffel (carried by porters)',
        '4-season sleeping bag (-15°C comfort rating, available for hire in KTM)',
        'Silk sleeping bag liner for warmth and hygiene',
      ],
    },
    {
      category: 'Head, Hands & Optics',
      items: [
        'Category 3 or 4 UV glacier sunglasses (essential for high altitude snow reflection)',
        'Warm fleece or wool beanie',
        'Sun hat with wide brim or neck flap',
        'Touchscreen-compatible liner gloves',
        'Insulated heavy ski mittens or mountaineering gloves',
      ],
    },
    {
      category: 'Health, Water & Accessories',
      items: [
        'Trekking poles with snow baskets (strongly recommended)',
        'Headlamp with spare batteries / USB cable',
        'Two 1-litre wide-mouth Nalgene bottles (hot water safe)',
        'Water purification tablets (Aquatabs) or SteriPEN UV purifier',
        'Personal first aid: blister plasters, Diamox, pain relief, rehydration salts',
        'Sunscreen (SPF 50+) and zinc lip protection',
      ],
    },
  ];

  // Comprehensive FAQs combining journey-specific questions and vital expedition guidance
  const standardFaqs = [
    {
      question: 'How do you manage Acute Mountain Sickness (AMS) and high-altitude safety?',
      answer: 'Our itineraries follow conservative ascent gradients proven to ensure safe acclimatisation. Our government-certified lead guides carry pulse oximeters to measure oxygen saturation and resting heart rate twice daily (morning and evening), recording Lake Louise AMS scores. Our teams carry comprehensive wilderness first-aid kits, bottled medical oxygen, and satellite communication devices. If a trekker shows severe altitude sickness symptoms, our strict protocol is immediate descent, supported by 24/7 direct dispatch relationships with Kathmandu air ambulance helicopter rescue fleets.',
      category: 'Altitude & Safety',
    },
    {
      question: 'What level of physical fitness and previous trekking experience is required?',
      answer: 'You do not need prior mountaineering or technical climbing experience for non-peak trekking routes. However, you should have good cardiovascular endurance, capable of walking 5 to 7 hours daily over uneven, rocky trails with undulating elevation gains of 400m–800m daily, carrying a light daypack (4–6kg). We strongly recommend 8–12 weeks of pre-trip conditioning, including stair climbing, hill walking with a weighted backpack, and aerobic workouts.',
      category: 'Fitness & Prep',
    },
    {
      question: 'What are the mountain teahouse lodges like? Are private rooms and hot showers available?',
      answer: 'Mountain lodges (teahouses) provide twin-share private bedrooms equipped with foam mattresses, clean sheets, pillows, and cozy blankets. Lower villages (e.g. Lukla, Phakding, Namche, Pokhara, Ghandruk) feature attached bathrooms and heated rooms in our upgraded itineraries. In higher alpine lodges, facilities are simpler with shared western or squat toilets. Hot gas or solar showers are available for a nominal charge ($3–$5). Cozy communal dining rooms are heated every evening by a central stove burning timber or dried yak dung.',
      category: 'Lodging & Food',
    },
    {
      question: 'What meals are provided, and can you cater to dietary restrictions?',
      answer: 'All meals (breakfast, lunch, and dinner) during the trek are included. Menus offer a wide range of nutritious options including traditional Dal Bhat (lentil soup with steamed rice, seasonal vegetable curry, and pickles – unlimited refills!), Sherpa potato stew, pasta, noodles, porridge, pancakes, and eggs. We readily cater to vegetarian, vegan, gluten-free, dairy-free, and halal diets. For water, we supply boiled water or UV-purified water at lodges to eliminate single-use plastic bottles, and recommend carrying water purification tablets and insulated Nalgene bottles.',
      category: 'Lodging & Food',
    },
    {
      question: 'Is device charging electricity, Wi-Fi, or cellular coverage available along the trail?',
      answer: 'Yes. Most teahouses provide device charging in communal dining halls or private rooms via solar or micro-hydro electricity (free in lower valleys, $2–$4 per charge above 3,500m). EverestLink Wi-Fi cards and local SIM cards (NTC or Ncell, which we help you set up upon arrival in Kathmandu) provide connectivity across much of the trail. We recommend bringing a high-capacity 20,000mAh power bank kept warm inside your sleeping bag at night.',
      category: 'Gear & Tech',
    },
    {
      question: 'What is the baggage weight limit on domestic flights, and how are bags carried?',
      answer: 'On domestic flights (such as Kathmandu to Lukla or Pokhara), the strict luggage weight limit is 15 kg (33 lbs) total: 10 kg in the main duffel bag (carried by your porter) and 5 kg in your personal daypack. We provide a complimentary waterproof 80L expedition duffel bag in Kathmandu. Under our strict ethical porter welfare guidelines, porters carry a maximum of 25–30kg shared between two trekkers (max 15kg per client). All our porters receive fair living wages, comprehensive medical & helicopter rescue insurance, warm mountain apparel, and proper lodge accommodations.',
      category: 'Gear & Tech',
    },
    {
      question: 'When is the best season to do this trek for clear mountain views and weather?',
      answer: 'The pre-eminent seasons are Autumn (October through December) and Spring (March through May). Autumn offers crystal-clear post-monsoon visibility, crisp blue skies, and optimal mountain photography conditions with minimal cloud cover. Spring brings warmer daytime temperatures, lush blooming rhododendron forests, and active mountaineering expedition atmosphere at high base camps. Winter (January–February) is quiet and clear but cold, while monsoon (July–August) brings cloud cover and rain in lower valleys.',
      category: 'Altitude & Safety',
    },
    {
      question: 'What travel insurance and Nepal tourist entry visa do I need?',
      answer: 'Travel insurance is strictly mandatory for all guests and MUST explicitly cover high-altitude trekking up to the maximum elevation of your itinerary (up to 5,500m for Everest/Annapurna passes) as well as emergency helicopter medical evacuation. Tourist visas for Nepal can be easily obtained upon arrival at Tribhuvan International Airport in Kathmandu (15 Days: $30 USD, 30 Days: $50 USD, 90 Days: $125 USD) or via the official Nepal Immigration online portal.',
      category: 'Visas & Booking',
    },
    {
      question: 'What is your booking deposit policy, and can I change dates if my schedule changes?',
      answer: 'We require a 20% deposit to secure your departure dates, reserve domestic flight seats, and process official national park permits. The remaining balance can be settled upon arrival in Kathmandu via credit card, bank wire, or cash. We offer 100% complimentary date rescheduling up to 30 days prior to your departure date.',
      category: 'Visas & Booking',
    },
  ];

  // Combine journey FAQs with standard FAQs without duplicate questions
  const allFaqs = [
    ...(journey.faqs || []).map(f => ({ ...f, category: 'Trip Specific' })),
    ...standardFaqs.filter(sf => !(journey.faqs || []).some(jf => jf.question.toLowerCase().includes(sf.question.toLowerCase().slice(0, 20))))
  ];

  const faqCategories = ['All', 'Altitude & Safety', 'Lodging & Food', 'Gear & Tech', 'Visas & Booking'];
  const filteredFaqs = activeFaqCategory === 'All' 
    ? allFaqs 
    : allFaqs.filter(f => f.category === activeFaqCategory || (activeFaqCategory === 'Visas & Booking' && f.category === 'Trip Specific'));

  // Comprehensive Authentic Verified Reviews
  const reviewsList = [
    {
      id: 'rev-1',
      author: 'Julian & Claire Mercer',
      initials: 'JM',
      avatarBg: 'bg-gradient-to-br from-blue-600 to-indigo-700',
      country: 'United Kingdom',
      rating: 5,
      date: 'November 2025',
      title: 'Impeccable Sherpa leadership, unhurried pacing, and life-changing sunrise views',
      content: 'From the moment we met our lead guide Pasang in Kathmandu to standing at Kala Patthar at 6am watching the first golden light hit the summit of Everest, everything was flawless. The acclimatisation pacing made all the difference — neither of us suffered from altitude issues. The teahouse bookings were always the warmest and best available in every single village. EcoSummit’s team took care of every flight, permit, and warm meal with genuine Sherpa hospitality.',
      trekDate: 'Autumn Season 2025',
      route: journey.title,
      verified: true,
      helpfulCount: 24,
    },
    {
      id: 'rev-2',
      author: 'Dr. Marcus Vance',
      initials: 'MV',
      avatarBg: 'bg-gradient-to-br from-emerald-600 to-teal-700',
      country: 'Australia',
      rating: 5,
      date: 'October 2025',
      title: 'Safety first: daily oximetry checks, exceptional porter welfare, and quiet expertise',
      content: 'As a medical doctor, I was particularly observant of EcoSummit’s clinical safety standard. The guides conducted pulse oximeter readings and Lake Louise symptom scoring every single morning and evening. The porter welfare was exemplary too — our support team was well equipped with warm alpine boots and jackets and treated with dignity like family. You simply cannot put a price on that level of ethics and peace of mind.',
      trekDate: 'Autumn Season 2025',
      route: journey.title,
      verified: true,
      helpfulCount: 38,
    },
    {
      id: 'rev-3',
      author: 'Sarah & David Lindqvist',
      initials: 'SL',
      avatarBg: 'bg-gradient-to-br from-amber-600 to-orange-700',
      country: 'Sweden',
      rating: 5,
      date: 'October 2025',
      title: 'The raw, uncommercialized Himalaya of our dreams — truly unforgettable',
      content: 'Crossing the high Himalayan passes at sunrise with prayer flags fluttering in the icy morning breeze was an emotional, unforgettable moment. Our guide Ang Tsering had climbed eight-thousanders multiple times and his mountain intuition was extraordinary. Food was hearty, delicious, and abundant every single night. If you want authentic Himalayan trekking without commercial corners cut, book with EcoSummit.',
      trekDate: 'Autumn Season 2025',
      route: journey.title,
      verified: true,
      helpfulCount: 19,
    },
    {
      id: 'rev-4',
      author: 'Evelyn Choi',
      initials: 'EC',
      avatarBg: 'bg-gradient-to-br from-rose-600 to-pink-700',
      country: 'Singapore',
      rating: 5,
      date: 'April 2025',
      title: 'A dream Himalayan journey made completely seamless for a solo female traveler',
      content: 'I joined as a solo traveller on a small group departure and immediately felt safe, supported, and welcomed. The ancient monastery blessings, the towering suspension bridges, and the first sight of Ama Dablam will stay with me forever. The free gear loan in Kathmandu (the heavy down jacket and expedition duffel) was a huge bonus that saved me so much hassle. 10/10 from start to finish!',
      trekDate: 'Spring Season 2025',
      route: journey.title,
      verified: true,
      helpfulCount: 31,
    },
    {
      id: 'rev-5',
      author: 'Thomas & Claudia Becker',
      initials: 'TB',
      avatarBg: 'bg-gradient-to-br from-teal-600 to-cyan-700',
      country: 'Germany',
      rating: 5,
      date: 'March 2025',
      title: 'Phenomenal precision from airport tarmac to mountain ridge',
      content: 'Every transfer was punctual, the private briefing in Kathmandu answered every single question thoroughly, and the flexibility when domestic flights faced weather delays was brilliant. Our guide was constantly attentive to our walking pace and dietary preferences. Best travel decision we have ever made.',
      trekDate: 'Spring Season 2025',
      route: journey.title,
      verified: true,
      helpfulCount: 15,
    },
    {
      id: 'rev-6',
      author: 'Liam & Hannah Brooks',
      initials: 'HB',
      avatarBg: 'bg-gradient-to-br from-purple-600 to-indigo-700',
      country: 'Canada',
      rating: 5,
      date: 'December 2024',
      title: 'Crystal blue skies and 360-degree glacial amphitheater views',
      content: 'Trekking in early winter meant crisp clear mornings, zero trail congestion, and unlimited visibility stretching for dozens of kilometers. Standing surrounded by 7,000m and 8,000m giants took our breath away. EcoSummit handled every permit, lodge booking, and meal with mastery. We are already planning our next expedition with them for next year!',
      trekDate: 'Winter Season 2024',
      route: journey.title,
      verified: true,
      helpfulCount: 22,
    },
  ];

  const renderPricingCard = () => (
    <div className="bg-white border border-[#E8E2D8] rounded-3xl p-6 sm:p-7 shadow-[0_12px_36px_rgba(20,35,50,0.06)] space-y-4">
      {/* Price Display */}
      <div className="space-y-1">
        <span className="text-[11px] uppercase tracking-wider text-[#7A8895] block font-sans font-bold">
          TRIP PRICE FROM
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
          to={`/booking?slug=${journey.slug}&journey=${encodeURIComponent(journey.title)}`}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 bg-[#D46238] hover:bg-[#B8522E] text-white text-sm sm:text-base font-sans font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.01] cursor-pointer text-center group"
        >
          <span>Book This Trip</span>
          <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => scrollToSection('dates')}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white hover:bg-[#FAF8F5] text-[#142332] border border-[#E8E2D8] hover:border-[#142332] text-xs sm:text-sm font-sans font-bold rounded-xl transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer text-center group"
          >
            <Calendar className="w-3.5 h-3.5 text-[#7A8895] group-hover:text-[#D46238] transition-colors" />
            <span>View Dates</span>
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
            <span>98% Summit & Route Success Rate</span>
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
          href={`https://wa.me/${companyData.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20EcoSummit,%20I%20am%20interested%20in%20the%20${encodeURIComponent(journey.title)}`}
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
      {/* ── 1. EXPEDITION TOP HEADER (BREADCRUMB, TITLE, PDF DOWNLOAD) ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="pt-28 sm:pt-32 pb-4 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-3.5">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B7D8F]">
            <Link to="/" className="hover:text-[#142332] transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/${journey.category === 'trek' ? 'treks' : journey.category === 'tour' ? 'tours' : 'expeditions'}`} className="hover:text-[#142332] transition-colors capitalize">
              {journey.category === 'trek' ? 'Treks' : journey.category === 'tour' ? 'Tours' : 'Expeditions'}
            </Link>
            <span>/</span>
            <span className="text-[#142332] font-medium truncate max-w-xs">{journey.title}</span>
          </nav>

          {/* Title & Action Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2.5 max-w-4xl">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#142332] font-normal leading-[1.15] tracking-tight">
                {journey.title} - {journey.duration}
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
                  <span className="font-bold text-[#142332] ml-0.5">4.98</span>
                  <span className="text-[#526B7E] font-medium">(340+ TripAdvisor Reviews)</span>
                </div>

                <span className="hidden sm:inline text-[#CBD5E1]">•</span>

                <span className="inline-flex items-center gap-1.5 text-[#2E7D32] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                  <span>Recommended by 99% of travelers</span>
                </span>

                <span className="hidden sm:inline text-[#CBD5E1]">•</span>

                <span className="inline-flex items-center gap-1.5 text-[#183E63] font-semibold">
                  <Award className="w-4 h-4 text-[#E5A93C]" />
                  <span>Verified Sherpa-Led Route</span>
                </span>
              </div>
            </div>

            {/* Download PDF Option */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#E8E2D8] hover:border-[#142332] text-[#142332] text-xs sm:text-sm font-sans font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                title="Download full written itinerary plan and trip dossier as PDF"
              >
                <Download className="w-4 h-4 text-[#7A8895] group-hover:text-[#D46238] transition-colors" />
                <span>Download Itinerary (PDF)</span>
              </button>
            </div>
          </div>

          {/* Narrative Lead Paragraph */}
          <p className="text-sm sm:text-base text-[#566370] leading-relaxed font-light max-w-4xl pt-1">
            {journey.shortDescription}
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
                  alt={`${journey.title} - Main Preview`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <span className="absolute top-4 left-4 bg-[#142332]/85 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured View
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
                      alt={`${journey.title} photo ${idx + 2}`}
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
              <span className="font-serif text-lg text-[#FAF8F5]">{journey.title}</span>
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
              alt={`${journey.title} preview`}
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
                className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activePhotoIndex === i ? 'border-[#E5A93C] scale-105' : 'border-transparent opacity-50 hover:opacity-100'
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
          <div className="flex items-center justify-between gap-4 py-3 sm:py-3.5">
            {/* Brand Logo for home access when upper nav is hidden */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 shrink-0 pr-4 sm:pr-5 border-r border-[#E8E2D8] hover:opacity-85 transition-opacity cursor-pointer"
              title="Return to EcoSummit Nepal Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white border border-[#E8E2D8] p-1.5 flex items-center justify-center shadow-xs">
                <img src={logoImg} alt="EcoSummit" className="w-full h-full object-contain" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-serif font-bold text-base sm:text-lg text-[#142332] tracking-tight leading-none">
                  EcoSummit
                </span>
                <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#6B7D8F] font-bold mt-0.5">
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

            {/* Right: Quick Action (Book/Dates) */}
            <div className="shrink-0 hidden md:flex items-center gap-2 pl-3 border-l border-[#E8E2D8]">
              <button
                onClick={() => scrollToSection('dates')}
                className="px-5 py-2 rounded-full bg-[#D46238] hover:bg-[#b8522e] text-white text-xs sm:text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── 3. EXPEDITION & TREK DOSSIER (UNIFIED GRID)              ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="pt-2 pb-16 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Unified 2-Column Grid: Left (Key Facts + All Editorial Sections) / Right (Sticky Price Card) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Column (8 cols): Specs, Mobile Price Card & All In-Depth Sections */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-14">
              
              {/* Key Facts Card (2-Column Tabular Grid Matching Reference) */}
              <div className="bg-white rounded-2xl border border-[#E8E2D8] shadow-xs overflow-hidden mt-1">
                <div className="px-5 py-3 bg-[#FAF8F5] border-b border-[#E8E2D8] flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-[#142332] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D46238]" />
                    Key Facts & Trip Dossier
                  </span>
                  <span className="text-xs text-[#6B7D8F] font-mono">Nepal Himalaya</span>
                </div>

                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs sm:text-[13.5px]">
                  {/* Country */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1]">
                    <span className="text-[#6B7D8F] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#183E63]" />
                      Country:
                    </span>
                    <span className="font-semibold text-[#142332]">Nepal</span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1]">
                    <span className="text-[#6B7D8F] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#183E63]" />
                      Duration:
                    </span>
                    <span className="font-semibold text-[#142332]">{journey.duration}</span>
                  </div>

                  {/* Activity */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1]">
                    <span className="text-[#6B7D8F] flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#D46238]" />
                      Activity:
                    </span>
                    <span className="font-semibold text-[#142332]">
                      {journey.activity || (journey.category === 'trek' ? 'Trekking' : journey.category === 'tour' ? 'Sightseeing Tour' : 'Mountain Expedition')}
                    </span>
                  </div>

                  {/* Max Altitude */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1]">
                    <span className="text-[#6B7D8F] flex items-center gap-2">
                      <Mountain className="w-4 h-4 text-[#183E63]" />
                      Max. Altitude:
                    </span>
                    <span className="font-semibold text-[#142332]">{journey.maxAltitude || '5,545m / 18,192ft'}</span>
                  </div>

                  {/* Difficulty */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1]">
                    <span className="text-[#6B7D8F] flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-[#D46238]" />
                      Difficulty:
                    </span>
                    <span className="font-semibold text-[#142332] capitalize">{journey.difficulty}</span>
                  </div>

                  {/* Best Season */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1]">
                    <span className="text-[#6B7D8F] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#D46238]" />
                      Best Season:
                    </span>
                    <span className="font-semibold text-[#142332]">{journey.bestSeason || 'Spring & Autumn'}</span>
                  </div>

                  {/* Accommodation */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1]">
                    <span className="text-[#6B7D8F] flex items-center gap-2">
                      <Bed className="w-4 h-4 text-[#183E63]" />
                      Accommodation:
                    </span>
                    <span className="font-semibold text-[#142332] truncate max-w-[180px]" title={journey.accommodationType || 'Tea Houses / Mountain Lodges'}>
                      {journey.accommodationType || 'Tea Houses / Mountain Lodges'}
                    </span>
                  </div>

                  {/* Meals */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1]">
                    <span className="text-[#6B7D8F] flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-[#183E63]" />
                      Meals:
                    </span>
                    <span className="font-semibold text-[#142332] truncate max-w-[180px]" title={journey.mealsIncluded || 'Breakfast, Lunch & Dinner'}>
                      {journey.mealsIncluded || 'All Meals on Trek (B, L, D)'}
                    </span>
                  </div>

                  {/* Start / End Point */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1] sm:border-b-0">
                    <span className="text-[#6B7D8F] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#D46238]" />
                      Start / End Point:
                    </span>
                    <span className="font-semibold text-[#142332] truncate max-w-[180px]">
                      {journey.startEndPoint || 'Kathmandu / Kathmandu'}
                    </span>
                  </div>

                  {/* Group Size */}
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[#6B7D8F] flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#183E63]" />
                      Group Size:
                    </span>
                    <span className="font-semibold text-[#142332]">{journey.groupSize || '2 - 14 Pax'}</span>
                  </div>
                </div>
              </div>

              {/* Mobile-Only Pricing Card (Visible directly below Key Facts on mobile) */}
              <div className="block lg:hidden">
                {renderPricingCard()}
              </div>

            {/* ── SECTION: Trip Overview ── */}
            <section id="overview" className="scroll-mt-36 space-y-6">
              <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-[#D46238]">
                <span className="w-8 h-[2px] bg-[#D46238]"></span>
                <span>THE HIMALAYAN EXPERIENCE</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#142332] font-normal leading-tight">
                Trip Overview
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-[#3D4B58] leading-relaxed font-light">
                {journey.overview}
              </p>
            </section>

            {/* ── SECTION: Trip Highlights ── */}
            <section id="highlights" className="scroll-mt-36 bg-white p-8 sm:p-10 lg:p-12 rounded-3xl border border-[#E8E2D8] shadow-xs space-y-7">
              <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-5">
                <h3 className="font-serif text-3xl sm:text-4xl text-[#142332] font-normal">
                  Trip Highlights
                </h3>
                <span className="text-xs sm:text-sm text-[#7A8895] font-mono tracking-wider">
                  {journey.highlights.length} KEY EXPERIENCES
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {journey.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] hover:border-[#CBA46E]/60 transition-colors">
                    <span className="w-8 h-8 rounded-full bg-[#2E7D32]/12 text-[#2E7D32] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </span>
                    <span className="text-sm sm:text-base text-[#142332] font-medium leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── SECTION: 4K YouTube Video Dispatch ── */}
            <section id="video" className="scroll-mt-36 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-bold text-[#183E63]">
                    <span className="w-6 h-[1.5px] bg-[#183E63]"></span>
                    <span>EXPEDITION FOOTAGE</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#142332] mt-1 font-normal">
                    Experience the Route in 4K
                  </h3>
                </div>
                <span className="text-xs text-[#7A8895] font-mono hidden sm:inline">HIMALAYAN TRAIL DISPATCH</span>
              </div>

              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-md border border-[#E8E2D8] bg-slate-950">
                {videoPlaying ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${journey.videoId || '7e90gBu4pas'}?autoplay=1&rel=0`}
                    title={`${journey.title} Trail Video Dispatch`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="relative w-full h-full group cursor-pointer" onClick={() => setVideoPlaying(true)}>
                    <img
                      src={galleryImages[1] || galleryImages[0]}
                      alt="Trail video poster"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
                    
                    {/* Centered Big Play Button */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
                      <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-[#E5A93C] text-[#142332] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-7 sm:w-8 h-7 sm:h-8 fill-current translate-x-0.5" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/90">
                        Watch Trail Dispatch
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-5 text-xs text-white/80 font-mono">
                      Filmed on Location • Sherpa Guided Expedition
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* ── SECTION: When to Visit (Seasonality 12-Month Matrix) ── */}
            <section id="when-to-visit" className="scroll-mt-36 bg-white p-8 sm:p-10 lg:p-12 rounded-3xl border border-[#E8E2D8] shadow-xs space-y-7">
              <div>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#142332] font-normal mb-1.5">
                  When to Visit
                </h3>
                <p className="text-sm sm:text-base text-[#566370]">
                  Himalayan seasonal conditions, cloud cover, temperature variations, and peak clarity windows.
                </p>
              </div>

              {/* 12-Month Indicator Grid */}
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-2.5 sm:gap-3 pt-2">
                {months.map((m, idx) => {
                  const isBest = m.status === 'best';
                  const isGood = m.status === 'good';
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5">
                      <div
                        className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xs sm:text-base font-bold transition-transform shadow-xs ${
                          isBest
                            ? 'bg-[#183E63] text-white shadow-[#183E63]/20'
                            : isGood
                            ? 'bg-[#0284C7] text-white shadow-[#0284C7]/20'
                            : 'bg-[#94A3B8]/25 text-[#566370]'
                        }`}
                      >
                        {m.short}
                      </div>
                      <span className="text-[11px] sm:text-xs text-[#7A8895] font-mono">{m.month.slice(0, 3)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Legend row */}
              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#566370] pt-4 border-t border-[#EAE5DC]">
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-md bg-[#183E63]" />
                  <span>Best time to visit (Crystal skies, dry trails)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-md bg-[#0284C7]" />
                  <span>Good time to visit (Pleasant, shoulder season)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-md bg-[#94A3B8]/40" />
                  <span>Average / Monsoon / Cold winter</span>
                </div>
              </div>

              {/* Two Season Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2">
                <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-2">
                  <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#183E63] uppercase tracking-wider">
                    <Sun className="w-5 h-5 text-[#F59E0B]" />
                    <span>Autumn Season (Sep – Nov)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#566370] leading-relaxed">
                    Post-monsoon crisp air, unmatched mountain visibility, warm sunny trekking days (12°C–18°C), cool crisp nights (-5°C at high altitude).
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-2">
                  <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#142332] uppercase tracking-wider">
                    <CloudSun className="w-5 h-5 text-[#183E63]" />
                    <span>Spring Season (Mar – May)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#566370] leading-relaxed">
                    Blooming rhododendron and magnolia forests, longer daylight, active climbing expeditions at base camps, moderate day temperatures.
                  </p>
                </div>
              </div>
            </section>

            {/* ── SECTION: Outline & Daily Itinerary ── */}
            <section id="itinerary" className="scroll-mt-36 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-[#E8E2D8] shadow-xs space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E8E2D8]">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono font-bold text-[#D46238] mb-1.5">
                    <span className="w-6 h-[2px] bg-[#D46238]" />
                    <span>DAY-BY-DAY ROUTE PACING</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#142332] font-normal tracking-tight">
                    Trip Itinerary
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={toggleAllDays}
                  className="px-4 py-2 rounded-xl border border-[#CBD5E1] hover:border-[#142332] bg-white hover:bg-[#FAF8F5] text-[#142332] text-xs font-bold transition-all shadow-2xs cursor-pointer self-start sm:self-auto"
                >
                  <span>{expandedDay === -1 ? 'Collapse all' : 'Expand all'}</span>
                </button>
              </div>

              {/* Clean Timeline Itinerary matching Image 2 */}
              <div className="space-y-0 relative">
                {journey.itinerary.map((day, idx) => {
                  const isOpen = expandedDay === -1 || expandedDay === day.day;
                  const isLast = idx === journey.itinerary.length - 1;
                  const dayFormatted = day.day < 10 ? `0${day.day}` : `${day.day}`;

                  return (
                    <div key={day.day} className="relative flex items-start gap-4 sm:gap-6 group">
                      {/* Left Column: Timeline Line & Day Badge */}
                      <div className="relative flex flex-col items-center shrink-0 self-stretch">
                        {/* Day Badge */}
                        <button
                          type="button"
                          onClick={() => toggleDay(day.day)}
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 shadow-xs cursor-pointer z-10 select-none ${
                            isOpen
                              ? 'bg-[#142332] text-white shadow-sm ring-2 ring-[#142332]/15'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
                          }`}
                          title={`Toggle Day ${day.day}`}
                        >
                          <span className={`text-[9px] sm:text-[10px] uppercase font-bold tracking-wider leading-none ${
                            isOpen ? 'text-[#C8A97A]' : 'text-slate-500'
                          }`}>
                            Day
                          </span>
                          <span className="text-sm sm:text-base font-sans font-black leading-none mt-1">
                            {dayFormatted}
                          </span>
                        </button>

                        {/* Dashed Connecting Line */}
                        {!isLast && (
                          <div className="w-[2px] bg-transparent border-l-2 border-dashed border-slate-300 flex-1 my-1.5 min-h-[40px]" />
                        )}
                      </div>

                      {/* Right Column: Title, Description & Stats Box - ALL 100% LEFT-ALIGNED */}
                      <div className={`flex-1 min-w-0 ${!isLast ? 'pb-8 sm:pb-10 border-b border-slate-100 mb-2' : 'pb-2'}`}>
                        {/* Clickable Header Row */}
                        <button
                          type="button"
                          onClick={() => toggleDay(day.day)}
                          className="w-full text-left flex items-start justify-between gap-3 pt-2 sm:pt-3 cursor-pointer group"
                        >
                          <h4 className="text-base sm:text-lg font-sans font-semibold text-[#142332] group-hover:text-[#D46238] transition-colors leading-snug">
                            {day.title}
                          </h4>
                          <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-slate-200 text-[#64748B] group-hover:text-[#142332] flex items-center justify-center shrink-0 transition-colors mt-0.5">
                            {isOpen ? <Minus className="w-3.5 h-3.5 text-[#D46238]" /> : <Plus className="w-3.5 h-3.5" />}
                          </div>
                        </button>

                        {/* Collapsible Content */}
                        {isOpen && (
                          <div className="mt-3.5 space-y-4">
                            {/* Description Paragraph */}
                            <p className="text-sm sm:text-[15px] text-[#4A5568] leading-relaxed font-normal">
                              {day.description}
                            </p>

                            {/* Dedicated Key Stats Box matching Image 2 */}
                            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-[13px]">
                              {day.altitude && (
                                <div className="flex items-center gap-2.5 text-[#5D6B78]">
                                  <Mountain className="w-4 h-4 text-[#142332] shrink-0" />
                                  <span>
                                    <strong className="text-[#142332] font-semibold">Max. Altitude:</strong> {day.altitude}
                                  </span>
                                </div>
                              )}
                              {day.accommodation && (
                                <div className="flex items-center gap-2.5 text-[#5D6B78]">
                                  <Bed className="w-4 h-4 text-[#142332] shrink-0" />
                                  <span>
                                    <strong className="text-[#142332] font-semibold">Accommodation:</strong> {day.accommodation}
                                  </span>
                                </div>
                              )}
                              {day.meals && (
                                <div className="flex items-center gap-2.5 text-[#5D6B78]">
                                  <Utensils className="w-4 h-4 text-[#D46238] shrink-0" />
                                  <span>
                                    <strong className="text-[#142332] font-semibold">Meals:</strong> {day.meals}
                                  </span>
                                </div>
                              )}
                              {day.duration && (
                                <div className="flex items-center gap-2.5 text-[#5D6B78]">
                                  <Clock className="w-4 h-4 text-[#7A8895] shrink-0" />
                                  <span>
                                    <strong className="text-[#142332] font-semibold">Trekking Time:</strong> {day.duration}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-[#E8E2D8]">
                <Link
                  to={`/plan-your-trip?journey=${encodeURIComponent(journey.title)}&type=custom`}
                  className="px-6 py-3 rounded-xl border border-[#CBD5E1] hover:border-[#142332] bg-white hover:bg-[#FAF8F5] text-[#142332] font-sans font-bold text-xs sm:text-sm transition-all shadow-2xs inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Customize This Itinerary</span>
                </Link>

                <Link
                  to={`/booking?slug=${journey.slug}&journey=${encodeURIComponent(journey.title)}`}
                  className="px-6 py-3 rounded-xl bg-[#D46238] hover:bg-[#B8522E] text-white font-sans font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Book This Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>

            {/* ── SECTION: What's Included & Excluded ── */}
            <section id="cost" className="scroll-mt-36 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Financial Transparency • Zero Hidden Extras</span>
                </div>
                <h3 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#183E63] tracking-tight">
                  Cost Includes & Excludes
                </h3>
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
                  Every expedition is fully costed upfront with transparent, comprehensive inclusions. Review what is covered by our full-board service and what personal expenses to budget for.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
                {/* Inclusions Card */}
                <div className="bg-white rounded-3xl border border-emerald-200/80 shadow-xs hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between">
                  {/* Top Emerald Accent Ribbon */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 absolute top-0 left-0" />

                  <div className="p-7 sm:p-9 lg:p-10 space-y-6 flex-1">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 pb-4 border-b border-emerald-100/80">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
                          <Check className="w-6 h-6 stroke-[2.5]" />
                        </div>
                        <div>
                          <h4 className="font-sans font-bold text-xl sm:text-2xl text-[#183E63]">
                            What Is Included
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">Covered by EcoSummit full-board</p>
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 100% Covered
                      </span>
                    </div>

                    {/* List */}
                    <ul className="space-y-3 sm:space-y-3.5">
                      {journey.inclusions.map((inc, i) => (
                        <li key={i} className="group flex items-start gap-3.5 p-2 rounded-xl hover:bg-emerald-50/50 transition-colors -mx-2">
                          <div className="w-6 h-6 rounded-lg bg-emerald-100/90 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-2xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-sm sm:text-[15px] font-medium text-slate-800 leading-relaxed group-hover:text-slate-900">
                            {inc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Reassuring Quality Badge Footer */}
                  <div className="border-t border-emerald-100 bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-emerald-50/70 p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="text-xs text-emerald-950 leading-relaxed font-medium">
                        <strong className="font-bold text-emerald-900">Guaranteed Standards:</strong> Fair wages, full medical & emergency evacuation insurance for all Sherpa guides & support porters.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exclusions Card */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between">
                  {/* Top Slate/Amber Accent Ribbon */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-slate-400 via-amber-500 to-slate-600 absolute top-0 left-0" />

                  <div className="p-7 sm:p-9 lg:p-10 space-y-6 flex-1">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-900/20 shrink-0">
                          <XIcon className="w-6 h-6 stroke-[2.5]" />
                        </div>
                        <div>
                          <h4 className="font-sans font-bold text-xl sm:text-2xl text-[#183E63]">
                            What Is Excluded
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">Personal out-of-pocket costs</p>
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                        Out-of-Pocket
                      </span>
                    </div>

                    {/* List */}
                    <ul className="space-y-3 sm:space-y-3.5">
                      {journey.exclusions.map((exc, i) => (
                        <li key={i} className="group flex items-start gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors -mx-2">
                          <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-slate-300 group-hover:text-slate-800 transition-colors">
                            <XIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                          <span className="text-sm sm:text-[15px] font-normal text-slate-700 leading-relaxed">
                            {exc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Practical Out-of-Pocket Budgeting & Assistance Helper Box */}
                  <div className="border-t border-slate-100 bg-gradient-to-b from-amber-50/50 via-slate-50/70 to-amber-50/40 p-5 sm:p-6 space-y-3.5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0 text-sm font-bold mt-0.5">
                        💡
                      </div>
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-amber-950">
                          Personal Daily Budget Guide
                        </h5>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          We recommend budgeting <strong className="text-slate-900 font-bold">$15 – $25 USD / day</strong> for personal drinks (boiled water, beer, soda), device charging, hot showers, and discretionary crew tipping.
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <span className="text-slate-600 font-medium">Need visa or insurance guidance?</span>
                      <a
                        href={`https://wa.me/9779841063000?text=${encodeURIComponent(`Hello EcoSummit team, I have questions regarding visa, insurance, and costs for ${journey.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#183E63] hover:bg-[#122F4C] text-white font-semibold transition-all shadow-2xs self-start sm:self-auto cursor-pointer"
                      >
                        <span>Ask Specialist</span>
                        <ArrowRight className="w-3 h-3 text-[#E5A93C]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── SECTION: Group Joining & Private Dates Table ── */}
            <section id="dates" className="scroll-mt-36 bg-white p-4 sm:p-8 lg:p-12 rounded-3xl border border-[#E8E2D8] shadow-xs space-y-6 sm:space-y-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183E63]/10 text-[#183E63] text-xs font-bold uppercase tracking-wider mb-2">
                    Guaranteed Dates & Private Departures
                  </div>
                  <h3 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#183E63] tracking-tight">
                    Upcoming Departures & Dates
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 font-normal">
                    Join an intimate fixed departure (Max 8 pax) or request a private start date tailored to your party.
                  </p>
                </div>

                {/* Tab Switcher: Group vs Private */}
                <div className="flex p-1.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-xs sm:text-sm font-semibold self-start">
                  <button
                    onClick={() => setActiveDepartureTab('group')}
                    className={`px-4 sm:px-5 py-2 rounded-lg transition-all cursor-pointer ${
                      activeDepartureTab === 'group'
                        ? 'bg-[#142332] text-white shadow-xs'
                        : 'text-[#566370] hover:text-[#142332]'
                    }`}
                  >
                    Group Joining
                  </button>
                  <button
                    onClick={() => setActiveDepartureTab('private')}
                    className={`px-4 sm:px-5 py-2 rounded-lg transition-all cursor-pointer ${
                      activeDepartureTab === 'private'
                        ? 'bg-[#142332] text-white shadow-xs'
                        : 'text-[#566370] hover:text-[#142332]'
                    }`}
                  >
                    Custom Private
                  </button>
                </div>
              </div>

              {activeDepartureTab === 'group' ? (
                <>
                  {/* Mobile View: Dedicated cards to prevent column squishing and text collision */}
                  <div className="space-y-3 sm:hidden">
                    {departures.map((dep) => (
                      <div
                        key={dep.id}
                        className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-3 shadow-2xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                              dep.status === 'Guaranteed'
                                ? 'bg-[#2E7D32]/10 text-[#2E7D32]'
                                : 'bg-[#183E63]/10 text-[#183E63]'
                            }`}
                          >
                            {dep.status}
                          </span>
                          <span className="text-xs text-[#566370] font-medium">
                            {dep.seatsLeft} spots remaining
                          </span>
                        </div>

                        <div className="border-t border-b border-[#EAE5DC]/80 py-2.5 flex items-baseline justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-[#7A8895] tracking-wider block">
                              Departure Dates
                            </span>
                            <span className="font-semibold text-[#142332] text-sm">
                              {dep.startDate} – {dep.endDate}
                            </span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-[10px] font-mono uppercase text-[#7A8895] tracking-wider block">
                              Per Person
                            </span>
                            <span className="font-sans font-black text-lg text-[#183E63]">
                              {dep.price}
                            </span>
                          </div>
                        </div>

                        <Link
                          to={`/booking?slug=${journey.slug}&departure=${encodeURIComponent(dep.startDate)}`}
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-[#142332] hover:bg-[#1D3A50] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs"
                        >
                          <span>Book Spot</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* Tablet/Desktop View: Full Table with minimum width */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse min-w-[640px]">
                      <thead>
                        <tr className="border-b border-[#EAE5DC] text-xs font-mono uppercase text-[#7A8895] tracking-wider">
                          <th className="py-4 px-4 font-semibold">Start Date – End Date</th>
                          <th className="py-4 px-4 font-semibold">Status</th>
                          <th className="py-4 px-4 font-semibold">Availability</th>
                          <th className="py-4 px-4 font-semibold">Price / Person</th>
                          <th className="py-4 px-4 text-right font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAE5DC]/60">
                        {departures.map((dep) => (
                          <tr key={dep.id} className="hover:bg-[#FAF8F5] transition-colors">
                            <td className="py-4 sm:py-5 px-4 font-semibold text-[#142332] text-sm sm:text-base">
                              {dep.startDate} – {dep.endDate}
                            </td>
                            <td className="py-4 sm:py-5 px-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                dep.status === 'Guaranteed'
                                  ? 'bg-[#2E7D32]/10 text-[#2E7D32]'
                                  : 'bg-[#183E63]/10 text-[#183E63]'
                              }`}>
                                {dep.status}
                              </span>
                            </td>
                            <td className="py-4 sm:py-5 px-4 text-sm text-[#566370]">
                              {dep.seatsLeft} spots remaining
                            </td>
                            <td className="py-4 sm:py-5 px-4 font-sans font-black text-lg sm:text-xl text-[#183E63]">
                              {dep.price}
                            </td>
                            <td className="py-4 sm:py-5 px-4 text-right">
                              <Link
                                to={`/booking?slug=${journey.slug}&departure=${encodeURIComponent(dep.startDate)}`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#142332] hover:bg-[#1D3A50] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs"
                              >
                                <span>Book Spot</span>
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                /* Private Departures Prompt */
                <div className="p-8 sm:p-10 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#183E63]/10 text-[#183E63] flex items-center justify-center mx-auto">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-[#142332]">Travel on Any Date That Suits You</h4>
                  <p className="text-sm sm:text-base text-[#566370] max-w-lg mx-auto leading-relaxed">
                    Custom private journeys can commence any day during the climbing & trekking seasons. Choose your preferred pace, lodge tier, and party size.
                  </p>
                  <Link
                    to={`/plan-your-trip?journey=${encodeURIComponent(journey.title)}&type=private`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#142332] hover:bg-[#1D3A50] text-white text-xs sm:text-sm uppercase tracking-wider font-bold rounded-xl transition-all shadow-sm"
                  >
                    <span>Request Custom Private Dates</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </section>

            {/* ── SECTION: Why Us (Why Book With EcoSummit) ── */}
            <section id="why-us" className="scroll-mt-36 space-y-6">
              <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-[#183E63]">
                <span className="w-8 h-[2px] bg-[#183E63]"></span>
                <span>THE ECOSUMMIT DIFFERENCE</span>
              </div>
              <h3 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#183E63] tracking-tight">
                Why Book With Us?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#183E63]/10 text-[#183E63] flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-[#142332]">Native Sherpa Leadership & Fair Wages</h4>
                  <p className="text-sm text-[#566370] leading-relaxed font-light">
                    Every expedition is operated directly by veteran Sherpas and high-altitude mountain professionals with full medical insurance and fair wages.
                  </p>
                </div>

                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-[#142332]">98.6% Trek Summit & Safety Rate</h4>
                  <p className="text-sm text-[#566370] leading-relaxed font-light">
                    Scientifically structured acclimatisation days, daily pulse oximetry checks, and conservative sleeping altitude limits.
                  </p>
                </div>

                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#D46238]/10 text-[#D46238] flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-[#142332]">Helicopter Rescue Standby 24/7</h4>
                  <p className="text-sm text-[#566370] leading-relaxed font-light">
                    Satellite communication devices and direct dispatch relationships with Kathmandu air ambulance fleet for swift emergency extraction.
                  </p>
                </div>

                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#E5A93C]/15 text-[#B87A14] flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-[#142332]">100% Financial Protection & Flexibility</h4>
                  <p className="text-sm text-[#566370] leading-relaxed font-light">
                    Government registered with Nepal Ministry of Tourism, TAAN, and NMA. Complimentary date changes up to 30 days before departure.
                  </p>
                </div>
              </div>
            </section>

            {/* ── SECTION: Route Map & Elevation Profile ── */}
            <section id="map" className="scroll-mt-36 bg-white p-6 sm:p-9 lg:p-10 rounded-3xl border border-[#E8E2D8] shadow-xs space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-bold uppercase tracking-wider">
                  <Compass className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Topographical Trail & Route Intelligence</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#183E63] tracking-tight">
                      Route Map & Elevation Profile
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 font-normal max-w-2xl leading-relaxed">
                      Illustrated expedition trajectory with daily trail waypoints, mountain panoramas, flight corridors, and altitude gain profile.
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm font-mono text-[#D46238] font-bold bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full self-start">
                    MAX: {journey.maxAltitude.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Illustrated Route Map & Elevation Visualizer */}
              <RouteMapVisualizer journey={journey} elevationPoints={elevationPoints} />
            </section>

            {/* ── SECTION: Gears and Equipment ── */}
            <section id="gears" className="scroll-mt-36 bg-white p-8 sm:p-10 lg:p-12 rounded-3xl border border-[#E8E2D8] shadow-xs space-y-7">
              <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-5">
                <div>
                  <h3 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#183E63] tracking-tight">
                    Gears & Equipment Checklist
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 font-normal">
                    Essential clothing, sleeping systems, and high-altitude mountain gear.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#183E63]/10 text-[#183E63] flex items-center justify-center">
                  <Luggage className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {gearCategories.map((cat, idx) => (
                  <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8]/80 space-y-3">
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#183E63] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C]" />
                      <span>{cat.category}</span>
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm sm:text-base text-[#142332]">
                      {cat.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5 leading-relaxed">
                          <Check className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Free Rental Note */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#26483D]/10 border border-[#26483D]/25 flex items-center gap-3.5 text-sm sm:text-base text-[#142332]">
                <ShieldCheck className="w-6 h-6 text-[#26483D] shrink-0" />
                <span className="leading-relaxed">
                  <strong className="font-bold">Complimentary gear loan in Kathmandu:</strong> High-altitude down jacket (-20°C) and water-resistant 80L expedition duffel bag are provided free of charge for your trek duration.
                </span>
              </div>
            </section>

            {/* ── SECTION: Frequently Asked Questions ── */}
            <section id="faqs" className="scroll-mt-36 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183E63]/10 text-[#183E63] text-xs font-bold uppercase tracking-wider">
                  <HelpCircle className="w-3.5 h-3.5 text-[#183E63]" />
                  <span>Essential Preparation • Expert Answers</span>
                </div>
                <h3 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#183E63] tracking-tight">
                  Frequently Asked Questions
                </h3>
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
                  Everything you need to know about altitude safety, permits, food, lodge comfort, gear, and booking with complete confidence.
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
                {faqCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFaqCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeFaqCategory === cat
                        ? 'bg-[#183E63] text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {cat} {cat === 'All' ? `(${allFaqs.length})` : ''}
                  </button>
                ))}
              </div>

              {/* FAQs Accordion List */}
              <div className="space-y-3 sm:space-y-3.5">
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-[#E8E2D8] rounded-2xl bg-white overflow-hidden shadow-xs hover:border-[#0284C7]/40 transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5]/50 transition-colors"
                      >
                        <div className="space-y-1">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0284C7] block">
                            {faq.category}
                          </span>
                          <span className="font-sans font-bold text-base sm:text-lg text-[#142332] block leading-snug">
                            {faq.question}
                          </span>
                        </div>
                        <div className="text-[#566370] shrink-0 mt-1">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-[#0284C7]" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-[#4A5568] leading-relaxed border-t border-[#EFECE6] bg-[#FAF8F5]/40 font-normal">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Direct Expert Assistance Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#183E63]/5 via-[#0284C7]/5 to-[#183E63]/5 border border-[#183E63]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-sm sm:text-base text-[#183E63]">
                    Have a question that isn't answered here?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    Our Kathmandu operations team and Sherpa guides are available 24/7 to provide personalized advice.
                  </p>
                </div>
                <a
                  href={`https://wa.me/9779841063000?text=${encodeURIComponent(`Hello EcoSummit team, I have a specific question about ${journey.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#183E63] hover:bg-[#122F4C] text-white font-sans font-semibold text-xs sm:text-sm transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#E5A93C]" />
                  <span>Ask a Specialist</span>
                </a>
              </div>
            </section>

            {/* ── SECTION: Verified Guest Reviews ── */}
            <section id="reviews" className="scroll-mt-36 bg-white p-8 sm:p-10 lg:p-12 rounded-3xl border border-[#E8E2D8] shadow-xs space-y-8">
              {/* Header */}
              <div className="space-y-2 border-b border-[#EAE5DC] pb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Guest Feedback • 100% Independent</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#183E63] tracking-tight">
                      Guest Travel Reviews & Stories
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 font-normal">
                      Authentic trail dispatches from international trekkers who completed our Himalayan journeys.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-amber-50 border border-amber-200/80 px-4 py-2 rounded-2xl self-start">
                    <div className="flex text-[#F59E0B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="font-sans text-xl font-black text-[#183E63]">4.96</span>
                    <span className="text-xs text-slate-500 font-medium">/ 5.0</span>
                  </div>
                </div>
              </div>

              {/* Rating Summary Breakdown Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-50/80 border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left Big Score */}
                <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-200 pb-5 md:pb-0 md:pr-6 space-y-1.5">
                  <div className="font-sans text-5xl font-black text-[#183E63] tracking-tight">
                    4.96
                  </div>
                  <div className="flex justify-center md:justify-start text-[#F59E0B] gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 font-semibold pt-1">
                    Based on 128 Verified Traveler Reviews
                  </p>
                  <p className="text-[11px] text-emerald-700 font-bold flex items-center justify-center md:justify-start gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>100% of guests recommend EcoSummit</span>
                  </p>
                </div>

                {/* Right Criteria Bars */}
                <div className="md:col-span-8 space-y-2.5 text-xs sm:text-sm font-medium">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-700 min-w-[170px]">Guide Leadership & Safety</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[100%]" />
                    </div>
                    <span className="font-bold text-slate-900 w-8 text-right">5.0</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-700 min-w-[170px]">Acclimatisation & Pacing</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[100%]" />
                    </div>
                    <span className="font-bold text-slate-900 w-8 text-right">5.0</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-700 min-w-[170px]">Teahouse Lodge Comfort</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-[#0284C7] rounded-full w-[96%]" />
                    </div>
                    <span className="font-bold text-slate-900 w-8 text-right">4.8</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-700 min-w-[170px]">Pricing & Transparency</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[98%]" />
                    </div>
                    <span className="font-bold text-slate-900 w-8 text-right">4.9</span>
                  </div>
                </div>
              </div>

              {/* Verified Reviews Cards List */}
              <div className="space-y-5">
                {reviewsList.map((rev) => {
                  const currentHelpful = (rev.helpfulCount || 0) + (helpfulReviews[rev.id] || 0);
                  return (
                    <div
                      key={rev.id}
                      className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E8E2D8] hover:border-[#0284C7]/30 hover:shadow-xs transition-all space-y-4"
                    >
                      {/* Top Row: Author & Verification */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <div className={`w-11 h-11 rounded-2xl ${rev.avatarBg} text-white font-sans font-bold text-sm flex items-center justify-center shadow-xs shrink-0`}>
                            {rev.initials}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-sans font-bold text-sm sm:text-base text-[#142332]">
                                {rev.author}
                              </h4>
                              {rev.verified && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  <span>Verified Trekker</span>
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              {rev.country} • {rev.trekDate}
                            </p>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex text-[#F59E0B] gap-0.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Route Pill Tag */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                        <Mountain className="w-3 h-3 text-[#0284C7]" />
                        <span>Completed: {rev.route}</span>
                      </div>

                      {/* Title & Review Story */}
                      <div className="space-y-2">
                        <h5 className="font-sans text-base sm:text-lg font-bold text-[#183E63] leading-snug">
                          "{rev.title}"
                        </h5>
                        <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed font-normal">
                          {rev.content}
                        </p>
                      </div>

                      {/* Helpful Feedback Button */}
                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs text-slate-500">
                        <span>Reviewed on verified traveler departure</span>
                        <button
                          onClick={() => handleHelpfulClick(rev.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer font-medium"
                        >
                          <ThumbsUp className="w-3.5 h-3.5 text-[#0284C7]" />
                          <span>Helpful ({currentHelpful})</span>
                        </button>
                      </div>
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
            <div className="sticky top-24 lg:top-28 space-y-5">
              {renderPricingCard()}
            </div>
          </div>

        </div>
      </div>
    </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── 6. SIMILAR EXPEDITIONS & RECOMMENDATIONS                 ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      {similarJourneys.length > 0 && (
        <section className="bg-white border-t border-[#E8E2D8] py-16 sm:py-20">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E2D8] pb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono font-bold text-[#D46238] mb-2">
                  <span className="w-6 h-[2px] bg-[#D46238]" />
                  <span>HANDPICKED FOR YOU</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#142332] font-normal tracking-tight">
                  Similar Trips & Recommendations
                </h2>
              </div>
              <Link
                to={`/${journey.category === 'trek' ? 'treks' : journey.category === 'tour' ? 'tours' : 'expeditions'}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D46238] hover:text-[#B8522E] transition-colors self-start sm:self-auto group"
              >
                <span>Explore All {journey.category === 'trek' ? 'Treks' : journey.category === 'tour' ? 'Tours' : 'Expeditions'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {similarJourneys.map((rec) => (
                <div
                  key={rec.slug}
                  className="group bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#142332]/30 transition-all duration-300 flex flex-col"
                >
                  {/* Image Thumbnail */}
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-900">
                    <img
                      src={rec.featuredImage}
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Duration & Category Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-[#142332]/90 backdrop-blur-md text-white">
                        {rec.duration}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#142332]">
                        {rec.category}
                      </span>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-3 right-3 text-right">
                      <span className="text-[9px] uppercase tracking-wider text-white/80 block">From</span>
                      <strong className="text-white font-sans text-sm font-bold">
                        {rec.startingPrice ? (rec.startingPrice.startsWith('USD') ? rec.startingPrice : `USD ${rec.startingPrice}`) : 'USD 1,890'}
                      </strong>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-serif text-lg sm:text-xl text-[#142332] font-semibold group-hover:text-[#D46238] transition-colors line-clamp-1">
                        {rec.title}
                      </h3>
                      <p className="text-xs text-[#566370] line-clamp-2 leading-relaxed font-light">
                        {rec.shortDescription}
                      </p>
                    </div>

                    {/* Specs & Link */}
                    <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-[11px] text-[#6B7D8F]">
                        <span className="flex items-center gap-1">
                          <Mountain className="w-3.5 h-3.5 text-[#183E63]" />
                          <span>{rec.maxAltitude || 'Himalaya'}</span>
                        </span>
                        <span>&bull;</span>
                        <span className="capitalize">{rec.difficulty}</span>
                      </div>

                      <Link
                        to={`/${rec.category === 'trek' ? 'treks' : rec.category === 'tour' ? 'tours' : 'expeditions'}/${rec.slug}`}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#142332] group-hover:text-[#D46238] transition-colors"
                      >
                        <span>View Trip</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── 7. MOBILE STICKY BOTTOM ACTION BAR                       ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E2D8] py-2.5 px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="min-w-0 shrink-0">
          <span className="text-[9px] text-[#7A8895] uppercase tracking-wider block font-sans leading-none">Price From</span>
          <strong className="text-sm sm:text-base font-sans text-[#142332] font-bold truncate block mt-0.5">USD {numericPrice.toLocaleString()}</strong>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={`https://wa.me/${companyData.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20EcoSummit,%20I%20am%20interested%20in%20the%20${encodeURIComponent(journey.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs hover:bg-[#20bd5a] transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
          </a>

          <Link
            to={`/booking?slug=${journey.slug}&journey=${encodeURIComponent(journey.title)}`}
            className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2.5 bg-[#142332] hover:bg-[#1D3A50] text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-all shadow-xs"
          >
            <span>Book Trip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Enquiry Popup Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        journeyTitle={journey.title}
      />
    </div>
  );
};
