import React from 'react'
import Chats from './Chats'
import { Box, Stack } from '@mui/material'
import ChatComponent from './Conversation'
import { useTheme } from '@mui/material/styles'

const GeneralApp = () => {
  // console.log('Hello')
  const theme = useTheme()

  return (
    <>
      {/* <h1>GeneralApp is Loading</h1> */}
      <Stack direction='row' sx={{ width: '100%', height: '100vh' }}>
        <Chats />
        <Box
          sx={{
            height: '100%',
            width: 'calc(100vw - 420px)',
            bgcolor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background
          }}
        >
          <ChatComponent />
        </Box>
      </Stack>
    </>
  )
}

export default GeneralApp
