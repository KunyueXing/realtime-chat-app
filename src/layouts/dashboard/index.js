import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Stack, Divider, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Logo from '../../assets/Images/elephant.ico'
import { Nav_Buttons, Nav_Settings } from '../../data'

const DashboardLayout = () => {
  const theme = useTheme()

  return (
    <>
      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
          height: '100vh',
          width: 100
        }}
      >
        <Stack py={3} sx={{ height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
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
            <Stack sx={{ width: 'auto', alignItems: 'center' }} direction='column' spacing={3}>
              {Nav_Buttons.map((ele) => (
                <IconButton key={ele.index}>{ele.icon}</IconButton>
              ))}
              <Divider sx={{ width: 48 }} />
              {Nav_Settings.map((ele) => (
                <IconButton key={ele.index}>{ele.icon}</IconButton>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Outlet />
    </>
  )
}

export default DashboardLayout
