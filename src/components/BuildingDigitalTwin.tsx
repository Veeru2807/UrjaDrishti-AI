import React, { useState } from 'react';
import {
  Building2,
  Users,
  Thermometer,
  Zap,
  Smile,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Wind,
  Layers,
  ArrowRight,
  Maximize2,
  X,
  Sparkles,
} from 'lucide-react';
import { ZoneData } from '../types';

interface BuildingDigitalTwinProps {
  zones: ZoneData[];
  onOptimizeZone: (zoneId: string) => void;
  onSelectZone?: (zoneId: string) => void;
}

export const BuildingDigitalTwin: React.FC<BuildingDigitalTwinProps> = ({
  zones,
  onOptimizeZone,
  onSelectZone,
}) => {
  const [selectedFloor, setSelectedFloor] = useState<number | 'all'>('all');
  const [activeModalZone, setActiveModalZone] = useState<ZoneData | null>(null);

  const filteredZones = selectedFloor === 'all'
    ? zones
    : zones.filter((z) => z.floor === selectedFloor);

  const getStatusColor = (status: string, hasAnomaly: boolean) => {
    if (hasAnomaly) return { border: 'border-rose-400', bg: 'bg-rose-50/70', badge: 'bg-rose-500 text-white', text: 'text-rose-700' };
    if (status === 'Normal') return { border: 'border-emerald-300', bg: 'bg-emerald-50/50', badge: 'bg-emerald-600 text-white', text: 'text-emerald-700' };
    if (status === 'Efficient') return { border: 'border-teal-300', bg: 'bg-teal-50/50', badge: 'bg-teal-600 text-white', text: 'text-teal-700' };
    return { border: 'border-amber-300', bg: 'bg-amber-50/50', badge: 'bg-amber-600 text-white', text: 'text-amber-700' };
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 md:p-6 shadow-sm space-y-6 text-left">
      {/* Header with Floor Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
              <Building2 className="w-5 h-5" />
            </span>
            <h3 className="text-base font-extrabold text-slate-900">
              Building Digital Twin — 2D Zone Thermal Heatmap
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Click any architectural zone to inspect live micro-climate telemetry, HVAC load &amp; ASHRAE 55 comfort index.
          </p>
        </div>

        {/* Floor Switcher */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl shrink-0">
          {[
            { id: 'all', label: 'All Floors' },
            { id: 1, label: 'Floor 1' },
            { id: 2, label: 'Floor 2' },
            { id: 3, label: 'Floor 3' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFloor(f.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedFloor === f.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Building Cross-Section / Floor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredZones.map((zone) => {
          const style = getStatusColor(zone.status, zone.hasAnomaly);
          const occPct = Math.round((zone.currentOccupants / zone.maxCapacity) * 100);

          return (
            <div
              key={zone.id}
              onClick={() => {
                setActiveModalZone(zone);
                if (onSelectZone) onSelectZone(zone.id);
              }}
              className={`border-2 ${style.border} ${style.bg} rounded-2xl p-4.5 transition-all duration-200 hover:shadow-md cursor-pointer relative flex flex-col justify-between space-y-4 group`}
            >
              {/* Top Row: Zone Name & Status Badge */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 shadow-xs">
                      Floor {zone.floor}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {zone.name}
                    </h4>
                  </div>
                </div>

                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${style.badge} shadow-xs flex items-center space-x-1`}>
                  {zone.hasAnomaly ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      <span>Attention</span>
                    </>
                  ) : (
                    <span>{zone.status}</span>
                  )}
                </span>
              </div>

              {/* Middle Metrics 2x2 Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Temp & Comfort */}
                <div className="bg-white/90 p-2.5 rounded-xl border border-slate-200/80 space-y-0.5 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 text-[10px] font-bold">
                    <span>Temp / Comfort</span>
                    <Thermometer className="w-3.5 h-3.5 text-rose-500" />
                  </div>
                  <div className="flex items-baseline space-x-1.5 font-bold">
                    <span className="text-sm text-slate-900 font-mono">{zone.temperature}°C</span>
                    <span className="text-[10px] text-emerald-700 font-mono font-bold">({zone.comfortScore}/100)</span>
                  </div>
                </div>

                {/* Active Power */}
                <div className="bg-white/90 p-2.5 rounded-xl border border-slate-200/80 space-y-0.5 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 text-[10px] font-bold">
                    <span>Active Load</span>
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div className="flex items-baseline space-x-1 font-bold">
                    <span className="text-sm text-slate-900 font-mono">{zone.totalKw}</span>
                    <span className="text-[10px] text-slate-500">kW</span>
                  </div>
                </div>

                {/* Occupancy */}
                <div className="bg-white/90 p-2.5 rounded-xl border border-slate-200/80 space-y-0.5 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 text-[10px] font-bold">
                    <span>Occupancy</span>
                    <Users className="w-3.5 h-3.5 text-teal-600" />
                  </div>
                  <div className="flex items-baseline space-x-1 font-bold">
                    <span className="text-sm text-slate-900 font-mono">{occPct}%</span>
                    <span className="text-[10px] text-slate-400">({zone.currentOccupants}/{zone.maxCapacity})</span>
                  </div>
                </div>

                {/* HVAC Airflow Load */}
                <div className="bg-white/90 p-2.5 rounded-xl border border-slate-200/80 space-y-0.5 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 text-[10px] font-bold">
                    <span>HVAC Cooling</span>
                    <Wind className="w-3.5 h-3.5 text-cyan-600" />
                  </div>
                  <div className="flex items-baseline space-x-1 font-bold">
                    <span className="text-sm text-slate-900 font-mono">{zone.hvacKw}</span>
                    <span className="text-[10px] text-slate-500">kW</span>
                  </div>
                </div>
              </div>

              {/* Anomaly Callout Strip if present */}
              {zone.hasAnomaly ? (
                <div className="p-2.5 rounded-xl bg-rose-100/90 border border-rose-300 text-rose-900 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-[11px]">
                    <span className="flex items-center space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>{zone.anomalyDescription || 'Overcooling Detected'}</span>
                    </span>
                    <span className="text-[10px] text-rose-700 font-mono font-extrabold">Save ~{zone.anomalySavingKwhPerDay} kWh/d</span>
                  </div>
                  <p className="text-[10px] text-rose-800 leading-tight">
                    {zone.anomalyAction}
                  </p>
                </div>
              ) : (
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center space-x-1 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ASHRAE 55 Optimal</span>
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">CO₂: {zone.co2Ppm} ppm</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal for In-depth Zone Inspection */}
      {activeModalZone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 font-bold font-mono text-sm">
                  F{activeModalZone.floor}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {activeModalZone.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Floor {activeModalZone.floor} • Floor Area: ~{Math.round(activeModalZone.maxCapacity * 8)} m²
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalZone(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Microclimate Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Temperature</span>
                <p className="text-base font-extrabold text-slate-900 font-mono">{activeModalZone.temperature}°C</p>
                <span className="text-[10px] text-emerald-700 font-medium">Target: 24.5°C</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Humidity</span>
                <p className="text-base font-extrabold text-slate-900 font-mono">{activeModalZone.humidity}%</p>
                <span className="text-[10px] text-teal-700 font-medium">Comfort: 40-60%</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase">CO₂ Air Quality</span>
                <p className="text-base font-extrabold text-slate-900 font-mono">{activeModalZone.co2Ppm} ppm</p>
                <span className="text-[10px] text-emerald-700 font-medium">Fresh (&lt; 800)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Comfort Score</span>
                <p className="text-base font-extrabold text-emerald-700 font-mono">{activeModalZone.comfortScore} / 100</p>
                <span className="text-[10px] text-slate-500 font-medium">ASHRAE 55</span>
              </div>
            </div>

            {/* Load Breakdown */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                Sub-meter Load Breakdown (Total: {activeModalZone.totalKw} kW)
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 block">HVAC Airflow</span>
                  <span className="font-bold text-slate-900 font-mono">{activeModalZone.hvacKw} kW</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 block">Lighting</span>
                  <span className="font-bold text-slate-900 font-mono">{activeModalZone.lightingKw} kW</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 block">Plug Loads</span>
                  <span className="font-bold text-slate-900 font-mono">{activeModalZone.equipmentKw} kW</span>
                </div>
              </div>
            </div>

            {/* Anomaly Fix / Simulation action */}
            {activeModalZone.hasAnomaly && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                <div className="flex items-center space-x-2 text-rose-800 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>{activeModalZone.anomalyDescription || 'Energy Waste Alert'}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {activeModalZone.anomalyAction}
                </p>
                <button
                  onClick={() => {
                    onOptimizeZone(activeModalZone.id);
                    setActiveModalZone((prev) => prev ? { ...prev, hasAnomaly: false, status: 'Normal', temperature: 24.5, comfortScore: 95 } : null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center justify-center space-x-2 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Apply Comfort-Preserving Schedule Fix (Save {activeModalZone.anomalySavingKwhPerDay} kWh/d)</span>
                </button>
              </div>
            )}

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setActiveModalZone(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
