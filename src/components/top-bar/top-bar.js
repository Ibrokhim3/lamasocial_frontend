import "./top-bar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import profileImgDef from "../../assets/icons/avatar.svg";

function TopBar({ profileImgUrl }) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [IsDisabledAvatarInput, setIsDisabledAvatarInput] = useState(false);
  const [IsDisabledCoverInput, setIsDisabledCoverInput] = useState(false);
  const [isDisabledUpload, setIsDisabledUpload] = useState(true);
  const [btnActive, setBtnActive] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [loadingCover, setLoadingCover] = useState(false);

  const styles = {
    backgroundColor: btnActive ? "red" : "blue",
  };

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const token = localStorage.getItem("token");

  const [user, setUser] = useState({ username: "", user_email: "" });

  useEffect(() => {
    const dataFetch = async () => {
      await fetch("http://localhost:1200/lamasocial/user_info", {
        method: "GET",
        headers: { token },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
          return Promise.reject(res);
        })
        .then((data) => {
          if (data) {
            setUser(data);
          }
        })
        .catch((err) => {
          return console.log(err);
        });
    };
    dataFetch();
  }, []);

  const uploadAvatar = async (evt) => {
    setBtnActive(true);
    setIsDisabledAvatarInput(true);
    setLoadingAvatar(true);

    const file = evt.target.files;
    const data = new FormData();

    data.append("file", file[0]);
    data.append("upload_preset", "lamasocial");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dephdgqpo/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const data2 = await res.json();

    setAvatarUrl(data2.secure_url);
    setIsDisabledUpload(false);
    setBtnActive(false);
    setLoadingAvatar(false);
  };

  const uploadCover = async (evt) => {
    setBtnActive(true);
    setIsDisabledCoverInput(true);
    setLoadingCover(true);

    const file = evt.target.files;
    const data = new FormData();

    data.append("file", file[0]);
    data.append("upload_preset", "lamasocial");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dephdgqpo/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const data2 = await res.json();

    setCoverUrl(data2.secure_url);
    setIsDisabledUpload(false);
    setBtnActive(false);
    setLoadingCover(false);
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const user = {
      username: usernameRef.current.value,
      user_email: emailRef.current.value,
      password: passwordRef.current.value,
      avatar_url: avatarUrl,
      cover_url: coverUrl,
    };

    fetch("http://localhost:1200/lamasocial/update_user", {
      method: "PUT",
      headers: { "Content-type": "Application/json", token },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => {
        alert(data);
        localStorage.setItem("token", "");
        navigate("/login");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <div
        className="modal fade"
        id="updateUser"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit profile
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSubmit} className="loginBox">
                <input
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  value={user?.username}
                  ref={usernameRef}
                  type="text"
                  placeholder=" Username... "
                  className="loginInput"
                />
                <input
                  onChange={(e) =>
                    setUser({ ...user, user_email: e.target.value })
                  }
                  value={user?.user_email}
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
                <div
                  style={{ marginBottom: 15 }}
                  className="input-file-wrapper"
                >
                  <span className="input-file-wrapper__text">
                    Upload your avatar here
                  </span>
                  <input
                    onChange={uploadAvatar}
                    disabled={IsDisabledAvatarInput}
                    type="file"
                  />
                  <span
                    style={
                      loadingAvatar ? { display: "block" } : { display: "none" }
                    }
                    className="spinner"
                  ></span>
                </div>

                <div className="input-file-wrapper">
                  <span className="input-file-wrapper__text">
                    Upload your cover-image here
                  </span>
                  <input
                    disabled={IsDisabledCoverInput}
                    onChange={uploadCover}
                    type="file"
                  />
                  <span
                    style={
                      loadingCover ? { display: "block" } : { display: "none" }
                    }
                    className="spinner"
                  ></span>
                </div>

                <div className="modal__button-wrapper">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    disabled={btnActive}
                    type="submit"
                    data-mdb-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to={"/"}>
            <span className="logo">Lamasocial</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchBar">
            <Search className={"searchIcon"} />
            <input
              placeholder="Search for friend, post a video"
              className="serachInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#updateUser"
          >
            Update User
          </button>
          <button
            onClick={() => {
              localStorage.setItem("token", "");
              navigate("/login");
            }}
            className="logout"
          >
            Log out
          </button>
          <Link to={"/profile"}>
            <img
              src={profileImgUrl || profileImgDef}
              alt="smt"
              width={32}
              height={32}
              className="topbarImg"
            />
          </Link>
        </div>
        {/* Modal for update user */}
      </div>
    </>
  );
}

export default TopBar;
