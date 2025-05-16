import React, { memo } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import NoChatLogo from '../../assets/Images/flamingo.png'

function NoChat({ ...other }) {
  const theme = useTheme()
  const PRIMARY_MAIN = theme.palette.primary.main

  return (
    <Stack
      spacing={2}
      sx={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default
      }}
      {...other}
    >
      <Box component='img' src={NoChatLogo} alt='No chat' sx={{ width: 360, height: 360, objectFit: 'contain' }} />
      <Typography variant='subtitle2'>Select a conversation or start a new one</Typography>
    </Stack>
  )
}

export default memo(NoChat)
