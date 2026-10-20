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
        "flex items-center justify-center flex-col text-[10px] py-1 px-0.5 rounded-2xl w-full transition-all leading-tight text-center",
        location.pathname == route
          ? "text-textsecond bg-textsecond/30"
          : ""
      )}
    >
      {icon}
      <span className="truncate w-full">{title}</span>
    </Link>
  );
};
