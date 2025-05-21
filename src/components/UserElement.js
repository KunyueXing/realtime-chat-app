import React from 'react'
import StyledBadge, { StyledChatBox } from './StyledBadge'
import { useTheme } from '@mui/material/styles'
import { Avatar, Button, IconButton, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { Chat } from 'phosphor-react'
import { getSocket } from '../socket'

const user_id = window.localStorage.getItem('user_id')
console.log('components/userelement user_id:', user_id)
const socket = getSocket(user_id)
console.log('components/userelement socket:', socket)

const UserElement = ({ firstName, lastName, online, _id, img }) => {
  const theme = useTheme()
  const name = `${firstName} ${lastName}`

  return (
    <StyledChatBox sx={{ width: '100%', backgroundColor: theme.palette.background.paper, borderRadius: 1 }} p={2}>
      <Stack direction='row' alignItems={'center'} justifyContent={'space-between'}>
        <Stack direction='row' spacing={2} alignItems={'center'}>
          {online ? (
            <StyledBadge
              overlap='circular'
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              variant='dot'
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack>
            <Typography variant='subtitle2'>{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
          <Button
            onClick={() => {
              console.log('Emitting friend_request event', { sender: user_id, receiver: _id })
              socket.emit('friend_request', { sender: user_id, receiver: _id }, () => {
                alert('Friend request sent')
              })
            }}
          >
            Send Request
          </Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  )
}

UserElement.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  online: PropTypes.bool,
  _id: PropTypes.string,
  img: PropTypes.string
}

const FriendElement = ({ img, firstName, lastName, online, _id }) => {
  const theme = useTheme()
  const name = `${firstName} ${lastName}`

  return (
    <StyledChatBox sx={{ width: '100%', backgroundColor: theme.palette.background.paper, borderRadius: 1 }} p={2}>
      <Stack direction='row' alignItems={'center'} justifyContent={'space-between'}>
        <Stack direction='row' spacing={2} alignItems={'center'}>
          {online ? (
            <StyledBadge
              overlap='circular'
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              variant='dot'
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant='subtitle2'>{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
          {/* TODO: add start chat functionality using socket */}
          <IconButton
            onClick={() => { socket.emit('start_conversation', { sender: user_id, receiver: _id }) }}
          >
            <Chat />
          </IconButton>
        </Stack>
      </Stack>
    </StyledChatBox>
  )
}

FriendElement.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  online: PropTypes.bool,
  _id: PropTypes.string,
  img: PropTypes.string
}

const FriendRequestElement = ({ img, firstName, lastName, online, id }) => {
  const theme = useTheme()
  const name = `${firstName} ${lastName}`

  return (
    <StyledChatBox sx={{ width: '100%', backgroundColor: theme.palette.background.paper, borderRadius: 1 }} p={2}>
      <Stack direction='row' alignItems={'center'} justifyContent={'space-between'}>
        <Stack direction='row' spacing={2} alignItems={'center'}>
          {online ? (
            <StyledBadge
              overlap='circular'
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              variant='dot'
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant='subtitle2'>{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
          <Button
            onClick={() => {
              socket.emit('accept_friend_request', { request_id: id })
            }}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              socket.emit('reject_friend_request', { request_id: id })
            }}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  )
}

FriendRequestElement.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  online: PropTypes.bool,
  id: PropTypes.string,
  img: PropTypes.string
}

export { UserElement, FriendElement, FriendRequestElement }
