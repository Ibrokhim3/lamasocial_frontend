import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "../login/login.css";
import { API_URL } from "../../variables/apiUrl";

export default function PassResetLink() {
  const navigate = useNavigate();

  const [btnActive, setBtnActive] = useState(false);

  const styles = {
    opacity: btnActive ? 0.7 : 1,
  };

  const emailRef = useRef();

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    setBtnActive(true);

    const user = {
      userEmail: emailRef.current.value,
    };

    fetch(`${API_URL}lamasocial/password-reset`, {
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
        alert(data);
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
            <label htmlFor="">
              Enter your valid email as registrated in lamasocial to get link
            </label>
            <input
              ref={emailRef}
              type="email"
              placeholder=" Email... "
              className="loginInput"
            />
            <button
              disabled={btnActive}
              style={styles}
              type="submit"
              className="loginButton"
            >
              Get link
            </button>
            <Link to={"/registration"} className="loginRegisterButton">
              Create a new account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
