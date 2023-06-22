import "./feed.css";
import Share from "../share/share";
import Post from "../post/post";
import { useEffect } from "react";
import { useState } from "react";

function Feed({ posts, profileImgUrl }) {
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
        <Share profileImgUrl={profileImgUrl} />

        {posts?.posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
