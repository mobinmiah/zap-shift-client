import React from "react";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();

  const axiosSecure = useAxiosSecure();
  const {
    data: deliveryStats = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const getPieChartData = (data) => {
    return data.map((item) => {
      return {
        name: item.status
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        value: item.count,
      };
    });
  };

  // Loading state
  if (authLoading || isLoading) {
    return <Loading />;
  }

  // Error state
  if (isError) {
    return (
      <div className="m-2 p-3 bg-base-100 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Admin Dashboard</h3>
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
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <p className="text-gray-600">
          Welcome back, {user.displayName || user.email}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {deliveryStats.map((stat) => (
          <div
            key={stat._id}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat._id
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Delivery Status Distribution
        </h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={getPieChartData(deliveryStats)}
                dataKey="value"
                startAngle={90}
                endAngle={450}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={2}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {getPieChartData(deliveryStats).map((entry, index) => (
                  <text
                    key={`cell-${index}`}
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [value, "Count"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800">Total Parcels</h4>
            <p className="text-2xl font-bold text-green-600">
              {deliveryStats.reduce((sum, stat) => sum + stat.count, 0)}
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800">Active Deliveries</h4>
            <p className="text-2xl font-bold text-blue-600">
              {deliveryStats
                .filter(
                  (stat) =>
                    !["parcel_delivered", "cancelled"].includes(stat._id)
                )
                .reduce((sum, stat) => sum + stat.count, 0)}
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-800">Completed</h4>
            <p className="text-2xl font-bold text-purple-600">
              {deliveryStats.find((stat) => stat._id === "parcel_delivered")
                ?.count || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
