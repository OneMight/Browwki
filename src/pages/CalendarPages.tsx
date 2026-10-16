import { useGetAppointmentsPerMonth } from "@/api/adminApi";
import {
  fromKey,
  getTime,
  mounthDayOf,
  todayKey,
  toKey
} from "@/utils/formatData";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { useState } from "react";
import { ServerDay, UpcomingAppoint } from "@/components";
import { format } from "date-fns";
import { cn } from "cn";
export const CalendarPage = () => {
  const [selectedDay, setSelectedDay] =
    useState<Date | null>(fromKey(todayKey()));
  const [monthSelect, setmonthSelected] = useState(
    selectedDay ? format(selectedDay, "yyyy-MM") : null
  );
  const { appointmentsPerMonth } =
    useGetAppointmentsPerMonth(monthSelect);

  const getCountOfSlotPerDay =
    appointmentsPerMonth &&
    Object.entries(appointmentsPerMonth).map(
      ([date, list]) => ({
        date,
        list,
        scheduled_slots: list?.length
      })
    );

  const highlightedDays = getCountOfSlotPerDay?.map(
    (elem) => mounthDayOf(elem.date),
    [selectedDay]
  );
  const handleMonthChange = (date: Date) => {
    setmonthSelected(format(date, "yyyy-MM"));
  };
  return (
    <div className="flex flex-col items-start w-full gap-3 min-h-155">
      <h2 className="font-bold text-2xl border-b w-full pb-3 border-textsecond/20">
        Календарь
      </h2>
      <DateCalendar
        className="bg-white rounded-2xl border border-textsecond/20 [&_.Mui-selected]:bg-textsecond/80! [&_.Mui-selected]:text-white! 
        [&_.Mui-selected:hover]:bg-textsecond/60! 
        [&_.MuiPickersDay-today]:bg-textsecond/20!"
        value={selectedDay}
        onMonthChange={handleMonthChange}
        onChange={(value) => setSelectedDay(value)}
        slots={{
          day: ServerDay
        }}
        slotProps={{
          day: {
            highlightedDays
          } as any
        }}
      />
      <div className="flex flex-col w-full">
        {appointmentsPerMonth &&
          selectedDay &&
          appointmentsPerMonth[toKey(selectedDay)]?.map(
            (appointment, i) =>
              !appointment.appointment ? (
                <div
                  className={cn(
                    "flex flex-row w-full gap-4 bg-white px-2 py-6 border border-textsecond/20",
                    i == 0 ? "rounded-t-2xl" : "",
                    i ==
                      appointmentsPerMonth[
                        toKey(selectedDay)
                      ].length -
                        1
                      ? "rounded-b-2xl"
                      : ""
                  )}
                  key={i}
                >
                  <span className="font-bold">
                    {getTime(appointment.datetime_start)}
                  </span>
                  <span className="text-black/60">
                    Окно не занято
                  </span>
                </div>
              ) : (
                <UpcomingAppoint
                  appointment={appointment.appointment}
                  index={i}
                  length={
                    appointmentsPerMonth[toKey(selectedDay)]
                      .length
                  }
                  calendar
                  key={i}
                />
              )
          )}
      </div>
    </div>
  );
};
