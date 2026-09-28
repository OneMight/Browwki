import type { Services } from "@/types/interfaces";
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
