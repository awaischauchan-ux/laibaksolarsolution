import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, MessageSquare, CheckCircle2, AlertCircle, Send, FileText } from 'lucide-react';
import { Language, BookingRecord } from '../types';
import { translations } from '../translations';
import { validatePhoneNumber, generateWhatsAppLink } from '../utils/calculator';
import { SERVICES_LIST } from '../data/electricalData';

interface BookingSectionProps {
  language: Language;
  prefilledService?: string;
  prefilledNotes?: string;
}

const ELECTRICIAN_PHONE = '03057182735';

export const BookingSection: React.FC<BookingSectionProps> = ({
  language,
  prefilledService = '',
  prefilledNotes = '',
}) => {
  const t = translations[language];

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [service, setService] = useState(prefilledService || 'Complete House & Building Wiring');
  const [urgency, setUrgency] = useState<'routine' | 'urgent'>('routine');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('Morning (09:00 AM - 12:00 PM)');
  const [notes, setNotes] = useState(prefilledNotes);
  
  // Validation and status
  const [touched, setTouched] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [recentBookings, setRecentBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('laibak_solar_bookings') || localStorage.getItem('chauhan_electric_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync prefilled service/notes if changed by external click
  useEffect(() => {
    if (prefilledService) setService(prefilledService);
  }, [prefilledService]);

  useEffect(() => {
    if (prefilledNotes) setNotes(prefilledNotes);
  }, [prefilledNotes]);

  const isPhoneValid = validatePhoneNumber(phone);
  const isFormValid = name.trim().length >= 2 && isPhoneValid && area.trim().length >= 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!isFormValid) return;

    const newBooking: BookingRecord = {
      id: `LSS-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      phone: phone.trim(),
      area: area.trim(),
      service,
      urgency,
      date,
      timeSlot,
      notes: notes.trim(),
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'confirmed',
    };

    const updated = [newBooking, ...recentBookings].slice(0, 5);
    setRecentBookings(updated);
    try {
      localStorage.setItem('laibak_solar_bookings', JSON.stringify(updated));
    } catch {
      // storage error fallback
    }

    setConfirmedBooking(newBooking);
  };

  const areaSuggestions = ['Arif Road', '135/9-L', 'Farid Town', 'Fateh Sher', 'Scheme No 2', 'Cantt Sahiwal', 'Tariq Bin Ziad', 'Chichawatni Road'];

  return (
    <section id="contact" className="py-16 sm:py-24 border-b border-neutral-900 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
            {language === 'ur' ? 'آن لائن بکنگ اور وزٹ' : language === 'ur_roman' ? 'Rabta Karein' : 'Instant Booking'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            {t.booking.title}
          </h2>
          <p className="mt-3 text-base text-neutral-400">
            {t.booking.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Booking Form (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 sm:p-8">
            
            {confirmedBooking ? (
              <div className="space-y-6 text-center py-6">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    {t.booking.successTitle}
                  </h3>
                  <p className="text-sm text-neutral-300 mt-1">
                    Booking Ticket Reference: <span className="font-mono font-bold text-amber-400">{confirmedBooking.id}</span>
                  </p>
                  <p className="text-xs text-neutral-400 mt-2">
                    {t.booking.successMsg}
                  </p>
                </div>

                {/* Ticket Summary Box */}
                <div className="bg-neutral-950 rounded-lg p-4 text-left text-xs space-y-2 border border-neutral-800 font-mono">
                  <div className="flex justify-between"><span className="text-neutral-500">Name:</span> <span className="text-white">{confirmedBooking.name}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500">Phone:</span> <span className="text-white">{confirmedBooking.phone}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500">Location:</span> <span className="text-white">{confirmedBooking.area}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500">Service:</span> <span className="text-amber-400">{confirmedBooking.service}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500">Slot:</span> <span className="text-white">{confirmedBooking.date} ({confirmedBooking.timeSlot})</span></div>
                  {confirmedBooking.notes && (
                    <div className="pt-2 border-t border-neutral-800 text-neutral-300">
                      Notes: {confirmedBooking.notes}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={generateWhatsAppLink(ELECTRICIAN_PHONE, {
                      customerName: confirmedBooking.name,
                      phone: confirmedBooking.phone,
                      address: confirmedBooking.area,
                      service: confirmedBooking.service,
                      details: confirmedBooking.notes || confirmedBooking.timeSlot,
                      bookingRef: confirmedBooking.id,
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t.booking.openWhatsApp}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setConfirmedBooking(null);
                      setName('');
                      setPhone('');
                      setNotes('');
                    }}
                    className="px-4 py-3 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white bg-neutral-800 rounded-lg transition-colors"
                  >
                    Book Another Visit
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="customer-name" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    {t.booking.nameLabel} <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={t.booking.namePlaceholder}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                  {touched && name.trim().length < 2 && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Please enter your name.
                    </p>
                  )}
                </div>

                {/* Phone & Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="customer-phone" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      {t.booking.phoneLabel} <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="customer-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder={t.booking.phonePlaceholder}
                      className={`w-full px-4 py-2.5 text-xs sm:text-sm bg-neutral-950 border rounded-lg text-white placeholder-neutral-500 focus:outline-none ${
                        touched && !isPhoneValid ? 'border-rose-500' : 'border-neutral-800 focus:border-amber-400'
                      }`}
                    />
                    {touched && !isPhoneValid && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Valid phone required (e.g. 0300 1234567).
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="customer-area" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      {t.booking.areaLabel} <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="customer-area"
                      type="text"
                      required
                      value={area}
                      onChange={e => setArea(e.target.value)}
                      placeholder={t.booking.areaPlaceholder}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Quick Area Chips */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-neutral-500 mr-1">Quick Select:</span>
                  {areaSuggestions.map(item => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setArea(item)}
                      className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                        area === item
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* Service Selection */}
                <div>
                  <label htmlFor="customer-service" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    {t.booking.serviceLabel}
                  </label>
                  <select
                    id="customer-service"
                    value={service}
                    onChange={e => setService(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  >
                    {SERVICES_LIST.map(s => (
                      <option key={s.id} value={s.title}>
                        {s.title} ({s.startingPrice})
                      </option>
                    ))}
                    <option value="Emergency Short-Circuit Repair">Emergency Short-Circuit / Spark Repair</option>
                    <option value="General Inspection / Small Repairs">General Inspection / Switchboard Replacement</option>
                  </select>
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    {t.booking.urgencyLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        urgency === 'routine'
                          ? 'bg-neutral-950 border-amber-400 text-white'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        checked={urgency === 'routine'}
                        onChange={() => setUrgency('routine')}
                        className="accent-amber-400"
                      />
                      <span className="text-xs">{t.booking.urgencyRoutine}</span>
                    </label>

                    <label
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        urgency === 'urgent'
                          ? 'bg-amber-950/20 border-amber-400 text-amber-300'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        checked={urgency === 'urgent'}
                        onChange={() => setUrgency('urgent')}
                        className="accent-amber-400"
                      />
                      <span className="text-xs font-semibold">{t.booking.urgencyUrgent}</span>
                    </label>
                  </div>
                </div>

                {/* Date and Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="booking-date" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      {t.booking.dateLabel}
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-slot" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      {t.booking.timeLabel}
                    </label>
                    <select
                      id="booking-slot"
                      value={timeSlot}
                      onChange={e => setTimeSlot(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                      <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
                      <option value="Emergency Now (Immediate)">Emergency Now (Immediate)</option>
                    </select>
                  </div>
                </div>

                {/* Notes / Special Instructions */}
                <div>
                  <label htmlFor="customer-notes" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    {t.booking.notesLabel}
                  </label>
                  <textarea
                    id="customer-notes"
                    rows={3}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Describe problem (e.g. main breaker trips whenever AC turns on, or house wiring estimate required)..."
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-xs sm:text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.booking.submitBtn}</span>
                </button>

              </form>
            )}

          </div>

          {/* Right Column: Direct Contact & Recent Bookings List */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Direct Engineer Hotline</h3>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">
                  Engr. M. Awais Qarni
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Need urgent assistance or solar consultation? Call or message M. Awais Qarni directly.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href="tel:03057182735"
                  className="flex items-center justify-between p-3.5 bg-neutral-950 rounded-lg border border-neutral-800 hover:border-amber-400 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400">Phone Call (24/7)</div>
                      <div className="text-sm font-bold text-white font-mono">0305-7182735</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-amber-400 group-hover:underline">Call Now</span>
                </a>

                <a
                  href="https://wa.me/923057182735?text=Assalam-o-Alaikum%20Engr.%20M.%20Awais%20Qarni,%20mujhe%20Laibak%20Solar%20Solution%20se%20kaam%20karwana%20hai"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-neutral-950 rounded-lg border border-neutral-800 hover:border-emerald-500 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400">WhatsApp Chat</div>
                      <div className="text-sm font-bold text-emerald-400 font-mono">0305-7182735</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 group-hover:underline">Chat</span>
                </a>
              </div>
            </div>

            {/* Service Areas */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Base Office & Service Coverage</span>
              </h4>
              <p className="text-xs font-bold text-white mb-1">
                Office & Workshop: Arif Road, 135/9-L, Sahiwal
              </p>
              <p className="text-xs text-neutral-300 leading-relaxed">
                We provide mobile electrician vans and solar installation across all major sectors of Sahiwal: Arif Road, 135/9-L, Farid Town, Fateh Sher Colony, Scheme No 2, Cantt Sahiwal, Tariq Bin Ziad Colony, Harappa, Chichawatni Road, and commercial markets.
              </p>
            </div>

            {/* Recent Bookings in local storage (Proof of working end-to-end) */}
            {recentBookings.length > 0 && (
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.booking.recentBookings}</span>
                </h4>
                <div className="space-y-2">
                  {recentBookings.map(b => (
                    <div key={b.id} className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-xs flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{b.service}</div>
                        <div className="text-[11px] text-neutral-400 font-mono">
                          {b.id} · {b.area} · {b.date}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 rounded">
                        Confirmed
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
