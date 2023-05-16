import { useEffect } from "react";
import { useState } from "react";
import { Routes } from "../src/routes/config-router";

function App() {
  const [login, setLogin] = useState();
  useEffect(() => {
    setLogin(localStorage.getItem("token"));
  }, []);
  return <Routes login={login} />;
}

export default App;
