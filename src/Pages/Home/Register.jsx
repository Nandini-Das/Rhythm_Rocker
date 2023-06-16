import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { AuthContext } from "../../provider/AuthProvider";

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, watch } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                .then(() => {
                    const saveUser = { name: data.name, email: data.email }
                    fetch('https://assignment-12-server-side-nandini-das.vercel.app/users', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(saveUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'User created successfully.',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/');
                            }
                        })



                })
                .catch(error => console.log(error))
        })
};


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content">
                <div className="container mx-auto p-3">
                    <h1 className="text-5xl font-bold mt-5 pt-5 text-center">Register now!</h1>
                    <p className= " bg-transparent py-6 text-2xl text-violet-700 italic">“Music gives a soul to the universe, wings to the mind, flight to the imagination, and life to everything.” – Plato  </p>
                  
                    <div className="card shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Name</span>
                                            </label>
                                            <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                            {errors.name && <span className="text-red-600">Name is required</span>}
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input type="email" {...register("email", { required: true })} name="email" placeholder="Email" className="input input-bordered" />
                                            {errors.email && <span className="text-red-600">Email is required</span>}
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Password</span>
                                            </label>
                                            <input type="password"  {...register("password", {
                                                required: true,
                                                minLength: 6,
                                                maxLength: 20,
                                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                            })} placeholder="Password" className="input input-bordered" />
                                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one uppercase letter, one lowercase letter, one number, and one special character.</p>}
                                           
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Confirm Password</span>
                                            </label>
                                            <input type="password" {...register("confirmPassword", {
                                                required: true,
                                                validate: value => value === watch('password') || 'Passwords do not match'
                                            })} name="confirmPassword" placeholder="Confirm Password" className="input input-bordered" />
                                            {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword.message}</span>}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Photo URL</span>
                                            </label>
                                            <input type="text" {...register("photoURL")} name="photoURL" placeholder="Photo URL" className="input input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Gender</span>
                                            </label>
                                            <select {...register("gender")} name="gender" className="input input-bordered">
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Phone Number</span>
                                            </label>
                                            <input type="tel" {...register("phoneNumber")} name="phoneNumber" placeholder="Phone Number" className="input input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Address</span>
                                            </label>
                                            <textarea {...register("address")} name="address" placeholder="Address" className="textarea textarea-bordered"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value={isSubmitting ? 'Signing Up...' : ' Register'} disabled={isSubmitting} />
                                </div>
                            </form>
                            <p className="mt-4 text-center"><small>Already have an account? <Link className='underline underline-offset-2 text-primary' to="/login">Login</Link></small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;