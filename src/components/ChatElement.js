import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Badge, Stack, Avatar, Typography } from '@mui/material'
import StyledBadge from './StyledBadge'
import PropTypes from 'prop-types'
import truncateString from '../utils/truncateString'
import { StyledChatBox } from './StyledBadge'
import { useDispatch } from 'react-redux'
import { SelectConversation } from '../redux/slices/app'
import { tr } from '@faker-js/faker'

const ChatElement = ({ img, name, msg, time, unread, chat_type, id, online, file }) => {
  const theme = useTheme()
  const dispatch = useDispatch()

  return (
    <StyledChatBox
      sx={{
        width: '100%',
        borderRadius: 1,
        bgcolor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default
      }}
      p={2}
      onClick={() => {
        dispatch(SelectConversation({ chat_type, room_id: id }))
      }}
    >
      <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction='row' spacing={2}>
          {online ? (
            <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
              <Avatar src={img} alt={name} />
            </StyledBadge>
          ) : (
            <Avatar src={img} alt={name} />
          )}
          <Stack spacing={0.3}>
            <Typography variant='subtitle2'>{name}</Typography>
            <Typography variant='caption' sx={{ color: theme.palette.text.secondary }}>
              {file && '[media]'}
              {!file && msg && truncateString(msg, 20)}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 600 }} variant='caption'>
            {time}
          </Typography>
          <Badge color='primary' badgeContent={unread} />
        </Stack>
      </Stack>
    </StyledChatBox>
  )
}

ChatElement.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string.isRequired,
  msg: PropTypes.string,
  time: PropTypes.string.isRequired,
  unread: PropTypes.number.isRequired,
  chat_type: PropTypes.string.isRequired,
  id: PropTypes.string,
  online: PropTypes.bool,
  file: PropTypes.string
}

export default ChatElement
