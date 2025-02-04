import React, { useCallback } from 'react'
import { FormTextField, FormProvider } from '../../../components/hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { faker } from '@faker-js/faker'
import { Alert, Stack } from '@mui/material'

const ProfileForm = () => {
  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required('A name is required').trim(),
    about: Yup.string().required('About is required').trim(),
    avatar: Yup.string().required('Avatar is required').trim().nullable(true)
  })

  const defaultValues = {
    name: 'John',
    about: 'Love sports',
    avatar: faker.image.avatar()
  }

  const methods = useForm({
    resolver: yupResolver(ProfileForm),
    defaultValues
  })

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = methods

  const values = watch()

  const handleImageDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]

      const newFile = Object.assign(file, { preview: URL.createObjectURL(file) })

      if (file) {
        // Dynamically set the value of the registered field - avatar, and validate the form state.
        setValue('avatar', newFile, { shouldValidate: true })
      }
    },
    [setValue]
  )

  const onSubmit = async (data) => {
    try {
      // submit data to backend
      console.log('Data', data)
    } catch (error) {
      console.log(error)
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

        <FormTextField name='name' label='Name' helperText='This name is visible to all your contacts' />
        <FormTextField multiline rows={4} maxRows={6} name='about' label='About' />
      </Stack>
    </FormProvider>
  )
}

export default ProfileForm
