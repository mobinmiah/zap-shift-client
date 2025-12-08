import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcles", user?.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/riders?riderEmail=${user.email}&&deliveryStatus=driver_assigned`
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };

    const message = `Parcel is Updated with ${status.split("_").join(" ")}`;
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });
  };

  const handleRejectDelivery = (parcel) => {
    const statusInfo = { deliveryStatus: "pending-pickup" };
    axiosSecure
      .patch(`/parcels/${parcel._id}/reject`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `You rejected the parcel`,
            showConfirmButton: false,
            timer: 2500,
          });
          refetch();
        }
      });
  };

  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="m-2 p-3 bg-base-100 rounded-lg">
      <h2>Assigned Pending to Pickup : {parcels.length}</h2>
      {parcels.length === 0 ? (
        <div className="mt-5">
          <h3>No parcels have been Assigned to you</h3>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Cost</th>
                <th>Pickup District</th>
                <th>Destination</th>
                <th>Confirm</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.cost}</td>
                  <td>{parcel.senderDistrict}</td>
                  <td>{parcel.receiverDistrict}</td>
                  <td>
                    {parcel.deliveryStatus === "driver_assigned" ? (
                      <>
                        <button
                          onClick={() =>
                            handleDeliveryStatusUpdate(
                              parcel,
                              "rider_on_the_way"
                            )
                          }
                          className="btn bg-primary tooltip"
                          data-tip="Accept Delivery"
                        >
                          ✔️
                        </button>
                        <button
                          onClick={() => handleRejectDelivery(parcel)}
                          className="btn bg-primary tooltip"
                          data-tip="Reject Delivery"
                        >
                          ❌
                        </button>
                      </>
                    ) : (
                      <span>Delivery Accepted</span>
                    )}
                  </td>
                  <td className="flex items-center gap-1">
                    {parcel.deliveryStatus === "parcel_picked_up" ? (
                      "PickedUp"
                    ) : (
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                        }
                        className="btn bg-primary tooltip"
                        data-tip="Mark as Picked Up"
                      >
                        {parcel.deliveryStatus === "parcel_picked_up"
                          ? "PickedUp"
                          : "✅"}
                      </button>
                    )}

                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel_delivered")
                      }
                      className="btn bg-primary tooltip"
                      data-tip="Mark as Delivered"
                    >
                      ☑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignedDeliveries;
