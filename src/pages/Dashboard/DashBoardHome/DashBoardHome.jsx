import React from "react";
import useRole from "../../../hooks/useRole";
import Loading from "../../../components/Loading/Loading";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";

const DashBoardHome = () => {
  const { role, roleLoading, roleError } = useRole();

  console.log("DashBoardHome - role:", role);
  console.log("DashBoardHome - roleLoading:", roleLoading);
  console.log("DashBoardHome - roleError:", roleError);

  if (roleLoading) {
    console.log("Showing role loading");
    return <Loading></Loading>;
  }

  if (roleError) {
    console.log("Role error occurred:", roleError);
    // Still show dashboard but with user role as fallback
  }

  console.log("Rendering dashboard for role:", role);

  if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else if (role === "rider") {
    return <RiderDashboard></RiderDashboard>;
  } else {
    return <UserDashboard></UserDashboard>;
  }
};

export default DashBoardHome;
