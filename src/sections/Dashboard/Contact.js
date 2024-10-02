import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { XCircle } from 'phosphor-react'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { ToggleSidebar } from '../../redux/slices/app'

const Contact = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  return (
    <Box sx={{ width: 320, maxHeight: '100vh' }}>
      <Stack sx={{ height: '100%', width: 326 }}>
        {/* Header */}
        <Box
          sx={{
            bgcolor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
            width: '100%'
          }}
        >
          <Stack
            sx={{ height: '100%', width: '100%', p: 2 }}
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            spacing={3}
          >
            <Typography variant='subtitle2'>Contact Info</Typography>
            <IconButton
              onClick={() => {
                dispatch(ToggleSidebar())
              }}
            >
              <XCircle />
            </IconButton>
          </Stack>
        </Box>
        {/* Body */}
      </Stack>
    </Box>
  )
}

export { Contact }
