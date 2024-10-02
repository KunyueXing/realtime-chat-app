import React from 'react'
import ChatsList from './ChatsList'
import { Box, Stack } from '@mui/material'
import ChatComponent from './Conversation'
import { useTheme } from '@mui/material/styles'
import { Contact } from '../../sections/Dashboard/Contact'
import { useSelector } from 'react-redux'

const GeneralApp = () => {
  // console.log('Hello')
  // console.log('Rendering GeneralApp component')
  const theme = useTheme()
  const { sideBar } = useSelector((state) => state.app)
  console.log(sideBar, 'sidebar')

  return (
    <>
      {/* <h1>GeneralApp is Loading</h1> */}
      <Stack direction='row' sx={{ width: '100%', height: '100vh' }}>
        <ChatsList />
        <Box
          sx={{
            height: '100%',
            width: sideBar.open ? 'calc(100vw - 740px)' : 'calc(100vw - 420px)',
            bgcolor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background
          }}
        >
          <ChatComponent />
        </Box>
        {sideBar.open &&
          (() => {
            switch (sideBar.type) {
              case 'CONTACT':
                return <Contact />

              default:
                break
            }
          })()}
      </Stack>
    </>
  )
}

export default GeneralApp
