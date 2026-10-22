import type { DaysProps } from "@/shared/types/interfaces";
import {
  formatDate,
  offsetKey,
  todayKey,
  toKeyDay
} from "@/utils/formatData";
import { nameCountOfWinAdmin } from "@/utils/nameCountOfWin";
import { cn } from "cn";
import { useMemo } from "react";

export const AdminDays = ({
  selectedId,
  handleSelectDate,
  dates
}: DaysProps) => {
  const selectDateArray = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => offsetKey(i)),
    []
  );
  const today = todayKey();
  const getAvailableCount = useMemo(
    () => (dateKey: string) => {
      if (!dates || !Array.isArray(dates)) return 0;

      return dates.filter((slot) => {
        const slotDate =
          slot.date ||
          (slot.date ? formatDate(slot.date, "dd.MM") : "");

        return slotDate === dateKey;
      }).length;
    },
    [dates]
  );
  return (
    <>
      {selectDateArray.map((i) => {
        const count = getAvailableCount(i);
        return (
          <button
            key={i}
            className={cn(
              "flex flex-col justify-between p-2 border rounded-2xl border-textsecond/20 bg-white hover:cursor-pointer transition-all overflow-hidden min-w-18 shrink-0",
              selectedId === i
                ? "bg-textsecond text-white"
                : ""
            )}
            onClick={() => handleSelectDate(i)}
          >
            <span className="capitalize">
              {i === today
                ? "Сегд"
                : formatDate(i, "EEEEEE")}
            </span>
            <span className="text-xl">{toKeyDay(i)}</span>
            <span className="text-[10px]">
              {nameCountOfWinAdmin(count)}
            </span>
          </button>
        );
      })}
    </>
  );
};
