import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const Courses = ({ courseItem }) => {
    const { user } = useContext(AuthContext);
    const [, refetch] = useCart();
    const { name, image, price, _id, availableSeats, instructor } =  courseItem;
    const navigate = useNavigate();
    const location = useLocation();

    console.log(courseItem);

    const handleSelectClass = (className, availableSeats) => {
        if (user && user.email) {
            const cartItem = {
                menuItemId: _id,
                name,
                image,
                price,
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
                        toast.success(`Selected class: ${className}`);
                    }
                });
        } else {
            Swal.fire({
                title: 'LOGIN NOW?',
                text: "Without Login, you can't enroll!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, LOGIN!',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
            return;
        }

        if (availableSeats === 0) {
            toast.error('This class is currently full. Please select another class.');
            return;
        }
    };

    return (
        <div className="container mx-auto my-2">
            
            <ToastContainer /> {/* Add the ToastContainer component */}
            
                <li className={`flex flex-col items-center justify-center p-4 border rounded-lg ${availableSeats === 0 ? 'bg-red-200' : ''}`}>
                    <img src={image} alt={name} className="w-48 h-48 object-cover rounded-lg mb-4" />
                    <h2 className="text-xl font-bold mb-2">{name}</h2>
                    <p className="text-gray-500">Instructor: {instructor}</p>
                    <p className="text-gray-500">Available Seats: {availableSeats}</p>
                    <p className="text-gray-500">Price: {price}</p>
                    <Link>
                        <button
                            className="btn btn-primary mt-4"
                            disabled={ courseItem.availableSeats === 0}
                            onClick={() => handleSelectClass(name, availableSeats)}
                        >
                            Select Class
                        </button>
                    </Link>
                </li>
           
        </div>
    );
};

export default Courses;

