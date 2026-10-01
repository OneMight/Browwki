import { bookAppointment } from "@/api/servicesApi";
import { Notification, Spinner } from "@/components";
import type { ConfirmAppointmentProps } from "@/types/interfaces";
import {
  formatAllDate,
  formatDuration
} from "@/utils/formatData";
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { cn } from "cn";
import { ArrowLeftIcon } from "lucide-react";
import { BellIcon } from "lucide-react";
import { useState } from "react";
export const ConfirmAppointment = ({
  handleBackStep,
  duration,
  selectedDayId,
  selectedService,
  selectedTimeId,
  serviceId,
  slotId,
  price,
  setStep
}: ConfirmAppointmentProps) => {
  const queryClient = useQueryClient();
  const [notification, setNotification] = useState<{
    title: string;
    description: string;
    isError: boolean;
  } | null>(null);
  const showNotification = (
    title: string,
    description: string,
    isError = false,
    onClose?: () => void
  ) => {
    setNotification({ title, description, isError });

    setTimeout(() => {
      setNotification(null);
      if (onClose) onClose();
    }, 2000);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!serviceId || !slotId) {
        throw new Error("Не выбрана услуга или слот");
      }
      return bookAppointment(serviceId, slotId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getDateServices", "fetchMyAppointment"]
      });
      queryClient.invalidateQueries({
        queryKey: ["fetchMyAppointment"]
      });
      showNotification(
        "Успешно!",
        "Вы успешно записались на услугу.",
        false,
        () => setStep?.()
      );
    },
    onError: (err: any) => {
      const errorMessage =
        err?.response?.data?.detail ||
        err?.message ||
        "Не удалось создать запись. Попробуйте еще раз.";

      showNotification("Ошибка записи", errorMessage, true);
    }
  });
  const handleBookAppointment = () => {
    mutate();
  };
  return (
    <div className="flex flex-col">
      {notification && (
        <div className="fixed top-5 left-44 z-50 animate-in fade-in slide-in-from-top-2">
          <Notification
            title={notification.title}
            description={notification.description}
            isError={notification.isError}
          />
        </div>
      )}
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
          Проверьте запись
        </h2>
      </div>
      <div className="flex flex-col p-5 border border-textsecond/20 rounded-2xl bg-white">
        <span className="text-textsecond font-bold text-3xl">
          {selectedTimeId}
        </span>
        <span className="text-xl mt-2 mb-8">
          {selectedDayId && formatAllDate(selectedDayId)}
        </span>
        <div className="flex flex-col items-center">
          <div className="flex flex-row w-full justify-between border-y py-3 border-textsecond/20">
            <span className="text-textsecond">Услуга</span>{" "}
            <span className="font-bold">
              {selectedService}
            </span>
          </div>
          <div className="flex flex-row w-full justify-between border-b py-3 border-textsecond/20">
            <span className="text-textsecond">
              Длительность
            </span>
            <span className="font-bold">
              {duration && formatDuration(duration)}
            </span>
          </div>
          <div className="flex flex-row w-full justify-between border-b py-3 border-textsecond/20">
            <span className="text-textsecond">
              Стоимость
            </span>{" "}
            <span className="font-bold">
              {" "}
              {price} <i className="nbrb-icon">BYN</i>
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-3 mt-5 bg-secondbg rounded-2xl p-3">
          <BellIcon className="text-textsecond" />
          <span className="text-sm">
            Бот пришлёт напоминание в Telegram в день приёма
            в 09:00
          </span>
        </div>
      </div>
      <div
        className={cn(
          "sticky py-2 bg-bgapp max-w-110 w-full  bottom-0 z-50 "
        )}
      >
        <button
          className="w-full rounded-xl cursor-pointer text-white items-center bg-textsecond h-10 transition-all disabled:opacity-45"
          onClick={handleBookAppointment}
          disabled={isPending}
          aria-disabled={isPending}
        >
          {isPending ? (
            <Spinner className="size-4" />
          ) : (
            "Записаться"
          )}
        </button>
      </div>
    </div>
  );
};
