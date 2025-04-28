import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Body = () => {
  const { userLoggedIn, currentuser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (userLoggedIn && currentuser) {
      navigate(`/user/${currentuser.uid}`);
    }
  }, [userLoggedIn, currentuser, navigate]);

  const handleSignUp = () => {
    navigate("/SignUp");
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  return (
    <div className="flex flex-col justify-end min-h-screen p-3 font-sans text-black">
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to PopX</h1>
        <p className="text-lg mb-8 text-[#74777B]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="flex flex-col gap-4 mt-6">
          <button
            className="bg-[#6C25FF] text-white rounded-lg py-3 px-5 text-base cursor-pointer"
            onClick={handleSignUp}
          >
            Create Account
          </button>
          <button
            className="bg-[#CEBAFB] rounded-lg py-3 px-5 text-base cursor-pointer"
            onClick={handleLogin}
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
