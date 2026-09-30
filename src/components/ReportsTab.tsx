import React from 'react';
import { BuildingConfig, ZoneData, SmartRecommendation, RetrofitItem } from '../types';
import { SavingsSummary } from '../utils/calculations';
import {
  FileText,
  Printer,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';

interface ReportsTabProps {
  config: BuildingConfig;
  savings: SavingsSummary;
  zones: ZoneData[];
  recommendations: SmartRecommendation[];
  retrofits: RetrofitItem[];
}

export const ReportsTab: React.FC<ReportsTabProps> = ({
  config,
  savings,
  zones,
  recommendations,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Action Buttons */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Executive Building Energy Audit &amp; ESG Report</h2>
            <p className="text-xs text-slate-500">Formal energy audit summary, baseline compliance, verified savings &amp; retrofit roadmap</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center space-x-2 transition-all shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF Report</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-8 shadow-sm">
        {/* Document Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-slate-200 pb-6 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">UrjaDrishti</span>
              <span className="px-2 py-0.5 text-xs font-bold bg-emerald-50 text-emerald-800 rounded border border-emerald-200">AI</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">AI-Powered Energy Intelligence &amp; Conservation Report</p>
            <div className="mt-3 text-xs text-slate-700 space-y-1">
              <div><strong>Facility Name:</strong> {config.name}</div>
              <div><strong>Building Typology:</strong> {config.buildingType} ({config.areaSqM.toLocaleString()} m²)</div>
              <div><strong>Climate Zone:</strong> {config.climateZone} Climate (India NBC / ECBC)</div>
            </div>
          </div>

          <div className="text-left md:text-right text-xs text-slate-500 space-y-1">
            <div className="font-mono text-slate-900 font-bold">REPORT ID: UD-2026-0930</div>
            <div>Generated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div>Compliance: BEE Star Labeling / ECBC 2017</div>
            <div className="inline-block px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 font-bold mt-2 border border-emerald-200">
              Audit Status: Verified Simulation
            </div>
          </div>
        </div>

        {/* Section 1: Executive Energy Balance Matrix */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>1. Executive Energy &amp; Financial Summary</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px] font-semibold">Annual Baseline Energy</span>
              <span className="text-xl font-extrabold text-slate-900 mt-1 block">{savings.annualBaselineKwh.toLocaleString()} kWh</span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">{savings.baselineEnergyIntensity} kWh/m²/yr (EPI)</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px] font-semibold">Optimized Annual Energy</span>
              <span className="text-xl font-extrabold text-emerald-700 mt-1 block">{savings.annualSimulatedKwh.toLocaleString()} kWh</span>
              <span className="text-[10px] text-emerald-700 mt-0.5 block font-medium">{savings.optimizedEnergyIntensity} kWh/m²/yr ({savings.percentageSaved}% Saved)</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px] font-semibold">Annual Cost Reduction</span>
              <span className="text-xl font-extrabold text-teal-700 mt-1 block">₹{savings.annualMonetarySavingsRupees.toLocaleString()}</span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">@ ₹{config.electricityTariff}/kWh tariff</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px] font-semibold">Avoided Carbon Emissions</span>
              <span className="text-xl font-extrabold text-purple-700 mt-1 block">{savings.annualCo2ReductionTonnes} t CO₂e</span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">CEA factor: {config.gridEmissionFactor} kg/kWh</span>
            </div>
          </div>
        </div>

        {/* Section 2: Zone Performance Table */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-teal-600" />
            <span>2. Building Floor &amp; Zone Diagnostic Audit</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold">
                <tr>
                  <th className="p-3">Zone &amp; Floor</th>
                  <th className="p-3">Occupancy</th>
                  <th className="p-3">Temp (°C)</th>
                  <th className="p-3">CO₂ (ppm)</th>
                  <th className="p-3">Power (kW)</th>
                  <th className="p-3">Comfort Index</th>
                  <th className="p-3">Operational Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
                {zones.map((z) => (
                  <tr key={z.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{z.name}</td>
                    <td className="p-3">{z.occupancyPercent}% ({z.currentOccupants} pax)</td>
                    <td className="p-3">{z.temperature}°C</td>
                    <td className="p-3">{z.co2Ppm} ppm</td>
                    <td className="p-3 text-teal-700 font-bold">{z.totalKw} kW</td>
                    <td className="p-3 text-emerald-700 font-bold">{z.comfortScore}/100</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${z.hasAnomaly ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {z.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Priority Recommended Actions */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>3. Top AI Energy Conservation Opportunities</span>
          </h3>

          <div className="space-y-3">
            {recommendations.slice(0, 3).map((rec, i) => (
              <div key={rec.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-teal-700 font-bold">REC-0{i + 1}</span>
                    <h4 className="font-bold text-slate-900">{rec.title}</h4>
                    <span className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">{rec.category}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1">{rec.recommendedAction}</p>
                </div>
                <div className="flex items-center space-x-4 shrink-0 text-right">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Energy Saving</span>
                    <span className="font-bold text-emerald-700 text-xs">+{rec.estimatedKwhPerDay} kWh/d</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Financial ROI</span>
                    <span className="font-bold text-teal-700 text-xs">₹{rec.estimatedCostPerDayRupees}/d</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Sign-Off Footer */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Certified AI Modelled Audit Engine &bull; UrjaDrishti AI v1.0</span>
          </div>
          <div>BEE Certified Energy Auditor Simulation Signature: <strong>EA-9821-IND</strong></div>
        </div>
      </div>
    </div>
  );
};
