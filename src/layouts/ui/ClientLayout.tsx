import { Spinner, Tabs } from "@/components";
import { MakeNote } from "./MakeNote";
import { useGetMyAppointment } from "@/api/servicesApi";
import { ClientAppointments } from "./ClientAppointments";

export const ClientLayout = () => {
  const { appointments, isLoading } = useGetMyAppointment();
  console.log(appointments);
  return (
    <Tabs.Tabs
      className={"w-full flex flex-col items-center gap-5"}
    >
      <Tabs.TabsList className={"w-full"}>
        <Tabs.TabsTrigger value="MakeNote">
          Запись
        </Tabs.TabsTrigger>
        <Tabs.TabsTrigger value="MyNotes">
          <div className="flex flex-row items-center justify-center gap-3">
            <span>Мои записи</span>
            {isLoading ? (
              <Spinner className="size-2" />
            ) : (
              <>
                {appointments && (
                  <span className="border bg-textsecond/70 text-secondbg rounded-full px-1.5 pb-0.5">
                    {appointments.length}
                  </span>
                )}
              </>
            )}
          </div>
        </Tabs.TabsTrigger>
      </Tabs.TabsList>
      <Tabs.TabsContent
        value={"MakeNote"}
        className={
          "border-t-2 w-full relative border-secondbg pt-5"
        }
      >
        <MakeNote />
      </Tabs.TabsContent>
      <Tabs.TabsContent
        value={"MyNotes"}
        className={
          "border-t-2 w-full relative border-secondbg pt-5"
        }
      >
        <ClientAppointments
          appointments={appointments}
          isLoading={isLoading}
        />
      </Tabs.TabsContent>
    </Tabs.Tabs>
  );
};
