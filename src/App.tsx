/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutFounder } from './components/AboutFounder';
import { ServicesSection } from './components/ServicesSection';
import { LoadCalculator } from './components/LoadCalculator';
import { RateListSection } from './components/RateListSection';
import { ProjectsGallery } from './components/ProjectsGallery';
import { BookingSection } from './components/BookingSection';
import { SafetyGuidelines } from './components/SafetyGuidelines';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { ShareModal } from './components/ShareModal';
import { Language } from './types';
import { MessageSquare, Phone, Share2, Facebook } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('ur_roman');
  const [prefilledService, setPrefilledService] = useState<string>('');
  const [prefilledNotes, setPrefilledNotes] = useState<string>('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Handle HTML document direction and lang based on language choice
  useEffect(() => {
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = language === 'ur' ? 'ur' : 'en';
  }, [language]);

  const scrollToBooking = (serviceName?: string, notesText?: string) => {
    if (serviceName) setPrefilledService(serviceName);
    if (notesText) setPrefilledNotes(notesText);

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCalculator = () => {
    const calcEl = document.getElementById('calculator');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onBookClick={() => scrollToBooking()}
        onShareClick={() => setIsShareModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          language={language}
          onBookClick={() => scrollToBooking()}
          onCalculatorClick={scrollToCalculator}
        />

        {/* Spotlight on Founder & Chief Engineer: M. Awais Qarni */}
        <AboutFounder
          language={language}
          onBookClick={() => scrollToBooking()}
        />

        {/* Services Showcase */}
        <ServicesSection
          language={language}
          onSelectServiceForBooking={(serviceName) => scrollToBooking(serviceName)}
        />

        {/* Interactive Electrical Load & Sizing / Cost Calculator */}
        <LoadCalculator
          language={language}
          onApplyEstimateToBooking={(estimateText) => {
            scrollToBooking('House Wiring & Load Estimation', estimateText);
          }}
        />

        {/* Transparent Rate List */}
        <RateListSection
          language={language}
          onBookRateItem={(taskName) => scrollToBooking(taskName)}
        />

        {/* Completed Projects Portfolio */}
        <ProjectsGallery
          language={language}
          onBookClick={() => scrollToBooking()}
        />

        {/* Booking & Immediate WhatsApp Dispatch */}
        <BookingSection
          language={language}
          prefilledService={prefilledService}
          prefilledNotes={prefilledNotes}
        />

        {/* Safety Standards Guide */}
        <SafetyGuidelines language={language} />

        {/* Customer Testimonials */}
        <TestimonialsSection language={language} />
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Floating Fast Action Pill for Mobile & Desktop */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        
        {/* Quick Facebook Share Pill */}
        <button
          type="button"
          onClick={() => setIsShareModalOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-neutral-900/90 hover:bg-[#1877F2] text-neutral-200 hover:text-white rounded-full border border-neutral-700/80 shadow-lg backdrop-blur-sm transition-all text-xs font-semibold group active:scale-95"
          aria-label="Facebook Par Share Karein"
          title="Facebook / WhatsApp Par Share Karein"
        >
          <Facebook className="w-4 h-4 text-[#1877F2] group-hover:text-white fill-current transition-colors" />
          <span className="hidden sm:inline">Share Website</span>
          <Share2 className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
        </button>

        {/* WhatsApp Direct Action */}
        <a
          href="https://wa.me/923057182735?text=Assalam-o-Alaikum%20Engr.%20M.%20Awais%20Qarni,%20mujhe%20Laibak%20Solar%20Solution%20se%20kaam%20karwana%20hai"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-950/50 hover:scale-105 transition-all text-xs font-semibold"
          aria-label="Direct WhatsApp Message"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline">WhatsApp 0305-7182735</span>
        </a>

        {/* Call Button for Mobile */}
        <a
          href="tel:03057182735"
          className="flex items-center gap-2 px-3.5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-full shadow-lg shadow-amber-950/50 hover:scale-105 transition-all text-xs font-bold sm:hidden"
          aria-label="Call M. Awais Qarni"
        >
          <Phone className="w-4 h-4" />
          <span>Call</span>
        </a>
      </div>

      {/* Share on Facebook & Social Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        language={language}
      />

    </div>
  );
}
