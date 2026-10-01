import type { TimeServiceProps } from "@/types/interfaces";
import { formatAllDate } from "@/utils/formatData";
import { cn } from "cn";
import { useMemo } from "react";

export const TimeService = ({
  selectedId,
  selectedTimeId,
  onSelectTimeId,
  dates
}: TimeServiceProps) => {
  const filteredTimes = useMemo(() => {
    return dates?.filter(
      (elem) => elem.date === selectedId
    );
  }, [selectedId]);
  return (
    <div className="flex flex-col gap-5 mt-5">
      <h2 className="text-textsecond">
        {selectedId && formatAllDate(selectedId)}
      </h2>
      <div className="flex flex-row justify-start flex-wrap gap-2.5">
        {filteredTimes?.map((elem) => (
          <button
            key={elem.id}
            className={cn(
              "flex flex-col justify-between p-2 border rounded-xl border-textsecond/20 bg-white hover:cursor-pointer transition-all min-w-25",
              selectedTimeId === elem.time
                ? "bg-textsecond text-white"
                : ""
            )}
            aria-selected={elem.time === selectedTimeId}
            onClick={() =>
              onSelectTimeId(elem.time, elem.id)
            }
          >
            <span>{elem.time}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
