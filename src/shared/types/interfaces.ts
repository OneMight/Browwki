import type { ReactNode } from "react";

export type User = {
  id: bigint;
  first_name: string;
  last_name: string;
  username: string;
  role: UserRole;
  photo_url: string;
};
export type Client = Pick<User, "first_name" | "username">;
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
  is_active?: boolean;
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
  client: Client;
  service: Services;
  slot: ScheduledDates;
  status: Status;
}
export type Status =
  | "BOOKED"
  | "COMPLETED"
  | "CANCELLED_BY_ADMIN";

export interface ClientAppointmentsProps {
  appointments: MyAppointmentsResponse[] | undefined;
  isLoading: boolean;
}
export type UpcommingAppointmentProsp = {
  appointment: MyAppointmentsResponse;
};
export type Optional<T> = T | undefined;
export type NextAppointmentProps = {
  appointment: Optional<
    UpcommingAppointmentProsp["appointment"]
  >;
};
export type LinkNavBarProps = {
  icon: ReactNode;
  title: string;
  route: string;
};
export interface CreateSlotsProps {
  selectedId: string | null;
  dates: FilteredScheduledDates[] | undefined;
}

export interface LabelnInputProps {
  label: string;
  lastValue?: string | number;
  type?: string;
  onChange?: (value: string | number) => void;
}

export type ServiceCompPros = Optional<Services> & {
  serviceLength: number;
  idElem: number;
};

export interface UpcomingAppointProps {
  appointment: MyAppointmentsResponse;
  index: number;
  length: number;
  calendar?: boolean;
}

export type ScheduleSlotResponse = ScheduledDates & {
  appointment: AppointmentShort | null;
};
export type AppointmentShort = {
  client: Pick<Client, "first_name" | "username">;
} & {
  id: number;
  status: Status;
  service: Services;
  slot: ScheduledDates;
};
export type AppointmentsPerMonthResponse = Record<
  string,
  ScheduleSlotResponse[]
>;
export type DailyStats = {
  date: string;
  completed_count: number;
  total_booked: number;
};
export type ServiceTop = {
  completed_count: number;
  service_name: string;
  total_ordered: number;
};
export type Stats = {
  cancelled_appointments: number;
  completed_appointments: number;
  total_appointments: number;
  total_revenue: number;
  waiting_appointments: number;
  daily_stats: DailyStats[];
  top_services: ServiceTop[];
};
export interface WeekStatProps {
  stats: Stats;
}
export type TextStatsProps = Pick<
  Stats,
  | "cancelled_appointments"
  | "completed_appointments"
  | "total_appointments"
  | "total_revenue"
  | "waiting_appointments"
>;
