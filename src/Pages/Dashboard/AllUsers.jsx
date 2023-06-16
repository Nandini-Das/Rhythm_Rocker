import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const [disabledButtons, setDisabledButtons] = useState([]);

  const { data: users = [], refetch } = useQuery(['users'], async () => {
    const res = await axiosSecure.get('/users');
    return res.data;
  });

  const handleMakeAdmin = (user) => {
    const role = 'admin';

    // Disable the button
    setDisabledButtons((prevDisabledButtons) => [
      ...prevDisabledButtons,
      user._id,
    ]);

    axiosSecure
      .patch(`/users/admin/${user._id}`, { role })
      .then((res) => {
        if (res.data.success) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name} is now an Admin!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error('Failed to make user an admin:', error);
      });
  };

  const handleMakeInstructor = (user) => {
    const role = 'instructor';

    // Disable the button
    setDisabledButtons((prevDisabledButtons) => [
      ...prevDisabledButtons,
      user._id,
    ]);

    axiosSecure
      .patch(`/users/instructor/${user._id}`, { role })
      .then((res) => {
        if (res.data.success) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name} is now an Instructor!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error('Failed to make user an instructor:', error);
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
        axiosSecure
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire('Deleted!', 'User has been deleted.', 'success');
            }
          })
          .catch((error) => {
            console.error('Failed to delete user:', error);
          });
      }
    });
  };

  return (
    <div className="w-full">
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
                <td>{user.role}</td>
                <td>
                  
                    <>
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        disabled={disabledButtons.includes(user._id)}
                        className="btn btn-ghost bg-orange-600 text-white"
                      >
                        Make Admin
                      </button>
                      <button
                        onClick={() => handleMakeInstructor(user)}
                        disabled={disabledButtons.includes(user._id)}
                        className="btn btn-ghost bg-orange-600 text-white"
                      >
                        Make Instructor
                      </button>
                    </>
                
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost bg-red-600 text-white"
                    
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
