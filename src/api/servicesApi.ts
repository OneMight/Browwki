import type {
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
    staleTime: 60 * 60,
    gcTime: 60 * 60
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
    gcTime: 60 * 60 * 24,
    staleTime: 60 * 60 * 24
  });

  return {
    schedule,
    isLoading,
    isError
  };
};
