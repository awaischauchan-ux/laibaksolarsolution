import React, { useState, useMemo } from 'react';
import { Plus, Minus, Calculator, Zap, CheckCircle2, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { calculateElectricalLoad, estimateServiceCharges } from '../utils/calculator';

interface LoadCalculatorProps {
  language: Language;
  onApplyEstimateToBooking: (estimateText: string) => void;
}

interface ApplianceState {
  id: string;
  name: string;
  nameUrdu: string;
  nameRomanUrdu: string;
  watts: number;
  count: number;
}

const INITIAL_APPLIANCES: ApplianceState[] = [
  { id: 'lights', name: 'LED Bulbs / SMD Lights (15W)', nameUrdu: 'ایل ای ڈی بلب / ایس ایم ڈی لائٹ (15 واٹ)', nameRomanUrdu: 'LED Bulbs / SMD Lights (15W)', watts: 15, count: 12 },
  { id: 'fans', name: 'Ceiling Fans (75W)', nameUrdu: 'چھت کے پنکھے (75 واٹ)', nameRomanUrdu: 'Ceiling Fans (75W)', watts: 75, count: 4 },
  { id: 'ac', name: '1.5 Ton Inverter AC (1800W)', nameUrdu: '1.5 ٹن انورٹر اے سی (1800 واٹ)', nameRomanUrdu: '1.5 Ton Inverter AC (1800W)', watts: 1800, count: 1 },
  { id: 'fridge', name: 'Refrigerator / Freezer (350W)', nameUrdu: 'فریج / ڈیپ فریزر (350 واٹ)', nameRomanUrdu: 'Refrigerator / Fridge (350W)', watts: 350, count: 1 },
  { id: 'pump', name: 'Water Pump / Motor 1 HP (1000W)', nameUrdu: 'پانی کی موٹر 1 ایچ پی (1000 واٹ)', nameRomanUrdu: 'Water Pump / Motor (1000W)', watts: 1000, count: 1 },
  { id: 'geyser', name: 'Electric Geyser / Instant Heater (2000W)', nameUrdu: 'الیکٹرک گیزر (2000 واٹ)', nameRomanUrdu: 'Electric Geyser (2000W)', watts: 2000, count: 0 },
  { id: 'iron', name: 'Iron / Microwave Oven (1200W)', nameUrdu: 'استری / مائیکرو ویو (1200 واٹ)', nameRomanUrdu: 'Iron / Microwave (1200W)', watts: 1200, count: 1 },
];

export const LoadCalculator: React.FC<LoadCalculatorProps> = ({
  language,
  onApplyEstimateToBooking,
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'load' | 'cost'>('load');
  const [appliances, setAppliances] = useState<ApplianceState[]>(INITIAL_APPLIANCES);
  
  // Cost estimator states
  const [houseSizeMarla, setHouseSizeMarla] = useState<number>(5);
  const [pointsCount, setPointsCount] = useState<number>(65);
  const [includeDbDressing, setIncludeDbDressing] = useState<boolean>(true);
  const [isEmergencyCall, setIsEmergencyCall] = useState<boolean>(false);

  // Load calculations
  const loadResult = useMemo(() => {
    return calculateElectricalLoad(appliances);
  }, [appliances]);

  // Cost calculations
  const costResult = useMemo(() => {
    const base = estimateServiceCharges({
      serviceId: 'complete_wiring',
      pointsCount,
      isEmergency: isEmergencyCall,
    });
    
    let total = base.baseCost;
    if (includeDbDressing) {
      total += 3500;
      base.breakdown.push({ label: 'Main DB Panel Dressing (8-16 Way)', amount: 3500 });
    }
    
    return {
      ...base,
      totalLabor: total,
    };
  }, [pointsCount, includeDbDressing, isEmergencyCall]);

  const updateCount = (id: string, delta: number) => {
    setAppliances(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newCount = Math.max(0, item.count + delta);
          return { ...item, count: newCount };
        }
        return item;
      })
    );
  };

  const getApplianceLabel = (item: ApplianceState) => {
    if (language === 'ur') return item.nameUrdu;
    if (language === 'ur_roman') return item.nameRomanUrdu;
    return item.name;
  };

  const handleApplyEstimate = () => {
    if (activeTab === 'load') {
      const summaryText = `Load Estimate: ${loadResult.totalWatts} Watts, ${loadResult.totalAmps} Amps. Recommended: Breaker ${loadResult.recommendedBreaker}, Wire ${loadResult.recommendedMainWire}, Solar ${loadResult.recommendedSolarKw}kW, UPS ${loadResult.recommendedUpsKva}kVA.`;
      onApplyEstimateToBooking(summaryText);
    } else {
      const summaryText = `Wiring Cost Estimate: ${pointsCount} Points (approx ${houseSizeMarla} Marla), Total Est. Labor: Rs. ${costResult.totalLabor.toLocaleString()} PKR.`;
      onApplyEstimateToBooking(summaryText);
    }
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 border-b border-neutral-900 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
            {language === 'ur' ? 'آن لائن تخمینہ ٹول' : language === 'ur_roman' ? 'Online Estimate Tool' : 'Interactive Estimator'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            {t.calculator.title}
          </h2>
          <p className="mt-3 text-base text-neutral-400">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 p-1.5 bg-neutral-900 border border-neutral-800 rounded-xl max-w-md mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('load')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'load'
                ? 'bg-amber-400 text-neutral-950 shadow-sm'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            {t.calculator.tabLoad}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cost')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'cost'
                ? 'bg-amber-400 text-neutral-950 shadow-sm'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            {t.calculator.tabCost}
          </button>
        </div>

        {/* Content for Load Calculator Tab */}
        {activeTab === 'load' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Appliances Inputs */}
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                {t.calculator.appliances}
              </div>

              {appliances.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-800/80 hover:border-neutral-700 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{getApplianceLabel(item)}</p>
                    <p className="text-xs font-mono text-neutral-400">
                      {item.watts}W each · Subtotal: <span className="text-amber-400 tabular-nums">{item.watts * item.count}W</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateCount(item.id, -1)}
                      disabled={item.count === 0}
                      className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-neutral-800 text-neutral-200 flex items-center justify-center transition-colors"
                      aria-label={`Decrease ${item.name}`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-mono font-bold text-sm text-white tabular-nums">
                      {item.count}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateCount(item.id, 1)}
                      className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center transition-colors"
                      aria-label={`Increase ${item.name}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Col: Live Summary Card */}
            <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>{t.calculator.results}</span>
                </h3>
                <span className="text-xs font-mono text-neutral-400">220V @ 0.9 PF</span>
              </div>

              {/* Main Numbers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-800/80">
                  <div className="text-xs text-neutral-400">{t.calculator.totalWatts}</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400 mt-1 tabular-nums">
                    {loadResult.totalWatts.toLocaleString()} W
                  </div>
                </div>
                <div className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-800/80">
                  <div className="text-xs text-neutral-400">{t.calculator.totalAmps}</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                    {loadResult.totalAmps} A
                  </div>
                </div>
              </div>

              {/* Detailed Recommendations */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start justify-between gap-3 py-2 border-b border-neutral-800/60">
                  <span className="text-neutral-400">{t.calculator.recBreaker}</span>
                  <span className="font-semibold text-white text-right font-mono">{loadResult.recommendedBreaker}</span>
                </div>
                <div className="flex items-start justify-between gap-3 py-2 border-b border-neutral-800/60">
                  <span className="text-neutral-400">{t.calculator.recWire}</span>
                  <span className="font-semibold text-white text-right font-mono">{loadResult.recommendedMainWire}</span>
                </div>
                <div className="flex items-start justify-between gap-3 py-2 border-b border-neutral-800/60">
                  <span className="text-neutral-400">{t.calculator.recSolar}</span>
                  <span className="font-semibold text-amber-400 text-right font-mono">{loadResult.recommendedSolarKw} kW System</span>
                </div>
                <div className="flex items-start justify-between gap-3 py-2 border-b border-neutral-800/60">
                  <span className="text-neutral-400">{t.calculator.recUps}</span>
                  <span className="font-semibold text-white text-right font-mono">{loadResult.recommendedUpsKva} kVA Inverter</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleApplyEstimate}
                className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>{t.calculator.applyToBooking}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* Content for Wiring Cost Estimator Tab */}
        {activeTab === 'cost' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Configuration Inputs */}
            <div className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-6 sm:p-7 space-y-6">
              
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                  Select Property Size (Marla)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 5, 10, 20].map(marla => (
                    <button
                      key={marla}
                      type="button"
                      onClick={() => {
                        setHouseSizeMarla(marla);
                        setPointsCount(marla === 20 ? 250 : marla * 13);
                      }}
                      className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                        houseSizeMarla === marla
                          ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      {marla === 20 ? '1 Kanal' : `${marla} Marla`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Points slider / input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="points-range" className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Wiring Points (Switches, Lights, Fans, Sockets)
                  </label>
                  <span className="font-mono text-sm font-bold text-amber-400 tabular-nums">
                    {pointsCount} Points
                  </span>
                </div>
                <input
                  id="points-range"
                  type="range"
                  min="20"
                  max="350"
                  step="5"
                  value={pointsCount}
                  onChange={e => setPointsCount(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-neutral-500 mt-1">
                  <span>Small Unit (20 pts)</span>
                  <span>5 Marla (~65 pts)</span>
                  <span>10 Marla (~130 pts)</span>
                  <span>1 Kanal (250+ pts)</span>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2 border-t border-neutral-800">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeDbDressing}
                    onChange={e => setIncludeDbDressing(e.target.checked)}
                    className="w-4 h-4 rounded accent-amber-400 cursor-pointer"
                  />
                  <span className="text-sm text-neutral-200">
                    Include Main Distribution Box (DB) Dressing & Breaker Fitting (+Rs. 3,500)
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEmergencyCall}
                    onChange={e => setIsEmergencyCall(e.target.checked)}
                    className="w-4 h-4 rounded accent-amber-400 cursor-pointer"
                  />
                  <span className="text-sm text-neutral-200">
                    Emergency Priority Work / Night Visit (+Rs. 1,000)
                  </span>
                </label>
              </div>

            </div>

            {/* Right: Cost Breakdown Card */}
            <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-7 space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-amber-400" />
                  <span>Estimated Labor Cost Breakdown</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Excludes wire & pipe material (labor only). Standard labor rate: Rs. 450/point.
                </p>
              </div>

              {/* Breakdown items */}
              <div className="space-y-2.5 text-xs sm:text-sm">
                {costResult.breakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-neutral-300 py-1 border-b border-neutral-800/40">
                    <span>{item.label}</span>
                    <span className="font-mono font-semibold tabular-nums">Rs. {item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Total Card */}
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400">Total Estimated Labor:</span>
                  <div className="text-2xl font-extrabold font-mono text-amber-400 tabular-nums">
                    Rs. {costResult.totalLabor.toLocaleString()}
                  </div>
                </div>
                <div className="text-right text-[11px] text-neutral-400">
                  Approx Range:
                  <div className="font-mono text-neutral-300">
                    Rs. {(costResult.totalLabor * 0.9).toFixed(0)} - {(costResult.totalLabor * 1.15).toFixed(0)}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleApplyEstimate}
                className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>{t.calculator.applyToBooking}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
