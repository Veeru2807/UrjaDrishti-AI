import React, { useState } from 'react';
import { RetrofitItem, BuildingConfig } from '../types';
import {
  Wrench,
  ShieldCheck,
} from 'lucide-react';

interface RetrofitTabProps {
  retrofits: RetrofitItem[];
  config: BuildingConfig;
}

export const RetrofitTab: React.FC<RetrofitTabProps> = ({ retrofits, config }) => {
  const [selectedRetrofits, setSelectedRetrofits] = useState<string[]>([
    'ret-1',
    'ret-2',
    'ret-3',
  ]);

  const toggleSelect = (id: string) => {
    if (selectedRetrofits.includes(id)) {
      setSelectedRetrofits(selectedRetrofits.filter((item) => item !== id));
    } else {
      setSelectedRetrofits([...selectedRetrofits, id]);
    }
  };

  const activeItems = retrofits.filter((r) => selectedRetrofits.includes(r.id));
  const totalCapex = activeItems.reduce((acc, r) => acc + r.estimatedCapitalCostRupees, 0);
  const totalAnnualSavingRupees = activeItems.reduce((acc, r) => acc + r.expectedAnnualSavingRupees, 0);
  const combinedPaybackYears =
    totalAnnualSavingRupees > 0 ? (totalCapex / totalAnnualSavingRupees).toFixed(2) : '0';

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-cyan-50 border border-teal-200/80 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-teal-100 border border-teal-200 text-teal-700 shrink-0">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-extrabold text-slate-900">Retrofit &amp; Energy Conservation Measures (ECM) Advisor</h2>
              <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full border border-teal-200">
                BEE &amp; ECBC Aligned
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed font-medium">
              Evaluate capital upgrade investments including IoT sensors, VFDs, smart lighting, and rooftop solar. Select packages to calculate cumulative CAPEX, annual OPEX savings, carbon reduction, and exact payback periods.
            </p>
          </div>
        </div>

        {/* Selected Package Summary Pill */}
        <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center space-x-4 shrink-0 text-xs shadow-xs">
          <div>
            <span className="text-slate-500 block text-[10px] font-semibold">Total Investment (CAPEX)</span>
            <span className="font-extrabold text-slate-900 text-sm">₹{(totalCapex / 100000).toFixed(2)} Lakh</span>
          </div>
          <div className="border-l border-slate-200 pl-3">
            <span className="text-slate-500 block text-[10px] font-semibold">Annual Cost Saving</span>
            <span className="font-extrabold text-emerald-700 text-sm">₹{(totalAnnualSavingRupees / 100000).toFixed(2)} L/yr</span>
          </div>
          <div className="border-l border-slate-200 pl-3">
            <span className="text-slate-500 block text-[10px] font-semibold">Combined Payback</span>
            <span className="font-extrabold text-teal-700 text-sm">{combinedPaybackYears} Years</span>
          </div>
        </div>
      </div>

      {/* Retrofits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {retrofits.map((ret) => {
          const isSelected = selectedRetrofits.includes(ret.id);
          return (
            <div
              key={ret.id}
              onClick={() => toggleSelect(ret.id)}
              className={`p-5 rounded-xl border flex flex-col justify-between cursor-pointer transition-all duration-200 shadow-xs ${
                isSelected
                  ? 'bg-gradient-to-b from-teal-50/70 to-white border-teal-400 shadow-sm ring-1 ring-teal-400'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 uppercase">
                    {ret.category}
                  </span>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="w-4 h-4 accent-teal-600 rounded cursor-pointer"
                  />
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-3">{ret.name}</h3>
                
                <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                  <strong>Addresses:</strong> {ret.problemAddressed}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Est. CAPEX Cost</span>
                    <span className="font-bold text-slate-900">₹{(ret.estimatedCapitalCostRupees / 100000).toFixed(2)} Lakh</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Annual Savings</span>
                    <span className="font-bold text-emerald-700">₹{(ret.expectedAnnualSavingRupees / 1000).toFixed(0)}k /yr</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">Simple Payback</span>
                    <span className="font-bold text-teal-700">{ret.paybackYears} Years</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">CO₂ Abated</span>
                    <span className="font-bold text-purple-700">{ret.co2ReductionTonnes} t /yr</span>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-slate-500 font-medium">
                  <span className="text-slate-400">Applicability:</span> {ret.applicability}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    ret.priority === 'Immediate ROI'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : ret.priority === 'High Impact'
                      ? 'bg-teal-100 text-teal-800 border border-teal-200'
                      : 'bg-purple-100 text-purple-800 border border-purple-200'
                  }`}
                >
                  {ret.priority}
                </span>

                <span className="text-xs font-bold text-teal-700">
                  {isSelected ? '✓ Included in Package' : '+ Add to Evaluation'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ROI & Payback Formulation Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Configurable Retrofit Payback Formula &amp; Assumptions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Simple Payback Period Equation</span>
            <code className="text-teal-800 font-mono text-[11px] block bg-white border border-slate-200 p-2 rounded mb-2">
              Payback (Years) = Total Capital Cost (₹) / Annual Monetary Saving (₹/yr)
            </code>
            <p className="text-slate-600 text-[11px]">
              Annual Monetary Saving = Annual kWh Saved × Commercial Electricity Tariff (₹{config.electricityTariff}/kWh).
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Emission Mitigation Factor</span>
            <code className="text-purple-800 font-mono text-[11px] block bg-white border border-slate-200 p-2 rounded mb-2">
              CO₂ Avoided (t CO₂e) = (Annual kWh Saved × {config.gridEmissionFactor} kg/kWh) / 1000
            </code>
            <p className="text-slate-600 text-[11px]">
              Based on Indian Central Electricity Authority (CEA) grid baseline emission factor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
