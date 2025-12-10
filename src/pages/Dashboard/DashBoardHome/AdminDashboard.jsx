import React from "react";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const AdminDashboard = () => {
  const { user, loading } = useAuth();

  const axiosSecure = useAxiosSecure();
  const { data: deliveryStats = [] } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  const getPieChartData = (data) => {
    return data.map((item) => {
      return { name: item.status, value: item.count };
    });
  };

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="m-2 p-3 bg-base-100 rounded-lg">
      <h3>{user.displayName || user.providerData.displayName} (Admin)</h3>
      <div className=" max-w-fit mx-auto mt-5">
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          {deliveryStats.map((stat) => (
            <div key={stat._id} className="stat">
              <div className="stat-title font-semibold text-2xl">
                {stat._id}
              </div>
              <div className="stat-value font-semibold text-2xl">
                {stat.count}
              </div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>
          ))}
        </div>
      </div>
    
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={getPieChartData(deliveryStats)}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy="60%"
              outerRadius="80%"
              fill="#8884d8"
              label
            />
            <Legend></Legend>
            <Tooltip></Tooltip>
          </PieChart>
        </ResponsiveContainer>
      </div>
    
    </div>
  );
};

export default AdminDashboard;
