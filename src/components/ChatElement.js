import React from 'react'
import { styled, useTheme, alpha } from '@mui/material/styles'
import { Box, Badge, Stack, Avatar, Typography } from '@mui/material'
import StyledBadge from './StyledBadge'
import PropTypes from 'prop-types'
import truncateString from '../utils/truncateString'

// const truncateText = (string, n) => {
//   return string?.length > n ? `${string?.slice(0, n)}...` : string
// }

const StyledChatBox = styled(Box)(({ theme }) => ({
  '&:hover': {
    cursor: 'pointer'
  }
}))

const ChatElement = ({ img, name, msg, time, unread }) => {
  const theme = useTheme()

  return (
    <StyledChatBox
      sx={{
        width: '100%',
        borderRadius: 1,
        bgcolor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default
      }}
      p={2}
    >
      <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction='row' spacing={2}>
          <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
            <Avatar src={img} alt={name} />
          </StyledBadge>
          <Stack spacing={0.3}>
            <Typography variant='subtitle2'>{name}</Typography>
            <Typography variant='caption'>{truncateString(msg, 20)}</Typography>
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
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  unread: PropTypes.number.isRequired
}

export default ChatElement
