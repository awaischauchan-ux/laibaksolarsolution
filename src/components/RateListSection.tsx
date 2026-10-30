import React, { useState } from 'react';
import { Search, Info, Check, ShieldCheck } from 'lucide-react';
import { Language, RateItem } from '../types';
import { translations } from '../translations';
import { RATE_LIST } from '../data/electricalData';

interface RateListSectionProps {
  language: Language;
  onBookRateItem: (taskName: string) => void;
}

export const RateListSection: React.FC<RateListSectionProps> = ({
  language,
  onBookRateItem,
}) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');

  const getTask = (item: RateItem) => {
    if (language === 'ur') return item.taskUrdu;
    if (language === 'ur_roman') return item.taskRomanUrdu;
    return item.task;
  };

  const getUnit = (item: RateItem) => {
    if (language === 'ur') return item.unitUrdu;
    return item.unit;
  };

  const filteredRates = RATE_LIST.filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      item.task.toLowerCase().includes(term) ||
      item.taskUrdu.toLowerCase().includes(term) ||
      item.taskRomanUrdu.toLowerCase().includes(term)
    );
  });

  return (
    <section id="pricing" className="py-16 sm:py-24 border-b border-neutral-900 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
              {language === 'ur' ? 'شفاف مزدوری ریٹس' : language === 'ur_roman' ? 'Wazia aur Fixed Rates' : 'Transparent Pricing'}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              {t.rateList.title}
            </h2>
            <p className="mt-3 text-base text-neutral-400">
              {t.rateList.subtitle}
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={language === 'ur' ? 'تلاش کریں (مثلاً: پنکھا، وائرنگ)' : 'Search task (e.g. fan, wiring)...'}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Rate Table Container */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-neutral-900 text-neutral-400 border-b border-neutral-800 uppercase text-[11px] tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">{t.rateList.taskHeader}</th>
                  <th scope="col" className="px-6 py-4 font-semibold">{t.rateList.unitHeader}</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-right">{t.rateList.rateHeader}</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {filteredRates.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-neutral-400">
                      No matching electrical task found for "{searchTerm}".
                    </td>
                  </tr>
                ) : (
                  filteredRates.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-neutral-900/80 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                          {getTask(item)}
                        </div>
                        {item.note && (
                          <div className="text-[11px] text-neutral-400 mt-0.5">
                            {item.note}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-neutral-300 font-medium whitespace-nowrap">
                        {getUnit(item)}
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-amber-400 tabular-nums whitespace-nowrap">
                        Rs. {item.pricePkr.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onBookRateItem(getTask(item))}
                          className="px-3 py-1.5 text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-amber-400 hover:text-neutral-950 rounded-md transition-colors"
                        >
                          Book Task
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footnote about materials & guarantee */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400 px-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Rates listed are for standard labor. Cable/pipe materials are billed separately as per client brand preference (Pakistan Cables, Fast Cables, GM Cables).</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>All repair and wiring work backed by satisfaction guarantee.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
