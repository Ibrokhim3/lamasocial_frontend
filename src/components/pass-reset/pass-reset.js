import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import "../login/login.css";

export default function PassReset() {
  const navigate = useNavigate();

  const [btnActive, setBtnActive] = useState(false);

  const styles = {
    opacity: btnActive ? 0.7 : 1,
  };

  const passwordRef = useRef();
  const { userId, token } = useParams();

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    setBtnActive(true);

    const user = {
      password: passwordRef.current.value,
    };

    fetch(`http://localhost:1200/lamasocial/${userId}/${token}`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status !== 200) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
        return res.json();
      })
      .then((data) => {
        alert(data);
        navigate("/login");
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
            <label htmlFor="">Enter your new password</label>
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
              Change password
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
