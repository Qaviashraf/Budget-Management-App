import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";

export const ForgetPassword = () => {

  // Initialize navigation
  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

  // Handle forgot password
  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3001/forgot-password', { email });
      setSuccessMessage(response.data.message);
      setShowOtpForm(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  // Handle OTP check
  const handleCheckOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3001/check-otp', { email, otp });
      setSuccessMessage(response.data.message);
      setShowOtpForm(false);
      setShowResetForm(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  // Handle password reset
  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3001/reset-password', { email, newPassword });
      setSuccessMessage(response.data.message);
      setShowResetForm(false);
      setTimeout(() => {
        toast.success('Password Reset Successfully');
        navigate('/signin');
      }, 1000);
    } catch (error) {
      setError(error.response.data.error);
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
          <h2 className="mt-6 text-center text-2xl text-gray-900">
            Reset Password
          </h2>
        </div>
        <div className="mb-4">
          <span className='text-lg'>Email</span>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 border rounded focus:outline-none focus:border-blue-500 transition-all duration-200"
            />
            <button
              onClick={handleForgotPassword}
              className="w-32 ml-2 bg-blue-500 text-white text-sm px-1 rounded hover:bg-blue-600 transition-all duration-200"
            >
              Send OTP
            </button>
          </div>
        </div>

        {showOtpForm && (
          <div className="mb-4">
            <span className='text-lg'>OTP</span>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter your OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 border rounded focus:outline-none focus:border-blue-500 transition-all duration-200"
              />
              <button
                onClick={handleCheckOtp}
                className="w-32 ml-2 bg-blue-500 text-sm text-white px-1 rounded hover:bg-blue-600 transition-all duration-200"
              >
                Check OTP
              </button>
            </div>
          </div>
        )}

        {showResetForm && (
          <div className="mb-4">
            <span className='text-lg'>New Password</span>
            <div className="flex">
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 border rounded focus:outline-none focus:border-blue-500 transition-all duration-200"
              />
              <button
                onClick={handleResetPassword}
                className="w-32 ml-2 bg-blue-500 text-white text-sm px-1 rounded hover:bg-blue-600 transition-all duration-200"
              >
                Reset Password
              </button>
            </div>
          </div>
        )}

        {successMessage && <p className="text-green-500 text-lg">{successMessage}</p>}
        {error && <p className="text-red-700 text-lg">{error}</p>}
      </div>
    </div>
  );
};
