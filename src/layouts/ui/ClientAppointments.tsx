import {
  Spinner,
  UpcommingAppointment
} from "@/components";
import type { ClientAppointmentsProps } from "@/types/interfaces";

export const ClientAppointments = ({
  appointments,
  isLoading
}: ClientAppointmentsProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-130">
        <Spinner className="size-10" />;
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-7">
      {appointments?.length !== 0 ? (
        <>
          <span className="text-2xl">Предстоящие</span>
          {appointments &&
            appointments.map((elem) => (
              <UpcommingAppointment
                appointment={elem}
                key={elem.id}
              />
            ))}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-130">
          <span className="text-xl text-black/60">
            У вас нет записей
          </span>
        </div>
      )}
    </div>
  );
};
