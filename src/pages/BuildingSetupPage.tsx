import React, { useState } from 'react';
import {
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Layers,
  Zap,
  Sun,
  IndianRupee,
  Users,
  Info,
  HelpCircle,
  Building,
  Activity,
  Compass,
} from 'lucide-react';
import { BuildingConfig, BuildingType, ClimateZone } from '../types';
import { DEFAULT_BUILDING_CONFIG } from '../data/mockData';

interface BuildingSetupPageProps {
  onSelectBuilding: (config: BuildingConfig) => void;
  onNavigate: (path: string) => void;
}

export const BuildingSetupPage: React.FC<BuildingSetupPageProps> = ({
  onSelectBuilding,
  onNavigate,
}) => {
  // Form State
  const [name, setName] = useState('');
  const [buildingId, setBuildingId] = useState('');
  const [buildingType, setBuildingType] = useState<BuildingType>('Commercial Office');
  const [location, setLocation] = useState('');
  const [areaSqM, setAreaSqM] = useState<number | ''>('');
  const [floorsCount, setFloorsCount] = useState<number | ''>(3);
  const [climateZone, setClimateZone] = useState<ClimateZone>('Composite');
  const [electricityTariff, setElectricityTariff] = useState<number | ''>(9.5);
  const [typicalOccupancy, setTypicalOccupancy] = useState<number | ''>(75);

  // Validation & Submission State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [createdBuilding, setCreatedBuilding] = useState<BuildingConfig | null>(null);

  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    if (!name.trim()) errs.name = 'Building Name is required';
    if (!buildingId.trim()) errs.buildingId = 'Building ID is required';
    if (!location.trim()) errs.location = 'Location is required';
    if (!areaSqM || Number(areaSqM) <= 0) errs.areaSqM = 'Enter a valid floor area (> 0 m²)';
    if (!floorsCount || Number(floorsCount) <= 0) errs.floorsCount = 'Enter a valid number of floors (≥ 1)';
    if (electricityTariff && Number(electricityTariff) < 0) errs.electricityTariff = 'Tariff cannot be negative';
    if (typicalOccupancy && (Number(typicalOccupancy) < 0 || Number(typicalOccupancy) > 100)) {
      errs.typicalOccupancy = 'Occupancy must be between 0% and 100%';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newBuilding: BuildingConfig = {
      id: `bldg-${Date.now()}`,
      buildingId: buildingId.trim().toUpperCase(),
      name: name.trim(),
      buildingType,
      location: location.trim(),
      areaSqM: Number(areaSqM),
      floorsCount: Number(floorsCount) || 3,
      climateZone,
      baselineEnergyIntensity: 150,
      electricityTariff: Number(electricityTariff) || 9.5,
      typicalOccupancy: Number(typicalOccupancy) || 75,
      gridEmissionFactor: 0.82,
      operatingHoursStart: 8,
      operatingHoursEnd: 20,
      hvacSetpoint: 24,
      isDemo: false,
    };

    setCreatedBuilding(newBuilding);
  };

  const handleLaunchDashboard = (configToUse: BuildingConfig) => {
    onSelectBuilding(configToUse);
    onNavigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Building Onboarding &amp; Intelligence Setup</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Let's set up your building
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Add a few details to personalize your energy insights, or explore instantly with our pre-configured demo building.
        </p>
      </div>

      {/* Confirmation Modal Screen if Created */}
      {createdBuilding ? (
        <div className="max-w-xl mx-auto w-full bg-white border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Your building is ready!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              UrjaDrishti AI has initialized the thermal baseline and sub-metering framework.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase font-mono block">Building Name</span>
              <span className="font-bold text-slate-900 text-sm">{createdBuilding.name}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase font-mono block">Building ID</span>
              <span className="font-mono font-bold text-emerald-700 text-sm">{createdBuilding.buildingId}</span>
            </div>
            <div className="border-t border-slate-200 pt-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase font-mono block">Total Floor Area</span>
              <span className="font-bold text-slate-800">{createdBuilding.areaSqM.toLocaleString()} m² ({createdBuilding.floorsCount} Floors)</span>
            </div>
            <div className="border-t border-slate-200 pt-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase font-mono block">Climate &amp; Type</span>
              <span className="font-bold text-slate-800">{createdBuilding.climateZone} • {createdBuilding.buildingType}</span>
            </div>
          </div>

          <button
            onClick={() => handleLaunchDashboard(createdBuilding)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 cursor-pointer transition-all"
          >
            <span>Open Building Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Two Clear Entry Options: Option A (Form) vs Option B (Demo Card) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* ========================================================================= */}
          {/* OPTION A: SET UP MY BUILDING FORM (LEFT) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-left flex flex-col justify-between">
            <div className="space-y-1 border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Building2 className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Option A: Set Up My Building
                  </h2>
                  <p className="text-xs text-slate-500">
                    Enter your facility details to generate personalized baseline &amp; comfort analytics.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Building Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Building Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Infinity Tech Towers"
                    className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 ${
                      errors.name ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    }`}
                  />
                  {errors.name && <p className="text-[10px] text-rose-600 font-bold">{errors.name}</p>}
                </div>

                {/* Building ID */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Building ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={buildingId}
                    onChange={(e) => setBuildingId(e.target.value)}
                    placeholder="e.g. INF-TWR-01"
                    className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 font-mono ${
                      errors.buildingId ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    }`}
                  />
                  {errors.buildingId && <p className="text-[10px] text-rose-600 font-bold">{errors.buildingId}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Building Type */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Building Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value as BuildingType)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 cursor-pointer"
                  >
                    <option value="Commercial Office">Commercial Office</option>
                    <option value="School / College">School / College</option>
                    <option value="Residential Building">Residential Building</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Retail / Small Commercial">Retail / Small Commercial</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Location / City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Gurugram, NCR"
                    className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 ${
                      errors.location ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    }`}
                  />
                  {errors.location && <p className="text-[10px] text-rose-600 font-bold">{errors.location}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Total Floor Area */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Floor Area (m²) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={areaSqM}
                    onChange={(e) => setAreaSqM(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="e.g. 12500"
                    className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 font-mono ${
                      errors.areaSqM ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    }`}
                  />
                  {errors.areaSqM && <p className="text-[10px] text-rose-600 font-bold">{errors.areaSqM}</p>}
                </div>

                {/* Number of Floors */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Floors <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={floorsCount}
                    onChange={(e) => setFloorsCount(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="e.g. 5"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 font-mono"
                  />
                </div>

                {/* Climate Zone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Climate Zone <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={climateZone}
                    onChange={(e) => setClimateZone(e.target.value as ClimateZone)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 cursor-pointer"
                  >
                    <option value="Hot & Dry">Hot &amp; Dry</option>
                    <option value="Warm & Humid">Warm &amp; Humid</option>
                    <option value="Composite">Composite</option>
                    <option value="Temperate">Temperate</option>
                    <option value="Cold">Cold</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Electricity Tariff (Optional) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">Electricity Tariff (₹/kWh)</label>
                    <span className="text-[10px] text-slate-400 font-medium">Optional</span>
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={electricityTariff}
                    onChange={(e) => setElectricityTariff(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="9.50"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 font-mono"
                  />
                </div>

                {/* Typical Occupancy (Optional) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">Typical Occupancy (%)</label>
                    <span className="text-[10px] text-slate-400 font-medium">Optional</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={typicalOccupancy}
                    onChange={(e) => setTypicalOccupancy(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="75"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 cursor-pointer transition-all"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Create Building &amp; Start Analytics</span>
                </button>
              </div>
            </form>
          </div>

          {/* ========================================================================= */}
          {/* OPTION B: TRY DEMO BUILDING VISUAL CARD (RIGHT) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white border border-teal-800/60 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>✨ OPTION B: INSTANT DEMO</span>
                </div>

                <span className="text-[10px] font-mono font-bold bg-white/10 px-2 py-0.5 rounded border border-white/20 text-slate-300">
                  DEMO DATA
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Explore Pre-Configured Demo
                </h2>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Experience UrjaDrishti AI instantly with a fully modeled commercial office, real-time HVAC telemetry, ASHRAE 55 comfort engine &amp; TOD peak demand profiles.
                </p>
              </div>

              {/* Pre-configured Demo Building Spec Pill Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 backdrop-blur-xs text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-emerald-400" />
                    <span className="font-extrabold text-white text-sm">
                      {DEFAULT_BUILDING_CONFIG.name}
                    </span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">
                    {DEFAULT_BUILDING_CONFIG.buildingId}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">Total Floor Area</span>
                    <strong className="text-white">10,000 m² (5 Floors)</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">Climate Zone</span>
                    <strong className="text-amber-300">Composite Climate</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">Building Type</span>
                    <strong className="text-white">Commercial Office</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">Live Occupancy</span>
                    <strong className="text-teal-300">72% Average</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-300 font-mono">
                  <span>✓ 6 Monitored Zones</span>
                  <span>✓ ASHRAE 55 Engine</span>
                  <span>✓ TOD Tariff Model</span>
                </div>
              </div>
            </div>

            {/* Instant Demo Launch Button */}
            <div className="pt-6 relative z-10 space-y-2">
              <button
                onClick={() => handleLaunchDashboard(DEFAULT_BUILDING_CONFIG)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 cursor-pointer transition-all group"
              >
                <span>✨ Try Demo Building (1-Click Entry)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] text-center text-slate-400 italic">
                Recommended for hackathon judges &amp; quick walkthroughs.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
