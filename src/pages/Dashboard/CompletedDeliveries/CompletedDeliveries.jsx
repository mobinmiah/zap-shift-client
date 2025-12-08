import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";

const CompletedDeliveries = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcles", user?.email, "parcel_delivered"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/riders?riderEmail=${user.email}&&deliveryStatus=parcel_delivered`
      );
      return res.data;
    },
  });

  if (loading || isLoading) {
    return <Loading></Loading>;
  }
  refetch();

  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    } else {
      return parcel.cost * 0.6;
    }
  };

  return (
    <div className="m-2 p-3 bg-base-100 rounded-lg">
      <h2>Completed Deliveries : ({parcels.length})</h2>
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
                <th>Pickup District</th>
                <th>Destination</th>
                <th>Cost</th>
                <th>Payout</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.senderDistrict}</td>
                  <td>{parcel.receiverDistrict}</td>
                  <td>{parcel.cost}</td>
                  <td>{calculatePayout(parcel)}</td>
                  <td>
                    <button className="btn bg-primary">Cash Out</button>
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

export default CompletedDeliveries;
