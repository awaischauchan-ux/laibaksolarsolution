import React from 'react';
import { Phone, MessageSquare, ArrowRight, ShieldCheck, Clock, Award, CheckCircle, MapPin } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeroProps {
  language: Language;
  onBookClick: () => void;
  onCalculatorClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onBookClick,
  onCalculatorClick,
}) => {
  const t = translations[language];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-neutral-900">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Urgent availability banner */}
            <div className="inline-flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{t.hero.urgentBadge}</span>
              <span className="text-neutral-500">·</span>
              <span className="inline-flex items-center gap-1 text-neutral-300">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>Arif Road, 135/9-L</span>
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-amber-400 font-mono font-bold">0305-7182735</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
              {t.hero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Trust points list */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Pure Copper Cable Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Fast 30–60 Min Emergency Arrival</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Upfront Transparent Rates (No Surprises)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Digital Multimeter & Clamp Testing</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                type="button"
                onClick={onBookClick}
                className="px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onCalculatorClick}
                className="px-5 py-3.5 text-sm font-semibold text-neutral-200 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                {t.hero.ctaSecondary}
              </button>

              <a
                href="https://wa.me/923057182735?text=Assalam-o-Alaikum%20Engr.%20M.%20Awais%20Qarni,%20mujhe%20Laibak%20Solar%20Solution%20se%20solar%20/%20electric%20kaam%20karwana%20hai"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 hover:bg-emerald-900/30 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="font-mono">WhatsApp 0305-7182735</span>
              </a>
            </div>

            {/* Quantitative Proof Strip */}
            <div className="pt-6 border-t border-neutral-900 flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm text-neutral-400">
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">12+</div>
                <div className="text-neutral-400 text-xs">{t.hero.stats.experience}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">1,500+</div>
                <div className="text-neutral-400 text-xs">{t.hero.stats.completed}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400 tabular-nums">4.9 / 5.0</div>
                <div className="text-neutral-400 text-xs">{t.hero.stats.rating}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">100%</div>
                <div className="text-neutral-400 text-xs">{t.hero.stats.guarantee}</div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Visual Carrier with Real Photo of M. Awais Qarni */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              <img
                src="/images/owner_solar_rooftop.jpeg"
                alt="Engr. M. Awais Qarni on rooftop solar field with testing tools"
                referrerPolicy="no-referrer"
                style={{ objectPosition: '50% 25%' }}
                className="w-full h-[400px] sm:h-[480px] object-cover"
              />
              
              {/* Overlay banner at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-transparent flex items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-400 text-neutral-950 rounded text-[10px] font-bold uppercase mb-1">
                    Lead Solar Engineer
                  </div>
                  <p className="text-sm font-bold text-white">Engr. M. Awais Qarni</p>
                  <p className="text-[11px] text-neutral-300">Arif Road, 135/9-L, Sahiwal</p>
                </div>
                <a
                  href="tel:03057182735"
                  className="px-3 py-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 0305-7182735</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
