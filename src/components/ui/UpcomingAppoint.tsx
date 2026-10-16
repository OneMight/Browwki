import type { UpcomingAppointProps } from "@/shared/types/interfaces";
import {
  formatAllDate,
  formatDuration,
  getTime,
  toKeyMonth
} from "@/utils/formatData";
import { cn } from "cn";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "./Drawer";
import { ChevronRightIcon, X } from "lucide-react";
import { Avatar, AvatarFallback } from "./Avatar";
import { telegramLink } from "@/utils/format";
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import {
  CancelAppointmentStatus,
  updAppointmentStatus
} from "@/api/adminApi";

export const UpcomingAppoint = ({
  appointment,
  index,
  length,
  calendar
}: UpcomingAppointProps) => {
  const queryClient = useQueryClient();
  const { mutate: MutateMakeDone } = useMutation({
    mutationFn: () => {
      if (!appointment.id) {
        throw new Error("Выберите слот");
      }
      return updAppointmentStatus(appointment.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAdminAppointments"]
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllDates"]
      });
      calendar &&
        queryClient.invalidateQueries({
          queryKey: ["appointmentsPerMonth"]
        });
    }
  });
  const { mutate: MutateCancel } = useMutation({
    mutationFn: () => {
      if (!appointment.id) {
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
      calendar &&
        queryClient.invalidateQueries({
          queryKey: ["appointmentsPerMonth"]
        });
    }
  });
  const handleCancelStatusBtn = () => {
    MutateCancel();
  };
  const handleMakeDoneBtn = () => {
    MutateMakeDone();
  };
  return (
    <Drawer showSwipeHandle swipeDirection="down">
      <DrawerTrigger
        render={
          <button
            className={cn(
              "flex flex-row items-center justify-start bg-white p-2 w-full border border-textsecond/20 gap-5 hover:bg-textsecond/20 transition-all cursor-pointer",
              index == 0 ? "rounded-t-2xl" : "",
              index == length - 1 ? "rounded-b-2xl" : ""
            )}
          >
            <div className="flex flex-col items-center gap-2">
              {!calendar && (
                <span>
                  {toKeyMonth(
                    appointment.slot.datetime_start
                  )}
                </span>
              )}
              <span className="font-bold">
                {getTime(appointment.slot.datetime_start)}
              </span>
            </div>
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex flex-col items-start">
                <span className="font-bold">
                  {appointment.client.first_name} |{" @"}
                  {appointment.client.username}
                </span>
                <span
                  className={cn(
                    "text-start",
                    calendar ? "text-black/60" : ""
                  )}
                >
                  {appointment.service.title}
                </span>
              </div>
              {appointment.status == "COMPLETED" ? (
                <span
                  className="text-[12px] bg-textsecond/20
                 p-2 rounded-2xl"
                >
                  Выполнена
                </span>
              ) : (
                calendar && (
                  <ChevronRightIcon className="size-4 text-textsecond" />
                )
              )}
            </div>
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
            <span className="text-start">Запись</span>
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
                className={"bg-textsecond/30 size-12"}
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
                {getTime(appointment.slot.datetime_start)}
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
                    appointment.service.duration_minutes
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
            </div>
          </div>
          <DrawerClose
            onClick={handleMakeDoneBtn}
            render={
              <button className="bg-textsecond text-white w-full p-3 rounded-xl text-[16px] hover:bg-textsecond/20 transition-colors cursor-pointer" />
            }
          >
            Отметить выполненной
          </DrawerClose>
          <DrawerClose
            onClick={handleCancelStatusBtn}
            render={
              <button className="bg-white border border-textsecond/20 text-textsecond w-full p-3 rounded-xl text-[16px] hover:bg-textsecond/20 transition-colors cursor-pointer" />
            }
          >
            Отменить запись
          </DrawerClose>
        </DrawerDescription>
      </DrawerContent>
    </Drawer>
  );
};
