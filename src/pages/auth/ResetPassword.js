import { Link, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const ResetPassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant='h3' paragraph>
          Forgot your password?
        </Typography>

        <Typography sx={{ color: 'text.secondary', mb: 5 }}>
          Please enter the registered email below and check the link to reset the password in your email account.
        </Typography>
      </Stack>
      {/* Reset password form */}

      <Link
        component={RouterLink}
        to={'/auth/login'}
        color={'inherit'}
        variant='subtitle2'
        sx={{
          mt: 3,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex'
        }}
      >
        <CaretLeft size={24} />
        Return to sign in
      </Link>
    </>
  )
}

export default ResetPassword
