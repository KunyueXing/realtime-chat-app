import { Container, Stack } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import LoginLogo from '../../assets/Images/elephant.ico'

const AuthLayout = () => {
  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth='sm'>
        <Stack spacing={5}>
          <Stack sx={{ width: '100%', alignItems: 'center' }} direction={'column'}>
            <img style={{ height: 240, width: 240 }} src={LoginLogo} alt='LoginLogo' />
          </Stack>
          <Outlet />
        </Stack>
      </Container>
    </>
  )
}

export default AuthLayout
