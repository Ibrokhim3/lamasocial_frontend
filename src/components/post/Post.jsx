import { useState, useRef } from "react";
import { MoreVert } from "@mui/icons-material";
import { Users } from "../../data/data";
import "./post.css";
import moment from "moment"



export default function Post({post: {uploaded_time, post_url, avatar_url, username, post_id, likes, user_id}}) {


    const likeRef = useRef()

//   const [like, setLike] = useState(post.like);
//   const [isLiked, setIsLiked] = useState(false);


//   const likeHandler = () => {
//     setLike( isLiked ? like - 1 : like + 1 )
//     setIsLiked(!isLiked)
//   }







const handleLikeClick = (evt) => {
    evt.preventDefault();

    const token = localStorage.getItem("token")

    const likeInfo = {
        post_id: likeRef.current.dataset.id,
    }

    


    fetch("http://localhost:1200/lamasocial/likes", {
      method: "POST",
      headers: { "Content-type": "Application/json",
      token },
      body: JSON.stringify(likeInfo),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => {
        // console.log(data);
      })
      .catch((err) => {
        return console.log(err);
      });

  };


  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img src={avatar_url} className="postProfileImg" alt="" />
                    <span className="postUsername">
                        {username
                        }
                    </span>
                    <span className="postDate" >{moment(uploaded_time).fromNow()}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>John Doe
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{""}</span>
                <img className="postImg" src={ post_url } alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img ref={likeRef} data-id={post_id} src="/assets/like.jpeg" className="likeIcon" onClick={handleLikeClick} alt="like" />
                    <img ref={likeRef} data-id={post_id} src="/assets/heard.png" className="likeIcon" onClick={handleLikeClick} alt="heart" />
                    <span className="postLikeCounter">{likes } people liked it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{""} comments</span>

                </div>
            </div>

        </div>

    </div>
  )
}
