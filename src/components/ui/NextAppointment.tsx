import type { NextAppointmentProps } from "@/shared/types/interfaces";
import { telegramLink } from "@/utils/format";
import {
  formatAllDate,
  formatDuration,
  getTime,
  todayKey,
  toKey
} from "@/utils/formatData";
import { Send, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "./Drawer";
import { Avatar, AvatarFallback } from "./Avatar";
import { CancelAppointmentStatus } from "@/api/adminApi";
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

export const NextAppointment = ({
  appointment
}: NextAppointmentProps) => {
  const queryClient = useQueryClient();

  const { mutate: MutateCancel } = useMutation({
    mutationFn: () => {
      if (!appointment?.id) {
        throw new Error("Выберите слот");
      }
      return CancelAppointmentStatus(appointment.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAdminAppointments"]
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllDates"]
      });
    }
  });
  const handleCancelStatusBtn = () => {
    MutateCancel();
  };

  const today = todayKey();
  return (
    appointment && (
      <>
        <div className="bg-textsecond rounded-2xl mt-5 w-full flex flex-col p-4 gap-3">
          <div>
            <span className="text-sm  text-white/80">
              Следующая запись
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-3xl">
              {getTime(appointment.slot.datetime_start)}
            </span>
            <span className="text-white/80 text-sm ">
              {today ===
              toKey(appointment.slot.datetime_start)
                ? "Сегодня"
                : formatAllDate(
                    appointment.slot.datetime_start
                  )}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-white">
              {appointment.client.first_name}
            </span>
            <span className="text-white/80">
              {appointment.service.title} ·{" @"}
              {appointment.client.username}
            </span>
          </div>
          <div className="flex flex-row gap-3">
            <a
              href={telegramLink(
                appointment.client.username
              )}
              className="cursor-pointer flex flex-row items-center justify-center gap-4 text-lg text-textsecond bg-secondbg rounded-xl py-2 w-[50%]"
            >
              <Send /> Написать
            </a>
            <Drawer showSwipeHandle swipeDirection="down">
              <DrawerTrigger
                render={
                  <button className="w-[50%] cursor-pointer text-white border-white border rounded-xl">
                    Подробнее
                  </button>
                }
              />
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle
                    className={
                      "flex flex-row items-center justify-between text-2xl w-full mb-2"
                    }
                  >
                    <span className="text-start">
                      Запись
                    </span>
                    <DrawerClose
                      render={
                        <button className="cursor-pointer bg-textsecond/20 p-2 rounded-full" />
                      }
                    >
                      <X className="text-textsecond" />
                    </DrawerClose>
                  </DrawerTitle>
                </DrawerHeader>
                <DrawerDescription
                  className={
                    "flex flex-col items-start justify-center gap-2 mb-6 px-4 w-full"
                  }
                >
                  <div className="flex flex-col w-full gap-4">
                    <div className="flex flex-row items-center gap-5">
                      <Avatar
                        className={
                          "bg-textsecond/30 size-12"
                        }
                      >
                        <AvatarFallback>
                          {appointment.client.first_name}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <span className="text-xl font-bold">
                          {appointment.client.first_name}
                        </span>
                        <span className="text-sm text-black/50">
                          @{appointment.client.username}
                        </span>
                      </div>
                    </div>
                    <a
                      href={telegramLink(
                        appointment.client.username
                      )}
                      className="w-full text-center text-textsecond p-2 text-lg font-bold bg-textsecond/20 rounded-2xl"
                    >
                      Написать в Telegram
                    </a>
                  </div>
                  <div className="p-5 w-full rounded-2xl bg-white">
                    <div className="flex flex-col items-start border-b pb-3 border-textsecond/20">
                      <span className="font-bold text-2xl">
                        {getTime(
                          appointment.slot.datetime_start
                        )}
                      </span>
                      <span>
                        {formatAllDate(
                          appointment.slot.datetime_start
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                      <div className="flex flex-row gap-10 items-center w-full justify-between">
                        <span className="text-[16px] text-black/60">
                          Услуга
                        </span>
                        <span className="font-bold text-right text-[16px]">
                          {appointment.service.title}
                        </span>
                      </div>
                      <div className="flex flex-row items-center w-full justify-between">
                        <span className="text-[16px] text-black/60">
                          Длительность
                        </span>
                        <span className="font-bold text-[16px]">
                          {formatDuration(
                            appointment.service
                              .duration_minutes
                          )}
                        </span>
                      </div>
                      <div className="flex flex-row items-center w-full justify-between">
                        <span className="text-[16px] text-black/60">
                          Стоимость
                        </span>
                        <span className="font-bold text-[16px]">
                          {appointment.service.price}{" "}
                          <i className="nbrb-icon">BYN</i>
                        </span>
                      </div>
                      <div className="flex flex-row items-center w-full justify-between">
                        <span className="text-[16px] text-black/60">
                          Согласение на обработку в
                          портфолио
                        </span>
                        <span className="font-bold text-[16px]">
                          {appointment.portfolio_checkbox
                            ? "Да"
                            : "Нет"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <DrawerClose
                    onClick={handleCancelStatusBtn}
                    render={
                      <button className="bg-textsecond w-full p-3 rounded-xl text-[16px] hover:bg-textsecond/20 transition-colors text-white cursor-pointer" />
                    }
                  >
                    Отменить запись
                  </DrawerClose>
                </DrawerDescription>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </>
    )
  );
};
