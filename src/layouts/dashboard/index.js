import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { Stack } from '@mui/material'
import SideNav from './SideNav'
import { useSelector } from 'react-redux'
import useDashboardSocketHandlers from '../../hooks/socket-events/useDashboardSocketHandlers'
import { useSocketHandlers } from '../../hooks/socketEvents/useSocketHandlers'

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth)
  const user_id = useSelector((state) => state.auth.user_id)
  console.log('layout/dashboard user_id:', user_id)

  // Handle socket events of audio/video calls, new messages, start chat, and friend requests
  // useDashboardSocketHandlers({ user_id, isLoggedIn })
  useSocketHandlers({ userId: user_id, isLoggedIn })

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
