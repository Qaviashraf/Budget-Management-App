import React, { useContext, useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../App";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

const SignIn = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(false);

  // Handle sign-in with email and password
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });

      if (response.data.error) {
        setErrorMessage(response.data.error);
      } else {
        const name = response.data.name;
        localStorage.setItem('userName', JSON.stringify(name));
        setUser(true);
        toast.success(`Welcome back, ${name}`);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Error during login. Please try again.');
    }
  };

  // Handle Google login
  const handleGoogleLogin = async (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);

    try {
      const checkEmailResponse = await axios.post(
        "http://localhost:3001/check-email",
        { email: credentialResponseDecoded.email }
      );

      if (checkEmailResponse.data.exists) {
        alert("Login successful");
        const userId = checkEmailResponse.data.userId;
        localStorage.setItem("id", userId);
        navigate("/dashboard");
      } else {
        const newUser = {
          name: credentialResponseDecoded.name,
          email: credentialResponseDecoded.email,
          password: "LoginWithGoogle",
        };
        const createUserResponse = await axios.post(
          "http://localhost:3001/register",
          newUser
        );

        if (createUserResponse.data.error) {
          setErrorMessage(createUserResponse.data.error);
        } else {
          alert("Login successful");
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error during email check:", error);
      setErrorMessage("Error during email check. Please try again.");
    }
  };

  // Dispatch login action when user state changes
  useEffect(() => {
    if (user) {
      dispatch({ type: "LOGIN", payload: email });
    }
  }, [user, email, dispatch]);

  return (
    <GoogleOAuthProvider clientId="your-client-id">
      <div className="flex items-center justify-center rounded-xl bg-gradient-to-b from-[#1dbbc3] to-white my-24 md:my-0 mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
            <input type="hidden" name="remember" value="newUser" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-2">
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
              {error && (
                <div className="text-red-700 text-sm block ml-12">{error}</div>
              )}
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
                <label
                  htmlFor="show-password"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Show password
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgetpassword"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn btn--dark mx-auto px-4 py-1 rounded-lg"
              >
                Sign in
              </button>
              <div className="flex items-center mt-2 mb-2">
                <hr className="flex-grow w-24 border-t border-gray-400"></hr>
                <span className="mx-2 text-gray-800 text-lg font-bold">OR</span>
                <hr className="flex-grow w-24 border-t border-gray-400"></hr>
              </div>
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log('Google Login Failed');
                }}
              />
              <Link
                to="/signup"
                className="text-[#1dbbc3] text-lg hover:text-indigo-500"
              >
                Don`t have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignIn;
