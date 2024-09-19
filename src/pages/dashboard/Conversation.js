import { Box, Stack } from '@mui/material'
import { ChatHeader, ChatFooter } from '../../components/Chat'

const ChatComponent = () => {
  return (
    <Stack height='100%' maxHeight={'100vh'} width='auto'>
      <ChatHeader />
      <Box width='100%' sx={{ flexGrow: 1 }}></Box>
      <ChatFooter />
    </Stack>
  )
}

export default ChatComponent
