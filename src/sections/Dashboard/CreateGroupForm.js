import React from 'react'
import { FormTextField } from '../../components/hook-form'
import FormProvider from '../../components/hook-form/FormProvider'
import FormAutoComplete from '../../components/hook-form/FormAutoComplete'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Button, Stack } from '@mui/material'
import { GROUPS_TAGS_OPTION } from '../../data'
import PropTypes from 'prop-types'

CreateGroupForm.propTypes = {
  handleClose: PropTypes.func
}

export default function CreateGroupForm({ handleClose }) {
  const NewGroupSchema = Yup.object().shape({
    groupName: Yup.string().required('Group name is required').trim(),
    members: Yup.array().min(2, 'Must choose at least 2 members.')
  })

  const defaultValues = {
    groupName: '',
    tags: []
  }

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues
  })

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid }
  } = methods

  const onSubmit = async (data) => {
    try {
      console.log(data)

      // submit data to backend, placehold
    } catch (error) {
      console.error(error)
      reset()
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <FormTextField name={'groupName'} label='Group name' />
        <FormAutoComplete
          name={'members'}
          label={'Members'}
          multiple
          freeSolo
          options={GROUPS_TAGS_OPTION.map((option) => option)}
          ChipProps={{ size: 'medium' }}
        />
        <Stack spacing={2} direction={'row'} alignItems={'center'} justifyContent={'end'}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained'>
            Create
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  )
}
