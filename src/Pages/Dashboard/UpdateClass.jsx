import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateClass = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const result = await axiosSecure.get(`/classes/${id}`);
        const { data } = result;
        console.log(data)
        setValue('class_name', data.class_name);
        setValue('class_image', data.class_image);
        setValue('available_seats', data.available_seats);
        setValue('price', data.price);
      } catch (error) {
        console.error('Error fetching class data', error);
      }
    };

    fetchClassData();
  }, [axiosSecure, id, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        class_name: data.class_name,
        class_image: data.class_image,
        available_seats: data.available_seats,
        price: parseFloat(data.price),
      };

      const result = await axiosSecure.patch(`/classes/${id}`, updatedData);
      if (result.data.modifiedCount > 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Class updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error('Error updating class', error);
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
            value={user.displayName}
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
            value={user.email}
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

        <input className="btn btn-sm mt-4" type="submit" value="Update Class" />
      </form>
    </div>
  );
};

export default UpdateClass;
