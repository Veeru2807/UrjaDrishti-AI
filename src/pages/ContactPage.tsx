import React, { useState } from 'react';
import {
  Mail,
  Building,
  User,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  MessageSquare,
  Award,
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    organization: '',
    subject: 'Pilot Energy Optimization Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is UrjaDrishti AI?',
      a: 'UrjaDrishti AI is an intelligent building energy management and optimization platform designed for Indian commercial and institutional buildings. It combines energy disaggregation, occupancy sensing, indoor environmental quality (ASHRAE 55), demand forecasting, and peak load shifting into one integrated decision-support tool.',
    },
    {
      q: 'How does the platform identify energy waste?',
      a: 'The anomaly engine correlates real-time multi-zone occupancy with equipment power draw. For example, if a conference room or floor has only 8% occupancy while the HVAC system is cooling at full capacity, UrjaDrishti flags this discrepancy as an energy waste anomaly and recommends specific VAV setpoint adjustments.',
    },
    {
      q: 'Can UrjaDrishti AI work with existing buildings?',
      a: 'Yes. The architecture supports standard open building protocols (Modbus RTU/TCP, BACnet IP/MSTP, MQTT) through edge IoT gateways. This allows it to overlay on existing multi-vendor BMS systems (Honeywell, Schneider, Johnson Controls, Siemens) without requiring full equipment replacement.',
    },
    {
      q: 'Does it require expensive new hardware?',
      a: 'No. Buildings can start with existing main meters and gradually deploy low-cost IoT wireless sensor meshes (occupancy, temperature, humidity, CO₂) as detailed in our Retrofit Advisor with typical simple payback periods of 1.0 to 1.3 years.',
    },
    {
      q: 'Can it monitor and preserve occupant comfort?',
      a: 'Absolutely. The core engineering rule of UrjaDrishti is that energy savings must never compromise occupant health or thermal comfort. The system continuously evaluates an ASHRAE 55 / NBC 2016 comfort index (0–100) ensuring temperature, humidity (40–60%), and CO₂ (< 800 ppm) remain within optimal bands.',
    },
    {
      q: 'Are the savings results real or simulated in this prototype?',
      a: 'For this hackathon demonstration prototype, energy consumption, savings, and what-if scenarios are calculated dynamically using transparent physical formulas and empirical Indian commercial office benchmarks (150 kWh/m²/year baseline, ₹9.5/kWh tariff). The architecture is completely prepared for live meter and sensor telemetry.',
    },
  ];

  const validate = () => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.organization.trim()) newErrors.organization = 'Organization or Building name is required';
    if (!formData.message.trim()) newErrors.message = 'Please enter your message';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="space-y-20 md:space-y-28 pb-16 overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <section className="text-center pt-8 md:pt-14 space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          <span>Get in Touch</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Let’s Make Buildings Smarter.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Have a question, want to explore the platform, or interested in building energy optimization? Get in touch with the UrjaDrishti AI engineering team.
        </p>
      </section>

      {/* Main Form & Information Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Send Us a Message</h2>
            <p className="text-xs text-slate-500 mt-1">
              Fill out the form below for pilot demonstration inquiries or technical collaborations.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Message Captured for Demo Purposes!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you for reaching out, <strong>{formData.name}</strong> ({formData.organization}). In a production deployment, this form triggers an automated notification to our facility solutions team.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    organization: '',
                    subject: 'Pilot Energy Optimization Inquiry',
                    message: '',
                  });
                }}
                className="mt-3 px-4 py-2 text-xs font-semibold rounded-lg bg-white text-slate-800 hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-slate-50 border rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-600 ${
                      errors.name ? 'border-rose-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.name && <p className="text-rose-600 text-[11px] mt-1 font-semibold">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="e.g. rajesh@buildingops.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-slate-50 border rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-600 ${
                      errors.email ? 'border-rose-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && <p className="text-rose-600 text-[11px] mt-1 font-semibold">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Organization */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Organization / Building *</label>
                  <input
                    type="text"
                    placeholder="e.g. Tech Park Tower A"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className={`w-full bg-slate-50 border rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-600 ${
                      errors.organization ? 'border-rose-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.organization && <p className="text-rose-600 text-[11px] mt-1 font-semibold">{errors.organization}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Inquiry Type</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Pilot Energy Optimization Inquiry">Pilot Energy Optimization Inquiry</option>
                    <option value="BMS & IoT Integration Question">BMS &amp; IoT Integration Question</option>
                    <option value="Hackathon Collaboration & Demo">Hackathon Collaboration &amp; Demo</option>
                    <option value="General Technical Question">General Technical Question</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Message *</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your facility size, current BMS/metering infrastructure, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full bg-slate-50 border rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-600 ${
                    errors.message ? 'border-rose-500' : 'border-slate-300'
                  }`}
                />
                {errors.message && <p className="text-rose-600 text-[11px] mt-1 font-semibold">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 transition-all flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right: Contact Information & Hackathon Details (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Project Information</h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
                <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Hackathon Track</span>
                  <p className="text-slate-600 text-[11px]">Yuva Yodha Energy Tech Hackathon 2026</p>
                  <p className="text-slate-600 text-[11px]">Challenge 02: Smart Buildings</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
                <Building className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Demonstration Office</span>
                  <p className="text-slate-600 text-[11px]">UrjaDrishti Demo Office (10,000 m²)</p>
                  <p className="text-slate-600 text-[11px]">Composite Climate Zone, India</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Support &amp; Inquiries</span>
                  <p className="text-slate-600 text-[11px]">Email: contact@urjadrishti.ai (Demo Placeholder)</p>
                  <p className="text-slate-600 text-[11px]">Engineering Team: Hackathon Project Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider font-mono">Frequently Asked Questions</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Everything You Need to Know</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
