import type {
  ServiceCompPros,
  Services
} from "@/shared/types/interfaces";
import { formatDuration } from "@/utils/formatData";
import { cn } from "cn";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "./Drawer";
import { LabelnInput } from "./LabelnInput";
import { X, Trash } from "lucide-react";
import {
  deleteService,
  updateService
} from "@/api/adminApi";
import { useState } from "react";
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

export const ServiceComp = ({
  id,
  description,
  duration_minutes,
  price,
  title,
  serviceLength,
  idElem
}: ServiceCompPros) => {
  const queryClient = useQueryClient();
  const { mutate: mutateUpd } = useMutation({
    mutationFn: () => {
      if (!id) {
        throw new Error("Не верно выбрана услуга");
      }
      return updateService(serviceData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getServices"]
      });
    }
  });
  const [serviceData, updServiceData] = useState({
    id: id || 0,
    title: title || "",
    description: description || "",
    price: price || 0,
    duration_minutes: duration_minutes || 0
  });
  const handleDelete = () => {
    mutateDelete();
  };
  const handleUpdateServiceData = (
    key: keyof typeof serviceData,
    value: string | number
  ) => {
    updServiceData((object: Services) => ({
      ...object,
      [key]: value
    }));
  };
  const { mutate: mutateDelete } = useMutation({
    mutationFn: () => {
      if (!id) {
        throw new Error("Не верно выбрана услуга");
      }
      return deleteService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getServices"]
      });
    }
  });
  const handleUpdateService = () => {
    mutateUpd();
  };
  return (
    <Drawer showSwipeHandle swipeDirection="down">
      <DrawerTrigger
        render={
          <div
            id={"service-" + id}
            key={id}
            className={cn(
              "flex flex-row items-center gap-3 border-[0.5px] border-textsecond/10 w-full bg-white p-3",
              idElem == 0 ? "rounded-t-2xl" : "",
              idElem == serviceLength - 1
                ? "rounded-b-2xl"
                : "",
              "hover:cursor-pointer hover:bg-textsecond/10 transition-all"
            )}
          />
        }
      >
        <div className="flex flex-row items-center justify-between w-full gap-1">
          <div className="w-full text-start">
            <h2 className="text-lg">{title}</h2>
            <span className="text-[12px]">
              {description} |{" "}
              {formatDuration(duration_minutes)}
            </span>
          </div>

          <div className="min-w-7 flex flex-row gap-1 items-center">
            {price} <i className="nbrb-icon">BYN</i>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="max-h-screen overflow-y-auto pb-[max(1rem,env(safe-area-inset-bottom))]">
        <DrawerHeader>
          <DrawerTitle
            className={
              "flex flex-row items-center justify-between text-2xl w-full"
            }
          >
            <span className="text-start">
              Изменить услугу
            </span>
            <DrawerClose
              render={
                <button className="cursor-pointer bg-textsecond/20 p-2 rounded-full" />
              }
            >
              <X className="text-textsecond" />
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription
            className={
              "flex flex-col items-start justify-center gap-1 mb-6"
            }
          >
            <LabelnInput
              label="Название"
              className="w-full"
              lastValue={serviceData.title}
              onChange={(val) =>
                handleUpdateServiceData("title", val)
              }
            />
            <LabelnInput
              label="Описание"
              lastValue={serviceData.description}
              className="w-full"
              onChange={(val) =>
                handleUpdateServiceData("description", val)
              }
            />
            <div className="flex flex-row w-full gap-3">
              <LabelnInput
                label="Длительность"
                lastValue={serviceData.duration_minutes}
                className="w-[48%]"
                tel="tel"
                onChange={(val) =>
                  handleUpdateServiceData(
                    "duration_minutes",
                    val
                  )
                }
              />
              <LabelnInput
                label="Цена, BYN"
                className="w-[48%]"
                tel="tel"
                lastValue={serviceData.price}
                onChange={(val) =>
                  handleUpdateServiceData("price", val)
                }
              />
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex items-center gap-2 flex-row">
          <DrawerClose>
            <button
              className="p-3 rounded-xl w-11.5 border border-textsecond/30 bg-white cursor-pointer"
              onClick={handleDelete}
            >
              <Trash className="text-textsecond size-5" />
            </button>
          </DrawerClose>
          <DrawerClose className={"w-full"}>
            <button
              className="bg-textsecond p-3.25 w-full text-white rounded-2xl cursor-pointer"
              onClick={handleUpdateService}
            >
              Сохранить
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
