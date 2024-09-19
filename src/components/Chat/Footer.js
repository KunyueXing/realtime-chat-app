import React from 'react'
import { Box, Stack, TextField } from '@mui/material'

const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    paddingTop: '12px !important',
    paddingBottom: '12px !important'
  }
}))

const ChatInput = () => {
  return (
    <StyledInput>

    </StyledInput>
  )
}

const Footer = () => {
  return (
    <Box sx={{ position: 'relative', bgcolor: 'transparent !important' }}>
      <Box
        p={2}
        sx={{
          width: '100%',
          height: 100,
          bgcolor: '#F8FAFF',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
        }}
      >
        <Stack direction='row' sx={{ alignItems: 'center' }} spacing={3}>
          <Stack sx={{ width: '100%' }}>
            <Box>{/* emoji */}</Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

export default Footer
