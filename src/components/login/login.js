import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "./login.css";
import { API_URL } from "../../variables/apiUrl";

export default function Login() {
  const navigate = useNavigate();

  const [btnActive, setBtnActive] = useState(false);

  const styles = {
    opacity: btnActive ? 0.7 : 1,
  };

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    setBtnActive(true);

    const user = {
      userEmail: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch(`${API_URL}lamasocial/login`, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status !== 201) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        alert(data.msg);
        // window.location.reload();
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setBtnActive(false);
      });
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleFormSubmit} className="loginBox">
            <input
              ref={emailRef}
              type="email"
              placeholder=" Email... "
              className="loginInput"
            />
            <input
              ref={passwordRef}
              type="password"
              placeholder=" Password... "
              className="loginInput"
            />
            <button
              disabled={btnActive}
              style={styles}
              type="submit"
              className="loginButton"
            >
              Log In
            </button>
            <Link to={"/password-reset-link"} className="loginForgot">
              Forgot password
            </Link>
            <Link to={"/registration"} className="loginRegisterButton">
              Create a new account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
