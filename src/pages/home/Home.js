import { useEffect, useState } from "react";
import Feed from "../../components/feed/feed";
import RightBar from "../../components/right-bar/right-bar";
import Share from "../../components/share/share";
import SideBar from "../../components/sidebar/sidebar";
import TopBar from "../../components/top-bar/top-bar";
import "./home.css";

function Home() {
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
  }, [posts]);

  const profileImgUrl = posts?.profile_img_url;

  return (
    <>
      <TopBar profileImgUrl={profileImgUrl} />
      <div className="homeContainer">
        <SideBar />
        <Feed profileImgUrl={profileImgUrl} posts={posts} />
        <RightBar posts={posts} />
      </div>
    </>
  );
}

export default Home;
