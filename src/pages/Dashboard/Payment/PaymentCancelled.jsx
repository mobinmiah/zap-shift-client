import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div className="m-8 p-8 bg-base-100 rounded-lg flex flex-col justify-center items-center">
      <h2>Payment is Canceled. Please try again</h2>
      <Link to="/dashboard/my-parcels">
        <button className={`btn bg-primary text-secondary`}>Try Again</button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
