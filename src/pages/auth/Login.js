import { Stack, Typography, Link } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant='h4'>Login to ChatElephant</Typography>
        <Stack direction={'row'} spacing={0.5}>
          <Typography variant='body2'>New user?</Typography>
          <Link component={RouterLink} variant='subtitle2' to={'/auth/register'}>
            Create an account
          </Link>
        </Stack>
      </Stack>
      {/* login form */}
    </>
  )
}

export default Login
