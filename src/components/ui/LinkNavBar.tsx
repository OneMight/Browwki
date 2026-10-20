import type { LinkNavBarProps } from "@/shared/types/interfaces";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "cn";
export const LinkNavBar = ({
  icon,
  title,
  route
}: LinkNavBarProps) => {
  const location = useLocation();
  return (
    <Link
      to={route}
      className={cn(
        "flex items-center justify-center flex-col text-[12px] p-1 rounded-2xl min-w-15 transition-all",
        location.pathname == route
          ? "text-textsecond bg-textsecond/30"
          : ""
      )}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
};
