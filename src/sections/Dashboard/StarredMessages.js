import React from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ArrowLeft } from 'phosphor-react'
import { useDispatch } from 'react-redux'
import { UpdateSidebarType } from '../../redux/slices/app'
import { sidebarPageMappings } from '../../utils/constants'
import ChatComponent from '../../pages/dashboard/Conversation'

const StarredMessages = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  return (
    <Box sx={{ width: 320, maxHeight: '100vh' }}>
      <Stack sx={{ height: '100%', width: 326 }}>
        <Box
          sx={{
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
            width: '100%',
            bgcolor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background
          }}
        >
          <Stack sx={{ height: '100%', p: 2, alignItems: 'center' }} direction={'row'} spacing={3}>
            <IconButton
              onClick={() => {
                dispatch(UpdateSidebarType(sidebarPageMappings[0]))
              }}
            >
              <ArrowLeft />
            </IconButton>
            <Typography variant='subtitle2'>Starred Messages</Typography>
          </Stack>
        </Box>
        <Stack sx={{ height: '100%', position: 'relative', flexGrow: 1, overflow: 'scroll' }} spacing={3}>
          <ChatComponent />
        </Stack>
      </Stack>
    </Box>
  )
}

export { StarredMessages }
