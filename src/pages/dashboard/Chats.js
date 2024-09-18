import React from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { Circle, Users } from 'phosphor-react'

const Chats = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        width: 320,
        bgcolor: '#F8FAFF',
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
      }}
    >
      <Stack p={3} spacing={2} sx={{ maxHeight: '100vh' }}>
        <Stack sx={{ alignItems: 'center', justifyContent: 'space-between' }} direction='row'>
          <Typography variant='h4'>Chats</Typography>
          <Stack direction='row' sx={{ alignItems: 'center' }} spacing={1}>
            <IconButton sx={{ width: 'auto' }}>
              <Users />
            </IconButton>
            <IconButton sx={{ width: 'auto' }}>
              <Circle />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Chats
