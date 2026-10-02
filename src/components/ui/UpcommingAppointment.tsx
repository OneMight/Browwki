import type { UpcommingAppointmentProsp } from "@/types/interfaces";
import { telegramLink } from "@/utils/format";
import {
  formatAllDate,
  formatDuration,
  toKeyFullMonth,
  toKeyMonthnDay
} from "@/utils/formatData";
import { BellIcon, MessageCircleIcon } from "lucide-react";
import { motion } from "framer-motion";
export const UpcommingAppointment = ({
  appointment
}: UpcommingAppointmentProsp) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{
        duration: 0.2,
        ease: [0.23, 1, 0.32, 1]
      }}
      className="flex flex-col gap-5 bg-white p-5 border border-textsecond/20 rounded-2xl"
    >
      <div className="flex flex-row w-full gap-3 ">
        <div className="flex px-3 py-1 items-center justify-center bg-secondbg min-h-17 min-w-17 rounded-2xl max-h-15">
          <span className="text-textsecond text-xl w-10 text-center">
            {toKeyMonthnDay(
              appointment.slot.datetime_start
            )}
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
          {toKeyFullMonth(appointment.slot.datetime_start)}{" "}
          в 9:00
        </span>
      </div>
      <a
        href={telegramLink("@ellissaq")}
        className="cursor-pointer flex flex-row items-center justify-center gap-4 text-lg text-textsecond bg-secondbg rounded-xl py-2"
      >
        <MessageCircleIcon /> Мастеру
      </a>
    </motion.div>
  );
};
