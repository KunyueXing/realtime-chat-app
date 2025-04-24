import React from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { FormTextField, FormProvider } from '../../components/hook-form'
import { LoadingButton } from '@mui/lab'
import { useDispatch } from 'react-redux'
import { ForgotPassword } from '../../redux/slices/auth'

const AuthResetPasswordForm = () => {
  const dispatch = useDispatch()
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address').trim()
  })

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' }
  })

  const { handleSubmit } = methods

  const onSubmit = async (data) => {
    try {
      console.log(data)

      // submit data to backend, placehold
      dispatch(ForgotPassword(data))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <FormTextField name={'email'} label='Email address' />

      <LoadingButton
        fullWidth
        color='inherit'
        size='large'
        type='submit'
        variant='contained'
        sx={{
          mt: 3,
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800')
          }
        }}
      >
        Send Request
      </LoadingButton>
    </FormProvider>
  )
}

export default AuthResetPasswordForm
