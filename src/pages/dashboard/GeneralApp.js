import React from 'react'
import ChatsList from './ChatsList'
import { Box, Stack } from '@mui/material'
import ChatComponent from './Conversation'
import { useTheme } from '@mui/material/styles'
import { Contact } from '../../sections/Dashboard/Contact'

const GeneralApp = () => {
  // console.log('Hello')
  console.log('Rendering GeneralApp component')
  const theme = useTheme()

  return (
    <>
      {/* <h1>GeneralApp is Loading</h1> */}
      <Stack direction='row' sx={{ width: '100%', height: '100vh' }}>
        <ChatsList />
        <Box
          sx={{
            height: '100%',
            width: 'calc(100vw - 740px)',
            bgcolor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background
          }}
        >
          <ChatComponent />
        </Box>
        <Contact />
      </Stack>
    </>
  )
}

export default GeneralApp
