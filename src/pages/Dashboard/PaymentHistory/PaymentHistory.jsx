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
      console.log(res.data);
      return res.data;
    },
  });

  if (loading || !user || !payments) {
    return <Loading></Loading>;
  }
  console.log(payments);
  return (
    <div className="m-8 p-8 bg-base-100 rounded-lg flex flex-col justify-center items-center">
      <h2>Payment History ({payments.length})</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>No.</th>
              <th>Parcel Info</th>
              {/* <th>Recipient Info</th> */}
              <th>Paid Time</th>
              <th>Payment Info</th>
              <th>Tracking ID</th>
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
