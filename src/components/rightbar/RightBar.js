import "./rightBar.css";
import { Users } from "../../data/data"
import Online from "../online/Online";


function RightBar({ profile }) {


  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.jpeg" alt=""/>
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends </b> have a birthday today
          </span>

        </div>

        <img className="rightBarAd" src="/assets/post/1.jpeg" />
        <h4 className="rightBarTitle"> Online friends </h4>
        <ul className="rightBarFriendList">
         {
           Users.map(u => <Online key={u.id} user={u}/>)
         }
        </ul>
      </>
    )
  }


  const ProfileRightbar = () => {
    return ( 
      <>
         <h4 className="rightbarTitle" >User information</h4>
         <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey" >City: </span>
            <span className="rightbarInfoValue" >New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey" >From: </span>
            <span className="rightbarInfoValue" >Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey" >Relationship: </span>
            <span className="rightbarInfoValue" >Single</span>
          </div>
         </div>

         <h4 className="rightbarTitle" >User friends</h4>

         <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src="assets/person/1.jpeg" className="rightbarFollowingImg"/>
            <span className="rightbarFollowingName" >John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/2.jpeg" className="rightbarFollowingImg"/>
            <span className="rightbarFollowingName" >John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/3.jpeg" className="rightbarFollowingImg"/>
            <span className="rightbarFollowingName" >John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/2.jpeg" className="rightbarFollowingImg"/>
            <span className="rightbarFollowingName" >John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/3.jpeg" className="rightbarFollowingImg"/>
            <span className="rightbarFollowingName" >John Carter</span>
          </div>

         </div>

      </>
     )
  }



    return <div className="rightbar">
      <div className="rightbarWrapper">
        {
          profile ? <ProfileRightbar/> : <HomeRightbar/>
        }
      </div>
    </div>
  }
  
  export default RightBar;
  