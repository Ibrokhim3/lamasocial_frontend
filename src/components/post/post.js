import { useState, useRef } from "react";
import { MoreVert } from "@mui/icons-material";
import { Users } from "../../data/data";
import "./post.css";
import moment from "moment";
import profileImgDef from "../../assets/icons/avatar.svg";
import { API_URL } from "../../variables/apiUrl";

export default function Post({
  post: {
    uploaded_time,
    post_img_url,
    profile_img_url,
    username,
    post_id,
    likes,
    post_text,
    user_id,
  },
}) {
  const likeRef = useRef();

  //   const [like, setLike] = useState(post.like);
  //   const [isLiked, setIsLiked] = useState(false);

  //   const likeHandler = () => {
  //     setLike( isLiked ? like - 1 : like + 1 )
  //     setIsLiked(!isLiked)
  //   }

  const handleLikeClick = (evt) => {
    evt.preventDefault();

    const token = localStorage.getItem("token");

    const likeInfo = {
      post_id: likeRef.current.dataset.id,
    };

    fetch(`${API_URL}lamasocial/likes`, {
      method: "POST",
      headers: { "Content-type": "Application/json", token },
      body: JSON.stringify(likeInfo),
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
        !token ? alert("Please login to your account first") : alert(err);
      });
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={profile_img_url || profileImgDef}
              className="postProfileImg"
              alt=""
            />
            <span className="postUsername">{username}</span>
            <span className="postDate">{moment(uploaded_time).fromNow()}</span>
            <p className="postText">{post_text}</p>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{""}</span>
          <img className="postImg" src={post_img_url} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              ref={likeRef}
              data-id={post_id}
              src="/assets/like.jpeg"
              className="likeIcon"
              onClick={handleLikeClick}
              alt="like"
            />
            <img
              ref={likeRef}
              data-id={post_id}
              src="/assets/heard.png"
              className="likeIcon"
              onClick={handleLikeClick}
              alt="heart"
            />
            <span className="postLikeCounter">{likes} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
