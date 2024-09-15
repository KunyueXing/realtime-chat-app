import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Stack, Divider, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Logo from '../../assets/Images/elephant.ico'

const DashboardLayout = () => {
  const theme = useTheme()

  return (
    <>
      <Box
        p={2}
        sx={{
          bgcolor: theme.palette.background.paper,
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
          height: '100vh',
          width: 100
        }}
      >
        <Stack direction='column' sx={{ width: '100%', alignItems: 'center' }} spacing={4}>
          <Box
            sx={{
              bgcolor: theme.palette.primary.main,
              height: 64,
              width: 64,
              borderRadius: 1.5
            }}
            p={1}
          >
            <img
              src={Logo}
              alt={'Chat app logo'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain' // Ensures the image fits within the box while maintaining its aspect ratio
              }}
            />
          </Box>
        </Stack>
      </Box>
      <Outlet />
    </>
  )
}

export default DashboardLayout
