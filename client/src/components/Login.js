import React, { useState } from "react";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const handleChanges = e => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoginData({
      username: "",
      password: ""
    });
  };

  return (
      <div className = "loginform">
      <h1>Welcome to the Bubble App!</h1>
        <form onSubmit = {handleSubmit}>
        <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleChanges}
            placeholder = "Username"
          />
          <br/>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChanges}
            placeholder = "Password"
          />
          <br/>
          <button>Log in</button>
        </form>
      </div>
  );
};

export default Login;
