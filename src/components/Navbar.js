import { Link, useHistory } from "react-router-dom";

const Navbar = (props) => {
  const history = useHistory();
  const handleLogout = () => {
    props.setToken(null);
    localStorage.removeItem("token");
    props.setUser(null);
    history.push("/");
  };

  return (
    <div className="Navbar">
      <Link to="/">Home</Link> | <Link to="/posts">Posts</Link> |
      {props.user && (
        <>
          <Link to="/profile">Profile</Link> |{" "}
        </>
      )}
      {!props.user && (
        <>
          | <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link> |
        </>
      )}
      <span
        onClick={handleLogout}
        style={{
          color: "blue",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        Logout
      </span>
    </div>
  );
};

export default Navbar;
