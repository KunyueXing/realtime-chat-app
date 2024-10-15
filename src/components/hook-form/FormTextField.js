import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

FormTextField.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.node.isRequired
}

export default function FormTextField({ name, helperText, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  )
}
