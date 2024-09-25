import { Box, Stack } from '@mui/material'
import { ChatHeader, ChatFooter, Messages } from '../../components/Chat'
import { useTheme } from '@mui/material/styles'
import React from 'react'

const ChatComponent = () => {
  const theme = useTheme()

  return (
    <Stack height='100%' maxHeight={'100vh'} width='auto'>
      <ChatHeader />
      {/* placeholder, chat content */}
      <Box
        width='100%'
        sx={{
          flexGrow: 1,
          overflow: 'scroll',
          position: 'relative',
          bgcolor: theme.palette.mode === 'light' ? '#F0F4FA' : theme.palette.background,
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
        }}
      >
        <Messages />
      </Box>
      <ChatFooter />
    </Stack>
  )
}

export default ChatComponent
