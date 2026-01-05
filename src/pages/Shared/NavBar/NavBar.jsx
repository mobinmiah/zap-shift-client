import React from "react";
import { Link, NavLink } from "react-router";
import { FaArrowCircleRight } from "react-icons/fa";
import navLogo from "../../../assets/nav_logo.png";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";

const NavBar = () => {
  const { user, logOutUser} = useAuth();
  const photo = user?.photoURL || user?.providerData[0]?.photoURL;
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
      <li>
        <NavLink to="/" className="nav-link">Home</NavLink>
      </li>
      <li>
        <NavLink to="/services" className="nav-link">Services</NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className="nav-link">Coverage Areas</NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel" className="nav-link">Send a Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/rider" className="nav-link">Be a Rider</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/dashboard/my-parcels" className="nav-link">My Parcels</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/about" className="nav-link">About Us</NavLink>
      </li>
      <li className="md:hidden">
        <button
          onClick={handleLogout}
          className="btn bg-primary hover:bg-primary/90 text-secondary"
        >
          Log Out
        </button>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg rounded-lg border border-gray-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-primary/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-lg border border-gray-100 z-10 space-y-1"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl hover:bg-primary/10">
          <img src={navLogo} alt="ZapShift Logo" className="h-8 w-auto" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul>
      </div>
      <div className="navbar-end flex justify-end items-center gap-4">
        <div>
          {user ? (
            <div className="flex justify-between items-center gap-3">
              <Link to="/dashboard" className="group">
                {photo ? (
                  <img
                    className="w-10 h-10 rounded-full bg-primary border-2 border-primary/20 group-hover:border-primary transition-all duration-200"
                    src={photo}
                    alt={
                      user?.displayName || user?.providerData[0]?.displayName || "User Avatar"
                    }
                    title={
                      user?.displayName || user?.providerData[0]?.displayName || "Go to Dashboard"
                    }
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary border-2 border-primary/20 group-hover:border-primary transition-all duration-200 flex items-center justify-center">
                    <span className="text-secondary font-semibold text-sm">
                      {(user?.displayName || user?.email || "U").charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="btn bg-primary hover:bg-primary/90 text-secondary hidden md:flex items-center gap-2 border-none"
              >
                Log Out
                <FaArrowCircleRight className="-rotate-45 transition-transform group-hover:rotate-0" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn bg-primary hover:bg-primary/90 text-secondary border-none">
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
