import { LinkNavBar } from "@/components/ui/LinkNavBar";
import { ROUTES } from "@/shared/routers/routePath";
import {
  Home,
  CalendarDaysIcon,
  Clock,
  PenIcon,
  ChartColumn
} from "lucide-react";
export const AdminNavBar = () => {
  return (
    <div className="sticky bottom-0 w-full grid grid-cols-5 items-center border-t border-textsecond/20 bg-bgapp pt-2 pb-[calc(1rem+env(safe-area-inset-bottom))] px-1 z-50">
      <LinkNavBar
        route={ROUTES.ADMINHOME}
        icon={<Home />}
        title="Главная"
      />
      <LinkNavBar
        route={ROUTES.SCHEDULE}
        icon={<CalendarDaysIcon />}
        title="Календарь"
      />
      <LinkNavBar
        route={ROUTES.SLOTS}
        icon={<Clock />}
        title="Окна"
      />
      <LinkNavBar
        route={ROUTES.SERVICES}
        icon={<PenIcon />}
        title="Услуги"
      />
      <LinkNavBar
        route={ROUTES.REPORT}
        icon={<ChartColumn />}
        title="Отчеты"
      />
    </div>
  );
};
