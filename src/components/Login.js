import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BASE_URL from "../utils";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMesage, setErrorMessage] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const resp = await fetch(`${BASE_URL}users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const info = await resp.json();
    if (!info.success) {
      setErrorMessage(info.error.message);
    }
    localStorage.setItem("token", info.data.token);
    setUsername(username);
    props.setToken(info.data.token);
    history.push("/");
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* <label>Username</label> */}
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          value={username}
          placeholder="username"
        ></input>
        <br></br>
        {/* <label>Password</label> */}
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder="password"
        ></input>
        <br></br>
        <button>Log In</button>
        <br></br>
        <Link to="/register">Don’t have an Account? Sign up Here</Link>
        <p>{errorMesage}</p>
      </form>
    </div>
  );
};
export default Login;
