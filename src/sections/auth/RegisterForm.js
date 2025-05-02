import React, { useState } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Stack, Alert, InputAdornment, IconButton } from '@mui/material'
import { FormTextField, FormProvider } from '../../components/hook-form'
import { Eye, EyeSlash } from 'phosphor-react'
import { LoadingButton } from '@mui/lab'
import { useDispatch } from 'react-redux'
import { RegisterUser } from '../../redux/slices/auth'
import { useNavigate } from 'react-router-dom'

const AuthRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address').trim(),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'The Password must have at least 6 digits')
      .max(20, 'The password must be <= 20 digits')
      .trim(),
    firstName: Yup.string().required('A first name is required').trim(),
    lastName: Yup.string().required('A last name is required').trim(),
    passwordConfirm: Yup.string()
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .trim()
  })

  const defaultValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    passwordConfirm: ''
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
      dispatch(RegisterUser(data, navigate))
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

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormTextField name='firstName' label='First Name' />
          <FormTextField name='lastName' label='Last Name' />
        </Stack>

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
        <FormTextField
          name={'passwordConfirm'}
          label='Confirm Password'
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
