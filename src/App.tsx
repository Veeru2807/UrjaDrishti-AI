import React, { useState } from 'react';
import {
  DEFAULT_BUILDING_CONFIG,
  INITIAL_ZONES,
  generateDynamicZones,
  generateHourlyData,
  generateHistoryData,
  SMART_RECOMMENDATIONS,
  FLEXIBLE_LOADS,
  RETROFIT_RECOMMENDATIONS,
} from './data/mockData';
import { BuildingConfig, ZoneData, SmartRecommendation, FlexibleLoadItem, RetrofitItem } from './types';
import { calculateBuildingSavings } from './utils/calculations';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewTab } from './components/OverviewTab';
import { EnergyAnalyticsTab } from './components/EnergyAnalyticsTab';
import { BuildingZonesTab } from './components/BuildingZonesTab';
import { ComfortTab } from './components/ComfortTab';
import { RecommendationsTab } from './components/RecommendationsTab';
import { PeakGridTab } from './components/PeakGridTab';
import { WhatIfTab } from './components/WhatIfTab';
import { RetrofitTab } from './components/RetrofitTab';
import { IntegrationTab } from './components/IntegrationTab';
import { ReportsTab } from './components/ReportsTab';
import { SettingsTab } from './components/SettingsTab';

// Public Website Components & Pages
import { Navbar } from './components/public/Navbar';
import { Footer } from './components/public/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { BuildingSetupPage } from './pages/BuildingSetupPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { UserProfileModal } from './components/UserProfileModal';
import { authService } from './auth/authService';
import { User } from './types/auth';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [activeDashboardTab, setActiveDashboardTab] = useState<string>('overview');

  // Authentication State
  const [user, setUser] = useState<User | null>(() => authService.getStoredSession().user);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [config, setConfig] = useState<BuildingConfig>(DEFAULT_BUILDING_CONFIG);
  const [zones, setZones] = useState<ZoneData[]>(() => generateDynamicZones(DEFAULT_BUILDING_CONFIG));
  const [selectedFloor, setSelectedFloor] = useState<number | 'all'>('all');
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>('z-2a');
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>(SMART_RECOMMENDATIONS);
  const [flexibleLoads, setFlexibleLoads] = useState<FlexibleLoadItem[]>(FLEXIBLE_LOADS);
  const [retrofits] = useState<RetrofitItem[]>(RETROFIT_RECOMMENDATIONS);

  // Derive unique floors list
  const floorsList = Array.from(new Set(zones.map((z) => z.floor))).sort();

  // Filtered zones based on selected floor
  const displayedZones = selectedFloor === 'all'
    ? zones
    : zones.filter((z) => z.floor === selectedFloor);

  // Generate hourly & historical series dynamically based on building config
  const hourlyData = generateHourlyData(config);
  const { sevenDays, thirtyDays } = generateHistoryData();

  // Dynamic Savings summary
  const appliedRecsCount = recommendations.filter((r) => r.applied).length;
  const baseEfficiency = 0.165 + appliedRecsCount * 0.035;
  const savingsSummary = calculateBuildingSavings(config, baseEfficiency);

  // Count active alerts
  const activeAlertCount = zones.filter((z) => z.hasAnomaly).length;
  const activeRecsCount = recommendations.filter((r) => !r.applied).length;

  const handleRefresh = () => {
    setZones((prev) =>
      prev.map((z) => ({
        ...z,
        temperature: Math.round((z.temperature + (Math.random() * 0.4 - 0.2)) * 10) / 10,
        humidity: Math.round(z.humidity + (Math.random() * 2 - 1)),
      }))
    );
  };

  const handleOptimizeZone = (zoneId: string) => {
    setZones((prev) =>
      prev.map((z) => {
        if (z.id === zoneId) {
          return {
            ...z,
            hasAnomaly: false,
            status: 'Normal',
            totalKw: Math.round((z.totalKw - (z.anomalySavingKwhPerDay ? z.anomalySavingKwhPerDay / 10 : 8)) * 10) / 10,
            hvacKw: z.id === 'z-2a' ? 14.5 : z.hvacKw,
            lightingKw: z.id === 'z-3a' ? 3.2 : z.lightingKw,
            temperature: 24.5,
            comfortScore: 95,
          };
        }
        return z;
      })
    );
  };

  const handleToggleApplyRecommendation = (recId: string) => {
    setRecommendations((prev) =>
      prev.map((r) => {
        if (r.id === recId) {
          const newApplied = !r.applied;
          if (recId === 'rec-1' && newApplied) {
            handleOptimizeZone('z-2a');
          } else if (recId === 'rec-2' && newApplied) {
            handleOptimizeZone('z-3a');
          }
          return { ...r, applied: newApplied };
        }
        return r;
      })
    );
  };

  const handleToggleShiftLoad = (loadId: string) => {
    setFlexibleLoads((prev) =>
      prev.map((l) => {
        if (l.id === loadId) {
          const isShifted = l.status === 'Shifted to Off-Peak';
          return {
            ...l,
            status: isShifted ? 'Normal Schedule' : 'Shifted to Off-Peak',
          };
        }
        return l;
      })
    );
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (!loggedInUser.isDemo && config.id === 'bldg-01') {
      setCurrentRoute('/onboarding');
    } else {
      setCurrentRoute('/dashboard');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentRoute('/login');
  };

  const handleNavigate = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (path.startsWith('/dashboard')) {
      // If user tries to access dashboard without auth, auto-authenticate demo user for judges or route to login
      if (!user) {
        const demoUser = authService.loginAsDemo();
        setUser(demoUser);
      }
      setCurrentRoute('/dashboard');
      const tabParam = path.split('/dashboard?tab=')[1];
      if (tabParam) {
        setActiveDashboardTab(tabParam);
      }
    } else {
      setCurrentRoute(path);
    }
  };

  const isDashboardView = currentRoute === '/dashboard';

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 antialiased font-sans flex flex-col justify-between">
      {!isDashboardView ? (
        // ==========================================
        // PUBLIC WEBSITE & AUTH PAGES (Home, Services, Contact, Login, Signup)
        // ==========================================
        <div className="flex flex-col min-h-screen">
          <Navbar
            currentPath={currentRoute}
            user={user}
            onNavigate={handleNavigate}
            onOpenProfile={() => setIsProfileOpen(true)}
            onLogout={handleLogout}
          />

          <main className="flex-1">
            {currentRoute === '/' && (
              <HomePage config={config} onNavigate={handleNavigate} />
            )}
            {currentRoute === '/services' && (
              <ServicesPage config={config} onNavigate={handleNavigate} />
            )}
            {currentRoute === '/contact' && (
              <ContactPage />
            )}
            {currentRoute === '/login' && (
              <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />
            )}
            {currentRoute === '/signup' && (
              <SignupPage onSignupSuccess={handleLoginSuccess} onNavigate={handleNavigate} />
            )}
            {currentRoute === '/forgot-password' && (
              <ForgotPasswordPage onNavigate={handleNavigate} />
            )}
            {currentRoute === '/onboarding' && (
              <BuildingSetupPage
                onSelectBuilding={(newConfig) => {
                  setConfig(newConfig);
                  setZones(generateDynamicZones(newConfig));
                  setCurrentRoute('/dashboard');
                }}
                onNavigate={handleNavigate}
              />
            )}
          </main>

          <Footer onNavigate={handleNavigate} />
        </div>
      ) : (
        // ==========================================
        // EXISTING ENTERPRISE DASHBOARD VIEW (Light Theme)
        // ==========================================
        <div className="flex min-h-screen">
          {/* Dashboard Sidebar with Back-to-Website Option */}
          <div className="flex flex-col h-screen sticky top-0 bg-white border-r border-slate-200">
            {/* Top Back Link */}
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-xs">
              <button
                onClick={() => handleNavigate('/')}
                className="text-slate-600 hover:text-emerald-700 flex items-center space-x-1 font-bold transition-colors cursor-pointer"
              >
                <span>&larr; Back to Website</span>
              </button>
              <span className="text-[10px] text-emerald-700 font-bold font-mono">LIVE APP</span>
            </div>

            <Sidebar
              activeTab={activeDashboardTab}
              setActiveTab={setActiveDashboardTab}
              activeAlertCount={activeAlertCount}
              recommendationsCount={activeRecsCount}
            />
          </div>

          {/* Main Dashboard Content */}
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50">
            <Header
              config={config}
              user={user}
              activeTab={activeDashboardTab}
              onRefresh={handleRefresh}
              onOpenSettings={() => setActiveDashboardTab('settings')}
              onChangeBuilding={() => setCurrentRoute('/onboarding')}
              onSwitchToDemo={() => {
                setConfig(DEFAULT_BUILDING_CONFIG);
                setZones(generateDynamicZones(DEFAULT_BUILDING_CONFIG));
              }}
              onLogout={handleLogout}
              onOpenProfile={() => setIsProfileOpen(true)}
              activeAlertCount={activeAlertCount}
              selectedFloor={selectedFloor}
              onSelectFloor={setSelectedFloor}
              floorsList={floorsList}
            />

            <main className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto">
              {activeDashboardTab === 'overview' && (
                <OverviewTab
                  config={config}
                  savings={savingsSummary}
                  zones={displayedZones}
                  hourlyData={hourlyData}
                  onNavigateTab={(tab) => setActiveDashboardTab(tab)}
                  onSelectZone={(zoneId) => {
                    setSelectedZoneId(zoneId);
                    setActiveDashboardTab('zones');
                  }}
                  onOptimizeZone={handleOptimizeZone}
                />
              )}

              {activeDashboardTab === 'analytics' && (
                <EnergyAnalyticsTab
                  config={config}
                  savings={savingsSummary}
                  hourlyData={hourlyData}
                  sevenDays={sevenDays}
                  thirtyDays={thirtyDays}
                />
              )}

              {activeDashboardTab === 'zones' && (
                <BuildingZonesTab
                  zones={displayedZones}
                  selectedZoneId={selectedZoneId}
                  onSelectZone={(id) => setSelectedZoneId(id)}
                  config={config}
                  onOptimizeZone={handleOptimizeZone}
                />
              )}

              {activeDashboardTab === 'comfort' && <ComfortTab zones={displayedZones} config={config} />}

              {activeDashboardTab === 'recommendations' && (
                <RecommendationsTab
                  recommendations={recommendations}
                  onToggleApply={handleToggleApplyRecommendation}
                  config={config}
                />
              )}

              {activeDashboardTab === 'grid' && (
                <PeakGridTab
                  flexibleLoads={flexibleLoads}
                  hourlyData={hourlyData}
                  config={config}
                  onToggleShift={handleToggleShiftLoad}
                />
              )}

              {activeDashboardTab === 'whatif' && <WhatIfTab config={config} />}

              {activeDashboardTab === 'retrofit' && <RetrofitTab retrofits={retrofits} config={config} />}

              {activeDashboardTab === 'integration' && <IntegrationTab />}

              {activeDashboardTab === 'reports' && (
                <ReportsTab
                  config={config}
                  savings={savingsSummary}
                  zones={zones}
                  recommendations={recommendations}
                  retrofits={retrofits}
                />
              )}

              {activeDashboardTab === 'settings' && (
                <SettingsTab
                  config={config}
                  onChangeConfig={(newConfig) => {
                    setConfig(newConfig);
                    setZones(generateDynamicZones(newConfig));
                  }}
                  onResetDefaults={() => {
                    setConfig(DEFAULT_BUILDING_CONFIG);
                    setZones(generateDynamicZones(DEFAULT_BUILDING_CONFIG));
                  }}
                />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Global User Profile Modal */}
      {user && (
        <UserProfileModal
          user={user}
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          onLogout={handleLogout}
          onUpdateUser={(updatedUser) => setUser(updatedUser)}
        />
      )}
    </div>
  );
}

export default App;
