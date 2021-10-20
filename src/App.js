import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import BASE_URL from "./utils";
import { Route } from "react-router-dom";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const resp = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const info = await resp.json();
      setUser(info.data);
    };
    fetchUser();
  }, [token]);
  return (
    <div>
      <Navbar user={user} setToken={setToken} setUser={setUser} />
      <br></br>
      <br></br>
      <Route exact path="/">
        <Home user={user} />
      </Route>
      <Route path="/posts">
        <Posts user={user} token={token} />
      </Route>
      <Route exact path="/Profile">
        <Profile user={user} />
      </Route>
      <Route exact path="/Login">
        <Login setToken={setToken} />
      </Route>
      <Route exact path="/Register">
        <Register setToken={setToken} />
      </Route>
    </div>
  );
}
export default App;
