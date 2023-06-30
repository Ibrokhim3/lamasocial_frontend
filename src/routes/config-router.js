import { useRoutes } from "react-router";
import Login from "../components/login/login";
import PassResetLink from "../components/pass-reset-link/pass-reset-link";
import PassReset from "../components/pass-reset/pass-reset";
import Register from "../components/register/register";
import Home from "../pages/home/home";
import Profile from "../pages/profile/profile";

const token = localStorage.getItem("token");

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "registration",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "password-reset-link",
    element: <PassResetLink />,
  },
  {
    path: "lamasocial/:userId/:token",
    element: <PassReset />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
];

export const Routes = ({ login }) => {
  return useRoutes([
    ...(!login
      ? [
          {
            path: "login",
            element: <Login />,
          },
        ]
      : []),
    ...routes,
  ]);
};
