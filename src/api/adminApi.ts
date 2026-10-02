import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from ".";
import type { MyAppointmentsResponse } from "@/types/interfaces";

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
