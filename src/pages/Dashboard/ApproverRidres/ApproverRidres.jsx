import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { CgDetailsMore } from "react-icons/cg";
import Loading from "../../../components/Loading/Loading";

const ApproverRidres = () => {
  const axiosSecure = useAxiosSecure();
  const {
    refetch,
    data: riders = [],
    isLoading,
  } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders`);
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updateIfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateIfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider has been ${status}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleRejection = (rider, user) => {
    Swal.fire({
      title: `Reject ${rider.name}'s rider request?`,
      text: "They will be marked as a normal user again.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // 1. Update rider status
        await axiosSecure.patch(`/riders/${rider._id}`, {
          status: "rejected",
          email: rider.email,
        });

        // 2. Update user role → user
        await axiosSecure.patch(`/users/${user._id}/role`, {
          role: "user",
        });

        Swal.fire({
          title: `${user.displayName} is now a normal user`,
          icon: "success",
        });
      }
    });
    refetch();
  };

  const handleDeleteRider = (id) => {
    axiosSecure.delete(`/riders/${id}`).then((res) => {
      if (res.data.deletedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider has been deleted`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="m-2 p-3 bg-base-100 rounded-lg">
      <h2>Riders Approval Pending: ({riders.length})</h2>
      <div className="overflow-x-auto">
        <table
          className="table table-zebra w-full whitespace-nowrap
"
        >
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Emal</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td
                  className={`${
                    rider.status === "approved" ? "text-success" : "text-error"
                  }`}
                >
                  {rider.status}
                </td>
                <td
                  className={`${
                    rider.workStatus === "available"
                      ? "text-success"
                      : "text-error"
                  }`}
                >
                  {rider.workStatus}
                </td>
                <td>
                  <button className="btn bg-primary tooltip" data-tip="Details">
                    <CgDetailsMore />
                  </button>
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn bg-primary tooltip"
                    data-tip="Approve"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(rider, rider._id)}
                    className="btn bg-red-400 tooltip"
                    data-tip="Reject"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button
                    onClick={() => handleDeleteRider(rider._id)}
                    className="btn bg-red-500 tooltip"
                    data-tip="Delete"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproverRidres;
