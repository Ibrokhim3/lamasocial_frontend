import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import "./login.css";

export default function Login() {
  let token = "";

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const user = {
      userEmail: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("http://localhost:1200/lamasocial/login", {
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
        alert(data);
        navigate("/");
      })
      .catch((err) => {
        alert(err);
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
            <button type="submit" className="loginButton">
              Log In
            </button>
            <span className="loginForgot">Forgot password</span>
            <Link to={"/registration"} className="loginRegisterButton">
              Create a new account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
