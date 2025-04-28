import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 

const SignUp = () => {
  const { userLoggedIn , currentuser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    password: "",
    companyName: "",
    isAgency: "Yes",
  });
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const { fullName, phoneNumber, emailAddress, password, isAgency } = formData;
    const isValid =
      fullName.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      emailAddress.trim() !== "" &&
      password.trim() !== "" &&
      isAgency !== "";

    setFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (value) => {
    setFormData({
      ...formData,
      isAgency: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { emailAddress, password, fullName} = formData;
    createUserWithEmailAndPassword(auth, emailAddress, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: fullName,
        });
        navigate(`/user/${user.uid}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Signup Error:", errorCode, errorMessage);
      });
  };

  if (userLoggedIn) {
    navigate(`/user/${currentuser.uid}`);
  }


  return (
    <div className="flex flex-col p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">Create your</h1>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">PopX account</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-purple-500 text-sm mb-1">
            Full Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Marry Doe"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-purple-500 text-sm mb-1">
            Phone number<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="9876543210"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-purple-500 text-sm mb-1">
            Email address<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            placeholder="marry@example.com"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-purple-500 text-sm mb-1">
            Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-700"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-purple-500 text-sm mb-1">
            Company name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-700"
          />
        </div>

        <div className="mb-8">
          <p className="text-gray-700 mb-2">
            Are you an Agency?<span className="text-red-500">*</span>
          </p>
          <div className="flex items-center space-x-6">
            <label className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 border ${
                  formData.isAgency === "Yes"
                    ? "border-none bg-purple-600"
                    : "border-gray-300"
                }`}
              >
                {formData.isAgency === "Yes" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <input
                type="radio"
                name="isAgency"
                value="Yes"
                checked={formData.isAgency === "Yes"}
                onChange={() => handleRadioChange("Yes")}
                className="hidden"
              />
              <span>Yes</span>
            </label>

            <label className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 border ${
                  formData.isAgency === "No"
                    ? "border-none bg-purple-600"
                    : "border-gray-300"
                }`}
              >
                {formData.isAgency === "No" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <input
                type="radio"
                name="isAgency"
                value="No"
                checked={formData.isAgency === "No"}
                onChange={() => handleRadioChange("No")}
                className="hidden"
              />
              <span>No</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full ${
            formValid ? "bg-purple-600" : "bg-gray-300"
          } text-white py-3 rounded-md transition-colors duration-300`}
          style={{ backgroundColor: formValid ? "#6C25FF" : undefined }}
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
