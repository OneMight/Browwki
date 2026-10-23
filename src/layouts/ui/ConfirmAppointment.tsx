import { bookAppointment } from "@/api/servicesApi";
import { Notification, Spinner } from "@/components";
import type { ConfirmAppointmentProps } from "@/shared/types/interfaces";
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
  const [personalData, setPersonalData] =
    useState<boolean>(false);
  const [portfolio, setPortfolio] =
    useState<boolean>(false);
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
      return bookAppointment(
        serviceId,
        slotId,
        personalData,
        portfolio
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getDateServices"]
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
  const handleSetPersonalCheckbox = () => {
    setPersonalData((state) => !state);
  };
  const handleSetPortfolio = () => {
    setPortfolio((state) => !state);
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
      <div className="flex flex-col gap-2">
        <label
          htmlFor="personal-data"
          className="flex flex-row items-center gap-1"
        >
          <input
            id="personal-data"
            type="checkbox"
            className="peer sr-only"
            onChange={handleSetPersonalCheckbox}
            defaultChecked={personalData}
          />
          <div className="w-5 h-5 mt-0.5 shrink-0 rounded-md border border-line bg-ivory flex items-center justify-center transition-all peer-checked:bg-textsecond peer-checked:border-textsecond peer-focus-visible:ring-2 peer-focus-visible:ring-textsecond/50">
            <svg
              className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="cursor-pointer">
            Нажимая на кнопку вы соглашаетесь{" "}
            <a
              href="/privacy.html"
              className="text-textsecond"
            >
              с политикой обработки персональных данных
            </a>
          </span>
        </label>
        <label
          htmlFor="portfolio"
          className="flex flex-row items-center gap-1"
        >
          <input
            id="portfolio"
            type="checkbox"
            className="peer sr-only"
            onChange={handleSetPortfolio}
            defaultChecked={portfolio}
          />
          <div className="w-5 h-5 mt-0.5 shrink-0 rounded-md border border-line bg-ivory flex items-center justify-center transition-all peer-checked:bg-textsecond peer-checked:border-textsecond peer-focus-visible:ring-2 peer-focus-visible:ring-textsecond/50">
            <svg
              className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="cursor-pointer">
            Согласен(а) на фотосъемку результатов процедуры
            и публикацию фотографий в{" "}
            <span className="text-textsecond">
              портфолио и социальных сетях мастера{" "}
            </span>
          </span>
        </label>
      </div>
      <div
        className={cn(
          "sticky py-2 bg-bgapp max-w-110 w-full flex flex-col gap-2  bottom-0 z-50 "
        )}
      >
        <button
          className={cn(
            "w-full rounded-xl cursor-pointer text-white items-center bg-textsecond h-10 transition-all disabled:opacity-45",
            "disabled:bg-textsecond/50 disabled:cursor-not-allowed"
          )}
          onClick={handleBookAppointment}
          disabled={isPending || !personalData}
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
