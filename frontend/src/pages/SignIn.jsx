import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "../App";
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

const SignIn = () => {
  const { dispatch } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("userName",JSON.stringify(email));// Store the userName in localStorage
    setUser(true) // Update the context with the userName
    return navigate("/");
  };
  useEffect(() => {
    if (user) {
      dispatch({ type: "LOGIN", payload:email });
    }
  }, [user, email, dispatch]);

  return (
    <div className="flex items-center justify-center rounded-xl bg-gradient-to-b from-[#1dbbc3] to-white my-24 md:my-0 mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full ">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
          <input type="hidden" name="remember" value="newUser" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className='mb-2'>
              <label htmlFor="userName" className="sr-only">
                Email address
              </label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <EnvelopeIcon className="h-5 w-5 text-gray-500 mx-2" />
                <input
                  id="userName"
                  name="UserName"
                  type="text"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <LockClosedIcon className="h-5 w-5 text-gray-500 mx-2" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="show-password"
                name="show-password"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="show-password" className="ml-2 block text-sm text-gray-900">
                Show password
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn--dark mx-auto px-4 py-1 rounded-lg"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
