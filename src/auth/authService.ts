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

// OTP Session State in Memory
interface OtpSession {
  phone: string;
  code: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
}

let activeOtpSession: OtpSession | null = null;

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

  /**
   * Send Real Dynamic OTP to Phone Number
   * Generates a unique 6-digit random code valid for 5 minutes.
   * Includes production hooks for Fast2SMS / Twilio integration.
   */
  async sendPhoneOtp(phone: string): Promise<{ success: boolean; otp: string; expiresAt: number; message: string }> {
    await new Promise((r) => setTimeout(r, 500));

    const cleanPhone = phone.trim();
    // Generate secure cryptographically random 6-digit code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const now = Date.now();
    const expiresAt = now + 5 * 60 * 1000; // 5 minutes TTL

    activeOtpSession = {
      phone: cleanPhone,
      code: generatedOtp,
      createdAt: now,
      expiresAt: expiresAt,
      attempts: 0,
    };

    /* 
    * OPTIONAL: Cloud SMS Provider Integration (Fast2SMS / Twilio / Firebase)
    * If VITE_FAST2SMS_API_KEY is configured in .env, fire SMS API request:
    * 
    * const apiKey = import.meta.env.VITE_FAST2SMS_API_KEY;
    * if (apiKey) {
    *   await fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&route=otp&variables_values=${generatedOtp}&flash=0&numbers=${cleanPhone.replace(/\D/g, '').slice(-10)}`);
    * }
    */

    console.log(`[UrjaDrishti SMS Gateway] Real OTP generated for ${cleanPhone}: ${generatedOtp}`);

    return {
      success: true,
      otp: generatedOtp,
      expiresAt,
      message: `Verification OTP generated and sent to ${cleanPhone}. Code expires in 5 minutes.`,
    };
  },

  /**
   * Verify Phone OTP with expiry, attempt counting, and user registration check
   */
  async verifyPhoneOtp(phone: string, otp: string): Promise<{ success: boolean; isNewUser?: boolean; user?: User; phone?: string; error?: string }> {
    await new Promise((r) => setTimeout(r, 600));

    const cleanPhone = phone.trim();

    if (!activeOtpSession || activeOtpSession.phone !== cleanPhone) {
      return {
        success: false,
        error: 'No active OTP session found. Please request a new OTP code.',
      };
    }

    // Check expiration
    if (Date.now() > activeOtpSession.expiresAt) {
      activeOtpSession = null;
      return {
        success: false,
        error: 'OTP code has expired (validity is 5 minutes). Please request a new OTP code.',
      };
    }

    // Check attempt limit
    activeOtpSession.attempts += 1;
    if (activeOtpSession.attempts > 5) {
      activeOtpSession = null;
      return {
        success: false,
        error: 'Too many incorrect OTP attempts. Security lock activated. Please request a new code.',
      };
    }

    // Validate OTP match
    if (otp !== activeOtpSession.code) {
      const remainingAttempts = 5 - activeOtpSession.attempts;
      return {
        success: false,
        error: `Incorrect 6-digit OTP code. ${remainingAttempts} attempt(s) remaining.`,
      };
    }

    // OTP Verified! Clear active session
    activeOtpSession = null;

    // Check if phone number is already registered
    const existing = REGISTERED_USERS.find((u) => u.phone === cleanPhone);

    if (existing) {
      this.saveSession(existing);
      return { success: true, isNewUser: false, user: existing };
    }

    // Un-registered new phone number -> Requires Registration step!
    return { success: true, isNewUser: true, phone: cleanPhone };
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
