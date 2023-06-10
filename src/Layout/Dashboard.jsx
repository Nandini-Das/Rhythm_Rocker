import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FaShoppingCart,
  FaWallet,
  FaCalendarAlt,
  FaHome,
  FaBook,
  FaUsers,
} from 'react-icons/fa';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    const [isAdmin] = useAdmin();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex flex-col bg-gray-100 w-64">
        <div className="flex items-center justify-center h-16 bg-gray-200">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <ul className="menu w-50">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/home">
                  <FaHome></FaHome> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItem">
                  <FaBook></FaBook> Add Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/history">
                  <FaWallet></FaWallet> Manage Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allusers">
                  <FaUsers></FaUsers> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/home">
                  <FaHome></FaHome> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservations">
                  <FaCalendarAlt></FaCalendarAlt> Reservations
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/history">
                  <FaWallet></FaWallet> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mycart">
                  <FaShoppingCart></FaShoppingCart> My Cart
                  
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">Our Menu</NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">Order Food</NavLink>
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
