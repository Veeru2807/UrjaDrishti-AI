import React, { useState } from 'react';
import { BuildingConfig, HourlyReading, DailyReading } from '../types';
import { SavingsSummary } from '../utils/calculations';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { Layers, ShieldCheck } from 'lucide-react';

interface EnergyAnalyticsTabProps {
  config: BuildingConfig;
  savings: SavingsSummary;
  hourlyData: HourlyReading[];
  sevenDays: DailyReading[];
  thirtyDays: DailyReading[];
}

export const EnergyAnalyticsTab: React.FC<EnergyAnalyticsTabProps> = ({
  config,
  savings,
  hourlyData,
  sevenDays,
  thirtyDays,
}) => {
  const [timeFilter, setTimeFilter] = useState<'today' | '7days' | '30days'>('today');
  const [metricView, setMetricView] = useState<'total' | 'disaggregated' | 'baseline-vs-actual'>('baseline-vs-actual');

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Energy Consumption Analytics &amp; Baseline Tracking</h2>
            <p className="text-xs text-slate-500">Dynamic model comparing baseline vs actual disaggregated subsystem loads</p>
          </div>
        </div>

        {/* Time Filter Pills */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setTimeFilter('today')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              timeFilter === 'today'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Today (24h)
          </button>
          <button
            onClick={() => setTimeFilter('7days')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              timeFilter === '7days'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Past 7 Days
          </button>
          <button
            onClick={() => setTimeFilter('30days')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              timeFilter === '30days'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Past 30 Days
          </button>
        </div>
      </div>

      {/* KPI Cards for Selected View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Baseline Model Consumption</span>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-slate-800">
              {timeFilter === 'today' ? savings.dailyBaselineKwh.toLocaleString() : timeFilter === '7days' ? (savings.dailyBaselineKwh * 7).toLocaleString() : (savings.dailyBaselineKwh * 30).toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 font-medium">kWh</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block font-medium">Formula: Area ({config.areaSqM} m²) × {config.baselineEnergyIntensity} kWh/m²</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Optimized / Actual Consumption</span>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-emerald-700">
              {timeFilter === 'today' ? savings.dailyActualKwh.toLocaleString() : timeFilter === '7days' ? (savings.dailyActualKwh * 7).toLocaleString() : (savings.dailyActualKwh * 30).toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 font-medium">kWh</span>
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 block font-semibold">{savings.percentageSaved}% reduction achieved</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Financial Energy Savings</span>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-teal-700">
              ₹{timeFilter === 'today' ? savings.dailySavingsRupees.toLocaleString() : timeFilter === '7days' ? (savings.dailySavingsRupees * 7).toLocaleString() : (savings.dailySavingsRupees * 30).toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 font-medium">(@ ₹{config.electricityTariff}/kWh)</span>
          </div>
          <span className="text-[11px] text-teal-700 mt-1 block font-semibold">Projected ₹{(savings.annualMonetarySavingsRupees / 100000).toFixed(1)}L annual</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Avoided CO₂ Emissions</span>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-purple-700">
              {timeFilter === 'today' ? ((savings.dailySavedKwh * config.gridEmissionFactor) / 1000).toFixed(2) : timeFilter === '7days' ? ((savings.dailySavedKwh * 7 * config.gridEmissionFactor) / 1000).toFixed(2) : ((savings.dailySavedKwh * 30 * config.gridEmissionFactor) / 1000).toFixed(2)}
            </span>
            <span className="text-xs text-slate-500 font-medium">t CO₂e</span>
          </div>
          <span className="text-[11px] text-purple-700 mt-1 block font-semibold">CEA Grid factor: {config.gridEmissionFactor} kg/kWh</span>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {timeFilter === 'today'
                ? 'Hourly Energy Demand Profile (24-Hour Timeline)'
                : timeFilter === '7days'
                ? 'Daily Energy Consumption Profile (Last 7 Days)'
                : 'Monthly Daily Energy Trend (Last 30 Days)'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Compare baseline benchmark against measured actuals and disaggregated sub-meters
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={() => setMetricView('baseline-vs-actual')}
              className={`px-3 py-1 rounded-md border text-xs font-bold transition-colors cursor-pointer ${
                metricView === 'baseline-vs-actual'
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              Baseline vs Actual
            </button>
            <button
              onClick={() => setMetricView('disaggregated')}
              className={`px-3 py-1 rounded-md border text-xs font-bold transition-colors cursor-pointer ${
                metricView === 'disaggregated'
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              Subsystem Breakdown
            </button>
          </div>
        </div>

        <div className="h-80 mt-5">
          <ResponsiveContainer width="100%" height="100%">
            {timeFilter === 'today' ? (
              metricView === 'baseline-vs-actual' ? (
                <ComposedChart data={hourlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="timeLabel" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit=" kW" />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="baselineKw" name="Baseline (kW)" fill="#94a3b8" opacity={0.6} radius={[4, 4, 0, 0]} />
                  <Area type="monotone" dataKey="actualKw" name="Actual Load (kW)" stroke="#059669" fill="#059669" fillOpacity={0.15} strokeWidth={2.5} />
                  <Line type="monotone" dataKey="predictedKw" name="Predicted Next-Hour (kW)" stroke="#0891b2" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                </ComposedChart>
              ) : (
                <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="timeLabel" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit=" kW" />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="hvacKw" name="HVAC Cooling (kW)" stackId="1" stroke="#0891b2" fill="#0891b2" fillOpacity={0.7} />
                  <Area type="monotone" dataKey="lightingKw" name="Lighting (kW)" stackId="1" stroke="#d97706" fill="#d97706" fillOpacity={0.7} />
                  <Area type="monotone" dataKey="equipmentKw" name="Equipment &amp; Server (kW)" stackId="1" stroke="#9333ea" fill="#9333ea" fillOpacity={0.7} />
                </AreaChart>
              )
            ) : (
              <BarChart data={timeFilter === '7days' ? sevenDays : thirtyDays} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="dayLabel" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit=" kWh" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                {metricView === 'baseline-vs-actual' ? (
                  <>
                    <Bar dataKey="baselineKwh" name="Baseline Benchmark (kWh)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="actualKwh" name="Actual Consumption (kWh)" fill="#059669" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="optimizedKwh" name="Simulated Target (kWh)" fill="#0891b2" radius={[4, 4, 0, 0]} />
                  </>
                ) : (
                  <>
                    <Bar dataKey="hvacKwh" name="HVAC (kWh)" stackId="a" fill="#0891b2" />
                    <Bar dataKey="lightingKwh" name="Lighting (kWh)" stackId="a" fill="#d97706" />
                    <Bar dataKey="equipmentKwh" name="Equipment (kWh)" stackId="a" fill="#9333ea" radius={[4, 4, 0, 0]} />
                  </>
                )}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Energy Baseline Methodology & Formula Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Transparent Energy Baseline Methodology &amp; Mathematical Model</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">1. Dynamic Annual Baseline</span>
            <code className="text-emerald-800 font-mono text-[11px] block bg-white border border-slate-200 p-2 rounded mb-2">
              Baseline = Area × EPI_baseline × Climate_Factor
            </code>
            <p className="text-slate-600 text-[11px]">
              {config.areaSqM.toLocaleString()} m² × {config.baselineEnergyIntensity} kWh/m² = <strong className="text-slate-900">{savings.annualBaselineKwh.toLocaleString()} kWh/yr</strong>
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">2. Quantified Energy Reduction</span>
            <code className="text-teal-800 font-mono text-[11px] block bg-white border border-slate-200 p-2 rounded mb-2">
              % Reduction = ((Baseline − Actual) / Baseline) × 100
            </code>
            <p className="text-slate-600 text-[11px]">
              Savings: <strong className="text-slate-900">{savings.annualSavedKwh.toLocaleString()} kWh/yr</strong> ({savings.percentageSaved}% reduction)
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">3. Financial &amp; Carbon Conversion</span>
            <code className="text-amber-800 font-mono text-[11px] block bg-white border border-slate-200 p-2 rounded mb-2">
              Cost = kWh_saved × Tariff (₹{config.electricityTariff})
            </code>
            <p className="text-slate-600 text-[11px]">
              Annualized savings: <strong className="text-slate-900">₹{savings.annualMonetarySavingsRupees.toLocaleString()}</strong> | CO₂ avoided: <strong className="text-slate-900">{savings.annualCo2ReductionTonnes} t</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
