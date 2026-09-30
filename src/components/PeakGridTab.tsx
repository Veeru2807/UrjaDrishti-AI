import React, { useState } from 'react';
import { FlexibleLoadItem, HourlyReading, BuildingConfig } from '../types';
import {
  Zap,
  Sliders,
  Car,
  Waves,
  Cpu,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PeakGridTabProps {
  flexibleLoads: FlexibleLoadItem[];
  hourlyData: HourlyReading[];
  config: BuildingConfig;
  onToggleShift: (loadId: string) => void;
}

export const PeakGridTab: React.FC<PeakGridTabProps> = ({
  flexibleLoads,
  hourlyData,
  config,
  onToggleShift,
}) => {
  const [loadShiftActive, setLoadShiftActive] = useState(true);

  const shiftedCount = flexibleLoads.filter((l) => l.status === 'Shifted to Off-Peak').length;
  const peakReductionTotalKw = flexibleLoads
    .filter((l) => l.status === 'Shifted to Off-Peak')
    .reduce((acc, l) => acc + l.peakReductionKw, 0);

  const curveData = hourlyData.map((d) => {
    let optimizedDemand = d.actualKw;
    if (d.hour >= 18 && d.hour <= 21 && loadShiftActive) {
      optimizedDemand = Math.max(30, d.actualKw - peakReductionTotalKw);
    }
    if (d.hour >= 23 || d.hour <= 4) {
      if (loadShiftActive) {
        optimizedDemand = d.actualKw + peakReductionTotalKw * 0.45;
      }
    }

    return {
      timeLabel: d.timeLabel,
      hour: d.hour,
      unoptimizedPeakKw: d.actualKw,
      optimizedPeakKw: Math.round(optimizedDemand * 10) / 10,
      peakThreshold: 85,
      isPeak: d.isPeakPeriod,
    };
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-50 via-teal-50 to-emerald-50 border border-purple-200/80 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-purple-100 border border-purple-200 text-purple-700 shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-extrabold text-slate-900">Peak Demand Prediction &amp; Grid Response (TOD)</h2>
              <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2.5 py-0.5 rounded-full border border-purple-200">
                Time of Day Tariff Optimization
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed font-medium">
              Predict evening peak surges (6 PM – 10 PM) when Indian DISCOM peak tariffs are highest. Dynamically shift non-critical flexible loads to off-peak night windows (11 PM – 5 AM).
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setLoadShiftActive(!loadShiftActive)}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center space-x-2 cursor-pointer ${
              loadShiftActive
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-300'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{loadShiftActive ? 'Load Shifting: Active' : 'Enable Load Shifting'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Unoptimized Peak Demand</span>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-rose-600">94.2</span>
            <span className="text-xs text-slate-500 font-medium">kW (at 6:30 PM)</span>
          </div>
          <span className="text-[11px] text-rose-700 font-medium mt-1 block">Exceeds 85 kW contracted ceiling</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Optimized Peak (Load Shifted)</span>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-emerald-700">
              {loadShiftActive ? (94.2 - peakReductionTotalKw).toFixed(1) : '94.2'}
            </span>
            <span className="text-xs text-slate-500 font-medium">kW</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            {loadShiftActive ? `-${peakReductionTotalKw} kW peak demand shaved` : 'No shifting applied'}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">DISCOM Peak Tariff Window</span>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-xl font-extrabold text-amber-600">6 PM – 10 PM</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block font-medium">Peak TOD surcharge: +₹4.0/kWh</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Suggested Off-Peak Shift</span>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-xl font-extrabold text-teal-700">11 PM – 5 AM</span>
          </div>
          <span className="text-[11px] text-teal-700 font-semibold mt-1 block">Off-peak discount: -₹2.5/kWh</span>
        </div>
      </div>

      {/* Peak Demand Chart: Before vs After Shifting */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Peak Load Profile &amp; Load Shifting Simulation (kW)</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulating flat peak clipping through EV charging shift, water booster delay, and pre-cooling
            </p>
          </div>
          <div className="flex items-center space-x-4 text-xs font-semibold">
            <span className="flex items-center space-x-1.5 text-rose-700">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>Before (Peak: 94 kW)</span>
            </span>
            <span className="flex items-center space-x-1.5 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>After Shifting (Peak: {(94.2 - peakReductionTotalKw).toFixed(1)} kW)</span>
            </span>
            <span className="flex items-center space-x-1.5 text-amber-600">
              <span className="w-2.5 h-0.5 bg-amber-500"></span>
              <span>Contract Max (85 kW)</span>
            </span>
          </div>
        </div>

        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={curveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="beforePeakLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e11d48" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#e11d48" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="afterPeakLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="timeLabel" stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit=" kW" domain={[0, 110]} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="unoptimizedPeakKw" name="Before Optimization" stroke="#e11d48" fill="url(#beforePeakLight)" strokeWidth={2} />
              <Area type="monotone" dataKey="optimizedPeakKw" name="After Load Shifting" stroke="#059669" fill="url(#afterPeakLight)" strokeWidth={2.5} />
              <Line type="monotone" dataKey="peakThreshold" name="Contracted Demand Limit" stroke="#d97706" strokeDasharray="4 4" strokeWidth={1.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Flexible Load Inventory Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Identified Flexible Loads &amp; Automated Dispatch</h3>
            <p className="text-xs text-slate-500 mt-0.5">Toggle loads to simulate rescheduling out of the 6 PM–10 PM peak window</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
            {shiftedCount} of {flexibleLoads.length} Loads Shifted
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold">
                <th className="pb-3">Equipment / Load</th>
                <th className="pb-3">Capacity</th>
                <th className="pb-3">Current Peak Window</th>
                <th className="pb-3">Suggested Shift Window</th>
                <th className="pb-3">Peak Shed</th>
                <th className="pb-3">Daily TOD Savings</th>
                <th className="pb-3 text-right">Dispatch Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {flexibleLoads.map((load) => {
                const isShifted = load.status === 'Shifted to Off-Peak';
                return (
                  <tr key={load.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 font-bold text-slate-900 flex items-center space-x-2">
                      {load.category === 'EV Charging' && <Car className="w-4 h-4 text-teal-600" />}
                      {load.category === 'Water Heating / Pumping' && <Waves className="w-4 h-4 text-blue-600" />}
                      {load.category === 'Selected Equipment' && <Cpu className="w-4 h-4 text-purple-600" />}
                      <span>{load.name}</span>
                    </td>
                    <td className="py-3.5 text-slate-700 font-mono font-bold">{load.capacityKw} kW</td>
                    <td className="py-3.5 text-rose-600 font-semibold">{load.normalHours}</td>
                    <td className="py-3.5 text-emerald-700 font-semibold">{load.suggestedShiftHours}</td>
                    <td className="py-3.5 text-purple-700 font-bold">-{load.peakReductionKw} kW</td>
                    <td className="py-3.5 text-teal-700 font-bold">₹{load.dailySavingsRupees}/day</td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => onToggleShift(load.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isShifted
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                        }`}
                      >
                        {isShifted ? 'Shifted (Off-Peak)' : 'Shift to Off-Peak'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
