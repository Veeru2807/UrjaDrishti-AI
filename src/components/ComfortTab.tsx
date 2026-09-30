import React from 'react';
import { ZoneData, BuildingConfig } from '../types';
import {
  Smile,
  ShieldCheck,
  Thermometer,
  Droplets,
  Wind,
  CheckCircle2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface ComfortTabProps {
  zones: ZoneData[];
  config: BuildingConfig;
}

export const ComfortTab: React.FC<ComfortTabProps> = ({ zones, config }) => {
  const avgScore = Math.round(zones.reduce((acc, z) => acc + z.comfortScore, 0) / zones.length);
  const comfortableCount = zones.filter((z) => z.comfortScore >= 80).length;

  const chartData = zones.map((z) => ({
    name: z.name.split(' - ')[0],
    fullName: z.name,
    score: z.comfortScore,
    temp: z.temperature,
    humidity: z.humidity,
    co2: z.co2Ppm,
  }));

  return (
    <div className="space-y-6">
      {/* Core Principle Banner */}
      <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-cyan-50 border border-teal-200/80 rounded-2xl p-5 shadow-xs">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-teal-100 border border-teal-200 text-teal-700 shrink-0">
            <Smile className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-extrabold text-slate-900">Occupant Comfort &amp; Indoor Environmental Quality (IEQ) Engine</h2>
              <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full border border-teal-200">
                ASHRAE 55 / NBC 2016
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed font-medium">
              <strong>Core Optimization Principle:</strong> <em>"Minimize energy consumption while maintaining acceptable comfort, thermal safety, and fresh air standards."</em> The AI engine prevents excessive curtailment that could degrade occupant productivity.
            </p>
          </div>
        </div>
      </div>

      {/* Comfort KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Overall Facility Comfort Score</span>
            <Smile className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-3xl font-extrabold text-emerald-700">{avgScore}</span>
            <span className="text-xs text-slate-500 font-medium">/ 100</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">Comfortable (Optimal condition)</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Compliant Zones (Score &ge; 80)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-3xl font-extrabold text-slate-900">{comfortableCount}</span>
            <span className="text-xs text-slate-500 font-medium">of {zones.length} zones</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">100% of primary workspaces</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Target HVAC Setpoint</span>
            <Thermometer className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-3xl font-extrabold text-amber-700">{config.hvacSetpoint}°C</span>
            <span className="text-xs text-slate-500 font-medium">BEE Rec: 24-25°C</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Configured for {config.climateZone} Climate</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Air Quality / CO₂ Status</span>
            <Wind className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-3xl font-extrabold text-teal-700">618</span>
            <span className="text-xs text-slate-500 font-medium">ppm avg</span>
          </div>
          <span className="text-[11px] text-teal-700 font-semibold mt-1 block">Well below 800 ppm threshold</span>
        </div>
      </div>

      {/* Zone Comfort Comparison Chart */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Zone-by-Zone Comfort &amp; IEQ Score Index</h3>
            <p className="text-xs text-slate-500 mt-0.5">Calculated dynamically from Thermal Setpoint, Humidity, and CO₂ concentrations</p>
          </div>
          <div className="flex items-center space-x-3 text-xs font-semibold">
            <span className="flex items-center space-x-1 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>&ge;80 Optimal</span>
            </span>
            <span className="flex items-center space-x-1 text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>60-79 Attention</span>
            </span>
            <span className="flex items-center space-x-1 text-rose-700">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>&lt;60 Poor</span>
            </span>
          </div>
        </div>

        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: any, name: any, item: any) => [
                  `${value} / 100 (Temp: ${item.payload.temp}°C, Humidity: ${item.payload.humidity}%, CO₂: ${item.payload.co2} ppm)`,
                  'Comfort Score',
                ]}
              />
              <Bar dataKey="score" name="Comfort Score" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.score >= 85 ? '#059669' : entry.score >= 70 ? '#0891b2' : '#d97706'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comfort Scoring Algorithm Breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 mb-4">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Demo Comfort Scoring Logic (BEE &amp; ASHRAE 55 Adaptive Comfort)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="flex items-center space-x-2 text-amber-700 font-bold">
              <Thermometer className="w-4 h-4" />
              <span>1. Thermal Penalty (ΔT)</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Ideal temperature is setpoint &plusmn; 1°C. For every degree outside tolerance, comfort score reduces by 12 points.
            </p>
            <div className="text-slate-500 text-[10px] bg-white border border-slate-200 p-2 rounded">
              BEE recommendation: 24°C–25°C prevents over-cooling while maximizing Indian comfort index.
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="flex items-center space-x-2 text-teal-700 font-bold">
              <Droplets className="w-4 h-4" />
              <span>2. Relative Humidity (RH)</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Ideal range is 40%–60% RH. Sub-40% causes dry eyes/throat; above 65% triggers microbial risk and thermal discomfort.
            </p>
            <div className="text-slate-500 text-[10px] bg-white border border-slate-200 p-2 rounded">
              Current humidity across zones: 46% - 58% (Healthy &amp; Compliant).
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="flex items-center space-x-2 text-purple-700 font-bold">
              <Wind className="w-4 h-4" />
              <span>3. Carbon Dioxide (CO₂)</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Fresh outdoor air benchmark: &le; 700 ppm is pristine; &gt; 800 ppm triggers fresh air damper modulation.
            </p>
            <div className="text-slate-500 text-[10px] bg-white border border-slate-200 p-2 rounded">
              Prevents occupant drowsiness &amp; improves cognitive performance.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
