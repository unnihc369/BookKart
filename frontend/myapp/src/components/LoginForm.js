import React, { useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { UserState } from "../context/UserContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

 const {user,setUser}=UserState();

  const toast = useToast();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("please provide the documnet");
      window.alert("please provide all documents");
      
      return;
    }
    try {
      const { data } = await axios.post("http://127.0.0.1:5000/user/login", {
        email,
        password,
      });
 
      console.log(data.data.user);
  
      if (data) {
        setUser(data.data.user);
        localStorage.setItem("token",data.data.token)
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate('/');
        return;
      }
    } catch (error) {
      window.alert("error in login page")
    }
  };
  // useEffect(() => {
  //   toast({
  //     title: "hi",
  //     description: "jjo",
  //     status: "success",
  //     duration: "5000",
  //   });
  // }, []);
      console.log(user);

  return (
    <>
      <div className="login-form-container active">
        <form action="">
          <h3>Sign In</h3>
          <span>Username</span>
          <input
            type="email"
            className="box"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span>Password</span>
          <input
            type="password"
            className="box"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="checkbox">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me"> Remember me</label>
          </div>

          <button className="btn" onClick={handleLogin}>
            {" "}
            Sign In
          </button>

          <p>
            Forgot password? <a href="/forgot">Click here</a>
          </p>
          <p>
            Don't have an account? <Link to="/signUp">Create one</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
