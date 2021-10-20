const Profile = (props) => {
  return (
    <>
      {props.user && <h1>Hello {props.user.username}!</h1>}
      {!props.user && <h1>Hello {props.user.username}</h1>}
    </>
  );
};
export default Profile;
