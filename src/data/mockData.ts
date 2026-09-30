import { BuildingConfig, ZoneData, HourlyReading, DailyReading, SmartRecommendation, FlexibleLoadItem, RetrofitItem, WhatIfParameters } from '../types';

export const DEFAULT_BUILDING_CONFIG: BuildingConfig = {
  id: 'bldg-01',
  buildingId: 'UD-DEMO-001',
  name: 'UrjaDrishti Demo Office',
  areaSqM: 10000,
  buildingType: 'Commercial Office',
  location: 'Demo Tech Park, India',
  floorsCount: 5,
  climateZone: 'Composite',
  baselineEnergyIntensity: 150, // kWh/m²/year
  electricityTariff: 9.5, // ₹9.5 per kWh commercial Indian tariff
  typicalOccupancy: 72, // 72%
  gridEmissionFactor: 0.82, // 0.82 kg CO2 / kWh
  operatingHoursStart: 8,
  operatingHoursEnd: 20,
  hvacSetpoint: 24,
  isDemo: true,
};

// Comfort score logic
export function calculateComfortScore(temp: number, humidity: number, co2: number, hvacSetpoint = 24): { score: number; status: 'Comfortable' | 'Attention Required' | 'Poor Comfort'; details: string } {
  let score = 100;
  
  // Temp ideal range [23-26°C for India / BEE recommendation is 24-25°C]
  const idealTemp = hvacSetpoint;
  const tempDiff = Math.abs(temp - idealTemp);
  if (tempDiff > 1) {
    score -= Math.min(35, Math.round((tempDiff - 1) * 12));
  }

  // Humidity ideal range [40% - 60%]
  if (humidity < 40) {
    score -= Math.min(25, Math.round((40 - humidity) * 0.8));
  } else if (humidity > 65) {
    score -= Math.min(30, Math.round((humidity - 65) * 1.2));
  }

  // CO2 ideal <= 700 ppm, acceptable <= 900 ppm, poor > 1000 ppm
  if (co2 > 800) {
    score -= Math.min(35, Math.round(((co2 - 800) / 400) * 35));
  }

  score = Math.max(10, Math.min(100, Math.round(score)));

  let status: 'Comfortable' | 'Attention Required' | 'Poor Comfort' = 'Comfortable';
  let details = 'Indoor environment matches optimum ASHRAE 55 & NBC India comfort criteria.';
  if (score < 60) {
    status = 'Poor Comfort';
    details = 'Critical environment alert: Check fresh air damper & HVAC cooling capacity.';
  } else if (score < 80) {
    status = 'Attention Required';
    details = 'Sub-optimal temperature/humidity or elevated CO2 detected.';
  }

  return { score, status, details };
}

// Initial realistic zones
export const INITIAL_ZONES: ZoneData[] = [
  {
    id: 'z-1a',
    floor: 1,
    name: 'Zone 1A - Reception & Visitors Lobby',
    areaSqM: 1600,
    occupancyPercent: 45,
    currentOccupants: 45,
    maxCapacity: 100,
    temperature: 24.2,
    humidity: 52,
    co2Ppm: 580,
    hvacKw: 18.4,
    lightingKw: 4.8,
    equipmentKw: 3.2,
    totalKw: 26.4,
    comfortScore: 94,
    status: 'Normal',
    hasAnomaly: false,
  },
  {
    id: 'z-1b',
    floor: 1,
    name: 'Zone 1B - Cafeteria & Town Hall',
    areaSqM: 1700,
    occupancyPercent: 78,
    currentOccupants: 156,
    maxCapacity: 200,
    temperature: 24.8,
    humidity: 58,
    co2Ppm: 790,
    hvacKw: 28.5,
    lightingKw: 6.2,
    equipmentKw: 12.0,
    totalKw: 46.7,
    comfortScore: 88,
    status: 'Normal',
    hasAnomaly: false,
  },
  {
    id: 'z-2a',
    floor: 2,
    name: 'Zone 2A - Executive Workspace & Conf Suites',
    areaSqM: 1650,
    occupancyPercent: 8, // Anomaly! Only 8% occupied but HVAC is blasting
    currentOccupants: 8,
    maxCapacity: 100,
    temperature: 22.8,
    humidity: 46,
    co2Ppm: 460,
    hvacKw: 31.5, // Unusually high for 8% occupancy
    lightingKw: 6.8,
    equipmentKw: 4.1,
    totalKw: 42.4,
    comfortScore: 85,
    status: 'Potentially wasting energy',
    hasAnomaly: true,
    anomalyDescription: 'Zone 2A has only 8% occupancy while HVAC is cooling at 31.5 kW (setpoint 22.8°C). Over-cooling an empty suite.',
    anomalySavingKwhPerDay: 38.5,
    anomalyCostImpactRupees: 365,
    anomalyAction: 'Modulate VAV dampers and raise setpoint to 25.5°C in unoccupied blocks.',
  },
  {
    id: 'z-2b',
    floor: 2,
    name: 'Zone 2B - Engineering Workstations',
    areaSqM: 1750,
    occupancyPercent: 84,
    currentOccupants: 168,
    maxCapacity: 200,
    temperature: 24.1,
    humidity: 51,
    co2Ppm: 760,
    hvacKw: 29.2,
    lightingKw: 7.4,
    equipmentKw: 14.8,
    totalKw: 51.4,
    comfortScore: 92,
    status: 'Normal',
    hasAnomaly: false,
  },
  {
    id: 'z-3a',
    floor: 3,
    name: 'Zone 3A - Training Rooms & Collaborative Lab',
    areaSqM: 1600,
    occupancyPercent: 12,
    currentOccupants: 12,
    maxCapacity: 100,
    temperature: 24.0,
    humidity: 50,
    co2Ppm: 490,
    hvacKw: 14.2,
    lightingKw: 8.9, // Lighting left on full blast
    equipmentKw: 5.5,
    totalKw: 28.6,
    comfortScore: 91,
    status: 'Potentially wasting energy',
    hasAnomaly: true,
    anomalyDescription: 'Training labs are unoccupied (12%) but 100% lighting fixtures (8.9 kW) remain continuously active.',
    anomalySavingKwhPerDay: 14.2,
    anomalyCostImpactRupees: 135,
    anomalyAction: 'Activate occupancy-linked daylight harvesting / auto-dimming.',
  },
  {
    id: 'z-3b',
    floor: 3,
    name: 'Zone 3B - Operations & Server Control Hub',
    areaSqM: 1700,
    occupancyPercent: 62,
    currentOccupants: 74,
    maxCapacity: 120,
    temperature: 23.5,
    humidity: 48,
    co2Ppm: 630,
    hvacKw: 24.8,
    lightingKw: 5.1,
    equipmentKw: 16.4,
    totalKw: 46.3,
    comfortScore: 95,
    status: 'Normal',
    hasAnomaly: false,
  },
];

// Generate 24 hours reading for today (with actuals up to hour 19 and forecast for 20-23)
export function generateHourlyData(climateZone: string = 'Composite', currentHour: number = 19): HourlyReading[] {
  const data: HourlyReading[] = [];
  const tempMultiplier = climateZone === 'Hot & Dry' ? 1.25 : climateZone === 'Cold' ? 0.6 : 1.0;

  for (let h = 0; h < 24; h++) {
    const isPeak = h >= 18 && h <= 21; // Indian DISCOM peak 6 PM to 9 PM
    const isWorkHours = h >= 8 && h <= 19;
    
    // Realistic outdoor temperature curve (min at 5 AM, max at 2 PM)
    const baseTemp = 26 + 8 * Math.sin(((h - 8) / 24) * 2 * Math.PI) * tempMultiplier;
    
    // Occupancy curve
    let occ = 0;
    if (h >= 7 && h <= 8) occ = 20;
    else if (h >= 9 && h <= 12) occ = 85;
    else if (h === 13) occ = 65; // lunch
    else if (h >= 14 && h <= 17) occ = 90;
    else if (h === 18) occ = 55;
    else if (h === 19) occ = 35;
    else if (h >= 20 && h <= 21) occ = 15;
    else occ = 4; // night security/cleaning

    // HVAC follows outdoor temp + occupancy
    const hvac = isWorkHours ? (18 + occ * 0.35 + (baseTemp - 24) * 2.2) : 10;
    const lighting = isWorkHours ? (8 + occ * 0.08) : 2.5;
    const equipment = (h >= 9 && h <= 18) ? (14 + occ * 0.1) : 6.0;

    const actual = hvac + lighting + equipment;
    // Baseline is unoptimized legacy profile (+18% higher)
    const baseline = actual * 1.18 + (isPeak ? 12 : 3);
    // Predicted forecast
    const predicted = actual * (0.97 + Math.sin(h) * 0.04);

    const isForecast = h > currentHour;

    const hourString = h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`;

    data.push({
      hour: h,
      timeLabel: hourString,
      baselineKw: Math.round(baseline * 10) / 10,
      actualKw: isForecast ? Math.round(predicted * 10) / 10 : Math.round(actual * 10) / 10,
      predictedKw: Math.round(predicted * 10) / 10,
      hvacKw: Math.round(hvac * 10) / 10,
      lightingKw: Math.round(lighting * 10) / 10,
      equipmentKw: Math.round(equipment * 10) / 10,
      occupancyPct: occ,
      outdoorTemp: Math.round(baseTemp * 10) / 10,
      comfortScore: occ > 0 ? (isPeak ? 86 : 92) : 98,
      isPeakPeriod: isPeak,
      isForecast,
    });
  }

  return data;
}

// 7-day and 30-day realistic trend data
export function generateHistoryData(): { sevenDays: DailyReading[]; thirtyDays: DailyReading[] } {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const sevenDays: DailyReading[] = [];
  const thirtyDays: DailyReading[] = [];

  // 7 Days
  for (let i = 6; i >= 0; i--) {
    const isWeekend = i === 1 || i === 0; // Sat, Sun
    const baseMultiplier = isWeekend ? 0.35 : 1.0;
    
    const baselineKwh = Math.round((4200 + Math.sin(i) * 150) * baseMultiplier);
    const actualKwh = Math.round((3550 + Math.sin(i * 1.5) * 120) * baseMultiplier);
    const optimizedKwh = Math.round(actualKwh * 0.88);
    const hvacKwh = Math.round(actualKwh * 0.58);
    const lightingKwh = Math.round(actualKwh * 0.18);
    const equipmentKwh = actualKwh - hvacKwh - lightingKwh;

    sevenDays.push({
      date: `2026-09-${24 + (6 - i)}`,
      dayLabel: daysOfWeek[(6 - i) % 7],
      baselineKwh,
      actualKwh,
      optimizedKwh,
      hvacKwh,
      lightingKwh,
      equipmentKwh,
      avgOccupancyPct: isWeekend ? 12 : 78,
      costRupees: Math.round(actualKwh * 9.5),
    });
  }

  // 30 Days
  for (let i = 29; i >= 0; i--) {
    const dayOfWeekIndex = (29 - i) % 7;
    const isWeekend = dayOfWeekIndex === 5 || dayOfWeekIndex === 6;
    const baseMultiplier = isWeekend ? 0.38 : 0.95 + (i % 5) * 0.03;
    
    const baselineKwh = Math.round(4250 * baseMultiplier);
    const actualKwh = Math.round(3580 * baseMultiplier);
    const optimizedKwh = Math.round(actualKwh * 0.87);
    const hvacKwh = Math.round(actualKwh * 0.56);
    const lightingKwh = Math.round(actualKwh * 0.19);
    const equipmentKwh = actualKwh - hvacKwh - lightingKwh;

    thirtyDays.push({
      date: `Day ${30 - i}`,
      dayLabel: `D${30 - i}`,
      baselineKwh,
      actualKwh,
      optimizedKwh,
      hvacKwh,
      lightingKwh,
      equipmentKwh,
      avgOccupancyPct: isWeekend ? 15 : 80,
      costRupees: Math.round(actualKwh * 9.5),
    });
  }

  return { sevenDays, thirtyDays };
}

export const SMART_RECOMMENDATIONS: SmartRecommendation[] = [
  {
    id: 'rec-1',
    category: 'HVAC',
    title: 'HVAC Zone 2A Setpoint & VAV Optimization',
    problem: 'Zone 2A (Executive Suite) has low occupancy (8%) while cooling at full capacity (31.5 kW, setpoint 22.8°C).',
    evidence: 'Measured 42.4 kW total draw vs expected 12.0 kW for occupancy. Over-cooling empty conference pods.',
    recommendedAction: 'Increase setpoint to 25.5°C and reduce VAV airflow by 40% in unoccupied pods via BMS scheduling.',
    estimatedKwhPerDay: 38.5,
    estimatedCostPerDayRupees: 365,
    estimatedPeakReductionKw: 8.2,
    comfortImpact: 'Occupant comfort index maintained at 90+ (BEE compliant 24-26°C range).',
    priority: 'High',
    applied: false,
  },
  {
    id: 'rec-2',
    category: 'Lighting',
    title: 'Collaborative Lab 3A Daylight Harvesting & Auto-Dimming',
    problem: 'Zone 3A training room has 12% occupancy with full 8.9 kW artificial lighting during peak daylight.',
    evidence: 'Natural lux levels at perimeter exceed 550 lux, yet lighting circuit is 100% active.',
    recommendedAction: 'Enable automated photocell daylight dimming and vacancy auto-off on Floor 3A.',
    estimatedKwhPerDay: 14.2,
    estimatedCostPerDayRupees: 135,
    estimatedPeakReductionKw: 3.5,
    comfortImpact: 'Zero negative impact; prevents screen glare in collaborative lab.',
    priority: 'Medium',
    applied: false,
  },
  {
    id: 'rec-3',
    category: 'Peak Demand',
    title: 'Evening Peak Demand Load Shifting (6 PM – 9 PM)',
    problem: 'Building demand is predicted to surge to 94.2 kW at 6:30 PM due to overlapping EV chargers & chiller cycles.',
    evidence: 'DISCOM TOD peak tariff (₹13.5/kWh) applies between 18:00 and 22:00.',
    recommendedAction: 'Shift EV fleet charging stations (14 kW) and basement water booster pumps to off-peak night cycle (11 PM - 5 AM). Pre-cool building by 1.5°C from 4:30 PM to 5:45 PM.',
    estimatedKwhPerDay: 22.0,
    estimatedCostPerDayRupees: 540,
    estimatedPeakReductionKw: 12.4,
    comfortImpact: 'Thermal comfort preserved via building thermal mass pre-cooling.',
    priority: 'High',
    applied: false,
  },
  {
    id: 'rec-4',
    category: 'Equipment',
    title: 'Cafeteria Kitchen Auxiliary Exhaust Scheduling',
    problem: 'Townhall/Cafeteria heavy exhaust fans remain energized post-lunch service until 8 PM.',
    evidence: 'Floor 1B equipment load stays flat at 12 kW between 3 PM and 6 PM despite nil food prep activity.',
    recommendedAction: 'Configure automated timer interlock to ramp down exhaust blowers between 3:30 PM and 6:30 PM.',
    estimatedKwhPerDay: 18.0,
    estimatedCostPerDayRupees: 171,
    estimatedPeakReductionKw: 4.0,
    comfortImpact: 'No impact on dining comfort; air quality remains within safe limits.',
    priority: 'Low',
    applied: false,
  },
];

export const FLEXIBLE_LOADS: FlexibleLoadItem[] = [
  {
    id: 'fl-1',
    name: 'Dual 22 kW EV Fleet Charging Bank',
    category: 'EV Charging',
    capacityKw: 22.0,
    normalHours: '5:30 PM – 9:00 PM (Peak)',
    suggestedShiftHours: '11:00 PM – 4:30 AM (Off-Peak)',
    status: 'Normal Schedule',
    dailySavingsRupees: 280,
    peakReductionKw: 14.0,
  },
  {
    id: 'fl-2',
    name: 'Basement Water Transfer & Booster Pumps',
    category: 'Water Heating / Pumping',
    capacityKw: 11.0,
    normalHours: '6:00 PM – 8:00 PM (Peak)',
    suggestedShiftHours: '4:00 AM – 6:30 AM (Off-Peak)',
    status: 'Normal Schedule',
    dailySavingsRupees: 145,
    peakReductionKw: 7.5,
  },
  {
    id: 'fl-3',
    name: 'Chiller Thermal Energy Storage (Pre-Cooling)',
    category: 'Selected Equipment',
    capacityKw: 18.0,
    normalHours: '6:30 PM – 9:30 PM',
    suggestedShiftHours: '3:30 PM – 5:30 PM (Solar Window)',
    status: 'Normal Schedule',
    dailySavingsRupees: 210,
    peakReductionKw: 9.0,
  },
];

export const RETROFIT_RECOMMENDATIONS: RetrofitItem[] = [
  {
    id: 'ret-1',
    name: 'Smart IoT Occupancy & Environmental Sensor Mesh',
    category: 'Sensors & Controls',
    problemAddressed: 'Unoccupied zones remain fully conditioned and illuminated due to lack of localized presence detection.',
    costCategory: 'Low (₹50k - ₹2L)',
    estimatedCapitalCostRupees: 180000,
    expectedAnnualSavingKwh: 18500,
    expectedAnnualSavingRupees: 175750,
    co2ReductionTonnes: 15.1,
    priority: 'Immediate ROI',
    paybackYears: 1.02,
    applicability: 'Immediate deployment on Floors 1, 2, 3 suites',
  },
  {
    id: 'ret-2',
    name: 'Variable Frequency Drives (VFDs) on AHU Fans & Secondary Pumps',
    category: 'HVAC Upgrades',
    problemAddressed: 'Fixed-speed motors running at 100% capacity regardless of partial building cooling load.',
    costCategory: 'Medium (₹2L - ₹8L)',
    estimatedCapitalCostRupees: 450000,
    expectedAnnualSavingKwh: 38000,
    expectedAnnualSavingRupees: 361000,
    co2ReductionTonnes: 31.1,
    priority: 'High Impact',
    paybackYears: 1.25,
    applicability: 'Central chilled water plant and 6 Air Handling Units',
  },
  {
    id: 'ret-3',
    name: 'DALI Smart Lighting Controls with Daylight Harvesting',
    category: 'Lighting',
    problemAddressed: 'Perimeter windows provide abundant daylight but fixtures run continuously at full lumens.',
    costCategory: 'Low (₹50k - ₹2L)',
    estimatedCapitalCostRupees: 150000,
    expectedAnnualSavingKwh: 12000,
    expectedAnnualSavingRupees: 114000,
    co2ReductionTonnes: 9.8,
    priority: 'Immediate ROI',
    paybackYears: 1.31,
    applicability: 'Office perimeter workstations & meeting rooms',
  },
  {
    id: 'ret-4',
    name: 'Rooftop Solar PV (50 kWp Grid-Tied System)',
    category: 'Renewables & Storage',
    problemAddressed: 'High daytime energy consumption during peak commercial tariff hours.',
    costCategory: 'High (₹8L - ₹25L)',
    estimatedCapitalCostRupees: 2200000,
    expectedAnnualSavingKwh: 72000,
    expectedAnnualSavingRupees: 684000,
    co2ReductionTonnes: 59.0,
    priority: 'High Impact',
    paybackYears: 3.21,
    applicability: 'Unshaded rooftop area (approx. 500 m²)',
  },
  {
    id: 'ret-5',
    name: 'Battery Energy Storage System (BESS - 30 kWh / 15 kW)',
    category: 'Renewables & Storage',
    problemAddressed: 'Evening peak demand charges and diesel generator dependency during brief grid trips.',
    costCategory: 'High (₹8L - ₹25L)',
    estimatedCapitalCostRupees: 1400000,
    expectedAnnualSavingKwh: 16000,
    expectedAnnualSavingRupees: 216000, // Includes peak demand penalty savings
    co2ReductionTonnes: 13.1,
    priority: 'Medium Term',
    paybackYears: 6.48,
    applicability: 'Main electrical distribution panel',
  },
  {
    id: 'ret-6',
    name: 'Centralized Open BACnet/Modbus BMS Gateway Integration',
    category: 'Building Management',
    problemAddressed: 'Siloed equipment operation prevents unified automated optimization and predictive energy dispatch.',
    costCategory: 'Medium (₹2L - ₹8L)',
    estimatedCapitalCostRupees: 350000,
    expectedAnnualSavingKwh: 26000,
    expectedAnnualSavingRupees: 247000,
    co2ReductionTonnes: 21.3,
    priority: 'Strategic Long-Term',
    paybackYears: 1.42,
    applicability: 'Entire 10,000 m² commercial facility',
  },
];
