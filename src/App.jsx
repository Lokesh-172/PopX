import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import ErrorPage from "./components/ErrorPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { AuthProvider } from "./context/authContext";
import UserProfile from "./components/UserProfile";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/SignUp",
      element: <SignUp />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/Login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/user/:fullname",
      element: <UserProfile/>,
    },
  ]);

  return (
    <AuthProvider>
      <MaxWidthWrapper>
        <RouterProvider router={appRouter} />
      </MaxWidthWrapper>
    </AuthProvider>
  );
}

export default App;
