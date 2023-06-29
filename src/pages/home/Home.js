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

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  useEffect(() => {
    fetch("http://localhost:1200/lamasocial/online", {
      method: "PUT",
      headers: { "Content-type": "Application/json", token },
      body: JSON.stringify({ isOnline }),
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
        // console.log(data);
      })
      .catch((err) => {
        // return alert(err);
      });
  }, [isOnline]);

  useEffect(() => {
    const dataFetch = async () => {
      await fetch("http://localhost:1200/lamasocial/posts", {
        method: "GET",
        headers: { token },
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
          if (data) {
            setPosts(data);
          }
        })
        .catch((err) => {
          // return alert(err);
          // window.location.reload(true);
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
          if (res.status !== 200) {
            return res.text().then((text) => {
              throw new Error(text);
            });
          }
          return res.json();
        })
        .then((data) => {
          if (data) {
            setUserPosts(data);
          }
        })
        .catch((err) => {
          return alert(err);
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
