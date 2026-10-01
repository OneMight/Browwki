import { UpcommingAppointment } from "@/components";
import type { ClientAppointmentsProps } from "@/types/interfaces";

export const ClientAppointments = ({
  appointments,
  isLoading
}: ClientAppointmentsProps) => {
  return (
    <div className="flex flex-col gap-7">
      <span className="text-2xl">Предстоящие</span>
      {appointments &&
        appointments.map((elem) => (
          <UpcommingAppointment
            appointment={elem}
            key={elem.id}
          />
        ))}
    </div>
  );
};
