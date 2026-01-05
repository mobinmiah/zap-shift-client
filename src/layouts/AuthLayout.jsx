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
      <div className="flex-1 flex justify-center items-center pt-10 px-4">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          {/* LEFT SIDE — Forms */}
          <div className="p-8 lg:p-16 flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>

          {/* RIGHT SIDE — Illustration */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-lime-50 to-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
            <img 
              src={authImg} 
              alt="Authentication Visual" 
              className="w-4/5 relative z-10 transition-transform duration-300 hover:scale-105" 
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AuthLayout;
