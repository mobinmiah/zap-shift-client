import React from "react";
import { FaHome } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import navLogo from "../assets/nav_logo.png";
import myParcelIcon from "../../src/assets/my-parcel.svg";
import sendParcelIcon from "../../src/assets/send-parcel.svg";
import paymentHistoryIcon from "../../src/assets/payment-history.png";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  return (
    <div className=" max-w-7xl mx-auto">
      <div className="flex justify-start items-center">
        <Link to="/" className="w-fit py-3 pl-3 bg-base-100">
          <img src={navLogo} className="h-10" alt="" />
        </Link>

        {/* Navbar */}
        <nav className="navbar w-full bg-base-100 flex justify-between items-center">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <h3 className="px-4">Dashboard</h3>

          <div>
            {user && (
              <div className="flex justify-between items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full bg-primary"
                  src={user?.photoURL || user?.providerData[0]?.photoURL}
                  alt={user?.displayName || user?.providerData[0]?.displayName}
                  title={
                    user?.displayName || user?.providerData[0]?.displayName
                  }
                />
              </div>
            )}
          </div>
        </nav>
      </div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <Outlet></Outlet>
          {/* <div className="p-4">Page Content</div> */}
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="flex min-h-full flex-col items-start bg-base-100 is-drawer-close:w-fit is-drawer-open:w-64 ">
            {/* Sidebar content here */}

            <ul className="menu w-full grow">
              {/* List item */}

              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Home"
                >
                  {/* Home icon */} <FaHome />
                  <span className="is-drawer-close:hidden">Home</span>
                </Link>
              </li>

              {/* List item */}
              <li>
                <NavLink
                  to="/sendParcel"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Send Parcel"
                >
                  <img
                    src={sendParcelIcon}
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4 text-primaryz"
                    alt=""
                  />
                  <span className="is-drawer-close:hidden">Send Parcel</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-parcels"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Parcels"
                >
                  <img
                    src={myParcelIcon}
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4 text-primaryz"
                    alt=""
                  />
                  <span className="is-drawer-close:hidden">My Parcels</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/payment-history"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Payment History"
                >
                  <img
                    src={paymentHistoryIcon}
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4 text-primaryz"
                    alt=""
                  />
                  <span className="is-drawer-close:hidden">
                    Payment History
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
