import React from "react";
import {
  FaHome,
  FaMotorcycle,
  FaSignOutAlt,
  FaTasks,
  FaUsers,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import navLogo from "../assets/nav_logo.png";
import myParcelIcon from "../../src/assets/my-parcel.svg";
import sendParcelIcon from "../../src/assets/send-parcel.svg";
import assingRiderIcon from "../../src/assets/assign-rider.svg";
import paymentHistoryIcon from "../../src/assets/payment-history.png";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { SiGoogletasks } from "react-icons/si";

const DashboardLayout = () => {
  const { user, logOutUser } = useAuth();
  const { role } = useRole();

  const handleLogOut = () => {
    logOutUser();
  };

  return (
    <div className=" max-w-7xl mx-auto">
      <div className="flex justify-start items-center">
        <Link to="/" className="w-fit py-3 pl-3 bg-base-100 hidden md:block">
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
          <h3 className="px-4 hidden md:block">Dashboard</h3>

          <Link to="/" className="w-fit py-3 pl-3 bg-base-100 block md:hidden">
            <img src={navLogo} className="h-10" alt="" />
          </Link>
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
                  to="/dashboard"
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

              {/* admin links */}
              {role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/approve-riders"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Approve Riders"
                    >
                      <FaMotorcycle />

                      <span className="is-drawer-close:hidden">
                        Approve Riders
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/assign-rider"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Assign Rider"
                    >
                      <img
                        src={assingRiderIcon}
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
                        Assign Riders
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/assigned-deliveries-to-riders"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Assigned Deliveries to Riders"
                    >
                      <FaTasks />

                      <span className="is-drawer-close:hidden">
                        Assigned Deliveries to Riders
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manage-users"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Manage Users"
                    >
                      <FaUsers></FaUsers>

                      <span className="is-drawer-close:hidden">
                        Manage Users
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* rider links */}
              {role === "rider" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/assigned-deliveries"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Assigned Deliveries"
                    >
                      <FaTasks />

                      <span className="is-drawer-close:hidden">
                        Assigned Deliveries
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/completed-deliveries"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Completed Deliveries"
                    >
                      <SiGoogletasks />

                      <span className="is-drawer-close:hidden">
                        Completed Deliveries
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
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
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="LogOut"
                >
                  <FaSignOutAlt />

                  <span className="is-drawer-close:hidden">LogOut</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
