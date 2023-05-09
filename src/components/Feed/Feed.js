import "./Feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useEffect } from "react";
import { useState } from "react";

function Feed({ posts, avatar_url }) {
  // const [posts, setPosts] = useState();

  // // useEffect(() => {
  // //   const dataFetch = async () => {
  // //     await fetch("http://localhost:1200/lamasocial/posts", {
  // //       method: "GET",
  // //     })
  // //       .then((res) => {
  // //         if (res.status === 200) {
  // //           return res.json();
  // //         }
  // //         return Promise.reject(res);
  // //       })
  // //       .then((data) => {
  // //         if (data) {
  // //           setPosts(data);
  // //         }
  // //       })
  // //       .catch((err) => {
  // //         return console.log(err);
  // //       });
  // //   };
  // //   dataFetch();
  // // }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share avatar_url={avatar_url} />

        {posts?.posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
