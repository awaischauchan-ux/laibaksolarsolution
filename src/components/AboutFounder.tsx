import React from 'react';
import { Phone, MessageSquare, MapPin, Award, CheckCircle, ShieldCheck, Wrench, Zap } from 'lucide-react';
import { Language } from '../types';

interface AboutFounderProps {
  language: Language;
  onBookClick: () => void;
}

export const AboutFounder: React.FC<AboutFounderProps> = ({ language, onBookClick }) => {
  const isUrdu = language === 'ur';
  const isRoman = language === 'ur_roman';

  return (
    <section id="about-founder" className="py-16 sm:py-24 border-b border-neutral-900 bg-neutral-950 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-3">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>
              {isUrdu ? 'انجینئر اور ماسٹر الیکٹریشن کا تعارف' : isRoman ? 'Taaruf: M. Awais Qarni' : 'Founder & Lead Solar Engineer'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {isUrdu ? (
              <>
                ملئے اپنے قابلِ اعتماد سولر و الیکٹریکل ماہر سے: <span className="text-amber-400">انجینئر ایم اویس قرنی</span>
              </>
            ) : isRoman ? (
              <>
                Miliye Apne Certified Solar & Electric Expert Se: <span className="text-amber-400">M. Awais Qarni</span>
              </>
            ) : (
              <>
                Meet Your Lead Solar & Electrical Expert: <span className="text-amber-400">Engr. M. Awais Qarni</span>
              </>
            )}
          </h2>

          <p className="mt-3 text-base text-neutral-300 leading-relaxed">
            {isUrdu
              ? 'لائبک سولر سلوشن کے بانی اور سربراہ، جو ساہیوال اور گردونواح میں سولر انورٹرز، ہائبرڈ سسٹمز اور محفوظ وائرنگ کے ماہر ہیں۔'
              : isRoman
              ? 'Laibak Solar Solution k sarbarah jo Sahiwal aur ird-gird k ilaqon mein hybrid solar inverters aur safe wiring k certified expert hain.'
              : 'Founder & technical director of Laibak Solar Solution, personally inspecting and delivering certified solar inverter setups and pure copper wiring across Sahiwal.'}
          </p>
        </div>

        {/* 2-Column Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Photos Showcase - Responsive Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            
            {/* Photo 1: On-Site Solar Array with Multimeter & Screwdriver */}
            <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-lg">
              <div className="h-64 sm:h-72 w-full overflow-hidden bg-neutral-950">
                <img
                  src="/images/owner_solar_rooftop.jpeg"
                  alt="Engr. M. Awais Qarni testing solar rooftop array with multimeter"
                  style={{ objectPosition: '50% 25%' }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-3 bg-neutral-900/90 border-t border-neutral-800">
                <p className="text-xs font-bold text-white">Rooftop Solar Array</p>
                <p className="text-[11px] text-amber-400 font-medium">Digital Multimeter Testing</p>
              </div>
            </div>

            {/* Photo 2: Wiring Solis Hybrid Inverter */}
            <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-lg">
              <div className="h-64 sm:h-72 w-full overflow-hidden bg-neutral-950">
                <img
                  src="/images/owner_solis_inverter.jpeg"
                  alt="M. Awais Qarni wiring Solis solar inverter"
                  style={{ objectPosition: '45% 40%' }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-3 bg-neutral-900/90 border-t border-neutral-800">
                <p className="text-xs font-bold text-white">Solis Hybrid Inverter</p>
                <p className="text-[11px] text-amber-400 font-medium">Precision DB Wiring</p>
              </div>
            </div>

            {/* Photo 3: Rapid On-Site Arrival */}
            <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-lg">
              <div className="h-56 sm:h-64 w-full overflow-hidden bg-neutral-950">
                <img
                  src="/images/owner_onsite_arrival.jpeg"
                  alt="M. Awais Qarni arriving on-site for electrical emergency"
                  style={{ objectPosition: '50% 25%' }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-3 bg-neutral-900/90 border-t border-neutral-800">
                <p className="text-xs font-bold text-white">Emergency Dispatch</p>
                <p className="text-[11px] text-emerald-400 font-medium">On-Site within 40 Mins</p>
              </div>
            </div>

            {/* Photo 4: Professional Technical Consultation */}
            <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-lg">
              <div className="h-56 sm:h-64 w-full overflow-hidden bg-neutral-950">
                <img
                  src="/images/owner_consultant_portrait.jpeg"
                  alt="Engr. M. Awais Qarni engineering consultation"
                  style={{ objectPosition: '50% 30%' }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-3 bg-neutral-900/90 border-t border-neutral-800">
                <p className="text-xs font-bold text-white">Client Consultation</p>
                <p className="text-[11px] text-amber-400 font-medium">Load & Cost Planning</p>
              </div>
            </div>

          </div>

          {/* Bio, Credentials & Direct Contact Card */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Identity Card */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-mono font-semibold text-amber-400">
                  {isUrdu ? 'چیف ٹیکنیکل ہیڈ' : 'FOUNDER & CHIEF ENGINEER'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  M. Awais Qarni
                </h3>
                <p className="text-xs text-neutral-400">
                  {isUrdu ? 'لائبک سولر سلوشن، ساہیوال' : 'Laibak Solar Solution · Sahiwal City'}
                </p>
              </div>

              {/* Verified Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
                <div className="flex items-center gap-2.5 p-2.5 bg-neutral-950/60 rounded-lg border border-neutral-800">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Certified Solar Specialist</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-neutral-950/60 rounded-lg border border-neutral-800">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>100% Pure Copper Standards</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-neutral-950/60 rounded-lg border border-neutral-800">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>12+ Years Field Experience</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-neutral-950/60 rounded-lg border border-neutral-800">
                  <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>1,500+ Projects in Sahiwal</span>
                </div>
              </div>

              {/* Exact Location & Address Box */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{isUrdu ? 'ورکشاپ و آفیشل پتہ' : 'Official Office & Workshop Address'}</span>
                </div>
                <p className="text-sm font-bold text-white">
                  Arif Road, 135/9-L, Sahiwal
                </p>
                <p className="text-xs text-neutral-300">
                  {isUrdu
                    ? 'عارف روڈ، 135/9-ایل، ساہیوال - تمام علاقوں میں ہوم وزٹ کی سہولت دستیاب ہے۔'
                    : 'Serving Sahiwal city, Farid Town, Fateh Sher Colony, Cantt, Scheme No 2 & surrounding districts.'}
                </p>
              </div>

              {/* Contact Callouts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href="tel:03057182735"
                  className="flex items-center justify-center gap-2.5 px-4 py-3 bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-400 rounded-xl text-white font-semibold text-sm transition-all group shadow-sm"
                >
                  <Phone className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-[10px] text-neutral-400 uppercase font-mono">Direct Phone Call</div>
                    <div className="font-mono text-amber-400 text-sm">0305-7182735</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/923057182735?text=Assalam-o-Alaikum%20Engr.%20M.%20Awais%20Qarni,%20mujhe%20Laibak%20Solar%20Solution%20se%20rabta%20karna%20hai"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2.5 px-4 py-3 bg-emerald-950/50 hover:bg-emerald-900/40 border border-emerald-800/60 hover:border-emerald-500 rounded-xl text-white font-semibold text-sm transition-all group shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-[10px] text-emerald-300/80 uppercase font-mono">WhatsApp Chat</div>
                    <div className="font-mono text-emerald-400 text-sm">0305-7182735</div>
                  </div>
                </a>
              </div>

              {/* Booking CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onBookClick}
                  className="w-full py-3 px-4 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md text-center"
                >
                  {isUrdu ? 'اویس بھائی سے وزٹ شیڈول کریں' : isRoman ? 'M. Awais Qarni Se Direct Visit Book Karein' : 'Book an On-Site Visit with M. Awais Qarni'}
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
