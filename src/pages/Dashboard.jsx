import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/core/auth/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth)
  const { loading: profileLoading } = useSelector((state) => state.profile)

  if (profileLoading || authLoading) {
    return <div className='mt-5'>Loading...</div>
  }

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
      <Sidebar />
      <div className='flex-1 h-[calc(100vh-3.5rem)] overflow-auto px-6 py-10'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
