export type DifficultyLevel = 'Easy' | 'Moderate' | 'Challenging' | 'Strenuous' | 'Technical';

export interface ItineraryDay {
  day: number;
  title: string;
  altitude: string;
  duration: string;
  description: string;
  accommodation: string;
  meals: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Journey {
  slug: string;
  title: string;
  category: 'trek' | 'tour' | 'expedition';
  region: string;
  duration: string;
  difficulty: DifficultyLevel;
  maxAltitude: string;
  bestSeason: string;
  activity: string;
  groupSize: string;
  featuredImage: string;
  gallery: string[];
  shortDescription: string;
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  acclimatisationPlan: string;
  startingPrice?: string;
  faqs: FAQItem[];
  transportation?: string;
  startEndPoint?: string;
  mealsIncluded?: string;
  accommodationType?: string;
  videoId?: string;
  monthlySeasonality?: Array<{ month: string; short: string; status: 'best' | 'good' | 'average' }>;
  fixedDepartures?: Array<{
    id: string;
    startDate: string;
    endDate: string;
    price: string;
    status: 'Guaranteed' | 'Available' | 'Few Spots Left';
    seatsLeft: number;
  }>;
  routeMapImage?: string;
  elevationProfile?: Array<{ point: string; altitude: number; label?: string }>;
  gearList?: Array<{ category: string; items: string[] }>;
  reviews?: Array<{
    id: string;
    author: string;
    country: string;
    avatar?: string;
    rating: number;
    date: string;
    title: string;
    content: string;
    trekDate: string;
  }>;
}

export interface Destination {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
  bestSeason: string;
  keyPeaks: string[];
  journeyCount: number;
  gallery?: string[];
  elevationRange?: string;
  coordinates?: string;
  gateway?: string;
  unescoStatus?: string;
  dominantCulture?: string;
  trailStyle?: string;
  startingPrice?: string;
  culturalProfile?: {
    title: string;
    narrative: string;
    monasteries: string[];
    traditions: string[];
  };
  detailedPeaks?: Array<{
    name: string;
    altitude: string;
    significance: string;
    icon?: string;
  }>;
  landmarksList?: Array<{
    name: string;
    category: string;
    description: string;
    altitude?: string;
  }>;
  permitsLogistics?: {
    permits: string[];
    checkpoints: string[];
    weatherNote: string;
    flightLogistics: string;
  };
  monthlySeasonality?: Array<{
    month: string;
    short: string;
    status: 'best' | 'good' | 'average';
    description?: string;
  }>;
  wildlifeEcology?: {
    flora: string[];
    fauna: string[];
    conservationNote: string;
  };
  faqs?: FAQItem[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  languages: string[];
  hometown: string;
  expertise: string;
  bio: string;
  image: string;
  summits?: string[];
  certifications?: string[];
  quote?: string;
  specialtyTags?: string[];
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  publishedDate: string;
  readingTime: string;
  excerpt: string;
  image: string;
  sections: {
    heading?: string;
    paragraphs: string[];
  }[];
}

export interface Review {
  id: string;
  name: string;
  country: string;
  journey: string;
  seasonYear: string;
  content: string;
  source: string;
  platform?: 'tripadvisor' | 'google';
  rating?: number;
  title?: string;
  timeAgo?: string;
  avatar?: string;
  avatarColor?: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  statement: string;
  officeLocation: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  operatingHours: string;
}
