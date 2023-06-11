import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useClasses = () => {
  const { user, loading } = useAuth();
  const email = user.email;
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: oneClass = [] } = useQuery({
    queryKey: ['classes', email ], // Use email as part of the query key
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/classes?email=${email}`); // Filter by email
      return res.data;
    },
  });

  return [oneClass, refetch];
};

export default useClasses;
