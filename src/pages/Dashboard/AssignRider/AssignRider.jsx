import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";

const AssignRider = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const { isLoading, data: parcels = [] } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });

  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`
      );
      return res.data;
    },
  });

  const openRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    modalRef.current.showModal();
  };

  const handleAssignRider = (rider) => {
    const riderInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.name,
      parcelId: selectedParcel._id,
    };

    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Rider has been assigned`,
            showConfirmButton: false,
            timer: 2500,
          });
         
          modalRef.current.close();
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
 refetch();
  return (
    <div className="m-2 p-3 bg-base-100 rounded-lg">
      <h2>Assign a Rider : {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Transaction ID</th>
              <th>Pickup District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.createdAt}</td>
                <td>{parcel.transactionId}</td>
                <td>{parcel.senderDistrict}</td>
                <td>
                  <button
                    onClick={() => openRiderModal(parcel)}
                    className="btn bg-primary"
                  >
                    Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3>Riders: {riders.length}</h3>
          <p className=" text-center">Assign a Rider to this Parcel</p>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
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
                    <td>
                      <button
                        onClick={() => handleAssignRider(rider)}
                        className="btn bg-primary"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
