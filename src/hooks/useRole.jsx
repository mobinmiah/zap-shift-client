import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isLoading: roleLoading,
    data: role = "user",
    error,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return "user";
      }
      try {
        const res = await axiosSecure.get(`/users/${user?.email}/role`);
        return res.data?.role || "user";
      } catch (err) {
        return "user";
      }
    },
    enabled: !!user?.email,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  return { role, roleLoading: loading || roleLoading, roleError: error };
};

export default useRole;
