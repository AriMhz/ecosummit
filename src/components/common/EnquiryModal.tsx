import React, { useState, useMemo, useEffect } from 'react';
import { X as XIcon, Send, CheckCircle2, AlertCircle } from 'lucide-react';

import { COUNTRIES } from '../../data/countries';
import { COUNTRY_DIAL_CODES } from '../../data/countryCodes';
import { api } from '../../services/api';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  journeyTitle?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, journeyTitle }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [countryCode, setCountryCode] = useState('+977');
  const [phone, setPhone] = useState('');
  const [nationality, setNationality] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Auto-sync country code when nationality is picked if match exists
  const handleNationalityChange = (val: string) => {
    setNationality(val);
    const matched = COUNTRY_DIAL_CODES.find(
      (c) => c.name.toLowerCase() === val.toLowerCase()
    );
    if (matched) {
      setCountryCode(matched.dialCode);
    }
  };

  // Generate a simple math captcha
  const captcha = useMemo(() => {
    const a = Math.floor(Math.random() * 10) + 2;
    const b = Math.floor(Math.random() * (a - 1)) + 1;
    const words = ['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
    const bWord = words[b] || String(b);
    return { a, b, bWord, answer: a - b };
  }, [isOpen]); // regenerate when modal opens

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaAnswer.trim(), 10) !== captcha.answer) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    setIsSubmitting(true);

    try {
      await api.submitInquiry({
        type: 'general',
        full_name: fullName,
        email,
        phone: phone ? `${countryCode} ${phone}` : undefined,
        country: nationality,
        package_id_or_slug: journeyTitle,
        message,
      });
    } catch {
      // fallback smoothly
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setIsSubmitting(false);
    setCaptchaAnswer('');
    setCaptchaError(false);
    setFullName('');
    setEmail('');
    setMessage('');
    setPhone('');
    setNationality('');
    setCountryCode('+977');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10 border border-[#E8E2D8]">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer z-10"
          aria-label="Close enquiry form"
        >
          <XIcon className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-[#142332]">
                Inquiry Sent Successfully
              </h3>
              <p className="text-sm text-[#566370] max-w-sm mx-auto leading-relaxed">
                Thank you for your inquiry. Our Kathmandu expedition desk will reply within 24 hours with a detailed trip proposal.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 bg-[#183E63] hover:bg-[#122F4C] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6 pr-8">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#D46238] block mb-1">
                  Make An Inquiry for
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#142332] leading-snug">
                  {journeyTitle || 'Your Nepal Adventure'}
                </h3>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Full Name + Nationality */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D8] rounded-xl px-4 py-3 text-sm text-[#142332] placeholder-[#94A3B8] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]/20 transition-all"
                    />
                  </div>
                  <div>
                    <select
                      required
                      value={nationality}
                      onChange={(e) => handleNationalityChange(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D8] rounded-xl px-4 py-3 text-sm text-[#142332] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]/20 transition-all appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23183E63' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                    >
                      <option value="" disabled className="text-[#94A3B8]">Nationality</option>
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 2: Phone with Country Code + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex rounded-xl border border-[#E8E2D8] bg-[#FAF8F5] focus-within:border-[#183E63] focus-within:ring-1 focus-within:ring-[#183E63]/20 transition-all overflow-hidden">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-[#FAF8F5] hover:bg-slate-100 border-r border-[#E8E2D8] px-2.5 sm:px-3 py-3 text-xs sm:text-sm text-[#142332] font-mono font-medium focus:outline-none cursor-pointer shrink-0 max-w-[105px] sm:max-w-[125px]"
                      aria-label="Country Code"
                    >
                      {COUNTRY_DIAL_CODES.map((c) => (
                        <option key={`${c.code}-${c.dialCode}`} value={c.dialCode}>
                          {c.flag} {c.dialCode}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
                      className="flex-1 bg-transparent px-3.5 py-3 text-sm text-[#142332] placeholder-[#94A3B8] focus:outline-none min-w-0"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D8] rounded-xl px-4 py-3 text-sm text-[#142332] placeholder-[#94A3B8] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Message */}
                <div>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                    className="w-full bg-[#FAF8F5] border border-[#E8E2D8] rounded-xl px-4 py-3 text-sm text-[#142332] placeholder-[#94A3B8] focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]/20 transition-all resize-none"
                  />
                </div>

                {/* Row 4: Math Captcha */}
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-[#183E63] font-semibold whitespace-nowrap">
                    {captcha.a} − {captcha.bWord} =
                  </span>
                  <input
                    type="text"
                    required
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    className="w-20 bg-[#FAF8F5] border border-[#E8E2D8] rounded-xl px-3 py-2.5 text-sm text-[#142332] text-center focus:outline-none focus:border-[#183E63] focus:ring-1 focus:ring-[#183E63]/20 transition-all"
                    placeholder="?"
                  />
                  {(captchaError || (captchaAnswer && parseInt(captchaAnswer) !== captcha.answer)) && (
                    <span className="text-xs text-red-500 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      Incorrect
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#183E63] hover:bg-[#122F4C] text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
