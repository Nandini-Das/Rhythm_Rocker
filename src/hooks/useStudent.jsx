import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useStudent = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: isStudent, isLoading: isStudentLoading } = useQuery(
    ['isStudent', user?.email], // queryKey
    async () => {
      const res = await axiosSecure.get(`/users/student/${user?.email}`);
      console.log('is student response', res);
      return res.data.student;
    }
  );

  return [isStudent, isStudentLoading];
};

export default useStudent;
