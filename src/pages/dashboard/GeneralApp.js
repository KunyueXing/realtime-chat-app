import React from 'react'
import Chats from './Chats'
import { Box, Stack } from '@mui/material'
import ChatComponent from './Conversation'

const GeneralApp = () => {
  console.log('Hello')

  return (
    <>
      {/* <h1>GeneralApp is Loading</h1> */}
      <Stack direction='row' sx={{ width: '100%', height: '100vh' }}>
        <Chats />
        <Box sx={{ height: '100%', width: 'calc(100vw - 420px)', bgcolor: '#fff' }}>
          <ChatComponent />
        </Box>
      </Stack>
    </>
  )
}

export default GeneralApp
