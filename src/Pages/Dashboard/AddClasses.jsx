import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddClasses = () => {
  const { user } = useAuth();
  const name = user.displayName;
  const email = user.email;
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [axiosSecure] = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
    

      
      const newItem = {
        class_name: data.class_name,
        class_image: data.image,
        available_seats: data.available_seats,
        instructor_name: name,
        email: email,
        price: parseFloat(data.price),
        status: 'pending',
      };

      const result = await axiosSecure.post('/classes', newItem);
      if (result.data.insertedId) {
        reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Class added successfully',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error('Error adding class', error);
   
    }
  };

  return (
    <div className="w-full px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Class Name</span>
          </label>
          <input
            type="text"
            placeholder="Class Name"
            {...register("class_name", { required: true, maxLength: 120 })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.class_name && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Class Image</span>
          </label>
          <input
            type="text"
            placeholder="Class Image URL"
            {...register("class_image", { required: true, maxLength: 1000 })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.class_image && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Your Name</span>
          </label>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            readOnly
            {...register("instructor_name", { required: true, maxLength: 120 })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.your_name && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Your Email</span>
          </label>
          <input
            type="text"
            placeholder="Your Email"
            value={email}
            readOnly
            {...register("email", { required: true, maxLength: 120 })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.your_email && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Available Seats</span>
          </label>
          <input
            type="number"
            {...register("available_seats", { required: true })}
            placeholder="Available Seats"
            className="input input-bordered w-full max-w-xs"
          />
          {errors.available_seats && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Price</span>
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            placeholder="Class's Price"
            className="input input-bordered w-full max-w-xs"
          />
          {errors.price && <span className="text-red-500">This field is required</span>}
        </div>

        <input className="btn btn-sm mt-4" type="submit" value="Add Class" />
      </form>
    </div>
  );
};

export default AddClasses;
