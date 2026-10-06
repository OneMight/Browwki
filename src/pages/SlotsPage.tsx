import { useGetAllDates } from "@/api/adminApi";
import { AdminDays } from "@/components";
import { CreateSlots } from "@/layouts";
import { getTime, toKey } from "@/utils/formatData";
import { useMemo, useState } from "react";

export const SlotsPage = () => {
  const { schedule } = useGetAllDates();

  const [selectedId, setSelectedId] = useState<
    string | null
  >(null);
  const handleSelectDate = (value: string) => {
    setSelectedId(value);
  };
  const filteredDates = useMemo(
    () =>
      schedule?.map((elem) => ({
        id: elem.id,
        date: toKey(elem.datetime_start),
        time: getTime(elem.datetime_start),
        isAvailable: elem.is_available
      })),
    [schedule]
  );
  return (
    <div className="flex flex-col items-start gap-3 min-h-155">
      <h2 className="font-bold text-2xl border-b w-full pb-3 border-textsecond/20">
        Окна для записи
      </h2>
      <div className="flex flex-col items-center justify-center">
        <span className="text-textsecond">
          Клиенты видят только свободные окна. Изменения
          применяются сразу.
        </span>
        <div className="grid grid-cols-1 w-full overflow-hidden  max-w-full">
          <div className="flex flex-row gap-1 overflow-x-auto  no-scrollbar  mt-5 touch-pan-x scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <AdminDays
              dates={filteredDates}
              selectedId={selectedId}
              handleSelectDate={handleSelectDate}
            />
          </div>
        </div>
      </div>
      {selectedId && (
        <CreateSlots
          selectedId={selectedId}
          dates={filteredDates}
        />
      )}
    </div>
  );
};
