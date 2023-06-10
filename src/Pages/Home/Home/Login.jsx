import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import Swal from 'sweetalert2';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { app } from '../../../firebase/Firebase_console';
import { AuthContext } from '../../../provider/AuthProvider';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (data) => {
    const { email, password } = data;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        Swal.fire({
          title: 'User Login Successful.',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);

        Swal.fire({
          title: 'Login Error',
          text: 'Invalid email or password.',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        });
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email }
      fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(saveUser)
      })
          .then(res => res.json())
          .then(data => {
              if (data.insertedId) {
                  navigate(from, { replace: true });
              }
          })



  })
}
  

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
              a id nisi.
            </p>
          </div>
          <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', { required: true })}
                  placeholder="Email"
                  className={`input input-bordered ${
                    errors.email ? 'input-error' : ''
                  }`}
                />
                {errors.email && (
                  <span className="text-xs text-error">Email is required.</span>
                )}
              </div>
              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    {...register('password', { required: true })}
                    placeholder="Password"
                    className={`input input-bordered ${
                      errors.password ? 'input-error' : ''
                    }`}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <span className="text-xs text-error">
                    Password is required.
                  </span>
                )}
              </div>

              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Login" />
              </div>
              <div className="form-control">
                <button
                  type="button"
                  className="btn btn-outline btn-error  font-bold py-2 px-4 rounded mt-4 flex items-center justify-center"
                  onClick={handleGoogleLogin}
                >
                  <FaGoogle className="mr-2" />
                  Sign In with Google
                </button>
              </div>
            </form>
            <p>
              ---------<small>
                New Here? <Link to="/register">Create an account</Link>
              </small>
              ----------
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
