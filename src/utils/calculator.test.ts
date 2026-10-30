import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateElectricalLoad,
  estimateServiceCharges,
  validatePhoneNumber,
  generateWhatsAppLink
} from './calculator';

test('calculateElectricalLoad returns 0 for empty list', () => {
  const result = calculateElectricalLoad([]);
  assert.equal(result.totalWatts, 0);
  assert.equal(result.totalAmps, 0);
  assert.equal(result.recommendedSolarKw, 0);
});

test('calculateElectricalLoad calculates load correctly for standard home', () => {
  const items = [
    { watts: 15, count: 10 },   // 150W (LED bulbs)
    { watts: 75, count: 4 },    // 300W (Ceiling fans)
    { watts: 1800, count: 1 },  // 1800W (1.5 ton Inverter AC)
    { watts: 350, count: 1 },   // 350W (Refrigerator)
  ];
  // Total: 150 + 300 + 1800 + 350 = 2600W
  const result = calculateElectricalLoad(items);
  assert.equal(result.totalWatts, 2600);
  // 2600 / (220 * 0.9) = 2600 / 198 = 13.1 Amps
  assert.equal(result.totalAmps, 13.1);
  assert.equal(result.recommendedBreaker, '16 Amp Double Pole (DP)');
  assert.ok(result.recommendedSolarKw > 0);
  assert.ok(result.recommendedUpsKva > 0);
});

test('calculateElectricalLoad scales breaker for heavy load', () => {
  const heavyItems = [
    { watts: 2000, count: 4 }, // 8000W
  ];
  const result = calculateElectricalLoad(heavyItems);
  assert.equal(result.totalWatts, 8000);
  // 8000 / 198 = 40.4 Amps -> 63A
  assert.equal(result.recommendedBreaker, '63 Amp Double Pole / TPN Breaker');
});

test('estimateServiceCharges handles complete wiring with point count and emergency surcharge', () => {
  const standardEstimate = estimateServiceCharges({
    serviceId: 'complete_wiring',
    pointsCount: 100,
    isEmergency: false,
  });
  assert.equal(standardEstimate.baseCost, 100 * 450); // 45000
  assert.equal(standardEstimate.breakdown.length, 1);

  const emergencyEstimate = estimateServiceCharges({
    serviceId: 'complete_wiring',
    pointsCount: 100,
    isEmergency: true,
  });
  assert.equal(emergencyEstimate.baseCost, 45000 + 1000);
  assert.equal(emergencyEstimate.breakdown.length, 2);
});

test('validatePhoneNumber accurately validates Pakistani and international formats', () => {
  assert.equal(validatePhoneNumber('03001234567'), true);
  assert.equal(validatePhoneNumber('0345-9876543'), true);
  assert.equal(validatePhoneNumber('+923123456789'), true);
  assert.equal(validatePhoneNumber('0333 1122334'), true);
  assert.equal(validatePhoneNumber('123'), false);
  assert.equal(validatePhoneNumber(''), false);
});

test('generateWhatsAppLink creates valid encoded wa.me url with details', () => {
  const url = generateWhatsAppLink('03057182735', {
    customerName: 'M Awais Qarni',
    phone: '03057182735',
    address: 'Arif Road 135/9-L, Sahiwal',
    service: 'Solar Inverter Setup',
    details: '10kW hybrid inverter fitting',
    bookingRef: 'LSS-1001',
  });
  assert.ok(url.startsWith('https://wa.me/03057182735?text='));
  assert.ok(url.includes(encodeURIComponent('M Awais Qarni')));
  assert.ok(url.includes(encodeURIComponent('LSS-1001')));
});
