import React, { useState } from 'react';
import { BuildingConfig, WhatIfParameters } from '../types';
import { simulateWhatIf } from '../utils/calculations';
import {
  Sliders,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Smile,
  Zap,
  IndianRupee,
  ShieldCheck,
  Flame,
} from 'lucide-react';

interface WhatIfTabProps {
  config: BuildingConfig;
}

export const WhatIfTab: React.FC<WhatIfTabProps> = ({ config }) => {
  const [params, setParams] = useState<WhatIfParameters>({
    hvacSetpoint: 25.0,
    occupancyPct: 65,
    lightingHours: 11,
    operatingHours: 10,
    preCoolingEnabled: true,
    evSmartChargingShift: true,
    rooftopSolarKw: 30,
    climateZone: config.climateZone,
  });

  const simResult = simulateWhatIf(config, params);

  const resetToBaseline = () => {
    setParams({
      hvacSetpoint: 23.0,
      occupancyPct: 75,
      lightingHours: 14,
      operatingHours: 12,
      preCoolingEnabled: false,
      evSmartChargingShift: false,
      rooftopSolarKw: 0,
      climateZone: config.climateZone,
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200/80 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-700 shrink-0">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-extrabold text-slate-900">Digital Building "What-If" Scenario Simulator</h2>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                Interactive Physics Model
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed font-medium">
              Experiment with HVAC temperature setpoints, occupancy variations, lighting schedules, and rooftop solar capacity. Instantly simulate real-time energy, cost, peak demand, and occupant comfort impacts.
            </p>
          </div>
        </div>

        <button
          onClick={resetToBaseline}
          className="px-3.5 py-2 text-xs font-bold rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 flex items-center space-x-1.5 shrink-0 transition-all cursor-pointer shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset to Baseline</span>
        </button>
      </div>

      {/* Simulator Interface: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Interactive Control Knobs (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 space-y-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Simulation Controls</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Tuned for {config.name}</span>
          </div>

          {/* Slider 1: HVAC Setpoint */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-bold text-slate-700">HVAC Cooling Setpoint (°C)</span>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {params.hvacSetpoint}°C
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="28"
              step="0.5"
              value={params.hvacSetpoint}
              onChange={(e) => setParams({ ...params, hvacSetpoint: parseFloat(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>20°C (High Energy)</span>
              <span>24°C (BEE Rec)</span>
              <span>28°C (Warm)</span>
            </div>
          </div>

          {/* Slider 2: Occupancy Percentage */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-bold text-slate-700">Building Occupancy Level</span>
              <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {params.occupancyPct}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={params.occupancyPct}
              onChange={(e) => setParams({ ...params, occupancyPct: parseInt(e.target.value) })}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10% (Low Hybrid)</span>
              <span>60% (Typical)</span>
              <span>100% (Full Capacity)</span>
            </div>
          </div>

          {/* Slider 3: Lighting Operating Hours */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-bold text-slate-700">Active Lighting Schedule</span>
              <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {params.lightingHours} hrs/day
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="18"
              step="1"
              value={params.lightingHours}
              onChange={(e) => setParams({ ...params, lightingHours: parseInt(e.target.value) })}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>6 hrs (Auto-Dim)</span>
              <span>12 hrs (Standard)</span>
              <span>18 hrs (Overtime)</span>
            </div>
          </div>

          {/* Slider 4: Rooftop Solar Addition */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-bold text-slate-700">Rooftop Solar PV Installed</span>
              <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {params.rooftopSolarKw} kWp
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={params.rooftopSolarKw}
              onChange={(e) => setParams({ ...params, rooftopSolarKw: parseInt(e.target.value) })}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0 kWp (None)</span>
              <span>50 kWp</span>
              <span>100 kWp (Full Roof)</span>
            </div>
          </div>

          {/* Smart Toggles */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <label className="flex items-center justify-between cursor-pointer p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200">
              <span className="text-xs text-slate-700 font-semibold">Pre-Cooling Thermal Storage (3-5 PM)</span>
              <input
                type="checkbox"
                checked={params.preCoolingEnabled}
                onChange={(e) => setParams({ ...params, preCoolingEnabled: e.target.checked })}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200">
              <span className="text-xs text-slate-700 font-semibold">EV &amp; Water Pump Smart Night Shift</span>
              <input
                type="checkbox"
                checked={params.evSmartChargingShift}
                onChange={(e) => setParams({ ...params, evSmartChargingShift: e.target.checked })}
                className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Right Col: Instant Before vs After Comparison Matrix (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-5 shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Simulated Scenario Impact Comparison</h3>
                <p className="text-xs text-slate-500 mt-0.5">Model calculations based on ASHRAE 55 and Indian Commercial Building ECBC physics</p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                {simResult.energyDiffPct}% Energy Saved
              </span>
            </div>

            {/* 4 Before vs After Impact Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {/* Daily Energy */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
                  <span>Daily Energy Consumption</span>
                  <Flame className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Baseline</span>
                    <span className="text-base font-bold text-slate-600">{simResult.energyBeforeKwh} kWh</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <div>
                    <span className="text-[10px] text-emerald-700 block font-bold">Simulated</span>
                    <span className="text-xl font-extrabold text-emerald-700">{simResult.energyAfterKwh} kWh</span>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-emerald-700 font-bold">
                  Saved: {simResult.energyDiffKwh} kWh/day (-{simResult.energyDiffPct}%)
                </div>
              </div>

              {/* Peak Demand */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
                  <span>Evening Peak Demand (kW)</span>
                  <Zap className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Baseline</span>
                    <span className="text-base font-bold text-slate-600">{simResult.peakBeforeKw} kW</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <div>
                    <span className="text-[10px] text-purple-700 block font-bold">Simulated</span>
                    <span className="text-xl font-extrabold text-purple-700">{simResult.peakAfterKw} kW</span>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-purple-700 font-bold">
                  Peak Shed: -{simResult.peakDiffKw} kW shaved
                </div>
              </div>

              {/* Occupant Comfort Score */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
                  <span>Occupant Comfort Score</span>
                  <Smile className="w-4 h-4 text-teal-600" />
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Baseline</span>
                    <span className="text-base font-bold text-slate-600">{simResult.comfortBeforeScore} / 100</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <div>
                    <span className="text-[10px] text-teal-700 block font-bold">Simulated</span>
                    <span className={`text-xl font-extrabold ${simResult.comfortAfterScore >= 80 ? 'text-teal-700' : 'text-amber-600'}`}>
                      {simResult.comfortAfterScore} / 100
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-slate-600 font-medium">
                  {simResult.comfortAfterScore >= 85
                    ? 'Optimal thermal & IAQ satisfaction'
                    : simResult.comfortAfterScore >= 70
                    ? 'Acceptable comfort with slight warmth'
                    : 'Warning: Setpoint may cause occupant complaints'}
                </div>
              </div>

              {/* Electricity Daily Cost */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
                  <span>Daily Electricity Cost (₹)</span>
                  <IndianRupee className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Baseline</span>
                    <span className="text-base font-bold text-slate-600">₹{simResult.costBeforeRupees.toLocaleString()}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <div>
                    <span className="text-[10px] text-amber-700 block font-bold">Simulated</span>
                    <span className="text-xl font-extrabold text-amber-700">₹{simResult.costAfterRupees.toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-emerald-700 font-bold">
                  Saved: ₹{simResult.costSavingsRupees.toLocaleString()}/day (₹{((simResult.costSavingsRupees * 330) / 100000).toFixed(2)} Lakh/yr)
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              All simulator predictions reflect physics-based thermal and empirical Indian commercial office load curves.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
