import { useState } from "react";
import { useHistory } from "react-router-dom";
import BASE_URL from "../utils";

const NewPosts = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch(`${BASE_URL}posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        post: {
          title: title,
          description: description,
          price: price,
        },
      }),
    });
    const info = await resp.json();
    // console.log(info);
    // console.log(props.token);
    props.setPosts([...props.posts, info.data.post]);
    setTitle("");
    setDescription("");
    setPrice("");
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          if (props.token !== null) {
            handleSubmit(e);
            // console.log("click");
          } else {
            history.push("/login");
          }
        }}
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <br></br>
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <br></br>
        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default NewPosts;
