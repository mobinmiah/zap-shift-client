import React from "react";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaMotorcycle,
  FaCheckCircle,
  FaClock,
  FaBox,
  FaMapMarkerAlt,
} from "react-icons/fa";

const RiderDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch rider's assigned deliveries
  const {
    data: deliveries = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["rider-deliveries", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(
        `/parcels/riders?riderEmail=${user.email}&deliveryStatus=rider_on_the_way`
      );
      return res.data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 2,
    enabled: !!user?.email,
  });

  // Fetch rider's completed deliveries
  const { data: completedDeliveries = [] } = useQuery({
    queryKey: ["rider-completed-deliveries", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(
        `/parcels/riders?riderEmail=${user.email}&deliveryStatus=parcel_delivered`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!user?.email,
  });

  // Fetch rider's delivery stats per day
  const { data: dailyStats = [] } = useQuery({
    queryKey: ["rider-daily-stats", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(
        `/riders/delivery-per-day?email=${user.email}`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!user?.email,
  });

  // Handle delivery status updates
  const updateDeliveryStatus = async (parcelId, newStatus, trackingId) => {
    try {
      await axiosSecure.patch(`/parcels/${parcelId}/status`, {
        deliveryStatus: newStatus,
        riderId: user.uid,
        trackingId,
      });
      refetch();
    } catch (err) {
    }
  };

  // Loading state
  if (authLoading || isLoading) {
    return <Loading />;
  }

  // Error state
  if (isError) {
    return (
      <div className="m-2 p-3 bg-base-100 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Rider Dashboard</h3>
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
        <h2 className="text-2xl font-bold text-gray-800">Rider Dashboard</h2>
        <p className="text-gray-600">
          Welcome back, {user.displayName || user.email}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
              <FaMotorcycle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Deliveries
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {deliveries.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
              <FaCheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Completed Today
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {dailyStats.length > 0
                  ? dailyStats[dailyStats.length - 1].deliveredCount
                  : 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4">
              <FaBox className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Completed
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {completedDeliveries.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Deliveries Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FaMotorcycle className="mr-2" /> Active Deliveries
          <span className="ml-2 badge badge-primary">{deliveries.length}</span>
        </h3>

        {deliveries.length === 0 ? (
          <div className="text-center py-8">
            <FaMotorcycle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No active deliveries
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You have no parcels to deliver right now.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <div
                key={delivery._id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      #{delivery.trackingId}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">From:</span>{" "}
                      {delivery.pickupAddress}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">To:</span>{" "}
                      {delivery.deliveryAddress}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Recipient:</span>{" "}
                      {delivery.receiverName} ({delivery.receiverPhone})
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      {delivery.deliveryStatus
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                    <p className="text-sm font-medium text-gray-900 mt-2">
                      ${delivery.totalCost}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() =>
                      updateDeliveryStatus(
                        delivery._id,
                        "rider_on_the_way",
                        delivery.trackingId
                      )
                    }
                    className="btn btn-sm btn-outline btn-warning"
                    disabled={delivery.deliveryStatus === "rider_on_the_way"}
                  >
                    On the Way
                  </button>
                  <button
                    onClick={() =>
                      updateDeliveryStatus(
                        delivery._id,
                        "parcel_delivered",
                        delivery.trackingId
                      )
                    }
                    className="btn btn-sm btn-outline btn-success"
                    disabled={delivery.deliveryStatus === "parcel_delivered"}
                  >
                    Mark Delivered
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delivery History */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>

        {completedDeliveries.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">No recent deliveries completed</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Tracking ID</th>
                  <th>Destination</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {completedDeliveries.slice(0, 5).map((delivery) => (
                  <tr key={delivery._id}>
                    <td>#{delivery.trackingId}</td>
                    <td>{delivery.deliveryAddress}</td>
                    <td>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Delivered
                      </span>
                    </td>
                    <td>${delivery.totalCost}</td>
                    <td>
                      {new Date(
                        delivery.updatedAt || delivery.createdAt
                      ).toLocaleDateString()}
                    </td>
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

export default RiderDashboard;
