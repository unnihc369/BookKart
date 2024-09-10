import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../context/UserContext";
import axios from "axios";

const SignUp = () => {

     const [email, setEmail] = useState("");
     const [name, setName] = useState("");
     const [password, setPassword] = useState("");
     const [confirmpassword, setConfirmPassword] = useState("");
     const [phone,setPhone]=useState("");
     const [address,setAddress]=useState("");
   
     const navigate = useNavigate();

     const { user, setUser } = UserState();

     const handleSignUp = async (e) => {
       e.preventDefault();
       if (!email || !password||!name||!address||!phone) {
        //  console.log("please provide the documnet");
         window.alert("please provide all documents");

         return;
       }
       if(password!==confirmpassword){
        window.alert("password miss match");

        return;
       }
       try {
         const { data } = await axios.post(
           "http://127.0.0.1:5000/user/signup",
           {
             name,
             email,
             password,
             address,
             phone,
           }
         );


         if (data) {
           navigate("/login");
        
           return;
         }
       } catch (error) {
         window.alert("error in login page");
       }
     };

  return (
    <>
      <div className="login-form-container active">
        <form action="">
          <h3>Sign Up</h3>
          <span>name</span>
          <input
            type="text"
            className="box"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <span>email</span>
          <input
            type="email"
            className="box"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span>phone</span>
          <input
            type="number"
            className="box"
            placeholder="Enter your phone Number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <span>Address</span>
          <input
            type="text"
            className="box"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <span>Password</span>
          <input
            type="password"
            className="box"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span>Confirm Password</span>
          <input
            type="password"
            className="box"
            placeholder="Confirm your password"
            value={confirmpassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <button className="btn" onClick={handleSignUp}>sing Up</button>

          <p>
            Do you had an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
