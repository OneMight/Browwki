import { useLoginUser } from "@/api/userApi";
import "./App.css";
import { Spinner } from "@/components";
import {
  getDataAboutUser,
  handleAuthSuccess
} from "@/lib/auth";
import { useEffect } from "react";
import { Outlet } from "@tanstack/react-router";
import { AdminNavBar } from "@/layouts/ui/AdminNavBar";
function App() {
  const tg = window.Telegram?.WebApp;
  const init_data = tg?.initData;
  const { isLoading, isError, userData } =
    useLoginUser(init_data);
  useEffect(() => {
    if (userData?.access_token) {
      handleAuthSuccess(
        userData.access_token,
        userData.role
      );
    }
  }, [userData]);

  const user = getDataAboutUser();
  if (isLoading || isError) {
    return (
      <main className="flex w-full min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </main>
    );
  }
  return (
    <main className="flex w-full p-5 pb-0 min-h-screen max-w-120 flex-col gap-3 ">
      <Outlet />
      {user.role === "ADMIN" && <AdminNavBar />}
    </main>
  );
}

export default App;
