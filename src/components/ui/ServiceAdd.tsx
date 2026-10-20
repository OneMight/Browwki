import { Plus, X } from "lucide-react";
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
import { Spinner } from "./spinner";
import { Suspense, useState } from "react";
import type { Services } from "@/shared/types/interfaces";
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { addServiceQuery } from "@/api/adminApi";

export const ServiceAdd = () => {
  const queryClient = useQueryClient();
  const [serviceData, addService] = useState({
    id: 0,
    title: "",
    description: "",
    price: 0,
    duration_minutes: 0
  });
  const handleUpdateServiceData = (
    key: keyof typeof serviceData,
    value: string | number
  ) => {
    addService((object: Services) => ({
      ...object,
      [key]: value
    }));
  };
  const { mutate } = useMutation({
    mutationFn: () => {
      if (
        !serviceData.description ||
        !serviceData.duration_minutes ||
        !serviceData.price ||
        !serviceData.title
      ) {
        throw new Error("Не верно выбрана услуга");
      }
      return addServiceQuery(serviceData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getServices"]
      });
    }
  });
  const handleAddService = () => {
    mutate();
  };
  return (
    <Drawer showSwipeHandle swipeDirection="down">
      <DrawerTrigger
        render={
          <button className="bg-textsecond flex flex-row cursor-pointer items-center gap-3 text-white p-3 rounded-2xl">
            <Suspense
              fallback={<Spinner className="size-3" />}
            >
              <Plus className="size-4" /> Услуга
            </Suspense>
          </button>
        }
      ></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle
            className={
              "flex flex-row items-center justify-between text-2xl w-full"
            }
          >
            <span className="text-start">
              Добавить услугу
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
              "flex flex-col items-start justify-center gap-2 mb-6"
            }
          >
            <LabelnInput
              label="Название"
              className="w-full"
              onChange={(val) =>
                handleUpdateServiceData("title", val)
              }
            />
            <LabelnInput
              label="Описание"
              className="w-full"
              onChange={(val) =>
                handleUpdateServiceData("description", val)
              }
            />
            <div className="flex flex-row w-full gap-3">
              <LabelnInput
                label="Длительность, мин"
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
                onChange={(val) =>
                  handleUpdateServiceData("price", val)
                }
              />
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex items-center gap-2 flex-row">
          <DrawerClose className={"w-full"}>
            <button
              className="bg-textsecond p-3.25 w-full text-white rounded-2xl cursor-pointer"
              onClick={handleAddService}
            >
              Сохранить
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
