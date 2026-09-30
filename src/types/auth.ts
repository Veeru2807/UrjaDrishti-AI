export type UserRole = 
  | 'Building Owner'
  | 'Facility Manager'
  | 'Energy Manager'
  | 'Operations Manager'
  | 'Architect'
  | 'Consultant'
  | 'Other';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  role?: UserRole;
  isDemo?: boolean;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
