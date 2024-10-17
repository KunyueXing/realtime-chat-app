import React, { useState } from 'react'
import FormProvider from '../../components/hook-form/FormProvider'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Alert, IconButton, InputAdornment, Stack } from '@mui/material'
import { FormTextField } from '../../components/hook-form'
import { Eye, EyeSlash } from 'phosphor-react'

const AuthLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address').trim(),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'The Password must have at least 6 digits')
      .max(20, 'The password must be <= 20 digits')
      .trim()
  })

  const defaultLoginValues = {
    email: 'demo@gmail.com',
    password: 'demo1234'
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
    defaultLoginValues
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
    formState: { errors, isSubmitting, isSubmitSuccessful }
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
    </FormProvider>
  )
}

export default AuthLoginForm
