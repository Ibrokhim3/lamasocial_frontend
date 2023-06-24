import "./profile.css";
import Feed from "../../components/feed/feed";
import RightBar from "../../components/right-bar/right-bar";
import SideBar from "../../components/sidebar/sidebar";
import TopBar from "../../components/top-bar/top-bar";
import { useEffect, useState } from "react";
import orangeColor from "../../assets/img/orange.webp";
import profileImageDef from "../../assets/icons/avatar.svg";

export default function Profile() {
  const [posts, setPosts] = useState();
  const [user, setUser] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const dataFetch = async () => {
      await fetch("http://localhost:1200/lamasocial/user-posts", {
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
            setPosts(data);
          }
        })
        .catch((err) => {
          return console.log(err);
        });
    };
    dataFetch();
  }, []);

  useEffect(() => {
    const dataFetch = async () => {
      await fetch("http://localhost:1200/lamasocial/user-info", {
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

  const item = posts?.posts?.map((item, index) => item);

  return (
    <div>
      <div>
        <TopBar profileImgUrl={user?.profile_img_url} />
        <div className="profile">
          <SideBar />
          <div className="profileRight">
            <div className="profileRighTop">
              <div className="profileCover">
                <img
                  className="profileCoverImg"
                  src={user?.cover_img_url || orangeColor}
                  alt="coverimage"
                />
                <img
                  className="profileUserImg"
                  src={user?.profile_img_url || profileImageDef}
                  alt="profile image"
                />
              </div>
              <div className="profileInfo">
                <h4 className="profileInfoName"> {user?.username}</h4>
                <span className="profileInfoDesc">
                  {" "}
                  Hello {user?.username}!
                </span>
              </div>
            </div>
            <div className="profileRightBottom">
              <Feed posts={posts} profileImgUrl={user?.profile_img_url} />
              <RightBar profile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
