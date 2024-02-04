import "../styles/Profile.css";

export default function Profile({ userDetails }) {
  if (!userDetails) {
    console.log("Userdetails is null"); // or render a loading message
    return null;
  }

  const { avatar_url, name, followers, following } = userDetails;

  return (
    <div className="profile">
      <div className="avatar">
        <img src={avatar_url} alt="" />
      </div>
      <div className="profile-info">
        <h2>{name}</h2>
        <h6>Followers : {followers}</h6>
        <h6>Following : {following}</h6>
      </div>
    </div>
  );
}
