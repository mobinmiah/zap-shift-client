import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const { user } = useAuth();
  const email = user?.eamil || user?.providerData[0].email;
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${email}`);
      console.log(res.data);
      return res.data;
    },
  });
  return (
    <div className="m-8 bg-base-100 rounded-lg">
      <h2>My Parcels ({parcels.length})</h2>
      {parcels.map((parcel, _id) => {
        <div key={_id}>
          <h3>{parcel.receiverName}</h3>
        </div>;
      })}
    </div>
  );
};

export default MyParcels;
