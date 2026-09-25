import { Tabs } from "@/components";
import { MakeNote } from "./MakeNote";

export const ClientLayout = () => {
  return (
    <Tabs.Tabs
      className={"w-full flex flex-col items-center gap-5"}
    >
      <Tabs.TabsList className={"w-full"}>
        <Tabs.TabsTrigger value="MakeNote">
          Запись
        </Tabs.TabsTrigger>
        <Tabs.TabsTrigger value="MyNotes">
          Мои записи
        </Tabs.TabsTrigger>
      </Tabs.TabsList>
      <Tabs.TabsContent
        value={"MakeNote"}
        className={"border-t-2 w-full border-secondbg pt-5"}
      >
        <MakeNote />
      </Tabs.TabsContent>
    </Tabs.Tabs>
  );
};
