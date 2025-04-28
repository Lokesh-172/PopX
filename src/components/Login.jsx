import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useAuth } from "../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { userLoggedIn, currentuser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [error, setError] = useState(""); // Add state for error message

  useEffect(() => {
    if (email.trim() !== "" && password.trim() !== "") {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  }, [email, password]);

  useEffect(() => {
    if (userLoggedIn) {
      navigate(`/user/${currentuser.uid}`);
    }
  }, [userLoggedIn, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate(`/user/${user.uid}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login error:", errorCode, errorMessage);

        // Set user-friendly error message based on error code
        if (
          errorCode === "auth/user-not-found" ||
          errorCode === "auth/wrong-password"
        ) {
          setError("Invalid email or password. Please try again.");
        } else if (errorCode === "auth/invalid-email") {
          setError("Please enter a valid email address.");
        } else if (errorCode === "auth/too-many-requests") {
          setError(
            "Too many unsuccessful login attempts. Please try again later."
          );
        } else if (errorCode === "auth/invalid-credential") {
          setError(
            "Invalid credentials. Please check your email and password."
          );
        } else {
          setError("An error occurred during login. Please try again.");
        }
      });
  };

  return (
    <div className="flex flex-col p-4 max-w-md mx-auto">
      <div className="flex">
        <div className="w-[75%]">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Signin to your PopX account
          </h1>
          <p className="text-gray-500 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </p>
        </div>
        <div className="w-[25%]"></div>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col">
        {/* Display error message if it exists */}

        <div className="mb-4">
          <label className="block text-purple-500 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-purple-500 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-400"
          />
        </div>

        <button
          type="submit"
          className={`w-full ${
            isFormFilled ? "bg-purple-600" : "bg-gray-300"
          } text-white py-3 rounded-md transition-colors duration-300`}
          style={{ backgroundColor: isFormFilled ? "#6C25FF" : undefined }}
        >
          Login
        </button>
      </form>
      {error && (
        <div className="mb-4 mt-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-300">
          {error}
        </div>
      )}
    </div>
  );
};

export default Login;
