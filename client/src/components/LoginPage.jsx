import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../store/authSlice';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  });
  const [signupFormData, setSignupFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleLoginChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignupChange = (e) => {
    setSignupFormData({
      ...signupFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        const result = await dispatch(registerUser(signupFormData)).unwrap();
        if (result) {
          toast.success('Registration successful!');
          setIsRegistering(false);
        }
      } else {
        const result = await dispatch(loginUser(loginFormData)).unwrap();
        if (result) {
          toast.success('Login successful!');
          navigate('/');
        }
      }
    } catch (error) {
      toast.error(error.message || 'Authentication failed');
    }
  };

  return (


    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
    <div className={`relative w-[950px] max-w-full h-[550px] bg-white m-5 rounded-[30px] shadow-[0_0_30px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-700 ease-in-out ${isRegistering ? 'active' : ''}`}>
      {/* Auth Form Container */}
      <div className={`absolute top-0 ${isRegistering ? 'right-1/2' : 'right-0'} w-1/2 h-full bg-white flex flex-col justify-center items-center text-center p-10 z-10 transition-all duration-700`}>
        <form className="w-full" onSubmit={handleSubmit}>
          <h1 className="text-3xl mb-4 font-semibold">{isRegistering ? 'Registration' : 'Login'}</h1>

          {/* Login Form */}
          {!isRegistering && (
            <>
              <div className="relative my-5">
                <input
                  type="text"
                  name="username"
                  value={loginFormData.username}
                  onChange={handleLoginChange}
                  placeholder="Username"
                  required
                  className="w-full py-3 pr-12 pl-5 bg-gray-200 rounded-md border-none outline-none text-gray-700 font-medium placeholder:text-gray-500"
                />
                <i className='bx bxs-user absolute right-5 top-1/2 transform -translate-y-1/2 text-xl'></i>
              </div>
              <div className="relative my-5">
                <input
                  type="password"
                  name="password"
                  value={loginFormData.password}
                  onChange={handleLoginChange}
                  placeholder="Password"
                  required
                  className="w-full py-3 pr-12 pl-5 bg-gray-200 rounded-md border-none outline-none text-gray-700 font-medium placeholder:text-gray-500"
                />
                <i className='bx bxs-lock-alt absolute right-5 top-1/2 transform -translate-y-1/2 text-xl'></i>
              </div>
              <div className="text-sm text-gray-700 mb-4">
                <a href="#" className="hover:underline">Forgot Password?</a>
              </div>
            </>
          )}

          {/* Registration Form */}
          {isRegistering && (
            <>
              <div className="relative my-5">
                <input
                  type="text"
                  name="username"
                  value={signupFormData.username}
                  onChange={handleSignupChange}
                  placeholder="Username"
                  required
                  className="w-full py-3 pr-12 pl-5 bg-gray-200 rounded-md border-none outline-none text-gray-700 font-medium placeholder:text-gray-500"
                />
                <i className='bx bxs-user absolute right-5 top-1/2 transform -translate-y-1/2 text-xl'></i>
              </div>
              <div className="relative my-5">
                <input
                  type="email"
                  name="email"
                  value={signupFormData.email}
                  onChange={handleSignupChange}
                  placeholder="Email"
                  required
                  className="w-full py-3 pr-12 pl-5 bg-gray-200 rounded-md border-none outline-none text-gray-700 font-medium placeholder:text-gray-500"
                />
                <i className='bx bxs-envelope absolute right-5 top-1/2 transform -translate-y-1/2 text-xl'></i>
              </div>
              <div className="relative my-5">
                <input
                  type="password"
                  name="password"
                  value={signupFormData.password}
                  onChange={handleSignupChange}
                  placeholder="Password"
                  required
                  className="w-full py-3 pr-12 pl-5 bg-gray-200 rounded-md border-none outline-none text-gray-700 font-medium placeholder:text-gray-500"
                />
                <i className='bx bxs-lock-alt absolute right-5 top-1/2 transform -translate-y-1/2 text-xl'></i>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full h-12 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>

          <p className="mt-4 text-sm text-gray-700">
            or {isRegistering ? 'register' : 'login'} with social platforms
          </p>

          <div className="flex justify-center mt-4 space-x-3 text-2xl text-gray-700">
            <a href="#"><i className='bx bxl-google'></i></a>
            <a href="#"><i className='bx bxl-facebook'></i></a>
            <a href="#"><i className='bx bxl-github'></i></a>
            <a href="#"><i className='bx bxl-linkedin'></i></a>
          </div>
        </form>
      </div>

      {/* Overlay Panel */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className={`absolute top-0  w-[300%] h-full bg-blue-500 rounded-[150px] transition-all duration-[1800ms] ease-in-out ${isRegistering ? 'left-1/2 left-[50%]' : 'left-[1] left-[-255%]'}`}></div>

        <div className={`absolute ${isRegistering ? 'left-1/2' : 'left-0'} w-1/2 h-full flex flex-col justify-center items-center text-white p-5 transition-all duration-700`}>
          <h1 className="text-3xl font-bold mb-2">{isRegistering ? 'Welcome Back!' : 'Hello, Welcome!'}</h1>
          <p className="mb-4">{isRegistering ? 'Already have an account?' : "Don't have an account?"}</p>
          <button
            className="w-40 h-12 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-blue-500 transition"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
