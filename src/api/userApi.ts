import type { User } from "@/types/interfaces";
import { axiosInstance } from ".";

export const LoginUser = async (
  init_data: string | undefined
) => {
  try {
    const response = await axiosInstance.post(
      "/api/auth/telegram",
      { init_data }
    );
    return response.data;
  } catch (e) {
    console.log("Auth Error: ", e);
  }
};
