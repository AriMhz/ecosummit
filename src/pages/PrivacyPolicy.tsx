import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-28 md:pt-36 pb-24 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#183E63] mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Legal & Compliance</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#142332] font-normal leading-tight">
            Privacy Policy & Terms
          </h1>
          <p className="text-base sm:text-lg text-[#566370] mt-4 font-light leading-relaxed">
            Your privacy is important to us. This document outlines how EcoSummit Travel & Adventure Pvt. Ltd. collects, uses, and protects your personal information.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E8E2D8] shadow-xs space-y-10 text-sm text-[#566370] leading-relaxed">
          {/* 1 */}
          <div>
            <h2 className="font-serif text-2xl text-[#142332] mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you enquire about or book a trip through our website, we may collect the following personal information:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Full name, nationality, and date of birth</li>
              <li>Email address, phone number, and WhatsApp number</li>
              <li>Passport details (for permit processing and mountain flight reservations)</li>
              <li>Travel insurance policy details</li>
              <li>Dietary requirements and medical information relevant to high-altitude travel</li>
              <li>Emergency contact information</li>
            </ul>
          </div>

          {/* 2 */}
          <div>
            <h2 className="font-serif text-2xl text-[#142332] mb-3">
              2. How We Use Your Information
            </h2>
            <p>Your personal information is used exclusively for:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Processing trek, tour, and expedition bookings</li>
              <li>Obtaining government permits (TIMS, national park, restricted area permits)</li>
              <li>Arranging domestic flights, ground transfers, and lodge reservations</li>
              <li>Communicating pre-departure briefings, weather updates, and safety advisories</li>
              <li>Emergency response coordination with Sherpa guides and helicopter rescue services</li>
              <li>Sending periodic newsletters (only if opted in — you may unsubscribe at any time)</li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="font-serif text-2xl text-[#142332] mb-3">
              3. Data Sharing & Third Parties
            </h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties for marketing purposes. We share personal data only with:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Nepal government authorities (for permit processing)</li>
              <li>Partner airlines (for domestic mountain flights)</li>
              <li>Accredited mountain lodges and teahouse operators on your route</li>
              <li>Emergency medical services (only in the event of medical emergencies during trekking)</li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h2 className="font-serif text-2xl text-[#142332] mb-3">
              4. Data Security
            </h2>
            <p>
              We implement industry-standard security measures including SSL encryption, secure server infrastructure, and role-based access controls to protect your personal information from unauthorized access, alteration, or disclosure. Payment transactions are processed through secure, PCI-compliant banking gateways.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="font-serif text-2xl text-[#142332] mb-3">
              5. Cookies & Analytics
            </h2>
            <p>
              Our website uses cookies and analytics tools to improve user experience and understand traffic patterns. Cookies do not store personally identifiable information. You may disable cookies in your browser settings, though this may impact some website features.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="font-serif text-2xl text-[#142332] mb-3">
              6. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction of inaccurate or outdated information</li>
              <li>Request deletion of your personal data (subject to legal retention obligations)</li>
              <li>Withdraw consent for marketing communications at any time</li>
            </ul>
          </div>

          {/* 7 */}
          <div>
            <h2 className="font-serif text-2xl text-[#142332] mb-3">
              7. Photo & Video Usage
            </h2>
            <p>
              Photographs and videos taken during EcoSummit expeditions may be used on our website, social media channels, and marketing materials. If you prefer your images not to be used, please notify your trip leader at the start of the journey.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="font-serif text-2xl text-[#142332] mb-3">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="font-serif text-2xl text-[#142332] mb-3">
              9. Contact Us
            </h2>
            <p>
              For any questions regarding this Privacy Policy or your personal data, please contact us:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Email: <a href="mailto:info@ecosummitnepal.com" className="text-[#183E63] hover:underline">info@ecosummitnepal.com</a></li>
              <li>Phone: +977-9841-063000</li>
              <li>Address: Thamel, Kathmandu-29, Nepal</li>
            </ul>
          </div>

          <div className="pt-6 border-t border-[#E8E2D8] text-xs text-[#94A3B8]">
            <p>Last updated: September 2026</p>
            <p className="mt-2">
              See also: <Link to="/booking-terms" className="text-[#183E63] hover:underline">Booking Terms & Conditions</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
