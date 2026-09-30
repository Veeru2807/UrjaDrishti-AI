import React, { useState } from 'react';
import { BuildingConfig, ZoneData, HourlyReading } from '../types';
import { SavingsSummary } from '../utils/calculations';
import {
  Zap,
  TrendingDown,
  Percent,
  Smile,
  AlertTriangle,
  Lightbulb,
  IndianRupee,
  Users,
  Compass,
  ArrowDownRight,
  ShieldCheck,
  Flame,
  ArrowUpRight,
  HelpCircle,
  Sparkles,
  Building,
  CheckCircle2,
  ChevronRight,
  BarChart3,
  Sliders,
  Layers,
  Clock,
  Eye,
  Settings,
  Info,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { AiCopilot } from './AiCopilot';
import { BuildingDigitalTwin } from './BuildingDigitalTwin';

interface OverviewTabProps {
  config: BuildingConfig;
  savings: SavingsSummary;
  zones: ZoneData[];
  hourlyData: HourlyReading[];
  onNavigateTab: (tab: string) => void;
  onSelectZone: (zoneId: string) => void;
  onOptimizeZone?: (zoneId: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  config,
  savings,
  zones,
  hourlyData,
  onNavigateTab,
  onSelectZone,
  onOptimizeZone = () => {},
}) => {
  const [viewMode, setViewMode] = useState<'executive' | 'operations'>('executive');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const currentReading = hourlyData[19] || hourlyData[hourlyData.length - 1];
  const totalOccupants = zones.reduce((acc, z) => acc + z.currentOccupants, 0);
  const totalMaxOccupants = zones.reduce((acc, z) => acc + z.maxCapacity, 0);
  const avgOccupancy = Math.round((totalOccupants / totalMaxOccupants) * 100);
  const avgComfort = Math.round(zones.reduce((acc, z) => acc + z.comfortScore, 0) / zones.length);
  const anomalyZones = zones.filter((z) => z.hasAnomaly);
  const maxForecastKw = Math.max(...hourlyData.map((d) => d.actualKw));

  // Calculated CEO KPIs
  const todayKwh = 4820;
  const estimatedCostToday = Math.round(todayKwh * config.electricityTariff);
  const energyIntensityEpi = (todayKwh / config.areaSqM).toFixed(2);
  const peakDemandKw = 184;
  const savingsOpportunityMonth = 6800;

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER: GREETING, BUILDING SELECTOR & VIEW TOGGLE (CEO vs OPERATIONS) */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 md:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Good morning, here's your building at a glance.
            </h1>
            <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>LIVE DEMO</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium">
            <span className="font-bold text-slate-800">{config.name}</span>
            <span>•</span>
            <span>{config.areaSqM.toLocaleString()} m² Commercial Office</span>
            <span>•</span>
            <span className="text-teal-700 font-semibold">{config.climateZone} Climate Zone</span>
            <span>•</span>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
              DEMO / SIMULATED DATA
            </span>
          </div>
        </div>

        {/* View Mode Switcher: Executive View vs Operations View */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl shrink-0 self-start md:self-auto">
          <button
            onClick={() => setViewMode('executive')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              viewMode === 'executive'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-4 h-4 text-emerald-600" />
            <span>Executive View (CEO)</span>
          </button>

          <button
            onClick={() => setViewMode('operations')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              viewMode === 'operations'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-teal-600" />
            <span>Operations View</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. EXECUTIVE SUMMARY: 6 LARGE CEO KPI CARDS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1: Current Energy */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs text-left relative group hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>CURRENT ENERGY</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2.5 flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">4,820</span>
            <span className="text-xs text-slate-500 font-semibold">kWh</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>Today cumulative</span>
            <span className="text-emerald-700 font-bold font-mono">✓ Normal</span>
          </div>
        </div>

        {/* Card 2: Energy Cost */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs text-left relative group hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>ENERGY COST</span>
            <IndianRupee className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2.5 flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">₹48,200</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>Estimated (₹10/kWh)</span>
            <span className="text-teal-700 font-bold font-mono">TOD Tracked</span>
          </div>
        </div>

        {/* Card 3: Energy Intensity */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs text-left relative group hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>ENERGY INTENSITY</span>
            <BarChart3 className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="mt-2.5 flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">{energyIntensityEpi}</span>
            <span className="text-[10px] text-slate-500 font-semibold">kWh/m²/d</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-emerald-700 font-bold font-mono">
            <span>BEE EPI Aligned</span>
            <span>4-Star</span>
          </div>
        </div>

        {/* Card 4: Peak Demand */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs text-left relative group hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>PEAK DEMAND</span>
            <Zap className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2.5 flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">{peakDemandKw}</span>
            <span className="text-xs text-slate-500 font-semibold">kW</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-amber-700 font-bold font-mono">
            <span className="flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5 text-amber-600" />
              <span>↑ 8% vs base</span>
            </span>
            <span className="text-amber-800">⚠ Attention</span>
          </div>
        </div>

        {/* Card 5: Comfort Score */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs text-left relative group hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>COMFORT</span>
            <Smile className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-2.5 flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">89</span>
            <span className="text-xs text-slate-400 font-bold">/ 100</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-emerald-700 font-bold font-mono">
            <span>ASHRAE 55 Safe</span>
            <span>✓ Good</span>
          </div>
        </div>

        {/* Card 6: Savings Opportunity */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-300 rounded-2xl p-4 shadow-xs text-left relative group hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-bold">
            <span>SAVINGS OPPORTUNITY</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2.5 flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-emerald-900 tracking-tight font-mono">₹6,800</span>
            <span className="text-[10px] text-emerald-700 font-bold">/mo*</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-emerald-800 font-bold">
            <span>Schedule Tuning</span>
            <span className="text-emerald-900 font-mono">Simulated*</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CEO INSIGHT: "WHAT'S HAPPENING IN YOUR BUILDING?" (MOST IMPORTANT COMPONENT) */}
      {/* ========================================================================= */}
      <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm text-left space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-extrabold text-slate-900">
              What's happening in your building?
            </h2>
          </div>

          <span className="text-xs text-slate-500 font-mono">
            Generated just now • Natural Language Summary
          </span>
        </div>

        {/* CEO Narrative */}
        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          “Energy use is <strong className="text-amber-800 font-bold">8% above the expected baseline today</strong>, mainly due to higher HVAC consumption in <strong className="text-slate-900 font-bold">Zone B (2nd Floor Open Workspace)</strong>. Occupancy is currently <strong className="text-slate-900 font-bold">31%</strong>, while cooling demand remains high at full chiller capacity.”
        </p>

        {/* Why it Matters & Recommended Action */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
              WHY IT MATTERS
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              Reducing unnecessary HVAC operation could lower today's energy use while keeping the zone strictly within the configured ASHRAE 55 comfort range (24.0°C - 25.5°C).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider font-mono block">
              RECOMMENDED ACTION
            </span>
            <p className="text-xs text-emerald-900 leading-relaxed font-bold">
              Review Zone B cooling schedule and adjust airflow dampers to match 31% occupancy.
            </p>
          </div>
        </div>

        {/* Actions Button Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-500 italic">
            * Estimated impact: ~18 kWh/day reduction with 0 comfort penalty.
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigateTab('zones')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <span>View Zone B Insight</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOptimizeZone('z-2a')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Apply Fix (Simulated)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. AI COPILOT: "ASK URJADRISHTI" */}
      {/* ========================================================================= */}
      <AiCopilot
        config={config}
        zones={zones}
        onNavigateTab={onNavigateTab}
        onSelectZone={onSelectZone}
      />

      {/* ========================================================================= */}
      {/* 5. BASELINE VS OPTIMIZED COMPARISON (CEO SAVINGS STORY) */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs text-left space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Building Baseline vs Optimized Simulation
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Quantifying annual electricity reduction, cost abatement &amp; carbon footprint.
            </p>
          </div>

          <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg">
            Modelled Estimate
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase font-mono">Annual Energy</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-extrabold text-slate-900 font-mono">1,340,000</span>
              <span className="text-xs text-slate-400 line-through">1,500,000</span>
              <span className="text-xs text-slate-500">kWh</span>
            </div>
            <span className="text-xs text-emerald-700 font-bold block">↓ 160,000 kWh (10.7% Saved)</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase font-mono">Annual Cost Savings</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-extrabold text-emerald-800 font-mono">₹16.0 Lakhs</span>
              <span className="text-xs text-slate-500">/ yr</span>
            </div>
            <span className="text-xs text-slate-600 block">Based on ₹10/kWh commercial tariff</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase font-mono">Carbon Abatement</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-extrabold text-teal-800 font-mono">131.2</span>
              <span className="text-xs text-slate-500">tonnes CO₂e</span>
            </div>
            <span className="text-xs text-teal-700 font-bold block">0.82 kg CO₂/kWh grid factor</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase font-mono">Simple Payback</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-extrabold text-purple-800 font-mono">1.4</span>
              <span className="text-xs text-slate-500">Years</span>
            </div>
            <span className="text-xs text-purple-700 font-bold block">Low-cost IoT &amp; schedule tuning</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. TOP 3 PRIORITIZED ACTIONS (CEO ACTION LIST) */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs text-left space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-extrabold text-slate-900">
              Top Prioritized Actions
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('recommendations')}
            className="text-xs text-emerald-700 font-bold hover:underline flex items-center cursor-pointer"
          >
            <span>View All Recommendations</span>
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 uppercase font-mono">
                High Priority
              </span>
              <span className="text-xs text-emerald-700 font-bold font-mono">~₹1,800/mo</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">1. Optimize Zone B Cooling</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Raise setpoint to 24.5°C and reduce fresh air damper intake during low occupancy.
            </p>
            <button
              onClick={() => onOptimizeZone('z-2a')}
              className="w-full py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 text-xs font-bold transition-all cursor-pointer"
            >
              Apply Fix
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 uppercase font-mono">
                Medium Priority
              </span>
              <span className="text-xs text-purple-700 font-bold font-mono">~₹3,200/mo</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">2. Shift Water Booster Pumps</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Shift secondary tank pumping from peak afternoon to 6:00 AM off-peak window.
            </p>
            <button
              onClick={() => onNavigateTab('peakgrid')}
              className="w-full py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-purple-50 text-slate-800 hover:text-purple-800 text-xs font-bold transition-all cursor-pointer"
            >
              Review in Peak Grid
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 uppercase font-mono">
                Low-Cost Measure
              </span>
              <span className="text-xs text-teal-700 font-bold font-mono">~₹1,800/mo</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">3. Reset Floor 3 Lighting Timer</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automate perimeter daylight sensor dimming after 6:00 PM for open desks.
            </p>
            <button
              onClick={() => onOptimizeZone('z-3a')}
              className="w-full py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-teal-50 text-slate-800 hover:text-teal-800 text-xs font-bold transition-all cursor-pointer"
            >
              Apply Fix
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. OPERATIONS VIEW COMPONENTS (SHOWN WHEN OPERATIONS VIEW IS ACTIVE) */}
      {/* ========================================================================= */}
      {viewMode === 'operations' && (
        <div className="space-y-6 pt-2 animate-fadeIn">
          {/* 2D Building Digital Twin & Visual Heatmap */}
          <BuildingDigitalTwin
            zones={zones}
            onOptimizeZone={onOptimizeZone}
            onSelectZone={onSelectZone}
          />

          {/* 24h Hourly Demand Chart */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  24-Hour Building Energy Demand Profile
                </h3>
                <p className="text-xs text-slate-500">
                  Comparing Measured Actual Demand vs Dynamic ASHRAE/BEE Baseline vs AI Forecast.
                </p>
              </div>

              <div className="flex items-center space-x-4 text-xs font-medium">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                  <span className="text-slate-700">Actual (kW)</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-300 inline-block"></span>
                  <span className="text-slate-500">Baseline Target (kW)</span>
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="baselineKw"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fillOpacity={1}
                    fill="url(#colorBaseline)"
                    name="Baseline (kW)"
                  />
                  <Area
                    type="monotone"
                    dataKey="actualKw"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorActual)"
                    name="Actual Demand (kW)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
