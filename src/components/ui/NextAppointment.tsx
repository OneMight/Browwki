import type { NextAppointmentProps } from "@/types/interfaces";
import { telegramLink } from "@/utils/format";
import {
  formatDate,
  getTime,
  todayKey,
  toKey
} from "@/utils/formatData";
import { MessageCircleIcon, Send } from "lucide-react";

export const NextAppointment = ({
  appointment
}: NextAppointmentProps) => {
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
                : formatDate(
                    appointment.slot.datetime_start,
                    "EEEE"
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
            <button className="w-[50%] cursor-pointer text-white border-white border rounded-xl">
              Подробнее
            </button>
          </div>
        </div>
      </>
    )
  );
};
