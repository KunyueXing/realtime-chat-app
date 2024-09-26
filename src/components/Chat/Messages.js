import { Box, Stack } from '@mui/material'
import React from 'react'
import { Chat_History } from '../../data'
import { Timeline, MediaMsg, TextMsg, DocMsg, ReplyMsg, LinkMsg } from '../../sections/Dashboard/Conversation'

const Messages = () => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((ele, index) => {
          switch (ele.type) {
            case 'divider':
              return <Timeline ele={ele} key={`message-${index}`} />

            case 'msg':
              switch (ele.subtype) {
                case 'img':
                  return <MediaMsg ele={ele} key={`message-${index}`} />
                case 'doc':
                  return <DocMsg ele={ele} key={`message-${index}`} />
                case 'link':
                  return <LinkMsg ele={ele} key={`message-${index}`} />
                case 'reply':
                  return <ReplyMsg ele={ele} key={`message-${index}`} />
                default:
                  return <TextMsg ele={ele} key={`message-${index}`} />
              }

            default:
              return <></>
          }
        })}
      </Stack>
    </Box>
  )
}

export default Messages
