import App from "../App";
import Login from "../components/login/loginIndex";
import { ErrorElement } from "./error";

export const routes = [
  {
    path: "/",
    element: <App />,
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <ErrorElement /> },
];
