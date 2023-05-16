import Home from "../pages/home/Home";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import { useRoutes } from "react-router";
import Profile from "../pages/Profile/Profile";
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
