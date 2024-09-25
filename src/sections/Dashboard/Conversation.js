import React from 'react'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'

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

export { Timeline }
