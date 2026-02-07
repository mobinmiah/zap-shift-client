import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const PaymentHistory = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (loading || !user || !payments) {
    return <Loading></Loading>;
  }

  return (
    <div className="m-2 p-3 bg-base-100 rounded-lg ">
      <h2>Payment History ({payments.length})</h2>
      <div className="overflow-x-auto">
        <table
          className="table table-zebra w-full whitespace-nowrap
"
        >
          <thead>
            <tr>
              <th>No.</th>
              <th>Parcel Info</th>
              <th>Paid Time</th>
              <th>Payment Info</th>
              <th>Tracking ID</th>
              <th>Transaction ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.parcelName}</td>
                <td>{payment.paidAt}</td>
                <td>৳ {payment.amount}</td>
                <td>{payment.trackingId}</td>
                <td>{payment.transactionId}</td>
                <td>btns</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
