import React, { useState, useContext } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import { RoomContext } from '../Context';
import './Auth.css'; // Ensure this file exists for styling

const Auth = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(RoomContext);
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("auth-token", result.user.refreshToken);
      setAuth(true);
      navigate("/input"); // Navigate directly after successful sign-in
    } catch (error) {
      toast.error("Failed to sign in: " + error.message);
      console.log({ message: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="auth text-center">
        <p>Sign in with Google to continue</p>
        <button
          className="btn btn-primary btn-interactive"
          onClick={signInWithGoogle}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In with Google"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Auth;
