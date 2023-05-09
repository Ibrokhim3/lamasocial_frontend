import "./topBar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function TopBar({ avatar_url }) {
  const [fileUrl, setFileUrl] = useState("");
  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const [isDisabledUpload, setIsDisabledUpload] = useState(true);
  const [btnActive, setBtnActive] = useState(true);
  const [loading, setLoading] = useState(false);

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
            console.log(data);
          }
        })
        .catch((err) => {
          return console.log(err);
        });
    };
    dataFetch();
  }, []);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const user = {
      username: usernameRef.current.value,
      user_email: emailRef.current.value,
      password: passwordRef.current.value,
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
        class="modal fade"
        id="updateUser"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
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
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </form>
            </div>
            <div class="modal-footer"></div>
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
            <button
              onClick={() => {
                localStorage.setItem("token", "");
                navigate("/login");
              }}
              className="logout"
            >
              Log out
            </button>
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
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#updateUser"
          >
            Update User
          </button>

          <Link to={"/profile"}>
            <img src={avatar_url} alt="smt" className="topbarImg" />
          </Link>
        </div>
        {/* Modal for update user */}
      </div>
    </>
  );
}

export default TopBar;
