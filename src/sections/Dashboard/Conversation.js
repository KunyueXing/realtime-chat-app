import React from 'react'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'
import PropTypes from 'prop-types'

const Timeline = ({ ele }) => {
  const theme = useTheme()
  return (
    <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Divider width='46%' />
      <Typography variant='caption' sx={{ color: theme.palette.text }}>
        {ele.text}
      </Typography>
      <Divider width='46%' />
    </Stack>
  )
}

// Add propTypes validation for 'ele' and 'ele.text'
Timeline.propTypes = {
  ele: PropTypes.shape({
    text: PropTypes.string.isRequired // Ensure 'text' is a required string in 'ele'
  }).isRequired // Ensure 'ele' prop is required
}

export { Timeline }
