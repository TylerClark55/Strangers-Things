import { useEffect, useState } from "react";
import BASE_URL from "../utils";
import { Route, Link } from "react-router-dom";
import Newposts from "./Newposts";
import MessageForm from "./MessageForm";
import MessageDisplay from "./MessageDisplay";
const Posts = ({ token, user }) => {
  const [posts, setPosts] = useState([]);
  // console.log(props.token);
  const fetchPost = async () => {
    const resp = token
      ? await fetch(`${BASE_URL}posts`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      : await fetch(`${BASE_URL}posts`);
    // console.log(resp);
    const info = await resp.json();
    setPosts(info.data.posts);
  };
  useEffect(() => {
    fetchPost();
  }, [token]);
  const handleDelete = async (postId) => {
    const resp = await fetch(`${BASE_URL}posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await resp.json();
    fetchPost();
  };
  const [searchTerm, setSearchTerm] = useState("");
  function postMatches(post, text) {
    if (
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.price.toLowerCase().includes(searchTerm) ||
      post.location.toLowerCase().includes(searchTerm) ||
      post.author.username.toLowerCase().includes(searchTerm)
    ) {
      return true;
    }
  }
  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;
  return (
    <>
      <main>
        <h1>Post or Search For Items!</h1>
        <body>Information:</body>
        <input
          placeholder="Search Item"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <Link to="/posts/new"></Link>
        <Route to="/posts/new">
          <Newposts
            user={user}
            posts={posts}
            token={token}
            setPosts={setPosts}
          ></Newposts>
        </Route>
        {postsToDisplay.map((post) => {
          //   console.log(post.title);
          return (
            <>
              <div className="postItem" key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <p>
                  <span>Price:</span>
                  {post.price}
                </p>
                <p>
                  <span>Location:</span>
                  {post.location}
                </p>
                {post.isAuthor && (
                  <>
                    <button onClick={() => handleDelete(post._id)}>
                      Delete
                    </button>
                    <MessageDisplay messages={post.messages} />
                  </>
                )}
                {!post.isAuthor && token && (
                  <MessageForm
                    postId={post._id}
                    user={user}
                    posts={posts}
                    token={token}
                    setPosts={setPosts}
                  ></MessageForm>
                )}
              </div>
            </>
          );
        })}
      </main>
    </>
  );
};
export default Posts;
