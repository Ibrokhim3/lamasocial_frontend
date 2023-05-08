import Home from "../pages/home/Home";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import { useRoutes } from "react-router";
import Profile from "../pages/Profile/Profile";

const routes = [
  {
    path: "registration",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "main",
    element: <Home />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
];

export const Routes = () => {
  return useRoutes(routes);
};
