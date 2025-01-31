import React from 'react'
import { FormTextField, FormProvider } from '../../components/hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { faker } from '@faker-js/faker'

const ProfileForm = () => {
  const ProfileSchema = Yup.object.shape({
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
    formState: { isSubmitting, isSubmitSuccessful }
  } = methods

  const values = watch()

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
}

export default ProfileForm
