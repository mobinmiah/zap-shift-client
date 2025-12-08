import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { PiListMagnifyingGlassBold } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";
import Loading from "../../../components/Loading/Loading";

const MyParcels = () => {
  const { user, loading } = useAuth();
  const email = user?.eamil || user?.providerData[0].email;
  const axiosSecure = useAxiosSecure();
  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${email}`);
      return res.data;
    },
  });

  const handleDeleteParcel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };
    const res = await axiosSecure.post("/checkuot-sesion", paymentInfo);
    window.location.assign(res.data.url);
  };

  if (loading || isLoading) {
    return <Loading></Loading>;
  }
  refetch();
  console.log(parcels);
  return (
    <div className="m-2 p-3 bg-base-100 rounded-lg">
      <h2>My Parcels ({parcels.length})</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Tracking ID</th>
              <th>Payment</th>
              <th>TransactionId ID</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>
                  {parcel.trackingId ? (
                    <Link
                      to={`/track-parcel/${parcel.trackingId}`}
                      className="link"
                    >
                      {parcel.trackingId}
                    </Link>
                  ) : (
                    "Please Pay to get TID"
                  )}
                </td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-500 font-semibold">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-sm bg-primary text-secondary"
                    >
                      Pay
                    </button>

                    // <Link to={`/dashboard/payment/${parcel._id}`}>
                    //   <button className="btn btn-sm btn-primary text-secondary">
                    //     Pay
                    //   </button>
                    // </Link>
                  )}
                </td>
                <td>{parcel.transactionId || "Please Pay to get TRX"}</td>
                <td>
                  {(parcel.deliveryStatus === "rider_on_the_way" &&
                    "Rider on the way") ||
                    (parcel.deliveryStatus === "parcel_picked_up" &&
                      "Parcels is Picked Up") ||
                    (parcel.deliveryStatus === "parcel_delivered" &&
                      "Parcel is Delivered") ||
                    (parcel.deliveryStatus === "pending_pickup" &&
                      "Pending for Pick Up") ||
                    "Please Pay to get Status"}
                </td>

                <td className="flex items-center gap-3">
                  <button title="View Details" className="btn hover:bg-primary">
                    <PiListMagnifyingGlassBold />
                  </button>
                  <button
                    title="Edit Your Parcel"
                    className="btn hover:bg-primary"
                  >
                    <FiEdit></FiEdit>
                  </button>
                  <button
                    onClick={() => handleDeleteParcel(parcel._id)}
                    title="Delete Parcel"
                    className="btn hover:bg-primary"
                  >
                    <FaRegTrashAlt />
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

export default MyParcels;
