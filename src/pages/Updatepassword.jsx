import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const UpdatePassword = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)

  const [formdata, setformdata] = useState({
    password: '',
    confirmpassword: '',
  })

  const [showpassword, setshowpass] = useState(false)
  const [showconfirmpass, setshowconfirmpass] = useState(false)

  const { password, confirmpassword } = formdata

  const handleOnChange = (e) => {
    setformdata((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmpassword) {
      return alert('Passwords do not match!')
    }

    const token = location.pathname.split('/').at(-1)
    dispatch(resetPassword(password,confirmpassword, token, navigate))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      {loading ? (
        <div className="text-lg font-semibold">Loading...</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">Update Password</h2>

          {/* New Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm">
              New Password
            </label>
            <div className="relative">
              <input
                type={showpassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter new password"
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span
                onClick={() => setshowpass((prev) => !prev)}
                className="absolute right-3 top-2.5 cursor-pointer text-xl text-gray-400 hover:text-white"
              >
                {showpassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col">
            <label htmlFor="confirmpassword" className="mb-1 text-sm">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showconfirmpass ? 'text' : 'password'}
                name="confirmpassword"
                value={confirmpassword}
                onChange={handleOnChange}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span
                onClick={() => setshowconfirmpass((prev) => !prev)}
                className="absolute right-3 top-2.5 cursor-pointer text-xl text-gray-400 hover:text-white"
              >
                {showconfirmpass ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md bg-black border border-white text-white hover:bg-white hover:text-black transition-colors"
          >
            Update Password
          </button>
        </form>
      )}
    </div>
  )
}

export default UpdatePassword
