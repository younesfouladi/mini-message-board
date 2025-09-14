import { Chats } from "./components/Chats/chatsIndex";
import Users from "./components/users/usersIndex";
import { Navigate } from "react-router-dom";
import { useUserLogin } from "./hooks/useUserLogin";
import { useEffect } from "react";
import { Profile } from "./components/profile/profileIndex";
import { useShallow } from "zustand/shallow";

function App() {
  const isLogin = useUserLogin((states) => states.isLogin);
  const [userId, addUserId, userName, setUserName] = useUserLogin(
    useShallow((state) => [
      state.userId,
      state.addUserId,
      state.userName,
      state.setUserName,
    ])
  );
  const setIsLogin = useUserLogin((states) => states.setIsLogin);

  // First Login
  useEffect(() => {
    if (!localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE)) {
      localStorage.setItem(
        import.meta.env.VITE_LOCALSTORAGE,
        `${userId},${userName}`
      );
    }
  }, [userId, setIsLogin, userName]);

  // Already Logged in
  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE)) {
      const id_name = localStorage
        .getItem(import.meta.env.VITE_LOCALSTORAGE)
        ?.split(",");
      if (id_name) {
        addUserId(id_name[0]);
        setUserName(id_name[1]);
      }
      setIsLogin(true);
    }
  }, [addUserId, setIsLogin, setUserName]);

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
