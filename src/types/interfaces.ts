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
export type ScheduledDates = {
  id: number;
  datetime_start: string;
  is_available: boolean;
};
export type FilteredScheduledDates = {
  id: number;
  date: string;
  time: string;
  isAvailable: boolean;
};
export interface SelectDateProps {
  dates: FilteredScheduledDates[] | undefined;
  handleBackStep: () => void;
  handleSeletedTimeId: (value: number) => void;
  selectedTimeId: number | null;
}
export type Date = {
  date: string;
  availables_time_count: number;
};
export interface DaysProps {
  selectedId: string | null;
  dates: FilteredScheduledDates[] | undefined;
  handleSelectDate: (i: string) => void;
}
export interface TimeServiceProps {
  selectedId: string | null;
  selectedTimeId: number | null;
  onSelectTimeId: (value: number) => void;
  dates: FilteredScheduledDates[] | undefined;
}
