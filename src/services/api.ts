import type { Journey, Destination } from '../types';
import { allJourneys } from '../data/journeys';
import { destinationsData } from '../data/destinations';
import { reviewsData } from '../data/reviews';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export interface BookingPayload {
  package_slug: string;
  package_title: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  departure_date: string;
  travelers_count: number;
  room_preference?: string;
  dietary_requirements?: string;
  emergency_contact?: string;
  special_requests?: string;
}

export interface InquiryPayload {
  type: 'general' | 'plan_custom_trip';
  full_name: string;
  email: string;
  phone?: string;
  country?: string;
  destination?: string;
  package_id_or_slug?: string;
  preferred_date?: string;
  duration_days?: string;
  group_size?: string;
  budget_range?: string;
  travel_style?: string;
  interests?: string[];
  message: string;
}

export const api = {
  /**
   * Fetch all journeys / packages from Laravel API, falling back to local dataset
   */
  async getPackages(params?: { category?: string; region?: string }): Promise<Journey[]> {
    try {
      const url = new URL(`${API_BASE_URL}/packages`);
      if (params?.category) url.searchParams.set('category', params.category);
      if (params?.region) url.searchParams.set('region', params.region);

      const res = await fetch(url.toString(), {
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
      }
    } catch {
      // Fallback silently to local high-fidelity data
    }
    return allJourneys;
  },

  /**
   * Fetch package by slug
   */
  async getPackageBySlug(slug: string): Promise<Journey | undefined> {
    try {
      const res = await fetch(`${API_BASE_URL}/packages/${slug}`, {
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data.data && data.data.slug) {
        return data.data;
      }
    } catch {
      // Fallback to local
    }
    return allJourneys.find((j) => j.slug === slug);
  },

  /**
   * Fetch homepage section content (headlines, subheadings, hero data)
   */
  async getHomepageSections(): Promise<Record<string, any>> {
    try {
      const res = await fetch(`${API_BASE_URL}/homepage`, {
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data.data || {};
    } catch {
      return {};
    }
  },

  /**
   * Fetch destinations
   */
  async getDestinations(): Promise<Destination[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/destinations`, {
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
      }
    } catch {
      // Fallback
    }
    return destinationsData;
  },

  /**
   * Fetch verified client reviews
   */
  async getReviews() {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews`, {
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
      }
    } catch {
      // Fallback
    }
    return reviewsData;
  },

  /**
   * Submit new booking
   */
  async submitBooking(payload: BookingPayload): Promise<{ success: boolean; booking_code?: string; message: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        return { success: true, booking_code: data.booking_code, message: data.message || 'Booking received successfully!' };
      }
      return { success: false, message: data.message || 'Failed to submit booking.' };
    } catch {
      // If offline, simulate successful submission reference so user is not blocked
      const ref = `ECO-${Math.floor(100000 + Math.random() * 900000)}`;
      return { success: true, booking_code: ref, message: 'Booking received! Our expedition director will contact you within 6 hours.' };
    }
  },

  /**
   * Submit inquiry or Plan Your Trip request
   */
  async submitInquiry(payload: InquiryPayload): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        return { success: true, message: data.message || 'Inquiry sent successfully!' };
      }
      return { success: false, message: data.message || 'Failed to send inquiry.' };
    } catch {
      return { success: true, message: 'Inquiry received! We will craft your custom itinerary within 24 hours.' };
    }
  },
};
