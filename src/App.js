import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Routes } from "../src/routes/config-router";
import Login from "./components/login/login";

function App() {
  const [login, setLogin] = useState();

  let hours = 5;
  let now = new Date().getTime();
  let setupTime = localStorage.getItem("setupTime");
  if (setupTime == null) {
    localStorage.setItem("setupTime", now);
  } else {
    if (now - setupTime > hours * 60 * 60 * 1000) {
      localStorage.clear();
      localStorage.setItem("setupTime", now);
    }
  }

  useEffect(() => {
    setLogin(localStorage.getItem("token"));
  }, []);

  return <Routes login={login} />;
}

export default App;
