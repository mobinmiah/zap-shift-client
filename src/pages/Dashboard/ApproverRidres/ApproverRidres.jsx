import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { CgDetailsMore } from "react-icons/cg";

const ApproverRidres = () => {
  const axiosSecure = useAxiosSecure();
  const { data: riders = [], refetch } = useQuery({
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

  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
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
  return (
    <div className="m-2 p-3 bg-base-100 rounded-lg">
      <h2>Riders Approval Pending: ({riders.length})</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
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
                    rider.workStatus === "available" ? "text-success" : "text-error"
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
                    onClick={() => handleRejection(rider)}
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
