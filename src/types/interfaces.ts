export interface User {
  id: bigint;
  first_name: string;
  last_name: string;
  username: string;
  role: UserRole;
  photo_url: string;
}
export interface UserData {
  isError: boolean;
  isLoading: boolean;
  userData: AuthResponse;
}

export type UserRole = "ADMIN" | "CLIENT";

export interface AuthResponse {
  access_token: string;
  token_type: string;
  role: UserRole;
}

export interface Services {
  id: number;
  title: string;
  description: string;
  duration_minutes: number;
  is_active: boolean;
  price: number;
}
