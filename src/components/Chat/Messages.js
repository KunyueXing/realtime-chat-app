import { Box, Stack } from '@mui/material'
import React from 'react'
import { Chat_History } from '../../data'
import { Timeline, MediaMsg, TextMsg, DocMsg, ReplyMsg, LinkMsg } from '../../sections/Dashboard/Conversation'
import PropTypes from 'prop-types'

const Messages = ({ menu }) => {
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
                  return <MediaMsg ele={ele} key={`message-${index}`} menu={menu} />
                case 'doc':
                  return <DocMsg ele={ele} key={`message-${index}`} menu={menu} />
                case 'link':
                  return <LinkMsg ele={ele} key={`message-${index}`} menu={menu} />
                case 'reply':
                  return <ReplyMsg ele={ele} key={`message-${index}`} menu={menu} />
                default:
                  return <TextMsg ele={ele} key={`message-${index}`} menu={menu} />
              }

            default:
              return <></>
          }
        })}
      </Stack>
    </Box>
  )
}

Messages.propTypes = {
  menu: PropTypes.bool
}

export default Messages
