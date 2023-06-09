import { NavLink, Outlet } from 'react-router-dom';
import { FaShoppingCart, FaWallet, FaHome } from 'react-icons/fa';

const Dashboard = () => {
    return (
        <div className="flex h-screen">
        {/* Sidebar */}
        <div className="flex flex-col bg-gray-100 w-64">
          <div className="flex items-center justify-center h-16 bg-gray-200">
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <ul className="flex flex-col mt-4">
            <li>
              <NavLink
                to="/dashboard"
                className="flex items-center px-4 py-2 text-gray-700"
                activeClassName="bg-gray-200 font-bold"
                exact
              >
                <FaHome className="mr-2" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/myCart"
                className="flex items-center px-4 py-2 text-gray-700"
                activeClassName="bg-gray-200 font-bold"
              >
                <FaShoppingCart className="mr-2" />
                My Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/paymenthistory"
                className="flex items-center px-4 py-2 text-gray-700"
                activeClassName="bg-gray-200 font-bold"
              >
                <FaWallet className="mr-2" />
                Payment History
              </NavLink>
            </li>
          </ul>
        </div>
  
       
        <div className="flex flex-col flex-1 p-4">
          <Outlet />
        </div>
      </div>
    );
};

export default Dashboard;