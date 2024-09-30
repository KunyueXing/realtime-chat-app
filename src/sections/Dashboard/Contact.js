import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { XCircle } from 'phosphor-react'

const Contact = () => {
  return (
    <Box sx={{ width: 320, maxHeight: '100vh' }}>
      <Stack sx={{ height: '100%' }}>
        <Box sx={{ boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)', width: '100%', bgcolor: '#F8FAFF' }}>
          <Stack
            sx={{ height: '100%', alignItems: 'center', justifyContent: 'space-between' }}
            p={2}
            direction={'row'}
            spacing={3}
          >
            <Typography variant='subtitle2'>Contact Info</Typography>
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
