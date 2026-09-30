import React from 'react';
import {
  Activity,
  Sparkles,
  AlertTriangle,
  Smile,
  Zap,
  Sliders,
  Wrench,
  ShieldCheck,
  ArrowRight,
  Workflow,
  CheckCircle2,
  Server,
  Cloud,
  Radio,
  Cpu,
  Layers,
  Thermometer,
  Wind,
  Droplets,
  Building,
} from 'lucide-react';
import { BuildingConfig } from '../types';

interface ServicesPageProps {
  config: BuildingConfig;
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ config, onNavigate }) => {
  return (
    <div className="space-y-20 md:space-y-28 pb-16 overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <section className="text-center pt-8 md:pt-14 space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
          <Cpu className="w-3.5 h-3.5 text-teal-600" />
          <span>Complete Platform Capabilities</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Intelligence for Every Layer of Your Building
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          UrjaDrishti AI combines disaggregated energy analytics, occupant comfort preservation, AI predictive forecasting, and peak grid demand optimization into one unified platform.
        </p>
      </section>

      {/* 8 Detailed Core Services */}
      <section className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* SERVICE 1: Energy Intelligence */}
          <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">Service 01</span>
                  <h3 className="text-lg font-bold text-slate-900">Energy Intelligence &amp; Disaggregation</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                Continuous visibility into building-wide consumption. Breaks down power draw into discrete subsystem loads (HVAC, Lighting, Plug Loads, Server infrastructure).
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Real-time power demand tracking in kW</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Energy Performance Index (EPI in kWh/m²/year) benchmarks</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Dynamic baseline comparison vs unoptimized models</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>TOD commercial tariff cost modeling (₹/kWh)</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              IPMVP Option C Whole Facility Verification Ready
            </div>
          </div>

          {/* SERVICE 2: AI Forecasting */}
          <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-teal-700 uppercase">Service 02</span>
                  <h3 className="text-lg font-bold text-slate-900">Predictive AI Energy Forecasting</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                Forward-looking energy models that anticipate next-hour demand and identify potential peak load periods hours in advance.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Next-hour predictive power load modeling</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Evening peak surge window anticipation (6 PM – 10 PM)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Weather-adjusted thermal load forecasting</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Architecture ready for XGBoost / ML integration</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              Visual: Actual &rarr; Forecast Confidence Horizon
            </div>
          </div>

          {/* SERVICE 3: Waste Detection */}
          <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-rose-700 uppercase">Service 03</span>
                  <h3 className="text-lg font-bold text-slate-900">Energy Waste &amp; Anomaly Detection</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                Intelligent correlation engine that identifies when equipment is consuming excess power relative to actual occupancy and ambient conditions.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>Over-cooling detection in low-occupancy suites</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>Daylight harvesting failures in perimeter zones</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>After-hours equipment standby power alerts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>Estimated financial loss per anomaly (₹/day)</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              Root-Cause Explanation &bull; Actionable Remediation
            </div>
          </div>

          {/* SERVICE 4: Occupant Comfort */}
          <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
                  <Smile className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-teal-700 uppercase">Service 04</span>
                  <h3 className="text-lg font-bold text-slate-900">Occupant Comfort &amp; IEQ Engine</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                Preserves indoor environmental quality (IEQ) so energy savings are never achieved by compromising human comfort or health.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>ASHRAE Standard 55 thermal comfort compliance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Real-time Relative Humidity (RH 40–60%) monitoring</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Indoor CO₂ concentration tracking (&le; 800 ppm threshold)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Transparent 0–100 composite comfort score</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-emerald-700 font-bold">
              Core Principle: "Minimize energy while guaranteeing occupant safety."
            </div>
          </div>

          {/* SERVICE 5: Smart Recommendations */}
          <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-700 uppercase">Service 05</span>
                  <h3 className="text-lg font-bold text-slate-900">Intelligent AI Recommendation Center</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                Provides facility managers with prioritized, decision-support action cards that detail exact problems, evidence, and savings.
              </p>

              <div className="space-y-2 mt-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900">Recommendation 01: HVAC Optimization</span>
                  <p className="text-slate-600 text-[11px] mt-0.5">Zone 2A low occupancy &bull; Potential: +38.5 kWh/day &bull; Comfort: Preserved</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900">Recommendation 02: Lighting Schedules</span>
                  <p className="text-slate-600 text-[11px] mt-0.5">Daylight auto-dimming Floor 3A &bull; Potential: +14.2 kWh/day</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              Decision-Support Engine &bull; Non-Intrusive Guidance
            </div>
          </div>

          {/* SERVICE 6: Peak & Grid Intelligence */}
          <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-purple-700 uppercase">Service 06</span>
                  <h3 className="text-lg font-bold text-slate-900">Peak Demand &amp; Grid Response (TOD)</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                Mitigates steep commercial peak demand surcharges by orchestrating non-critical flexible loads into off-peak windows.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>EV fleet charging bank night rescheduling (11 PM – 5 AM)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Basement water booster pumps off-peak dispatch</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Chiller thermal pre-cooling (3:30 PM – 5:30 PM)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Designed to support future DISCOM demand response</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-purple-700 font-bold font-mono">
              Peak Shaved: 94.2 kW &rarr; 81.8 kW (-12.4 kW)
            </div>
          </div>

          {/* SERVICE 7: What-If Simulation */}
          <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
                  <Sliders className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-teal-700 uppercase">Service 07</span>
                  <h3 className="text-lg font-bold text-slate-900">Digital What-If Scenario Sandbox</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                Enables facility engineers to test operational modifications before adjusting physical building systems.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Simulate HVAC setpoint shifts (e.g. 23°C &rarr; 25.5°C)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Model hybrid work occupancy variations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Instant Before vs After energy, cost, and comfort deltas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Solar PV capacity sizing and offset impact</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              Transparent Physical Formulas &bull; Zero Guesswork
            </div>
          </div>

          {/* SERVICE 8: Retrofit Intelligence */}
          <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-700 uppercase">Service 08</span>
                  <h3 className="text-lg font-bold text-slate-900">Retrofit &amp; Energy Conservation Advisor</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                Evaluates capital energy efficiency measures (ECMs) with configurable CAPEX costs, annual kWh savings, and exact payback periods.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>IoT Occupancy &amp; Environmental Sensor mesh (1.02 yr payback)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>VFDs on AHU fans and secondary chilled pumps (1.25 yr payback)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>50 kWp Rooftop Solar PV &amp; BESS battery integration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Central Open BACnet/Modbus BMS integration</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              BEE ECBC 2017 Retrofit Framework
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS ARCHITECTURE */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider font-mono">End-to-End Pipeline</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How the Data Architecture Works</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            From field-level Modbus meters to cloud analytics and automated setpoint dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <Radio className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-slate-900 block">1. Building Sensors</span>
            <p className="text-slate-500 text-[11px]">Meters, IoT CO₂/Temp/RH sensors, PIR occupancy.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <Server className="w-5 h-5 text-teal-600" />
            <span className="font-bold text-slate-900 block">2. Edge IoT Gateway</span>
            <p className="text-slate-500 text-[11px]">Modbus RTU / BACnet IP protocol translation.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <Cloud className="w-5 h-5 text-purple-600" />
            <span className="font-bold text-slate-900 block">3. UrjaDrishti AI Core</span>
            <p className="text-slate-500 text-[11px]">Physics baseline model &amp; anomaly engine.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <Cpu className="w-5 h-5 text-amber-600" />
            <span className="font-bold text-slate-900 block">4. Facility Dashboard</span>
            <p className="text-slate-500 text-[11px]">Actionable recommendations &amp; simulator UI.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <Zap className="w-5 h-5 text-teal-600" />
            <span className="font-bold text-slate-900 block">5. BMS &amp; Grid Action</span>
            <p className="text-slate-500 text-[11px]">Closed-loop setpoints &amp; peak load shifting.</p>
          </div>
        </div>
      </section>

      {/* RESPONSIBLE AI & TRANSPARENCY SECTION */}
      <section className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200/80 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-slate-900">Transparent by Design: Ethical &amp; Responsible AI</h3>
            <p className="text-xs text-slate-600">Our engineering commitments for the hackathon prototype and production deployments.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-white/90 rounded-xl border border-emerald-100 shadow-xs space-y-1.5">
            <span className="font-bold text-teal-800 block">1. Decision-Support Principle</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              UrjaDrishti AI presents recommendations as clear decision support for human facility managers rather than executing unmonitored blind overrides.
            </p>
          </div>

          <div className="p-4 bg-white/90 rounded-xl border border-emerald-100 shadow-xs space-y-1.5">
            <span className="font-bold text-emerald-800 block">2. Modelled Estimates Clearly Labelled</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              All prototype calculations, simulated baseline savings, and forecasts are explicitly marked as <em>Modelled Estimates</em> based on defined physical formulas.
            </p>
          </div>

          <div className="p-4 bg-white/90 rounded-xl border border-emerald-100 shadow-xs space-y-1.5">
            <span className="font-bold text-purple-800 block">3. Comfort Never Sacrificed</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Energy reduction algorithms hard-enforce ASHRAE 55 and NBC 2016 safety boundaries to guarantee occupant health, air freshness, and productivity.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            onClick={() => onNavigate('/dashboard')}
            className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 transition-all flex items-center space-x-2 shadow-md shadow-emerald-600/20"
          >
            <span>Open Interactive Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
