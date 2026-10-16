import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from ".";
import type {
  AppointmentsPerMonthResponse,
  MyAppointmentsResponse,
  ScheduledDates,
  Services,
  Stats
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
export const deleteService = async (id: number) => {
  const response = await axiosInstance.delete(
    `/api/admin/services/delete/${id}`
  );
  return response.data;
};
export const updateService = async (
  serviceData: Services
) => {
  const response = await axiosInstance.put(
    `api/admin/services/${serviceData.id}`,
    {
      ...serviceData
    }
  );
  return response.data;
};

export const addServiceQuery = async (
  serviceData: Services
) => {
  const response = await axiosInstance.post(
    "api/admin/services",
    {
      title: serviceData.title,
      description: serviceData.description,
      price: serviceData.price,
      duration_minutes: serviceData.duration_minutes,
      is_available: true
    }
  );
  return response.data;
};

export const updAppointmentStatus = async (id: number) => {
  const response = await axiosInstance.put(
    `api/admin/appointments/${id}/status/done`
  );
  return response.data;
};

export const CancelAppointmentStatus = async (
  id: number
) => {
  const response = await axiosInstance.post(
    `api/admin/appointments/${id}/cancel`
  );
  return response.data;
};
export const useGetAppointmentsPerMonth = (
  month: string | null
) => {
  const getAppointmentsPerMonth =
    async (): Promise<AppointmentsPerMonthResponse> => {
      const response = await axiosInstance.get(
        `api/admin/schedule/slots/${month}`
      );
      return response.data;
    };
  const {
    data: appointmentsPerMonth,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["appointmentsPerMonth", month],
    queryFn: getAppointmentsPerMonth,
    enabled: !!month,
    gcTime: 0,
    staleTime: 0
  });

  return {
    appointmentsPerMonth,
    isLoading,
    isError
  };
};

export const useGetStats = (period: string) => {
  const getStats = async (): Promise<Stats> => {
    const response = await axiosInstance.get(
      "api/admin/stats",
      {
        params: {
          period: period
        }
      }
    );
    return response.data;
  };
  const {
    data: stats,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["getStats", period],
    queryFn: getStats,
    staleTime: 0,
    gcTime: 0,
    enabled: !!period
  });
  return {
    stats,
    isLoading,
    isError
  };
};
