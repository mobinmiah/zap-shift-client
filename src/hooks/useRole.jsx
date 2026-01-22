import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isLoading: roleLoading,
    data: role = "user",
    error,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return "user"; // Return default role when no email
      }
      try {
        const res = await axiosSecure.get(`/users/${user?.email}/role`);
        return res.data?.role || "user";
      } catch (err) {
        console.error("Error fetching user role:", err);
        return "user"; // Return default role on error
      }
    },
    enabled: !!user?.email && !user?.isAnonymous, // Only run query when user email is available and not anonymous
    retry: 1,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  return { role, roleLoading, roleError: error };
};

export default useRole;
