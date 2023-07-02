import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ConfigRoutes } from "../src/routes/config-router";

function App() {
  const [login, setLogin] = useState(null);
  const navigate = useNavigate();

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
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(token);
    }
  }, []);

  return <ConfigRoutes login={login} />;
}
export default App;
