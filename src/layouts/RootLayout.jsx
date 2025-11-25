import React from "react";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";
import useAuth from "../hooks/useAuth";

const RootLayout = () => {
  const { loading, setLoading } = useAuth();
  if (loading) {
    return setLoading(true);
  }
  return (
    <div className="max-w-7xl mx-auto pt-4">
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
