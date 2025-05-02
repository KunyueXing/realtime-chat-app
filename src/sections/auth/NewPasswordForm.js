import React, { useState } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { FormTextField, FormProvider } from '../../components/hook-form'
import { LoadingButton } from '@mui/lab'
import { Stack, InputAdornment, IconButton, Alert } from '@mui/material'
import { Eye, EyeSlash } from 'phosphor-react'
import { useDispatch } from 'react-redux'
import { NewPassword } from '../../redux/slices/auth'
import { useSearchParams, useNavigate } from 'react-router-dom'

const AuthNewPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(6, 'The Password must have at least 6 digits')
      .max(20, 'The password must be <= 20 digits')
      .trim(),
    passwordConfirm: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  const defaultValues = {
    password: '',
    passwordConfirm: ''
  }

  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
    mode: 'onChange',
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
      dispatch(NewPassword({ ...data, token: searchParams.get('token') }, navigate))
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

        <FormTextField
          name='passwordConfirm'
          label='Confirm New Password'
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
          Update Passsword
        </LoadingButton>
      </Stack>
    </FormProvider>
  )
}

export default AuthNewPasswordForm
