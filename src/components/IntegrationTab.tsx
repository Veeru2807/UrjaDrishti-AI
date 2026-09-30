import React from 'react';
import {
  Cpu,
  Server,
  Cloud,
  CheckCircle2,
  Radio,
  Share2,
  Workflow,
  Activity,
  Zap,
} from 'lucide-react';

export const IntegrationTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-50 via-cyan-50 to-purple-50 border border-teal-200/80 rounded-2xl p-5 shadow-xs">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-teal-100 border border-teal-200 text-teal-700 shrink-0">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-extrabold text-slate-900">BMS, IoT Gateway &amp; Grid Integration Architecture</h2>
              <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full border border-teal-200">
                OpenADR &amp; BACnet Ready
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed font-medium">
              Transparent enterprise architecture blueprint demonstrating how UrjaDrishti AI ingests multi-vendor telemetry from field IoT sensors, legacy BMS chillers, smart energy meters, and connects with Indian DISCOM Demand-Response programs.
            </p>
          </div>
        </div>
      </div>

      {/* End-to-End Data Pipeline Visual Diagram */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <Workflow className="w-4 h-4 text-emerald-600" />
            <span>End-to-End Data Flow Architecture (Sensors &rarr; AI Analytics &rarr; BMS Control)</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono font-semibold">Architecture v1.0 Blueprint</span>
        </div>

        {/* 6 Stage Pipeline Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 relative">
          {/* Stage 1 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <Radio className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Layer 1</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Field Sensors &amp; Meters</h4>
              <p className="text-[11px] text-slate-500 mt-2">
                Multi-function Energy Meters, IoT CO₂/Temp/RH sensors, PIR Occupancy nodes.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-200 text-[10px] text-emerald-700 font-bold font-mono">
              RS-485 / Zigbee / BLE
            </div>
          </div>

          {/* Stage 2 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                <Server className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Layer 2</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Edge IoT Gateway</h4>
              <p className="text-[11px] text-slate-500 mt-2">
                Edge computing bridge, local protocol conversion, encryption &amp; time-series buffering.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-200 text-[10px] text-teal-700 font-bold font-mono">
              Modbus RTU / BACnet IP
            </div>
          </div>

          {/* Stage 3 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <Share2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Layer 3</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Ingestion &amp; Telemetry</h4>
              <p className="text-[11px] text-slate-500 mt-2">
                Secure streaming ingestion broker, JSON schema validation &amp; rate limiting.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-200 text-[10px] text-blue-700 font-bold font-mono">
              MQTT / HTTPS REST API
            </div>
          </div>

          {/* Stage 4 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                <Cloud className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Layer 4</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">UrjaDrishti Core AI</h4>
              <p className="text-[11px] text-slate-500 mt-2">
                Physics baseline engine, demand forecaster, anomaly detection &amp; comfort scorer.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-200 text-[10px] text-purple-700 font-bold font-mono">
              AI Analytics Engine
            </div>
          </div>

          {/* Stage 5 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Layer 5</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Facility Dashboard</h4>
              <p className="text-[11px] text-slate-500 mt-2">
                Real-time situational awareness, what-if simulator, automated alerts &amp; action center.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-200 text-[10px] text-emerald-700 font-bold font-mono">
              Web &amp; Mobile UI
            </div>
          </div>

          {/* Stage 6 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Layer 6</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">BMS &amp; DISCOM ADR</h4>
              <p className="text-[11px] text-slate-500 mt-2">
                Automated closed-loop setpoint dispatch to BMS and grid demand-response signals.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-200 text-[10px] text-amber-700 font-bold font-mono">
              OpenADR 2.0b / BACnet
            </div>
          </div>
        </div>
      </div>

      {/* Integration Capabilities & Protocol Support */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Supported Field Protocols</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-700 font-medium">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span><strong>Modbus RTU / TCP:</strong> Schneider, Siemens, ABB sub-meters</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span><strong>BACnet IP / MSTP:</strong> Honeywell, Johnson Controls, Trane chillers</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span><strong>MQTT over TLS:</strong> LoRaWAN IoT environmental sensor mesh</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span><strong>OCPP 1.6/2.0:</strong> Smart EV fleet charging stations</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Smart Grid &amp; DISCOM Readiness</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-700 font-medium">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
              <span><strong>OpenADR 2.0b VEN:</strong> Automated Demand Response client</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
              <span><strong>Time-of-Day (TOD) Engine:</strong> Indian DISCOM tariff schedules</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
              <span><strong>Peak Demand Thresholding:</strong> Contracted kVA sanction alerts</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
              <span><strong>Solar Inverter Telemetry:</strong> IEEE 2030.5 smart inverter protocol</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
            <span>AI Analytics &amp; ML Modularity</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-700 font-medium">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
              <span><strong>XGBoost / Prophet Ready:</strong> Drop-in ML demand forecaster</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
              <span><strong>ISO 50001 EnPIs:</strong> Standardized energy performance metrics</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
              <span><strong>IPMVP Option C:</strong> Whole facility savings verification</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
              <span><strong>Edge Offline Fallback:</strong> Local fail-safe control logic</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
