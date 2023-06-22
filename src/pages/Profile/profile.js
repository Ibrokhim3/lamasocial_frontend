import "./profile.css";
import Feed from "../../components/feed/feed";
import RightBar from "../../components/right-bar/right-bar";
import SideBar from "../../components/sidebar/sidebar";
import TopBar from "../../components/top-bar/top-bar";
import { useEffect, useState } from "react";

export default function Profile() {
  const [posts, setPosts] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const dataFetch = async () => {
      await fetch("http://localhost:1200/lamasocial/posts", {
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
  const avatar_url = posts?.user[0].avatar_url;
  const cover_url = posts?.user[0].cover_url;
  const username = posts?.user[0].username;
  return (
    <>
      <TopBar avatar_url={avatar_url} />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRighTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={cover_url}
                alt="coverimage"
              />
              <img
                className="profileUserImg"
                src={avatar_url}
                alt="profile image"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName"> {username}</h4>
              <span className="profileInfoDesc"> Hello {username}!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed avatar_url={avatar_url} />

            <RightBar profile />
          </div>
        </div>
      </div>
    </>
  );
}
