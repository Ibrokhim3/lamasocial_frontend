import "./close-friends.css";

export default function CloseFriend({ user: { username, avatar_url } }) {
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={avatar_url} />
      <span className="sidebarFriendName">{username}</span>
    </li>
  );
}
