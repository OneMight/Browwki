import { Spinner, Switch } from "@/components";
import type { CreateSlotsProps } from "@/shared/types/interfaces";
import {
  formatAllDate,
  formatTimeToISO
} from "@/utils/formatData";
import React, { Suspense, useMemo, useState } from "react";
import { LockIcon, Plus, X } from "lucide-react";
import { addNewSlot, deleteSlot } from "@/api/adminApi";
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { cn } from "cn";
export const CreateSlots = ({
  selectedId,
  dates
}: CreateSlotsProps) => {
  const filteredTimes = useMemo(() => {
    return dates?.filter(
      (elem) => elem.date === selectedId
    );
  }, [selectedId, dates]);
  const isWordingDay =
    filteredTimes?.length !== 0 ? true : false;
  const [isActive, setIsActive] = useState(isWordingDay);
  const [newTime, setNewTime] = useState("");
  const handleSetNewTime = (value: string) => {
    setNewTime(value);
  };
  const handleAddSlotTime = () => {
    mutate();
  };
  const handleIsActive = () => {
    setIsActive((state) => !state);
  };
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (newTime.length == 0) {
        throw new Error("Выберите время");
      }
      const date = formatTimeToISO(selectedId, newTime);
      return addNewSlot(date);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllDates"]
      });
    }
  });
  const { mutate: deleteMutation, isPending: isDeleting } =
    useMutation({
      mutationFn: (slot_id: number) => {
        return deleteSlot(slot_id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getAllDates"]
        });
      }
    });

  return (
    <div className="flex flex-col w-full gap-3  bg-white border border-textsecond/20 rounded-2xl p-3">
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col">
          <span className="text-xl">
            {selectedId && formatAllDate(selectedId)}
          </span>
          <span>
            {!isActive ? "Выходной" : "Рабочий день"}
          </span>
        </div>
        <Switch
          size="default"
          defaultChecked={isActive}
          aria-checked={isActive}
          onClick={handleIsActive}
        />
      </div>
      <div className="flex flex-row justify-start flex-wrap border-b pb-4 gap-5 border-textsecond/30">
        {filteredTimes?.map((elem) => (
          <div
            key={elem.id}
            className={cn(
              "flex flex-row items-center  min-w-40 justify-between p-2 rounded-2xl",
              elem.isAvailable
                ? "bg-bgapp border border-textsecond/20"
                : "bg-textsecond/40"
            )}
          >
            <div className="flex flex-col">
              <span>{elem.time}</span>
              <span>
                {elem.isAvailable ? "Свободно" : "Занято"}
              </span>
            </div>
            <>
              {elem.isAvailable ? (
                <button
                  className="cursor-pointer"
                  onClick={() => deleteMutation(elem.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Spinner className="size-3" />
                  ) : (
                    <X />
                  )}
                </button>
              ) : (
                <LockIcon className="text-textsecond size-5 gap-3" />
              )}
            </>
          </div>
        ))}
      </div>
      {isActive && (
        <div className="flex flex-row py-4 justify-between">
          <div>
            <label htmlFor="new-slot" className="sr-only">
              Время нового окна
            </label>
            <input
              id="new-slot"
              type="time"
              value={newTime}
              step={900}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement>
              ) => handleSetNewTime(e.target.value)}
              className="h-12 rounded-2xl border border-line bg-ivory px-4 font-semibold text-ink focus:border-dusty focus:outline-none"
            />
          </div>
          <button
            className="bg-textsecond flex flex-row cursor-pointer items-center gap-3 text-white p-3 rounded-2xl"
            onClick={handleAddSlotTime}
            disabled={isPending}
          >
            <Suspense
              fallback={<Spinner className="size-3" />}
            >
              <Plus className="size-4" /> Добавить окно
            </Suspense>
          </button>
        </div>
      )}
    </div>
  );
};
