import React from 'react'
import { FormTextField, FormProvider } from '../../components/hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useDispatch } from 'react-redux'
import { VerifyUser } from '../../redux/slices/auth'

export default function VerifyForm() {
  const dispatch = useDispatch()

  const VerifyCodeSchema = Yup.object().shape({
    code: Yup.string()
      .required('Code is required')
      .length(6, 'Code must be 6 digits')
      .matches(/^[0-9]+$/, 'Code must be a number')
  })

  const defaultValues = {
    code: ''
  }

  const methods = useForm({
    resolver: yupResolver(VerifyCodeSchema),
    mode: 'onChange',
    defaultValues
  })

  const { handleSubmit } = methods

  const onSubmit = async (data) => {
    try {
      console.log(data)
      // submit data to backend, placeholder
      dispatch(VerifyUser(data))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <FormTextField name='code' label='Enter OTP' placeholder='Enter the OTP sent to your email' />
        <LoadingButton
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          color='inherit'
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800')
            }
          }}
        >
          Verify
        </LoadingButton>
      </Stack>
    </FormProvider>
  )
}
