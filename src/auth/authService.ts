import { User, UserRole } from '../types/auth';

const STORAGE_USER_KEY = 'urja_auth_user';
const STORAGE_TOKEN_KEY = 'urja_auth_token';

export const DEMO_USER: User = {
  id: 'usr-demo-001',
  name: 'Veer Singh Rathor',
  email: 'demo@urjadrishti.ai',
  phone: '+91 98765 43210',
  organization: 'Orion Facility Solutions',
  role: 'Energy Manager',
  isDemo: true,
  createdAt: '2026-09-30T10:00:00.000Z',
};

// Demo users database in memory
const REGISTERED_USERS: User[] = [
  DEMO_USER,
  {
    id: 'usr-002',
    name: 'Aarav Sharma',
    email: 'aarav@cybercity.com',
    phone: '+91 98111 22334',
    organization: 'CyberCity Real Estate',
    role: 'Facility Manager',
    isDemo: false,
    createdAt: '2026-09-28T14:30:00.000Z',
  }
];

export const authService = {
  getStoredSession(): { user: User | null; token: string | null } {
    try {
      const userJson = localStorage.getItem(STORAGE_USER_KEY);
      const token = localStorage.getItem(STORAGE_TOKEN_KEY);
      if (userJson && token) {
        return { user: JSON.parse(userJson), token };
      }
    } catch (e) {
      console.warn('Failed to read auth state from localStorage', e);
    }
    return { user: null, token: null };
  },

  saveSession(user: User, token = `tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`): void {
    try {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      localStorage.setItem(STORAGE_TOKEN_KEY, token);
    } catch (e) {
      console.warn('Failed to save auth state to localStorage', e);
    }
  },

  clearSession(): void {
    try {
      localStorage.removeItem(STORAGE_USER_KEY);
      localStorage.removeItem(STORAGE_TOKEN_KEY);
    } catch (e) {
      console.warn('Failed to clear auth state from localStorage', e);
    }
  },

  async loginWithEmail(email: string, _password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulated network delay
    await new Promise((r) => setTimeout(r, 600));

    const normalizedEmail = email.trim().toLowerCase();
    const existing = REGISTERED_USERS.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (existing) {
      this.saveSession(existing);
      return { success: true, user: existing };
    }

    // Auto-generate authenticated user if not strictly matched
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email: normalizedEmail,
      organization: 'Commercial Tech Hub',
      role: 'Energy Manager',
      isDemo: false,
      createdAt: new Date().toISOString(),
    };
    this.saveSession(newUser);
    return { success: true, user: newUser };
  },

  async sendPhoneOtp(phone: string): Promise<{ success: boolean; demoOtp: string }> {
    await new Promise((r) => setTimeout(r, 500));
    // Fixed realistic demo OTP for testing
    return { success: true, demoOtp: '123456' };
  },

  async verifyPhoneOtp(phone: string, otp: string): Promise<{ success: boolean; user?: User; error?: string }> {
    await new Promise((r) => setTimeout(r, 600));

    if (otp !== '123456' && otp.length !== 6) {
      return { success: false, error: 'Invalid verification code. Please enter the 6-digit demo code 123456.' };
    }

    const cleanPhone = phone.trim();
    const existing = REGISTERED_USERS.find((u) => u.phone === cleanPhone);

    if (existing) {
      this.saveSession(existing);
      return { success: true, user: existing };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: `User ${cleanPhone.slice(-4)}`,
      email: `user.${cleanPhone.replace(/\D/g, '').slice(-4)}@urjadrishti.ai`,
      phone: cleanPhone,
      organization: 'Smart Building Operations',
      role: 'Facility Manager',
      isDemo: false,
      createdAt: new Date().toISOString(),
    };

    this.saveSession(newUser);
    return { success: true, user: newUser };
  },

  async registerUser(params: {
    name: string;
    email: string;
    organization: string;
    phone: string;
    role: UserRole;
  }): Promise<{ success: boolean; user: User }> {
    await new Promise((r) => setTimeout(r, 700));

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: params.name.trim(),
      email: params.email.trim().toLowerCase(),
      organization: params.organization.trim(),
      phone: params.phone.trim(),
      role: params.role,
      isDemo: false,
      createdAt: new Date().toISOString(),
    };

    REGISTERED_USERS.push(newUser);
    this.saveSession(newUser);
    return { success: true, user: newUser };
  },

  loginAsDemo(): User {
    this.saveSession(DEMO_USER);
    return DEMO_USER;
  },

  logout(): void {
    this.clearSession();
  },
};
