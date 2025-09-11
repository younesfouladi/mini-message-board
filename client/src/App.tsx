import { Chats } from "./components/Chats/chatsIndex";
import Users from "./components/users/usersIndex";
import { Navigate } from "react-router-dom";
import { useUserLogin } from "./hooks/useUserLogin";

function App() {
  const isLogin = useUserLogin((states) => states.isLogin);
  const setIsLogin = useUserLogin((states) => states.setIsLogin);

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
