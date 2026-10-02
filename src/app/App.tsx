import { useLoginUser } from "@/api/userApi";
import "./App.css";
import { Header, Spinner } from "@/components";
import {
  getDataAboutUser,
  handleAuthSuccess
} from "@/lib/auth";
import { useEffect } from "react";
import { AdminLayout, ClientLayout } from "@/layouts";
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
    <main className="flex w-full p-5 min-h-screen max-w-120 flex-col gap-3 ">
      <Header />
      {user.role == "ADMIN" ? (
        <AdminLayout />
      ) : (
        <ClientLayout />
      )}
    </main>
  );
}

export default App;
