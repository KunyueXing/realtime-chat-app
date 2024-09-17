import React from 'react'
import { Outlet } from 'react-router-dom'
import { Stack } from '@mui/material'
import SideNav from './SideNav'

const DashboardLayout = () => {
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
