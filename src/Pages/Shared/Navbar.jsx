import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import { FaShoppingCart } from 'react-icons/fa';
import 'daisyui/dist/full.css';
import useCart from '../../hooks/useCart';
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
    };
    const navOptions = <>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/instructors">Instructors</Link></li>
    <li><Link to="/classes">Classes</Link></li>
    <li>
            <Link to="/dashboard/myCart">
                <button className="relative my-auto mt-2">
                    <FaShoppingCart></FaShoppingCart>
                    <div className="badge badge-secondary absolute -top-4 -right-8">+{cart?.length || 0}</div>
                </button>
            </Link>
        </li>
    

</>
    return (
        <>
            <div className="navbar  z-10 bg-opacity max-w-screen-xl bg-slate-400 text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-neutral rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Rhythm Rocker</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                {
            user ? <>
                <img
                className="w-12 float-end h-12 rounded-full object-cover mr-4"
                src={user.photoURL}
                alt="Profile"
                title={user.displayName}>
                </img>
                <><Link to="/dashboard">Dashboard</Link></>

                <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
            </> : <>
                <><Link className='btn' to="/login">Login</Link></>
            </>
        }
                </div>
            </div>
        </>
    );
};

export default Navbar;