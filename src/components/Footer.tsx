import React from 'react';
import { Zap, Phone, MessageSquare, MapPin, Clock, Facebook } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-900">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-base font-bold text-white">
              <div className="w-7 h-7 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span>{language === 'ur' ? 'لائبک سولر سلوشن' : 'Laibak Solar Solution'}</span>
            </div>
            <p className="text-neutral-400 leading-relaxed text-xs">
              {t.tagline}
            </p>
            <div className="text-[11px] text-amber-400 font-mono">
              Engr. M. Awais Qarni · Certified Solar & Electrical Expert
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#about-founder" className="hover:text-amber-400 transition-colors">Engr. M. Awais Qarni</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">{t.nav.services}</a></li>
              <li><a href="#calculator" className="hover:text-amber-400 transition-colors">{t.nav.calculator}</a></li>
              <li><a href="#pricing" className="hover:text-amber-400 transition-colors">{t.nav.pricing}</a></li>
              <li><a href="#projects" className="hover:text-amber-400 transition-colors">{t.nav.projects}</a></li>
              <li><a href="#safety" className="hover:text-amber-400 transition-colors">Safety Guide</a></li>
            </ul>
          </div>

          {/* Services list */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Key Services</h4>
            <ul className="space-y-2">
              <li>Solar Inverter & Battery DB Box</li>
              <li>Net-Metering Green Meter Integration</li>
              <li>New House Piping & Cable Pulling</li>
              <li>Short Circuit Emergency Tracing</li>
              <li>Main Distribution Box (DB) Dressing</li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Direct Contact</h4>
            <div className="flex items-center gap-2 text-neutral-300">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <a href="tel:03057182735" className="hover:text-white font-mono text-amber-400 font-bold">0305-7182735</a>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <a href="https://wa.me/923057182735" target="_blank" rel="noreferrer" className="hover:text-white font-mono text-emerald-400 font-bold">WhatsApp: 0305-7182735</a>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Arif Road, 135/9-L, Sahiwal</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>24/7 Emergency Support in Sahiwal</span>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fais-pre-k7hkvbohdvfe5ygdvgxni5-736838799983.asia-northeast1.run.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-white bg-[#1877F2] hover:bg-[#166fe5] rounded-md transition-colors"
                title="Share on Facebook"
              >
                <Facebook className="w-3 h-3 fill-current" />
                <span>Share on FB</span>
              </a>
              <a
                href="https://api.whatsapp.com/send?text=Check%20out%20Laibak%20Solar%20Solution%20Sahiwal%20by%20Engr.%20M.%20Awais%20Qarni:%20https%3A%2F%2Fais-pre-k7hkvbohdvfe5ygdvgxni5-736838799983.asia-northeast1.run.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-md transition-colors"
                title="Share on WhatsApp"
              >
                <MessageSquare className="w-3 h-3 fill-current" />
                <span>Share on WA</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Laibak Solar Solution. Lead Engineer: M. Awais Qarni (Arif Road, 135/9-L, Sahiwal).
          </div>
          <div className="flex items-center gap-4">
            <span>Guaranteed Workmanship</span>
            <span>·</span>
            <span>Safety First Protocol</span>
            <span>·</span>
            <span>Fair Transparent Pricing</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
