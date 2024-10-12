import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
      <div>authlayout</div>
      <Outlet />
    </>
  )
}

export default AuthLayout
