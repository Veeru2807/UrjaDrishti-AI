export type ClimateZone = 'Hot & Dry' | 'Warm & Humid' | 'Composite' | 'Temperate' | 'Cold';

export type BuildingType = 
  | 'Commercial Office'
  | 'School / College'
  | 'Residential Building'
  | 'Hotel'
  | 'Retail / Small Commercial'
  | 'Other';

export interface BuildingConfig {
  id: string;
  name: string;
  buildingId?: string; // e.g. UD-DEMO-001
  areaSqM: number; // e.g. 10000 m²
  buildingType: BuildingType;
  location?: string; // e.g. Demo Building, India
  floorsCount?: number; // e.g. 5
  climateZone: ClimateZone;
  baselineEnergyIntensity: number; // kWh/m²/year (e.g. 150)
  electricityTariff: number; // ₹/kWh (e.g. 9.5)
  typicalOccupancy?: number; // e.g. 72%
  gridEmissionFactor: number; // kg CO2/kWh (e.g. 0.82 for India CEA baseline)
  operatingHoursStart: number; // e.g. 8 (8 AM)
  operatingHoursEnd: number; // e.g. 20 (8 PM)
  hvacSetpoint: number; // °C (e.g. 24)
  isDemo?: boolean;
}

export interface ZoneData {
  id: string;
  floor: number;
  name: string;
  areaSqM: number;
  occupancyPercent: number; // 0-100%
  currentOccupants: number;
  maxCapacity: number;
  temperature: number; // °C
  humidity: number; // %
  co2Ppm: number; // ppm
  hvacKw: number;
  lightingKw: number;
  equipmentKw: number;
  totalKw: number;
  comfortScore: number; // 0-100
  status: 'Normal' | 'Under-utilized' | 'Over-consuming' | 'Poor comfort' | 'Potentially wasting energy';
  hasAnomaly: boolean;
  anomalyDescription?: string;
  anomalySavingKwhPerDay?: number;
  anomalyCostImpactRupees?: number;
  anomalyAction?: string;
}

export interface HourlyReading {
  hour: number;
  timeLabel: string;
  baselineKw: number;
  actualKw: number;
  predictedKw: number;
  hvacKw: number;
  lightingKw: number;
  equipmentKw: number;
  occupancyPct: number;
  outdoorTemp: number;
  comfortScore: number;
  isPeakPeriod: boolean;
  isForecast: boolean;
}

export interface DailyReading {
  date: string;
  dayLabel: string;
  baselineKwh: number;
  actualKwh: number;
  optimizedKwh: number;
  hvacKwh: number;
  lightingKwh: number;
  equipmentKwh: number;
  avgOccupancyPct: number;
  costRupees: number;
}

export interface SmartRecommendation {
  id: string;
  category: 'HVAC' | 'Lighting' | 'Peak Demand' | 'Equipment' | 'Schedules';
  title: string;
  problem: string;
  evidence: string;
  recommendedAction: string;
  estimatedKwhPerDay: number;
  estimatedCostPerDayRupees: number;
  estimatedPeakReductionKw: number;
  comfortImpact: string;
  priority: 'High' | 'Medium' | 'Low';
  applied: boolean;
}

export interface FlexibleLoadItem {
  id: string;
  name: string;
  category: 'EV Charging' | 'Battery Charging' | 'Water Heating / Pumping' | 'Selected Equipment';
  capacityKw: number;
  normalHours: string;
  suggestedShiftHours: string;
  status: 'Normal Schedule' | 'Shifted to Off-Peak';
  dailySavingsRupees: number;
  peakReductionKw: number;
}

export interface RetrofitItem {
  id: string;
  name: string;
  category: 'Sensors & Controls' | 'HVAC Upgrades' | 'Lighting' | 'Renewables & Storage' | 'Building Management';
  problemAddressed: string;
  costCategory: 'Low (₹50k - ₹2L)' | 'Medium (₹2L - ₹8L)' | 'High (₹8L - ₹25L)' | 'Capital Project (> ₹25L)';
  estimatedCapitalCostRupees: number;
  expectedAnnualSavingKwh: number;
  expectedAnnualSavingRupees: number;
  co2ReductionTonnes: number;
  priority: 'Immediate ROI' | 'High Impact' | 'Medium Term' | 'Strategic Long-Term';
  paybackYears: number;
  applicability: string;
}

export interface WhatIfParameters {
  hvacSetpoint: number; // e.g. 24 -> 26
  occupancyPct: number; // 0 - 100
  lightingHours: number; // e.g. 14 -> 10
  operatingHours: number; // e.g. 12 -> 9
  preCoolingEnabled: boolean;
  evSmartChargingShift: boolean;
  rooftopSolarKw: number; // 0 - 100 kW
  climateZone: ClimateZone;
}
