import React from 'react';
import { Zap, Phone, Share2, Facebook } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onBookClick: () => void;
  onShareClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onBookClick,
  onShareClick,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-18">
          
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-md"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm sm:text-base leading-tight">
                {language === 'ur' ? 'لائبک سولر سلوشن' : 'Laibak Solar Solution'}
              </span>
              <span className="text-[10px] text-amber-400 font-normal">
                {language === 'ur' ? 'انجینئر ایم اویس قرنی' : 'Engr. M. Awais Qarni'}
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
            <a
              href="#about-founder"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {language === 'ur' ? 'انجینئر کا تعارف' : language === 'ur_roman' ? 'M. Awais Qarni' : 'About Engineer'}
            </a>
            <a
              href="#services"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {t.nav.services}
            </a>
            <a
              href="#calculator"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {t.nav.calculator}
            </a>
            <a
              href="#pricing"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {t.nav.pricing}
            </a>
            <a
              href="#projects"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {t.nav.projects}
            </a>
            <a
              href="#safety"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {language === 'ur' ? 'حفاظتی اصول' : language === 'ur_roman' ? 'Hifazati Usool' : 'Safety Guide'}
            </a>
          </nav>

          {/* Zone 3: Actions + Share + Phone + Language Selector */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Share / Facebook Button */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onShareClick}
                title="Facebook / WhatsApp Par Share Karein"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-amber-400 hover:text-white transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Share</span>
              </button>

              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fais-pre-k7hkvbohdvfe5ygdvgxni5-736838799983.asia-northeast1.run.app"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook Par Share Karein"
                className="p-1.5 text-xs font-semibold text-[#1877F2] bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-[#1877F2]/10 hover:border-[#1877F2]/40 transition-colors"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5 sm:p-1 text-xs font-medium">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-1.5 sm:px-2 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                  language === 'en'
                    ? 'bg-neutral-800 text-amber-400 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('ur_roman')}
                className={`px-1.5 sm:px-2 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                  language === 'ur_roman'
                    ? 'bg-neutral-800 text-amber-400 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Roman
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('ur')}
                className={`px-1.5 sm:px-2 py-1 rounded transition-colors whitespace-nowrap shrink-0 font-arabic ${
                  language === 'ur'
                    ? 'bg-neutral-800 text-amber-400 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                اردو
              </button>
            </div>

            {/* Quick Call Button with Real Phone */}
            <a
              href="tel:03057182735"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-amber-400 transition-colors whitespace-nowrap shrink-0"
              title="Call M. Awais Qarni"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono">0305-7182735</span>
            </a>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onBookClick}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm hover:shadow-amber-500/10 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.contact}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
