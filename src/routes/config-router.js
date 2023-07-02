import { useNavigate, useRoutes } from "react-router";
import Login from "../components/login/login";
import PassResetLink from "../components/pass-reset-link/pass-reset-link";
import PassReset from "../components/pass-reset/pass-reset";
import Register from "../components/register/register";
import Home from "../pages/home/home";
import Profile from "../pages/profile/profile";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "registration",
    element: <Register />,
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

export const ConfigRoutes = ({ login }) => {
  // return useRoutes(routes);

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
