/**
 * Electrical load calculation and service rate estimation utilities
 */

export interface LoadItem {
  id: string;
  name: string;
  nameUrdu: string;
  nameRomanUrdu: string;
  watts: number;
  count: number;
}

export interface LoadEstimationResult {
  totalWatts: number;
  totalAmps: number;
  recommendedBreaker: string;
  recommendedMainWire: string;
  recommendedSolarKw: number;
  recommendedUpsKva: number;
}

export interface ServiceEstimateParams {
  serviceId: 'complete_wiring' | 'fault_repair' | 'solar_ups' | 'db_dressing' | 'appliance_fitting';
  pointsCount?: number;
  houseSizeMarla?: number;
  isEmergency?: boolean;
}

export interface ServiceEstimateResult {
  baseCost: number;
  totalMinCost: number;
  totalMaxCost: number;
  currency: string;
  summary: string;
  breakdown: { label: string; amount: number }[];
}

/**
 * Calculates total electrical load, amperage, recommended breaker, and solar/UPS sizing.
 */
export function calculateElectricalLoad(items: { watts: number; count: number }[]): LoadEstimationResult {
  const totalWatts = items.reduce((acc, item) => acc + Math.max(0, item.watts) * Math.max(0, item.count), 0);
  
  // 220V standard single-phase residential/commercial voltage
  // Power factor estimated at 0.9 for mixed inductive/resistive load
  const powerFactor = 0.9;
  const voltage = 220;
  const totalAmps = totalWatts > 0 ? Number((totalWatts / (voltage * powerFactor)).toFixed(1)) : 0;

  // Breaker recommendations (standard commercial sizes with 25% safety margin)
  let recommendedBreaker = '16 Amp Double Pole (DP)';
  let recommendedMainWire = '7/29 (4mm²) Copper Cable';
  
  if (totalAmps > 60) {
    recommendedBreaker = '100 Amp Three-Phase (TPN) MCCB';
    recommendedMainWire = '7/44 (16mm²) or 19/36 Copper Cable';
  } else if (totalAmps > 40) {
    recommendedBreaker = '63 Amp Double Pole / TPN Breaker';
    recommendedMainWire = '7/36 (10mm²) Copper Cable';
  } else if (totalAmps > 25) {
    recommendedBreaker = '40 Amp Double Pole Breaker';
    recommendedMainWire = '7/36 (6mm²) Copper Cable';
  } else if (totalAmps > 15) {
    recommendedBreaker = '32 Amp Double Pole Breaker';
    recommendedMainWire = '7/29 (4mm²) Copper Cable';
  }

  // Recommended Solar System size in kW (rounded to 1 decimal place, with 30% overhead)
  const solarKw = totalWatts > 0 ? Number((Math.ceil((totalWatts * 1.3) / 500) * 0.5).toFixed(1)) : 0;
  
  // Recommended UPS size in kVA
  const upsKva = totalWatts > 0 ? Number((Math.max(1, Math.ceil((totalWatts * 1.25) / 1000))).toFixed(1)) : 0;

  return {
    totalWatts,
    totalAmps,
    recommendedBreaker,
    recommendedMainWire,
    recommendedSolarKw: solarKw,
    recommendedUpsKva: upsKva,
  };
}

/**
 * Estimate service charges for electrical tasks
 */
export function estimateServiceCharges(params: ServiceEstimateParams): ServiceEstimateResult {
  const breakdown: { label: string; amount: number }[] = [];
  let baseCost = 0;
  let minCost = 0;
  let maxCost = 0;
  let summary = '';

  switch (params.serviceId) {
    case 'complete_wiring': {
      // Typically charged per point (Rs. 400 - 650 per point labor) or per marla
      const points = params.pointsCount || (params.houseSizeMarla ? params.houseSizeMarla * 25 : 50);
      const ratePerPoint = 450;
      baseCost = points * ratePerPoint;
      minCost = points * 400;
      maxCost = points * 600;
      summary = `New house/office wiring for approx ${points} points (switch, socket, light, fan).`;
      breakdown.push({ label: `Wiring Points Labor (${points} points)`, amount: baseCost });
      break;
    }
    case 'fault_repair': {
      baseCost = 1500;
      minCost = 1200;
      maxCost = 2500;
      summary = 'Inspection, short-circuit diagnostics, neutral/phase leak repair.';
      breakdown.push({ label: 'Fault Finding & Testing Labor', amount: baseCost });
      break;
    }
    case 'solar_ups': {
      baseCost = 5000;
      minCost = 4000;
      maxCost = 8000;
      summary = 'Inverter installation, battery connection, changeover switch & DB integration.';
      breakdown.push({ label: 'Solar Inverter / UPS Installation & Commissioning', amount: baseCost });
      break;
    }
    case 'db_dressing': {
      baseCost = 3500;
      minCost = 2500;
      maxCost = 5000;
      summary = 'Main DB panel dressing, circuit breakers arrangement & phase balancing.';
      breakdown.push({ label: 'Main Distribution Box (DB) Dressing', amount: baseCost });
      break;
    }
    case 'appliance_fitting': {
      baseCost = 2000;
      minCost = 1500;
      maxCost = 3500;
      summary = 'Ceiling fans, chandeliers, geyser/instant heater, or AC power points.';
      breakdown.push({ label: 'Appliance Fitting & Circuit Setup', amount: baseCost });
      break;
    }
  }

  if (params.isEmergency) {
    const emergencyFee = 1000;
    baseCost += emergencyFee;
    minCost += emergencyFee;
    maxCost += emergencyFee;
    breakdown.push({ label: '24/7 Priority Emergency Visit Surcharge', amount: emergencyFee });
  }

  return {
    baseCost,
    totalMinCost: minCost,
    totalMaxCost: maxCost,
    currency: 'Rs. (PKR)',
    summary,
    breakdown,
  };
}

/**
 * Validates phone numbers (Pakistani format 03xx or international format)
 */
export function validatePhoneNumber(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // 03001234567 (11 digits starting with 03) or +923001234567 or 923001234567
  const pkMobileRegex = /^((\+92)|(0092)|(92)|(0))?3[0-9]{9}$/;
  // Or generic valid phone >= 8 digits
  return pkMobileRegex.test(cleaned) || cleaned.length >= 10;
}

/**
 * Generates direct WhatsApp message link
 */
export function generateWhatsAppLink(
  phoneNumber: string,
  data: {
    customerName: string;
    phone: string;
    address: string;
    service: string;
    details: string;
    bookingRef?: string;
  }
): string {
  const cleanTargetPhone = phoneNumber.replace(/[\s\-\+]/g, '');
  const lines = [
    `Assalam-o-Alaikum Laibak Solar Solution!`,
    `*Booking Request / Service Order*`,
    `Ref ID: ${data.bookingRef || 'LSS-' + Math.floor(1000 + Math.random() * 9000)}`,
    `Name: ${data.customerName}`,
    `Phone: ${data.phone}`,
    `Location / Area: ${data.address}`,
    `Service: ${data.service}`,
    data.details ? `Details: ${data.details}` : '',
    `Please confirm the visit time. Shukriya!`
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${cleanTargetPhone}?text=${text}`;
}
