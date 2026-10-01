import { TimeService } from "@/components";
import { Days } from "@/components/ui/days";
import type { SelectDateProps } from "@/types/interfaces";
import { ArrowLeftIcon } from "lucide-react";

export const SelectDate = ({
  dates,
  handleBackStep,
  handleSeletedTimeId,
  selectedTimeId,
  handleSetSelectedDayId,
  selectDateId
}: SelectDateProps) => {
  return (
    <div className="py-4">
      <div className="w-full flex flex-row items">
        <button
          type="button"
          onClick={handleBackStep}
          aria-label="Назад"
          className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full text-black transition-colors hover:bg-petal hover:cursor-pointer"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h2 className="text-2xl text-black text-start w-full">
          Дата и время
        </h2>
      </div>
      <div className="grid grid-cols-1 w-full overflow-hidden  max-w-full">
        <div className="flex flex-row gap-1 overflow-x-auto  no-scrollbar  mt-5 touch-pan-x scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <Days
            dates={dates}
            selectedId={selectDateId}
            handleSelectDate={handleSetSelectedDayId}
          />
        </div>
      </div>
      {selectDateId && (
        <TimeService
          dates={dates}
          selectedId={selectDateId}
          selectedTimeId={selectedTimeId}
          onSelectTimeId={handleSeletedTimeId}
        />
      )}
    </div>
  );
};
