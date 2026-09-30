import { BuildingConfig, WhatIfParameters } from '../types';

export interface SavingsSummary {
  annualBaselineKwh: number;
  annualSimulatedKwh: number;
  annualSavedKwh: number;
  percentageSaved: number;
  baselineEnergyIntensity: number; // kWh/m²/yr
  optimizedEnergyIntensity: number; // kWh/m²/yr
  energyIntensityReduction: number;
  annualMonetarySavingsRupees: number;
  annualCo2ReductionTonnes: number;
  dailyBaselineKwh: number;
  dailyActualKwh: number;
  dailySavedKwh: number;
  dailySavingsRupees: number;
}

export function calculateBuildingSavings(
  config: BuildingConfig,
  currentOptimizationEfficiency: number = 0.165 // ~16.5% current live system efficiency
): SavingsSummary {
  // Baseline consumption is dynamically: Building Area × Baseline Energy Intensity
  const annualBaselineKwh = Math.round(config.areaSqM * config.baselineEnergyIntensity);
  
  // Climate zone factors
  let climateFactor = 1.0;
  if (config.climateZone === 'Hot & Dry') climateFactor = 1.12;
  else if (config.climateZone === 'Warm & Humid') climateFactor = 1.08;
  else if (config.climateZone === 'Cold') climateFactor = 0.85;

  const adjustedBaseline = Math.round(annualBaselineKwh * climateFactor);
  const annualSimulatedKwh = Math.round(adjustedBaseline * (1 - currentOptimizationEfficiency));
  const annualSavedKwh = adjustedBaseline - annualSimulatedKwh;
  const percentageSaved = Math.round(((annualSavedKwh) / adjustedBaseline) * 1000) / 10;
  
  const baselineEnergyIntensity = Math.round((adjustedBaseline / config.areaSqM) * 10) / 10;
  const optimizedEnergyIntensity = Math.round((annualSimulatedKwh / config.areaSqM) * 10) / 10;
  const energyIntensityReduction = Math.round((baselineEnergyIntensity - optimizedEnergyIntensity) * 10) / 10;

  const annualMonetarySavingsRupees = Math.round(annualSavedKwh * config.electricityTariff);
  const annualCo2ReductionTonnes = Math.round((annualSavedKwh * config.gridEmissionFactor) / 100) / 10;

  // Daily figures (typical work day)
  const dailyBaselineKwh = Math.round(adjustedBaseline / 330); // 330 operating equivalents
  const dailyActualKwh = Math.round(annualSimulatedKwh / 330);
  const dailySavedKwh = dailyBaselineKwh - dailyActualKwh;
  const dailySavingsRupees = Math.round(dailySavedKwh * config.electricityTariff);

  return {
    annualBaselineKwh: adjustedBaseline,
    annualSimulatedKwh,
    annualSavedKwh,
    percentageSaved,
    baselineEnergyIntensity,
    optimizedEnergyIntensity,
    energyIntensityReduction,
    annualMonetarySavingsRupees,
    annualCo2ReductionTonnes,
    dailyBaselineKwh,
    dailyActualKwh,
    dailySavedKwh,
    dailySavingsRupees,
  };
}

export function simulateWhatIf(
  config: BuildingConfig,
  params: WhatIfParameters
): {
  energyBeforeKwh: number;
  energyAfterKwh: number;
  energyDiffKwh: number;
  energyDiffPct: number;
  peakBeforeKw: number;
  peakAfterKw: number;
  peakDiffKw: number;
  comfortBeforeScore: number;
  comfortAfterScore: number;
  costBeforeRupees: number;
  costAfterRupees: number;
  costSavingsRupees: number;
} {
  // Baseline daily reference
  const baseKwh = (config.areaSqM * config.baselineEnergyIntensity) / 330;
  const basePeakKw = 94.2;

  // HVAC setpoint delta (Every 1°C increase in AC saves ~6% cooling energy in India - BEE study)
  const setpointDelta = params.hvacSetpoint - 23; // base was 23
  const hvacSavingsFactor = setpointDelta * 0.058; // ~5.8% per °C

  // Occupancy delta (base assumed 75%)
  const occRatio = params.occupancyPct / 75;
  const occEnergyFactor = (occRatio - 1) * 0.18; // Occupancy impacts ~18% variable load

  // Lighting schedule (base 14 hours)
  const lightDeltaHours = (14 - params.lightingHours) / 14;
  const lightSavingsFactor = Math.max(0, lightDeltaHours * 0.16);

  // Operating hours (base 12 hours)
  const opHoursDelta = (12 - params.operatingHours) / 12;
  const opSavingsFactor = Math.max(0, opHoursDelta * 0.10);

  // Pre-cooling + Load shifting peak impact
  let peakReduction = 0;
  if (params.preCoolingEnabled) peakReduction += 5.5;
  if (params.evSmartChargingShift) peakReduction += 12.0;
  if (params.rooftopSolarKw > 0) peakReduction += params.rooftopSolarKw * 0.15; // evening peak has less direct solar

  // Solar daily generation in kWh (approx 4.2 kWh/kWp in India)
  const solarDailyKwh = params.rooftopSolarKw * 4.2;

  // Combine factors
  const totalSavingsPct = Math.max(0.02, Math.min(0.55, 0.12 + hvacSavingsFactor + lightSavingsFactor + opSavingsFactor - occEnergyFactor));
  
  const energyBeforeKwh = Math.round(baseKwh);
  const rawAfterKwh = baseKwh * (1 - totalSavingsPct) - solarDailyKwh;
  const energyAfterKwh = Math.max(500, Math.round(rawAfterKwh));
  const energyDiffKwh = energyBeforeKwh - energyAfterKwh;
  const energyDiffPct = Math.round((energyDiffKwh / energyBeforeKwh) * 1000) / 10;

  const peakBeforeKw = basePeakKw;
  const peakAfterKw = Math.max(45, Math.round((basePeakKw - peakReduction - (params.hvacSetpoint > 24 ? 4 : 0)) * 10) / 10);
  const peakDiffKw = Math.round((peakBeforeKw - peakAfterKw) * 10) / 10;

  // Comfort estimation
  let comfortScore = 94;
  if (params.hvacSetpoint > 26.5) comfortScore -= (params.hvacSetpoint - 26.5) * 15;
  else if (params.hvacSetpoint < 22) comfortScore -= (22 - params.hvacSetpoint) * 10;
  
  if (params.lightingHours < 8) comfortScore -= 8;
  comfortScore = Math.max(40, Math.min(100, Math.round(comfortScore)));

  const costBeforeRupees = Math.round(energyBeforeKwh * config.electricityTariff);
  const costAfterRupees = Math.round(energyAfterKwh * config.electricityTariff);
  const costSavingsRupees = costBeforeRupees - costAfterRupees;

  return {
    energyBeforeKwh,
    energyAfterKwh,
    energyDiffKwh,
    energyDiffPct,
    peakBeforeKw,
    peakAfterKw,
    peakDiffKw,
    comfortBeforeScore: 92,
    comfortAfterScore: comfortScore,
    costBeforeRupees,
    costAfterRupees,
    costSavingsRupees,
  };
}
