import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Play, Users, ShieldCheck, HeartHandshake, Award, Phone, Mail, MessageSquare } from 'lucide-react';
import { companyData } from '../../data/company';

interface AboutDropdownProps {
  onClose?: () => void;
}

export const AboutDropdown: React.FC<AboutDropdownProps> = ({ onClose }) => {
  const companyLinks = [
    {
      name: 'Our Story & Heritage',
      detail: 'Indigenous Sherpa lineage & company philosophy',
      path: '/about',
      icon: Users,
    },
    {
      name: 'Meet Our Mountain Team',
      detail: 'Founders, lead Sherpa guides & valley specialists',
      path: '/team',
      icon: Users,
    },
    {
      name: 'Responsible Travel & Ethics',
      detail: 'Porter welfare, fair wages & eco-conservation',
      path: '/responsible-travel',
      icon: HeartHandshake,
    },
    {
      name: 'Emergency & Rescue Protocol',
      detail: 'Satellite SOS & rapid helicopter evacuations',
      path: '/emergency-rescue',
      icon: ShieldCheck,
    },
    {
      name: 'High-Altitude Medical Standards',
      detail: 'PAC chambers, pulse oximetry & oxygen safety',
      path: '/safety-altitude',
      icon: Award,
    },
    {
      name: 'Contact Us & Inquiries',
      detail: 'Kathmandu headquarters, 24/7 emergency & WhatsApp',
      path: '/contact',
      icon: Phone,
    },
    {
      name: 'Verified Traveler Reviews',
      detail: 'Unfiltered feedback from worldwide expeditioners',
      path: '/reviews',
      icon: MessageSquare,
    },
  ];

  const trustHighlights = [
    { name: '100% Verified Safety Track Record', path: '/safety-altitude' },
    { name: 'Wilderness Medical Certified Sherpas', path: '/team' },
    { name: 'Garmin InReach Satellite Comms', path: '/emergency-rescue' },
    { name: 'Fair Trade & Porter Welfare Alliance', path: '/responsible-travel' },
  ];


  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-7 items-stretch">
      {/* ── Column 1: Visual Hero Card (Left) ────────────────────────── */}
      <div className="col-span-12 xl:col-span-3 rounded-2xl overflow-hidden relative min-h-[420px] flex flex-col justify-between p-6 sm:p-7 group">
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80"
          alt="EcoSummit Team & Heritage"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-[2px] bg-[#E85D2A] rounded-full" />
            <span className="font-simplon-mono text-[10px] tracking-[0.2em] font-bold text-white/90 uppercase">
              ABOUT ECOSUMMIT
            </span>
          </div>

          <h3 className="font-serif text-2xl lg:text-[26px] text-white font-normal leading-[1.18] tracking-tight">
            Local Roots.
            <br />
            Global
            <br />
            Standards.
          </h3>

          <p className="font-sans text-xs text-white/80 leading-relaxed font-light line-clamp-3">
            Born of the high Himalayas, guided by authentic Sherpa wisdom, and dedicated to meaningful sustainable travel.
          </p>
        </div>

        <div className="relative z-10 pt-4">
          <Link
            to="/about"
            onClick={onClose}
            className="inline-flex items-center gap-3 text-xs font-semibold text-white group/btn transition-colors hover:text-[#E85D2A]"
          >
            <div className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center text-white group-hover/btn:border-[#E85D2A] group-hover/btn:text-[#E85D2A] group-hover/btn:scale-105 transition-all bg-black/20 backdrop-blur-xs">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span className="tracking-wide">Watch Our Story</span>
          </Link>
        </div>
      </div>

      {/* ── Column 2: Company & Ethos ─────────────────────────────────── */}
      <div className="col-span-12 md:col-span-4 xl:col-span-3 flex flex-col justify-between py-1 border-r border-[#F0EFEB]/80 pr-4">
        <div>
          <h4 className="font-simplon-mono text-[11px] font-bold tracking-[0.18em] text-[#17201D] uppercase mb-4">
            COMPANY & LINEAGE
          </h4>

          <div className="space-y-3.5">
            {companyLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className="group flex items-center justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-[#F7F9FA] transition-colors"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#F2F5F8] text-[#183E63] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#E85D2A] group-hover:text-white transition-colors">
                    {item.icon ? <item.icon className="w-3.5 h-3.5" /> : <Users className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <span className="font-sans text-[13px] font-semibold text-[#17201D] group-hover:text-[#E85D2A] transition-colors block leading-tight">
                      {item.name}
                    </span>
                    <span className="font-sans text-[11px] text-[#718096] font-light block mt-0.5">
                      {item.detail}
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E0] group-hover:text-[#E85D2A] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Column 3: Trust Highlights & Policies ────────────────────── */}
      <div className="col-span-12 md:col-span-4 xl:col-span-3 flex flex-col justify-between py-1 border-r border-[#F0EFEB]/80 pr-4">
        <div>
          <h4 className="font-simplon-mono text-[11px] font-bold tracking-[0.18em] text-[#17201D] uppercase mb-3.5">
            SAFETY & STANDARDS
          </h4>

          <div className="space-y-2.5">
            {trustHighlights.map((highlight) => (
              <Link
                key={highlight.name}
                to={highlight.path}
                onClick={onClose}
                className="group flex items-center gap-2 text-[12.5px] text-[#4A5568] hover:text-[#E85D2A] transition-colors py-0.5 font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#A0AEC0] group-hover:text-[#E85D2A] transition-colors shrink-0" />
                <span className="truncate">{highlight.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-[#F0EFEB]">
          <h4 className="font-simplon-mono text-[11px] font-bold tracking-[0.18em] text-[#17201D] uppercase mb-3">
            NEED ASSISTANCE?
          </h4>

          {/* Featured Contact Card */}
          <div className="bg-[#FAF9F5] rounded-xl p-3 border border-[#E8E2D8] space-y-2.5 mb-2.5">
            <Link
              to="/contact"
              onClick={onClose}
              className="group flex items-center justify-between text-[12.5px] font-semibold text-[#183E63] hover:text-[#E85D2A] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E85D2A]" />
                <span>Contact Kathmandu HQ</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E0] group-hover:text-[#E85D2A] group-hover:translate-x-0.5 transition-all" />
            </Link>

            <div className="flex items-center justify-between text-[11px] text-[#6B7D8F] pt-2 border-t border-[#E8E2D8]/60">
              <span>Direct Phone:</span>
              <a
                href={`tel:${companyData.contactPhone.replace(/\s+/g, '')}`}
                className="font-semibold text-[#142332] hover:text-[#E85D2A]"
              >
                {companyData.contactPhone}
              </a>
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <Link
              to="/contact"
              onClick={onClose}
              className="group flex items-center justify-between text-[11.5px] text-[#142332] hover:text-[#E85D2A] transition-colors py-0.5 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#E85D2A] transition-colors shrink-0" />
                <span>Contact Kathmandu HQ</span>
              </div>
              <ChevronRight className="w-3 h-3 text-[#CBD5E0] group-hover:text-[#E85D2A] group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              to="/booking-terms"
              onClick={onClose}
              className="group flex items-center justify-between text-[11.5px] text-[#718096] hover:text-[#E85D2A] transition-colors py-0.5 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-[#A0AEC0] group-hover:text-[#E85D2A] transition-colors shrink-0" />
                <span>Booking Terms & Conditions</span>
              </div>
              <ChevronRight className="w-3 h-3 text-[#CBD5E0] group-hover:text-[#E85D2A] group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Column 4: Featured Team Card (Right) ─────────────────────── */}
      <div className="col-span-12 md:col-span-4 xl:col-span-3 flex flex-col justify-between py-1">
        <div className="rounded-2xl overflow-hidden border border-[#E8E2D8]/80 bg-[#FAF9F5] p-3 shadow-xs hover:shadow-md transition-shadow group flex flex-col h-full justify-between">
          <div>
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#17201D]">
              <img
                src="/team-assets/photo_bishal.jpg"
                alt="Our Leadership Team"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-2.5 left-2.5 bg-[#E85D2A] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded shadow-sm">
                LEADERSHIP & GUIDES
              </div>
            </div>

            <div className="pt-3.5 px-1">
              <h4 className="font-serif text-[17px] font-bold text-[#17201D] group-hover:text-[#E85D2A] transition-colors leading-snug">
                Meet Our Mountain Masters
              </h4>

              <div className="flex items-center gap-3 text-[11px] text-[#718096] font-medium mt-1.5">
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#E85D2A]" />
                  <span>100% Native Sherpa Led</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#E85D2A]" />
                  <span>50+ Guides</span>
                </div>
              </div>

              <p className="text-[11.5px] text-[#718096] leading-relaxed font-light mt-2 line-clamp-2">
                Discover the passionate local experts, certified mountaineers, and expedition planners behind your journey.
              </p>
            </div>
          </div>

          <div className="pt-4 px-1">
            <Link
              to="/team"
              onClick={onClose}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#E85D2A] hover:bg-[#D34D1E] text-white text-xs font-semibold tracking-wide shadow-xs hover:shadow-md transition-all group/btn"
            >
              <span>Explore Team</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
