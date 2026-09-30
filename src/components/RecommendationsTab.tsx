import React, { useState } from 'react';
import { SmartRecommendation, BuildingConfig } from '../types';
import {
  Sparkles,
  Smile,
  CheckCircle2,
} from 'lucide-react';

interface RecommendationsTabProps {
  recommendations: SmartRecommendation[];
  onToggleApply: (recId: string) => void;
  config: BuildingConfig;
}

export const RecommendationsTab: React.FC<RecommendationsTabProps> = ({
  recommendations,
  onToggleApply,
  config,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredRecs =
    selectedCategory === 'all'
      ? recommendations
      : recommendations.filter((r) => r.category.toLowerCase() === selectedCategory.toLowerCase());

  const totalDailyKwhSaving = recommendations
    .filter((r) => r.applied)
    .reduce((acc, r) => acc + r.estimatedKwhPerDay, 0);

  const totalDailyCostSaving = recommendations
    .filter((r) => r.applied)
    .reduce((acc, r) => acc + r.estimatedCostPerDayRupees, 0);

  const totalPeakReduction = recommendations
    .filter((r) => r.applied)
    .reduce((acc, r) => acc + r.estimatedPeakReductionKw, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-cyan-50 border border-teal-200/80 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-teal-100 border border-teal-200 text-teal-700 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-extrabold text-slate-900">AI Energy Intelligence &amp; Action Center</h2>
              <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full border border-teal-200">
                Decision Support
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed font-medium">
              Automated anomaly detection identifies root-cause energy leaks, excessive standby power, and peak surges. Simulate or schedule intelligent recommendations.
            </p>
          </div>
        </div>

        {/* Applied Savings Counter */}
        <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center space-x-4 shrink-0 text-xs shadow-xs">
          <div>
            <span className="text-slate-500 block text-[10px] font-semibold">Simulated Daily Savings</span>
            <span className="font-extrabold text-emerald-700 text-sm">{totalDailyKwhSaving.toFixed(1)} kWh/day</span>
          </div>
          <div className="border-l border-slate-200 pl-3">
            <span className="text-slate-500 block text-[10px] font-semibold">Financial Impact</span>
            <span className="font-extrabold text-teal-700 text-sm">₹{totalDailyCostSaving.toLocaleString()}/day</span>
          </div>
          <div className="border-l border-slate-200 pl-3">
            <span className="text-slate-500 block text-[10px] font-semibold">Peak Shedding</span>
            <span className="font-extrabold text-purple-700 text-sm">{totalPeakReduction.toFixed(1)} kW</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {['all', 'HVAC', 'Lighting', 'Peak Demand', 'Equipment'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory.toLowerCase() === cat.toLowerCase()
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {cat} {cat === 'all' ? `(${recommendations.length})` : ''}
          </button>
        ))}
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredRecs.map((rec) => {
          return (
            <div
              key={rec.id}
              className={`p-5 rounded-xl border flex flex-col justify-between transition-all duration-200 shadow-xs ${
                rec.applied
                  ? 'bg-emerald-50/80 border-emerald-300 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border ${
                        rec.priority === 'High'
                          ? 'bg-rose-100 text-rose-800 border-rose-200'
                          : rec.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-blue-100 text-blue-800 border-blue-200'
                      }`}
                    >
                      {rec.priority} Priority
                    </span>
                    <span className="text-xs text-slate-600 font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-semibold">
                      {rec.category}
                    </span>
                  </div>

                  {rec.applied && (
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Optimized</span>
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-2.5">{rec.title}</h3>

                {/* Problem & Evidence */}
                <div className="mt-3 space-y-2 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-500 font-bold block text-[10px] uppercase tracking-wider mb-0.5">Problem &amp; Evidence</span>
                    <p className="text-slate-800 font-semibold">{rec.problem}</p>
                    <p className="text-slate-500 text-[11px] mt-1 italic">{rec.evidence}</p>
                  </div>

                  <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                    <span className="text-teal-800 font-bold block text-[10px] uppercase tracking-wider mb-0.5">Recommended Action</span>
                    <p className="text-teal-900 font-medium">{rec.recommendedAction}</p>
                  </div>
                </div>

                {/* Quantified Impact Grid */}
                <div className="grid grid-cols-3 gap-2 mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 block font-semibold">Energy Saving</span>
                    <span className="text-xs font-extrabold text-emerald-700">+{rec.estimatedKwhPerDay} kWh/d</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-semibold">Cost Benefit</span>
                    <span className="text-xs font-extrabold text-teal-700">₹{rec.estimatedCostPerDayRupees}/day</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-semibold">Peak Shed</span>
                    <span className="text-xs font-extrabold text-purple-700">-{rec.estimatedPeakReductionKw} kW</span>
                  </div>
                </div>

                {/* Comfort Assurance */}
                <div className="mt-3 flex items-start space-x-2 text-[11px] text-slate-600">
                  <Smile className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Comfort Impact:</strong> {rec.comfortImpact}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-200">
                <button
                  onClick={() => onToggleApply(rec.id)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    rec.applied
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                  }`}
                >
                  {rec.applied ? (
                    <span>Revert to Baseline Schedule</span>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Simulate / Apply Action</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
