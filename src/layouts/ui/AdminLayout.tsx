import { useGetAppointments } from "@/api/adminApi";
import {
  NextAppointment,
  Spinner,
  UpcomingAppoint
} from "@/components";
import { getDataAboutUser } from "@/lib/auth";
import {
  formatAllDate,
  todayKey
} from "@/utils/formatData";

export const AdminLayout = () => {
  const user = getDataAboutUser();
  const { appointments, isLoading } = useGetAppointments();
  const filteredAppointments = appointments?.filter(
    (elem) => elem.status === "BOOKED"
  );
  const splitesAppointments =
    filteredAppointments?.slice(1);
  return (
    <div className="flex flex-col items-start justify-start min-h-140">
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
          {filteredAppointments &&
          splitesAppointments &&
          filteredAppointments?.length !== 0 ? (
            <div className="flex flex-col gap-5 w-full ">
              <NextAppointment
                appointment={filteredAppointments[0]}
              />
              <div className="flex flex-col gap-3">
                <span className="font-bold text-2xl">
                  Ближайшие записи
                </span>
                <div>
                  {splitesAppointments.map((elem, i) => (
                    <UpcomingAppoint
                      appointment={elem}
                      index={i}
                      length={splitesAppointments.length}
                      key={i}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full min-h-125">
              <span className="text-xl text-black/60">
                У Вас нет записей
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
