import { useGetAppointments } from "@/api/adminApi";
import { NextAppointment, Spinner } from "@/components";
import { getDataAboutUser } from "@/lib/auth";
import {
  formatAllDate,
  todayKey
} from "@/utils/formatData";

export const AdminLayout = () => {
  const user = getDataAboutUser();
  const { appointments, isLoading } = useGetAppointments();
  return (
    <div className="flex flex-col items-start justify-start">
      <div className="flex flex-col gap-1">
        <span className="text-black/60">
          {formatAllDate(todayKey())}
        </span>
        <span className="text-2xl font-bold">
          Доброе утро, {user.username}
        </span>
      </div>
      {!appointments && isLoading ? (
        <div className="w-full flex items-center justify-center">
          <Spinner className="size-8" />
        </div>
      ) : (
        <>
          {appointments?.length !== 0 ? (
            <NextAppointment
              appointment={appointments?.[0]}
            />
          ) : (
            <div className="flex justify-center items-center w-full min-h-130">
              <span className="text-xl text-black/60">
                У вас нет записей
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
