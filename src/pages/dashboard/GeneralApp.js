import React from 'react'
import ChatsList from './ChatsList'
import { Box, Stack } from '@mui/material'
import ChatComponent from './Conversation'
import { useTheme } from '@mui/material/styles'
import { Contact } from '../../sections/Dashboard/Contact'
import { useSelector } from 'react-redux'
import { SharedMessages } from '../../sections/Dashboard/SharedMessages'
import { StarredMessages } from '../../sections/Dashboard/StarredMessages'
import { sidebarPageMappings } from '../../utils/constants'

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
