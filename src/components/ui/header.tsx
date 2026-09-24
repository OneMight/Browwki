import { Bell } from "lucide-react";
export const Header = () => {
  return (
    <header className="flex flex-col w-full p-5 bg-ivory">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl">Бровист</h1>
          <span className="text-sm">
            Здравствуйте, ПОЛЬЗОВАТЕЛЬ
          </span>
        </div>
        <div>
          <button className="bg-white border border-secondbg hover:bg-secondbg rounded-full p-2 transition-all hover:cursor-pointer active:bg-bgapp">
            <Bell width={"18px"} height={"18px"} />
          </button>
        </div>
      </div>
      <div></div>
    </header>
  );
};
