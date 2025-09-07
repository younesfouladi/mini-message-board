import { Chats } from "./components/Chats";

function App() {
  return (
    <main id="container" className="bg-neutral-900 w-full h-full font-main">
      <aside></aside>
      <Chats />
      <aside></aside>
    </main>
  );
}

export default App;
