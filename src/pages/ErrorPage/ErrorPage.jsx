import React from "react";
import erroImg from "../../assets/error.png";
import NavBar from "../Shared/NavBar/NavBar";
import Footer from "../Shared/Footer/Footer";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="py-20 px-24 mt-10 bg-base-100 flex flex-col justify-center items-center rounded-2xl">
      <img src={erroImg} alt="" />
      <p className="text-secondary font-black text-5xl mb-10">Page not found</p>
      <Link to="/" className="btn bg-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
