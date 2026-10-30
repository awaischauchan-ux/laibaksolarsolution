import React, { useState } from 'react';
import { ArrowUpRight, Check, X, ShieldAlert } from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { translations } from '../translations';
import { SERVICES_LIST } from '../data/electricalData';

interface ServicesSectionProps {
  language: Language;
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  language,
  onSelectServiceForBooking,
}) => {
  const t = translations[language];
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const getTitle = (item: ServiceItem) => {
    if (language === 'ur') return item.titleUrdu;
    if (language === 'ur_roman') return item.titleRomanUrdu;
    return item.title;
  };

  const getDescription = (item: ServiceItem) => {
    if (language === 'ur') return item.descriptionUrdu;
    if (language === 'ur_roman') return item.descriptionRomanUrdu;
    return item.description;
  };

  const getFeatures = (item: ServiceItem) => {
    if (language === 'ur') return item.featuresUrdu;
    if (language === 'ur_roman') return item.featuresRomanUrdu;
    return item.features;
  };

  return (
    <section id="services" className="py-16 sm:py-24 border-b border-neutral-900 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
            {language === 'ur' ? 'ہماری الیکٹریکل مہارت' : language === 'ur_roman' ? 'Hamari Maharat' : 'Core Capabilities'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            {t.services.sectionTitle}
          </h2>
          <p className="mt-3 text-base text-neutral-400">
            {t.services.sectionSubtitle}
          </p>
        </div>

        {/* Asymmetric Bento / Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service, idx) => {
            const isFeatured = idx === 0 || idx === 1;
            return (
              <div
                key={service.id}
                className="group relative bg-neutral-900/60 rounded-xl border border-neutral-800/80 hover:border-neutral-700 p-6 flex flex-col justify-between transition-all hover:bg-neutral-900"
              >
                <div>
                  {/* Top row: Number and Pricing */}
                  <div className="flex items-center justify-between gap-4 text-xs text-neutral-400 mb-4 pb-3 border-b border-neutral-800/60">
                    <span className="font-mono text-amber-400 font-semibold">{service.number}</span>
                    <span className="font-mono text-neutral-300">{service.startingPrice}</span>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="h-48 sm:h-52 w-full rounded-lg overflow-hidden bg-neutral-950 mb-4 relative">
                    <img
                      src={service.image}
                      alt={getTitle(service)}
                      referrerPolicy="no-referrer"
                      style={{ objectPosition: service.imagePosition || 'center' }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-neutral-950/15 group-hover:bg-transparent transition-colors" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {getTitle(service)}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-400 line-clamp-3 leading-relaxed">
                    {getDescription(service)}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-4 space-y-1.5 text-xs text-neutral-300">
                    {getFeatures(service).slice(0, 2).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModalService(service)}
                    className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>{t.services.viewDetails}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectServiceForBooking(getTitle(service))}
                    className="px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap shrink-0"
                  >
                    {t.services.bookThis}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono text-amber-400 mb-2">
              Service {activeModalService.number} · {activeModalService.startingPrice}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white pr-8">
              {getTitle(activeModalService)}
            </h3>

            <div className="mt-4 rounded-lg overflow-hidden h-64 sm:h-72 bg-neutral-950 border border-neutral-800">
              <img
                src={activeModalService.image}
                alt={getTitle(activeModalService)}
                style={{ objectPosition: activeModalService.imagePosition || 'center' }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
              {getDescription(activeModalService)}
            </p>

            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                {language === 'ur' ? 'اس سروس میں کیا شامل ہے؟' : language === 'ur_roman' ? 'Is Service Mein Kya Shamil Hai?' : 'Service Specifications & Deliverables'}
              </h4>
              <ul className="space-y-2 text-sm text-neutral-300">
                {getFeatures(activeModalService).map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const serviceName = getTitle(activeModalService);
                  setActiveModalService(null);
                  onSelectServiceForBooking(serviceName);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
              >
                {t.services.bookThis}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
