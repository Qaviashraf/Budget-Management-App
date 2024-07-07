import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  // State variables for form inputs and error message
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      // Create new user object
      const newUser = { name, email, password };
      
      // Make API call to create the user
      await axios.post('http://localhost:3001/register', newUser);
      e.target.reset();
      
      alert('Sign up successful!');
      navigate('/signin');
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Error creating user. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center rounded-xl bg-gradient-to-b from-[#1dbbc3] to-white my-24 md:my-0 mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl text-gray-900">
            Sign Up
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-2 w-72">
          <div className="my-2">
            <span className="text-sm">Username</span>
            <input
              type="text"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div className="my-2">
            <span className="text-sm">Email</span>
            <input
              type="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div className="my-2">
            <span className="text-sm">Password</span>
            <input
              type="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          {error && (
            <div className="text-red-700 block mb-4">{error}</div>
          )}
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="w-fit px-10 bg-blue-500 text-white py-2 rounded-2xl hover:bg-blue-600 transition-all duration-200 mb-2"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
