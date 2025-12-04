import React, { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const { loading } = useAuth();
  const [paymentInfo, setPaymentInfo] = useState(null);

  const calledRef = useRef(false);

  useEffect(() => {
    if (!sessionId) return;
    if (calledRef.current) return; // Prevent duplicate call
    calledRef.current = true;

    axiosSecure
      .patch(`/verify-payment-success?session_id=${sessionId}`)
      .then((res) => {
        setPaymentInfo({
          transactionId: res.data.transactionId,
          trackingId: res.data.trackingId,
        });
      });
  }, [sessionId, axiosSecure]);

  if (loading) return <Loading></Loading>;

  return (
    paymentInfo && (
      <div className="m-2 p-3 bg-base-100 rounded-lg flex flex-col justify-center items-center gap-10">
        <h2>Payment Successful</h2>
        <div>
          <p>See Transaction :{paymentInfo.transactionId}</p>
          <p>Track your parcel : {paymentInfo.trackingId}</p>
        </div>
        <Link to="/dashboard/payment-history" className="btn bg-primary text-xl text-secondary font-bold">See All Payments</Link>
      </div>
    )
  );
};

export default PaymentSuccess;
