import React, { useState } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Alert, IconButton, InputAdornment, Link, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { FormTextField, FormProvider } from '../../components/hook-form'
import { Eye, EyeSlash } from 'phosphor-react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser } from '../../redux/slices/auth'

const AuthLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address').trim(),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'The Password must have at least 6 digits')
      .max(20, 'The password must be <= 20 digits')
      .trim()
  })

  const defaultValues = {
    email: '',
    password: ''
  }

  /*
    A hook from the react-hook-form lib, which simplifies form handling by managing the form state, 
    validation & submission.

    useForm() returns an object that contains several methods and properties to handle form actions.

    The resolver option allows to use an external validation library (e.g. Yup here) to validate the form.
    yupResolver is a function that integrates Yup schema validation with react-hook-form.
  */
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  })

  /*
    reset - Resets the form values to their initial state (defaultValues) or to new values
    setError - Manually sets an error for a specific form field

    handleSubmit - A function that is wrapped around the form submission handler. It takes care of handling 
    the form submission, validating the data, and calling the function only when the form is valid.
    When onSubmit is called, handleSubmit ensures the form data is valid and prevents the default form submission event.

    formState - formState is an object containing information about the form’s current state, and errors 
    specifically holds any validation errors for the form fields.
  */
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
      dispatch(LoginUser(data))
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
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}

        <FormTextField name={'email'} label={'Email address'} />

        <FormTextField
          name={'password'}
          label={'Password'}
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
      <Stack alignItems={'flex-end'} sx={{ my: 2 }}>
        <Link component={RouterLink} to={'/auth/reset-password'} variant='body2' color={'inherit'} underline='always'>
          Forgot password?
        </Link>
      </Stack>
      {/* LoadingButton is a component from MUI lab*/}
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
        Login
      </LoadingButton>
    </FormProvider>
  )
}

export default AuthLoginForm
