import React, { useState } from 'react';
import { ZoneData, BuildingConfig } from '../types';
import {
  Layers,
  Users,
  Thermometer,
  Wind,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Info,
} from 'lucide-react';

interface BuildingZonesTabProps {
  zones: ZoneData[];
  selectedZoneId: string | null;
  onSelectZone: (zoneId: string) => void;
  config: BuildingConfig;
  onOptimizeZone: (zoneId: string) => void;
}

export const BuildingZonesTab: React.FC<BuildingZonesTabProps> = ({
  zones,
  selectedZoneId,
  onSelectZone,
  config,
  onOptimizeZone,
}) => {
  const [filterFloor, setFilterFloor] = useState<number | 'all'>('all');

  const activeZone = zones.find((z) => z.id === selectedZoneId) || zones[2];
  const filteredZones = filterFloor === 'all' ? zones : zones.filter((z) => z.floor === filterFloor);

  return (
    <div className="space-y-6">
      {/* Floor Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Multi-Floor Zone Micro-Climate &amp; Power Diagnostics</h2>
            <p className="text-xs text-slate-500">Granular floor-level environmental monitoring, VAV setpoints and occupancy correlation</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setFilterFloor('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              filterFloor === 'all' ? 'bg-white text-teal-700 shadow-xs border border-slate-200/80' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Floors
          </button>
          {[1, 2, 3].map((floor) => (
            <button
              key={floor}
              onClick={() => setFilterFloor(floor)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                filterFloor === floor ? 'bg-white text-teal-700 shadow-xs border border-slate-200/80' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Floor {floor}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Zone Cards List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredZones.map((zone) => {
              const isSelected = zone.id === activeZone.id;
              const isAnomaly = zone.hasAnomaly;
              return (
                <div
                  key={zone.id}
                  onClick={() => onSelectZone(zone.id)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 relative shadow-xs ${
                    isSelected
                      ? 'ring-2 ring-teal-500 bg-white border-teal-500 shadow-md'
                      : isAnomaly
                      ? 'bg-rose-50/80 border-rose-300 hover:border-rose-400 hover:bg-rose-100/50'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700 border border-slate-200">
                          F{zone.floor}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{zone.name}</h3>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 font-medium">{zone.areaSqM} m² • {zone.currentOccupants} / {zone.maxCapacity} people</p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        zone.status === 'Normal'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-rose-100 text-rose-800 border-rose-200'
                      }`}
                    >
                      {zone.status}
                    </span>
                  </div>

                  {/* 4 Environmental Telemetry Indicators */}
                  <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                      <div className="flex items-center justify-center space-x-1 text-slate-500 text-[10px] font-bold">
                        <Users className="w-3 h-3 text-blue-600" />
                        <span>Occupancy</span>
                      </div>
                      <span className={`text-xs font-bold block mt-1 ${zone.occupancyPercent < 15 ? 'text-amber-600' : 'text-slate-800'}`}>
                        {zone.occupancyPercent}%
                      </span>
                    </div>

                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                      <div className="flex items-center justify-center space-x-1 text-slate-500 text-[10px] font-bold">
                        <Thermometer className="w-3 h-3 text-amber-600" />
                        <span>Temp</span>
                      </div>
                      <span className="text-xs font-bold text-slate-800 block mt-1">{zone.temperature}°C</span>
                    </div>

                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                      <div className="flex items-center justify-center space-x-1 text-slate-500 text-[10px] font-bold">
                        <Wind className="w-3 h-3 text-teal-600" />
                        <span>CO₂</span>
                      </div>
                      <span className="text-xs font-bold text-slate-800 block mt-1">{zone.co2Ppm}</span>
                    </div>

                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                      <div className="flex items-center justify-center space-x-1 text-slate-500 text-[10px] font-bold">
                        <Zap className="w-3 h-3 text-emerald-600" />
                        <span>Load</span>
                      </div>
                      <span className="text-xs font-bold text-teal-700 block mt-1">{zone.totalKw} kW</span>
                    </div>
                  </div>

                  {/* Waste Anomaly Callout if present */}
                  {zone.hasAnomaly && (
                    <div className="mt-3 p-2.5 bg-rose-100/70 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start space-x-2 font-medium">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-rose-900">Energy Inefficiency Detected</span>
                        <p className="text-[11px] text-rose-800 mt-0.5 leading-snug">{zone.anomalyDescription}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Selected Zone Detailed Diagnostics & Optimization Panel */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono text-teal-700 font-bold uppercase">Selected Zone Diagnostics</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{activeZone.name}</h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Floor {activeZone.floor}
              </span>
            </div>

            {/* Subsystem Power Load */}
            <div className="mt-4 space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Zone Power Breakdown ({activeZone.totalKw} kW)</span>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">HVAC VAV Cooling</span>
                    <span className="text-teal-700 font-bold">{activeZone.hvacKw} kW ({Math.round((activeZone.hvacKw / activeZone.totalKw) * 100)}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-teal-500 h-full rounded-full" style={{ width: `${(activeZone.hvacKw / activeZone.totalKw) * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">Lighting Circuits</span>
                    <span className="text-amber-700 font-bold">{activeZone.lightingKw} kW ({Math.round((activeZone.lightingKw / activeZone.totalKw) * 100)}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(activeZone.lightingKw / activeZone.totalKw) * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">Plug &amp; Equipment</span>
                    <span className="text-purple-700 font-bold">{activeZone.equipmentKw} kW ({Math.round((activeZone.equipmentKw / activeZone.totalKw) * 100)}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: `${(activeZone.equipmentKw / activeZone.totalKw) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental Comfort Analysis */}
            <div className="mt-5 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900">Indoor Comfort Index</span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                  {activeZone.comfortScore} / 100
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-2">
                <div className="p-2 bg-white rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Temperature</span>
                  <span className="font-bold text-slate-800">{activeZone.temperature}°C</span>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Humidity</span>
                  <span className="font-bold text-slate-800">{activeZone.humidity}%</span>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">CO₂ PPM</span>
                  <span className="font-bold text-slate-800">{activeZone.co2Ppm}</span>
                </div>
              </div>
            </div>

            {/* Anomaly Resolution Action if available */}
            {activeZone.hasAnomaly ? (
              <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-700">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Waste Root Cause Analysis</span>
                </div>
                <p className="text-xs text-rose-800">{activeZone.anomalyDescription}</p>
                <div className="pt-2 border-t border-rose-200 text-[11px] text-slate-700 space-y-1">
                  <div><strong>Daily Waste:</strong> ~{activeZone.anomalySavingKwhPerDay} kWh (₹{activeZone.anomalyCostImpactRupees}/day)</div>
                  <div><strong>Recommended Action:</strong> {activeZone.anomalyAction}</div>
                </div>

                <button
                  onClick={() => onOptimizeZone(activeZone.id)}
                  className="w-full mt-2 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Simulate Optimization Fix</span>
                </button>
              </div>
            ) : (
              <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-xs text-emerald-800 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Zone is operating within optimal energy efficiency &amp; comfort benchmarks.</span>
              </div>
            )}
          </div>

          <div className="mt-5 text-[11px] text-slate-400 flex items-center space-x-1">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Simulated telemetry via Modbus/BACnet IoT gateway model</span>
          </div>
        </div>
      </div>
    </div>
  );
};
