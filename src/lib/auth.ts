import type {
  AuthResponse,
  User,
  UserRole
} from "@/types/interfaces";

export const handleAuthSuccess = (data: AuthResponse) => {
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("user_role", data.role);
};

export const getDataAboutUser = (): User => {
  const user = window.Telegram?.WebApp.initDataUnsafe.user;
  const user_role = localStorage.getItem("user_role");
  return {
    ...user,
    role: isUserRole(user_role) ? user_role : "CLIENT"
  };
};

export const isUserRole = (
  value: string | null
): value is UserRole => {
  return value === "CLIENT" || value === "ADMIN";
};
