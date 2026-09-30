import React from 'react';
import { Zap, ShieldCheck, ArrowUpRight, Award } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
              <span className="font-bold text-base text-white">UrjaDrishti AI</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              AI-Powered Energy Intelligence for Smarter Buildings. Transforming raw smart meter and IoT telemetry into measurable energy savings and preserved occupant comfort.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-1">
              <div className="flex items-center space-x-1.5 text-amber-400 font-semibold text-[11px]">
                <Award className="w-3.5 h-3.5" />
                <span>Yuva Yodha Energy Tech 2026</span>
              </div>
              <p className="text-[10px] text-slate-300">
                Challenge 02: Smart Buildings — Energy Efficiency & Occupant Experience
              </p>
            </div>
          </div>

          {/* Product Col */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Product Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-emerald-400 transition-colors">
                  Energy Analytics & Disaggregation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-emerald-400 transition-colors">
                  Waste & Anomaly Detection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-emerald-400 transition-colors">
                  Predictive Demand Forecasting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-emerald-400 transition-colors">
                  Occupant Comfort Engine (ASHRAE 55)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-emerald-400 transition-colors">
                  Peak Demand & Load Shifting (TOD)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-emerald-400 transition-colors">
                  What-If Building Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Col */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Compliance & Standards</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>BEE Energy Conservation Building Code</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>NBC 2016 Indian Climate Zones</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>ASHRAE Standard 55 Thermal Comfort</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>OpenADR 2.0b VEN Ready Architecture</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>CEA Grid Emission Factors (0.82 kg/kWh)</span>
              </li>
            </ul>
          </div>

          {/* Quick Nav Col */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Navigation & Demo</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-emerald-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-emerald-400 transition-colors">
                  Full Services & Capabilities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-emerald-400 transition-colors">
                  Get In Touch & FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/dashboard')}
                  className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors flex items-center space-x-1"
                >
                  <span>Launch Live Building Dashboard</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; 2026 UrjaDrishti AI &bull; Smart Building Energy Optimization Platform.
          </div>
          <div className="flex items-center space-x-4">
            <span>Prototype Version 1.0 (Hackathon MVP)</span>
            <span>&bull;</span>
            <span className="text-slate-300">Model Estimates &amp; Physics Simulation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
