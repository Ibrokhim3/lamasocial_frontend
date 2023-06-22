import Home from "../pages/home/home";
import Login from "../components/login/login";
import Register from "../components/register/register";
import { useRoutes } from "react-router";
import Profile from "../pages/profile/profile";
import { useEffect, useState } from "react";

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
