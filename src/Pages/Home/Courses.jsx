import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useCart from "../../hooks/useCart";
import { useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";
import useStudent from "../../hooks/useStudent";

const Courses = () => {
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [courses, setCourses] = useState([]);
 
  useEffect(() => {
    fetch('https://assignment-12-server-side-nandini-das.vercel.app/classes')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(error => console.log(error));
  }, []);

  const handleSelectClass = (courseItem) => {
    const cartItem = {
      menuItemId: courseItem._id,
      name: courseItem.course_name,
      image: courseItem.class_image,
      price: courseItem.price,
      email: user ? user.email : '',
    };
    fetch('https://assignment-12-server-side-nandini-das.vercel.app/carts', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(cartItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          refetch();
          toast('Class has been added to the cart');
        }
      });

    if (!user) {
      toast.warning("Please login to enroll in the class.");
      navigate('/login', { state: { from: location } });
    }
  };

  const approvedCourses = courses.filter(courseItem => courseItem.status === 'approved');

  return (
    <div>
    <div>
      <h1 className="text-center py-2 decoration-rose-900 font-bold text-xl">
        OUR CLASSES: {approvedCourses.length}
      </h1>
    </div>
    <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {approvedCourses.map(courseItem => (
        <li
          key={courseItem._id}
          className={`flex flex-col items-center justify-center p-4 border rounded-lg ${
            courseItem.available_seats == 0  ? 'bg-red-200' : ''
          }`}
        >
            <img
              src={courseItem.class_image}
              alt={courseItem.course_name}
              className="w-48 h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{courseItem.course_name}</h2>
            <p className="text-gray-500">Instructor: {courseItem.instructor_name}</p>
            <p className="text-gray-500">Available Seats: {courseItem.available_seats}</p>
            <p className="text-gray-500">Price: {courseItem.price}</p>
            <button
              className="btn btn-primary mt-4"
              disabled={courseItem.available_seats == 0}
              onClick={() => handleSelectClass(courseItem)}
            >
              ENROLL
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
