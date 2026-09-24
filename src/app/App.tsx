import { LoginUser } from "@/api/userApi";
import "./App.css";
import { Header } from "@/components";
function App() {
  const tg = window.Telegram?.WebApp;
  const user = tg?.initData;
  const currentUser = LoginUser(user);
  console.log(currentUser);
  return (
    <main className="w-full">
      <Header />
    </main>
  );
}

export default App;
