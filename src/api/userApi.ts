import type { UserData } from "@/types/interfaces";
import { axiosInstance } from ".";
import { useQuery } from "@tanstack/react-query";

export const useLoginUser = (init_data: string) => {
  const LoginUser = async (): Promise<UserData> => {
    const response = await axiosInstance.post(
      "/api/auth/telegram",
      { init_data }
    );
    return response.data;
  };

  const {
    data: userData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["LoginUser", init_data],
    queryFn: LoginUser,
    enabled: !!init_data,
    retry: 1,
    staleTime: 60,
    gcTime: 60
  });

  return {
    userData,
    isError,
    isLoading
  };
};
