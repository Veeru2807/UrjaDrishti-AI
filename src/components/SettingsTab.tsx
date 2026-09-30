import React from 'react';
import { BuildingConfig, ClimateZone, BuildingType } from '../types';
import { Settings, ShieldCheck, RotateCcw } from 'lucide-react';

interface SettingsTabProps {
  config: BuildingConfig;
  onChangeConfig: (newConfig: BuildingConfig) => void;
  onResetDefaults: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  config,
  onChangeConfig,
  onResetDefaults,
}) => {
  const climateZones: ClimateZone[] = ['Hot & Dry', 'Warm & Humid', 'Composite', 'Temperate', 'Cold'];
  const buildingTypes: BuildingType[] = [
    'Commercial Office',
    'School / College',
    'Residential Building',
    'Hotel',
    'Retail / Small Commercial',
    'Other',
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Facility Baseline Configuration &amp; Tariffs</h2>
            <p className="text-xs text-slate-500">Configure Indian climate zone, building typology, area, baseline EPI, and DISCOM tariff</p>
          </div>
        </div>

        <button
          onClick={onResetDefaults}
          className="px-3.5 py-2 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 flex items-center space-x-1.5 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Form Grid */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Building Name */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Building / Facility Name</label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => onChangeConfig({ ...config, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 font-medium"
            />
          </div>

          {/* Built-up Area */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Total Built-up Area (m²)</label>
            <input
              type="number"
              value={config.areaSqM}
              onChange={(e) => onChangeConfig({ ...config, areaSqM: parseFloat(e.target.value) || 1000 })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 font-medium"
            />
          </div>

          {/* Building Typology */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Building Typology</label>
            <select
              value={config.buildingType}
              onChange={(e) => onChangeConfig({ ...config, buildingType: e.target.value as BuildingType })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 font-medium"
            >
              {buildingTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Climate Zone */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Indian Climate Zone (NBC 2016)</label>
            <select
              value={config.climateZone}
              onChange={(e) => onChangeConfig({ ...config, climateZone: e.target.value as ClimateZone })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 font-medium"
            >
              {climateZones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>

          {/* Baseline Energy Intensity */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">
              Baseline Energy Performance Index (kWh/m²/year)
            </label>
            <input
              type="number"
              value={config.baselineEnergyIntensity}
              onChange={(e) =>
                onChangeConfig({ ...config, baselineEnergyIntensity: parseFloat(e.target.value) || 50 })
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 font-medium"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">Commercial office benchmark: ~140–180 kWh/m²/yr</span>
          </div>

          {/* Electricity Tariff */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Commercial Electricity Tariff (₹ / kWh)</label>
            <input
              type="number"
              step="0.1"
              value={config.electricityTariff}
              onChange={(e) =>
                onChangeConfig({ ...config, electricityTariff: parseFloat(e.target.value) || 5 })
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 font-medium"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">Indian commercial tariff range: ₹8.5 – ₹11.5/kWh</span>
          </div>

          {/* Grid Carbon Emission Factor */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Grid Emission Factor (kg CO₂ / kWh)</label>
            <input
              type="number"
              step="0.01"
              value={config.gridEmissionFactor}
              onChange={(e) =>
                onChangeConfig({ ...config, gridEmissionFactor: parseFloat(e.target.value) || 0.5 })
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 font-medium"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">CEA India national grid average: ~0.82 kg CO₂/kWh</span>
          </div>

          {/* HVAC Base Setpoint */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Standard HVAC Setpoint (°C)</label>
            <input
              type="number"
              step="0.5"
              value={config.hvacSetpoint}
              onChange={(e) => onChangeConfig({ ...config, hvacSetpoint: parseFloat(e.target.value) || 24 })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 font-medium"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">BEE statutory recommendation: 24.0°C – 25.0°C</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center space-x-2 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Updates here immediately re-calibrate the dynamic baseline, What-If simulator, and ROI calculators.</span>
        </div>
      </div>
    </div>
  );
};
