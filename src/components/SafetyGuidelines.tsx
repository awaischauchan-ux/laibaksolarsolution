import React from 'react';
import { ShieldCheck, AlertTriangle, Zap, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface SafetyGuidelinesProps {
  language: Language;
}

export const SafetyGuidelines: React.FC<SafetyGuidelinesProps> = ({ language }) => {
  const t = translations[language];

  const tips = [
    {
      title: 'Earth Leakage Circuit Breaker (RCCB / ELCB)',
      urduTitle: 'ارتھ لیکیج سرکٹ بریکر (RCCB) کی تنصیب',
      romanUrduTitle: 'Earth Leakage Circuit Breaker (RCCB) Lagwayein',
      desc: 'Standard breakers only trip on short circuits. An RCCB instantly trips within 30 milliseconds if a person touches an exposed wire or water motor current, saving lives.',
      urduDesc: 'عام بریکر صرف شارٹ سرکٹ پر ٹرپ کرتا ہے۔ آر سی سی بی بریکر انسان کو کرنٹ لگنے کی صورت میں ملی سیکنڈز میں بجلی بند کر دیتا ہے اور جان بچاتا ہے۔',
      romanUrduDesc: 'Aam breaker sirf short circuit par band hota hai. RCCB breaker insaan ko current lagne par 30 millisecond me bijli band kar k jaan bachata hai.',
    },
    {
      title: 'Demand 99.9% Pure Copper Cable',
      urduTitle: 'ہمیشہ 99.9% خالص کاپر کیبل کا انتخاب کریں',
      romanUrduTitle: 'Hamesha 99.9% Pure Copper Cable Ka Intikhab',
      desc: 'Never buy counterfeit or mixed-aluminum cables. Inferior wires create resistance, overheat behind walls, drive up your WAPDA units bill, and cause electrical fires.',
      urduDesc: 'سستی یا مکس سلور تاریں دیوار کے اندر اوورہیٹ ہو کر آگ لگاتی ہیں اور بل زیادہ آتا ہے۔ ہمیشہ مصدقہ کاپر کیبلز (پاکستان/فاسٹ) استعمال کریں۔',
      romanUrduDesc: 'Sasti ya mix silver taar deewar k andar garam ho kar aag lagati hai aur meter tez chalta hai. Hamesha certified copper taar lagwayein.',
    },
    {
      title: 'Dedicated Circuits for AC & Heavy Heating Loads',
      urduTitle: 'اے سی اور گیزر کے لیے براہ راست الگ سرکٹ',
      romanUrduTitle: 'AC aur Geyser k Lye Alag Direct Circuit',
      desc: 'High-draw appliances like inverter ACs, microwave ovens, and electric geysers must never share wires with ceiling fans or lights. They need dedicated 7/29 or 7/36 copper runs.',
      urduDesc: '1.5 ٹن اے سی یا گیزر کو کبھی عام کمرے کے بورڈ کے ساتھ نہ جوڑیں۔ ان کے لیے مین ڈی بی سے براہ راست موٹی تار اور الگ بریکر لازمی ہے۔',
      romanUrduDesc: 'AC aur Geyser ko kabhi aam room k switches k sath share na karein. Main DB se direct alag moti taar zaroori hai.',
    },
    {
      title: 'Proper Grounding / Earthing Pit System',
      urduTitle: 'گھر کا مکمل ارتھنگ اور بورنگ سسٹم',
      romanUrduTitle: 'Proper Grounding aur Earthing Pit System',
      desc: 'A certified copper plate or rod earth pit dissipates stray voltages from washing machines, refrigerators, and lightning surges safely into the ground.',
      urduDesc: 'واشنگ مشین، فریج اور گیلی جگہوں پر کرنٹ کے جھٹکوں اور آسمانی بجلی سے تحفظ کے لیے زمین کے اندر ارتھ پلیٹ کا درست کنکشن ہونا ضروری ہے۔',
      romanUrduDesc: 'Washing machine, fridge aur pani ki motor se jhatkay lagne se bachao k lye zameen me earthing rod/plate hona zaroori hai.',
    },
  ];

  return (
    <section id="safety" className="py-16 sm:py-24 border-b border-neutral-900 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
            {language === 'ur' ? 'حفاظتی رہنمائی' : language === 'ur_roman' ? 'Hifazati Hidayat' : 'Safety Standards'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            {t.safety.title}
          </h2>
          <p className="mt-3 text-base text-neutral-400">
            {t.safety.subtitle}
          </p>
        </div>

        {/* 2-Column Safety Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {language === 'ur' ? item.urduTitle : language === 'ur_roman' ? item.romanUrduTitle : item.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pl-11">
                {language === 'ur' ? item.urduDesc : language === 'ur_roman' ? item.romanUrduDesc : item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
