const Home = (props) => {
  return (
    <>
      <div className="homeBody">
        {props.user && <h1>Welcome {props.user.username}!</h1>}
        <br></br>
        <body>Buy and Sell Now!</body>
        {!props.user && <h1>Welcome to Stranger's Things!</h1>}
      </div>
    </>
  );
};
export default Home;
