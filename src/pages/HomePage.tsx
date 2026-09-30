import React, { useState } from 'react';
import {
  Zap,
  ArrowRight,
  TrendingDown,
  Smile,
  ShieldCheck,
  Sparkles,
  Layers,
  AlertTriangle,
  Sliders,
  CheckCircle2,
  Building,
  Activity,
  Cpu,
  Flame,
  Sun,
  IndianRupee,
  Compass,
  ChevronRight,
  Radio,
  Server,
  Cloud,
  Eye,
  Users,
  Award,
  BarChart3,
  Clock,
  MapPin,
  Maximize2,
  X,
} from 'lucide-react';
import { BuildingConfig } from '../types';
import { simulateWhatIf } from '../utils/calculations';

interface HomePageProps {
  config: BuildingConfig;
  onNavigate: (path: string) => void;
}

interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  location: string;
  area: string;
  image: string;
  statusBadge: string;
  verifiedSaving: string;
  financialSaving: string;
  compliance: string;
  summary: string;
  fullDescription: string;
  highlights: string[];
}

const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'cyber-city-tower',
    title: 'Orion Tech Park Campus',
    category: 'tech-park',
    categoryLabel: 'Tech Park Campus',
    location: 'CyberCity, Gurugram',
    area: '28,000 m²',
    image: '/real_tech_park.jpg',
    statusBadge: 'Telemetry Live',
    verifiedSaving: '19.4% Energy Reduction',
    financialSaving: '₹18.5 Lakhs / yr',
    compliance: 'BEE 5-Star & ECBC',
    summary: 'Multi-tenant commercial tech park with 1,200+ occupants. Dynamic baseline tracking and automated chiller setpoint scheduling.',
    fullDescription: 'Orion Tech Park deployed UrjaDrishti AI across 8 corporate office floors. By linking real-time weather forecasting with thermal inertia modeling, the facility achieved 19.4% overall electricity reduction while maintaining ASHRAE 55 compliance for international tech tenants.',
    highlights: [
      'Automated morning pre-cooling using off-peak tariff',
      'Dynamic sub-metering across lighting, HVAC & server rooms',
      'Continuous thermal comfort index scoring (avg. 93/100)',
      'DISCOM TOD peak demand threshold monitoring'
    ]
  },
  {
    id: 'innospace-iot-floor',
    title: 'InnoSpace Smart Workspaces',
    category: 'iot-indoor',
    categoryLabel: 'IoT & Indoor Air Quality',
    location: 'Indiranagar, Bengaluru',
    area: '12,500 m²',
    image: '/iot_workspace.jpg',
    statusBadge: 'ASHRAE 55 Optimal',
    verifiedSaving: '15.2% Energy Reduction',
    financialSaving: '₹8.9 Lakhs / yr',
    compliance: 'NBC 2016 & IAQ Standard',
    summary: 'Dense co-working workspace featuring wall-mounted IoT multi-sensors monitoring CO₂, PM2.5, VOC, and ambient temperature.',
    fullDescription: 'InnoSpace implemented UrjaDrishti AI IoT environmental nodes across open workstations and enclosed conference cabins. Smart PIR occupancy sensors detect meeting vacancies within 3 minutes and dynamically dial back airflow and LED lighting.',
    highlights: [
      'Multi-parameter air quality telemetry (CO₂ < 650 ppm)',
      'Occupancy-correlated fresh air damper modulation',
      'Eliminated simultaneous cooling and reheating waste',
      'Mobile tablet walkthrough diagnostics for facility staff'
    ]
  },
  {
    id: 'apex-chiller-plant',
    title: 'Apex Central Chiller Plant',
    category: 'hvac-plant',
    categoryLabel: 'Central Chiller Automation',
    location: 'BKC, Mumbai',
    area: '45,000 m²',
    image: '/facility_control.jpg',
    statusBadge: 'BMS Modbus Sync',
    verifiedSaving: '22.8% HVAC Power Saved',
    financialSaving: '₹31.2 Lakhs / yr',
    compliance: 'BACnet / Modbus RTU',
    summary: 'Central chilled water plant with 3x water-cooled chillers, VFD secondary distribution pumps, and cooling tower optimization.',
    fullDescription: 'At the Apex commercial complex, UrjaDrishti AI interfaces directly with the central BMS via BACnet/IP. Predictive load dispatch dynamically selects the most efficient chiller staging combination based on ambient wet-bulb temperatures and upcoming floor load predictions.',
    highlights: [
      'Chilled water delta-T syndrome mitigation',
      'Predictive condenser water temperature optimization',
      'VFD pump speed modulation with pressure differential feedback',
      '85 kVA instantaneous peak demand reduction'
    ]
  },
  {
    id: 'trinetra-energy-team',
    title: 'Trinetra Corporate Facility Team',
    category: 'iot-indoor',
    categoryLabel: 'On-Site Operations',
    location: 'Sector 62, Noida',
    area: '18,000 m²',
    image: '/energy_manager_team.jpg',
    statusBadge: 'Proactive Alerting',
    verifiedSaving: '16.8% Energy Reduction',
    financialSaving: '₹12.4 Lakhs / yr',
    compliance: 'ISO 50001 Certified',
    summary: 'Empowering on-site facility engineers and energy audit managers with real-time tablet analytics and AI anomaly root cause diagnostics.',
    fullDescription: 'The Trinetra engineering team uses UrjaDrishti AI during daily facility rounds. Automated anomaly detection flags drifting thermostat calibrations, stuck dampers, and after-hours lighting overrides within minutes rather than weeks.',
    highlights: [
      'Instant zone anomaly detection (< 15 min mean time to detect)',
      'Actionable recommendations with estimated ROI',
      'Print-ready monthly energy audit reports',
      'Occupant comfort feedback integration'
    ]
  },
  {
    id: 'solarpv-microgrid',
    title: 'Cyber Skyline 250 kWp Solar Array',
    category: 'solar',
    categoryLabel: 'Rooftop Solar & Grid',
    location: 'HITEC City, Hyderabad',
    area: '3,200 m² Rooftop',
    image: '/solar_rooftop.jpg',
    statusBadge: 'Net-Metered Live',
    verifiedSaving: '365,000 kWh / yr Generated',
    financialSaving: '₹26.5 Lakhs / yr',
    compliance: 'CEA Grid Standard & TOD',
    summary: 'Commercial rooftop solar photovoltaic installation synchronized with smart building load management and TOD tariff shifting.',
    fullDescription: 'Cyber Skyline integrates 250 kWp of rooftop mono-PERC solar PV with UrjaDrishti AI demand-response intelligence. Water pumping, EV charging stations, and chiller pre-cooling are scheduled to maximize direct solar self-consumption during peak solar hours (11:00 AM - 3:00 PM).',
    highlights: [
      'Solar self-consumption maximized to 94.2%',
      'EV fleet charging dynamically aligned with solar output',
      'Inverter string health monitoring and generation forecasting',
      'Avoided peak afternoon DISCOM draw penalties'
    ]
  },
  {
    id: 'ecovista-facade',
    title: 'EcoVista High-Performance Complex',
    category: 'tech-park',
    categoryLabel: 'High-Performance Facade',
    location: 'Kharadi, Pune',
    area: '22,000 m²',
    image: '/smart_building.jpg',
    statusBadge: 'Daylight Harvesting',
    verifiedSaving: '17.6% Energy Reduction',
    financialSaving: '₹14.1 Lakhs / yr',
    compliance: 'IGBC Platinum Ready',
    summary: 'Double-glazed Low-E glass facade commercial headquarters with automated daylight harvesting and perimeter zone thermal balancing.',
    fullDescription: 'EcoVista combines high-performance architectural glass with UrjaDrishti AI solar angle tracking. Perimeter HVAC zones dynamically adjust airflow based on direct solar radiation intensity, preventing uncomfortable hotspots and uneven floor temperatures.',
    highlights: [
      'Dynamic perimeter vs core zone cooling differentiation',
      'Automated daylight harvesting saving 38% lighting energy',
      '142 Metric Tonnes CO₂e annual carbon abatement',
      'Full compliance with ECBC SuperECBC specifications'
    ]
  }
];

export const HomePage: React.FC<HomePageProps> = ({ config, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const [hvacSetpoint, setHvacSetpoint] = useState(25.0);
  const [occupancyPct, setOccupancyPct] = useState(65);
  const [lightingHours, setLightingHours] = useState(11);
  const [preCooling, setPreCooling] = useState(true);

  const filteredPortfolio = selectedCategory === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  const previewSim = simulateWhatIf(config, {
    hvacSetpoint,
    occupancyPct,
    lightingHours,
    operatingHours: 10,
    preCoolingEnabled: preCooling,
    evSmartChargingShift: true,
    rooftopSolarKw: 25,
    climateZone: config.climateZone,
  });

  return (
    <div className="space-y-20 md:space-y-28 pb-16 overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH REAL-LIFE COMMERCIAL TECH PARK PHOTOGRAPHY */}
      {/* ========================================================================= */}
      <section className="relative pt-8 md:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-100/60 via-teal-100/40 to-transparent blur-3xl pointer-events-none rounded-full"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Text & CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Yuva Yodha Energy Tech Hackathon 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              See Energy. <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent">
                Save Energy.
              </span> <br />
              Build Smarter.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              UrjaDrishti AI transforms raw building data into actionable energy intelligence — helping facility managers reduce waste, maintain occupant comfort, and make smarter operational decisions.
            </p>

            {/* CTAs: Set Up My Building + Try Demo + How it Works */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('/onboarding')}
                className="px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 cursor-pointer group"
              >
                <span>Set Up My Building</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('/dashboard')}
                className="px-5 py-3.5 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>✨ Try Demo</span>
              </button>

              <button
                onClick={() => onNavigate('/services')}
                className="px-5 py-3.5 rounded-xl text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>How It Works</span>
              </button>
            </div>

            {/* Live Indicator Strip */}
            <div className="pt-4 flex items-center space-x-6 text-xs text-slate-500 border-t border-slate-200">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-slate-700">BEE &amp; ECBC Aligned</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Smile className="w-4 h-4 text-teal-600" />
                <span className="font-medium text-slate-700">ASHRAE 55 Comfort Safe</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-slate-700">OpenADR 2.0b Ready</span>
              </div>
            </div>
          </div>

          {/* Right: Authentic Real-Life Commercial Tech Park Photo with Portfolio Glass Card Overlays */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xl overflow-hidden group">
              {/* Real Life Building Photo */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src="/real_tech_park.jpg"
                  alt="Real Life Commercial Tech Park Campus in India"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>

                {/* Top Campus Badge */}
                <div className="absolute top-3 left-3 flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-bold text-slate-900">UrjaDrishti Demo Campus (10,000 m²)</span>
                </div>

                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg shadow-md flex items-center space-x-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Real-Time Ingestion</span>
                </div>

                {/* Floating Real-Time Stat Card 1 (Top Right) */}
                <div className="absolute top-16 right-4 bg-slate-900/90 backdrop-blur-md border border-emerald-400/40 text-white p-2.5 rounded-xl shadow-xl flex items-center space-x-2.5 animate-bounce" style={{ animationDuration: '4s' }}>
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                  <div className="text-left text-xs">
                    <span className="text-[10px] text-emerald-300 font-bold block leading-none">Verified Savings</span>
                    <span className="font-extrabold font-mono text-white text-xs">16.5% Saved (BEE EPI)</span>
                  </div>
                </div>

                {/* Floating Real-Time Stat Card 2 (Bottom Left) */}
                <div className="absolute bottom-16 left-4 bg-slate-900/90 backdrop-blur-md border border-rose-500/50 text-white p-2.5 rounded-xl shadow-xl flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 animate-pulse">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="text-left text-xs">
                    <span className="text-[10px] text-rose-300 font-bold block leading-none">Floor 2A Anomaly</span>
                    <span className="font-extrabold text-white text-xs">HVAC Overcooling Fixed</span>
                  </div>
                </div>

                {/* Bottom Live Telemetry Pill Bar */}
                <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200/90 flex items-center justify-between shadow-lg text-xs">
                  <div className="flex items-center space-x-4">
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">Active Demand</span>
                      <span className="font-extrabold text-slate-900 text-sm">62.4 kW</span>
                    </div>
                    <div className="border-l border-slate-200 pl-4">
                      <span className="text-[10px] text-slate-500 font-semibold block">Comfort Index</span>
                      <span className="font-extrabold text-emerald-700 text-sm">92 / 100</span>
                    </div>
                    <div className="border-l border-slate-200 pl-4 hidden sm:block">
                      <span className="text-[10px] text-slate-500 font-semibold block">Occupancy</span>
                      <span className="font-extrabold text-teal-700 text-sm">65% Live</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('/dashboard')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1 cursor-pointer transition-all shadow-xs"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRUST / VALUE STRIP */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Energy Intelligence</h3>
              <p className="text-xs text-slate-500 mt-0.5">Real-time disaggregated sub-metering &amp; dynamic baseline tracking</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 shrink-0">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Comfort Monitoring</h3>
              <p className="text-xs text-slate-500 mt-0.5">ASHRAE 55 and NBC 2016 thermal &amp; air quality preservation</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">AI Recommendations</h3>
              <p className="text-xs text-slate-500 mt-0.5">Automated waste root-cause diagnosis &amp; simulated ROI actions</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Peak Demand Insights</h3>
              <p className="text-xs text-slate-500 mt-0.5">DISCOM TOD tariff mitigation &amp; flexible load shifting schedules</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2.5 REAL-LIFE PORTFOLIO SHOWCASE: LIVE FIELD DEPLOYMENTS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
          <div className="space-y-2 max-w-2xl text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Live Deployments &amp; Portfolio Gallery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Real Buildings. Real Engineers. <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Proven Energy Intelligence.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore how UrjaDrishti AI powers Indian commercial tech parks, chiller plants, IoT workspace floors, and rooftop solar microgrids in production.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'tech-park', label: 'Tech Parks & Facades' },
              { id: 'iot-indoor', label: 'IoT & Indoor Air' },
              { id: 'hvac-plant', label: 'Central HVAC Plant' },
              { id: 'solar', label: 'Rooftop Solar' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProject(item)}
              className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              {/* Image Container with Live Badges */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent"></div>

                {/* Top Left Tag */}
                <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200/90 shadow-sm">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span className="text-[11px] font-bold text-slate-800">{item.location}</span>
                </div>

                {/* Top Right Live Telemetry Indicator */}
                <div className="absolute top-3 right-3 flex items-center space-x-1.5 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{item.statusBadge}</span>
                </div>

                {/* Bottom Overlay Metric Pill */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                  <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg px-2.5 py-1 text-white text-xs font-semibold">
                    <span className="text-[10px] text-emerald-400 block font-bold leading-tight">Verified Impact</span>
                    <span className="font-bold text-xs">{item.verifiedSaving}</span>
                  </div>

                  <span className="p-2 rounded-lg bg-white/90 text-slate-800 backdrop-blur-md group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 font-mono">
                      {item.categoryLabel}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono font-medium">{item.area}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                </div>

                {/* Card Footer Features */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.compliance}</span>
                  </span>
                  <span className="text-emerald-700 font-bold group-hover:translate-x-0.5 transition-transform flex items-center">
                    Case Study <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Project Case Study Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-0 text-left">
              {/* Modal Photo Header */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-all cursor-pointer border border-white/20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400 text-emerald-300 text-[10px] font-mono font-bold">
                      {selectedProject.categoryLabel}
                    </span>
                    <span className="text-xs text-slate-300 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{selectedProject.location}</span>
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {selectedProject.fullDescription}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-left">
                    <span className="text-[10px] font-bold uppercase text-emerald-800 block">Verified Savings</span>
                    <span className="text-base font-extrabold text-emerald-900 font-mono">{selectedProject.verifiedSaving}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-teal-50/80 border border-teal-200 text-left">
                    <span className="text-[10px] font-bold uppercase text-teal-800 block">Facility Area</span>
                    <span className="text-base font-extrabold text-teal-900 font-mono">{selectedProject.area}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-50/80 border border-purple-200 text-left col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold uppercase text-purple-800 block">Annual Financial Impact</span>
                    <span className="text-base font-extrabold text-purple-900 font-mono">{selectedProject.financialSaving}</span>
                  </div>
                </div>

                {/* Architectural & Protocol Highlights */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                    Key Implementation Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProject.highlights.map((h: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
                  <span className="text-xs text-slate-500 font-mono">
                    Deployment Status: <strong className="text-emerald-700">Active Telemetry Stream</strong>
                  </span>
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        onNavigate('/dashboard');
                      }}
                      className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <span>Open in Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 3. PROBLEM SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider font-mono">The Building Dilemma</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Buildings consume energy. <br className="hidden sm:inline" />
            <span className="text-slate-500">But do they understand it?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Most commercial and institutional buildings operate on static schedules. Over-cooling empty rooms and unmanaged peak demand result in huge financial waste and unnecessary carbon emissions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-3">
            <div className="p-2.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 w-fit">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Hidden Energy Waste</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              HVAC chillers and lighting running at 100% capacity in zones with only 5% to 10% occupancy during post-meeting or off-peak hours.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-3">
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-100 w-fit">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Poor Sub-Meter Visibility</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Single aggregated monthly electricity bills without visibility into whether chillers, lighting, or plug loads drove unexpected bill spikes.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-3">
            <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600 border border-purple-100 w-fit">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Severe Peak Demand Penalties</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Uncoordinated simultaneous operation of EV chargers and water pumps triggering expensive DISCOM TOD peak surcharges and kVA penalties.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-3">
            <div className="p-2.5 rounded-lg bg-teal-50 text-teal-600 border border-teal-100 w-fit">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Occupant Discomfort</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Blind energy curtailment that saves power at the expense of occupant thermal comfort, humidity control, or elevated CO₂ drowsiness.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SOLUTION / WORKFLOW SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-mono">The Intelligent Solution</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            From Building Data to Better Decisions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A continuous closed-loop workflow that ensures energy reduction without compromising occupant comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          <div className="p-4 bg-white border border-slate-200/90 rounded-xl relative flex flex-col justify-between space-y-3 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">01</span>
                <Radio className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Measure</h3>
              <p className="text-xs text-slate-500 mt-1">
                Collect IoT sub-meters, PIR occupancy, temperature, humidity, and CO₂ telemetry in real-time.
              </p>
            </div>
            <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100">Field Telemetry</div>
          </div>

          <div className="p-4 bg-white border border-slate-200/90 rounded-xl relative flex flex-col justify-between space-y-3 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">02</span>
                <Activity className="w-4 h-4 text-teal-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Understand</h3>
              <p className="text-xs text-slate-500 mt-1">
                Disaggregate consumption across HVAC, lighting, and plug loads against dynamic baseline standards.
              </p>
            </div>
            <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100">Load Disaggregation</div>
          </div>

          <div className="p-4 bg-white border border-slate-200/90 rounded-xl relative flex flex-col justify-between space-y-3 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">03</span>
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Predict</h3>
              <p className="text-xs text-slate-500 mt-1">
                Forecast next-hour power demand and anticipate evening DISCOM peak surges using weather models.
              </p>
            </div>
            <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100">Demand Forecasting</div>
          </div>

          <div className="p-4 bg-white border border-slate-200/90 rounded-xl relative flex flex-col justify-between space-y-3 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">04</span>
                <Sliders className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Optimize</h3>
              <p className="text-xs text-slate-500 mt-1">
                Generate comfort-preserving recommendations: setpoint adjustments, auto-dimming &amp; load shifting.
              </p>
            </div>
            <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100">Action Recommendations</div>
          </div>

          <div className="p-4 bg-white border border-slate-200/90 rounded-xl relative flex flex-col justify-between space-y-3 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">05</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Verify</h3>
              <p className="text-xs text-slate-500 mt-1">
                Quantify verified kWh reductions, cost savings, and ESG carbon abatement against BEE benchmarks.
              </p>
            </div>
            <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100">Audit &amp; Compliance</div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. KEY FEATURES GRID */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider font-mono">Platform Capabilities</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Understand Your Building
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A comprehensive suite of tools built specifically for Indian commercial and institutional facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-all space-y-2 group">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 w-fit group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Energy Analytics</h3>
            <p className="text-xs text-slate-500">
              Disaggregated sub-metering, energy intensity (EPI in kWh/m²), and baseline variance tracking.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-teal-400 transition-all space-y-2 group">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-600 w-fit group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">AI Demand Forecasting</h3>
            <p className="text-xs text-slate-500">
              Lightweight predictive model estimating next-hour demand, daily totals, and evening peaks.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-rose-400 transition-all space-y-2 group">
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600 w-fit group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Waste &amp; Anomaly Detection</h3>
            <p className="text-xs text-slate-500">
              Pinpoints over-cooling in empty suites, lighting during daylight, and after-hours standby leaks.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-all space-y-2 group">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 w-fit group-hover:scale-110 transition-transform">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Comfort Monitoring</h3>
            <p className="text-xs text-slate-500">
              Live ASHRAE 55 scoring (0–100) based on localized temperature, humidity, and CO₂ levels.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-amber-400 transition-all space-y-2 group">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600 w-fit group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Smart Action Center</h3>
            <p className="text-xs text-slate-500">
              Prioritized recommendations with quantified daily kWh savings, cost benefits, and comfort impact.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-purple-400 transition-all space-y-2 group">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600 w-fit group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Peak &amp; Grid Response</h3>
            <p className="text-xs text-slate-500">
              TOD tariff optimization, flexible load identification (EV/pumps), and peak shaving schedules.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-teal-400 transition-all space-y-2 group">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-600 w-fit group-hover:scale-110 transition-transform">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">What-If Simulation</h3>
            <p className="text-xs text-slate-500">
              Interactive physics sandbox to model setpoint shifts, schedules, and solar additions before rollout.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all space-y-2 group">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 w-fit group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Retrofit Advisor</h3>
            <p className="text-xs text-slate-500">
              Evaluates CAPEX, annual savings, and simple payback for VFDs, IoT sensors, DALI, and Solar PV.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. INTERACTIVE WHAT-IF PREVIEW ON HOMEPAGE */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  What happens if you change how your building operates?
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Interact with the model knobs below to simulate instantaneous energy, cost, peak demand, and comfort trade-offs.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 self-start md:self-auto">
              Simulation / Modelled Estimate
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-6 space-y-5">
              {/* Setpoint Slider */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-700 font-bold">HVAC Setpoint (°C)</span>
                  <span className="text-emerald-700 font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{hvacSetpoint}°C</span>
                </div>
                <input
                  type="range"
                  min="21"
                  max="27"
                  step="0.5"
                  value={hvacSetpoint}
                  onChange={(e) => setHvacSetpoint(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>21°C (Chilled)</span>
                  <span>24°C (BEE Standard)</span>
                  <span>27°C (Warm)</span>
                </div>
              </div>

              {/* Occupancy Slider */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-700 font-bold">Building Occupancy Level</span>
                  <span className="text-teal-700 font-bold font-mono bg-teal-50 px-2 py-0.5 rounded border border-teal-200">{occupancyPct}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={occupancyPct}
                  onChange={(e) => setOccupancyPct(parseInt(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              {/* Lighting Hours */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-700 font-bold">Active Lighting Schedule</span>
                  <span className="text-amber-700 font-bold font-mono bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{lightingHours} hrs/day</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="16"
                  step="1"
                  value={lightingHours}
                  onChange={(e) => setLightingHours(parseInt(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              {/* Pre-cooling Toggle */}
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <span className="text-xs text-slate-700 font-semibold">Thermal Pre-Cooling Peak Shaving (3:30–5 PM)</span>
                <input
                  type="checkbox"
                  checked={preCooling}
                  onChange={(e) => setPreCooling(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
              </label>
            </div>

            {/* Calculated Simulated Output */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 block font-semibold">Daily Energy Savings</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1 block">
                  {previewSim.energyDiffPct}%
                </span>
                <span className="text-[11px] text-emerald-700 font-medium mt-0.5 block">
                  -{previewSim.energyDiffKwh} kWh/day
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 block font-semibold">Peak Demand Shaved</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-purple-700 mt-1 block">
                  {previewSim.peakAfterKw} kW
                </span>
                <span className="text-[11px] text-purple-700 font-medium mt-0.5 block">
                  -{previewSim.peakDiffKw} kW peak reduction
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 block font-semibold">Comfort Index</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-teal-600 mt-1 block">
                  {previewSim.comfortAfterScore} / 100
                </span>
                <span className="text-[11px] text-teal-700 font-medium mt-0.5 block">
                  ASHRAE 55 Optimal
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 block font-semibold">Cost Saved / Year</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1 block">
                  ₹{((previewSim.costSavingsRupees * 330) / 100000).toFixed(1)}L
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  @ ₹{config.electricityTariff}/kWh tariff
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. INDIA DIVERSE CLIMATE CONTEXT */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider font-mono">National Context</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for India's Diverse Building Landscape
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Energy behavior and cooling requirements vary significantly across India's 5 official climatic zones and building typologies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
            <span className="text-xs font-bold text-amber-600 block font-mono">Hot &amp; Dry</span>
            <p className="text-[11px] font-semibold text-slate-800">Delhi, Rajasthan, Gujarat</p>
            <p className="text-[11px] text-slate-500 leading-tight">Focus on extreme sensible cooling, precooling, and solar PV integration.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
            <span className="text-xs font-bold text-teal-600 block font-mono">Warm &amp; Humid</span>
            <p className="text-[11px] font-semibold text-slate-800">Mumbai, Chennai, Kolkata</p>
            <p className="text-[11px] text-slate-500 leading-tight">Prioritizes latent cooling and precise relative humidity control (45–60%).</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
            <span className="text-xs font-bold text-emerald-600 block font-mono">Composite</span>
            <p className="text-[11px] font-semibold text-slate-800">Central India, Hyderabad</p>
            <p className="text-[11px] text-slate-500 leading-tight">Adapts to sharp seasonal shifts between summer cooling and winter schedules.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
            <span className="text-xs font-bold text-cyan-700 block font-mono">Temperate</span>
            <p className="text-[11px] font-semibold text-slate-800">Bengaluru, Pune</p>
            <p className="text-[11px] text-slate-500 leading-tight">Maximizes natural ventilation &amp; economizer free-cooling cycles.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
            <span className="text-xs font-bold text-blue-600 block font-mono">Cold</span>
            <p className="text-[11px] font-semibold text-slate-800">Himachal, J&amp;K, Uttarakhand</p>
            <p className="text-[11px] text-slate-500 leading-tight">Optimizes thermal envelope retention &amp; heating energy efficiency.</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FINAL CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl text-white relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Turn Building Data Into Better Decisions.
            </h2>
            <p className="text-sm sm:text-base text-emerald-50">
              Understand where energy is being used, identify opportunities for improvement, and explore smarter building operations with UrjaDrishti AI.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/dashboard')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-white text-slate-900 hover:bg-slate-100 transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Launch Live Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('/contact')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold bg-emerald-700/60 hover:bg-emerald-700 text-white border border-emerald-400/40 transition-all cursor-pointer"
            >
              <span>Contact Us &amp; FAQs</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
