import React from 'react'
import StyledBadge, { StyledChatBox } from './StyledBadge'
import { Avatar, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ArrowDownLeft, ArrowUpRight, Phone, VideoCamera } from 'phosphor-react'
import PropTypes from 'prop-types'

const CallDialogElement = ({ img, name, incoming, missed }) => {
  const theme = useTheme()

  return (
    <>
      <StyledChatBox
        sx={{
          width: '100%',
          borderRadius: 1,
          bgcolor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default
        }}
        p={2}
      >
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Stack direction={'row'} spacing={2}>
            <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
              <Avatar src={img} alt={name} />
            </StyledBadge>
            <Stack spacing={0.3}>
              <Typography variant='subtitle2'>{name}</Typography>
              <Stack spacing={1} alignItems={'center'} direction={'row'}>
                {incoming ? <ArrowDownLeft color={missed ? 'red' : 'green'} /> : <ArrowUpRight color={missed ? 'red' : 'green'} />}
                <Typography variant='caption'>Yesterday 21:24</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Phone style={{ color: theme.palette.primary.main }} />
            <VideoCamera style={{ color: theme.palette.primary.main }} />
          </Stack>
        </Stack>
      </StyledChatBox>
    </>
  )
}

CallDialogElement.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  incoming: PropTypes.bool.isRequired,
  missed: PropTypes.bool.isRequired
}

const CallElement = ({ img, name, handleClose }) => {
  const theme = useTheme()

  return (
    <>
      <StyledChatBox
        sx={{
          width: '100%',
          borderRadius: 1,
          bgcolor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default
        }}
        p={2}
      >
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Stack direction={'row'} spacing={2}>
            <Avatar src={img} alt={name} />
            <Stack spacing={0.3} alignItems='center' direction={'row'}>
              <Typography variant='subtitle2'>{name}</Typography>
            </Stack>
          </Stack>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <IconButton
              onClick={() => {
                handleClose()
              }}
            >
              <Phone style={{ color: theme.palette.primary.main }} />
            </IconButton>
            <IconButton
              onClick={() => {
                handleClose()
              }}
            >
              <VideoCamera style={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Stack>
        </Stack>
      </StyledChatBox>
    </>
  )
}

CallElement.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
}

export { CallDialogElement, CallElement }
