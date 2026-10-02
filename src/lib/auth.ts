import type { User, UserRole } from "@/types/interfaces";

export const handleAuthSuccess = (
  token: string,
  role: UserRole
) => {
  localStorage.setItem("access_token", token);
  localStorage.setItem("user_role", role);
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
