import { Box, Stack } from '@mui/material'
import React from 'react'
import { Chat_History } from '../../data'
import { Timeline } from '../../sections/Dashboard/Conversation'

const Messages = () => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((ele, index) => {
          switch (ele.type) {
            case 'divider':
              return <Timeline ele={ele} key={`message-${index}`} />
          }
        })}
      </Stack>
    </Box>
  )
}

export default Messages
