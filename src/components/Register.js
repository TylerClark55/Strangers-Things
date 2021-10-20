import { useState } from "react";
import BASE_URL from "../utils";
import { useHistory } from "react-router-dom";
const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (password !== confirmPassword) {
      setErrorMessage("Passwords Do Not Match");
    }
    const resp = await fetch(`${BASE_URL}users/register`, {
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
      return <div>{errorMessage}</div>;
    }
    localStorage.setItem("token", info.data.token);
    props.setToken(info.data.token);
    history.push("/");
  };
  return (
    <>
      <div className="registration">
        <form onSubmit={handleSubmit}>
          <h1>New User Registration</h1>
          {/* <label>Username</label> */}
          <input
            minLength={4}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            value={username}
            placeholder="Username"
            required
          />
          <br></br>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            minLength={6}
            placeholder="Password"
            required
          />
          <br></br>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            value={confirmPassword}
            minLength={6}
            placeholder="Confirm Password"
            required
          />
          <br></br>
          <button type="submit">Register</button>
          <p>{errorMessage}</p>
        </form>
      </div>
    </>
  );
};
export default Register;
