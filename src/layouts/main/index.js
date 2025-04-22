import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const MainLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth)

  if (!isLoggedIn) {
    return <Navigate to={'/auth/login'} />
  }

  return (
    <>
      <div>Main Layout</div>

      <Outlet />
    </>
  )
}

export default MainLayout
