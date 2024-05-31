import React from "react";
import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate,Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

export const Auth = () => {
  const { isAuth } = useGetUserInfo();
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);

    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  }; 
  if(isAuth){
    return <Navigate to="/expense-tracker"></Navigate>
  }

  return (

    <div className="login-page">
        Expense Tracker Website. 
        Made by- <a target="_blank" href="https://github.com/Abhishek-Ranjan-16">Abhishek Ranjan</a> (UI/UX expert)
        <br />

      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
};
