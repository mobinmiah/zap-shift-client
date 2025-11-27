import React from "react";
import { useParams } from "react-router";
// import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  // const { loading, setLoading } = useAuth();
  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  return (
    <div className="m-8 p-8 bg-base-100 rounded-lg flex flex-col justify-center items-center">
      <h2>Payment for {parcel.parcelName}</h2>
      <button
        onClick={handlePayment}
        className={`btn bg-primary text-secondary`}
      >
        Pay
      </button>
    </div>
  );
};

export default Payment;
