import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { CaretLeft } from 'phosphor-react'
import React from 'react'

const Profile = () => {
  const theme = useTheme()
  return (
    <>
      <Stack direction={'row'} sx={{ width: '100%' }}>
        {/* Left Pane */}
        <Box
          sx={{
            height: '100vh',
            width: 320,
            overflowY: 'scroll',
            bgcolor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
          }}
        >
          <Stack p={4} spacing={5}>
            {/* Header */}
            <Stack direction='row' alignItems={'center'} spacing={3}>
              <IconButton>
                <CaretLeft size={24} color='#4B4B4B' />
              </IconButton>
              <Typography variant='h5'>Profile</Typography>
            </Stack>
            {/* Profile Edit Form */}
          </Stack>
        </Box>
        {/* Right Pane */}
        <Box
          sx={{
            height: '100%',
            width: 'calc(100vw - 420px)',
            bgcolor: (theme) => (theme.palette.mode === 'light' ? '#FFF' : theme.palette.background.paper)
          }}
        ></Box>
      </Stack>
    </>
  )
}

export default Profile
