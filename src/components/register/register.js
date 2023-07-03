import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import "./register.css";
import { PermMedia } from "@mui/icons-material";
import { API_URL } from "../../variables/apiUrl";

export default function Register() {
  const [profileImg, setProfileImg] = useState();
  const [coverImg, setCoverImg] = useState();
  const [btnActive, setBtnActive] = useState(false);

  const styles = {
    opacity: btnActive ? 0.7 : 1,
  };

  const navigate = useNavigate();

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const onFileChange1 = async (evt) => {
    if (evt.target.files) {
      setCoverImg(evt.target.files[0]);
    }
  };

  const onFileChange2 = async (evt) => {
    if (evt.target.files) {
      setProfileImg(evt.target.files[0]);
    }
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    setBtnActive(true);

    const formData = new FormData();

    formData.append("userName", usernameRef.current.value);
    formData.append("userEmail", emailRef.current.value);
    formData.append("password", passwordRef.current.value);
    formData.append("password2", password2Ref.current.value);
    formData.append("profileImg", profileImg);
    formData.append("coverImg", coverImg);

    fetch(`${API_URL}lamasocial/registration`, {
      method: "POST",
      body: formData,
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
          <form onSubmit={handleFormSubmit}>
            <div className="loginBox">
              <input
                ref={usernameRef}
                type="text"
                placeholder=" Username... "
                className="loginInput"
              />
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
              <input
                ref={password2Ref}
                type="password"
                placeholder=" Password again... "
                className="loginInput"
              />
              <div className="upload-main-wrapper">
                <span className="upload-avatar-wrapper">
                  <PermMedia htmlColor="tomato" className="shareIcon" />
                  <button
                    type="button"
                    className="upload-button"
                    data-toggle="modal"
                    data-target="#avatarModal"
                  >
                    Upload avatar
                  </button>
                </span>
                <span className="upload-avatar-wrapper">
                  <PermMedia htmlColor="orange" className="shareIcon" />

                  <button
                    type="button"
                    className="upload-button"
                    data-toggle="modal"
                    data-target="#coverModal"
                  >
                    Upload cover image
                  </button>
                </span>
              </div>

              <button
                disabled={btnActive}
                style={styles}
                type="submit"
                className="loginButton"
              >
                Sign Up
              </button>

              <Link to={"/login"} className="loginRegisterButton">
                Log into Account
              </Link>
            </div>
          </form>
        </div>
      </div>
      {/* modal for avatar*/}
      <div className="modal fade" id="avatarModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {/* <button type="button" className="close" data-dismiss="modal">&times;</button> */}
              <h4 className="modal-title">1</h4>
            </div>
            <div className="modal-body">
              <p>Please upload your file here</p>
              <div className="input-spinner-wrapper">
                <input onChange={onFileChange2} type="file" accept="image/*" />
                {/* <span
                          style={
                            loading ? { display: "block" } : { display: "none" }
                          }
                          className="spinner"
                        ></span> */}
              </div>
            </div>
            <div className="modal-footer">
              <button
                // style={{ styles }}
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modal for cover img */}
      <div className="modal fade" id="coverModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {/* <button type="button" className="close" data-dismiss="modal">&times;</button> */}
              <h4 className="modal-title">1</h4>
            </div>
            <div className="modal-body">
              <p>Please upload your file here</p>
              <div className="input-spinner-wrapper">
                <input onChange={onFileChange1} type="file" accept="image/*" />
                {/* <span
                          style={
                            loading ? { display: "block" } : { display: "none" }
                          }
                          className="spinner"
                        ></span> */}
              </div>
            </div>
            <div className="modal-footer">
              <button
                // style={{ styles }}
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
