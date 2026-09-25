import { useLoginUser } from "@/api/userApi";
import "./App.css";
import { Header, Spinner } from "@/components";
import {
  getDataAboutUser,
  handleAuthSuccess
} from "@/lib/auth";
import { useEffect } from "react";
import { ClientLayout } from "@/layouts";
function App() {
  const tg = window.Telegram?.WebApp;
  const init_data = tg?.initData;
  const { isLoading, isError, userData } =
    useLoginUser(init_data);
  useEffect(() => {
    if (userData?.userData) {
      handleAuthSuccess(userData.userData);
    }
  }, [userData]);

  const user = getDataAboutUser();
  return (
    <main className="flex w-full p-5 justify-center items-center min-h-screen relative">
      {isLoading ? (
        <Spinner className="size-8" />
      ) : (
        <div className="max-w-120 w-full flex flex-col gap-3">
          <Header />
          {user.role !== "ADMIN" ? (
            <div></div>
          ) : (
            <ClientLayout />
          )}
        </div>
      )}
    </main>
  );
}

export default App;
