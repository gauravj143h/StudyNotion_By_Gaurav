import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      {loading ? (
        <div className="text-lg font-medium">Loading...</div>
      ) : (
        <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">
            {!emailSent ? "Reset your Password" : "Check Your Email"}
          </h1>

          <p className="text-sm mb-6 text-gray-300 text-center">
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you don’t have access to your email, we can try account recovery."
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handlesubmit} className="space-y-4">
            {!emailSent && (
              <div className="flex flex-col">
                <label className="text-sm mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="px-4 py-2 rounded-md bg-black text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md bg-black text-white border border-white hover:bg-white hover:text-black transition-colors"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-blue-400 hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
