import { useGetStats } from "@/api/adminApi";
import { Spinner, Tabs } from "@/components";
import { WeekStat } from "@/layouts";
import {
  getCurrentMonthRange,
  getCurrentWeekRange
} from "@/utils/formatData";
import { useState } from "react";

export const ReportPage = () => {
  const [peroid, setPeriod] = useState<string>("week");

  const { stats } = useGetStats(peroid);
  const handleSetWeek = () => {
    setPeriod("week");
  };
  const handleSetMonth = () => {
    setPeriod("month");
  };
  const { start, end } = getCurrentWeekRange();
  const monthStart = getCurrentMonthRange();
  return (
    <div className="flex flex-col items-start w-full gap-3 min-h-155">
      <div className="flex items-center flex-row justify-between w-full pb-3 border-textsecond/20 border-b">
        <h2 className="font-bold text-2xl w-full ">
          Статистика
        </h2>
        <span className="w-full text-end mt-2">
          {peroid == "week"
            ? start + " - " + end
            : monthStart}
        </span>
      </div>

      <div className="w-full">
        <Tabs.Tabs
          className={
            "w-full flex flex-col items-center gap-5"
          }
        >
          <Tabs.TabsList className={"w-full"}>
            <Tabs.TabsTrigger
              value="week"
              onClick={handleSetWeek}
            >
              Неделя
            </Tabs.TabsTrigger>
            <Tabs.TabsTrigger
              value="month"
              onClick={handleSetMonth}
            >
              <div className="flex flex-row items-center justify-center gap-3">
                Месяц
              </div>
            </Tabs.TabsTrigger>
          </Tabs.TabsList>
          <Tabs.TabsContent
            value={"week"}
            className={
              "border-t-2 w-full relative border-secondbg pt-5"
            }
          >
            {stats ? (
              <WeekStat stats={stats} />
            ) : (
              <Spinner className="size-8" />
            )}
          </Tabs.TabsContent>
          <Tabs.TabsContent
            value={"month"}
            className={
              "border-t-2 w-full relative border-secondbg pt-5"
            }
          ></Tabs.TabsContent>
        </Tabs.Tabs>
      </div>
    </div>
  );
};
