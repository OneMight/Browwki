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
    <div className="sticky bottom-0 flex flex-row items-center justify-between border-t pt-2 pb-10 border-textsecond/20 bg-bgapp">
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
