import "./close-friends.css";

export default function CloseFriend({ user: { username, profile_img_url } }) {
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={profile_img_url} />
      <span className="sidebarFriendName">{username}</span>
    </li>
  );
}
