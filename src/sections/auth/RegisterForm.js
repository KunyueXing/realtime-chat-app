import React, { useState } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import FormProvider from '../../components/hook-form/FormProvider'
import { Stack, Alert, InputAdornment, IconButton } from '@mui/material'
import { FormTextField } from '../../components/hook-form'
import { Eye, EyeSlash } from 'phosphor-react'
import { LoadingButton } from '@mui/lab'

const AuthRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address').trim(),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'The Password must have at least 6 digits')
      .max(20, 'The password must be <= 20 digits')
      .trim(),
    username: Yup.string().required('A username is required').trim()
  })

  const defaultValues = {
    email: 'demo@gmail.com',
    password: 'demo1234',
    username: 'Jenny'
  }

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues
  })

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors }
  } = methods

  const onSubmit = async (data) => {
    try {
      console.log(data)

      // submit data to backend, placehold
    } catch (error) {
      console.error(error)
      reset()
      setError('afterSubmit', {
        ...error,
        message: error.message
      })
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} mb={4}>
        {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}

        <FormTextField name='username' label='Username' />
        <FormTextField name='email' label='Email address' />
        <FormTextField
          name={'password'}
          label='Password'
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        color='inherit'
        size='large'
        type='submit'
        variant='contained'
        sx={{
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800')
          }
        }}
      >
        Create Account
      </LoadingButton>
    </FormProvider>
  )
}

export default AuthRegisterForm
