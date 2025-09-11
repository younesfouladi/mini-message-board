import { Chats } from "./components/Chats/chatsIndex";
import Users from "./components/users/usersIndex";
import { Navigate } from "react-router-dom";
import { useUserLogin } from "./hooks/useUserLogin";
import { useEffect } from "react";

function App() {
  const isLogin = useUserLogin((states) => states.isLogin);
  const userId = useUserLogin((state) => state.userId);
  const setIsLogin = useUserLogin((states) => states.setIsLogin);

  // First Login
  useEffect(() => {
    if (
      !localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE) &&
      userId.trim() !== ""
    ) {
      localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE, `${userId}`);
    }
  }, [userId]);

  // Already Logged in
  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE)) {
      const id = localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE);
      setIsLogin(true);
    }
  }, [userId, setIsLogin]);

  return (
    <>
      {isLogin ? (
        <main
          id="container"
          className="bg-main w-full h-full font-main relative flex justify-center 2xl:justify-around"
        >
          <Users />
          <Chats />
          <aside></aside>
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default App;
