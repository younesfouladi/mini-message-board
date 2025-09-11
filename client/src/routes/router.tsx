import App from "../App";
import Login from "../components/login/loginIndex";

export const routes = [
  {
    path: "/",
    element: <App />,
  },
  { path: "/login", element: <Login /> },
];
