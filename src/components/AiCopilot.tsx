import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  HelpCircle,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Building,
  CheckCircle2,
  Sliders,
  ChevronRight,
  Info,
} from 'lucide-react';
import { BuildingConfig, ZoneData } from '../types';

interface AiCopilotProps {
  config: BuildingConfig;
  zones: ZoneData[];
  onNavigateTab?: (tab: string) => void;
  onSelectZone?: (zoneId: string) => void;
}

interface CopilotResponse {
  question: string;
  observation: string;
  why: string;
  recommendation: string;
  estimatedImpact: string;
  actionTab?: string;
  highlightZoneId?: string;
}

const PRESET_QUERIES: CopilotResponse[] = [
  {
    question: 'Why is energy consumption high today?',
    observation: 'Energy use is 8% above the expected baseline today, predominantly driven by higher HVAC cooling in 2nd Floor Zone B.',
    why: 'Occupancy in Zone B is currently 31%, but HVAC chillers and AHUs are running at 68% full cooling capacity with an aggressive 22.5°C setpoint.',
    recommendation: 'Increase Zone B setpoint to 24.5°C and dial back fresh air damper intake to match current 31% occupancy.',
    estimatedImpact: 'Potential reduction: ~18 kWh/day (~₹180/day) with zero occupant comfort compromise.*',
    actionTab: 'zones',
    highlightZoneId: 'z-2a',
  },
  {
    question: 'Where are we wasting energy?',
    observation: 'Energy waste detected in Zone B (HVAC overcooling empty desks) and Zone A (after-hours perimeter lighting override).',
    why: 'HVAC schedules are operating on fixed timer mode rather than occupancy-correlated dynamic VAV airflow control.',
    recommendation: 'Enable AI dynamic occupancy setpoint setback and reset lighting schedule timer on 3rd floor.',
    estimatedImpact: 'Estimated waste elimination: ~32.4 kWh/day (₹9,720/month savings).*',
    actionTab: 'recommendations',
  },
  {
    question: 'What is causing our peak demand?',
    observation: 'Peak electricity demand reached 184 kW between 2:00 PM - 3:30 PM today, nearing the 190 kW contract kVA threshold.',
    why: 'Simultaneous operation of dual basement water booster pumps, 4x EV fleet chargers, and peak afternoon solar heat gain cooling load.',
    recommendation: 'Shift basement water pumping to off-peak morning hours (6:00 AM) and schedule EV charging to solar peak hours.',
    estimatedImpact: 'Peak demand reduction: 24 kW peak shaved, avoiding DISCOM TOD tariff surcharges (~₹14,500/month).*',
    actionTab: 'peakgrid',
  },
  {
    question: "How can we reduce tomorrow's energy use?",
    observation: 'Tomorrow ambient temperature in Delhi NCR composite zone is forecast to reach 37.8°C with elevated 68% humidity.',
    why: 'High external thermal gradient will create a sudden 28% surge in morning chiller startup power draw at 8:30 AM.',
    recommendation: 'Enable automated thermal pre-cooling from 6:30 AM to 8:00 AM using low-cost off-peak electricity (₹5.4/kWh).',
    estimatedImpact: 'Avoids 32 kW grid spike during high-rate hours and saves ~12% in daily cooling costs.*',
    actionTab: 'whatif',
  },
  {
    question: 'Which zone needs attention?',
    observation: 'Zone B (2nd Floor Open Workspace) requires immediate attention due to a thermal anomaly.',
    why: 'Zone temperature has dropped to 22.2°C causing 4 occupant cold complaints while consuming 18.7 kWh (38% above baseline).',
    recommendation: 'Inspect VAV damper calibration and raise thermostat setpoint to 24.5°C.',
    estimatedImpact: 'Restores comfort index to 95/100 and saves 18 kWh/day.*',
    actionTab: 'zones',
    highlightZoneId: 'z-2a',
  },
  {
    question: 'What happens if we change the HVAC setpoint?',
    observation: 'Adjusting whole-building cooling setpoint from 22.0°C to BEE-recommended 25.0°C.',
    why: 'Every 1°C increase in chiller thermostat setpoint reduces commercial compressor refrigeration load by approximately 6%.',
    recommendation: 'Adopt 24.5°C - 25.0°C standardized setpoint across all floors during working hours (9:00 AM - 6:00 PM).',
    estimatedImpact: 'Projected monthly savings: 14.8% reduction in total facility electricity bill (~₹24,200/month).*',
    actionTab: 'whatif',
  },
];

export const AiCopilot: React.FC<AiCopilotProps> = ({
  config,
  zones,
  onNavigateTab,
  onSelectZone,
}) => {
  const [selectedResponse, setSelectedResponse] = useState<CopilotResponse>(PRESET_QUERIES[0]);
  const [customInput, setCustomInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSelectPreset = (queryItem: CopilotResponse) => {
    setIsTyping(true);
    setTimeout(() => {
      setSelectedResponse(queryItem);
      setIsTyping(false);
    }, 250);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    setIsTyping(true);
    const query = customInput.toLowerCase();

    // Match keywords or provide structured intelligent synthesis
    setTimeout(() => {
      let matched = PRESET_QUERIES[0];
      if (query.includes('waste') || query.includes('loss') || query.includes('inefficient')) {
        matched = PRESET_QUERIES[1];
      } else if (query.includes('peak') || query.includes('demand') || query.includes('tod') || query.includes('tariff')) {
        matched = PRESET_QUERIES[2];
      } else if (query.includes('tomorrow') || query.includes('forecast') || query.includes('future') || query.includes('predict')) {
        matched = PRESET_QUERIES[3];
      } else if (query.includes('zone') || query.includes('floor') || query.includes('room') || query.includes('hvac')) {
        matched = PRESET_QUERIES[4];
      } else if (query.includes('setpoint') || query.includes('temperature') || query.includes('degree') || query.includes('comfort')) {
        matched = PRESET_QUERIES[5];
      } else {
        matched = {
          question: customInput,
          observation: `Analyzed building telemetry for ${config.name} (${config.areaSqM.toLocaleString()} m², ${config.climateZone} Climate).`,
          why: 'HVAC load accounts for 58% of active demand, followed by Lighting (18%) and Plug loads (14%).',
          recommendation: 'Focus on occupancy-aware chiller setpoint modulation and shifting flexible water pumping loads.',
          estimatedImpact: 'Simulated potential energy savings: 12% - 18% monthly electricity cost reduction.*',
          actionTab: 'whatif',
        };
      }
      setSelectedResponse(matched);
      setCustomInput('');
      setIsTyping(false);
    }, 300);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 md:p-6 shadow-sm space-y-5 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-extrabold text-slate-900">Ask UrjaDrishti — AI Energy Copilot</h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                Deterministic Model
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Get clear, business-focused answers about your building's energy performance in natural language.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
          <Info className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span>Transparent Simulated Intelligence</span>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
          Executive Suggested Inquiries
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_QUERIES.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(item)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left flex items-center space-x-1.5 ${
                selectedResponse.question === item.question
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <span>{item.question}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Chat Input Bar */}
      <form onSubmit={handleCustomSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Type any question about energy waste, peak demand, tariffs or comfort..."
            className="w-full pl-3.5 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 placeholder-slate-400"
          />
        </div>
        <button
          type="submit"
          disabled={!customInput.trim()}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-all cursor-pointer"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Structured Copilot Output Card */}
      <div className="p-4 md:p-5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-md space-y-4 border border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wide">
              {isTyping ? 'Synthesizing Telemetry...' : 'UrjaDrishti Intelligence Report'}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            {config.name} • {config.climateZone}
          </span>
        </div>

        {isTyping ? (
          <div className="py-6 text-center text-xs text-slate-400 font-mono animate-pulse">
            Analyzing building energy telemetry, occupancy profiles &amp; ASHRAE 55 envelopes...
          </div>
        ) : (
          <div className="space-y-3.5 text-xs">
            {/* Observation */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider font-mono flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>OBSERVATION</span>
              </span>
              <p className="text-slate-100 font-medium leading-relaxed pl-4 border-l-2 border-emerald-500">
                {selectedResponse.observation}
              </p>
            </div>

            {/* Why */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider font-mono flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span>WHY IT IS HAPPENING</span>
              </span>
              <p className="text-slate-200 leading-relaxed pl-4 border-l-2 border-amber-500">
                {selectedResponse.why}
              </p>
            </div>

            {/* Recommendation */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider font-mono flex items-center space-x-1">
                <Lightbulb className="w-3 h-3 text-cyan-400" />
                <span>RECOMMENDED ACTION</span>
              </span>
              <p className="text-slate-200 leading-relaxed pl-4 border-l-2 border-cyan-500">
                {selectedResponse.recommendation}
              </p>
            </div>

            {/* Estimated Impact & Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800">
              <div className="text-[11px] font-bold text-emerald-400 font-mono">
                {selectedResponse.estimatedImpact}
              </div>

              {selectedResponse.actionTab && onNavigateTab && (
                <button
                  onClick={() => {
                    if (selectedResponse.highlightZoneId && onSelectZone) {
                      onSelectZone(selectedResponse.highlightZoneId);
                    }
                    onNavigateTab(selectedResponse.actionTab!);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center space-x-1 transition-all cursor-pointer shadow-sm"
                >
                  <span>Execute in {selectedResponse.actionTab.toUpperCase()}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-800/80">
          * Modelled simulation estimate based on configured baseline, ASHRAE 55 thermal comfort envelopes and Indian TOD commercial tariff rules.
        </div>
      </div>
    </div>
  );
};
