import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import useCart from '../../hooks/useCart';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAdmin from '../../hooks/useAdmin';
import useStudent from '../../hooks/useStudent';
import useInstructor from '../../hooks/useInstructor';

const Courses = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isStudent] = useStudent();
  const [isInstructor] = useInstructor();
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/classes')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(error => console.log(error));
  }, []);

  const handleSelectClass = (courseItem) => {
    if (user && user.email) {
      const cartItem = {
        menuItemId: courseItem._id,
        name: courseItem.course_name,
        image: courseItem.class_image,
        price: courseItem.price,
        email: user.email,
      };
      fetch('http://localhost:5000/carts', {
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
    } else {
      toast.warning("Please login to enroll in the class.");
      navigate('/login', { state: { from: location } });
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center py-2 decoration-rose-900 font-bold text-xl">
          OUR CLASSES {courses.length}
        </h1>
      </div>
      <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.map(courseItem => (
          <li
            key={courseItem._id}
            className={`flex flex-col items-center justify-center p-4 border rounded-lg ${
              (isAdmin || isInstructor) && courseItem.available_seats === 0 ? 'bg-red-200' : isStudent && courseItem.available_seats === 0 ? 'bg-white' : ''
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
            <Link>
              <button
                className={`btn btn-primary mt-4 ${
                  isStudent && courseItem.available_seats === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isStudent && courseItem.available_seats === 0}
                onClick={() => handleSelectClass(courseItem)}
              >
                ENROLL
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
