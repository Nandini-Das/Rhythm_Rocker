import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const MyAddedClasses = () => {
  const [classes, setClasses] = useState([]);
  const {user} = useAuth();
  useEffect(() => {
    const fetchClasses = async () => {
        try {
          const response = await fetch(`http://localhost:5000/classes`);
          const data = await response.json();
          const filteredClasses = data.filter((classItem) => classItem.email === user.email);
          setClasses(filteredClasses);
        } catch (error) {
          console.error("Error fetching classes:", error);
        }
      };

    fetchClasses();
  }, []);

  

  return (
    <div className="w-full">
      <div className="">
        {/* Your other content here */}
      </div>
      <div className="overflow-x-auto w-full mt-6 pt-6">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Total Enrolled Students</th>
              <th>Status</th>
              <th>Price</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.enrolled_students}</td>
                <td>{item.status}</td>
                <td className="">${item.price}</td>
                <td className="">{"FeedBAck"}</td>
                <td>
                 <Link to={`/dashboard/updateClass/${item._id}`}> <button
                    
                    className="btn btn-info bg-red-600 text-white"
                  >
                    Update
                  </button></Link>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAddedClasses;