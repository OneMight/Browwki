import type { DaysProps } from "@/types/interfaces";
import {
  formatDate,
  offsetKey,
  todayKey,
  toKeyDay
} from "@/utils/formatData";
import { nameCountOfWin } from "@/utils/nameCountOfWin";
import { cn } from "cn";
import { useMemo } from "react";

export const Days = ({
  selectedId,
  dates,
  handleSelectDate
}: DaysProps) => {
  const selectDateArray = useMemo(
    () => Array.from({ length: 7 }, (_, i) => offsetKey(i)),
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

        return slotDate === dateKey && slot.isAvailable;
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
                : "",
              count === 0 ? "opacity-50" : ""
            )}
            aria-selected={i === selectedId}
            onClick={() => handleSelectDate(i)}
            disabled={count === 0}
          >
            <span className="capitalize">
              {i === today
                ? "Сегд"
                : formatDate(i, "EEEEEE")}
            </span>
            <span className="text-xl">{toKeyDay(i)}</span>
            <span className="text-[12px]">
              {nameCountOfWin(count)}
            </span>
          </button>
        );
      })}{" "}
    </>
  );
};
