import React from 'react'
import StyledBadge, { StyledChatBox } from './StyledBadge'
import { useTheme } from '@mui/material/styles'
import { Avatar, Button, IconButton, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { Chat } from 'phosphor-react'

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
          <Button>Send Request</Button>
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
          <IconButton>
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

const FriendRequestElement = ({ img, firstName, lastName, online, _id }) => {
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
          <Button>Accept</Button>
          <Button>Reject</Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  )
}

FriendRequestElement.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  online: PropTypes.bool,
  _id: PropTypes.string,
  img: PropTypes.string
}

export { UserElement, FriendElement, FriendRequestElement }
