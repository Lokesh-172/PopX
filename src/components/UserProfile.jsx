import { signOut } from "firebase/auth";
import { Camera, LogOut } from "lucide-react";
import { useState } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function UserProfile() {
  const navigate = useNavigate();
  const {currentuser} = useAuth()
  const [user, setUser] = useState({
    name: currentuser.displayName,
    email: currentuser.email,
    photoUrl: currentuser.photoURL || "/anon.jpg",
    description:
      "Lorem Ipsum Dolor Sit Amet. Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam",
  });

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      // An error happened.
    });
  };

  return (
    <div className="max-w-md bg-white  border-gray-200 rounded-md">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-700">
            Account Settings
          </h2>
          <button 
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <LogOut size={16} className="mr-1" />
            <span>Logout</span>
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          {/* Rest of the component remains the same */}
          <div className="flex items-center mb-4">
            <div className="relative">
              <img
                src="/anon.jpg"
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 bg-purple-800 rounded-full w-6 h-6 flex items-center justify-center">
                <Camera color="#FFFFFF" size={14} />
              </div>
            </div>

            <div className="ml-3">
              <h3 className="font-medium text-gray-800">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          </div>

          <p className="text-gray-600 text-sm">{user.description}</p>
        </div>
      </div>

      <div className="border-dashed border-gray-500 border-1 mt-2 "></div>
    </div>
  );
}
