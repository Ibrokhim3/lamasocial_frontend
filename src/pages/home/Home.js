import { useEffect, useState } from "react";
import Feed from "../../components/Feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import Share from "../../components/share/Share";
import SideBar from "../../components/sidebar/sideBar";
import TopBar from "../../components/TopBar/TopBar";
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

  const avatar_url = posts?.user[0]?.avatar_url;

  return (
    <>
      <TopBar avatar_url={avatar_url} />
      <div className="homeContainer">
        <SideBar />
        <Feed avatar_url={avatar_url} posts={posts} />
        <RightBar posts={posts} />
      </div>
    </>
  );
}

export default Home;
