import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Background from "/Background.png";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { firebaseUser, loading } = useUser();

  if (loading) {
    return (
      <div
        className=" bg-cream w-full pt-[80px] gap-y-4  min-h-screen flex flex-col justify-start items-center px-16 font-kanit pb-20 relative"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!firebaseUser) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
