import React from 'react'
import ChatsList from './ChatsList'
import { Box, Stack, Typography } from '@mui/material'
import ChatComponent from './Conversation'
import { useTheme } from '@mui/material/styles'
import { Contact } from '../../sections/Dashboard/Contact'
import { useSelector } from 'react-redux'
import { SharedMessages } from '../../sections/Dashboard/SharedMessages'
import { StarredMessages } from '../../sections/Dashboard/StarredMessages'
import { sidebarPageMappings } from '../../utils/constants'
import NoChat from '../../sections/Dashboard/NoChat'

const GeneralApp = () => {
  // console.log('Hello')
  // console.log('Rendering GeneralApp component')
  const theme = useTheme()
  const { sideBar, room_id, chat_type } = useSelector((state) => state.app)
  // console.log(sideBar, 'sidebar')

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
          {/* <ChatComponent /> */}
          {(chat_type === 'individual' || chat_type === 'AI') && room_id !== null ? <ChatComponent /> : <NoChat />}
        </Box>
        {sideBar.open &&
          (() => {
            switch (sideBar.type) {
              case sidebarPageMappings[0]:
                return <Contact />

              case sidebarPageMappings[1]:
                return <SharedMessages />

              case sidebarPageMappings[2]:
                return <StarredMessages />

              default:
                break
            }
          })()}
      </Stack>
    </>
  )
}

export default GeneralApp
