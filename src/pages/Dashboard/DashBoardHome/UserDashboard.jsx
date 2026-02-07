import React from "react";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaBox,
  FaTruck,
  FaCheck,
  FaClock,
  FaDollarSign,
  FaMapMarkerAlt,
} from "react-icons/fa";

const UserDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-parcels", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    retry: 2,
    refetchOnWindowFocus: false,
    enabled: !!user?.email && !authLoading,
  });

  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["user-payments", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    retry: 1,
    enabled: !!user?.email && !authLoading,
  });

  const pendingParcels = parcels.filter(
    (p) =>
      p.deliveryStatus === "pending_pickup" || p.deliveryStatus === "processing"
  ).length;
  const shippedParcels = parcels.filter(
    (p) =>
      p.deliveryStatus === "driver_assigned" ||
      p.deliveryStatus === "rider_on_the_way"
  ).length;
  const deliveredParcels = parcels.filter(
    (p) => p.deliveryStatus === "parcel_delivered"
  ).length;
  const totalSpent = payments.reduce((sum, payment) => sum + payment.amount, 0);

  if (authLoading || isLoading || paymentsLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="m-2 p-3 bg-base-100 rounded-lg">
        <h3 className="text-xl font-bold mb-4">User Dashboard</h3>
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error loading dashboard data: {error.message}</span>
        </div>
        <button
          className="btn btn-primary mt-4"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="m-2 p-3 bg-base-100 rounded-lg min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Dashboard</h2>
        <p className="text-gray-600">
          Welcome back, {user.displayName || user.email}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
              <FaBox className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Parcels</p>
              <p className="text-2xl font-bold text-gray-900">
                {parcels.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-5 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600 mr-4">
              <FaClock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingParcels}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-5 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-100 text-orange-600 mr-4">
              <FaTruck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Shipped</p>
              <p className="text-2xl font-bold text-gray-900">
                {shippedParcels}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
              <FaCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-900">
                {deliveredParcels}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spending Summary */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Total Spent</h3>
            <p className="text-3xl font-bold mt-1">${totalSpent.toFixed(2)}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-indigo-100">
              on {payments.length} payment{payments.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Parcels */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaBox className="mr-2" /> Recent Parcels
            <span className="ml-2 badge badge-primary">{parcels.length}</span>
          </h3>
          <a
            href="/dashboard/my-parcels"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View All
          </a>
        </div>

        {parcels.length === 0 ? (
          <div className="text-center py-8">
            <FaBox className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No parcels yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by sending a parcel.
            </p>
            <a
              href="/send-parcel"
              className="mt-4 inline-block btn btn-primary"
            >
              Send Parcel
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {parcels.slice(0, 3).map((parcel) => (
              <div
                key={parcel._id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium text-gray-900">
                        #{parcel.trackingId}
                      </h4>
                      <span
                        className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          parcel.deliveryStatus === "parcel_delivered"
                            ? "bg-green-100 text-green-800"
                            : parcel.deliveryStatus === "rider_on_the_way" ||
                              parcel.deliveryStatus === "driver_assigned"
                            ? "bg-yellow-100 text-yellow-800"
                            : parcel.deliveryStatus === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {parcel.deliveryStatus
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">To:</span>{" "}
                      {parcel.deliveryAddress}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Service:</span>{" "}
                      {parcel.serviceType || "Standard"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ${parcel.totalCost}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(parcel.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Payments */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FaDollarSign className="mr-2" /> Recent Payments
        </h3>

        {payments.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">No payment history</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Tracking ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.slice(0, 5).map((payment) => (
                  <tr key={payment._id}>
                    <td>#{payment.trackingId}</td>
                    <td>${payment.amount}</td>
                    <td>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          payment.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payment.paymentStatus}
                      </span>
                    </td>
                    <td>{new Date(payment.paidAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
