import { useState } from "react";
import BASE_URL from "../utils";
const MessageForm = ({ postId, token }) => {
  const [message, setMessage] = useState("");
  const handleSendMessage = (e) => {
    e.preventDefault();
    const sendMessage = async () => {
      console.log(postId);
      const resp = await fetch(`${BASE_URL}posts/${postId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content: message,
          },
        }),
      });
      const info = await resp.json();
      console.log(info);
    };
    sendMessage();
  };
  return (
    <>
      <form onSubmit={handleSendMessage}>
        <input
          placeholder="Send Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
};
export default MessageForm;
