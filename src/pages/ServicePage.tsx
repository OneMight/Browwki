import { useGetServices } from "@/api/servicesApi";
import {
  ServiceAdd,
  ServiceComp,
  Spinner
} from "@/components";

export const ServicePage = () => {
  const { services, isLoading } = useGetServices();

  return (
    <div className="flex flex-col items-start w-full gap-3 min-h-155">
      <h2 className="font-bold text-2xl border-b w-full pb-3 border-textsecond/20">
        Услуги и цены
      </h2>
      <div className="flex flex-col w-full gap-5">
        <div className="flex flex-row gap-2 items-center">
          <span>
            Прайс, который видят клиенты при записи
          </span>
          <ServiceAdd />
        </div>
        {!isLoading ? (
          services && services?.length !== 0 ? (
            <div className="flex flex-col items-start justify-center w-full">
              {services.map((elem, i) => (
                <ServiceComp
                  {...elem}
                  key={elem.id}
                  idElem={i}
                  serviceLength={services.length}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-125 justify-center items-center text-black/60">
              <span>У вас нет ни одной из услуг</span>
            </div>
          )
        ) : (
          <div className="flex min-h-125 justify-center items-center">
            <Spinner className="size-8" />
          </div>
        )}
      </div>
    </div>
  );
};
