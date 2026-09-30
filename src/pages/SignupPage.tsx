import React, { useState } from 'react';
import {
  Zap,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Building,
  User as UserIcon,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { authService } from '../auth/authService';
import { User, UserRole } from '../types/auth';

interface SignupPageProps {
  onSignupSuccess: (user: User) => void;
  onNavigate: (path: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onSignupSuccess, onNavigate }) => {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('Energy Manager');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Loading & Error states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Password rules validation
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  // Strength score
  let strengthScore = 0;
  if (hasMinLength) strengthScore += 33;
  if (hasUppercase) strengthScore += 33;
  if (hasNumber) strengthScore += 34;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!organization.trim()) {
      setErrorMsg('Please enter your company or organization name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!hasMinLength || !hasUppercase || !hasNumber) {
      setErrorMsg('Password must be at least 8 characters with at least one uppercase letter and one number.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authService.registerUser({
        name,
        email,
        organization,
        phone,
        role,
      });

      if (res.success && res.user) {
        onSignupSuccess(res.user);
      }
    } catch (err) {
      setErrorMsg('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex items-center justify-center text-left">
      <div className="w-full bg-white border border-slate-200/90 rounded-3xl shadow-xl overflow-hidden p-6 sm:p-10 space-y-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 border-b border-slate-100 pb-5">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Join UrjaDrishti AI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create your UrjaDrishti account
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Start turning building data into smarter energy decisions and verified savings.
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Full Name <span className="text-rose-500">*</span></label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Veer Singh Rathor"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800"
                />
              </div>
            </div>

            {/* Organization Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Company / Organization <span className="text-rose-500">*</span></label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Orion Tech Park Facilities"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Work Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Work Email Address <span className="text-rose-500">*</span></label>
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

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Phone Number <span className="text-rose-500">*</span></label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Job Role */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Your Primary Role</label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 cursor-pointer"
              >
                <option value="Building Owner">Building Owner / CEO</option>
                <option value="Facility Manager">Facility Manager</option>
                <option value="Energy Manager">Energy Manager / Auditor</option>
                <option value="Operations Manager">Operations Manager</option>
                <option value="Architect">Architect / Green Building Consultant</option>
                <option value="Consultant">Consultant</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Password <span className="text-rose-500">*</span></label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
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

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Confirm Password <span className="text-rose-500">*</span></label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Password Strength Bar & Requirements Checklist */}
          {password && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                <span>Password Strength</span>
                <span className={strengthScore === 100 ? 'text-emerald-700' : 'text-amber-700'}>
                  {strengthScore === 100 ? 'Strong' : strengthScore > 33 ? 'Moderate' : 'Weak'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    strengthScore === 100
                      ? 'bg-emerald-500 w-full'
                      : strengthScore > 33
                      ? 'bg-amber-500 w-2/3'
                      : 'bg-rose-500 w-1/3'
                  }`}
                ></div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-600 pt-1">
                <span className={`flex items-center space-x-1 ${hasMinLength ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>8+ characters</span>
                </span>
                <span className={`flex items-center space-x-1 ${hasUppercase ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>1 uppercase letter</span>
                </span>
                <span className={`flex items-center space-x-1 ${hasNumber ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>1 number</span>
                </span>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 cursor-pointer transition-all disabled:opacity-60"
            >
              {isLoading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create Account &amp; Proceed to Building Setup</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer to Login */}
        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          <span>Already have an account? </span>
          <button
            type="button"
            onClick={() => onNavigate('/login')}
            className="text-emerald-700 font-bold hover:underline cursor-pointer"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};
