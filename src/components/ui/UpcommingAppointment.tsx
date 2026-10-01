import type { UpcommingAppointmentProsp } from "@/types/interfaces";
import { telegramLink } from "@/utils/format";
import {
  formatAllDate,
  formatDuration,
  toKeyMonth
} from "@/utils/formatData";
import { BellIcon, MessageCircleIcon } from "lucide-react";

export const UpcommingAppointment = ({
  appointment
}: UpcommingAppointmentProsp) => {
  return (
    <div className="flex flex-col gap-5 bg-white p-5 border border-textsecond/20 rounded-2xl">
      <div className="flex flex-row w-full gap-3">
        <div className="flex p-4 bg-secondbg rounded-2xl max-h-15">
          <span className="text-textsecond">
            {toKeyMonth(appointment.slot.datetime_start)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold text-xl">
            {appointment.service.title}
          </span>
          <span className="text-black/60 text-lg">
            {formatAllDate(appointment.slot.datetime_start)}{" "}
            <span>
              {formatDuration(
                appointment.service.duration_minutes
              )}
            </span>
          </span>
          <span className="font-bold text-lg">
            {appointment.service.price}{" "}
            <i className="nbrb-icon">BYN</i>
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-3 text-[12px] items-center text-black/60">
        <BellIcon className="size-4" />{" "}
        <span>
          Напоминание придет{" "}
          {toKeyMonth(appointment.slot.datetime_start)}
        </span>
      </div>
      <a
        href={telegramLink("@ellissaq")}
        className="cursor-pointer flex flex-row items-center justify-center gap-4 text-lg text-textsecond bg-secondbg rounded-xl py-2"
      >
        <MessageCircleIcon /> Мастеру
      </a>
    </div>
  );
};
