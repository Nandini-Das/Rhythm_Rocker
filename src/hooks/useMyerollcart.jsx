import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useMyenrollcart = (email) => {
  const [axiosSecure] = useAxiosSecure();
  
  const { data: enrolledClasses = [], refetch } = useQuery(
    ["paymet", email],
    async () => {
      const response = await axiosSecure.get(`/payment?email=${email}`);
      return response.data;
    }
  );

  return { enrolledClasses, refetch };
};

export default useMyenrollcart;
