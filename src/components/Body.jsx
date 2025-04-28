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
      <div className="flex w-full">
        <div className="w-[70%]">
          <h1 className="text-[28px] font-bold mb-1">Welcome to PopX</h1>
          <p className="text-lg mb-4 text-[#74777B]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="w-[30%]"></div>
      </div>
      <div className="max-w-lg">
        <div className="flex flex-col gap-2 mt-3">
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
