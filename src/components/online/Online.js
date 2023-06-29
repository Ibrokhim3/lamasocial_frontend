import React from "react";
import "./online.css";

export default function Online({ user }) {
  return (
    <li className="rightBarFriend">
      <div className="rightBarProfileImgContainer">
        <img className="rightBarProfileImg" src={user.profile_img_url} />
        {user.isonline && <span className="rightBarOnline"></span>}
      </div>
      <span className="rightBarUsername">{user.username}</span>
    </li>
  );
}
