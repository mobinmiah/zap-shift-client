import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState();
  const sessionId = searchParams.get("session_id");
  const { loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  if (paymentInfo) {
    console.log(paymentInfo);
  }
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/verify-payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  if (loading) {
    return setLoading(true);
  }
  return (
    <>
      {paymentInfo && (
        <div className="m-8 p-8 bg-base-100 rounded-lg flex flex-col justify-center items-center">
          <h2>Payment Successful</h2>
          <div>
            <p>See Transaction : {paymentInfo.transactionId}</p>
            <p>Track your parcel : {paymentInfo.trackingId}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentSuccess;
