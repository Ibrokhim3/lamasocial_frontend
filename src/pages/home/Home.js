import { useEffect, useState } from "react";
import Feed from "../../components/feed/feed";
import RightBar from "../../components/right-bar/right-bar";
import Share from "../../components/share/share";
import SideBar from "../../components/sidebar/sidebar";
import TopBar from "../../components/top-bar/top-bar";
import "./home.css";

function Home() {
  const [posts, setPosts] = useState();
  const [userPosts, setUserPosts] = useState();

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
            setUserPosts(data);
          }
        })
        .catch((err) => {
          alert(err);
        });
    };
    dataFetch();
  }, []);

  // const profileImgUrl = posts?.posts?.map((item) => item.profile_img_url);

  return (
    <>
      <TopBar profileImgUrl={userPosts?.profile_img_url} />
      <div className="homeContainer">
        <SideBar />
        <Feed profileImgUrl={userPosts?.profile_img_url} posts={posts} />
        <RightBar posts={posts} />
      </div>
    </>
  );
}

export default Home;
