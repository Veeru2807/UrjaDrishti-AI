import React, { useState } from 'react';
import { BuildingConfig, ZoneData } from '../types';
import { User } from '../types/auth';
import {
  Building,
  MapPin,
  Sun,
  IndianRupee,
  RefreshCw,
  Bell,
  ChevronDown,
  Layers,
  PlusCircle,
  Sparkles,
  Sliders,
  Check,
  Building2,
  X,
  User as UserIcon,
  LogOut,
  Shield,
  Briefcase,
} from 'lucide-react';

interface HeaderProps {
  config: BuildingConfig;
  savedBuildings?: BuildingConfig[];
  user: User | null;
  activeTab: string;
  onRefresh: () => void;
  onOpenSettings: () => void;
  onChangeBuilding: () => void;
  onSwitchToDemo: () => void;
  onSelectSavedBuilding?: (building: BuildingConfig) => void;
  onLogout: () => void;
  onOpenProfile?: () => void;
  activeAlertCount: number;
  selectedFloor: number | 'all';
  onSelectFloor: (floor: number | 'all') => void;
  floorsList: number[];
}

export const Header: React.FC<HeaderProps> = ({
  config,
  savedBuildings = [],
  user,
  activeTab,
  onRefresh,
  onOpenSettings,
  onChangeBuilding,
  onSwitchToDemo,
  onSelectSavedBuilding,
  onLogout,
  onOpenProfile,
  activeAlertCount,
  selectedFloor,
  onSelectFloor,
  floorsList,
}) => {
  const [showBuildingDropdown, setShowBuildingDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const userInitials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
    : 'US';

  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview':
        return { title: 'Executive Building Dashboard', desc: 'Real-time power demand, consumption intensity, comfort tracking & savings analytics' };
      case 'analytics':
        return { title: 'Energy Performance & Disaggregation', desc: 'Detailed load decomposition, historical trends, baseline comparisons & sub-metering' };
      case 'zones':
        return { title: 'Buildings / Zones Floor Monitoring', desc: 'Micro-climate sensing, VAV state, localized occupant comfort & waste inspection' };
      case 'comfort':
        return { title: 'Indoor Environmental & Comfort Intelligence', desc: 'ASHRAE 55 / NBC thermal comfort, relative humidity, and indoor air quality indices' };
      case 'recommendations':
        return { title: 'AI Energy Intelligence & Action Center', desc: 'Automated anomaly root-cause detection, actionable recommendations, and ROI impact' };
      case 'grid':
        return { title: 'Peak Demand & Grid Response (TOD)', desc: 'Demand forecasting, DISCOM peak mitigation, and flexible load shifting simulator' };
      case 'whatif':
        return { title: 'Interactive What-If Scenario Simulator', desc: 'Model operational adjustments, setpoint shifts, and evaluate energy/comfort trade-offs' };
      case 'retrofit':
        return { title: 'Retrofit & Energy Conservation Advisor', desc: 'BEE/ECBC energy efficiency measures, capital budget payback, and CO₂ mitigation plans' };
      case 'integration':
        return { title: 'System Architecture & BMS Integration', desc: 'Enterprise data pipeline, BACnet/Modbus connectivity, and DISCOM ADR ready integration' };
      case 'reports':
        return { title: 'Executive Energy & Audit Reports', desc: 'Exportable compliance audits, ESG reporting, and quantified impact summaries' };
      case 'settings':
        return { title: 'Facility Configuration & Tariffs', desc: 'Building parameters, Indian climate zone selection, and baseline energy assumptions' };
      default:
        return { title: 'UrjaDrishti AI', desc: 'Intelligent Building Energy Management Platform' };
    }
  };

  const { title, desc } = getTabTitle();

  return (
    <header className="bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-6 py-3.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sticky top-0 z-30 shadow-2xs text-left">
      {/* Tab Title and Subtitle */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 font-mono font-bold">
            {config.isDemo ? 'DEMO DATA' : 'CONFIGURED'}
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">{desc}</p>
      </div>

      {/* Building Selector, Floor Selector, User Profile & Action Tools */}
      <div className="flex items-center flex-wrap gap-2.5">
        {/* ========================================================================= */}
        {/* 1. BUILDING SELECTOR WITH CHANGE BUILDING DROPDOWN */}
        {/* ========================================================================= */}
        <div className="relative">
          <button
            onClick={() => setShowBuildingDropdown(!showBuildingDropdown)}
            className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-800 font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <Building className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <div className="text-left leading-tight">
              <span className="font-extrabold text-slate-900 block">{config.name}</span>
              <span className="text-[10px] text-slate-500 font-mono">
                {config.buildingId || 'UD-001'} • {config.areaSqM.toLocaleString()} m²
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {/* Building Switcher Dropdown */}
          {showBuildingDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 space-y-3 animate-fadeIn text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900 font-mono uppercase">
                  Select Facility / Building
                </span>
                <button
                  onClick={() => setShowBuildingDropdown(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Saved Buildings List */}
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block px-1">
                  Saved Facilities ({savedBuildings.length})
                </span>
                {savedBuildings.map((bldg) => {
                  const isActive = bldg.id === config.id;
                  return (
                    <button
                      key={bldg.id}
                      onClick={() => {
                        if (onSelectSavedBuilding) {
                          onSelectSavedBuilding(bldg);
                        }
                        setShowBuildingDropdown(false);
                      }}
                      className={`w-full p-2.5 rounded-xl text-xs text-left transition-all cursor-pointer border flex items-center justify-between ${
                        isActive
                          ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 font-bold shadow-2xs'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-1.5">
                          <Building className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-slate-500'}`} />
                          <span className="font-extrabold">{bldg.name}</span>
                          {bldg.isDemo && (
                            <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-mono">DEMO</span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono pl-5">
                          {bldg.areaSqM.toLocaleString()} m² • {bldg.floorsCount || 3} Floors • {bldg.climateZone}
                        </p>
                      </div>

                      {isActive && (
                        <span className="text-[9px] font-mono font-bold bg-emerald-600 text-white px-1.5 py-0.5 rounded shrink-0">
                          ACTIVE ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Actions: Set Up New / Edit */}
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    onChangeBuilding();
                    setShowBuildingDropdown(false);
                  }}
                  className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 flex items-center space-x-2 transition-all cursor-pointer shadow-2xs"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Onboard Another New Building</span>
                </button>

                <button
                  onClick={() => {
                    onOpenSettings();
                    setShowBuildingDropdown(false);
                  }}
                  className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5 text-slate-600" />
                  <span>Edit Active Building Parameters</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. FLOOR SELECTOR DROPDOWN */}
        {/* ========================================================================= */}
        <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xl text-xs">
          <Layers className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span className="text-slate-500 font-medium">Floor:</span>
          <select
            value={selectedFloor}
            onChange={(e) => onSelectFloor(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="bg-transparent font-bold text-slate-900 focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Floors</option>
            {floorsList.map((fl) => (
              <option key={fl} value={fl}>
                Floor {fl}
              </option>
            ))}
          </select>
        </div>

        {/* Climate & Tariff Quick Badges */}
        <div className="hidden xl:flex items-center space-x-2 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xl text-xs text-slate-700 font-medium">
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-bold text-amber-800">{config.climateZone}</span>
          <span className="text-slate-300">|</span>
          <span className="font-bold text-teal-700">₹{config.electricityTariff}/kWh</span>
        </div>

        {/* Refresh Simulation */}
        <button
          onClick={onRefresh}
          title="Refresh Simulation Data"
          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors border border-slate-200 cursor-pointer shadow-2xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>

        {/* Anomaly Badge */}
        {activeAlertCount > 0 && (
          <div className="flex items-center space-x-1.5 bg-rose-50 border border-rose-200 px-2.5 py-1.5 rounded-xl text-xs text-rose-700 font-bold animate-pulse shadow-2xs">
            <Bell className="w-3.5 h-3.5 text-rose-600" />
            <span>{activeAlertCount} Anomalies</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. USER PROFILE AVATAR & DROPDOWN MENU */}
        {/* ========================================================================= */}
        {user && (
          <div className="relative border-l border-slate-200 pl-2.5 ml-1">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 p-1 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-slate-800 to-slate-900 text-white font-extrabold text-xs flex items-center justify-center border border-slate-700 shadow-2xs font-mono">
                {userInitials}
              </div>
              <div className="hidden sm:block text-left text-xs leading-tight">
                <span className="font-bold text-slate-900 block">{user.name}</span>
                <span className="text-[10px] text-slate-500">{user.organization || 'Facility Team'}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Dropdown Card */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 space-y-3 animate-fadeIn text-left">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-900">{user.name}</span>
                    {user.isDemo && (
                      <span className="text-[9px] font-mono font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                        DEMO MODE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono">{user.email}</p>
                  <div className="pt-1 flex items-center space-x-1 text-[10px] text-emerald-800 font-bold">
                    <Briefcase className="w-3 h-3 text-emerald-600" />
                    <span>{user.role || 'Energy Manager'}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  {onOpenProfile && (
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        onOpenProfile();
                      }}
                      className="w-full px-3 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 text-slate-700 flex items-center space-x-2 transition-all cursor-pointer"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-emerald-600" />
                      <span>My Profile &amp; Details</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onOpenSettings();
                      setShowProfileDropdown(false);
                    }}
                    className="w-full px-3 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 text-slate-700 flex items-center space-x-2 transition-all cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5 text-slate-500" />
                    <span>Account &amp; Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      onChangeBuilding();
                      setShowProfileDropdown(false);
                    }}
                    className="w-full px-3 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 text-slate-700 flex items-center space-x-2 transition-all cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Building Setup</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      onLogout();
                    }}
                    className="w-full px-3 py-2 rounded-lg text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 flex items-center space-x-2 transition-all cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-600" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

