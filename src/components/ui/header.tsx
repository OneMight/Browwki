import { getDataAboutUser } from "@/lib/auth";
export const Header = () => {
  const user = getDataAboutUser();
  return (
    <header className="flex flex-col w-full bg-ivory">
      <div className="flex flex-row items-center justify-start w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl">Бровист</h1>
          <span className="text-sm">
            Здравствуйте, {user.first_name}
          </span>
        </div>
      </div>
    </header>
  );
};
