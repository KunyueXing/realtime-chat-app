import React from 'react'
import StyledBadge, { StyledChatBox } from './StyledBadge'
import { useTheme } from '@mui/material/styles'
import { Avatar, Button, IconButton, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { Chat } from 'phosphor-react'
import { useFriends } from '../hooks/socket/useFriend'
import { useSocket } from '../contexts/SocketContext'

const UserElement = ({ firstName, lastName, online, _id, img }) => {
  const theme = useTheme()
  const name = `${firstName} ${lastName}`
  const { sendFriendRequest } = useFriends()

  const handleSendFriendRequest = async () => {
    console.log('User element: send friend request', _id)
    // dispatch(SendFriendRequest({ receiverId: _id }))
    try {
      await sendFriendRequest(_id)
    } catch (error) {
      console.error('Failed to send friend request:', error)
    }
  }

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
          <Button onClick={handleSendFriendRequest}>Send Request</Button>
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
  const { emit, isConnected } = useSocket()

  // TODO: handlestartchat function
  const handleStartChat = async () => {}

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
          <IconButton onClick={handleStartChat} disabled={!isConnected}>
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
  const { acceptFriendRequest, rejectFriendRequest } = useFriends()

  const handleAcceptFriendRequest = async () => {
    console.log('Friend element: accept friend request', id)
    // dispatch(AcceptFriendRequest({ requestId: id }))
    try {
      await acceptFriendRequest(id)
    } catch (error) {
      console.error('Failed to accept friend request:', error)
    }
  }

  const handleRejectFriendRequest = async () => {
    console.log('Friend element: reject friend request', id)
    // dispatch(RejectFriendRequest({ requestId: id }))
    try {
      await rejectFriendRequest(id)
    } catch (error) {
      console.error('Failed to reject friend request:', error)
    }
  }

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
          <Button onClick={handleAcceptFriendRequest}>Accept</Button>
          <Button onClick={handleRejectFriendRequest}>Reject</Button>
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
