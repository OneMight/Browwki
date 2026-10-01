import type {
  MyAppointmentsResponse,
  ScheduledDates,
  Services
} from "@/types/interfaces";
import { axiosInstance } from ".";
import { useQuery } from "@tanstack/react-query";

export const useGetServices = () => {
  const getServices = async (): Promise<Services[]> => {
    const response =
      await axiosInstance.get("api/services");
    return response.data;
  };

  const {
    data: services,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["getServices"],
    queryFn: getServices,
    retry: 0,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60
  });

  return {
    services,
    isLoading,
    isError
  };
};

export const useGetDate = () => {
  const getDateServices = async (): Promise<
    ScheduledDates[]
  > => {
    const response = await axiosInstance.get(
      "api/schedule/available"
    );
    return response.data;
  };
  const {
    data: schedule,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["getDateServices"],
    queryFn: getDateServices,
    staleTime: 0,
    gcTime: 0
  });

  return {
    schedule,
    isLoading,
    isError
  };
};

export const bookAppointment = async (
  service_id: number,
  slot_id: number
) => {
  const response = await axiosInstance.post(
    "/api/appointments",
    {
      service_id: service_id,
      slot_id: slot_id
    }
  );
  return response.data;
};
export const useGetMyAppointment = () => {
  const fetchMyAppointment = async (): Promise<
    MyAppointmentsResponse[]
  > => {
    const response = await axiosInstance.get(
      "/api/clients/appointments/upcoming"
    );
    return response.data;
  };

  const {
    data: appointments,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["fetchMyAppointment"],
    queryFn: fetchMyAppointment,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60
  });

  return {
    appointments,
    isLoading,
    isError
  };
};
