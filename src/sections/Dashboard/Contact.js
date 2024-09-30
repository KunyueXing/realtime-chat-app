import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { XCircle } from 'phosphor-react'

const Contact = () => {
  return (
    <Box sx={{ width: 320, maxHeight: '100vh' }}>
      <Stack sx={{ height: '100%', width: 326 }}>
        <Box sx={{ bgcolor: '#F8FAFF', boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)', width: '100%' }}>
          <Stack
            sx={{ height: '100%', width: '100%', p: 2 }}
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            spacing={3}
          >
            <Typography>Contact Info</Typography>
            <IconButton>
              <XCircle />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export { Contact }
