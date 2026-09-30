import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, ArrowRight, LayoutDashboard, LogIn, User as UserIcon } from 'lucide-react';
import { User } from '../../types/auth';

interface NavbarProps {
  currentPath: string;
  user?: User | null;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, user, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3'
          : 'bg-white/70 backdrop-blur border-b border-slate-200/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center space-x-3 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                UrjaDrishti
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded border border-emerald-200 tracking-wider">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-none">Smart Building Energy Intelligence</p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/80">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/60 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Buttons: Sign In / Create Account vs Open Dashboard */}
        <div className="hidden md:flex items-center space-x-2.5">
          {user ? (
            <>
              <button
                onClick={() => onNavigate('/onboarding')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all cursor-pointer border border-slate-200 shadow-2xs"
              >
                <span>Building Setup</span>
              </button>

              <button
                onClick={() => onNavigate('/dashboard')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 transition-all shadow-md shadow-emerald-600/20 flex items-center space-x-1.5 group cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-white" />
                <span>Open Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onNavigate('/login')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all cursor-pointer border border-slate-200 shadow-2xs flex items-center space-x-1"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-600" />
                <span>Sign In</span>
              </button>

              <button
                onClick={() => onNavigate('/signup')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 transition-all shadow-md shadow-emerald-600/20 flex items-center space-x-1.5 group cursor-pointer"
              >
                <span>Create Account</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                onNavigate(link.path);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                currentPath === link.path
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={() => {
                onNavigate('/dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-lg text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-center space-x-2 shadow-md"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Open Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
