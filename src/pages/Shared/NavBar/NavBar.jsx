import React from "react";
import { Link, NavLink } from "react-router";
import { FaArrowCircleRight } from "react-icons/fa";
import navLogo from "../../../assets/nav_logo.png";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  const { user, logOutUser } = useAuth();

  const handleLogout = () => {
    logOutUser();
  };
  // const [theme, setTheme] = useState(
  //   localStorage.getItem("theme") || "lightTheme"
  // );

  // useEffect(() => {
  //   localStorage.setItem("theme", theme);
  //   document.documentElement.setAttribute("data-theme", theme);
  // }, [theme]);

  // const toggleTheme = () => {
  //   setTheme(theme === "lightTheme" ? "darkTheme" : "lightTheme");
  // };
  const navLinks = (
    <>
      <li className="border border-primary rounded-lg mr-2">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="border border-primary rounded-lg mr-2">
        <NavLink to="/services">Services</NavLink>
      </li>
      <li className="border border-primary rounded-lg mr-2">
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li className="border border-primary rounded-lg mr-2">
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li className="border border-primary rounded-lg mr-2">
        <NavLink to="/sendParcel">Send Parcel</NavLink>
      </li>
      <li className="border border-primary rounded-lg mr-2">
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li className="border border-primary rounded-lg mr-2">
        <NavLink to="/rider">Be a Rider</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm rounded-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          <img src={navLogo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end felx justify-end items-center gap-4">
        <div>
          {user ? (
            <div className="flex justify-between items-center gap-3">
              <img
                className="w-10 h-10 rounded-full bg-primary"
                src={user.photoURL || user.providerData[0].photoURL}
                alt={user.displayName || user.providerData[0].displayName}
                title={user.displayName || user.providerData[0].displayName}
              />
              <button onClick={handleLogout} className="btn bg-primary">
                Log Out{" "}
                <FaArrowCircleRight className="-rotate-45"></FaArrowCircleRight>
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn bg-primary">
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
