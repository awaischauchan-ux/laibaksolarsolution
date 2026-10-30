import React from 'react';
import { Star, MapPin, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/electricalData';
import { Language } from '../types';

interface TestimonialsSectionProps {
  language: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ language }) => {
  return (
    <section className="py-16 sm:py-24 border-b border-neutral-900 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
            {language === 'ur' ? 'گاہکوں کی رائے' : language === 'ur_roman' ? 'Customer Reviews' : 'Verified Client Reviews'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Trusted by Homeowners & Business Clients
          </h2>
          <p className="mt-3 text-base text-neutral-400">
            Real feedback from satisfied clients across residential societies and commercial markets.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-neutral-300 italic leading-relaxed">
                  "{review.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{review.name}</div>
                  <div className="text-xs text-neutral-400">{review.role}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
