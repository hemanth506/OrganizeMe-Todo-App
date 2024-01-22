import React, { useEffect, useRef } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Login = ({ setUser }) => {
  const linkRef = useRef();
  const navigate = useNavigate();
  const userProfile = useSelector((state) => state.profile);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      linkRef.current.click();
      navigate("/home");
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (userProfile) {
      console.log("redirect");
      linkRef.current.click();
      navigate("/home");
    }
  }, [userProfile]);

  return (
    <div className="container" style={mainDiv}>
      <h2>Organize me</h2>
      <div>
        <button onClick={login}>Sign in with Google 🚀 </button>
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
  height: "100vh",
  gap: "20px",
  flexDirection: "column",
};
