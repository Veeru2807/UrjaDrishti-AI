import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Layers,
  Smile,
  Sparkles,
  Zap,
  Sliders,
  Wrench,
  FileText,
  Settings,
  Cpu,
  ShieldCheck,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeAlertCount: number;
  recommendationsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  activeAlertCount,
  recommendationsCount,
}) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Energy Performance', icon: BarChart3 },
    { id: 'zones', label: 'Buildings / Zones', icon: Layers, badge: activeAlertCount > 0 ? `${activeAlertCount} alert` : undefined, badgeColor: 'bg-rose-100 text-rose-700 border border-rose-200' },
    { id: 'recommendations', label: 'AI Insights', icon: Sparkles, badge: recommendationsCount > 0 ? `${recommendationsCount} new` : undefined, badgeColor: 'bg-teal-100 text-teal-800 border border-teal-200' },
    { id: 'comfort', label: 'Comfort Intelligence', icon: Smile },
    { id: 'whatif', label: 'What-If Simulator', icon: Sliders },
    { id: 'grid', label: 'Peak & Grid', icon: Zap },
    { id: 'retrofit', label: 'Retrofit Advisor', icon: Wrench },
    { id: 'integration', label: 'System Architecture', icon: Cpu },
    { id: 'reports', label: 'Executive Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none shadow-xs">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-200 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Zap className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">UrjaDrishti</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded border border-emerald-200 tracking-wider">AI</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-none mt-1">Energy Intelligence</p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-175px)]">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigation Menu
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / System Status */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-700">Live Simulation</span>
          </div>
          <span className="text-[10px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">v1.0-MVP</span>
        </div>
        <div className="text-[11px] text-slate-500 flex items-center space-x-1.5 mt-1 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>BEE &amp; ASHRAE 55 Compliant</span>
        </div>
      </div>
    </aside>
  );
};
