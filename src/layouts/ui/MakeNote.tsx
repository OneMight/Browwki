import eyebrush from "@/assets/eyebrush_image.jpg";
import { useMemo, useState } from "react";
import { SelectService } from "./SelectService";
import { SelectDate } from "./SelectDate";
import { useGetDate } from "@/api/servicesApi";
import { motion } from "framer-motion";
import { toKey } from "@/utils/formatData";
import { getTime } from "@/utils/formatData";
import { ConfirmAppointment } from "./ConfirmAppointment";
import { cn } from "cn";
export const MakeNote = () => {
  const { schedule } = useGetDate();
  const [step, setStep] = useState(0);
  const [selectedId, setSelectedId] = useState<
    number | null
  >(null);
  const [selectedDayId, setSelectedDayId] = useState<
    string | null
  >(null);
  const [selectedTimeId, setSelectedTimeId] = useState<
    null | string
  >(null);
  const [selectedService, setSelectedService] = useState<
    string | null
  >(null);
  const [selectSlotId, setSelectedSlotId] = useState<
    number | null
  >(null);
  const [
    seletedServiceDuration,
    setSelectedServiceDuration
  ] = useState<number | null>(null);
  const filteredDates = useMemo(
    () =>
      schedule?.map((elem) => ({
        id: elem.id,
        date: toKey(elem.datetime_start),
        time: getTime(elem.datetime_start),
        isAvailable: elem.is_available
      })),
    [schedule]
  );
  const [price, setPrice] = useState<number | null>(null);
  const isButtonDisabled =
    step === 0 ? !selectedId : !selectedTimeId;
  const stepTitles = [
    "Выберите услугу",
    "Дата и время",
    "Проверьте запись"
  ];
  const handleSetSelectedId = (
    value: number,
    price: number,
    serviceName: string,
    duration: number
  ) => {
    setSelectedId(value);
    setPrice(price);
    setSelectedService(serviceName);
    setSelectedServiceDuration(duration);
  };
  const handleSetStep = () => {
    setStep((value) => value + 1);
  };

  const handleBackStep = () => {
    setStep((value) => value - 1);
  };
  const handleSeletedTimeId = (
    value: string,
    id: number
  ) => {
    setSelectedTimeId(value);
    setSelectedSlotId(id);
  };
  const handleSetSelectedDayId = (value: string) => {
    setSelectedDayId(value);
  };
  const handleReset = () => {
    setStep(0);
    setSelectedId(null);
    setSelectedDayId(null);
    setSelectedTimeId(null);
    setPrice(null);
  };
  return (
    <div className="flex flex-col gap-4 mb-4 pb-10">
      {step == 0 && (
        <div className="flex flex-col items-start gap-2">
          <img
            src={eyebrush}
            alt="eyebrush_image"
            className="w-full rounded-3xl object-cover h-36 md:h-44"
          />
          <h2 className="text-3xl w-[70%]">
            Брови, которые{" "}
            <span className="italic text-textsecond ">
              подчеркивают Вас
            </span>
          </h2>
        </div>
      )}
      <div className="flex flex-col w-full">
        <div className="flex gap-1.5" aria-hidden>
          {stepTitles.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-200 ${i <= step ? "bg-textsecond" : "bg-line"}`}
            />
          ))}
        </div>
      </div>
      <motion.div
        className="flex flex-col items-start gap-4"
        key={step}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -16 }}
        transition={{
          duration: 0.2,
          ease: [0.23, 1, 0.32, 1]
        }}
      >
        {step == 0 && (
          <SelectService
            handleSetSelectedId={handleSetSelectedId}
            selectedId={selectedId}
          />
        )}
        {step == 1 && (
          <SelectDate
            handleSeletedTimeId={handleSeletedTimeId}
            selectedTimeId={selectedTimeId}
            selectDateId={selectedDayId}
            handleSetSelectedDayId={handleSetSelectedDayId}
            handleBackStep={handleBackStep}
            dates={filteredDates}
          />
        )}
        {step == 2 && (
          <ConfirmAppointment
            handleBackStep={handleBackStep}
            duration={seletedServiceDuration}
            selectedService={selectedService}
            selectedDayId={selectedDayId}
            selectedTimeId={selectedTimeId}
            price={price}
            serviceId={selectedId}
            slotId={selectSlotId}
            setStep={handleReset}
          />
        )}
      </motion.div>
      <div
        className={cn(
          "sticky py-2 border-t-2 border-secondbg bg-bgapp max-w-110 w-full  bottom-0 z-50 ",
          step == 2 ? "hidden" : ""
        )}
      >
        <button
          className="w-full rounded-xl cursor-pointer text-white items-center bg-textsecond h-10 transition-all disabled:opacity-45"
          onClick={handleSetStep}
          disabled={isButtonDisabled}
        >
          Продолжить{" "}
          {price ? (
            <span>
              {price} <i className="nbrb-icon">BYN</i>
            </span>
          ) : (
            ""
          )}
        </button>
      </div>
    </div>
  );
};
