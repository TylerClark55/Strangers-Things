const MessageDisplay = (props) => {
  return (
    <>
      <p className="itemDetails">
        <span>Messages:</span>
      </p>
      {props.messages.map((message) => {
        <div key={message._id} className="messageCard">
          <p>{message.content}</p>
          <p>
            From: <span>{message.fromUser.username}</span>
          </p>
        </div>;
      })}
    </>
  );
};
export default MessageDisplay;
