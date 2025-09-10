import { useEffect, useState } from "react";
import { useUsersCount } from "../../hooks/useUsersCount";
import { useMessagesCount } from "../../hooks/useMessagesCount";

interface IData {
  userId: string;
  userName: string;
  messagesCount: number;
}

export default function Users() {
  const server = import.meta.env.VITE_SERVER;
  const [users, setUsers] = useState<IData[] | null>(null);
  const messagesCount = useMessagesCount((states) => states.messagesCount);
  const setMessagesCount = useMessagesCount(
    (states) => states.setMessagesCount
  );
  const usersCount = useUsersCount((states) => states.usersCount);

  useEffect(() => {
    fetch(`${server}/api/messages/count`)
      .then((res) => res.json())
      .then((data) => setMessagesCount(data.count))
      .catch((err) => console.error(`Error Fetching Users Data`, err));
  }, [server, setMessagesCount]);

  useEffect(() => {
    fetch(`${server}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(`Error Fetching Users Data`, err));
  }, [server]);

  return (
    <aside className="bg-section text-neutral-50">
      <h3>{usersCount} Members</h3>
      <h3>{messagesCount} Messages</h3>
      {users?.map((user) => (
        <p key={user.userId}>{user.userName}</p>
      ))}
    </aside>
  );
}
