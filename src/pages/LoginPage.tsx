import React, { useState } from 'react';
import {
  Zap,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Activity,
  Smile,
  Compass,
} from 'lucide-react';
import { authService, DEMO_USER } from '../auth/authService';
import { User } from '../types/auth';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');

  // Email form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Phone form state
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otpStep, setOtpStep] = useState<1 | 2>(1);
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [currentOtp, setCurrentOtp] = useState<string>('');
  const [resendTimer, setResendTimer] = useState<number>(0);

  // Resend Countdown Effect
  React.useEffect(() => {
    let interval: any = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  // Loading & Error states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Handle Email Login
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address (e.g. you@company.com).');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your account password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authService.loginWithEmail(email, password);
      if (res.success && res.user) {
        setSuccessMsg('Login successful! Redirecting...');
        setTimeout(() => {
          onLoginSuccess(res.user!);
        }, 500);
      } else {
        setErrorMsg(res.error || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Phone Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit Indian phone number.');
      return;
    }

    setIsLoading(true);
    try {
      const fullPhone = `${countryCode} ${cleanPhone}`;
      const res = await authService.sendPhoneOtp(fullPhone);
      if (res.success) {
        setOtpStep(2);
        setCurrentOtp(res.otp);
        setOtpValues(['', '', '', '', '', '']); // Clear previous inputs for authentic feel
        setResendTimer(60); // 60s resend cooldown
        setSuccessMsg(`SMS Sent! Dynamic verification code generated for ${fullPhone}.`);
      }
    } catch (err) {
      setErrorMsg('Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP Handler
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setErrorMsg(null);
    setIsLoading(true);
    try {
      const fullPhone = `${countryCode} ${phone.replace(/\D/g, '')}`;
      const res = await authService.sendPhoneOtp(fullPhone);
      if (res.success) {
        setCurrentOtp(res.otp);
        setOtpValues(['', '', '', '', '', '']);
        setResendTimer(60);
        setSuccessMsg(`New OTP resent to ${fullPhone}. Code updated!`);
      }
    } catch (err) {
      setErrorMsg('Failed to resend OTP code.');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-Fill Code Helper
  const handleAutoFillOtp = () => {
    if (!currentOtp || currentOtp.length !== 6) return;
    const digits = currentOtp.split('');
    setOtpValues(digits);
    setSuccessMsg('OTP Code auto-filled successfully! Click "Verify & Continue".');
  };

  // Handle Phone Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const fullOtp = otpValues.join('');
    if (fullOtp.length !== 6) {
      setErrorMsg('Please enter the full 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authService.verifyPhoneOtp(`${countryCode} ${phone}`, fullOtp);
      if (res.success && res.user) {
        setSuccessMsg('Phone number verified! Logging in...');
        setTimeout(() => {
          onLoginSuccess(res.user!);
        }, 500);
      } else {
        setErrorMsg(res.error || 'Invalid OTP. Please check the code and try again.');
      }
    } catch (err) {
      setErrorMsg('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpDigitChange = (index: number, val: string) => {
    // If pasted full 6 digit string
    if (val.length >= 6 && /^\d+$/.test(val)) {
      const pastedDigits = val.slice(0, 6).split('');
      setOtpValues(pastedDigits);
      const lastInput = document.getElementById(`otp-input-5`);
      lastInput?.focus();
      return;
    }

    if (val.length > 1) {
      val = val.slice(-1);
    }
    
    // Only accept numeric digits
    if (val && !/^\d$/.test(val)) return;

    const newOtp = [...otpValues];
    newOtp[index] = val;
    setOtpValues(newOtp);

    // Auto-focus next input if digit entered
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous on backspace if current is empty
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Handle 1-Click Demo Login for Judges
  const handleDemoLogin = () => {
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg('Loading UrjaDrishti Demo Environment...');
    setTimeout(() => {
      const user = authService.loginAsDemo();
      onLoginSuccess(user);
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full bg-white border border-slate-200/90 rounded-3xl shadow-xl overflow-hidden">
        
        {/* ========================================================================= */}
        {/* LEFT SIDE: VISUAL SECTION (EnergyTech Smart Building Brand Presentation) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden text-left">
          {/* Subtle Glow & Background Lines */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

          <div className="space-y-6 relative z-10">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/30">
                <Zap className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-white">UrjaDrishti</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-400/30 font-mono">
                    AI
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono">EnergyTech Intelligence Platform</p>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                AI-Powered Energy Intelligence for Smarter Buildings.
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Bridge the gap between raw sub-meters and executive decisions. Cut waste, predict peak power draw, and maintain occupant comfort.
              </p>
            </div>

            {/* Smart Building Telemetry Micro-Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Active Facility Telemetry</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">10,000 m² Tech Park</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block">EPI Intensity</span>
                  <strong className="text-white font-mono text-xs">0.48 kWh/m²/d</strong>
                </div>
                <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block">Comfort Index</span>
                  <strong className="text-emerald-300 font-mono text-xs">92/100 Safe</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Compliance Badges */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-medium relative z-10">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>BEE &amp; ECBC Ready</span>
            </span>
            <span className="flex items-center space-x-1">
              <Smile className="w-3.5 h-3.5 text-teal-400" />
              <span>ASHRAE 55 Aligned</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT SIDE: AUTHENTICATION FORM CARD */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between text-left space-y-6">
          
          <div className="space-y-5">
            {/* Header Text */}
            <div className="space-y-1 border-b border-slate-100 pb-4">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Welcome back
              </h1>
              <p className="text-xs text-slate-500">
                Sign in to continue managing your building's energy intelligence.
              </p>
            </div>

            {/* Quick Demo Login Option for Judges */}
            <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-extrabold text-emerald-950 block">Hackathon Judge / Instant Demo</span>
                  <span className="text-[11px] text-emerald-800">Experience the full platform in 1 click</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer shrink-0"
              >
                <span>✨ Try Demo Account</span>
              </button>
            </div>

            {/* Method Tabs: Email vs Phone */}
            <div className="flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('email');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-2 ${
                  loginMethod === 'email'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>Email Address</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoginMethod('phone');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-2 ${
                  loginMethod === 'phone'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                <span>Phone Number (OTP)</span>
              </button>
            </div>

            {/* Error & Success Notification Alerts */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="font-medium">{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start space-x-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-bold">{successMsg}</span>
              </div>
            )}

            {/* ========================================================================= */}
            {/* METHOD 1: EMAIL LOGIN FORM */}
            {/* ========================================================================= */}
            {loginMethod === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">Password</label>
                    <button
                      type="button"
                      onClick={() => onNavigate('/forgot-password')}
                      className="text-[11px] text-emerald-700 font-bold hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Remember me on this browser</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 cursor-pointer transition-all disabled:opacity-60"
                >
                  {isLoading ? (
                    <span>Signing in...</span>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ========================================================================= */}
            {/* METHOD 2: PHONE LOGIN (OTP FLOW) */}
            {/* ========================================================================= */}
            {loginMethod === 'phone' && (
              <div>
                {otpStep === 1 ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Phone Number</label>
                      <div className="flex space-x-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="px-2.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 focus:outline-hidden"
                        >
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+971">🇦🇪 +971</option>
                        </select>
                        <div className="relative flex-1">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter 10-digit phone number"
                            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-800 font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-600/20 flex items-center justify-center space-x-2 cursor-pointer transition-all disabled:opacity-60"
                    >
                      {isLoading ? <span>Sending OTP...</span> : <span>Send Verification Code</span>}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    {/* Simulated Real-Time SMS Received Banner */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-teal-950 text-white border border-teal-500/30 shadow-md space-y-2 text-left animate-fadeIn">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center space-x-1.5 font-bold text-teal-400">
                          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                          <span>📱 SMS Received on {countryCode} {phone}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Just Now</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                        <div>
                          <p className="text-[11px] text-slate-300">
                            Your UrjaDrishti verification code is: <strong className="text-emerald-300 font-mono text-sm tracking-wider">{currentOtp || '******'}</strong>
                          </p>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Valid for 5 minutes • Do not share</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleAutoFillOtp}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] shrink-0 transition-all cursor-pointer flex items-center space-x-1 shadow-xs"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Auto-Fill</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700">
                          Enter 6-Digit Verification Code
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setOtpStep(1);
                            setErrorMsg(null);
                          }}
                          className="text-[11px] text-teal-700 font-bold hover:underline cursor-pointer"
                        >
                          Change Number
                        </button>
                      </div>

                      {/* 6-Digit OTP inputs */}
                      <div className="flex justify-between gap-2">
                        {otpValues.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`otp-input-${idx}`}
                            type="text"
                            maxLength={6} // Allow paste up to 6 digits into first box
                            value={digit}
                            onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            className="w-11 h-12 text-center text-base font-extrabold font-mono bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 text-slate-900 transition-all"
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                        <span className="text-[11px] text-slate-500">
                          {resendTimer > 0 ? (
                            <span>Resend OTP code in <strong className="text-teal-700 font-mono">{resendTimer}s</strong></span>
                          ) : (
                            <span className="text-slate-600">Didn't receive code?</span>
                          )}
                        </span>

                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={resendTimer > 0 || isLoading}
                          className="text-teal-700 font-bold hover:underline cursor-pointer disabled:opacity-40 disabled:no-underline text-xs flex items-center space-x-1"
                        >
                          <span>Resend OTP</span>
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 cursor-pointer transition-all disabled:opacity-60"
                    >
                      {isLoading ? <span>Verifying OTP...</span> : <span>Verify &amp; Continue</span>}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Footer Link to Signup */}
          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>Don't have an account? </span>
            <button
              type="button"
              onClick={() => onNavigate('/signup')}
              className="text-emerald-700 font-bold hover:underline cursor-pointer"
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
