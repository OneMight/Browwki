import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from ".";
import type {
  MyAppointmentsResponse,
  ScheduledDates
} from "@/shared/types/interfaces";

export const useGetAppointments = () => {
  const getAppointments = async (): Promise<
    MyAppointmentsResponse[]
  > => {
    const response = await axiosInstance.get(
      "/api/admin/appointments/coming"
    );
    return response.data;
  };
  const {
    data: appointments,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["getAdminAppointments"],
    queryFn: getAppointments,
    gcTime: 0,
    staleTime: 0
  });
  return {
    appointments,
    isLoading,
    isError
  };
};

export const addNewSlot = async (time: string) => {
  const response = await axiosInstance.post(
    "/api/admin/schedule/slots",
    {
      datetimes: [time]
    }
  );
  return response.data;
};
export const deleteSlot = async (slot_id: number) => {
  const respose = await axiosInstance.delete(
    `/api/admin/schedule/slots/${slot_id}/delete`
  );
  return respose.data;
};

export const useGetAllDates = () => {
  const getAllDates = async (): Promise<
    ScheduledDates[]
  > => {
    const response = await axiosInstance.get(
      "api/admin/schedule/"
    );
    return response.data;
  };
  const {
    data: schedule,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["getAllDates"],
    queryFn: getAllDates,
    staleTime: 0,
    gcTime: 0
  });

  return {
    schedule,
    isLoading,
    isError
  };
};
