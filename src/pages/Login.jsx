import React, { useEffect, useRef } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import googleBtn from "../assets/google-icon.svg";
import todoImg from "../assets/check-list.png";

export const Login = ({ setUser }) => {
  const linkRef = useRef();
  const navigate = useNavigate();
  const userProfile = useSelector((state) => state.profile);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("success and navigate")
      setUser(codeResponse);
      // linkRef.current.click();
      navigate("/home");
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (userProfile) {
      console.log("redirect");
      // linkRef.current.click();
      navigate("/home");
    }
  }, [userProfile, navigate]);

  return (
    <div className="container" style={mainDiv}>
      <h1 style={{ fontSize: "40px", marginBottom: "10px", color: "gray" }}>
        <span className="first-letter">O</span>rganize{" "}
        <span className="first-letter">M</span>e{" "}
        <img src={todoImg} style={{ width: "40px" }} />
      </h1>

      <div onClick={login} className="login-btn">
        <img src={googleBtn} alt="" style={{ width: "20px", height: "20px" }} />
        <div className="login-text-container">
          <span className="login-text">Sign in with Google</span>
        </div>
        <Link to="/home" ref={linkRef} style={{ display: "none" }}>
          Redirect
        </Link>
      </div>
    </div>
  );
};

const mainDiv = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "80vh",
  gap: "20px",
  flexDirection: "column",
};