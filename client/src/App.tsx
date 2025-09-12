import { Chats } from "./components/Chats/chatsIndex";
import Users from "./components/users/usersIndex";
import { Navigate } from "react-router-dom";
import { useUserLogin } from "./hooks/useUserLogin";
import { useEffect } from "react";
import { Profile } from "./components/profile/profileIndex";

function App() {
  const isLogin = useUserLogin((states) => states.isLogin);
  const userId = useUserLogin((state) => state.userId);
  const setIsLogin = useUserLogin((states) => states.setIsLogin);

  useEffect(() => {
    // First Login
    if (!localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE)) {
      localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE, `${userId}`);
    }

    // Already Logged in
    else {
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
          <Profile />
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default App;
