import React from "react";
import { Outlet } from "react-router";
import authImg from "../assets/authImage.png";
import NavBar from "../pages/Shared/NavBar/NavBar";
import Footer from "../pages/Shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-screen flex flex-col pt-4">
        
      <NavBar />

      {/* Main Auth Container */}
      <div className="flex-1 flex justify-center items-center pt-10">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 bg-white shadow-md rounded-xl overflow-hidden">
          {/* LEFT SIDE — Forms */}
          <div className="p-10 lg:p-16 flex items-center justify-center">
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>

          {/* RIGHT SIDE — Illustration */}
          <div className="hidden lg:flex items-center justify-center bg-lime-50">
            <img src={authImg} alt="Authentication Visual" className="w-4/5" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AuthLayout;
