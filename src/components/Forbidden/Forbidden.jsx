import React from "react";
import { Link } from "react-router";
import { FiLock, FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-error/10 rounded-full">
            <FiLock className="text-error" size={60} />
          </div>
        </div>

        <h1 className="text-5xl font-bold text-error mb-2">403</h1>
        <h2 className="text-2xl font-semibold mb-4">Forbidden Access</h2>
        <p className="text-base-content/70 max-w-md mx-auto mb-8">
          You don’t have permission to view this page. If you believe this is a
          mistake, please contact support.
        </p>

        <div>
          <Link to="/" className="btn bg-primary gap-2">
            <FiArrowLeft size={18} />
            Back to Home
          </Link>
          <Link to="/dashboard" className="btn bg-secondary text-base-100 gap-2">
            Back to Dashboard
            <FiArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
