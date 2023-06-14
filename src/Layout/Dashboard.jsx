import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FaShoppingCart,
  FaWallet,
  FaCalendarAlt,
  FaHome,
  FaBook,
  FaUsers,
  FaBookOpen,
  FaUserGraduate
} from 'react-icons/fa';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';
import useStudent from '../hooks/useStudent';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const [isStudent] = useStudent();
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex flex-col bg-gray-100 w-64">
        <div className="flex items-center justify-center h-16 bg-gray-200">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <ul className="menu w-50">
          {isInstructor ? (
            <>
              <li>
                <NavLink to="/dashboard/home">
                  <FaHome></FaHome> Instructor Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addClasses">
                  <FaBook></FaBook> Add Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myAddedClasses">
                  <FaBook></FaBook> My Added Classes
                </NavLink>
              </li>
              
            </>
          ) :isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/home">
                  <FaHome></FaHome> Admin Home
                </NavLink>
              </li>
              
              <li>
                <NavLink to="/dashboard/manageClasses">
                  <FaWallet></FaWallet> Manage Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allusers">
                  <FaUsers></FaUsers> All Users
                </NavLink>
              </li>
            </>
          ) 
          :  isStudent ?   (
            <>
              <li>
                <NavLink to="/dashboard/home">
                  <FaHome></FaHome> Student Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myEnrolledClasses">
                  <FaCalendarAlt></FaCalendarAlt> My Enrolled Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myPayment">
                  <FaWallet></FaWallet> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mycart">
                  <FaShoppingCart></FaShoppingCart> My Selected Classes
                  
                </NavLink>
              </li>
            </>
          ) : <>
          <li>
          <NavLink to="/dashboard/mycart">
                  <FaShoppingCart></FaShoppingCart> My Selected Classes
                  
                </NavLink>
          </li>
          </>}

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome> Home
            </NavLink>
          </li>
          <li>
          <NavLink to="/classes"><FaBookOpen></FaBookOpen>Our Classes</NavLink>
          </li>
          <li>
            <NavLink to="/Instructors"><FaUserGraduate></FaUserGraduate>Our Instructors</NavLink>
          </li>
        </ul>
      </div>

      <div className="flex flex-col flex-1 p-4 ml-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
