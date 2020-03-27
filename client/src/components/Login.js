import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory();
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
    axiosWithAuth()
    .post("/api/login", loginData)
    .then(res => {
        console.log(res);
        window.localStorage.setItem("token", JSON.stringify(res.data.payload));
        history.push("/bubblepage");

    })
    .catch(err => {
        console.log(err);
    });
    setLoginData({
      username: "",
      password: ""
    });
  };

  return (
    <div className = "login">
      <div className = "loginform">
      <h1>Welcome to the Bubble App!</h1>
        <form onSubmit = {handleSubmit}>
          <div className = "fields">
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
          </div>
          <br/>
          <div className = "loginbuttoncontainer">
          <button className = "loginbutton">Log in</button>
          </div>
        </form>
      </div>
      </div>
  );
};

export default Login;
