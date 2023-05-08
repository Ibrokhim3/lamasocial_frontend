import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { Users } from "../../data/data";
import "./post.css";



export default function Post({post: {uploaded_time, post_url, avatar_url, username}}) {

//   const [like, setLike] = useState(post.like);
//   const [isLiked, setIsLiked] = useState(false);


//   const likeHandler = () => {
//     setLike( isLiked ? like - 1 : like + 1 )
//     setIsLiked(!isLiked)
//   }


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
                    <span className="postDate" >{uploaded_time}</span>
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
                    <img src="/assets/like.jpeg" className="likeIcon" onClick={""} alt="like" />
                    <img src="/assets/heard.png" className="likeIcon" onClick={""} alt="heart" />
                    <span className="postLikeCounter">{ "" } people liked it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{""} comments</span>

                </div>
            </div>

        </div>

    </div>
  )
}
