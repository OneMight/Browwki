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
  handleSeletedTimeId: (value: string, id: number) => void;
  selectedTimeId: string | null;
  selectDateId: string | null;
  handleSetSelectedDayId: (value: string) => void;
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
  selectedTimeId: string | null;
  onSelectTimeId: (value: string, id: number) => void;
  dates: FilteredScheduledDates[] | undefined;
}
export interface ConfirmAppointmentProps {
  handleBackStep: () => void;
  duration: number | null;
  selectedService: string | null;
  selectedDayId: string | null;
  selectedTimeId: string | null;
  price: number | null;
  serviceId: number | null;
  slotId: number | null;
  setStep: () => void;
}

export interface NofiticationProps {
  className?: string;
  title: string;
  description: string;
  isError?: boolean;
}
export interface MyAppointmentsResponse {
  id: number;
  service: Services;
  slot: ScheduledDates;
  status: "BOOKED";
}

export interface ClientAppointmentsProps {
  appointments: MyAppointmentsResponse[] | undefined;
  isLoading: boolean;
}
export interface UpcommingAppointmentProsp {
  appointment: MyAppointmentsResponse;
}
