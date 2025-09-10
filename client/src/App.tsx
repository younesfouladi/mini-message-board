import { Chats } from "./components/Chats/chatsIndex";
import Users from "./components/users/usersIndex";

function App() {
  return (
    <main id="container" className="bg-main w-full h-full font-main relative">
      <Users />
      <Chats />
      <aside></aside>
    </main>
  );
}

export default App;
