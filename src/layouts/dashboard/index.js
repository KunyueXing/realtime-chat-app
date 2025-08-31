import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { Stack } from '@mui/material'
import SideNav from './SideNav'
import { useSelector } from 'react-redux'

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth)

  if (!isLoggedIn) {
    return <Navigate to={'/auth/login'} />
  }

  return (
    <>
      <Stack direction='row'>
        <SideNav />
        <Outlet />
      </Stack>
    </>
  )
}

export default DashboardLayout
