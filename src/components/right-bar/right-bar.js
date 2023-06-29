import "./right-bar.css";
import { Users } from "../../data/data";
import Online from "../online/online";
import { useEffect, useState } from "react";
import CloseFriend from "../close-friends/close-friends";

function RightBar({ profile }) {
  const [friends, setFriends] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const dataFetch = async () => {
      await fetch("http://localhost:1200/lamasocial/friends", {
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
            setFriends(data);
          }
        })
        .catch((err) => {
          return console.log(err);
        });
    };
    dataFetch();
  }, [friends]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.jpeg" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends </b> have a birthday today
          </span>
        </div>

        <img className="rightBarAd" src="/assets/post/1.jpeg" />
        <h4 className="rightBarTitle"> Online friends </h4>
        <ul className="rightBarFriendList">
          {friends?.map((user, index) => (
            <Online key={index} user={user} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>

        <ul className="rightbarFollowings">
          {friends?.map((user, index) => {
            <CloseFriend key={index} user={user} />;
          })}
        </ul>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default RightBar;
