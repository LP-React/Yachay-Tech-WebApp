export interface RegisterRequest {
  names: string;
  lastNames: string;
  email: string;
  password: string;
  institutionalCode?: string | null;
  phone?: string | null;
}

export interface UserResponse {
  id: number;
  roleId: number;
  roleCode: string;
  roleName: string;
  names: string;
  lastNames: string;
  email: string;
  institutionalCode?: string | null;
  phone?: string | null;
  isActive: boolean;
  lastLoginAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  fullName: string;
  email: string;
  roleCode: string;
  roleName: string;
  active: boolean;
  loginAt: string;
  message: string;
}