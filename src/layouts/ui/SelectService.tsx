import { useGetServices } from "@/api/servicesApi";
import { Spinner } from "@/components";
import { formatDuration } from "@/utils/formatData";
import { cn } from "cn";
import { CheckIcon } from "lucide-react";
interface SelectServicesProps {
  handleSetSelectedId: (
    value: number,
    price: number
  ) => void;
  selectedId: number | null;
}
export const SelectService = ({
  handleSetSelectedId,
  selectedId
}: SelectServicesProps) => {
  const { services, isError, isLoading } = useGetServices();
  if (isLoading || isError) {
    <Spinner className="size-4" />;
  }
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl text-textsecond text-start w-full">
        Выберите услугу
      </h2>
      <div
        role="radiogroup"
        className="flex flex-col items-start"
      >
        {services &&
          services.map((elem) => {
            const active = elem.id === selectedId;
            return (
              <button
                type="button"
                role="radio"
                aria-checked={active}
                id={"service-" + elem.id}
                key={elem.id}
                onClick={() =>
                  handleSetSelectedId(elem.id, elem.price)
                }
                className={cn(
                  "flex flex-row items-center gap-3 border-[0.5px] border-textsecond/10 w-full bg-white p-3",
                  elem.id == 1 ? "rounded-t-2xl" : "",
                  services.length == elem.id
                    ? "rounded-b-2xl"
                    : 0,
                  "hover:cursor-pointer hover:bg-textsecond/10 transition-all",
                  selectedId === elem.id
                    ? "bg-textsecond/10"
                    : "",
                  "active:bg-white"
                )}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ${
                    active
                      ? "border-textsecond bg-textsecond text-white"
                      : "border-textsecond/50 bg-white"
                  }`}
                  aria-hidden
                >
                  {active && (
                    <CheckIcon
                      className="h-3.5 w-3.5 border-textsecond/10"
                      strokeWidth={3}
                    />
                  )}
                </span>
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="w-full text-start">
                    <h2 className="text-lg">
                      {elem.title}
                    </h2>
                    <span className="text-[12px]">
                      {elem.description} |{" "}
                      {formatDuration(
                        elem.duration_minutes
                      )}
                    </span>
                  </div>

                  <div className="min-w-7">
                    {elem.price}{" "}
                    <i className="nbrb-icon">BYN</i>
                  </div>
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
};
