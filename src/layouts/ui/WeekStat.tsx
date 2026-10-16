import { PopularServices, TextStats } from "@/components";
import type { WeekStatProps } from "@/shared/types/interfaces";
import { ChartPerWeek } from "./ChartPerWeek";

export const WeekStat = ({ stats }: WeekStatProps) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <TextStats
        cancelled_appointments={
          stats.cancelled_appointments
        }
        completed_appointments={
          stats.completed_appointments
        }
        total_appointments={stats.total_appointments}
        total_revenue={stats.total_revenue}
        waiting_appointments={stats.waiting_appointments}
      />
      <div className="bg-white p-4 rounded-2xl border border-textsecond/20 w-full">
        <ChartPerWeek />
      </div>
      <div className="flex flex-col w-full gap-4">
        <h2 className="text-2xl font-bold">
          Популярные услуги
        </h2>
        <div className="flex flex-col gap-2">
          {stats.top_services.map((elem, i) => (
            <PopularServices
              key={i}
              completed_count={elem.completed_count}
              service_name={elem.service_name}
              total_ordered={elem.total_ordered}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
