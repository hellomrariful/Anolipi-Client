import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const usePremium = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isPremium, isPending: isPremiumLoading } = useQuery({
    queryKey: [user?.email, "isPremium"],
    enabled: !loading,
    queryFn: async () => {
      // console.log("asking or checking is admin", user);
      const res = await axiosSecure.get(`/users/premium/${user.email}`);
      // console.log(res.data);
      return res.data.premium;
    },
  });
  return [isPremium, isPremiumLoading];
};

export default usePremium;
