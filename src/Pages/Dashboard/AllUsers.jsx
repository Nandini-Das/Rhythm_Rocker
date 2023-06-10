import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
  });

  const handleMakeAdmin = (user) => {
    const role = user.role === "admin" 
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: "PATCH",
      body: JSON.stringify({ role }), // Include the role in the request body
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          toast.success(`${user.name} is now a admin`)
        }
      });
  };
  
  const handleMakeInstructor = (user) => {
    const role = user.role === "instructor" 
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: "PATCH",
      body: JSON.stringify({ role }), // Include the role in the request body
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          toast.success(`${user.name} is now a ${role.charAt(0).toUpperCase() + role.slice(1)}!`);
        }
      });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: 'Are you sure to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${user._id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire('Deleted!', 'User has been deleted.', 'success');
            }
          });
      }
    });
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <h3 className="text-3xl font-semibold my-4">Total Users: {users.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === 'admin' ? (
                    'admin'
                  ) : (
                    <>
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-ghost bg-orange-600  text-white"
                      >
                        make admin
                      </button>
                      <button
                        onClick={() => handleMakeInstructor(user)}
                        className="btn btn-ghost bg-orange-600  text-white"
                      >
                        make instructor
                      </button>
                    </>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost bg-red-600  text-white"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
